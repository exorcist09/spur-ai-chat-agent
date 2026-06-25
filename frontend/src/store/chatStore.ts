import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Conversation } from '../types/chat';

interface ChatState {
  theme: 'light' | 'dark';
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
  addConversation: (conversation: Conversation) => void;
  deleteConversation: (id: string) => void;
  toggleTheme: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      theme: 'light',
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
      clearMessages: () => set({ messages: [], error: null, sessionId: null }),
      addConversation: (conversation) => set((state) => ({ conversations: [conversation, ...state.conversations] })),
      deleteConversation: (id) => set((state) => ({
        conversations: state.conversations.filter(c => c.id !== id),
        sessionId: state.sessionId === id ? null : state.sessionId,
        messages: state.sessionId === id ? [] : state.messages
      })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'chat-storage',
      // Only persist sessionId, conversations, and theme to local storage
      partialize: (state) => ({ 
        theme: state.theme,
        sessionId: state.sessionId,
        conversations: state.conversations,
      }),
    }
  )
);
