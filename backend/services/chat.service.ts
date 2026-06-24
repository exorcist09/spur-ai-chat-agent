import { prisma } from "../config/prisma";

class ChatService {
  async sendMessage(
    message: string,
    sessionId?: string
  ) {
    let conversationId = sessionId;

    if (!conversationId) {
      const conversation =
        await prisma.conversation.create({
          data: {},
        });

      conversationId = conversation.id;
    }

    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    const aiReply = `You said: ${message}`;

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

export const chatService = new ChatService();