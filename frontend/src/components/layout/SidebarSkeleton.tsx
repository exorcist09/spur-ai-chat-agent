import { Menu } from 'lucide-react';

export default function SidebarSkeleton() {
  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col animate-pulse">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col p-4 gap-6">
          <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          
          <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 w-full p-3 rounded-lg">
                <div className="w-5 h-5 shrink-0 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
