'use client';

import React, { useState, useEffect } from 'react';
import { audioSpeech } from '../utils/audioSpeech';

interface ReadableCardProps {
  id: string;
  textToRead?: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'article' | 'section';
  highlightStyle?: 'full' | 'subtle' | 'inner';
  ariaLabel?: string;
  label?: string;
  enableClickToRead?: boolean;
}

export const ReadableCard: React.FC<ReadableCardProps> = ({
  id,
  textToRead = '',
  children,
  className = '',
  activeClassName = '',
  style,
  as: Component = 'div',
  highlightStyle = 'full',
  ariaLabel,
  label,
  enableClickToRead = true,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = audioSpeech.subscribe((state) => {
      setIsActive(state.activeId === id && state.isSpeaking);
    });
    return unsubscribe;
  }, [id]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!enableClickToRead) return;

    // CRITICAL: Stop propagation so child clicks never bubble to a parent section or card!
    e.stopPropagation();

    // If the click originated from an interactive element (button, input, slider, link, etc.),
    // let that element handle its own interaction without toggling card audio
    const target = e.target as HTMLElement | null;
    if (target) {
      const interactiveEl = target.closest(
        'button, input, select, textarea, a, summary, [role="button"], [data-no-speech="true"]'
      );
      if (interactiveEl) {
        return;
      }
    }

    if (isActive || audioSpeech.getCurrentId() === id) {
      audioSpeech.stop();
    } else {
      audioSpeech.speak(id, textToRead, { label: label || ariaLabel });
    }
  };

  const getCardStyle = () => {
    if (isActive) {
      return {
        backgroundColor: 'var(--reading-highlight-bg)',
        borderColor: 'var(--reading-highlight-border)',
        boxShadow: '0 0 0 2.5px var(--reading-highlight-ring), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        color: 'var(--text-primary)',
      };
    }
    if (highlightStyle === 'inner') {
      return {
        backgroundColor: 'var(--bg-card-subtle)',
        borderColor: 'var(--border-card)',
        color: 'var(--text-primary)',
      };
    }
    return {
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-card)',
      color: 'var(--text-primary)',
    };
  };

  return (
    <Component
      id={`readable-card-${id}`}
      onClick={handleCardClick}
      aria-label={ariaLabel}
      className={`relative rounded-2xl border transition-all duration-200 cursor-pointer ${
        isActive
          ? `z-10 ${activeClassName}`
          : 'hover:border-opacity-100 hover:shadow-xs'
      } ${className}`}
      style={
        isActive
          ? { ...style, ...getCardStyle() }
          : { ...getCardStyle(), ...style }
      }
    >
      {children}
    </Component>
  );
};

