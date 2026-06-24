'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatHeader from '../chat/ChatHeader';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-900 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <ChatHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
