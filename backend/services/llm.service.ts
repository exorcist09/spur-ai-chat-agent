import { GoogleGenAI } from "@google/genai";
import { STORE_CONTEXT } from "../constants/constants";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_INSTRUCTION = `You are the ShopAssist Ai Customer Support Agent. You are friendly, helpful, and knowledgeable about the store.
Answer questions based ONLY on the context or store policies provided.
If you do not know the answer, or if the query is out of scope, politely direct the user to contact support@shopassist.com.

${STORE_CONTEXT}`;

class LLMService {
  async generateReply(
    history: any[],
    userMessage: string
  ) {
    // 1. Format history
    const formattedHistory = history.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // 2. Start native Gemini chat API
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 512,
      },
      history: formattedHistory,
    });

    // 3. Send message
    const response = await chat.sendMessage({
      message: userMessage,
    });

    return response.text ?? "No response generated.";
  }
}

export const llmService = new LLMService();