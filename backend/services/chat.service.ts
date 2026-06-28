import { prisma } from "../config/prisma";
import { llmService } from "./llm.service";
import { conversationCache } from "../cache/conversation.cache";

class ChatService {
  async getHistory(sessionId: string) {
    // 1. Try Cache
    const cachedHistory = await conversationCache.getCachedHistory(sessionId);
    if (cachedHistory) {
      return cachedHistory;
    }

    // 2. Try DB Fallback
    const history = await prisma.message.findMany({
      where: {
        conversationId: sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // 3. Populate Cache
    if (history.length > 0) {
      await conversationCache.setCachedHistory(sessionId, history);
    }

    return history;
  }

  async sendMessage(
    message: string,
    sessionId?: string
  ) {
    let conversationId = sessionId;

    // Create conversation if it doesn't exist
    if (!conversationId) {
      const conversation =
        await prisma.conversation.create({
          data: {},
        });

      conversationId = conversation.id;
    }

    // Fetch conversation history using internal method (hits cache or DB) BEFORE saving new message
    const history = await this.getHistory(conversationId);

    // Save user message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    let aiReply: string;

    try {
      aiReply =
        await llmService.generateReply(
          history,
          message
        );
    } catch (error) {
      console.error("LLM Error:", error);
      aiReply =
        "Sorry, I'm unable to respond right now. Please try again later.";
    }

    // Save AI message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "ai",
        text: aiReply,
      },
    });

    // Invalidate cache since a new message was added
    await conversationCache.invalidateCache(conversationId);

    return {
      reply: aiReply,
      sessionId: conversationId,
    };
  }
}

export const chatService =
  new ChatService();