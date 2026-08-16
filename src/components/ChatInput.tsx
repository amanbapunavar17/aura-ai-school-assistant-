import React, { useState, useRef, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { Send, Mic, MicOff, Sparkles, Trash2, ArrowUp, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, isVoice?: boolean) => void;
  isListening: boolean;
  onToggleListening: () => void;
  disabled?: boolean;
  currentLanguage: SupportedLanguage;
  onClearChat: () => void;
  hasMessages: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isListening,
  onToggleListening,
  disabled = false,
  currentLanguage,
  onClearChat,
  hasMessages,
}) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || disabled) return;
    onSendMessage(inputText.trim(), false);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-slate-950/90 border-t border-slate-800/80 p-3 sm:p-4 backdrop-blur-xl" id="chat-input-wrapper">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          
          {/* Clear chat button */}
          {hasMessages && (
            <button
              type="button"
              onClick={onClearChat}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-slate-850 transition-all flex-shrink-0"
              title="Clear conversation history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Voice Input Trigger with pulsating mic */}
          <button
            type="button"
            onClick={onToggleListening}
            className={`p-2.5 rounded-xl border transition-all flex-shrink-0 relative focus:outline-none ${
              isListening
                ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input (Speech-to-Text)'}
            id="btn-voice-input"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              </>
            ) : (
              <Mic className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Main Text Input Bar */}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening 
                  ? 'Listening for speech input...' 
                  : `Ask AURA AI in ${currentLanguage.name} (e.g. "${currentLanguage.samplePrompt}")`
              }
              disabled={disabled}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-teal-500/60 focus:ring-1 focus:ring-teal-400/50 text-slate-100 placeholder-slate-500 text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none transition-all"
              id="aura-chat-input"
            />

            {/* Language indicator chip inside input */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1 text-[11px] text-slate-500 font-mono">
              <span>{currentLanguage.code.toUpperCase()}</span>
            </div>
          </div>

          {/* Submit / Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || disabled}
            className="p-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-md shadow-teal-500/10 focus:outline-none focus:ring-2 focus:ring-teal-400"
            id="btn-send-message"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Live Listening wave feedback if active */}
        {isListening && (
          <div className="mt-2 flex items-center justify-between text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Voice recognition active in <strong>{currentLanguage.name} ({currentLanguage.locale})</strong>. Speak clearly...</span>
            </div>
            <button
              type="button"
              onClick={onToggleListening}
              className="text-[11px] text-amber-300 hover:underline font-semibold"
            >
              Stop
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
