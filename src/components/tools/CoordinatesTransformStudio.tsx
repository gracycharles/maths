'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView.tsx';
import { Sparkles, Info, RefreshCw, Compass, ArrowRight } from 'lucide-react';
import { ReadableCard } from '../ReadableCard.tsx';
import { AudioButton } from '../AudioButton.tsx';

export const CoordinatesTransformStudio: React.FC = () => {
  const [pointX, setPointX] = useState<number>(3);
  const [pointY, setPointY] = useState<number>(2);
  const [transformType, setTransformType] = useState<'none' | 'reflectX' | 'reflectY' | 'translate'>('none');
  const [transX, setTransX] = useState<number>(2);
  const [transY, setTransY] = useState<number>(-3);

  // Compute transformed point
  let newX = pointX;
  let newY = pointY;
  let transformDescription = 'Original Point A';

  if (transformType === 'reflectX') {
    newX = pointX;
    newY = -pointY;
    transformDescription = `Reflected across X-axis (y = 0): (x, y) ➔ (x, -y)`;
  } else if (transformType === 'reflectY') {
    newX = -pointX;
    newY = pointY;
    transformDescription = `Reflected across Y-axis (x = 0): (x, y) ➔ (-x, y)`;
  } else if (transformType === 'translate') {
    newX = pointX + transX;
    newY = pointY + transY;
    transformDescription = `Translated by vector (${transX >= 0 ? '+' + transX : transX}, ${transY >= 0 ? '+' + transY : transY})`;
  }

  // Grid coordinates range: -5 to +5
  const gridSize = 10;
  const scale = 24; // px per grid unit
  const center = (gridSize * scale) / 2;

  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header card */}
      <ReadableCard
        id="coords-tool-header"
        ariaLabel="Coordinates and Transformations Studio"
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
              <Compass size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                4-Quadrant Coordinates &amp; Reflection Sandbox
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Interactive Cartesian grid plotting, reflection mirror lines, and vector translations.
              </p>
            </div>
          </div>
          <AudioButton
            id="audio-coords-tool-intro"
            textToRead="Welcome to the Coordinates and Transformation Studio. Plot points across all 4 quadrants using the (x, y) along the corridor and up the stairs rule. Test reflections across the x-axis and y-axis, or apply translation vectors in real time."
            label="Tool Overview"
            size="sm"
          />
        </div>
      </ReadableCard>

      {/* Interactive Controls & Canvas */}
      <div
        className="p-5 border rounded-2xl shadow-xs space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Point coordinate sliders */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="coord-x" className="text-xs font-bold" style={{ color: 'var(--contrast-blue)' }}>
                X (Corridor):
              </label>
              <input
                id="coord-x"
                type="range"
                min="-5"
                max="5"
                value={pointX}
                onChange={(e) => setPointX(parseInt(e.target.value))}
                className="w-24 cursor-pointer"
                style={{ accentColor: 'var(--contrast-blue)' }}
              />
              <span className="font-mono text-xs font-bold w-6" style={{ color: 'var(--text-primary)' }}>{pointX}</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="coord-y" className="text-xs font-bold" style={{ color: 'var(--contrast-teal)' }}>
                Y (Stairs):
              </label>
              <input
                id="coord-y"
                type="range"
                min="-5"
                max="5"
                value={pointY}
                onChange={(e) => setPointY(parseInt(e.target.value))}
                className="w-24 cursor-pointer"
                style={{ accentColor: 'var(--contrast-teal)' }}
              />
              <span className="font-mono text-xs font-bold w-6" style={{ color: 'var(--text-primary)' }}>{pointY}</span>
            </div>
          </div>

          {/* Transformation selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTransformType('none')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs"
              style={{
                backgroundColor: transformType === 'none' ? 'var(--contrast-blue)' : 'var(--bg-card-subtle)',
                borderColor: transformType === 'none' ? 'var(--contrast-blue-border)' : 'var(--border-card)',
                color: transformType === 'none' ? '#ffffff' : 'var(--text-primary)',
              }}
            >
              Plot Only
            </button>
            <button
              type="button"
              onClick={() => setTransformType('reflectX')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs"
              style={{
                backgroundColor: transformType === 'reflectX' ? 'var(--contrast-purple)' : 'var(--bg-card-subtle)',
                borderColor: transformType === 'reflectX' ? 'var(--contrast-purple-border)' : 'var(--border-card)',
                color: transformType === 'reflectX' ? '#ffffff' : 'var(--text-primary)',
              }}
            >
              Reflect X-Axis
            </button>
            <button
              type="button"
              onClick={() => setTransformType('reflectY')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs"
              style={{
                backgroundColor: transformType === 'reflectY' ? 'var(--contrast-purple)' : 'var(--bg-card-subtle)',
                borderColor: transformType === 'reflectY' ? 'var(--contrast-purple-border)' : 'var(--border-card)',
                color: transformType === 'reflectY' ? '#ffffff' : 'var(--text-primary)',
              }}
            >
              Reflect Y-Axis
            </button>
            <button
              type="button"
              onClick={() => setTransformType('translate')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs"
              style={{
                backgroundColor: transformType === 'translate' ? 'var(--contrast-amber)' : 'var(--bg-card-subtle)',
                borderColor: transformType === 'translate' ? 'var(--contrast-amber-border)' : 'var(--border-card)',
                color: transformType === 'translate' ? '#ffffff' : 'var(--text-primary)',
              }}
            >
              Translate Vector
            </button>
          </div>
        </div>

        {/* Translation delta controls if active */}
        {transformType === 'translate' && (
          <div
            className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
            }}
          >
            <span className="font-extrabold" style={{ color: 'var(--contrast-amber)' }}>
              Vector Translation Controls:
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>ΔX:</span>
                {[-3, -2, -1, 0, 1, 2, 3].map((dx) => (
                  <button
                    key={dx}
                    type="button"
                    onClick={() => setTransX(dx)}
                    className="px-2 py-0.5 rounded font-mono font-bold border cursor-pointer shadow-2xs transition-all"
                    style={{
                      backgroundColor: transX === dx ? 'var(--contrast-amber)' : 'var(--bg-card)',
                      borderColor: 'var(--border-card)',
                      color: transX === dx ? '#ffffff' : 'var(--text-primary)',
                    }}
                  >
                    {dx > 0 ? `+${dx}` : dx}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>ΔY:</span>
                {[-3, -2, -1, 0, 1, 2, 3].map((dy) => (
                  <button
                    key={dy}
                    type="button"
                    onClick={() => setTransY(dy)}
                    className="px-2 py-0.5 rounded font-mono font-bold border cursor-pointer shadow-2xs transition-all"
                    style={{
                      backgroundColor: transY === dy ? 'var(--contrast-amber)' : 'var(--bg-card)',
                      borderColor: 'var(--border-card)',
                      color: transY === dy ? '#ffffff' : 'var(--text-primary)',
                    }}
                  >
                    {dy > 0 ? `+${dy}` : dy}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4 Quadrants SVG Canvas */}
        <div
          className="flex flex-col items-center justify-center p-4 border rounded-xl overflow-x-auto shadow-inner"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <svg
            width={gridSize * scale}
            height={gridSize * scale}
            className="rounded-lg shadow-sm border max-w-full"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card-strong)',
            }}
          >
            {/* Grid Lines */}
            {Array.from({ length: gridSize + 1 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={i * scale}
                  y1={0}
                  x2={i * scale}
                  y2={gridSize * scale}
                  stroke="var(--border-card)"
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={i * scale}
                  x2={gridSize * scale}
                  y2={i * scale}
                  stroke="var(--border-card)"
                  strokeWidth={1}
                />
              </React.Fragment>
            ))}

            {/* Axes */}
            {/* X-axis */}
            <line
              x1={0}
              y1={center}
              x2={gridSize * scale}
              y2={center}
              stroke={transformType === 'reflectX' ? 'var(--contrast-purple)' : 'var(--text-secondary)'}
              strokeWidth={transformType === 'reflectX' ? 3 : 2}
            />
            {/* Y-axis */}
            <line
              x1={center}
              y1={0}
              x2={center}
              y2={gridSize * scale}
              stroke={transformType === 'reflectY' ? 'var(--contrast-purple)' : 'var(--text-secondary)'}
              strokeWidth={transformType === 'reflectY' ? 3 : 2}
            />

            {/* Axis labels */}
            <text x={gridSize * scale - 14} y={center - 6} fontSize="11" fontWeight="bold" fill="var(--text-secondary)">
              X
            </text>
            <text x={center + 6} y={14} fontSize="11" fontWeight="bold" fill="var(--text-secondary)">
              Y
            </text>

            {/* Quadrant labels */}
            <text x={center + 40} y={center - 40} fontSize="10" fontWeight="bold" fill="var(--text-muted)">
              Q1 (+, +)
            </text>
            <text x={center - 80} y={center - 40} fontSize="10" fontWeight="bold" fill="var(--text-muted)">
              Q2 (−, +)
            </text>
            <text x={center - 80} y={center + 60} fontSize="10" fontWeight="bold" fill="var(--text-muted)">
              Q3 (−, −)
            </text>
            <text x={center + 40} y={center + 60} fontSize="10" fontWeight="bold" fill="var(--text-muted)">
              Q4 (+, −)
            </text>

            {/* Original Point A */}
            <circle
              cx={toSvgX(pointX)}
              cy={toSvgY(pointY)}
              r={7}
              fill="var(--contrast-blue)"
              stroke="#ffffff"
              strokeWidth={2}
            />
            <text
              x={toSvgX(pointX) + 8}
              y={toSvgY(pointY) - 6}
              fontSize="12"
              fontWeight="black"
              fill="var(--contrast-blue)"
            >
              A ({pointX}, {pointY})
            </text>

            {/* Transformed Point A' */}
            {transformType !== 'none' && (
              <>
                {/* Connecting line */}
                <line
                  x1={toSvgX(pointX)}
                  y1={toSvgY(pointY)}
                  x2={toSvgX(newX)}
                  y2={toSvgY(newY)}
                  stroke="var(--contrast-purple)"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />
                <circle
                  cx={toSvgX(newX)}
                  cy={toSvgY(newY)}
                  r={7}
                  fill="var(--contrast-purple)"
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="animate-pulse"
                />
                <text
                  x={toSvgX(newX) + 8}
                  y={toSvgY(newY) - 6}
                  fontSize="12"
                  fontWeight="black"
                  fill="var(--contrast-purple)"
                >
                  A' ({newX}, {newY})
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Summary Card */}
        <div
          className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shadow-2xs"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div className="space-y-0.5">
            <span className="font-extrabold block" style={{ color: 'var(--text-primary)' }}>
              📌 {transformDescription}
            </span>
            <div className="font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
              Original: <span style={{ color: 'var(--contrast-blue)' }}>A({pointX}, {pointY})</span>
              {transformType !== 'none' && (
                <span> ➔ Transformed: <span style={{ color: 'var(--contrast-purple)' }}>A'({newX}, {newY})</span></span>
              )}
            </div>
          </div>
          <span className="font-bold" style={{ color: 'var(--contrast-teal)' }}>
            Rule: Along the corridor (X), then up/down the stairs (Y)
          </span>
        </div>
      </div>
    </div>
  );
};
