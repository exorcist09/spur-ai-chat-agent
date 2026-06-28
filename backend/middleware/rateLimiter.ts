import type { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";

// In-memory fallback
const memoryStore = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 30;
const WINDOW_IN_SECONDS = 900; // 15 mins

// Periodic cleanup of expired rate limit entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetAt) {
      memoryStore.delete(key);
    }
  }
}, WINDOW_IN_SECONDS * 1000).unref(); // unref so it doesn't block node exit

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  // Use IP as identifier. In production behind a proxy, you'd use req.ip or x-forwarded-for.
  const ip = req.ip || req.socket.remoteAddress || "unknown_ip";
  const key = `spur-ai:ratelimit:${ip}`;

  const sendRateLimitResponse = (res: Response) => {
    res.setHeader("Retry-After", WINDOW_IN_SECONDS.toString());
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. Please try again in a few minutes.",
    });
  };

  if (redisClient) {
    try {
      const currentCount = await redisClient.incr(key);
      if (currentCount === 1) {
        // Set expiry on first increment
        await redisClient.expire(key, WINDOW_IN_SECONDS);
      }

      if (currentCount > LIMIT) {
        console.warn(`Rate Limit Exceeded (Redis): ${ip}`);
        return sendRateLimitResponse(res);
      }

      return next();
    } catch (error) {
      console.error("Redis Rate Limiter Error, falling back to memory:", error);
      // Fall through to memory limiter if Redis fails dynamically
    }
  }

  // Memory Fallback
  const now = Date.now();
  let record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    record = { count: 1, resetAt: now + WINDOW_IN_SECONDS * 1000 };
    memoryStore.set(key, record);
  } else {
    record.count++;
  }

  if (record.count > LIMIT) {
    console.warn(`Rate Limit Exceeded (Memory): ${ip}`);
    return sendRateLimitResponse(res);
  }

  next();
};
