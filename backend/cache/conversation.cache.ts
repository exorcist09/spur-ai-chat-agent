import { redisClient } from "../config/redis";

const PREFIX = "spur-ai:conversation:";

const getTTL = () => {
  return process.env.REDIS_HISTORY_TTL ? parseInt(process.env.REDIS_HISTORY_TTL, 10) : 600;
};

export const conversationCache = {
  async getCachedHistory(conversationId: string): Promise<any | null> {
    if (!redisClient) return null;
    try {
      const data = await redisClient.get(`${PREFIX}${conversationId}`);
      if (data) {
        console.log("Redis Cache Hit:", conversationId);
        // Upstash Redis automatically parses JSON if it was set as an object
        return data; 
      }
      console.log("Redis Cache Miss:", conversationId);
      return null;
    } catch (error) {
      console.error("Redis Cache Get Error:", error);
      return null; // Gracefully degrade
    }
  },

  async setCachedHistory(conversationId: string, history: any): Promise<void> {
    if (!redisClient) return;
    try {
      await redisClient.set(`${PREFIX}${conversationId}`, history, { ex: getTTL() });
    } catch (error) {
      console.error("Redis Cache Set Error:", error);
    }
  },

  async invalidateCache(conversationId: string): Promise<void> {
    if (!redisClient) return;
    try {
      await redisClient.del(`${PREFIX}${conversationId}`);
      console.log("Redis Cache Invalidated:", conversationId);
    } catch (error) {
      console.error("Redis Cache Invalidate Error:", error);
    }
  }
};
