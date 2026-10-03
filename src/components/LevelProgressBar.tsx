'use client';

import React from 'react';
import { Award, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import { YearLevel } from '../types/math.ts';
import { mathTopics } from '../data/mathTopics.ts';
import { getAssessmentRecord } from '../utils/assessmentStorage.ts';

interface LevelProgressBarProps {
  selectedYear: YearLevel | 'All';
  onSelectYear: (year: YearLevel | 'All') => void;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  selectedYear,
}) => {
  const topicsForLevel = mathTopics.filter((t) => {
    if (selectedYear === 'All') return true;
    return t.yearLevel === selectedYear;
  });

  const completedCount = topicsForLevel.filter((t) => {
    const rec = getAssessmentRecord(t.id);
    return rec.completedAt && (rec.score || 0) > 0;
  }).length;

  const totalCount = topicsForLevel.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const yearLabel = selectedYear === 'All'
    ? 'All Levels'
    : selectedYear.replace(' (Age 9-10)', '').replace(' (Age 10-11)', '').replace(' (Age 12+)', '').replace(' (Age 11-12)', '');

  return (
    <div
      className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-1.5"
    >
      <div
        className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl border text-xs shadow-2xs"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 font-bold shrink-0">
            <Trophy size={14} className="text-amber-600" />
            <span style={{ color: 'var(--text-primary)' }}>{yearLabel} Progress:</span>
          </div>

          <div className="w-24 sm:w-36 h-2 rounded-full bg-amber-200/50 overflow-hidden relative shrink-0">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(5, percentage)}%`,
                backgroundColor: 'var(--accent-primary)',
              }}
            />
          </div>

          <span className="font-extrabold text-[11px] tabular-nums" style={{ color: 'var(--accent-primary)' }}>
            {completedCount}/{totalCount} Mastered ({percentage}%)
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          {percentage === 100 ? (
            <span className="kid-badge-mint px-2 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1">
              <Sparkles size={11} /> Level Mastered!
            </span>
          ) : (
            <span className="kid-badge-yellow px-2 py-0.5 rounded-full text-[10px] font-extrabold border">
              Keep Going! ⭐
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
