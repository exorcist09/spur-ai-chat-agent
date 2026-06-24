export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-4 w-fit bg-white rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );
}
