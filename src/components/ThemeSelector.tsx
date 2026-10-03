'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { usePastelTheme, PASTEL_THEMES, PastelThemeId } from '../context/ThemeContext.tsx';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, currentThemeObj } = usePastelTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id="theme-selector-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs border shrink-0 tactile-btn hover:opacity-90"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card-strong)',
          color: 'var(--text-primary)',
        }}
        title={`Current Theme: ${currentThemeObj.name} (Click to change)`}
      >
        <Palette size={15} style={{ color: 'var(--accent-primary)' }} />
        <span className="text-sm leading-none">{currentThemeObj.emoji}</span>
        <span className="hidden md:inline font-bold text-xs">{currentThemeObj.shortName}</span>
        <span className="flex items-center gap-0.5 ml-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
            style={{ backgroundColor: currentThemeObj.canvasHex }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
            style={{ backgroundColor: currentThemeObj.accentHex }}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl shadow-2xl border p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card-strong)',
          }}
        >
          <div className="px-2.5 py-1.5 border-b mb-2" style={{ borderColor: 'var(--border-card)' }}>
            <span className="text-[11px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
              Choose Display Theme
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              2 high-contrast study palettes (Day & Night)
            </span>
          </div>

          <div className="space-y-1.5">
            {PASTEL_THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id as PastelThemeId);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer border tactile-btn"
                  style={{
                    backgroundColor: isSelected ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-card)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div className="flex items-start gap-2.5 pr-2 min-w-0">
                    <span className="text-xl leading-none mt-0.5 shrink-0">{t.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold leading-tight truncate">{t.name}</span>
                        {t.isDark ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase bg-amber-500/20 text-amber-500 shrink-0">
                            Night
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase bg-amber-600/20 text-amber-700 dark:text-amber-400 shrink-0">
                            Day
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-80 font-medium block mt-0.5 leading-snug line-clamp-2">{t.shortDesc}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center -space-x-1">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: t.canvasHex }}
                        title="Canvas"
                      />
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: t.accentHex }}
                        title="Accent"
                      />
                    </div>
                    {isSelected && <Check size={16} className="shrink-0 font-black" style={{ color: 'var(--accent-primary)' }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
