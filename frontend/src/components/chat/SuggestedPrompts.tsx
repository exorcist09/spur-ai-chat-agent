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
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <img src="/spurlogo.jpg" alt="Spur-AI" className="w-10 h-10 rounded-lg" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">
          How can Spur-AI help you today?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(sug.title)}
            className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all text-left group"
          >
            <div className="bg-slate-50 group-hover:bg-white p-2 rounded-lg transition-colors">
              {sug.icon}
            </div>
            <div>
              <div className="font-medium text-slate-800 mb-0.5 group-hover:text-blue-700 transition-colors">
                {sug.title}
              </div>
              <div className="text-sm text-slate-500">
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
