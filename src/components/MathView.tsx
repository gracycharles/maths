'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math?: string;
  formula?: string;
  block?: boolean;
  displayMode?: boolean;
  className?: string;
}

/**
 * Normalizes user input, double-escaped strings, or unescaped LaTeX strings so that
 * mathematical expressions render with crisp formatting and no raw 'frac' artifacts.
 */
function normalizeLatex(raw: string): string {
  if (!raw) return '';
  let str = String(raw).trim();

  // 1. Replace control characters produced by unescaped backslashes in JS/JSX string literals (\f, \t, etc.)
  str = str.replace(/[\x0c\f]\s*rac/gi, '\\frac');
  str = str.replace(/[\x09\t]\s*imes/gi, '\\times');
  str = str.replace(/[\x09\t]\s*ext/gi, '\\text');
  str = str.replace(/[\x09\t]\s*o\b/gi, '\\to');
  str = str.replace(/[\x0a\n]\s*eq/gi, '\\neq');
  str = str.replace(/[\x0b\v]\s*ec/gi, '\\vec');
  str = str.replace(/[\x0d\r]\s*ight/gi, '\\right');
  str = str.replace(/[\x08\b]\s*mathbf/gi, '\\mathbf');

  // 2. Normalize mixed numbers shorthand: 1frac78 -> 1\frac{7}{8}, 1\frac78 -> 1\frac{7}{8}
  str = str.replace(/(\d+)\s*\\?frac\{([^}]+)\}\{([^}]+)\}/gi, '$1\\frac{$2}{$3}');
  str = str.replace(/(\d+)\s*\\?frac\s*(\d{1,2})\s*(\d{1,2})/gi, '$1\\frac{$2}{$3}');
  str = str.replace(/(\d+)\s*\\?frac\s*(\d)\s*(\d)/gi, '$1\\frac{$2}{$3}');

  // 3. Handle unescaped keywords when backslash was completely absent in plain text
  str = str.replace(/(?<![\\a-zA-Z])times(?![a-zA-Z])/gi, ' \\times ');
  str = str.replace(/(?<![\\a-zA-Z])div(?![a-zA-Z])/gi, ' \\div ');
  str = str.replace(/(?<![\\a-zA-Z])implies(?![a-zA-Z])/gi, ' \\implies ');
  str = str.replace(/(?<![\\a-zA-Z])neq(?![a-zA-Z])/gi, ' \\neq ');

  // 4. Fractions with braces: frac{a}{b} -> \frac{a}{b}
  str = str.replace(/(?<!\\)frac\{([^}]+)\}\{([^}]+)\}/gi, '\\frac{$1}{$2}');

  // 5. Complex fraction expressions without braces like frac3times54times2 or frac3\times54\times2
  str = str.replace(/(?<!\\)frac\s*(\d+\s*(?:\\times|\*|x)\s*\d+)\s*(\d+\s*(?:\\times|\*|x)\s*\d+)/gi, '\\frac{$1}{$2}');

  // 6. Simple fractions: frac34 -> \frac{3}{4}, frac158 -> \frac{15}{8}, frac25 -> \frac{2}{5}, frac56 -> \frac{5}{6}
  str = str.replace(/(?<!\\)frac\s*(\d{1,2})\s*(\d{1,2})/gi, '\\frac{$1}{$2}');

  // 7. Clean consecutive backslashes into single backslash
  str = str.replace(/\\{2,}(frac|times|div|pm|approx|neq|leq|geq|implies|to|text|mathbf|sqrt|quad|qquad|pi|cdot|sum|left|right)/gi, '\\$1');

  // 8. Re-apply braces for \frac a b to \frac{a}{b} if needed
  str = str.replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])/g, '\\frac{$1}{$2}');

  // Clean up excessive whitespace
  str = str.replace(/\s+/g, ' ');

  return str;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  formula,
  block = false,
  displayMode = false,
  className = '',
}) => {
  const rawExpr = (math ?? formula ?? '').trim();
  const isBlock = block || displayMode;

  const html = useMemo(() => {
    if (!rawExpr) return '';
    const cleanExpr = normalizeLatex(rawExpr);

    try {
      const rendered = katex.renderToString(cleanExpr, {
        displayMode: isBlock,
        throwOnError: true,
        output: 'html',
      });
      return rendered;
    } catch {
      // Clean readable fallback if katex fails
      const readable = cleanExpr
        .replace(/\\?frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
        .replace(/\\?frac\s*(\w)\s*(\w)/g, '$1/$2')
        .replace(/\\(?:times|cdot)/g, ' × ')
        .replace(/\\div/g, ' ÷ ')
        .replace(/\\implies/g, ' ⇒ ')
        .replace(/\\to/g, ' → ')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathbf\{([^}]+)\}/g, '$1')
        .replace(/[{}]/g, '');

      return `<span class="font-sans font-bold" style="color: var(--accent-primary);">${readable}</span>`;
    }
  }, [rawExpr, isBlock]);

  if (!rawExpr) return null;

  if (isBlock) {
    return (
      <div
        className={`overflow-x-auto py-2 px-3 my-2 rounded-xl text-center font-serif text-lg border transition-colors ${className}`}
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block mx-0.5 font-serif transition-colors ${className}`}
      style={{ color: 'var(--text-primary)' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

