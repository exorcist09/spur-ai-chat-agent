export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-4 w-fit bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
}
