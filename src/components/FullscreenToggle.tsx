'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  // Check if browser supports fullscreen
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const doc = document as any;
      const supported = !!(
        doc.fullscreenEnabled ||
        doc.webkitFullscreenEnabled ||
        doc.mozFullScreenEnabled ||
        doc.msFullscreenEnabled
      );
      setIsSupported(supported);
    }
  }, []);

  // Synchronize state with document fullscreen element
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const active = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(active);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      const doc = document as any;
      const elem = document.documentElement as any;

      const isCurrentFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isCurrentFullscreen) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request could not be completed:', err);
    }
  }, []);

  // Keyboard shortcut: Pressing 'F' (when not inside an input/textarea) toggles fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen]);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      id="fullscreen-toggle-btn"
      onClick={toggleFullscreen}
      className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs border shrink-0 hover:opacity-90 active:scale-95"
      style={{
        backgroundColor: isFullscreen ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
        borderColor: isFullscreen ? 'var(--reading-highlight-border)' : 'var(--border-card-strong)',
        color: 'var(--text-primary)',
      }}
      title={isFullscreen ? 'Exit Full Screen (Press F or Esc)' : 'Full Screen Mode (Press F)'}
      aria-label={isFullscreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
    >
      {isFullscreen ? (
        <>
          <Minimize2 size={15} style={{ color: 'var(--accent-primary)' }} />
          <span className="hidden xl:inline text-xs font-bold">Exit Fullscreen</span>
        </>
      ) : (
        <>
          <Maximize2 size={15} style={{ color: 'var(--accent-primary)' }} />
          <span className="hidden xl:inline text-xs font-bold">Fullscreen</span>
        </>
      )}
    </button>
  );
};
