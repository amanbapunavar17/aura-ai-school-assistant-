import React from 'react';
import { UserRole } from '../types';
import { DEMO_PROFILES } from '../data/mockData';
import { 
  GraduationCap, 
  HeartHandshake, 
  BookOpenCheck, 
  Building2, 
  Check, 
  X, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const roleDetails = [
    {
      role: 'student' as UserRole,
      title: 'Student Demo Account',
      name: 'Aarav Sharma',
      subtitle: 'Grade 10-A • Roll No. 12',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Self-Service View Only',
      canDo: [
        'Query personal live attendance (87.5%)',
        'Ask follow-up questions for last month',
        'Check homework & class schedules',
      ],
      cannotDo: [
        'Cannot modify attendance records (RBAC protected)',
        'Cannot view other students\' private metrics',
      ],
      sampleQuery: '"What is my attendance?"',
    },
    {
      role: 'parent' as UserRole,
      title: 'Parent Demo Account',
      name: 'Sunita Sharma',
      subtitle: 'Parent of Rahul (10-A) & Priya (7-B)',
      icon: HeartHandshake,
      color: 'from-amber-600 to-orange-600',
      badge: 'Family Guardian Portal',
      canDo: [
        'Multi-child clarification (Rahul vs Priya)',
        'Check attendance breakdown & trends',
        'Direct human escalation (Request Teacher Callback)',
      ],
      cannotDo: [
        'Cannot edit institutional logs or attendance registers',
      ],
      sampleQuery: '"How much attendance does my child have?"',
    },
    {
      role: 'teacher' as UserRole,
      title: 'Teacher Demo Account',
      name: 'Vikram Verma',
      subtitle: 'Mathematics Lead • Class Teacher 10-A',
      icon: BookOpenCheck,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Faculty Administrative Scope',
      canDo: [
        'Execute authorized actions (e.g. Mark Rahul absent)',
        'Access Class 10-A attendance summaries',
        'Review and respond to parent escalation requests',
      ],
      cannotDo: [
        'Cannot access executive financial or school-wide salary records',
      ],
      sampleQuery: '"Mark Rahul absent today."',
    },
    {
      role: 'principal' as UserRole,
      title: 'Principal Demo Account',
      name: 'Dr. Arvind Mehta',
      subtitle: 'Principal • Oakridge Model Academy',
      icon: Building2,
      color: 'from-purple-600 to-violet-600',
      badge: 'Executive Leadership Scope',
      canDo: [
        'School-wide attendance analytics (1,116 / 1,248)',
        'Anomaly detection & low attendance grade alerts',
        'Executive summaries and governance reporting',
      ],
      cannotDo: [
        'Direct raw database dumping without audit review',
      ],
      sampleQuery: '"What is the overall attendance?"',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto" id="role-selector-modal">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Select Persona / Role Demo
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Switch between the four distinct institutional personas to test conversational context, role-based guardrails, action authorization, and human escalation workflows.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {roleDetails.map((item) => {
            const isSelected = currentRole === item.role;
            const IconComponent = item.icon;

            return (
              <div
                key={item.role}
                onClick={() => {
                  onSelectRole(item.role);
                  onClose();
                }}
                className={`relative rounded-xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-850 border-teal-500/80 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/50'
                }`}
              >
                <div>
                  {/* Top line with Icon, Title & Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {item.name}
                          {isSelected && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-semibold border border-teal-500/40">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Permissions & Capabilities */}
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Role Capabilities:
                    </div>
                    {item.canDo.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                        <span className="text-teal-400 font-bold text-[13px] leading-tight">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benchmark Query Box */}
                  <div className="mt-3 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Assessment Example Query:</span>
                    <span className="font-mono text-teal-300 text-[11px]">{item.sampleQuery}</span>
                  </div>
                </div>

                {/* Select button */}
                <button
                  type="button"
                  className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isSelected ? 'Currently Selected' : 'Switch to this Persona'}
                  {!isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Role selection modifies the simulated user context, permissions, and tool responses.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
