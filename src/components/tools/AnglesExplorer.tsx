'use client';

import React, { useState } from 'react';
import { ReadableCard } from '../ReadableCard';

export const AnglesExplorer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(65);

  const getAngleCategory = (deg: number) => {
    if (deg === 0) return { label: 'Zero Angle (0°)' };
    if (deg < 90) return { label: 'Acute Angle (Less than 90°)' };
    if (deg === 90) return { label: 'Right Angle (Exactly 90°)' };
    if (deg < 180) return { label: 'Obtuse Angle (Between 90° and 180°)' };
    if (deg === 180) return { label: 'Straight Line Angle (Exactly 180°)' };
    if (deg < 360) return { label: 'Reflex Angle (Greater than 180°)' };
    return { label: 'Full Turn (Exactly 360°)' };
  };

  const cat = getAngleCategory(angleDeg);

  // SVG Coordinates for angle visualization
  const center = 110;
  const radius = 80;
  const rad = (angleDeg * Math.PI) / 180;
  const endX = center + radius * Math.cos(-rad);
  const endY = center + radius * Math.sin(-rad);

  const largeArcFlag = angleDeg > 180 ? 1 : 0;
  const arcPath = `M ${center + 25} ${center} A 25 25 0 ${largeArcFlag} 0 ${
    center + 25 * Math.cos(-rad)
  } ${center + 25 * Math.sin(-rad)}`;

  const speechText = `Angle is ${angleDeg} degrees. This is classified as an ${cat.label}. On a straight line, the missing partner angle would be ${Math.max(0, 180 - angleDeg)} degrees. In a full circle, the remaining turn is ${360 - angleDeg} degrees.`;

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
              Primary 5 & 6 Geometry
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-extrabold mt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Live Angles & Protractor Visualizer
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            Drag the slider to test acute, right, obtuse, and reflex angles in real time! Click to read aloud.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Angle Canvas */}
        <div
          className="flex flex-col items-center justify-center p-4 rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <svg viewBox="0 0 220 220" className="w-48 h-48 sm:w-56 sm:h-56">
            {/* Protractor outer circle guide */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="var(--border-card-strong)"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            {/* Base line (0 degrees) */}
            <line
              x1={center}
              y1={center}
              x2={center + radius}
              y2={center}
              stroke="var(--text-primary)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Rotating Arm */}
            <line
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="var(--accent-primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Angle Arc */}
            {angleDeg > 0 && angleDeg < 360 && (
              <path
                d={arcPath}
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
                strokeDasharray={angleDeg === 90 ? '0' : 'none'}
              />
            )}
            {/* Right Angle Box */}
            {angleDeg === 90 && (
              <rect
                x={center}
                y={center - 18}
                width="18"
                height="18"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2"
              />
            )}
            {/* Center Pivot */}
            <circle cx={center} cy={center} r="5" fill="var(--text-primary)" />
          </svg>

          <span
            className="text-2xl sm:text-3xl font-black font-mono mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {angleDeg}°
          </span>
        </div>

        {/* Controls & Calculations */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>Angle Turn Slider</span>
              <span className="font-extrabold" style={{ color: 'var(--accent-primary)' }}>{angleDeg}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={angleDeg}
              onChange={(e) => setAngleDeg(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-2"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                accentColor: 'var(--accent-primary)',
              }}
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {[30, 45, 60, 90, 120, 135, 180, 240, 270, 360].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAngleDeg(preset)}
                className="px-2 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer"
                style={{
                  backgroundColor: angleDeg === preset ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  borderColor: angleDeg === preset ? 'var(--accent-primary)' : 'var(--border-card)',
                  color: angleDeg === preset ? 'var(--accent-contrast)' : 'var(--text-primary)',
                }}
              >
                {preset}°
              </button>
            ))}
          </div>

          {/* Classification Banner */}
          <div
            className="p-3.5 rounded-xl border space-y-1"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-card-strong)',
            }}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--accent-primary)' }}>
              Angle Classification
            </span>
            <p className="text-sm sm:text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {cat.label}
            </p>
          </div>

          {/* Key Facts Box - Click to Read! */}
          <ReadableCard
            id="angles-tool-facts"
            textToRead={speechText}
            highlightStyle="inner"
            className="p-3.5 rounded-xl border text-xs space-y-1.5 shadow-2xs"
            ariaLabel="Angle geometry facts"
          >
            <p style={{ color: 'var(--text-secondary)' }}>
              • <strong>Straight Line (180°):</strong> Partner angle is{' '}
              <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
                {Math.max(0, 180 - angleDeg)}°
              </span>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              • <strong>Full Turn (360°):</strong> Remaining angle is{' '}
              <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
                {360 - angleDeg}°
              </span>
            </p>
          </ReadableCard>
        </div>
      </div>
    </div>
  );
};
