import { MessageSquare, Trash2 } from 'lucide-react';
import { Conversation } from '../../types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConversationList({ conversations, activeId, onSelect, onDelete }: ConversationListProps) {
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
        <div key={conv.id} className="relative group">
          <button
            onClick={() => onSelect(conv.id)}
            className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors ${
              activeId === conv.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className={`w-5 h-5 shrink-0 ${activeId === conv.id ? 'text-blue-600 dark:text-blue-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
            <div className="flex-1 min-w-0 pr-6">
              <div className="truncate">{conv.title}</div>
              <div className={`text-xs ${activeId === conv.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                {new Date(conv.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(conv.id);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md opacity-0 group-hover:opacity-100 transition-all"
            title="Delete conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
