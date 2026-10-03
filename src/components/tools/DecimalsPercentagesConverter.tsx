'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView.tsx';
import { Sparkles, Info, RefreshCw, Layers } from 'lucide-react';
import { ReadableCard } from '../ReadableCard.tsx';
import { AudioButton } from '../AudioButton.tsx';

export const DecimalsPercentagesConverter: React.FC = () => {
  const [percent, setPercent] = useState<number>(35);
  const [baseAmount, setBaseAmount] = useState<number>(80);

  const decimalVal = Number((percent / 100).toFixed(4));
  const fractionStr = `${percent}/100`;

  // Simplify fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(percent, 100);
  const simNum = percent / divisor;
  const simDen = 100 / divisor;

  const calculatedAmount = Number(((baseAmount * percent) / 100).toFixed(2));
  const mental10 = Number((baseAmount * 0.1).toFixed(2));
  const mental5 = Number((baseAmount * 0.05).toFixed(2));
  const mental1 = Number((baseAmount * 0.01).toFixed(2));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header card */}
      <ReadableCard
        id="fdp-tool-header"
        ariaLabel="Decimals, Percentages &amp; Fractions Interactive Tool"
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
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                FDP Converter &amp; Mental Percentage Studio
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Equivalence visualizer, 100-grid sandbox, and mental percentage Lego building blocks.
              </p>
            </div>
          </div>
          <AudioButton
            id="audio-fdp-tool-intro"
            textToRead="Welcome to the Fractions, Decimals and Percentages Studio. Adjust percentages on the interactive 100-grid to see instant equivalent fractions and decimals, and calculate percentages of amounts using mental 10% and 5% building blocks."
            label="Tool Overview"
            size="sm"
          />
        </div>
      </ReadableCard>

      {/* Preset benchmarks & Slider */}
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
              Gold Benchmarks:
            </span>
            {[
              { label: '50% (½)', val: 50 },
              { label: '25% (¼)', val: 25 },
              { label: '75% (¾)', val: 75 },
              { label: '10% (¹⁄₁₀)', val: 10 },
              { label: '20% (⅕)', val: 20 },
              { label: '35%', val: 35 },
            ].map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() => setPercent(b.val)}
                className="px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-2xs"
                style={{
                  backgroundColor: percent === b.val ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: percent === b.val ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: percent === b.val ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="fdp-slider" className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              Slider:
            </label>
            <input
              id="fdp-slider"
              type="range"
              min="1"
              max="100"
              value={percent}
              onChange={(e) => setPercent(parseInt(e.target.value))}
              className="w-36 cursor-pointer"
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            <span className="font-mono text-sm font-black w-12 text-right" style={{ color: 'var(--accent-primary)' }}>
              {percent}%
            </span>
          </div>
        </div>

        {/* 3-Way Equivalence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className="p-4 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-blue-bg)',
              borderColor: 'var(--contrast-blue-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-blue)' }}>
              Simplified Fraction
            </span>
            <div className="text-2xl font-black" style={{ color: 'var(--contrast-blue)' }}>
              <MathView math={`\\frac{${simNum}}{${simDen}}`} />
            </div>
            <span className="text-[11px] font-mono font-bold block" style={{ color: 'var(--contrast-blue)' }}>
              ({percent}/100)
            </span>
          </div>

          <div
            className="p-4 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-teal-bg)',
              borderColor: 'var(--contrast-teal-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-teal)' }}>
              Decimal Value
            </span>
            <div className="text-2xl font-mono font-black" style={{ color: 'var(--contrast-teal)' }}>
              {decimalVal}
            </div>
            <span className="text-[11px] font-bold block" style={{ color: 'var(--contrast-teal)' }}>
              ({percent} ÷ 100)
            </span>
          </div>

          <div
            className="p-4 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-amber)' }}>
              Percentage
            </span>
            <div className="text-2xl font-mono font-black" style={{ color: 'var(--contrast-amber)' }}>
              {percent}%
            </div>
            <span className="text-[11px] font-bold block" style={{ color: 'var(--contrast-amber)' }}>
              ({percent} out of 100)
            </span>
          </div>
        </div>

        {/* 100 Grid Visualizer */}
        <div
          className="p-4 rounded-xl border space-y-2"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div className="flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
            <span>Hundredths Grid ({percent} / 100 shaded):</span>
            <span className="font-extrabold" style={{ color: 'var(--accent-primary)' }}>{percent}% Shaded</span>
          </div>
          <div
            className="grid grid-cols-10 gap-1 aspect-square max-w-[280px] mx-auto p-2 border rounded-xl shadow-inner"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card-strong)',
            }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xs transition-colors duration-150"
                style={{
                  backgroundColor: i < percent ? 'var(--accent-primary)' : 'var(--bg-card-hover)',
                  border: i < percent ? 'none' : '1px solid var(--border-card)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Percentage of an Amount Calculator */}
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
              <span>🧮 Percentage of an Amount Calculator</span>
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              See the Lego decomposition method in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Base (£/units):</span>
            {[40, 80, 120, 250, 600].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setBaseAmount(a)}
                className="px-2.5 py-1 rounded-lg text-xs font-black border cursor-pointer shadow-2xs transition-all"
                style={{
                  backgroundColor: baseAmount === a ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: baseAmount === a ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: baseAmount === a ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                £{a}
              </button>
            ))}
          </div>
        </div>

        <div
          className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs"
          style={{
            backgroundColor: 'var(--contrast-amber-bg)',
            borderColor: 'var(--contrast-amber-border)',
          }}
        >
          <div>
            <span className="text-xs font-bold block" style={{ color: 'var(--contrast-amber)' }}>
              Calculating {percent}% of £{baseAmount}:
            </span>
            <div className="text-2xl font-mono font-black mt-1" style={{ color: 'var(--text-primary)' }}>
              £{calculatedAmount}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div
              className="p-2 rounded-lg border shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>10% Block</span>
              <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)' }}>£{mental10}</span>
            </div>
            <div
              className="p-2 rounded-lg border shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>5% Block</span>
              <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)' }}>£{mental5}</span>
            </div>
            <div
              className="p-2 rounded-lg border shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>1% Block</span>
              <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)' }}>£{mental1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
