import { Menu, Settings, Trash2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

interface ChatHeaderProps {
  onMenuClick: () => void;
}

export default function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  const { sessionId, conversations, clearMessages } = useChatStore();
  const currentConversation = conversations.find(c => c.id === sessionId);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 bg-white shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col">
          <h1 className="font-semibold text-slate-800">
            {currentConversation ? currentConversation.title : 'New Conversation'}
          </h1>
          {currentConversation && (
            <span className="text-xs text-slate-500">
              Last updated {new Date(currentConversation.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={clearMessages}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
          title="Clear Conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button 
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
