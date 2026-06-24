export type Role = 'user' | 'ai';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
}

export interface ChatResponse {
  message: string;
}
