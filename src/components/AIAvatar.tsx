import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AvatarState } from '../types';
import { Sparkles, Mic, BrainCircuit, Volume2 } from 'lucide-react';

interface AIAvatarProps {
  state: AvatarState;
  onAvatarClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const AIAvatar: React.FC<AIAvatarProps> = ({
  state,
  onAvatarClick,
  size = 'md',
}) => {
  const getStatusDetails = () => {
    switch (state) {
      case 'listening':
        return {
          label: 'Listening...',
          sublabel: 'Capturing voice input',
          icon: Mic,
          color: 'text-amber-400',
          bgGlow: 'from-amber-500/20 via-orange-500/20 to-teal-500/20',
          borderColor: 'border-amber-500/40',
          ringColor: 'stroke-amber-400',
          pulseColor: 'bg-amber-400',
        };
      case 'thinking':
        return {
          label: 'Thinking...',
          sublabel: 'Processing context & safety rules',
          icon: BrainCircuit,
          color: 'text-indigo-400',
          bgGlow: 'from-indigo-500/20 via-purple-500/20 to-teal-500/20',
          borderColor: 'border-indigo-500/40',
          ringColor: 'stroke-indigo-400',
          pulseColor: 'bg-indigo-400',
        };
      case 'speaking':
        return {
          label: 'Speaking...',
          sublabel: 'Delivering human-like response',
          icon: Volume2,
          color: 'text-teal-400',
          bgGlow: 'from-teal-500/20 via-emerald-500/20 to-cyan-500/20',
          borderColor: 'border-teal-500/40',
          ringColor: 'stroke-teal-400',
          pulseColor: 'bg-teal-400',
        };
      case 'idle':
      default:
        return {
          label: 'Ready & Idle',
          sublabel: 'AURA AI Neural Core Active',
          icon: Sparkles,
          color: 'text-cyan-400',
          bgGlow: 'from-cyan-500/10 via-blue-500/10 to-teal-500/10',
          borderColor: 'border-cyan-500/30',
          ringColor: 'stroke-cyan-400/60',
          pulseColor: 'bg-cyan-400',
        };
    }
  };

  const status = getStatusDetails();
  const IconComponent = status.icon;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-40 h-40',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center select-none" id="aura-ai-avatar-container">
      {/* Outer Ambient Glow */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: state === 'listening' ? [1, 1.25, 1.1] : state === 'speaking' ? [1, 1.15, 1] : [1, 1.05, 1],
            opacity: state === 'idle' ? [0.3, 0.5, 0.3] : [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: state === 'thinking' ? 1.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 -m-6 rounded-full bg-gradient-to-r ${status.bgGlow} blur-2xl pointer-events-none`}
        />

        {/* Outer Kinetic Ring 1 */}
        <motion.div
          animate={{
            rotate: state === 'thinking' ? 360 : state === 'speaking' ? -360 : 180,
            scale: state === 'listening' ? [1, 1.08, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: state === 'thinking' ? 4 : 16,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className={`absolute ${sizeClasses} rounded-full border border-dashed ${status.borderColor} pointer-events-none`}
        />

        {/* Outer Orbiting Particle Ring 2 */}
        <motion.div
          animate={{
            rotate: state === 'thinking' ? -360 : 360,
          }}
          transition={{
            duration: state === 'thinking' ? 3 : 24,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute ${sizeClasses} rounded-full pointer-events-none p-1`}
        >
          <div className={`w-2 h-2 rounded-full ${status.pulseColor} shadow-[0_0_8px_currentColor]`} />
        </motion.div>

        {/* Central Core Orb */}
        <motion.button
          type="button"
          onClick={onAvatarClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative ${sizeClasses} rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex items-center justify-center cursor-pointer overflow-hidden group focus:outline-none focus:ring-2 focus:ring-teal-400`}
          id="aura-ai-avatar-core"
          aria-label={`AURA AI Avatar state: ${status.label}`}
        >
          {/* Internal Geometric Mesh Simulation */}
          <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100">
            {/* Background Grid Circles */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Dynamic Waveform Arcs */}
            <motion.path
              d="M 20,50 Q 35,30 50,50 T 80,50"
              fill="none"
              stroke={state === 'speaking' ? '#2dd4bf' : state === 'listening' ? '#fbbf24' : state === 'thinking' ? '#818cf8' : '#38bdf8'}
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={
                state === 'speaking'
                  ? { d: ['M 20,50 Q 35,20 50,50 T 80,50', 'M 20,50 Q 35,80 50,50 T 80,50', 'M 20,50 Q 35,20 50,50 T 80,50'] }
                  : state === 'listening'
                  ? { d: ['M 20,50 Q 35,35 50,50 T 80,50', 'M 20,50 Q 35,65 50,50 T 80,50', 'M 20,50 Q 35,35 50,50 T 80,50'] }
                  : { d: ['M 20,50 Q 35,45 50,50 T 80,50', 'M 20,50 Q 35,55 50,50 T 80,50', 'M 20,50 Q 35,45 50,50 T 80,50'] }
              }
              transition={{ duration: state === 'speaking' ? 0.6 : 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Perpendicular Harmonic Wave */}
            <motion.path
              d="M 50,20 Q 30,35 50,50 T 50,80"
              fill="none"
              stroke={state === 'speaking' ? '#14b8a6' : state === 'listening' ? '#f59e0b' : '#6366f1'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
              animate={
                state === 'thinking'
                  ? { strokeDashoffset: [0, 20] }
                  : { strokeDashoffset: [0, -10] }
              }
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </svg>

          {/* Central Energy Nucleus */}
          <motion.div
            animate={{
              scale: state === 'listening' ? [1, 1.4, 1] : state === 'speaking' ? [1, 1.2, 0.9, 1] : [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: state === 'speaking' ? 0.4 : 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr ${
              state === 'listening'
                ? 'from-amber-400 to-orange-500'
                : state === 'thinking'
                ? 'from-indigo-500 to-purple-500'
                : state === 'speaking'
                ? 'from-teal-400 to-emerald-500'
                : 'from-cyan-400 to-blue-500'
            } shadow-[0_0_20px_currentColor] flex items-center justify-center text-slate-950`}
          >
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 font-bold" />
          </motion.div>
        </motion.button>
      </div>

      {/* State Status Pill */}
      <motion.div
        layout
        className="mt-3 flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md"
      >
        <span className={`w-2 h-2 rounded-full ${status.pulseColor} animate-pulse`} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${status.color}`}>
          {status.label}
        </span>
        <span className="text-[10px] text-slate-500 hidden sm:inline">• {status.sublabel}</span>
      </motion.div>
    </div>
  );
};
