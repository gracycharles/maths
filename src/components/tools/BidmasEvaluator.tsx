'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView.tsx';
import { CheckCircle } from 'lucide-react';
import { ReadableCard } from '../ReadableCard.tsx';

export const BidmasEvaluator: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const presets = [
    {
      expression: '3 + 4 \\times 5',
      plain: '3 + 4 × 5',
      steps: [
        { priority: 'Multiplication (M)', part: '4 × 5 = 20', result: '3 + 20' },
        { priority: 'Addition (A)', part: '3 + 20 = 23', result: '23' },
      ],
      final: '23',
      audioText: 'Problem: 3 plus 4 times 5. Step 1: Multiplication comes before addition, so 4 times 5 is 20. Step 2: 3 plus 20 is 23. Final answer is 23.',
    },
    {
      expression: '(12 - 4) \\div 2 + 5^2',
      plain: '(12 - 4) ÷ 2 + 5²',
      steps: [
        { priority: 'Brackets (B)', part: '(12 - 4) = 8', result: '8 ÷ 2 + 5²' },
        { priority: 'Indices / Square (I)', part: '5² = 25', result: '8 ÷ 2 + 25' },
        { priority: 'Division (D)', part: '8 ÷ 2 = 4', result: '4 + 25' },
        { priority: 'Addition (A)', part: '4 + 25 = 29', result: '29' },
      ],
      final: '29',
      audioText: 'Problem: 12 minus 4 in brackets, divided by 2, plus 5 squared. Step 1: Brackets first, 12 minus 4 is 8. Step 2: Indices next, 5 squared is 25. Step 3: Division next, 8 divided by 2 is 4. Step 4: Addition last, 4 plus 25 is 29.',
    },
    {
      expression: '20 - 2 \\times (3 + 4)',
      plain: '20 - 2 × (3 + 4)',
      steps: [
        { priority: 'Brackets (B)', part: '(3 + 4) = 7', result: '20 - 2 × 7' },
        { priority: 'Multiplication (M)', part: '2 × 7 = 14', result: '20 - 14' },
        { priority: 'Subtraction (S)', part: '20 - 14 = 6', result: '6' },
      ],
      final: '6',
      audioText: 'Problem: 20 minus 2 times (3 + 4). Brackets first gives 7. Then multiplication 2 times 7 gives 14. Finally 20 minus 14 equals 6.',
    },
    {
      expression: '24 \\div 4 \\times 2',
      plain: '24 ÷ 4 × 2',
      steps: [
        { priority: 'Left to Right Rule', part: '24 ÷ 4 = 6', result: '6 × 2' },
        { priority: 'Multiplication', part: '6 × 2 = 12', result: '12' },
      ],
      final: '12',
      audioText: 'Problem: 24 divided by 4 times 2. Division and multiplication share equal priority so work left to right: 24 divided by 4 is 6, then 6 times 2 is 12.',
    },
  ];

  const current = presets[selectedExample];

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
            BIDMAS Order of Operations Step-by-Step Solver
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            Select an expression to see how the mathematical priority ladder works step-by-step! Click to read aloud.
          </p>
        </div>
      </div>

      {/* Preset Expressions */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
          Choose a Problem to Solve:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedExample(idx)}
              className="p-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer border"
              style={{
                backgroundColor: selectedExample === idx ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                borderColor: selectedExample === idx ? 'var(--accent-primary)' : 'var(--border-card)',
                color: selectedExample === idx ? 'var(--accent-contrast)' : 'var(--text-primary)',
              }}
            >
              {p.plain}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Display */}
      <div
        className="p-4 rounded-xl text-center space-y-1 border shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card-strong)',
        }}
      >
        <span
          className="text-[11px] font-extrabold uppercase tracking-wider block"
          style={{ color: 'var(--accent-primary)' }}
        >
          Current Mathematical Problem
        </span>
        <div className="text-lg sm:text-2xl font-black font-mono">
          <MathView math={current.expression} block={true} className="bg-transparent" />
        </div>
      </div>

      {/* Step by Step Breakdown - Click to Read! */}
      <ReadableCard
        id={`bidmas-steps-${selectedExample}`}
        textToRead={current.audioText}
        highlightStyle="inner"
        className="p-4 rounded-xl border space-y-3 shadow-2xs"
        ariaLabel="BIDMAS Step-by-Step Breakdown"
      >
        <span
          className="text-xs font-extrabold uppercase tracking-wider block"
          style={{ color: 'var(--accent-primary)' }}
        >
          BIDMAS Priority Breakdown (Click to Read):
        </span>

        <div className="space-y-2">
          {current.steps.map((st, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm"
              style={{
                backgroundColor: 'var(--bg-card-hover)',
                borderColor: 'var(--border-card)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)',
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <span className="font-extrabold block" style={{ color: 'var(--text-primary)' }}>
                    {st.priority}
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {st.part}
                  </span>
                </div>
              </div>

              <div
                className="font-mono font-bold px-2.5 py-1 rounded border text-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                ⟶ {st.result}
              </div>
            </div>
          ))}
        </div>

        {/* Final Answer Banner */}
        <div
          className="p-3.5 rounded-xl border flex items-center justify-between mt-3"
          style={{
            backgroundColor: 'var(--reading-highlight-bg)',
            borderColor: 'var(--reading-highlight-border)',
          }}
        >
          <div>
            <span
              className="text-xs font-extrabold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
              Final Correct Answer
            </span>
            <p
              className="text-xl font-black font-mono mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {current.final}
            </p>
          </div>

          <CheckCircle style={{ color: 'var(--accent-primary)' }} size={26} />
        </div>
      </ReadableCard>
    </div>
  );
};
