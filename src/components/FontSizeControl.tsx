'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Type, Check, ZoomIn, ZoomOut } from 'lucide-react';
import {
  useTypography,
  FONT_SIZE_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FontSizeLevel,
  FontFamilyChoice,
} from '../context/TypographyContext';

export const FontSizeControl: React.FC = () => {
  const {
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    fontFamily,
    setFontFamily,
    currentSizeObj,
    currentFontObj,
  } = useTypography();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Control Pill */}
      <div
        className="flex items-center rounded-lg border shadow-2xs shrink-0 overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card-strong)',
        }}
      >
        {/* Decrease Font Size Quick Button */}
        <button
          type="button"
          onClick={decreaseFontSize}
          disabled={fontSize === 'normal'}
          title="Decrease text size (A-)"
          aria-label="Decrease text size"
          className="px-1.5 py-1.5 transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed border-r"
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-card)',
          }}
        >
          <span className="font-bold text-xs flex items-center leading-none">
            A<span className="text-[10px] font-extrabold">-</span>
          </span>
        </button>

        {/* Main Settings Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title={`Text Size: ${currentSizeObj.label} (${currentSizeObj.percentage}), Font: ${currentFontObj.name}`}
          aria-label="Open font size and text appearance settings"
          className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 text-xs font-bold transition-all cursor-pointer"
          style={{
            color: 'var(--text-primary)',
          }}
        >
          <Type size={14} style={{ color: 'var(--accent-primary)' }} />
          <span className="hidden sm:inline font-semibold">{currentSizeObj.shortLabel}</span>
        </button>

        {/* Increase Font Size Quick Button */}
        <button
          type="button"
          onClick={increaseFontSize}
          disabled={fontSize === 'xlarge'}
          title="Increase text size (A+)"
          aria-label="Increase text size"
          className="px-1.5 py-1.5 transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed border-l"
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-card)',
          }}
        >
          <span className="font-bold text-xs flex items-center leading-none">
            A<span className="text-[10px] font-extrabold">+</span>
          </span>
        </button>
      </div>

      {/* Popover Settings Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-xl shadow-xl border p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card-strong)',
          }}
        >
          {/* Header */}
          <div className="pb-2 border-b" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-extrabold uppercase tracking-wider block"
                style={{ color: 'var(--text-primary)' }}
              >
                Text Size & Font
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--badge-text)',
                }}
              >
                {currentSizeObj.percentage}
              </span>
            </div>
          </div>

          {/* Text Size Selection */}
          <div className="space-y-2">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider block"
              style={{ color: 'var(--text-secondary)' }}
            >
              Text Size
            </span>

            <div className="grid grid-cols-3 gap-1.5">
              {FONT_SIZE_OPTIONS.map((opt) => {
                const isSelected = fontSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontSize(opt.id as FontSizeLevel)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-card)',
                      color: 'var(--text-primary)',
                      boxShadow: isSelected ? '0 0 0 1px var(--accent-primary)' : 'none',
                    }}
                  >
                    <span
                      className="font-extrabold mb-0.5"
                      style={{
                        fontSize: opt.id === 'normal' ? '14px' : opt.id === 'large' ? '17px' : '20px',
                        lineHeight: 1.1,
                      }}
                    >
                      Aa
                    </span>
                    <span className="text-[11px] font-bold block">{opt.label.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-75 font-medium">{opt.percentage}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Family Selection */}
          <div className="space-y-2">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider block"
              style={{ color: 'var(--text-secondary)' }}
            >
              Font Family
            </span>

            <div className="space-y-1.5">
              {FONT_FAMILY_OPTIONS.map((f) => {
                const isSelected = fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontFamily(f.id as FontFamilyChoice)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-card)',
                      color: 'var(--text-primary)',
                      fontFamily: f.cssFamily,
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm">{f.name}</span>
                        {f.id === 'lexend' && (
                          <span
                            className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-full border"
                            style={{
                              backgroundColor: 'var(--accent-primary)',
                              color: 'var(--accent-contrast)',
                              borderColor: 'var(--accent-primary)',
                            }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>
                      <span
                        className="text-[11px] block mt-0.5 opacity-80 truncate"
                        style={{ fontFamily: 'inherit' }}
                      >
                        {f.tagline}
                      </span>
                    </div>

                    {isSelected && (
                      <Check size={16} className="shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Preview Box */}
          <div
            className="p-2.5 rounded-lg border text-center space-y-1"
            style={{
              backgroundColor: 'var(--bg-card-hover)',
              borderColor: 'var(--border-card)',
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
              Live Preview
            </span>
            <p className="font-semibold text-sm leading-snug">
              Calculate: <span className="font-extrabold">25% of £80</span> = £20
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
