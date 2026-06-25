export default function MessageSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="bg-slate-200 dark:bg-slate-800 h-12 w-64 rounded-2xl rounded-tr-sm"></div>
      </div>
      
      {/* AI message skeleton */}
      <div className="flex gap-3 max-w-[85%]">
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0"></div>
        <div className="space-y-2 w-full">
          <div className="bg-slate-200 dark:bg-slate-800 h-4 w-3/4 rounded"></div>
          <div className="bg-slate-200 dark:bg-slate-800 h-4 w-full rounded"></div>
          <div className="bg-slate-200 dark:bg-slate-800 h-4 w-5/6 rounded"></div>
        </div>
      </div>

      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="bg-slate-200 dark:bg-slate-800 h-12 w-48 rounded-2xl rounded-tr-sm"></div>
      </div>
    </div>
  );
}
