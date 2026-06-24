import { MessageSquare } from 'lucide-react';
import { Conversation } from '../../types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="text-sm text-slate-500 text-center py-4">
        No recent conversations
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors group ${
            activeId === conv.id
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className={`w-5 h-5 shrink-0 ${activeId === conv.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
          <div className="flex-1 min-w-0">
            <div className="truncate">{conv.title}</div>
            <div className={`text-xs ${activeId === conv.id ? 'text-blue-500' : 'text-slate-400'}`}>
              {new Date(conv.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
