'use client';

import React, { useState } from 'react';
import { X, Search, Award } from 'lucide-react';
import { mathTopics } from '../data/mathTopics';
import { MathView } from './MathView';
import { ReadableCard } from './ReadableCard';
import { AudioButton } from './AudioButton';

interface QuickFormulaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const QuickFormulaDrawer: React.FC<QuickFormulaDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  // Aggregate all formulas across topics
  const allFormulas = mathTopics.flatMap((t) =>
    t.keyFormulas.map((f) => ({
      ...f,
      topicId: t.id,
      topicTitle: t.title,
      yearLevel: t.yearLevel,
    }))
  );

  const filtered = allFormulas.filter(
    (f) =>
      f.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.topicTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-xl h-full shadow-2xl flex flex-col border-l transition-colors"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-card-strong)',
          color: 'var(--text-primary)',
        }}
      >
        {/* Header */}
        <div
          className="p-4 sm:p-5 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div className="flex items-center gap-2">
            <Award style={{ color: 'var(--accent-primary)' }} size={22} />
            <div>
              <h2 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                Primary 5+ Rules & Formula Vault
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Click anywhere on any card to listen aloud
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg cursor-pointer"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-card-subtle)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div
          className="p-3.5 border-b"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search formula names or equations..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-2 border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Formula Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              No formulas matched your search.
            </div>
          ) : (
            filtered.map((f) => {
              const formulaSpeechText = `Formula: ${f.name} from topic ${f.topicTitle}. Equation: ${f.formula}. Description: ${f.description}. ${f.keyNote ? `Tip: ${f.keyNote}` : ''}`;
              return (
                <ReadableCard
                  key={`${f.topicId}-${f.id}`}
                  id={`vault-${f.id}`}
                  textToRead={formulaSpeechText}
                  label={`Formula: ${f.name}`}
                  className="p-4 rounded-xl border space-y-2 shadow-2xs"
                  highlightStyle="inner"
                  ariaLabel={`Formula: ${f.name}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border"
                          style={{
                            backgroundColor: 'var(--bg-card-subtle)',
                            borderColor: 'var(--border-card)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {f.yearLevel.replace(' (Age 9-10)', '').replace(' (Age 10-11)', '').replace(' (Age 11-12)', '').replace(' (Age 12+)', '')}
                        </span>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {f.topicTitle}
                        </span>
                      </div>
                      <h4 className="font-bold text-base mt-1" style={{ color: 'var(--text-primary)' }}>
                        {f.name}
                      </h4>
                    </div>

                    <AudioButton
                      id={`vault-${f.id}`}
                      textToRead={formulaSpeechText}
                      label={`Formula: ${f.name}`}
                      title="Listen to formula"
                      size="sm"
                    />
                  </div>

                <div
                  className="p-2.5 rounded-xl border text-center my-1.5"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <MathView math={f.formula} block={true} className="font-bold" />
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.description}
                </p>

                {f.keyNote && (
                  <p
                    className="text-xs sm:text-sm p-2.5 rounded-lg border leading-relaxed"
                    style={{
                      backgroundColor: 'var(--bg-card-hover)',
                      borderColor: 'var(--border-card-strong)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    💡 {f.keyNote}
                  </p>
                )}

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopic(f.topicId);
                      onClose();
                    }}
                    className="text-xs font-bold cursor-pointer hover:underline"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Open Topic Guide →
                  </button>
                </div>
              </ReadableCard>
            );
          })
        )}
        </div>
      </div>
    </div>
  );
};
