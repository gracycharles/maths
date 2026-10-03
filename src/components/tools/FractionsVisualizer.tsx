'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Sparkles, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import { ReadableCard } from '../ReadableCard';
import { AudioButton } from '../AudioButton';

const MIN_VAL = 1;
const MAX_VAL = 12; // Gold standard primary KS2 bar model ceiling to prevent overflow and distortion

interface FractionPreset {
  label: string;
  n1: number;
  d1: number;
  op: '+' | '-' | '×' | '÷';
  n2: number;
  d2: number;
}

const PRESETS: FractionPreset[] = [
  { label: '½ + ¼ (Halves & Quarters)', n1: 1, d1: 2, op: '+', n2: 1, d2: 4 },
  { label: '⅔ + ¼ (Common LCM 12)', n1: 2, d1: 3, op: '+', n2: 1, d2: 4 },
  { label: '¾ − ⅓ (Subtraction)', n1: 3, d1: 4, op: '-', n2: 1, d2: 3 },
  { label: '⅔ × ¾ (Multiplication)', n1: 2, d1: 3, op: '×', n2: 3, d2: 4 },
  { label: '¾ ÷ ½ (Division KFC)', n1: 3, d1: 4, op: '÷', n2: 1, d2: 2 },
  { label: '⁷⁄₄ + ½ (Improper / Mixed)', n1: 7, d1: 4, op: '+', n2: 1, d2: 2 },
];

export const FractionsVisualizer: React.FC = () => {
  const [num1, setNum1] = useState<number>(2);
  const [den1, setDen1] = useState<number>(3);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(4);
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷'>('+');

  // Math helpers
  const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

  const clampValue = (val: number): number => {
    if (isNaN(val)) return 1;
    return Math.max(MIN_VAL, Math.min(MAX_VAL, Math.round(val)));
  };

  const calculateResult = () => {
    let resNum = 0;
    let resDen = 1;
    let step1 = '';
    let step2 = '';

    if (operation === '+') {
      const commonDen = den1 * den2;
      const convertedNum1 = num1 * den2;
      const convertedNum2 = num2 * den1;
      resNum = convertedNum1 + convertedNum2;
      resDen = commonDen;
      step1 = `Find common denominator: ${den1} × ${den2} = ${commonDen}. Convert fractions to ${convertedNum1}/${commonDen} + ${convertedNum2}/${commonDen}.`;
      step2 = `Add numerators: ${convertedNum1} + ${convertedNum2} = ${resNum}. Result is ${resNum}/${resDen}.`;
    } else if (operation === '-') {
      const commonDen = den1 * den2;
      const convertedNum1 = num1 * den2;
      const convertedNum2 = num2 * den1;
      resNum = convertedNum1 - convertedNum2;
      resDen = commonDen;
      step1 = `Find common denominator: ${den1} × ${den2} = ${commonDen}. Convert fractions to ${convertedNum1}/${commonDen} - ${convertedNum2}/${commonDen}.`;
      step2 = `Subtract numerators: ${convertedNum1} - ${convertedNum2} = ${resNum}. Result is ${resNum}/${resDen}.`;
    } else if (operation === '×') {
      resNum = num1 * num2;
      resDen = den1 * den2;
      step1 = `Multiply numerators: ${num1} × ${num2} = ${resNum}.`;
      step2 = `Multiply denominators: ${den1} × ${den2} = ${resDen}. Result is ${resNum}/${resDen}.`;
    } else {
      // Division: KFC (Keep, Flip, Change)
      resNum = num1 * den2;
      resDen = den1 * num2;
      step1 = `KFC Rule: Keep ${num1}/${den1}, Flip ${num2}/${den2} to ${den2}/${num2}, and Change ÷ to ×.`;
      step2 = `Multiply: (${num1} × ${den2}) / (${den1} × ${num2}) = ${resNum}/${resDen}.`;
    }

    const divisor = gcd(resNum, resDen);
    const simpNum = resNum / (divisor || 1);
    const simpDen = resDen / (divisor || 1);

    let mixed = '';
    if (simpDen > 0 && Math.abs(simpNum) >= simpDen) {
      const whole = Math.floor(Math.abs(simpNum) / simpDen) * (simpNum < 0 ? -1 : 1);
      const rem = Math.abs(simpNum) % simpDen;
      if (rem !== 0) {
        mixed = `${whole} \\frac{${rem}}{${simpDen}}`;
      } else {
        mixed = `${whole}`;
      }
    }

    return {
      resNum,
      resDen,
      simpNum,
      simpDen,
      divisor,
      step1,
      step2,
      mixed,
    };
  };

  const res = calculateResult();

  const speechExplanation = `Fractions problem: ${num1} over ${den1} ${
    operation === '+'
      ? 'plus'
      : operation === '-'
      ? 'minus'
      : operation === '×'
      ? 'times'
      : 'divided by'
  } ${num2} over ${den2}. ${res.step1}. ${res.step2}. In simplest form, the answer is ${res.simpNum} over ${res.simpDen}.`;

  // Helper to render responsive, bounded Bar Models (handles both proper fractions and multi-bar improper fractions)
  const renderFractionBarModel = (
    num: number,
    den: number,
    title: string,
    accentColor: string,
    contrastText: string,
    badgeBg: string,
    badgeTextColor?: string
  ) => {
    const isImproper = num > den;
    const wholeCount = Math.ceil(num / den);
    // Limit rendered unit bars to max 3 so UI never overflows or expands excessively
    const displayBars = Math.min(3, Math.max(1, wholeCount));
    const percentage = ((num / den) * 100).toFixed(1);

    return (
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-2xs overflow-hidden max-w-full"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-black" style={{ color: 'var(--text-primary)' }}>
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
            <span className="truncate">{title}: <strong>{num}/{den}</strong></span>
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {isImproper && (
              <span
                className="px-2 py-0.5 rounded-md text-[11px] font-bold border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card-strong)',
                  color: 'var(--text-secondary)',
                }}
              >
                {Math.floor(num / den)} {num % den !== 0 ? `${num % den}/${den}` : ''} Whole{num >= 2 * den ? 's' : ''}
              </span>
            )}
            <span
              className="px-2 py-0.5 rounded-md border text-xs font-extrabold shadow-2xs"
              style={{
                backgroundColor: badgeBg,
                borderColor: 'var(--border-card-strong)',
                color: badgeTextColor || accentColor,
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Stacked unit bars (Single bar for proper, multi-bars for improper) */}
        <div className="space-y-2.5 max-w-full">
          {Array.from({ length: displayBars }).map((_, barIdx) => {
            const startFractionIndex = barIdx * den;
            const shadedInThisBar = Math.max(0, Math.min(den, num - startFractionIndex));

            return (
              <div key={barIdx} className="space-y-1">
                {isImproper && (
                  <div className="flex justify-between items-center text-[10px] font-bold px-0.5" style={{ color: 'var(--text-muted)' }}>
                    <span>Bar Unit {barIdx + 1} of {displayBars}</span>
                    <span>{shadedInThisBar}/{den} shaded</span>
                  </div>
                )}
                <div
                  className="h-8 sm:h-9 w-full rounded-xl overflow-hidden flex border-2 shadow-inner max-w-full"
                  style={{
                    backgroundColor: 'var(--bg-card-hover)',
                    borderColor: 'var(--border-card-strong)',
                  }}
                >
                  {Array.from({ length: den }).map((_, segIdx) => {
                    const isShaded = segIdx < shadedInThisBar;
                    return (
                      <div
                        key={segIdx}
                        className="flex-1 min-w-0 border-r last:border-r-0 transition-all flex items-center justify-center text-[9px] sm:text-[11px] font-black select-none truncate px-0.5"
                        style={{
                          backgroundColor: isShaded ? accentColor : 'transparent',
                          borderColor: 'var(--border-card-strong)',
                          color: isShaded ? contrastText : 'var(--text-muted)',
                        }}
                        title={`Part ${segIdx + 1} of ${den} (${isShaded ? 'Shaded' : 'Empty'})`}
                      >
                        {den <= 8 ? (
                          `1/${den}`
                        ) : den <= 12 ? (
                          <span className="hidden sm:inline">1/{den}</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs leading-relaxed pt-1 border-t" style={{ borderColor: 'var(--border-card)', color: 'var(--text-secondary)' }}>
          {isImproper ? (
            <>
              Improper fraction: <strong>{num}</strong> parts of size <strong>1/{den}</strong> (equals {Math.floor(num / den)} whole bar{Math.floor(num / den) > 1 ? 's' : ''} + {num % den}/{den}).
            </>
          ) : (
            <>
              Bar partitioned into <strong>{den}</strong> equal parts with <strong>{num}</strong> part{num > 1 ? 's' : ''} shaded.
            </>
          )}
        </p>
      </div>
    );
  };

  return (
    <div
      className="rounded-2xl border p-4 sm:p-6 shadow-xs space-y-6 max-w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card)',
      }}
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              Interactive Visual Tool
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border flex items-center gap-1"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--accent-primary)',
              }}
            >
              <Info size={12} />
              <span>Safe Range: 1 to 12</span>
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-extrabold mt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Visual Fraction Calculator & Bar Model
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            Live proportional bar models strictly bounded between 1 and 12 to maintain clear, undistorted visual fraction walls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNum1(2);
            setDen1(3);
            setNum2(1);
            setDen2(4);
            setOperation('+');
          }}
          className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
            color: 'var(--text-primary)',
          }}
          title="Reset to default fractions"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Example Presets */}
      <div className="space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Quick KS2 Fraction Presets:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setNum1(p.n1);
                setDen1(p.d1);
                setOperation(p.op);
                setNum2(p.n2);
                setDen2(p.d2);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
              style={{
                backgroundColor:
                  num1 === p.n1 && den1 === p.d1 && num2 === p.n2 && den2 === p.d2 && operation === p.op
                    ? 'var(--accent-primary)'
                    : 'var(--bg-card-subtle)',
                borderColor:
                  num1 === p.n1 && den1 === p.d1 && num2 === p.n2 && den2 === p.d2 && operation === p.op
                    ? 'var(--accent-primary)'
                    : 'var(--border-card)',
                color:
                  num1 === p.n1 && den1 === p.d1 && num2 === p.n2 && den2 === p.d2 && operation === p.op
                    ? 'var(--accent-contrast)'
                    : 'var(--text-primary)',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 p-4 sm:p-5 rounded-2xl border shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
        }}
      >
        {/* Fraction 1 Input */}
        <div
          className="flex flex-col items-center justify-between p-4 rounded-xl border shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div
            className="flex items-center justify-between w-full pb-2 mb-2 border-b"
            style={{ borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Fraction 1
            </span>
            <span
              className="text-xs font-black px-2.5 py-0.5 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              {num1}/{den1}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full my-auto py-1">
            {/* Top / Numerator 1 */}
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="fraction-1-num"
                className="text-[11px] font-extrabold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                Top (Numerator: 1–12)
              </label>
              <div className="flex items-center justify-center gap-1.5 w-full">
                <button
                  type="button"
                  disabled={num1 <= MIN_VAL}
                  onClick={() => setNum1((n) => Math.max(MIN_VAL, n - 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Decrease numerator 1"
                >
                  −
                </button>
                <input
                  id="fraction-1-num"
                  type="number"
                  min={MIN_VAL}
                  max={MAX_VAL}
                  value={num1}
                  onChange={(e) => setNum1(clampValue(parseInt(e.target.value)))}
                  onBlur={(e) => setNum1(clampValue(parseInt(e.target.value)))}
                  className="w-20 h-11 text-center text-xl font-black rounded-lg border-2 shadow-inner focus:ring-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  disabled={num1 >= MAX_VAL}
                  onClick={() => setNum1((n) => Math.min(MAX_VAL, n + 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Increase numerator 1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Division Line */}
            <div
              className="w-36 h-1 rounded-full my-2.5 shadow-2xs transition-colors"
              style={{ backgroundColor: 'var(--text-primary)' }}
            />

            {/* Bottom / Denominator 1 */}
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center gap-1.5 w-full">
                <button
                  type="button"
                  disabled={den1 <= MIN_VAL}
                  onClick={() => setDen1((d) => Math.max(MIN_VAL, d - 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Decrease denominator 1"
                >
                  −
                </button>
                <input
                  id="fraction-1-den"
                  type="number"
                  min={MIN_VAL}
                  max={MAX_VAL}
                  value={den1}
                  onChange={(e) => setDen1(clampValue(parseInt(e.target.value)))}
                  onBlur={(e) => setDen1(clampValue(parseInt(e.target.value)))}
                  className="w-20 h-11 text-center text-xl font-black rounded-lg border-2 shadow-inner focus:ring-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  disabled={den1 >= MAX_VAL}
                  onClick={() => setDen1((d) => Math.min(MAX_VAL, d + 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Increase denominator 1"
                >
                  +
                </button>
              </div>
              <label
                htmlFor="fraction-1-den"
                className="text-[11px] font-extrabold uppercase tracking-wider mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                Bottom (Denominator: 1–12)
              </label>
            </div>
          </div>
        </div>

        {/* Operation Selector */}
        <div
          className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Choose Operation
          </span>
          <div className="grid grid-cols-4 gap-1.5 w-full max-w-[220px]">
            {(['+', '-', '×', '÷'] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                className="h-11 text-xl font-black rounded-xl transition-all cursor-pointer border shadow-2xs hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: operation === op ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: operation === op ? 'var(--accent-primary)' : 'var(--border-card-strong)',
                  color: operation === op ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {op}
              </button>
            ))}
          </div>
          <div
            className="text-center text-xs font-semibold px-2 py-1 rounded-lg border w-full max-w-[240px]"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-card)',
              color: 'var(--text-secondary)',
            }}
          >
            {operation === '+' && 'Addition (+) with Common Denominator'}
            {operation === '-' && 'Subtraction (−) with Common Denominator'}
            {operation === '×' && 'Multiplication (×): Straight Across'}
            {operation === '÷' && 'Division (÷): Keep, Change, Flip'}
          </div>
        </div>

        {/* Fraction 2 Input */}
        <div
          className="flex flex-col items-center justify-between p-4 rounded-xl border shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div
            className="flex items-center justify-between w-full pb-2 mb-2 border-b"
            style={{ borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Fraction 2
            </span>
            <span
              className="text-xs font-black px-2.5 py-0.5 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              {num2}/{den2}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full my-auto py-1">
            {/* Top / Numerator 2 */}
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="fraction-2-num"
                className="text-[11px] font-extrabold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                Top (Numerator: 1–12)
              </label>
              <div className="flex items-center justify-center gap-1.5 w-full">
                <button
                  type="button"
                  disabled={num2 <= MIN_VAL}
                  onClick={() => setNum2((n) => Math.max(MIN_VAL, n - 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Decrease numerator 2"
                >
                  −
                </button>
                <input
                  id="fraction-2-num"
                  type="number"
                  min={MIN_VAL}
                  max={MAX_VAL}
                  value={num2}
                  onChange={(e) => setNum2(clampValue(parseInt(e.target.value)))}
                  onBlur={(e) => setNum2(clampValue(parseInt(e.target.value)))}
                  className="w-20 h-11 text-center text-xl font-black rounded-lg border-2 shadow-inner focus:ring-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  disabled={num2 >= MAX_VAL}
                  onClick={() => setNum2((n) => Math.min(MAX_VAL, n + 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Increase numerator 2"
                >
                  +
                </button>
              </div>
            </div>

            {/* Division Line */}
            <div
              className="w-36 h-1 rounded-full my-2.5 shadow-2xs transition-colors"
              style={{ backgroundColor: 'var(--text-primary)' }}
            />

            {/* Bottom / Denominator 2 */}
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center gap-1.5 w-full">
                <button
                  type="button"
                  disabled={den2 <= MIN_VAL}
                  onClick={() => setDen2((d) => Math.max(MIN_VAL, d - 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Decrease denominator 2"
                >
                  −
                </button>
                <input
                  id="fraction-2-den"
                  type="number"
                  min={MIN_VAL}
                  max={MAX_VAL}
                  value={den2}
                  onChange={(e) => setDen2(clampValue(parseInt(e.target.value)))}
                  onBlur={(e) => setDen2(clampValue(parseInt(e.target.value)))}
                  className="w-20 h-11 text-center text-xl font-black rounded-lg border-2 shadow-inner focus:ring-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  disabled={den2 >= MAX_VAL}
                  onClick={() => setDen2((d) => Math.min(MAX_VAL, d + 1))}
                  className="w-8 h-8 rounded-lg border font-black text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95 shadow-2xs"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Increase denominator 2"
                >
                  +
                </button>
              </div>
              <label
                htmlFor="fraction-2-den"
                className="text-[11px] font-extrabold uppercase tracking-wider mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                Bottom (Denominator: 1–12)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bar Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderFractionBarModel(
          num1,
          den1,
          'Visual Model 1',
          'var(--tool-model1-bg)',
          'var(--tool-model1-text)',
          'var(--tool-model1-badge-bg)',
          'var(--tool-model1-badge-text)'
        )}
        {renderFractionBarModel(
          num2,
          den2,
          'Visual Model 2',
          'var(--tool-model2-bg)',
          'var(--tool-model2-text)',
          'var(--tool-model2-badge-bg)',
          'var(--tool-model2-badge-text)'
        )}
      </div>

      {/* Live Result Bar Model (if positive and manageable denominator) */}
      {res.simpDen > 0 && res.simpNum > 0 && res.simpDen <= 16 && (
        <div
          className="p-4 sm:p-5 rounded-2xl border space-y-3 shadow-2xs max-w-full overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-black" style={{ color: 'var(--text-primary)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Result Bar Model (Simplest Form): <strong>{res.simpNum}/{res.simpDen}</strong></span>
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-extrabold border shadow-2xs"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              Answer: {((res.simpNum / res.simpDen) * 100).toFixed(1)}%
            </span>
          </div>

          {/* Render Result Unit Bar(s) */}
          <div className="space-y-2">
            {Array.from({ length: Math.min(3, Math.ceil(res.simpNum / res.simpDen)) }).map((_, barIdx) => {
              const startFractionIndex = barIdx * res.simpDen;
              const shadedInThisBar = Math.max(0, Math.min(res.simpDen, res.simpNum - startFractionIndex));

              return (
                <div key={barIdx} className="space-y-1">
                  {res.simpNum > res.simpDen && (
                    <div className="flex justify-between items-center text-[10px] font-bold px-0.5" style={{ color: 'var(--text-muted)' }}>
                      <span>Result Whole Unit {barIdx + 1}</span>
                      <span>{shadedInThisBar}/{res.simpDen} shaded</span>
                    </div>
                  )}
                  <div
                    className="h-8 sm:h-9 w-full rounded-xl overflow-hidden flex border-2 shadow-inner max-w-full"
                    style={{
                      backgroundColor: 'var(--bg-card-hover)',
                      borderColor: 'var(--border-card-strong)',
                    }}
                  >
                    {Array.from({ length: res.simpDen }).map((_, segIdx) => {
                      const isShaded = segIdx < shadedInThisBar;
                      return (
                        <div
                          key={segIdx}
                          className="flex-1 min-w-0 border-r last:border-r-0 transition-all flex items-center justify-center text-[9px] sm:text-[11px] font-black select-none truncate px-0.5"
                          style={{
                            backgroundColor: isShaded ? 'var(--accent-primary)' : 'transparent',
                            borderColor: 'var(--border-card-strong)',
                            color: isShaded ? 'var(--accent-contrast)' : 'var(--text-muted)',
                          }}
                        >
                          {res.simpDen <= 8 ? (
                            `1/${res.simpDen}`
                          ) : res.simpDen <= 12 ? (
                            <span className="hidden sm:inline">1/{res.simpDen}</span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step by Step Breakdown */}
      <ReadableCard
        id="fractions-tool-solution"
        textToRead={speechExplanation}
        label="Fraction Calculation Solution"
        highlightStyle="inner"
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-2xs max-w-full overflow-hidden"
        ariaLabel="Fraction Calculation Solution"
      >
        <div className="flex items-center justify-between">
          <h4
            className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: 'var(--accent-primary)' }}
          >
            <Sparkles size={16} />
            <span>Step-by-Step Calculation Solution</span>
          </h4>

          <AudioButton
            id="fractions-tool-solution"
            textToRead={speechExplanation}
            label="Fraction Solution"
            title="Listen to calculation solution"
            size="sm"
          />
        </div>

        {/* Equation Display Box */}
        <div
          className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-bold p-3 rounded-xl border max-w-full overflow-x-auto"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
            color: 'var(--text-primary)',
          }}
        >
          <MathView
            math={`\\frac{${num1}}{${den1}} ${operation === '×' ? '\\times' : operation === '÷' ? '\\div' : operation} \\frac{${num2}}{${den2}} = \\frac{${res.resNum}}{${res.resDen}}`}
          />
          {res.divisor > 1 && (
            <>
              <span className="opacity-50">⟶</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-md border shadow-2xs"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  borderColor: 'var(--border-card-strong)',
                }}
              >
                Simplify: divide top & bottom by {res.divisor}
              </span>
              <span className="opacity-50">⟶</span>
              <span
                className="px-2.5 py-1 rounded-lg border font-mono font-black shadow-2xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card-strong)',
                  color: 'var(--accent-primary)',
                }}
              >
                <MathView math={`\\mathbf{\\frac{${res.simpNum}}{${res.simpDen}}}`} />
              </span>
            </>
          )}
          {res.mixed && res.mixed !== `${res.simpNum}` && (
            <>
              <span className="opacity-50">or</span>
              <span
                className="px-2.5 py-1 rounded-lg border font-mono font-black shadow-2xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card-strong)',
                  color: 'var(--accent-primary)',
                }}
              >
                <MathView math={`\\mathbf{${res.mixed}}`} />
              </span>
            </>
          )}
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed break-words" style={{ color: 'var(--text-secondary)' }}>
          <p>• <strong>Step 1:</strong> {res.step1}</p>
          <p>• <strong>Step 2:</strong> {res.step2}</p>
        </div>
      </ReadableCard>
    </div>
  );
};
