'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ReadableCard } from '../ReadableCard';

export const RomanNumeralsConverter: React.FC = () => {
  const [numInput, setNumInput] = useState<number>(2024);

  const romanLookup: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  const toRoman = (num: number): { roman: string; breakdown: string[] } => {
    let n = Math.min(3999, Math.max(1, num));
    let res = '';
    const breakdown: string[] = [];

    for (const [val, sym] of romanLookup) {
      while (n >= val) {
        res += sym;
        n -= val;
        breakdown.push(`${val} = ${sym}`);
      }
    }

    return { roman: res, breakdown };
  };

  const currentResult = toRoman(numInput);

  const speechText = `Number ${numInput} in Roman numerals is ${currentResult.roman}. The breakdown is: ${currentResult.breakdown.join(', ')}.`;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 shadow-xs space-y-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              Interactive Tool
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
              Primary 5 & 6
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-extrabold mt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Roman Numeral Place Value Breakdown Tool
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            Type any number up to 3,999 to see how Roman numerals assemble using addition and subtraction! Click to read aloud.
          </p>
        </div>
      </div>

      {/* Input */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-4 rounded-xl border"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div>
          <label className="text-xs font-bold uppercase block mb-1" style={{ color: 'var(--text-secondary)' }}>
            Enter a Standard Number (1 - 3999):
          </label>
          <input
            type="number"
            min="1"
            max="3999"
            value={numInput}
            onChange={(e) => setNumInput(Math.min(3999, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full text-base font-extrabold p-2 rounded-lg focus:outline-none focus:ring-2 border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card-strong)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Quick Famous Years */}
        <div>
          <span className="text-xs font-bold uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>
            Try Famous Years:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[49, 99, 1066, 1492, 1969, 2000, 2024].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setNumInput(yr)}
                className="px-2 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer"
                style={{
                  backgroundColor: numInput === yr ? 'var(--accent-primary)' : 'var(--bg-card)',
                  borderColor: numInput === yr ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: numInput === yr ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Big Roman Result Display */}
      <div
        className="p-6 rounded-2xl text-center space-y-3 border-2 shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card-strong)',
        }}
      >
        <span
          className="text-xs font-black uppercase tracking-wider block"
          style={{ color: 'var(--accent-primary)' }}
        >
          Roman Numeral Translation
        </span>
        <div
          className="inline-block px-6 py-2.5 rounded-2xl border-2 shadow-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card-strong)',
            color: 'var(--accent-primary)',
          }}
        >
          <div className="text-3xl sm:text-5xl font-black font-serif tracking-widest">
            {currentResult.roman}
          </div>
        </div>
        <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
          Standard Hindu-Arabic Numeral: <span className="font-black text-sm" style={{ color: 'var(--text-primary)' }}>{numInput}</span>
        </p>
      </div>

      {/* Breakdown chips - Click to Read! */}
      <ReadableCard
        id="roman-tool-breakdown"
        textToRead={speechText}
        highlightStyle="inner"
        className="p-4 rounded-xl border space-y-2 shadow-2xs"
        ariaLabel="Roman numeral breakdown"
      >
        <h4
          className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
          style={{ color: 'var(--accent-primary)' }}
        >
          <Sparkles size={14} />
          <span>Place Value Symbol Breakdown (Click to Read)</span>
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {currentResult.breakdown.map((item, idx) => (
            <span
              key={idx}
              className="text-xs font-bold font-mono px-2.5 py-1 rounded-md border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                borderColor: 'var(--border-card-strong)',
                color: 'var(--badge-text)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </ReadableCard>
    </div>
  );
};
