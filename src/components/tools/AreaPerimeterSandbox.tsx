'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView.tsx';
import { ReadableCard } from '../ReadableCard.tsx';

export const AreaPerimeterSandbox: React.FC = () => {
  const [shape, setShape] = useState<'rectangle' | 'triangle' | 'parallelogram'>('rectangle');
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(4);

  let area = 0;
  let perimeterText = '';
  let formulaText = '';
  let speechText = '';

  if (shape === 'rectangle') {
    area = length * width;
    const perimeter = 2 * (length + width);
    perimeterText = `Perimeter = 2 × (${length} + ${width}) = ${perimeter} cm`;
    formulaText = `\\text{Area} = ${length} \\times ${width} = ${area}\\text{ cm}^2`;
    speechText = `Rectangle with length ${length} centimetres and width ${width} centimetres. Area is ${length} times ${width} equals ${area} square centimetres. Perimeter is ${perimeter} centimetres.`;
  } else if (shape === 'triangle') {
    area = (length * width) / 2;
    formulaText = `\\text{Area} = \\frac{${length} \\times ${width}}{2} = ${area}\\text{ cm}^2`;
    perimeterText = `Perimeter depends on side lengths (add all 3 outer sides)`;
    speechText = `Triangle with base ${length} centimetres and vertical height ${width} centimetres. Area is half times base times height, which is ${length} times ${width} divided by 2, giving ${area} square centimetres.`;
  } else {
    area = length * width;
    formulaText = `\\text{Area} = \\text{Base} \\times \\text{Perp Height} = ${length} \\times ${width} = ${area}\\text{ cm}^2`;
    perimeterText = `Perimeter = 2 × (base + slant side)`;
    speechText = `Parallelogram with base ${length} centimetres and perpendicular height ${width} centimetres. Area is ${length} times ${width} equals ${area} square centimetres.`;
  }

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
              Interactive Sandbox
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
              Primary 5 & 6
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-extrabold mt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Area & Perimeter Visual Grid Sandbox
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            Adjust dimensions to see how 2D grid squares fill the space and how perimeter bounds the shape. Click to read aloud.
          </p>
        </div>
      </div>

      {/* Shape Selector */}
      <div className="flex flex-wrap gap-2">
        {(['rectangle', 'triangle', 'parallelogram'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setShape(s)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer border"
            style={{
              backgroundColor: shape === s ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
              borderColor: shape === s ? 'var(--accent-primary)' : 'var(--border-card)',
              color: shape === s ? 'var(--accent-contrast)' : 'var(--text-primary)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid Canvas & Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Box with accurate geometric SVG */}
        <div
          className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border min-h-[240px] overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
          }}
        >
          <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-[190px] select-none">
            {/* Background grid dots for scale */}
            <pattern id="sandbox-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="var(--border-card)" opacity="0.6" />
            </pattern>
            <rect width="280" height="200" fill="url(#sandbox-grid)" rx="12" />

            {shape === 'rectangle' && (() => {
              const svgW = Math.min(210, Math.max(70, length * 17));
              const svgH = Math.min(130, Math.max(50, width * 13));
              const x = (280 - svgW) / 2;
              const y = (190 - svgH) / 2;
              return (
                <g>
                  {/* Rectangle body */}
                  <rect
                    x={x}
                    y={y}
                    width={svgW}
                    height={svgH}
                    rx="6"
                    fill="var(--reading-highlight-bg)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2.5"
                  />
                  {/* Internal grid partition lines if small scale */}
                  {length <= 8 && Array.from({ length: length - 1 }, (_, i) => (
                    <line
                      key={`vl-${i}`}
                      x1={x + ((i + 1) * svgW) / length}
                      y1={y}
                      x2={x + ((i + 1) * svgW) / length}
                      y2={y + svgH}
                      stroke="var(--accent-primary)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  ))}
                  {/* Dimension: Length Top */}
                  <text
                    x={140}
                    y={Math.max(16, y - 8)}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="800"
                  >
                    {length} cm (Length)
                  </text>
                  {/* Dimension: Width Left */}
                  <text
                    x={Math.max(12, x - 8)}
                    y={y + svgH / 2 + 4}
                    textAnchor="end"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="800"
                  >
                    {width} cm
                  </text>
                  {/* Area Badge in center */}
                  <rect
                    x={140 - 52}
                    y={y + svgH / 2 - 13}
                    width="104"
                    height="26"
                    rx="6"
                    fill="var(--bg-card)"
                    stroke="var(--border-card-strong)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={140}
                    y={y + svgH / 2 + 4}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="900"
                  >
                    Area: {area} cm²
                  </text>
                </g>
              );
            })()}

            {shape === 'triangle' && (() => {
              const svgBase = Math.min(210, Math.max(80, length * 17));
              const svgH = Math.min(130, Math.max(50, width * 13));
              const xLeft = (280 - svgBase) / 2;
              const xRight = xLeft + svgBase;
              const xApex = xLeft + svgBase * 0.45;
              const yBottom = 165;
              const yApex = yBottom - svgH;
              return (
                <g>
                  {/* Triangle body */}
                  <polygon
                    points={`${xLeft},${yBottom} ${xApex},${yApex} ${xRight},${yBottom}`}
                    fill="var(--reading-highlight-bg)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Perpendicular Height altitude line */}
                  <line
                    x1={xApex}
                    y1={yApex}
                    x2={xApex}
                    y2={yBottom}
                    stroke="#dc2626"
                    strokeWidth="1.8"
                    strokeDasharray="3,3"
                  />
                  {/* Right angle marker */}
                  <path
                    d={`M ${xApex} ${yBottom - 8} L ${xApex + 8} ${yBottom - 8} L ${xApex + 8} ${yBottom}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  {/* Height label */}
                  <text
                    x={xApex - 6}
                    y={yApex + svgH / 2 + 3}
                    textAnchor="end"
                    fill="#dc2626"
                    fontSize="11"
                    fontWeight="800"
                  >
                    h = {width} cm
                  </text>
                  {/* Base label */}
                  <text
                    x={140}
                    y={yBottom + 16}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="800"
                  >
                    Base = {length} cm
                  </text>
                  {/* Area Badge */}
                  <rect
                    x={140 - 52}
                    y={yApex + svgH * 0.65}
                    width="104"
                    height="24"
                    rx="5"
                    fill="var(--bg-card)"
                    stroke="var(--border-card-strong)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={140}
                    y={yApex + svgH * 0.65 + 16}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="900"
                  >
                    Area: {area} cm²
                  </text>
                </g>
              );
            })()}

            {shape === 'parallelogram' && (() => {
              const svgBase = Math.min(180, Math.max(70, length * 14));
              const svgH = Math.min(120, Math.max(45, width * 12));
              const slant = 32;
              const xLeft = (280 - (svgBase + slant)) / 2 + slant;
              const yBottom = 160;
              const yTop = yBottom - svgH;
              const p1 = `${xLeft},${yBottom}`;
              const p2 = `${xLeft + svgBase},${yBottom}`;
              const p3 = `${xLeft + svgBase - slant},${yTop}`;
              const p4 = `${xLeft - slant},${yTop}`;
              return (
                <g>
                  {/* Parallelogram body */}
                  <polygon
                    points={`${p1} ${p2} ${p3} ${p4}`}
                    fill="var(--reading-highlight-bg)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Perpendicular height line */}
                  <line
                    x1={xLeft}
                    y1={yTop}
                    x2={xLeft}
                    y2={yBottom}
                    stroke="#dc2626"
                    strokeWidth="1.8"
                    strokeDasharray="3,3"
                  />
                  {/* Right angle marker */}
                  <path
                    d={`M ${xLeft} ${yBottom - 8} L ${xLeft + 8} ${yBottom - 8} L ${xLeft + 8} ${yBottom}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  {/* Height label */}
                  <text
                    x={xLeft - 6}
                    y={yTop + svgH / 2 + 4}
                    textAnchor="end"
                    fill="#dc2626"
                    fontSize="11"
                    fontWeight="800"
                  >
                    h = {width} cm
                  </text>
                  {/* Base label */}
                  <text
                    x={xLeft + svgBase / 2}
                    y={yBottom + 16}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="800"
                  >
                    Base = {length} cm
                  </text>
                  {/* Area Badge */}
                  <rect
                    x={xLeft + svgBase / 2 - 50}
                    y={yTop + svgH / 2 - 12}
                    width="100"
                    height="24"
                    rx="5"
                    fill="var(--bg-card)"
                    stroke="var(--border-card-strong)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={xLeft + svgBase / 2}
                    y={yTop + svgH / 2 + 4}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="900"
                  >
                    Area: {area} cm²
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Sliders and results */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>{shape === 'triangle' ? 'Base Length' : 'Length'}: {length} cm</span>
            </label>
            <input
              type="range"
              min="2"
              max="12"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-1"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                accentColor: 'var(--accent-primary)',
              }}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>{shape === 'triangle' ? 'Vertical Height' : 'Width / Height'}: {width} cm</span>
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-1"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                accentColor: 'var(--accent-primary)',
              }}
            />
          </div>

          {/* Results Box - Click to Read! */}
          <ReadableCard
            id="area-tool-results"
            textToRead={speechText}
            highlightStyle="inner"
            className="p-4 rounded-xl border space-y-2 shadow-2xs"
            ariaLabel="Area and perimeter calculation results"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-extrabold uppercase"
                style={{ color: 'var(--accent-primary)' }}
              >
                Area Formula:
              </span>
              <MathView math={formulaText} />
            </div>

            <div
              className="text-xs pt-1 border-t"
              style={{
                borderColor: 'var(--border-card)',
                color: 'var(--text-secondary)',
              }}
            >
              <strong>Perimeter rule:</strong> {perimeterText}
            </div>
          </ReadableCard>
        </div>
      </div>
    </div>
  );
};
