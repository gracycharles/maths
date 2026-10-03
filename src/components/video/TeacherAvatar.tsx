'use client';

import React from 'react';
import { Sparkles, AlertTriangle, Lightbulb, HelpCircle, CheckCircle, Volume2 } from 'lucide-react';

interface TeacherAvatarProps {
  name: string;
  role: string;
  mood: 'warm' | 'intense' | 'excited' | 'celebrating' | 'questioning';
  pose: 'welcome' | 'pointer' | 'warning' | 'thinking' | 'writing' | 'cheering';
  isSpeaking: boolean;
  teacherQuote?: string;
  activeCaptionText?: string;
  hasAudioVoice: boolean;
  onToggleVoice?: () => void;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  name,
  role,
  mood,
  pose,
  isSpeaking,
  teacherQuote,
  activeCaptionText,
  hasAudioVoice,
  onToggleVoice,
}) => {
  const getMoodBadge = () => {
    switch (mood) {
      case 'intense':
        return {
          icon: <AlertTriangle size={13} className="text-amber-500" />,
          label: 'Watch Out Trap!',
          bg: 'var(--contrast-warm-bg)',
          text: 'var(--contrast-warm)',
          border: 'var(--contrast-warm-border)',
        };
      case 'excited':
        return {
          icon: <Sparkles size={13} className="text-amber-400" />,
          label: 'Exam Speed Hack',
          bg: 'var(--contrast-amber-bg)',
          text: 'var(--contrast-amber)',
          border: 'var(--contrast-amber-border)',
        };
      case 'celebrating':
        return {
          icon: <CheckCircle size={13} className="text-emerald-500" />,
          label: 'Class Mastered!',
          bg: 'var(--contrast-teal-bg)',
          text: 'var(--contrast-teal)',
          border: 'var(--contrast-teal-border)',
        };
      case 'questioning':
        return {
          icon: <HelpCircle size={13} className="text-indigo-400" />,
          label: 'Pencils Ready! Your Turn',
          bg: 'var(--contrast-indigo-bg)',
          text: 'var(--contrast-indigo)',
          border: 'var(--contrast-indigo-border)',
        };
      default:
        return {
          icon: <Lightbulb size={13} className="text-amber-500" />,
          label: 'Key Mathematical Insight',
          bg: 'var(--bg-card-subtle)',
          text: 'var(--accent-primary)',
          border: 'var(--border-card-strong)',
        };
    }
  };

  const badge = getMoodBadge();

  return (
    <div
      className="flex flex-col sm:flex-row items-center gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-2xs transition-all relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card-strong)',
      }}
    >
      {/* Teacher Visual Figure */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Animated Avatar Frame */}
        <div
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 flex items-center justify-center relative overflow-hidden shadow-xs transition-transform"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: isSpeaking ? 'var(--accent-primary)' : 'var(--border-card)',
            boxShadow: isSpeaking ? '0 0 14px rgba(180, 83, 9, 0.25)' : 'none',
          }}
        >
          {/* Stylized SVG Teacher Portrait */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background classroom chalkboard tint */}
            <circle cx="50" cy="50" r="48" fill="var(--bg-canvas)" opacity="0.6" />

            {/* Hair / Head base */}
            <path
              d="M25 45 C25 22 75 22 75 45 C75 52 70 58 70 65 L30 65 C30 58 25 52 25 45 Z"
              fill="#52311f"
            />
            {/* Face */}
            <ellipse cx="50" cy="46" rx="20" ry="21" fill="#fcd3b6" />

            {/* Teacher Spectacles */}
            <rect x="35" y="40" width="12" height="9" rx="3" fill="none" stroke="#78350f" strokeWidth="2.5" />
            <rect x="53" y="40" width="12" height="9" rx="3" fill="none" stroke="#78350f" strokeWidth="2.5" />
            <line x1="47" y1="44" x2="53" y2="44" stroke="#78350f" strokeWidth="2.5" />

            {/* Eyes */}
            <circle cx="41" cy="44" r="2.2" fill="#292524" />
            <circle cx="59" cy="44" r="2.2" fill="#292524" />

            {/* Eyebrows */}
            <path
              d={mood === 'questioning' ? 'M36 37 Q41 33 46 36' : 'M36 37 Q41 35 46 38'}
              stroke="#451a03"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={mood === 'questioning' ? 'M54 36 Q59 33 64 37' : 'M54 38 Q59 35 64 37'}
              stroke="#451a03"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Nose */}
            <path d="M50 46 L48 51 L51 51" stroke="#e0a98b" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Animated Mouth (Moves during speech) */}
            {isSpeaking ? (
              <path
                d="M44 57 Q50 63 56 57 Q50 60 44 57 Z"
                fill="#b91c1c"
                className="animate-pulse"
              />
            ) : (
              <path d="M44 57 Q50 61 56 57" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}

            {/* Teacher Blazer & Scarf */}
            <path d="M22 88 C25 68 36 65 50 65 C64 65 75 68 78 88 Z" fill="#7c2d12" />
            <path d="M43 65 L50 82 L57 65 Z" fill="#fde047" />
            <path d="M47 82 L50 94 L53 82 Z" fill="#d97706" />

            {/* Pointer Wand for Pointer pose */}
            {(pose === 'pointer' || pose === 'writing') && (
              <line
                x1="70"
                y1="75"
                x2="92"
                y2="28"
                stroke="#eab308"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Live Soundwave Indicator when teacher is speaking */}
          {isSpeaking && (
            <div className="absolute bottom-1 right-1 flex items-end gap-0.5 px-1 py-0.5 rounded bg-black/60 backdrop-blur-xs">
              <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-3.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Live Instructor Badge */}
        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border"
          style={{
            backgroundColor: isSpeaking ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-card)',
          }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
          <span>{isSpeaking ? 'Teaching' : 'Instructor'}</span>
        </div>
      </div>

      {/* Teacher Persona & Spoken Commentary */}
      <div className="flex-1 min-w-0 space-y-1.5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <h4 className="font-extrabold text-sm sm:text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {name}
              </h4>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1"
                style={{
                  backgroundColor: badge.bg,
                  color: badge.text,
                  borderColor: badge.border,
                }}
              >
                {badge.icon}
                <span>{badge.label}</span>
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {role}
            </p>
          </div>

          {onToggleVoice && (
            <button
              type="button"
              onClick={onToggleVoice}
              className="h-7 px-2.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:opacity-90"
              style={{
                backgroundColor: hasAudioVoice ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                color: hasAudioVoice ? 'var(--accent-contrast)' : 'var(--text-primary)',
                borderColor: hasAudioVoice ? 'var(--accent-primary)' : 'var(--border-card)',
              }}
              title={hasAudioVoice ? 'Teacher Voice Active (Click to mute)' : 'Muted (Click to enable audio voice)'}
            >
              <Volume2 size={13} className={hasAudioVoice ? 'animate-pulse' : 'opacity-60'} />
              <span>{hasAudioVoice ? 'Voice Audio ON' : 'Voice Muted'}</span>
            </button>
          )}
        </div>

        {/* Dynamic Teacher Dialogue Bubble */}
        <div
          className="p-3 rounded-xl border text-xs sm:text-sm leading-relaxed relative text-left shadow-2xs transition-all"
          style={{
            backgroundColor: isSpeaking ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
            borderColor: isSpeaking ? 'var(--accent-primary)' : 'var(--border-card)',
            color: 'var(--text-primary)',
          }}
        >
          <div className="flex items-start gap-2">
            <span className="font-serif font-black text-base select-none" style={{ color: 'var(--accent-primary)' }}>
              “
            </span>
            <div className="font-medium flex-1">
              {activeCaptionText ? (
                <span>
                  <strong
                    className="mr-1 not-italic text-[11px] uppercase tracking-wider font-black"
                    style={{ color: 'var(--contrast-amber)' }}
                  >
                    {isSpeaking ? 'Speaking Now:' : 'Current Note:'}
                  </strong>
                  <span className="italic">{activeCaptionText}</span>
                </span>
              ) : (
                <span className="italic">{teacherQuote || "Mathematicians, let's look at the smartboard together!"}</span>
              )}
            </div>
            <span className="font-serif font-black text-base select-none self-end" style={{ color: 'var(--accent-primary)' }}>
              ”
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
