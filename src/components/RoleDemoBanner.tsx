import React from 'react';
import { UserRole, ConversationContext } from '../types';
import { DEMO_PROFILES } from '../data/mockData';
import { ShieldAlert, Users, School, Sparkles, RefreshCcw } from 'lucide-react';

interface RoleDemoBannerProps {
  currentRole: UserRole;
  context: ConversationContext;
  onSwitchRole: (role: UserRole) => void;
  onClearContext: () => void;
}

export const RoleDemoBanner: React.FC<RoleDemoBannerProps> = ({
  currentRole,
  context,
  onSwitchRole,
  onClearContext,
}) => {
  const profile = DEMO_PROFILES[currentRole];

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2.5" id="role-demo-banner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Left: Role identification */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium border border-slate-700">
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-400">Active Persona:</span>
            <strong className="text-slate-100 uppercase">{currentRole}</strong>
          </span>

          <span className="text-slate-400 hidden sm:inline">•</span>

          <span className="text-slate-300">
            <strong>{profile.name}</strong> <span className="text-slate-400">({profile.details})</span>
          </span>

          {context.activeStudentName && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[11px]">
              <Sparkles className="w-3 h-3 text-teal-400" />
              Memory Context: <strong>{context.activeStudentName}</strong>
            </span>
          )}
        </div>

        {/* Right: Sandbox note & Quick Role Switches */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Frontend Architecture Sandbox (Mock SIS Data)</span>
          </div>

          {(context.activeStudentName || context.lastTopic) && (
            <button
              type="button"
              onClick={onClearContext}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-300 px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
              title="Reset conversational context memory"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset Context</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
