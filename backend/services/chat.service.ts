import { prisma } from "../config/prisma";
import { llmService } from "./llm.service";

class ChatService {
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

    // Save user message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    // Fetch conversation history
    const history =
      await prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          createdAt: "asc",
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

    return {
      reply: aiReply,
      sessionId: conversationId,
    };
  }
}

export const chatService =
  new ChatService();