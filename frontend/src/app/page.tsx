'use client';

import { useState } from 'react';
import ChatLayout from '../components/layout/ChatLayout';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import { useChatStore } from '../store/chatStore';

export default function Home() {
  const { messages, addMessage, isLoading, setIsLoading } = useChatStore();

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date()
    };
    addMessage(userMessage);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai' as const,
        content: `I'm a simulated AI assistant for Spur-AI. You said: "${content}". How else can I help you today?`,
        timestamp: new Date()
      };
      addMessage(aiMessage);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <ChatLayout>
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
        onSelectPrompt={handleSelectPrompt} 
      />
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isLoading} 
      />
    </ChatLayout>
  );
}
