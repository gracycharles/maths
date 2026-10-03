'use client';

import React from 'react';
import { BookOpen, BookmarkCheck, FileText, Menu, X, Sparkles, PanelLeftClose, PanelLeftOpen, Volume2, VolumeX } from 'lucide-react';
import { YearLevel, CategoryId } from '../types/math';
import { mathTopics } from '../data/mathTopics';
import { AudioButton } from './AudioButton';
import { ThemeSelector } from './ThemeSelector';
import { FontSizeControl } from './FontSizeControl';
import { FullscreenToggle } from './FullscreenToggle';
import { soundEffects } from '../utils/soundEffects';

interface HeaderProps {
  selectedYear: YearLevel | 'All';
  onSelectYear: (year: YearLevel | 'All') => void;
  onOpenFormulaDrawer: () => void;
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  isDesktopSidebarOpen?: boolean;
  onToggleDesktopSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedYear,
  onSelectYear,
  onOpenFormulaDrawer,
  isMobileNavOpen,
  onToggleMobileNav,
  isDesktopSidebarOpen = true,
  onToggleDesktopSidebar,
}) => {
  const checkIsTabletLandscapeOrDesktop = () => {
    if (typeof window === 'undefined') return false;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    return window.innerWidth >= 1024 || (window.innerWidth >= 768 && isLandscape);
  };

  const [isDesktop, setIsDesktop] = React.useState<boolean>(checkIsTabletLandscapeOrDesktop);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(checkIsTabletLandscapeOrDesktop());
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    const mq = window.matchMedia('(orientation: landscape)');
    if (mq.addEventListener) {
      mq.addEventListener('change', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleResize);
      }
    };
  }, []);

  const handleMenuClick = () => {
    onToggleMobileNav();
    if (onToggleDesktopSidebar) {
      onToggleDesktopSidebar();
    }
  };

  const isCurrentMenuOpen = isDesktop ? isDesktopSidebarOpen : isMobileNavOpen;
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(() => soundEffects.getIsEnabled());

  const handleToggleSound = () => {
    const nextState = soundEffects.toggle();
    setSoundEnabled(nextState);
  };

  const yearOptions: (YearLevel | 'All')[] = [
    'All',
    'Primary 5 / Year 5 (Age 9-10)',
    'Primary 6 / Year 6 (Age 10-11)',
    'Primary 7 / Year 7 (Age 11-12)',
    'Year 8+ / KS3 (Age 12+)',
  ];

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b shadow-xs transition-colors"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card-strong)',
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 w-full">
          {/* Logo & Navigation Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="header-menu-toggle-btn"
              type="button"
              onClick={handleMenuClick}
              className="h-9 px-2.5 sm:px-3 rounded-xl cursor-pointer transition-all shrink-0 flex items-center gap-1.5 border shadow-2xs tactile-btn"
              style={{
                color: isCurrentMenuOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
                backgroundColor: isCurrentMenuOpen ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                borderColor: isCurrentMenuOpen ? 'var(--accent-primary)' : 'var(--border-card)',
              }}
              aria-label={isCurrentMenuOpen ? 'Collapse Navigation Menu' : 'Open Navigation Menu'}
              title={
                isCurrentMenuOpen
                  ? 'Collapse topic navigator menu to view full width content'
                  : 'Open topic navigator menu'
              }
            >
              {isCurrentMenuOpen ? (
                isDesktop ? <PanelLeftClose size={18} /> : <X size={18} />
              ) : (
                <Menu size={18} />
              )}
              <span className="hidden md:inline text-xs font-bold tracking-tight">
                {isCurrentMenuOpen ? 'Collapse Menu' : 'Menu'}
              </span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
              >
                <span className="font-serif font-black text-lg sm:text-xl tracking-tighter leading-none">∑</span>
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-base sm:text-lg tracking-tight block truncate" style={{ color: 'var(--text-primary)' }}>
                  Maths Master
                </span>
                <p className="hidden md:block text-[11px] font-medium -mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                  UK Curriculum Mathematics · Ages 9 to 12+
                </p>
              </div>
            </div>
          </div>

          {/* Theme Selector, Font Size Control, Formula Vault & Audio Intro */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            {/* Font Size & Typeface Control */}
            <FontSizeControl />

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Fullscreen Mode Toggle */}
            <FullscreenToggle />

            {/* Sound Effects Toggle with kid-friendly feedback */}
            <button
              type="button"
              id="header-sound-effects-btn"
              onClick={handleToggleSound}
              className="h-8 sm:h-9 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 rounded-lg sm:rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs shrink-0 tactile-btn"
              style={{
                backgroundColor: soundEnabled ? 'var(--contrast-teal-bg)' : 'var(--bg-card-subtle)',
                borderColor: soundEnabled ? 'var(--contrast-teal-border)' : 'var(--border-card)',
                color: soundEnabled ? 'var(--contrast-teal)' : 'var(--text-muted)',
              }}
              title={
                soundEnabled
                  ? 'Celebration Sound FX Active (Click to mute)'
                  : 'Celebration Sound FX Muted (Click to enable audio rewards)'
              }
              aria-label="Toggle Celebration Sound Effects"
            >
              {soundEnabled ? (
                <Volume2 size={15} style={{ color: 'var(--contrast-teal)' }} />
              ) : (
                <VolumeX size={15} />
              )}
              <span className="hidden lg:inline text-[11px] font-bold">
                {soundEnabled ? 'FX On' : 'FX Mute'}
              </span>
            </button>

            <button
              type="button"
              id="header-formula-vault-btn"
              onClick={onOpenFormulaDrawer}
              className="h-8 sm:h-9 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer shadow-2xs shrink-0 tactile-btn"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card-strong)',
                color: 'var(--text-primary)',
              }}
              title="Open Formula & Rules Vault"
            >
              <FileText size={15} style={{ color: 'var(--accent-primary)' }} />
              <span className="hidden md:inline">Formulas</span>
            </button>

            <AudioButton
              id="audio-header-global"
              textToRead="Welcome to Maths Master for Primary 5, Primary 6, and Primary 7 pupils. Select any topic to study step-by-step worked examples, key rules, and practice questions."
              title="Welcome Audio Guide (click to toggle)"
              label="Maths Master Welcome Guide"
              isGlobal={true}
              size="md"
            />
          </div>
        </div>

        {/* Year Level Filter Segmented Bar */}
        <div
          className="w-full max-w-full overflow-x-auto no-scrollbar flex items-center gap-2 py-2 border-t text-xs"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="font-extrabold text-[11px] uppercase tracking-wider shrink-0" style={{ color: 'var(--text-muted)' }}>
            Level:
          </span>
          <div
            className="flex items-center gap-1 p-0.5 rounded-xl border shrink-0"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-card)',
            }}
          >
            {yearOptions.map((lvl) => {
              const isSelected = selectedYear === lvl;
              const count = lvl === 'All'
                ? mathTopics.length
                : mathTopics.filter((t) => t.yearLevel === lvl).length;
              const cleanName = lvl === 'All'
                ? 'All Levels'
                : lvl.replace(' (Age 9-10)', '').replace(' (Age 10-11)', '').replace(' (Age 11-12)', '').replace(' (Age 12+)', '');

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onSelectYear(lvl)}
                  className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 shrink-0"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                    boxShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                >
                  <span>{cleanName}</span>
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
