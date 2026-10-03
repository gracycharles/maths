'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Sparkles, Info, RefreshCw, ArrowLeftRight, Layers } from 'lucide-react';
import { ReadableCard } from '../ReadableCard';
import { AudioButton } from '../AudioButton';

export const PlaceValueSandbox: React.FC = () => {
  const [currentNum, setCurrentNum] = useState<number>(345.6);
  const [roundTarget, setRoundTarget] = useState<'ten' | 'hundred' | 'tenth' | 'unit'>('ten');

  const shiftLeft = (factor: number) => {
    setCurrentNum((prev) => Number((prev * factor).toFixed(3)));
  };

  const shiftRight = (factor: number) => {
    setCurrentNum((prev) => Number((prev / factor).toFixed(3)));
  };

  const getRounded = (num: number, target: 'ten' | 'hundred' | 'tenth' | 'unit') => {
    switch (target) {
      case 'hundred':
        return Math.round(num / 100) * 100;
      case 'ten':
        return Math.round(num / 10) * 10;
      case 'unit':
        return Math.round(num);
      case 'tenth':
        return Math.round(num * 10) / 10;
    }
  };

  // Extract place values
  const thousands = Math.floor((currentNum % 10000) / 1000);
  const hundreds = Math.floor((currentNum % 1000) / 100);
  const tens = Math.floor((currentNum % 100) / 10);
  const ones = Math.floor(currentNum % 10);
  const tenths = Math.floor((currentNum * 10) % 10);
  const hundredths = Math.floor((currentNum * 100) % 10);

  const roundedVal = getRounded(currentNum, roundTarget);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header card */}
      <ReadableCard
        id="place-value-tool-header"
        ariaLabel="Place Value &amp; Rounding Explorer Tool"
        className="p-5 border rounded-2xl shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              <Layers size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                Place Value &amp; Rounding Laboratory
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Slide digits across column houses and observe rounding boundaries in real-time.
              </p>
            </div>
          </div>
          <AudioButton
            id="audio-pv-tool-intro"
            textToRead="Welcome to the Place Value and Rounding Laboratory. Adjust the number, multiply or divide by 10, 100, or 1000 to slide digits across columns, and test rounding to any place value."
            label="Tool Overview"
            size="sm"
          />
        </div>
      </ReadableCard>

      {/* Preset values & Direct Inputs */}
      <div
        className="p-5 border rounded-2xl shadow-xs space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Presets:
            </span>
            {[345.6, 1284, 56.75, 4.09, 8905].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setCurrentNum(val)}
                className="px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-xs"
                style={{
                  backgroundColor: currentNum === val ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: currentNum === val ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: currentNum === val ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {val}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="pv-custom-input" className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              Custom Value:
            </label>
            <input
              id="pv-custom-input"
              type="number"
              step="0.01"
              value={currentNum}
              onChange={(e) => setCurrentNum(parseFloat(e.target.value) || 0)}
              className="w-28 px-3 py-1.5 text-xs font-mono font-bold rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Place Value Column Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>
              🏛️ Place Value Columns (Decimal point remains anchored)
            </span>
            <span className="text-xs font-mono font-extrabold" style={{ color: 'var(--text-muted)' }}>
              Current: {currentNum}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 text-center">
            {/* Thousands */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                Thousands (1,000)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--text-primary)' }}>
                {thousands > 0 || currentNum >= 1000 ? thousands : '-'}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                {thousands > 0 ? `${thousands * 1000}` : '0'}
              </span>
            </div>

            {/* Hundreds */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--contrast-blue-bg)',
                borderColor: 'var(--contrast-blue-border)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-blue)' }}>
                Hundreds (100)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--contrast-blue)' }}>
                {hundreds > 0 || currentNum >= 100 ? hundreds : '-'}
              </span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--contrast-blue)' }}>
                {hundreds > 0 ? `${hundreds * 100}` : '0'}
              </span>
            </div>

            {/* Tens */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--contrast-indigo-bg)',
                borderColor: 'var(--contrast-indigo-border)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-indigo)' }}>
                Tens (10)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--contrast-indigo)' }}>
                {tens > 0 || currentNum >= 10 ? tens : '-'}
              </span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--contrast-indigo)' }}>
                {tens > 0 ? `${tens * 10}` : '0'}
              </span>
            </div>

            {/* Ones */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--contrast-teal-bg)',
                borderColor: 'var(--contrast-teal-border)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-teal)' }}>
                Ones (1)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--contrast-teal)' }}>
                {ones}
              </span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--contrast-teal)' }}>
                {ones}
              </span>
            </div>

            {/* Tenths */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--contrast-amber-bg)',
                borderColor: 'var(--contrast-amber-border)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-amber)' }}>
                Tenths (0.1)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--contrast-amber)' }}>
                {tenths}
              </span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--contrast-amber)' }}>
                {`0.${tenths}`}
              </span>
            </div>

            {/* Hundredths */}
            <div
              className="p-3 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: 'var(--contrast-rose-bg)',
                borderColor: 'var(--contrast-rose-border)',
              }}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-rose)' }}>
                Hundredths (0.01)
              </span>
              <span className="text-2xl font-black mt-1 block" style={{ color: 'var(--contrast-rose)' }}>
                {hundredths}
              </span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--contrast-rose)' }}>
                {`0.0${hundredths}`}
              </span>
            </div>
          </div>
        </div>

        {/* Powers of 10 Shifter Buttons */}
        <div
          className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <span className="text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>
            ⚡ Quick Shift Operations:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => shiftLeft(10)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border"
              style={{
                backgroundColor: 'var(--contrast-blue-bg)',
                borderColor: 'var(--contrast-blue-border)',
                color: 'var(--contrast-blue)',
              }}
            >
              × 10 (Slide 1 Left)
            </button>
            <button
              type="button"
              onClick={() => shiftLeft(100)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border"
              style={{
                backgroundColor: 'var(--contrast-blue-bg)',
                borderColor: 'var(--contrast-blue-border)',
                color: 'var(--contrast-blue)',
              }}
            >
              × 100 (Slide 2 Left)
            </button>
            <button
              type="button"
              onClick={() => shiftRight(10)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border"
              style={{
                backgroundColor: 'var(--contrast-amber-bg)',
                borderColor: 'var(--contrast-amber-border)',
                color: 'var(--contrast-amber)',
              }}
            >
              ÷ 10 (Slide 1 Right)
            </button>
            <button
              type="button"
              onClick={() => shiftRight(100)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs border"
              style={{
                backgroundColor: 'var(--contrast-amber-bg)',
                borderColor: 'var(--contrast-amber-border)',
                color: 'var(--contrast-amber)',
              }}
            >
              ÷ 100 (Slide 2 Right)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Rounding Mountain */}
      <div
        className="p-5 border rounded-2xl shadow-xs space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>⛰️ Rounding Mountain Explorer</span>
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              5 or more rounds UP, 4 or less rounds DOWN.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Round to nearest:</span>
            {(['ten', 'hundred', 'unit', 'tenth'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setRoundTarget(t)}
                className="px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer capitalize shadow-2xs"
                style={{
                  backgroundColor: roundTarget === t ? 'var(--contrast-purple)' : 'var(--bg-card-subtle)',
                  borderColor: roundTarget === t ? 'var(--contrast-purple-border)' : 'var(--border-card)',
                  color: roundTarget === t ? '#ffffff' : 'var(--text-primary)',
                }}
              >
                {t === 'unit' ? 'Whole Number' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Rounding Result Card */}
        <div
          className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs"
          style={{
            backgroundColor: 'var(--contrast-purple-bg)',
            borderColor: 'var(--contrast-purple-border)',
          }}
        >
          <div>
            <span className="text-xs font-bold block" style={{ color: 'var(--contrast-purple)' }}>
              Rounding Result for {currentNum}:
            </span>
            <div className="text-xl font-black mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {currentNum} rounded to nearest {roundTarget === 'unit' ? 'whole number' : roundTarget} is{' '}
              <span className="underline font-extrabold" style={{ color: 'var(--contrast-purple)' }}>{roundedVal}</span>
            </div>
          </div>
          <div
            className="p-2.5 rounded-lg border text-xs font-mono font-bold shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--contrast-purple-border)',
              color: 'var(--contrast-purple)',
            }}
          >
            {currentNum} ≈ {roundedVal}
          </div>
        </div>
      </div>
    </div>
  );
};
