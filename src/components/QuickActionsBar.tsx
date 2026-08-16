import React from 'react';
import { UserRole, QuickPrompt, SemanticIntent } from '../types';
import { getLocalizedPrompts, LocalizedPromptItem } from '../data/localizedPrompts';
import { Sparkles } from 'lucide-react';

interface QuickActionsBarProps {
  currentRole: UserRole;
  currentLanguageCode: string;
  onSelectPrompt: (promptText: string, semanticIntent?: SemanticIntent, explicitChildId?: string) => void;
  disabled?: boolean;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  currentRole,
  currentLanguageCode,
  onSelectPrompt,
  disabled = false,
}) => {
  const rolePrompts = getLocalizedPrompts(currentLanguageCode, currentRole);

  const getBadgeColor = (category: QuickPrompt['category']) => {
    switch (category) {
      case 'clarification':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'action':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'escalation':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'follow_up':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case 'security_test':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      default:
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
    }
  };

  return (
    <div className="w-full pb-2 select-none" id="quick-actions-bar">
      <div className="flex items-center gap-1.5 mb-1.5 text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
        <span className="font-semibold uppercase tracking-wider text-[10px]">
          Quick Suggestions ({currentRole})
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {rolePrompts.map((item: LocalizedPromptItem) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(item.prompt, item.semanticIntent, item.explicitChildId)}
            className="flex-shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-slate-200 text-xs font-medium transition-all group disabled:opacity-50 disabled:cursor-not-allowed text-left shadow-sm"
          >
            <span className="group-hover:text-teal-300 transition-colors">
              {item.label}
            </span>
            {item.badge && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${getBadgeColor(item.category)}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

