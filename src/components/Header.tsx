import React, { useState } from 'react';
import { UserRole, SupportedLanguage } from '../types';
import { DEMO_PROFILES, SUPPORTED_LANGUAGES } from '../data/mockData';
import { 
  Sparkles, 
  ShieldCheck, 
  Languages, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Activity,
  Layers,
  GraduationCap
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onOpenSecurityModal: () => void;
  onOpenRoleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  currentLanguage,
  onSelectLanguage,
  voiceEnabled,
  onToggleVoice,
  onOpenSecurityModal,
  onOpenRoleModal,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const userProfile = DEMO_PROFILES[currentRole];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3" id="aura-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand & Competition Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 p-[1.5px] shadow-lg shadow-teal-500/10 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-['Outfit']">
                AURA AI
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300">
                v1.0 Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Human-Like School Assistant • <span className="text-slate-500">XYZ AI Assessment</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Security & Architecture Inspector Modal Button */}
          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-teal-500/50 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
            id="btn-security-inspector"
            title="View Security Guardrails & Enterprise Architecture"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Security & Guardrails</span>
          </button>

          {/* Voice Response Output Toggle */}
          <button
            type="button"
            onClick={onToggleVoice}
            className={`p-2 rounded-lg border transition-all text-xs font-medium focus:outline-none ${
              voiceEnabled
                ? 'bg-teal-500/10 border-teal-500/40 text-teal-300 hover:bg-teal-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
            id="btn-voice-toggle"
            title={voiceEnabled ? 'Voice output enabled' : 'Voice output muted'}
            aria-label="Toggle voice output"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 11 Indian Languages Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium transition-all"
              id="btn-language-selector"
              aria-expanded={langDropdownOpen}
            >
              <Languages className="w-4 h-4 text-cyan-400" />
              <span className="font-medium max-w-[60px] sm:max-w-none truncate">
                {currentLanguage.nativeName} ({currentLanguage.name})
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto z-50 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 divide-y divide-slate-800/50">
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language (11 Supported)
                  </div>
                  <div className="py-1 space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onSelectLanguage(lang);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                          currentLanguage.code === lang.code
                            ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-slate-400 text-[11px]">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Current Active Persona & Role Switcher */}
          <button
            type="button"
            onClick={onOpenRoleModal}
            className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-teal-500/40 text-slate-200 transition-all text-xs focus:outline-none"
            id="btn-role-switcher"
            title="Switch Demo Role (Student / Parent / Teacher / Principal)"
          >
            <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${userProfile.avatarBg} flex items-center justify-center text-white text-[11px] font-bold`}>
              {currentRole[0].toUpperCase()}
            </div>
            <div className="text-left hidden sm:block leading-tight">
              <div className="font-semibold text-slate-200 capitalize flex items-center gap-1">
                {currentRole}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[110px]">
                {userProfile.name}
              </div>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};
