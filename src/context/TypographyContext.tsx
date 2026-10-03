'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSizeLevel = 'normal' | 'large' | 'xlarge';
export type FontFamilyChoice = 'lexend' | 'nunito' | 'jakarta';

export interface FontSizeOption {
  id: FontSizeLevel;
  label: string;
  shortLabel: string;
  percentage: string;
  basePx: string;
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { id: 'normal', label: 'Standard', shortLabel: '100%', percentage: '100%', basePx: '16px' },
  { id: 'large', label: 'Large (+15%)', shortLabel: '115%', percentage: '115%', basePx: '18px' },
  { id: 'xlarge', label: 'Extra Large (+30%)', shortLabel: '130%', percentage: '130%', basePx: '20px' },
];

export interface FontFamilyOption {
  id: FontFamilyChoice;
  name: string;
  tagline: string;
  cssFamily: string;
}

export const FONT_FAMILY_OPTIONS: FontFamilyOption[] = [
  {
    id: 'lexend',
    name: 'Lexend',
    tagline: 'Best for Reading & Numbers (Recommended)',
    cssFamily: "'Lexend', system-ui, -apple-system, sans-serif",
  },
  {
    id: 'nunito',
    name: 'Nunito',
    tagline: 'Friendly & Rounded (Great for Kids)',
    cssFamily: "'Nunito', system-ui, -apple-system, sans-serif",
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    tagline: 'Clean Modern Geometric',
    cssFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
];

const fontMap: Record<FontFamilyChoice, string> = {
  lexend: "'Lexend', system-ui, -apple-system, sans-serif",
  nunito: "'Nunito', system-ui, -apple-system, sans-serif",
  jakarta: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
};

const sizeMap: Record<FontSizeLevel, string> = {
  normal: '16px',
  large: '18px',
  xlarge: '20px',
};

interface TypographyContextType {
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  fontFamily: FontFamilyChoice;
  setFontFamily: (family: FontFamilyChoice) => void;
  currentSizeObj: FontSizeOption;
  currentFontObj: FontFamilyOption;
}

const TypographyContext = createContext<TypographyContextType | undefined>(undefined);

export const TypographyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSizeLevel>('normal');
  const [fontFamily, setFontFamilyState] = useState<FontFamilyChoice>('lexend');
  const [mounted, setMounted] = useState(false);

  const applyTypography = (size: FontSizeLevel, family: FontFamilyChoice) => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-font-size', size);
    document.documentElement.setAttribute('data-font-family', family);
    document.documentElement.style.setProperty('--font-active', fontMap[family] || fontMap.lexend);
    document.documentElement.style.fontSize = sizeMap[size] || '16px';
    document.body.style.fontFamily = fontMap[family] || fontMap.lexend;
  };

  useEffect(() => {
    setMounted(true);
    let initialSize: FontSizeLevel = 'normal';
    let initialFamily: FontFamilyChoice = 'lexend';
    try {
      const savedSize = localStorage.getItem('maths-master-font-size');
      if (savedSize && (savedSize === 'normal' || savedSize === 'large' || savedSize === 'xlarge')) {
        initialSize = savedSize as FontSizeLevel;
        setFontSizeState(initialSize);
      }
      const savedFamily = localStorage.getItem('maths-master-font-family');
      if (savedFamily && (savedFamily === 'lexend' || savedFamily === 'nunito' || savedFamily === 'jakarta')) {
        initialFamily = savedFamily as FontFamilyChoice;
        setFontFamilyState(initialFamily);
      }
    } catch (e) {
      // safe fallback
    }
    applyTypography(initialSize, initialFamily);
  }, []);

  const setFontSize = (newSize: FontSizeLevel) => {
    setFontSizeState(newSize);
    applyTypography(newSize, fontFamily);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('maths-master-font-size', newSize);
      } catch (e) {}
    }
  };

  const setFontFamily = (newFamily: FontFamilyChoice) => {
    setFontFamilyState(newFamily);
    applyTypography(fontSize, newFamily);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('maths-master-font-family', newFamily);
      } catch (e) {}
    }
  };

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  useEffect(() => {
    if (mounted) {
      applyTypography(fontSize, fontFamily);
    }
  }, [fontSize, fontFamily, mounted]);

  const currentSizeObj =
    FONT_SIZE_OPTIONS.find((o) => o.id === fontSize) || FONT_SIZE_OPTIONS[0];
  const currentFontObj =
    FONT_FAMILY_OPTIONS.find((o) => o.id === fontFamily) || FONT_FAMILY_OPTIONS[0];

  return (
    <TypographyContext.Provider
      value={{
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        fontFamily,
        setFontFamily,
        currentSizeObj,
        currentFontObj,
      }}
    >
      {children}
    </TypographyContext.Provider>
  );
};

export const useTypography = () => {
  const context = useContext(TypographyContext);
  if (!context) {
    throw new Error('useTypography must be used within a TypographyProvider');
  }
  return context;
};
