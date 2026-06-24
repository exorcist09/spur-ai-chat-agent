'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertCircle, RefreshCw } from 'lucide-react';
import ChatLayout from '../components/layout/ChatLayout';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chat.service';
import { Message } from '../types/chat';

export default function Home() {
  const { messages, setMessages, addMessage, isLoading, setIsLoading, sessionId, setSessionId } = useChatStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Wait for hydration to avoid mismatch on server vs client
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Fetch History Query
  const { isFetching: isHistoryLoading, refetch: refetchHistory } = useQuery({
    queryKey: ['chatHistory', sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      setIsLoading(true);
      try {
        const data = await chatService.getHistory(sessionId);
        const historyMessages: Message[] = data.messages.map(m => ({
          id: m.id,
          role: m.sender,
          content: m.text,
          timestamp: new Date(m.createdAt)
        }));
        setMessages(historyMessages);
        return data;
      } finally {
        setIsLoading(false);
      }
    },
    enabled: !!sessionId && hasHydrated,
  });

  // Send Message Mutation
  const sendMessageMutation = useMutation({
    mutationFn: (messageText: string) => chatService.sendMessage({ message: messageText, sessionId: sessionId || undefined }),
    onMutate: (messageText) => {
      // Optimistic UI update
      setIsLoading(true);
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: messageText,
        timestamp: new Date()
      };
      addMessage(userMessage);
      return { messageText };
    },
    onSuccess: (data) => {
      // If we got a new sessionId, store it
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Append AI response
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        role: 'ai',
        content: data.reply,
        timestamp: new Date()
      };
      addMessage(aiMessage);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const handleSendMessage = (content: string) => {
    if (sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(content);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Prevent rendering until Zustand hydration to avoid hydration mismatch
  if (!hasHydrated) {
    return null; 
  }

  return (
    <ChatLayout>
      <MessageList 
        messages={messages} 
        isLoading={isLoading || isHistoryLoading} 
        onSelectPrompt={handleSelectPrompt} 
      />
      
      {/* Error Banner */}
      {sendMessageMutation.isError && (
        <div className="mx-auto w-full max-w-4xl px-4 pb-2">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between text-sm text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Failed to send message. Please try again.</span>
            </div>
            <button 
              onClick={() => sendMessageMutation.mutate(sendMessageMutation.variables as string)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        </div>
      )}

      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isLoading || isHistoryLoading} 
      />
    </ChatLayout>
  );
}
