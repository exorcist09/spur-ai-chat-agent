class ChatService {
    async sendMessage(
        message:string,
        sessionId?:string
    ){
        return{
        reply : `You said: ${message}`,
        sessionId: sessionId ?? crypto.randomUUID()
        }
    }
}

export const chatService = new ChatService();