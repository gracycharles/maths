'use client';

import React, { useEffect, useState } from 'react';
import { Square, Play, Pause } from 'lucide-react';
import { audioSpeech, AudioSpeechState } from '../utils/audioSpeech';

export const FloatingAudioController: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioSpeechState>(audioSpeech.getState());

  useEffect(() => {
    const unsubscribe = audioSpeech.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  if (!audioState.isSpeaking && !audioState.activeId) {
    return null;
  }

  // In video lessons, keep the floating audio controller in hide mode without exposing external controls
  const isVideoLessonAudio =
    audioState.activeId?.startsWith('clip-') ||
    audioState.activeId?.startsWith('chap-') ||
    audioState.activeId?.startsWith('quiz-feedback-') ||
    audioState.activeId?.startsWith('video-') ||
    audioState.activeId?.includes('masterclass');

  if (isVideoLessonAudio) {
    return null;
  }

  const rates = [
    { label: '0.8x', value: 0.8 },
    { label: '1x', value: 0.95 },
    { label: '1.2x', value: 1.2 },
  ];

  return (
    <aside
      role="region"
      aria-label="Active Audio Playback Controls"
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 pointer-events-auto"
    >
      <div
        className="rounded-full border px-2.5 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-1.5 sm:gap-2.5 backdrop-blur-md shadow-lg"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card-strong)',
          boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--accent-primary)',
        }}
      >
        {/* Animated mini soundbars icon */}
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 border"
          style={{
            backgroundColor: 'var(--reading-highlight-bg)',
            borderColor: 'var(--reading-highlight-border)',
            color: 'var(--accent-primary)',
          }}
          title="Audio Playing"
        >
          <div className="flex items-end gap-0.5 h-2.5 sm:h-3">
            <span
              className={`w-0.5 bg-current rounded-full ${audioState.isPaused ? 'h-1.5' : 'animate-pulse'}`}
              style={{ height: audioState.isPaused ? '30%' : '55%', animationDuration: '450ms' }}
            />
            <span
              className={`w-0.5 bg-current rounded-full ${audioState.isPaused ? 'h-2.5' : 'animate-pulse'}`}
              style={{ height: audioState.isPaused ? '50%' : '95%', animationDuration: '650ms' }}
            />
            <span
              className={`w-0.5 bg-current rounded-full ${audioState.isPaused ? 'h-1' : 'animate-pulse'}`}
              style={{ height: audioState.isPaused ? '20%' : '45%', animationDuration: '500ms' }}
            />
          </div>
        </div>

        {/* Short title snippet */}
        <span
          className="text-[11px] sm:text-xs font-bold truncate max-w-[100px] sm:max-w-[160px]"
          style={{ color: 'var(--text-primary)' }}
          title={audioState.label || 'Audio Playing'}
        >
          {audioState.label || 'Reading aloud'}
        </span>

        <span className="w-px h-3 shrink-0 opacity-25" style={{ backgroundColor: 'var(--border-card-strong)' }} />

        {/* Speed rate pills */}
        <div
          className="flex items-center p-0.5 rounded-full border shrink-0"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          {rates.map((r) => {
            const isCurrent = Math.abs(audioState.rate - r.value) < 0.08;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => audioSpeech.setRate(r.value)}
                className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full transition-all cursor-pointer leading-none"
                style={{
                  backgroundColor: isCurrent ? 'var(--accent-primary)' : 'transparent',
                  color: isCurrent ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                }}
                title={`Audio speed ${r.label}`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Pause / Play Button */}
        <button
          type="button"
          onClick={() => {
            if (audioState.isPaused) {
              audioSpeech.resume();
            } else {
              audioSpeech.pause();
            }
          }}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 shrink-0"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
            color: 'var(--text-primary)',
          }}
          title={audioState.isPaused ? 'Resume reading' : 'Pause reading'}
          aria-label={audioState.isPaused ? 'Resume reading' : 'Pause reading'}
        >
          {audioState.isPaused ? <Play size={11} className="fill-current ml-0.5" /> : <Pause size={11} />}
        </button>

        {/* Slim Stop Button */}
        <button
          type="button"
          onClick={() => audioSpeech.stop()}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full font-bold text-[11px] sm:text-xs text-white transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0 bg-red-600 hover:bg-red-700 active:scale-95"
          title="Stop reading (Esc)"
          aria-label="Stop reading"
        >
          <Square size={9} className="fill-current" />
          <span>Stop</span>
        </button>
      </div>
    </aside>
  );
};

