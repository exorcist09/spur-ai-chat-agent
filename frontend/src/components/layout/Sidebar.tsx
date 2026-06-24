import { Plus, X } from 'lucide-react';
import StoreInfoCard from '../shared/StoreInfoCard';
import ConversationList from './ConversationList';
import { useChatStore } from '../../store/chatStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { conversations, sessionId, setSessionId, clearMessages } = useChatStore();

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
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <img src="/spurlogo.jpg" alt="Spur-AI Logo" className="w-8 h-8 rounded" />
            <span className="font-semibold text-lg text-slate-800">Spur-AI</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto flex flex-col p-4 gap-6">
          <button 
            onClick={handleNewConversation}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </button>

          <div className="flex-1">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Recent</h3>
            <ConversationList 
              conversations={conversations} 
              activeId={sessionId} 
              onSelect={handleSelectConversation} 
            />
          </div>
        </div>

        {/* Footer info card */}
        <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50">
          <StoreInfoCard />
        </div>
      </aside>
    </>
  );
}
