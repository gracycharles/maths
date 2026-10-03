'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type PastelThemeId = 'butter' | 'obsidian';

export interface PastelTheme {
  id: PastelThemeId;
  name: string;
  shortName: string;
  emoji: string;
  shortDesc: string;
  canvasHex: string;
  cardHex: string;
  accentHex: string;
  isDark?: boolean;
}

export const PASTEL_THEMES: PastelTheme[] = [
  {
    id: 'butter',
    name: 'Daylight Amber & Cream',
    shortName: 'Day Mode',
    emoji: '☀️',
    shortDesc: 'Crisp sunlight cream with carbon ink & rich golden amber (High Contrast Day)',
    canvasHex: '#fbf9f4',
    cardHex: '#ffffff',
    accentHex: '#b45309',
    isDark: false,
  },
  {
    id: 'obsidian',
    name: 'Obsidian & Amber',
    shortName: 'Night Mode',
    emoji: '🌙',
    shortDesc: 'Deep midnight slate velvet with glowing honey amber & brilliant crisp text (Night Mode)',
    canvasHex: '#090d16',
    cardHex: '#111927',
    accentHex: '#f59e0b',
    isDark: true,
  },
];

interface ThemeContextType {
  theme: PastelThemeId;
  setTheme: (theme: PastelThemeId) => void;
  currentThemeObj: PastelTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<PastelThemeId>('butter');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('maths-master-pastel-theme');
      if (saved && (saved === 'butter' || saved === 'obsidian')) {
        setThemeState(saved as PastelThemeId);
        document.documentElement.setAttribute('data-theme', saved);
        document.documentElement.classList.toggle('dark', saved === 'obsidian');
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const setTheme = (newTheme: PastelThemeId) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('maths-master-pastel-theme', newTheme);
      } catch (e) {}
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'obsidian');
    }
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'obsidian');
    }
  }, [theme, mounted]);

  const currentThemeObj = PASTEL_THEMES.find((t) => t.id === theme) || PASTEL_THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeObj }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const usePastelTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePastelTheme must be used within a ThemeProvider');
  }
  return context;
};
