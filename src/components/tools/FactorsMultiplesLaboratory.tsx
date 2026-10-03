'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView.tsx';
import { Sparkles, Info, RefreshCw, Layers } from 'lucide-react';
import { ReadableCard } from '../ReadableCard.tsx';
import { AudioButton } from '../AudioButton.tsx';

export const FactorsMultiplesLaboratory: React.FC = () => {
  const [numA, setNumA] = useState<number>(24);
  const [numB, setNumB] = useState<number>(36);

  // Calculate factors of a number
  const getFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const factorsA = getFactors(numA);
  const factorsB = getFactors(numB);

  // Common factors
  const commonFactors = factorsA.filter((f) => factorsB.includes(f));
  const hcf = Math.max(...commonFactors);

  // LCM helper
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (numA * numB) / gcd(numA, numB);

  // Factor pairs for rainbow
  const getFactorPairs = (n: number): [number, number][] => {
    const pairs: [number, number][] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        pairs.push([i, n / i]);
      }
    }
    return pairs;
  };

  const factorPairsA = getFactorPairs(numA);

  const rainbowTokenStyles = [
    {
      backgroundColor: 'var(--contrast-warm-bg)',
      borderColor: 'var(--contrast-warm-border)',
      color: 'var(--contrast-warm)',
    },
    {
      backgroundColor: 'var(--contrast-amber-bg)',
      borderColor: 'var(--contrast-amber-border)',
      color: 'var(--contrast-amber)',
    },
    {
      backgroundColor: 'var(--contrast-teal-bg)',
      borderColor: 'var(--contrast-teal-border)',
      color: 'var(--contrast-teal)',
    },
    {
      backgroundColor: 'var(--contrast-blue-bg)',
      borderColor: 'var(--contrast-blue-border)',
      color: 'var(--contrast-blue)',
    },
    {
      backgroundColor: 'var(--contrast-purple-bg)',
      borderColor: 'var(--contrast-purple-border)',
      color: 'var(--contrast-purple)',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header card */}
      <ReadableCard
        id="factors-tool-header"
        ariaLabel="Factors, Primes &amp; Multiples Laboratory"
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
                Factor Rainbow &amp; HCF / LCM Engine
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Factor pairs rainbow visualizer, prime tester, and instant HCF / LCM comparison.
              </p>
            </div>
          </div>
          <AudioButton
            id="audio-factors-tool-intro"
            textToRead="Welcome to the Factors, Primes and Multiples Laboratory. Inspect factor rainbows for any number, test prime numbers, and compare two numbers to find common factors, HCF, and LCM."
            label="Tool Overview"
            size="sm"
          />
        </div>
      </ReadableCard>

      {/* Preset Pickers */}
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
              Primary Number (A):
            </span>
            {[12, 18, 24, 30, 48].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setNumA(val)}
                className="px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-2xs"
                style={{
                  backgroundColor: numA === val ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: numA === val ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: numA === val ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {val}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="factors-custom-a" className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              Input A:
            </label>
            <input
              id="factors-custom-a"
              type="number"
              min="1"
              max="200"
              value={numA}
              onChange={(e) => setNumA(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-1.5 text-xs font-mono font-bold rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Factor Rainbow Display */}
        <div
          className="p-4 rounded-xl border space-y-3 shadow-2xs"
          style={{
            backgroundColor: 'var(--contrast-blue-bg)',
            borderColor: 'var(--contrast-blue-border)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-blue)' }}>
              🌈 Factor Rainbow for {numA} ({factorsA.length} total factors)
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-md border shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--contrast-blue-border)',
                color: 'var(--contrast-blue)',
              }}
            >
              {isPrime(numA) ? '⭐ Prime Number!' : 'Composite Number'}
            </span>
          </div>

          {/* Factor Pairs as Rainbow Arches */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-2">
            {factorPairsA.map((pair, idx) => {
              const styleToken = rainbowTokenStyles[idx % rainbowTokenStyles.length];
              return (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl border font-mono text-xs font-black flex items-center gap-2 shadow-2xs"
                  style={styleToken}
                >
                  <span>{pair[0]}</span>
                  <span className="text-[10px] font-normal opacity-70">×</span>
                  <span>{pair[1]}</span>
                  <span className="text-[10px] font-normal opacity-70">= {numA}</span>
                </div>
              );
            })}
          </div>

          {/* Factor list */}
          <div className="text-xs text-center font-mono font-bold" style={{ color: 'var(--contrast-blue)' }}>
            All Factors: [{factorsA.join(', ')}]
          </div>
        </div>
      </div>

      {/* Two-Number Comparator: HCF & LCM */}
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
              <span>⚖️ Compare Two Numbers: HCF &amp; LCM</span>
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Find Highest Common Factor and Lowest Common Multiple.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="factors-custom-b" className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              Number B:
            </label>
            <input
              id="factors-custom-b"
              type="number"
              min="1"
              max="200"
              value={numB}
              onChange={(e) => setNumB(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-1.5 text-xs font-mono font-bold rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* HCF Box */}
          <div
            className="p-4 rounded-xl border space-y-2 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-teal-bg)',
              borderColor: 'var(--contrast-teal-border)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--contrast-teal)' }}>
              Highest Common Factor (HCF)
            </span>
            <div className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              HCF({numA}, {numB}) = <span className="underline font-extrabold" style={{ color: 'var(--contrast-teal)' }}>{hcf}</span>
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--contrast-teal)' }}>
              Common factors: [{commonFactors.join(', ')}]. Largest shared divisor is {hcf}.
            </p>
          </div>

          {/* LCM Box */}
          <div
            className="p-4 rounded-xl border space-y-2 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-indigo-bg)',
              borderColor: 'var(--contrast-indigo-border)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--contrast-indigo)' }}>
              Lowest Common Multiple (LCM)
            </span>
            <div className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              LCM({numA}, {numB}) = <span className="underline font-extrabold" style={{ color: 'var(--contrast-indigo)' }}>{lcm}</span>
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--contrast-indigo)' }}>
              Smallest multiple that both {numA} and {numB} divide into evenly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
