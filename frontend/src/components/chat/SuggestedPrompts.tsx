import { HelpCircle, Clock, Globe, Headphones } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  const suggestions = [
    {
      icon: <RefreshCcw className="w-5 h-5 text-blue-500" />,
      title: "What is your refund policy?",
      description: "Learn about our 30-day returns"
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      title: "How long does shipping take?",
      description: "Standard and express options"
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      title: "Do you ship internationally?",
      description: "Countries we deliver to"
    },
    {
      icon: <Headphones className="w-5 h-5 text-blue-500" />,
      title: "What are your support hours?",
      description: "When you can reach us"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 w-full">
      <div className="mb-8 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <img src="/logo.jpg" alt="ShopAssist Ai" className="w-10 h-10 rounded-lg object-cover mix-blend-multiply dark:mix-blend-normal bg-white" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          How can ShopAssist Ai help you today?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(sug.title)}
            className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-all text-left group"
          >
            <div className="bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 p-2 rounded-lg transition-colors">
              {sug.icon}
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mb-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {sug.title}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {sug.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Inline import since RefreshCcw wasn't imported in the list above
import { RefreshCcw } from 'lucide-react';
