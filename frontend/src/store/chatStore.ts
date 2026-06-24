import { create } from 'zustand';
import { Message, Conversation } from '../types/chat';

interface ChatState {
  sessionId: string | null;
  messages: Message[];
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
  setSessionId: (id: string | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setConversations: (conversations: Conversation[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: null,
  messages: [],
  conversations: [],
  isLoading: false,
  error: null,
  setSessionId: (id) => set({ sessionId: id }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setConversations: (conversations) => set({ conversations }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [], error: null }),
}));
