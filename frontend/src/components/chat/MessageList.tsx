import { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedPrompts from './SuggestedPrompts';
import MessageSkeleton from './MessageSkeleton';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isHistoryLoading?: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export default function MessageList({ messages, isLoading, isHistoryLoading, onSelectPrompt }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (isHistoryLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
        <div className="max-w-4xl mx-auto w-full">
          <MessageSkeleton />
        </div>
      </div>
    );
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50/50">
        <SuggestedPrompts onSelect={onSelectPrompt} />
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
}
