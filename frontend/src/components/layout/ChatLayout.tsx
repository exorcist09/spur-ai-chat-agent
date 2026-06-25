'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatHeader from '../chat/ChatHeader';
import { useChatStore } from '../../store/chatStore';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useChatStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950">
        <ChatHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
