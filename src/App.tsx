import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  UserRole, 
  SupportedLanguage, 
  AvatarState, 
  ChatMessage, 
  ConversationContext, 
  ClarificationOption, 
  ActionPayload, 
  EscalationPayload,
  SemanticIntent
} from './types';
import { SUPPORTED_LANGUAGES, DEMO_PROFILES } from './data/mockData';
import { getLanguagePack } from './data/translations';
import { AIOrchestratorService } from './services/aiOrchestrator';
import { VoiceService } from './services/voiceService';
import { Header } from './components/Header';
import { RoleDemoBanner } from './components/RoleDemoBanner';
import { AIAvatar } from './components/AIAvatar';
import { QuickActionsBar } from './components/QuickActionsBar';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { RoleSelectorModal } from './components/RoleSelectorModal';
import { SecurityInspectorModal } from './components/SecurityInspectorModal';
import { LandingHero } from './components/LandingHero';
import { Bot, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'assistant' | 'landing'>('assistant');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(SUPPORTED_LANGUAGES[0]);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ConversationContext>({});
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);

  // Modals
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);

  const orchestrator = useRef(AIOrchestratorService.getInstance()).current;
  const voiceService = useRef(VoiceService.getInstance()).current;

  // Generate initial personalized greeting for active role
  const generateInitialGreeting = useCallback((role: UserRole, lang: SupportedLanguage): ChatMessage => {
    const profile = DEMO_PROFILES[role];
    const pack = getLanguagePack(lang.code);
    const greetingText = pack.greetings[role] || pack.greetings.student;

    return {
      id: `init-${Date.now()}`,
      sender: 'assistant',
      text: greetingText,
      timestamp: new Date(),
      language: lang.code,
      role,
      contextTag: `${profile.name} (${profile.details}) Session Initialized`,
    };
  }, []);

  // Initialize or reset conversation when role or language changes
  const resetConversationForRole = useCallback((newRole: UserRole, newLang: SupportedLanguage = currentLanguage) => {
    setContext({});
    const initialMsg = generateInitialGreeting(newRole, newLang);
    setMessages([initialMsg]);
    setAvatarState('idle');
  }, [currentLanguage, generateInitialGreeting]);

  // Initial mount setup
  useEffect(() => {
    resetConversationForRole(currentRole, currentLanguage);
  }, []);

  // Speak helper
  const handleSpeak = useCallback((text: string) => {
    if (!voiceEnabled) return;
    setAvatarState('speaking');
    voiceService.speak(
      text,
      currentLanguage.locale,
      () => setAvatarState('speaking'),
      () => setAvatarState('idle')
    );
  }, [voiceEnabled, currentLanguage.locale, voiceService]);

  // Core Query Dispatcher
  const handleSendMessage = async (
    text: string, 
    isVoice: boolean = false, 
    explicitChildId?: string,
    semanticIntent?: SemanticIntent
  ) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
      language: currentLanguage.code,
      role: currentRole,
      isVoiceInput: isVoice,
    };

    setMessages(prev => [...prev, userMsg]);
    setAvatarState('thinking');

    try {
      const result = await orchestrator.processQuery(
        text,
        currentRole,
        currentLanguage.code,
        context,
        isVoice,
        explicitChildId,
        semanticIntent
      );

      setMessages(prev => [...prev, result.message]);
      setContext(result.updatedContext);

      // Trigger TTS if enabled
      if (voiceEnabled) {
        handleSpeak(result.message.text);
      } else {
        setAvatarState('idle');
      }
    } catch (err) {
      console.error('Orchestrator error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I apologize, but an unexpected error occurred while processing your request in the simulation sandbox.',
        timestamp: new Date(),
        role: currentRole,
      };
      setMessages(prev => [...prev, errorMsg]);
      setAvatarState('idle');
    }
  };

  // Clarification option clicked (e.g. Rahul vs Priya for parents)
  const handleClarificationClick = (option: ClarificationOption, messageId?: string) => {
    if (messageId) {
      setMessages(prev =>
        prev.map(m => (m.id === messageId ? { ...m, selectedOptionId: option.id } : m))
      );
    }
    // Directly dispatch with childId attached
    handleSendMessage(option.payload, false, option.childId);
  };

  // Confirm Escalation Call Request
  const handleConfirmEscalation = (messageId: string, payload: EscalationPayload) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === messageId && m.escalationPayload) {
          return {
            ...m,
            escalationPayload: {
              ...m.escalationPayload,
              status: 'submitted',
            },
          };
        }
        return m;
      })
    );

    // AI confirmation feedback
    setTimeout(() => {
      const confirmMsg: ChatMessage = {
        id: `conf-${Date.now()}`,
        sender: 'assistant',
        text: `✅ Call request ticket #${payload.ticketId} has been successfully registered. Mr. Vikram Verma's portal has been notified to schedule a call with parent Sunita Sharma.`,
        timestamp: new Date(),
        language: currentLanguage.code,
        role: currentRole,
        contextTag: 'Escalation Dispatch Completed',
      };
      setMessages(prev => [...prev, confirmMsg]);
      if (voiceEnabled) {
        handleSpeak(confirmMsg.text);
      }
    }, 400);
  };

  // Dismiss Escalation
  const handleDismissEscalation = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === messageId && m.escalationPayload) {
          return {
            ...m,
            escalationPayload: undefined,
          };
        }
        return m;
      })
    );

    const cancelMsg: ChatMessage = {
      id: `cancel-${Date.now()}`,
      sender: 'assistant',
      text: 'Understood. We will continue chatting here. How else can I help you?',
      timestamp: new Date(),
      language: currentLanguage.code,
      role: currentRole,
    };
    setMessages(prev => [...prev, cancelMsg]);
  };

  // Voice recognition toggle
  const handleToggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setAvatarState('idle');
    } else {
      setAvatarState('listening');
      setIsListening(true);
      const success = voiceService.startListening(
        currentLanguage.locale,
        (transcript, isFinal) => {
          if (isFinal && transcript.trim()) {
            setIsListening(false);
            voiceService.stopListening();
            handleSendMessage(transcript, true);
          }
        },
        (error) => {
          console.warn('Voice recognition error:', error);
          setIsListening(false);
          setAvatarState('idle');
          // If browser speech recognition is blocked, provide helpful fallback hint
          if (error.includes('not supported') || error.includes('restricted') || error.includes('permission')) {
            const fallbackPrompt = currentLanguage.samplePrompt;
            handleSendMessage(fallbackPrompt, true);
          }
        },
        () => {
          setIsListening(false);
          setAvatarState(prev => (prev === 'listening' ? 'idle' : prev));
        }
      );

      if (!success) {
        // Fallback simulation for unsupported browsers/iframes
        setTimeout(() => {
          setIsListening(false);
          handleSendMessage(currentLanguage.samplePrompt, true);
        }, 1200);
      }
    }
  };

  // Role switch handler
  const handleSelectRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    resetConversationForRole(newRole, currentLanguage);
  };

  // Language switch handler
  const handleSelectLanguage = (newLang: SupportedLanguage) => {
    setCurrentLanguage(newLang);
    resetConversationForRole(currentRole, newLang);
  };

  // Clear Context
  const handleClearContext = () => {
    setContext({});
    resetConversationForRole(currentRole, currentLanguage);
  };

  // If user selected Landing view
  if (viewMode === 'landing') {
    return (
      <LandingHero
        selectedLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        onSelectRoleAndStart={(role) => {
          handleSelectRole(role);
          setViewMode('assistant');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white" id="aura-app-root">
      
      {/* Top Application Header */}
      <Header
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => {
          const next = !voiceEnabled;
          setVoiceEnabled(next);
          if (!next) voiceService.stopSpeaking();
        }}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Role & Context Status Banner */}
      <RoleDemoBanner
        currentRole={currentRole}
        context={context}
        onSwitchRole={handleSelectRole}
        onClearContext={handleClearContext}
      />

      {/* Main Conversation Canvas */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-2 sm:px-6 relative">
        
        {/* Dynamic Abstract AI Avatar Section */}
        <div className="pt-4 pb-2 flex flex-col items-center justify-center">
          <AIAvatar
            state={avatarState}
            onAvatarClick={() => {
              // Interactive avatar test prompt
              if (avatarState === 'idle') {
                handleSpeak(currentLanguage.greeting);
              }
            }}
          />
        </div>

        {/* Chat Feed */}
        <ChatArea
          messages={messages}
          currentRole={currentRole}
          onClarificationClick={handleClarificationClick}
          onConfirmEscalation={handleConfirmEscalation}
          onDismissEscalation={handleDismissEscalation}
          onSpeakMessage={handleSpeak}
        />

        {/* Role-Specific Quick Prompt Chips */}
        <div className="max-w-4xl mx-auto w-full px-2">
          <QuickActionsBar
            currentRole={currentRole}
            currentLanguageCode={currentLanguage.code}
            onSelectPrompt={(p, intent, childId) => handleSendMessage(p, false, childId, intent)}
            disabled={avatarState === 'thinking'}
          />
        </div>

      </main>

      {/* Persistent Bottom Chat & Voice Input Bar */}
      <footer className="sticky bottom-0 z-20">
        <ChatInput
          onSendMessage={handleSendMessage}
          isListening={isListening}
          onToggleListening={handleToggleListening}
          disabled={avatarState === 'thinking'}
          currentLanguage={currentLanguage}
          onClearChat={() => resetConversationForRole(currentRole, currentLanguage)}
          hasMessages={messages.length > 1}
        />
      </footer>

      {/* Persona / Role Selector Modal */}
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
      />

      {/* Security & Architecture Inspector Modal */}
      <SecurityInspectorModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onRunTestPrompt={(p) => handleSendMessage(p, false)}
      />

    </div>
  );
}
