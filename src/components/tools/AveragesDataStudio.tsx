'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Sparkles, Info, RefreshCw, BarChart2 } from 'lucide-react';
import { ReadableCard } from '../ReadableCard';
import { AudioButton } from '../AudioButton';

export const AveragesDataStudio: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([4, 7, 7, 8, 9, 10, 11]);

  const sortedData = [...dataPoints].sort((a, b) => a - b);
  const count = dataPoints.length;

  // Mean
  const sum = dataPoints.reduce((acc, v) => acc + v, 0);
  const mean = count > 0 ? Number((sum / count).toFixed(2)) : 0;

  // Median
  const median = (() => {
    if (count === 0) return 0;
    const mid = Math.floor(count / 2);
    return count % 2 !== 0 ? sortedData[mid] : Number(((sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(2));
  })();

  // Mode
  const mode = (() => {
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    dataPoints.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    if (maxFreq <= 1 && count > 1) return 'No distinct mode';
    const modes = Object.keys(freq).filter((k) => freq[parseInt(k)] === maxFreq);
    return modes.join(', ');
  })();

  // Range
  const min = count > 0 ? Math.min(...dataPoints) : 0;
  const max = count > 0 ? Math.max(...dataPoints) : 0;
  const range = max - min;

  const presets = [
    { label: 'Weekly Test Scores', data: [4, 7, 7, 8, 9, 10, 11] },
    { label: 'Sibling Heights (cm/10)', data: [12, 13, 13, 14, 15, 17] },
    { label: 'Daily Temperatures (°C)', data: [15, 18, 14, 18, 20, 22, 19] },
    { label: 'Goal Tally', data: [2, 0, 3, 1, 2, 4, 2] },
  ];

  const addPoint = (val: number) => {
    if (dataPoints.length < 12) {
      setDataPoints([...dataPoints, val]);
    }
  };

  const removePoint = (index: number) => {
    if (dataPoints.length > 2) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header card */}
      <ReadableCard
        id="averages-tool-header"
        ariaLabel="Averages and Data Handling Studio"
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
              <BarChart2 size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                Averages &amp; Data Handling Laboratory
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Real-time calculation of Mean, Median, Mode, and Range with interactive data points.
              </p>
            </div>
          </div>
          <AudioButton
            id="audio-averages-tool-intro"
            textToRead="Welcome to the Averages and Data Handling Laboratory. Add, remove, or edit data points to instantly see the Mean, Median, Mode, and Range calculated with step-by-step working."
            label="Tool Overview"
            size="sm"
          />
        </div>
      </ReadableCard>

      {/* Preset Pickers & Data editor */}
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
              Sample Datasets:
            </span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setDataPoints(p.data)}
                className="px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-2xs"
                style={{
                  backgroundColor: JSON.stringify(dataPoints) === JSON.stringify(p.data) ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: JSON.stringify(dataPoints) === JSON.stringify(p.data) ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: JSON.stringify(dataPoints) === JSON.stringify(p.data) ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Data Point Pills */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-2" style={{ color: 'var(--text-secondary)' }}>
            <span>Active Data Points ({dataPoints.length} values):</span>
            <span className="font-mono" style={{ color: 'var(--text-muted)' }}>Sorted: [{sortedData.join(', ')}]</span>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 p-3 rounded-xl border min-h-[52px]"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-card)',
            }}
          >
            {dataPoints.map((val, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg border text-xs font-black flex items-center gap-2 shadow-2xs animate-scaleIn"
                style={{
                  backgroundColor: 'var(--contrast-blue-bg)',
                  borderColor: 'var(--contrast-blue-border)',
                  color: 'var(--contrast-blue)',
                }}
              >
                <span>{val}</span>
                {dataPoints.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removePoint(idx)}
                    className="opacity-70 hover:opacity-100 hover:text-red-500 cursor-pointer text-xs transition-opacity"
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {dataPoints.length < 12 && (
              <button
                type="button"
                onClick={() => addPoint(Math.floor(Math.random() * 15) + 1)}
                className="px-2.5 py-1.5 rounded-lg border border-dashed text-xs font-bold cursor-pointer transition-all shadow-2xs"
                style={{
                  borderColor: 'var(--border-card-strong)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--accent-primary)',
                }}
              >
                + Add Value
              </button>
            )}
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Mean */}
          <div
            className="p-3.5 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-blue-bg)',
              borderColor: 'var(--contrast-blue-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-blue)' }}>
              Mean (Average)
            </span>
            <div className="text-2xl font-mono font-black" style={{ color: 'var(--contrast-blue)' }}>
              {mean}
            </div>
            <span className="text-[10px] font-bold block" style={{ color: 'var(--contrast-blue)' }}>
              Sum ({sum}) ÷ Count ({count})
            </span>
          </div>

          {/* Median */}
          <div
            className="p-3.5 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-teal-bg)',
              borderColor: 'var(--contrast-teal-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-teal)' }}>
              Median (Middle)
            </span>
            <div className="text-2xl font-mono font-black" style={{ color: 'var(--contrast-teal)' }}>
              {median}
            </div>
            <span className="text-[10px] font-bold block" style={{ color: 'var(--contrast-teal)' }}>
              Middle of ordered list
            </span>
          </div>

          {/* Mode */}
          <div
            className="p-3.5 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-amber)' }}>
              Mode (Most Common)
            </span>
            <div className="text-2xl font-mono font-black truncate" style={{ color: 'var(--contrast-amber)' }}>
              {mode}
            </div>
            <span className="text-[10px] font-bold block" style={{ color: 'var(--contrast-amber)' }}>
              Most frequent value
            </span>
          </div>

          {/* Range */}
          <div
            className="p-3.5 rounded-xl border text-center space-y-1 shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-purple-bg)',
              borderColor: 'var(--contrast-purple-border)',
            }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--contrast-purple)' }}>
              Range (Spread)
            </span>
            <div className="text-2xl font-mono font-black" style={{ color: 'var(--contrast-purple)' }}>
              {range}
            </div>
            <span className="text-[10px] font-bold block" style={{ color: 'var(--contrast-purple)' }}>
              Max ({max}) − Min ({min})
            </span>
          </div>
        </div>

        {/* Step-by-Step Calculation Formula Box */}
        <div
          className="p-4 rounded-xl border text-xs font-mono space-y-1.5 shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
            color: 'var(--text-secondary)',
          }}
        >
          <div className="font-bold font-sans" style={{ color: 'var(--text-primary)' }}>
            📝 Step-by-Step Working:
          </div>
          <div>1. Sum of all values = {dataPoints.join(' + ')} = <strong style={{ color: 'var(--accent-primary)' }}>{sum}</strong></div>
          <div>2. Mean = {sum} ÷ {count} = <strong style={{ color: 'var(--accent-primary)' }}>{mean}</strong></div>
          <div>3. Ordered list = [{sortedData.join(', ')}] ➔ Middle is <strong style={{ color: 'var(--accent-primary)' }}>{median}</strong></div>
          <div>4. Range = {max} − {min} = <strong style={{ color: 'var(--accent-primary)' }}>{range}</strong></div>
        </div>
      </div>
    </div>
  );
};
