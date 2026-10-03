'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Award, ChevronRight } from 'lucide-react';
import { mathTopics } from '../data/mathTopics';
import { allAssessments } from '../data/assessments';
import { NavModeType } from './Header';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string, mode?: NavModeType) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingTopics = mathTopics.filter((t) => {
    if (!cleanQuery) return true;
    return (
      t.title.toLowerCase().includes(cleanQuery) ||
      t.category.toLowerCase().includes(cleanQuery) ||
      t.yearLevel.toLowerCase().includes(cleanQuery) ||
      t.summary.toLowerCase().includes(cleanQuery) ||
      t.sections.some((s) => s.title.toLowerCase().includes(cleanQuery) || s.content.toLowerCase().includes(cleanQuery))
    );
  });

  const matchingAssessments = allAssessments.filter((a) => {
    if (!cleanQuery) return true;
    return (
      a.topicTitle.toLowerCase().includes(cleanQuery) ||
      a.topicId.toLowerCase().includes(cleanQuery) ||
      a.yearLevel.toLowerCase().includes(cleanQuery) ||
      a.summary.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-card-strong)',
          color: 'var(--text-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <Search size={20} style={{ color: 'var(--accent-primary)' }} className="shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, formulas, videos, SATs quizzes (e.g. fractions, BODMAS, angles)..."
            className="flex-1 bg-transparent border-0 outline-none text-sm sm:text-base font-medium placeholder:opacity-50"
            style={{ color: 'var(--text-primary)' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:opacity-75 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <kbd
            className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-wider opacity-60"
            style={{ borderColor: 'var(--border-card-strong)' }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 custom-scrollbar flex-1">
          {/* Topics & Lessons */}
          <div>
            <div className="flex items-center justify-between px-2 pb-1.5">
              <span
                className="text-[11px] font-extrabold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Lessons & Interactive Theory ({matchingTopics.length})
              </span>
            </div>

            <div className="space-y-1">
              {matchingTopics.slice(0, 6).map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    onSelectTopic(topic.id, 'learn');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all hover:opacity-90 border tactile-btn cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border font-bold"
                      style={{
                        backgroundColor: 'var(--badge-bg)',
                        borderColor: 'var(--border-card)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <BookOpen size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-sm block truncate">{topic.title}</span>
                      <span className="text-[11px] opacity-75 block truncate" style={{ color: 'var(--text-muted)' }}>
                        {topic.yearLevel} • {topic.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border hidden sm:inline"
                      style={{
                        backgroundColor: 'var(--badge-bg)',
                        color: 'var(--badge-text)',
                        borderColor: 'var(--badge-border)',
                      }}
                    >
                      {topic.yearLevel.split(' ')[0]}
                    </span>
                    <ChevronRight size={16} className="opacity-50" />
                  </div>
                </button>
              ))}
              {matchingTopics.length === 0 && (
                <p className="text-xs p-3 text-center opacity-60" style={{ color: 'var(--text-muted)' }}>
                  No lessons match &quot;{query}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Practice SATs Papers */}
          <div>
            <div className="flex items-center justify-between px-2 pb-1.5">
              <span
                className="text-[11px] font-extrabold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                SATs & Practice Papers ({matchingAssessments.length})
              </span>
            </div>

            <div className="space-y-1">
              {matchingAssessments.slice(0, 4).map((assessment) => (
                <button
                  key={assessment.topicId}
                  type="button"
                  onClick={() => {
                    onSelectTopic(assessment.topicId, 'assessment');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all hover:opacity-90 border tactile-btn cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: 'var(--reading-highlight-bg)',
                        borderColor: 'var(--reading-highlight-border)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <Award size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-sm block truncate">{assessment.topicTitle}</span>
                      <span className="text-[11px] opacity-75 block truncate" style={{ color: 'var(--text-muted)' }}>
                        {assessment.questions.length} questions • {assessment.yearLevel}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={16} className="opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          className="p-3 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            borderColor: 'var(--border-card)',
            color: 'var(--text-muted)',
          }}
        >
          <span>Press ESC or click outside to dismiss</span>
          <span className="font-semibold">{mathTopics.length} UK Curriculum Topics Loaded</span>
        </div>
      </div>
    </div>
  );
};
