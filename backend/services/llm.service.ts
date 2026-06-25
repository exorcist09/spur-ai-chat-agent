import { GoogleGenAI } from "@google/genai";
import { STORE_CONTEXT } from "../constants/constants";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

class LLMService {
  async generateReply(
    history: any[],
    userMessage: string
  ) {
    const conversationHistory =
      history
        .map(
          (msg) =>
            `${msg.sender}: ${msg.text}`
        )
        .join("\n");

    const prompt = `
You are the Spur-AI Customer Support Agent. When asked who you are, you must introduce yourself as the Spur-AI Chat Support Agent. You are friendly, helpful, and knowledgeable about the store.

${STORE_CONTEXT}

Conversation History:
${conversationHistory}

User:
${userMessage}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text ?? "No response generated.";
  }
}

export const llmService =
  new LLMService();