import api from '../lib/axios';

export interface SendMessageRequest {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  reply: string;
  sessionId: string;
}

export interface GetHistoryResponse {
  messages: {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    createdAt: string;
  }[];
}

export const chatService = {
  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>('/chat/message', data);
    return response.data;
  },

  getHistory: async (sessionId: string): Promise<GetHistoryResponse> => {
    const response = await api.get<GetHistoryResponse>(`/chat/history/${sessionId}`);
    return response.data;
  },
};
