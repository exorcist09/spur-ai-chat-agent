import { Redis } from "@upstash/redis";

export const isRedisEnabled = (): boolean => {
  return !!(process.env.REDIS_URL && process.env.REDIS_TOKEN);
};

export const getRedisClient = (): Redis | null => {
  if (!isRedisEnabled()) {
    return null;
  }

  try {
    return new Redis({
      url: process.env.REDIS_URL!,
      token: process.env.REDIS_TOKEN!,
    });
  } catch (error) {
    console.error("Failed to initialize Upstash Redis client:", error);
    return null;
  }
};

export const redisClient = getRedisClient();
