import { BotMessageSquare  } from 'lucide-react';
import { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAi = message.role === 'ai';

  return (
    <div className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {isAi && (
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
            <BotMessageSquare  className="w-5 h-5 text-white" />
          </div>
        )}

        <div className={`flex flex-col gap-1 ${isAi ? 'items-start' : 'items-end'}`}>
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
              isAi
                ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-sm'
                : 'bg-blue-600 text-white rounded-tr-sm'
            }`}
          >
            {message.content.split('\n').map((line, i) => (
              <p key={i} className={i !== 0 ? 'mt-2' : ''}>
                {line}
              </p>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 px-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
}
