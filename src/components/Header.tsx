'use client';

import React from 'react';
import {
  BookOpen,
  FileText,
  Menu,
  PanelLeftClose,
  Volume2,
  VolumeX,
  Search,
  Video,
  Cpu,
  Award,
} from 'lucide-react';
import { YearLevel } from '../types/math.ts';
import { mathTopics } from '../data/mathTopics.ts';
import { AudioButton } from './AudioButton.tsx';
import { FontSizeControl } from './FontSizeControl.tsx';
import { FullscreenToggle } from './FullscreenToggle.tsx';
import { soundEffects } from '../utils/soundEffects.ts';

export type NavModeType = 'learn' | 'video' | 'tools' | 'assessment';

interface HeaderProps {
  selectedYear: YearLevel | 'All';
  onSelectYear: (year: YearLevel | 'All') => void;
  onOpenFormulaDrawer: () => void;
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  isDesktopSidebarOpen?: boolean;
  onToggleDesktopSidebar?: () => void;
  activeMode?: NavModeType;
  onSelectMode?: (mode: NavModeType) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedYear,
  onSelectYear,
  onOpenFormulaDrawer,
  isMobileNavOpen,
  onToggleMobileNav,
  isDesktopSidebarOpen = true,
  onToggleDesktopSidebar,
  activeMode = 'learn',
  onSelectMode,
  onOpenSearch,
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(() => soundEffects.getIsEnabled());

  const handleToggleSound = () => {
    const nextState = soundEffects.toggle();
    setSoundEnabled(nextState);
  };

  const handleMenuClick = () => {
    onToggleMobileNav();
    if (onToggleDesktopSidebar) {
      onToggleDesktopSidebar();
    }
  };

  const yearOptions: { id: YearLevel | 'All'; label: string }[] = [
    { id: 'All', label: 'All' },
    { id: 'Primary 5 / Year 5 (Age 9-10)', label: 'Year 5' },
    { id: 'Primary 6 / Year 6 (Age 10-11)', label: 'Year 6' },
    { id: 'Primary 7 / Year 7 (Age 11-12)', label: 'Year 7' },
    { id: 'Year 8+ / KS3 (Age 12+)', label: 'KS3' },
  ];

  const modes: { id: NavModeType; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'learn', label: 'Lessons', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'tools', label: 'Tools', icon: Cpu },
    { id: 'assessment', label: 'SATs', icon: Award },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b shadow-xs transition-colors"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card-strong)',
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 w-full">
          {/* Logo & Navigation Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="header-menu-toggle-btn"
              type="button"
              onClick={handleMenuClick}
              className="h-9 px-2.5 sm:px-3 rounded-xl cursor-pointer transition-all shrink-0 flex items-center gap-1.5 border shadow-2xs tactile-btn"
              style={{
                color: isMobileNavOpen || isDesktopSidebarOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
                backgroundColor: isMobileNavOpen || isDesktopSidebarOpen ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                borderColor: isMobileNavOpen || isDesktopSidebarOpen ? 'var(--accent-primary)' : 'var(--border-card)',
              }}
              aria-label="Toggle Topic Navigation Menu"
              title="Toggle sidebar"
            >
              {isDesktopSidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
              <span className="hidden md:inline text-xs font-bold tracking-tight">
                Topics
              </span>
            </button>

            {/* Brand Logo & Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0 font-serif font-black text-lg sm:text-xl tracking-tighter leading-none"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
              >
                ∑
              </div>
              <div className="min-w-0 flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight block truncate" style={{ color: 'var(--text-primary)' }}>
                  Maths Master
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline-block"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    color: 'var(--badge-text)',
                    borderColor: 'var(--badge-border)',
                  }}
                >
                  KS2 / KS3
                </span>
              </div>
            </div>
          </div>

          {/* Center Search Trigger */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shadow-2xs hover:opacity-90 cursor-pointer min-w-[180px] max-w-[240px]"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-muted)',
              }}
              title="Search (⌘K)"
            >
              <Search size={14} style={{ color: 'var(--accent-primary)' }} />
              <span className="flex-1 text-left truncate">Search...</span>
              <kbd
                className="px-1.5 py-0.5 text-[10px] font-bold rounded border uppercase tracking-wider opacity-75"
                style={{ borderColor: 'var(--border-card-strong)' }}
              >
                ⌘K
              </kbd>
            </button>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search icon button for mobile / tablet */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all cursor-pointer shadow-2xs shrink-0 tactile-btn"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
                title="Search"
              >
                <Search size={16} style={{ color: 'var(--accent-primary)' }} />
              </button>
            )}

            {/* Typography Control */}
            <FontSizeControl />

            {/* Fullscreen Mode */}
            <FullscreenToggle />

            {/* Sound FX Toggle */}
            <button
              type="button"
              id="header-sound-effects-btn"
              onClick={handleToggleSound}
              className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all cursor-pointer shadow-2xs shrink-0 tactile-btn"
              style={{
                backgroundColor: soundEnabled ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                borderColor: soundEnabled ? 'var(--reading-highlight-border)' : 'var(--border-card)',
                color: soundEnabled ? 'var(--accent-primary)' : 'var(--text-muted)',
              }}
              title={soundEnabled ? 'Sound FX On' : 'Sound FX Muted'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Quick Formulas Vault Button */}
            <button
              type="button"
              id="header-formula-vault-btn"
              onClick={onOpenFormulaDrawer}
              className="h-8 sm:h-9 flex items-center gap-1.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs shrink-0 tactile-btn"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card-strong)',
                color: 'var(--text-primary)',
              }}
              title="Formulas"
            >
              <FileText size={15} style={{ color: 'var(--accent-primary)' }} />
              <span className="hidden sm:inline">Formulas</span>
            </button>

            {/* Global Audio Narration Guide Button */}
            <AudioButton
              id="audio-header-global"
              textToRead="Welcome to Maths Master. Explore interactive lessons, worked examples, videos, and SATs practice tests."
              title="Audio Guide"
              label="Audio Guide"
              isGlobal={true}
              size="md"
            />
          </div>
        </div>

        {/* Sub-Header Navigation: Mode Switcher Tabs + Year Level Filter */}
        <div
          className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 py-2 border-t text-xs overflow-x-auto no-scrollbar"
          style={{ borderColor: 'var(--border-card)' }}
        >
          {/* Main Mode Navigation Tabs */}
          {onSelectMode && (
            <div
              className="flex items-center gap-1 p-0.5 rounded-xl border shrink-0 overflow-x-auto"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
              }}
            >
              {modes.map((m) => {
                const IconComponent = m.icon;
                const isSelected = activeMode === m.id;

                const getModeColorStyle = () => {
                  if (!isSelected) {
                    return {
                      backgroundColor: 'transparent',
                      color: 'var(--text-secondary)',
                      borderColor: 'transparent',
                    };
                  }
                  switch (m.id) {
                    case 'learn':
                      return { backgroundColor: '#0d9488', color: '#ffffff', borderColor: '#0f766e' };
                    case 'video':
                      return { backgroundColor: '#e11d48', color: '#ffffff', borderColor: '#be123c' };
                    case 'tools':
                      return { backgroundColor: '#0284c7', color: '#ffffff', borderColor: '#0369a1' };
                    case 'assessment':
                      return { backgroundColor: '#7c3aed', color: '#ffffff', borderColor: '#6d28d9' };
                    default:
                      return { backgroundColor: 'var(--accent-primary)', color: '#ffffff', borderColor: 'var(--accent-primary)' };
                  }
                };

                const modeStyle = getModeColorStyle();

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectMode(m.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-extrabold text-xs whitespace-nowrap transition-all cursor-pointer tactile-btn border"
                    style={{
                      backgroundColor: modeStyle.backgroundColor,
                      color: modeStyle.color,
                      borderColor: modeStyle.borderColor,
                      boxShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.12)' : 'none',
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Year Level Filter Segmented Bar */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl border shrink-0 overflow-x-auto"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-card)',
            }}
          >
            {yearOptions.map((opt) => {
              const isSelected = selectedYear === opt.id;
              const count = opt.id === 'All'
                ? mathTopics.length
                : mathTopics.filter((t) => t.yearLevel === opt.id).length;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectYear(opt.id)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1 shrink-0 tactile-btn"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                    boxShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                >
                  <span>{opt.label}</span>
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{
                      color: isSelected ? 'var(--accent-contrast)' : 'var(--text-muted)',
                      opacity: isSelected ? 0.9 : 0.75,
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
