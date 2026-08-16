import React from 'react';
import { UserRole, SupportedLanguage } from '../types';
import { DEMO_PROFILES, SUPPORTED_LANGUAGES } from '../data/mockData';
import { 
  GraduationCap, 
  HeartHandshake, 
  BookOpenCheck, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Languages, 
  Mic, 
  ArrowRight,
  Bot
} from 'lucide-react';

interface LandingHeroProps {
  onSelectRoleAndStart: (role: UserRole) => void;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onSelectRoleAndStart,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const roles: { role: UserRole; title: string; desc: string; icon: any; color: string; persona: string }[] = [
    {
      role: 'student',
      title: 'Student Portal',
      persona: 'Aarav Sharma (Class 10-A)',
      desc: 'Check personal attendance, timetable, assignments, and study assistance.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      role: 'parent',
      title: 'Parent Portal',
      persona: 'Sunita Sharma (Rahul & Priya)',
      desc: 'Multi-child attendance tracking, progress insights, and direct teacher escalation.',
      icon: HeartHandshake,
      color: 'from-amber-600 to-orange-600',
    },
    {
      role: 'teacher',
      title: 'Faculty Portal',
      persona: 'Mr. Vikram Verma (10-A Lead)',
      desc: 'Record classroom attendance, view section summaries, and manage parent requests.',
      icon: BookOpenCheck,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      role: 'principal',
      title: 'Principal / Admin',
      persona: 'Dr. Arvind Mehta',
      desc: 'School-wide attendance analytics, anomaly detection, and governance reports.',
      icon: Building2,
      color: 'from-purple-600 to-violet-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden" id="landing-experience">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 p-[1.5px] shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-['Outfit'] tracking-tight">AURA AI</h1>
            <p className="text-[11px] text-slate-400">Human-Like School Assistant • XYZ AI Assessment</p>
          </div>
        </div>

        {/* Language selector chip */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-cyan-400" />
          <select
            value={selectedLanguage.code}
            onChange={(e) => {
              const target = SUPPORTED_LANGUAGES.find((l) => l.code === e.target.value);
              if (target) onSelectLanguage(target);
            }}
            className="bg-slate-900 border border-slate-800 rounded-lg text-xs py-1.5 px-2.5 text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="max-w-4xl mx-auto w-full text-center my-10 z-10">
        
        {/* Abstract Floating Orb Visual */}
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-900/80 border border-slate-800 mb-6 shadow-xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-[0_0_25px_rgba(20,184,166,0.5)]">
            <Bot className="w-8 h-8 text-slate-950" />
          </div>
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
          XYZ AI Machine Learning Assessment Prototype
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-['Outfit'] tracking-tight leading-tight text-slate-100">
          The Next-Generation <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Human-Like</span> AI School Assistant
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Experience natural language conversation, contextual follow-ups, role-based guardrails, human escalation, and voice support across 11 Indian languages.
        </p>

        {/* Dynamic Welcome in Selected Language */}
        <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 max-w-xl mx-auto text-xs text-teal-300">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-0.5">
            Greeting in {selectedLanguage.name}:
          </span>
          "{selectedLanguage.greeting}"
        </div>

        {/* Persona Selectors Section */}
        <div className="mt-10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Select a Demo Persona to Enter the Assistant
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {roles.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => onSelectRoleAndStart(item.role)}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/70 hover:bg-slate-850 transition-all duration-200 flex flex-col justify-between group shadow-lg cursor-pointer"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-white text-sm group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-teal-400/90 font-medium mb-1.5">
                      {item.persona}
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-teal-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Enter as {item.role}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Features Banner */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-slate-400 z-10">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role Guardrails & RBAC</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Languages className="w-4 h-4 text-cyan-400" />
          <span>11 Indian Languages</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Mic className="w-4 h-4 text-amber-400" />
          <span>Voice STT & TTS Enabled</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Context Memory Engine</span>
        </div>
      </div>

    </div>
  );
};
