/**
 * Core Type Definitions for AURA AI — Human-Like School Assistant
 * Built for XYZ AI Competition Assessment Prototype
 */

export type UserRole = 'student' | 'parent' | 'teacher' | 'principal';

export type SemanticIntent =
  | 'GET_OWN_ATTENDANCE'
  | 'GET_CHILD_ATTENDANCE'
  | 'GET_CLASS_ATTENDANCE'
  | 'GET_SCHOOL_ATTENDANCE'
  | 'GET_ANOMALY_ATTENDANCE'
  | 'GET_HISTORICAL_ATTENDANCE'
  | 'MARK_ATTENDANCE'
  | 'TEACHER_SUPPORT_REQUEST'
  | 'MANAGEMENT_SUPPORT_REQUEST'
  | 'SECURITY_INJECTION_TEST'
  | 'SECURITY_ROLE_SPOOF_TEST'
  | 'GENERAL_HELP';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  greeting: string;
  samplePrompt: string;
  locale: string;
}

export interface ChildInfo {
  id: string;
  name: string;
  class: string;
  rollNo: number;
}

export interface UserProfile {
  role: UserRole;
  name: string;
  id: string;
  details: string;
  avatarBg: string;
  children?: (string | ChildInfo)[]; // for parents
  assignedClass?: string; // for teachers
  department?: string; // for principals
  enrolledClass?: string; // for students
}

export interface ClarificationOption {
  id: string;
  label: string;
  sublabel?: string;
  payload: string;
  childId?: string;
  studentName?: string;
  isSelected?: boolean;
}

export interface ActionPayload {
  actionType: 'mark_attendance' | 'generate_report' | 'schedule_leave' | 'escalate_call';
  targetEntity: string;
  status: 'pending_auth' | 'executing' | 'completed' | 'failed' | 'denied';
  details: string;
  timestamp: string;
  authorizedRole: UserRole[];
  auditLogId?: string;
}

export interface EscalationPayload {
  ticketId: string;
  studentName: string;
  targetRole: string;
  assignedStaff: string;
  reason: string;
  urgency: 'normal' | 'high' | 'urgent';
  status: 'draft' | 'submitted' | 'acknowledged';
  createdAt: string;
}

export interface SecurityEvent {
  type: 'prompt_injection_blocked' | 'unauthorized_role_action' | 'system_prompt_shield' | 'credential_guard' | 'clarification_triggered' | 'context_preserved';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
  language?: string;
  role?: UserRole;
  contextTag?: string; // e.g. "Context: Rahul Sharma (10-A)"
  clarificationOptions?: ClarificationOption[];
  selectedOptionId?: string;
  actionPayload?: ActionPayload;
  escalationPayload?: EscalationPayload;
  securityEvent?: SecurityEvent;
  isVoiceInput?: boolean;
}

export interface ConversationContext {
  activeStudentName?: string;
  activeChildId?: string;
  activeClass?: string;
  lastTopic?: 'attendance_current' | 'attendance_historical' | 'marks' | 'leave' | 'escalation' | 'general';
  previousQuery?: string;
  selectedChild?: string;
  pendingAction?: ActionPayload;
}

export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  role: UserRole;
  category: 'attendance' | 'follow_up' | 'action' | 'clarification' | 'escalation' | 'security_test';
  badge?: string;
  semanticIntent?: SemanticIntent;
  explicitChildId?: string;
}
