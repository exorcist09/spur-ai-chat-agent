import { Menu, Moon, Sun } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

interface ChatHeaderProps {
  onMenuClick: () => void;
}

export default function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  const { sessionId, conversations, theme, toggleTheme } = useChatStore();
  const currentConversation = conversations.find(c => c.id === sessionId);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 shadow-sm z-10 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col">
          <h1 className="font-semibold text-slate-800 dark:text-slate-100">
            {currentConversation ? currentConversation.title : 'New Conversation'}
          </h1>
          {currentConversation && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Last updated {new Date(currentConversation.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
