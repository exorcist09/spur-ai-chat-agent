import { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import StoreInfoCard from '../shared/StoreInfoCard';
import ConversationList from '../chat/ConversationList';
import { useChatStore } from '../../store/chatStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { conversations, sessionId, setSessionId, clearMessages, deleteConversation } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewConversation = () => {
    setSessionId(null);
    clearMessages();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSelectConversation = (id: string) => {
    setSessionId(id);
    // In a real app, you would fetch messages for this session here
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="ShopAssist Ai Logo" className="w-8 h-8 rounded-lg object-cover mix-blend-multiply dark:mix-blend-normal bg-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-slate-800 dark:text-slate-100 leading-tight">ShopAssist Ai</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Support</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto flex flex-col p-4 gap-4">
          <button 
            onClick={handleNewConversation}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </button>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex-1 mt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Recent</h3>
            <ConversationList 
              conversations={filteredConversations} 
              activeId={sessionId} 
              onSelect={handleSelectConversation} 
              onDelete={deleteConversation}
            />
          </div>
        </div>

        {/* Footer info card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <StoreInfoCard />
        </div>
      </aside>
    </>
  );
}
