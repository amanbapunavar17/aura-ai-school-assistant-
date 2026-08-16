import React, { useEffect, useRef } from 'react';
import { ChatMessage, UserRole, ClarificationOption, ActionPayload, EscalationPayload } from '../types';
import { 
  Sparkles, 
  User, 
  Volume2, 
  Copy, 
  Check, 
  ShieldAlert, 
  Clock, 
  FileCheck2, 
  PhoneCall, 
  CornerDownRight, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  Mic
} from 'lucide-react';

interface ChatAreaProps {
  messages: ChatMessage[];
  currentRole: UserRole;
  onClarificationClick: (option: ClarificationOption, messageId?: string) => void;
  onConfirmEscalation: (messageId: string, payload: EscalationPayload) => void;
  onDismissEscalation: (messageId: string) => void;
  onSpeakMessage: (text: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  currentRole,
  onClarificationClick,
  onConfirmEscalation,
  onDismissEscalation,
  onSpeakMessage,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full" id="chat-messages-container">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
          >
            {/* Sender identification + Timestamp */}
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 px-1">
              <span className="font-semibold text-slate-300">
                {isUser ? 'You' : 'AURA AI Assistant'}
              </span>
              <span>•</span>
              <span>
                {msg.timestamp instanceof Date 
                  ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {msg.isVoiceInput && (
                <span className="flex items-center gap-0.5 text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded text-[10px]">
                  <Mic className="w-2.5 h-2.5" /> Spoken
                </span>
              )}
            </div>

            {/* Message Bubble Card */}
            <div
              className={`relative max-w-2xl rounded-2xl p-4 text-sm leading-relaxed shadow-sm transition-all ${
                isUser
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-br-none shadow-teal-900/20'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none shadow-slate-950/40 backdrop-blur-sm'
              }`}
            >
              {/* Context Tag Header on Assistant messages */}
              {!isUser && msg.contextTag && (
                <div className="flex items-center space-x-1.5 mb-2.5 pb-2 border-b border-slate-800 text-[11px] font-medium text-teal-400">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span className="truncate">{msg.contextTag}</span>
                </div>
              )}

              {/* Main Message Text with line breaks */}
              <div className="whitespace-pre-wrap font-['Plus_Jakarta_Sans']">
                {msg.text}
              </div>

              {/* CLARIFICATION OPTIONS (e.g. Rahul vs Priya for parents) */}
              {msg.clarificationOptions && msg.clarificationOptions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <CornerDownRight className="w-3.5 h-3.5 text-cyan-400" />
                      Select Student Record:
                    </span>
                    <span className="text-[10px] text-teal-400/80 font-normal">
                      Explicit Identifier Bound
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.clarificationOptions.map((opt) => {
                      const isSelected = msg.selectedOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onClarificationClick(opt, msg.id)}
                          className={`flex flex-col text-left p-3 rounded-xl border transition-all group relative ${
                            isSelected
                              ? 'bg-teal-950/50 border-teal-400 shadow-sm shadow-teal-500/20 text-white'
                              : 'bg-slate-950/80 border-slate-700/60 hover:border-teal-400 hover:bg-slate-800/90 text-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-teal-300 group-hover:text-teal-200 text-xs flex items-center gap-1.5">
                              {opt.label}
                            </span>
                            {opt.childId && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                                ID: {opt.childId}
                              </span>
                            )}
                          </div>
                          {opt.sublabel && (
                            <span className="text-[11px] text-slate-400 mt-1">
                              {opt.sublabel}
                            </span>
                          )}
                          {isSelected && (
                            <div className="mt-2 pt-1 border-t border-teal-500/30 flex items-center gap-1 text-[10px] text-teal-300 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-teal-400" />
                              <span>Active Context</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACTION PAYLOAD RECEIPT (e.g. Mark Rahul absent) */}
              {msg.actionPayload && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4" />
                      SIMULATED ACTION AUDIT RECEIPT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold uppercase border border-emerald-500/20">
                      {msg.actionPayload.status}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <strong>Entity:</strong> {msg.actionPayload.targetEntity}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <strong>Audit ID:</strong> <code className="text-teal-300 font-mono">{msg.actionPayload.auditLogId}</code>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>Timestamp:</strong> {msg.actionPayload.timestamp}
                  </div>
                  <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 italic">
                    Prototype Simulation Showcase: Action authorized via simulated RBAC scope. In production, this dispatches a signed transaction to the SIS database.
                  </div>
                </div>
              )}

              {/* HUMAN ESCALATION TICKET (e.g. Request call with teacher) */}
              {msg.escalationPayload && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4" />
                      Human Escalation Request Draft
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-semibold border border-amber-500/20">
                      Ticket #{msg.escalationPayload.ticketId}
                    </span>
                  </div>

                  <div className="text-slate-300 text-xs">
                    <div><strong>Target Staff:</strong> {msg.escalationPayload.assignedStaff}</div>
                    <div><strong>Subject:</strong> {msg.escalationPayload.reason}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <strong>Status:</strong> {msg.escalationPayload.status === 'submitted' ? '✅ Dispatched to Teacher Portal' : 'Pending Parent Confirmation'}
                    </div>
                  </div>

                  {msg.escalationPayload.status === 'draft' ? (
                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => onConfirmEscalation(msg.id, msg.escalationPayload!)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Yes, Request Callback
                      </button>
                      <button
                        type="button"
                        onClick={() => onDismissEscalation(msg.id)}
                        className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        No, Continue Chat
                      </button>
                    </div>
                  ) : (
                    <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Callback ticket submitted to Mr. Vikram Verma. Estimated window: Today within 2 hours.</span>
                    </div>
                  )}
                </div>
              )}

              {/* SECURITY GUARDRAIL EVENT (e.g. Prompt injection blocked) */}
              {msg.securityEvent && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      {msg.securityEvent.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] uppercase font-bold border border-rose-500/30">
                      {msg.securityEvent.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{msg.securityEvent.description}</p>
                  <div className="pt-1.5 border-t border-rose-900/50 text-[10px] text-slate-400">
                    <strong>Mitigation Engine:</strong> {msg.securityEvent.mitigation}
                  </div>
                </div>
              )}

              {/* Assistant Message Actions (TTS & Copy) */}
              {!isUser && (
                <div className="flex items-center justify-end space-x-2 mt-2 pt-2 border-t border-slate-800/60 text-slate-400 text-xs">
                  <button
                    type="button"
                    onClick={() => onSpeakMessage(msg.text)}
                    className="p-1 hover:text-teal-300 rounded transition-colors"
                    title="Read aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="p-1 hover:text-teal-300 rounded transition-colors"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
