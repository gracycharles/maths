'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  GraduationCap,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Layers,
  LayoutGrid,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Video,
  Play,
} from 'lucide-react';
import { MathTopic } from '../types/math';
import { MathView } from './MathView';
import { ReadableCard } from './ReadableCard';
import { AudioButton } from './AudioButton';
import { FractionsVisualizer } from './tools/FractionsVisualizer';
import { BidmasEvaluator } from './tools/BidmasEvaluator';
import { AnglesExplorer } from './tools/AnglesExplorer';
import { AreaPerimeterSandbox } from './tools/AreaPerimeterSandbox';
import { RomanNumeralsConverter } from './tools/RomanNumeralsConverter';
import { PlaceValueSandbox } from './tools/PlaceValueSandbox';
import { DecimalsPercentagesConverter } from './tools/DecimalsPercentagesConverter';
import { FactorsMultiplesLaboratory } from './tools/FactorsMultiplesLaboratory';
import { AveragesDataStudio } from './tools/AveragesDataStudio';
import { CoordinatesTransformStudio } from './tools/CoordinatesTransformStudio';
import { AssessmentView } from './AssessmentView';
import { getAssessmentForTopic } from '../data/assessments/index';
import { VideoTutoringClip } from './video/VideoTutoringClip';
import { hasVideoLesson, getVideoLessonForTopic } from '../data/videoLessons/index';
import { ConceptExplainerCard } from './ConceptExplainerCard';
import { soundEffects } from '../utils/soundEffects';
import { triggerCelebrationConfetti, getAppreciationMessage, AppreciationMessage } from '../utils/celebrationEffects';

interface TopicDetailProps {
  topic: MathTopic;
  onSelectTopic?: (topicId: string, sectionId?: string) => void;
  targetSectionId?: string | null;
  onClearTargetSection?: () => void;
  initialTab?: TabType;
}

type TabType = 'theory' | 'video' | 'tips' | 'formulas' | 'practice' | 'tools' | 'assessment';

export const TopicDetail: React.FC<TopicDetailProps> = ({
  topic,
  onSelectTopic,
  targetSectionId,
  onClearTargetSection,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'theory');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'paginated' | 'all'>('paginated');
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);

  const [selectedExampleLevel, setSelectedExampleLevel] = useState<string>('All');
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    [topic.sections[0]?.workedExamples?.[0]?.id || '']: true,
  });

  const topicAssessment = getAssessmentForTopic(topic.id);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, topic.id]);

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [practiceAppreciations, setPracticeAppreciations] = useState<Record<string, AppreciationMessage>>({});

  // Handle targetSectionId changes (e.g. from "Refer to..." deep links)
  useEffect(() => {
    if (targetSectionId) {
      const foundIdx = topic.sections.findIndex((s) => s.id === targetSectionId);
      if (foundIdx !== -1) {
        setActiveSectionIndex(foundIdx);
        setActiveTab('theory');
        setHighlightedSectionId(targetSectionId);

        // Allow DOM to update before smooth scrolling
        const scrollTimer = setTimeout(() => {
          const el =
            document.getElementById(`sec-container-${targetSectionId}`) ||
            document.getElementById(targetSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);

        const clearHighlightTimer = setTimeout(() => {
          setHighlightedSectionId(null);
          if (onClearTargetSection) onClearTargetSection();
        }, 3000);

        return () => {
          clearTimeout(scrollTimer);
          clearTimeout(clearHighlightTimer);
        };
      }
    } else {
      // Default to first section when switching topics without targetSectionId
      setActiveSectionIndex(0);
    }
  }, [targetSectionId, topic.id]);

  const handleTabChange = (newTab: TabType) => {
    soundEffects.playTabSound();
    setActiveTab(newTab);
  };

  const toggleExample = (id: string) => {
    soundEffects.playClickSound();
    setExpandedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (qId: string, optIndex: number, correctIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
    if (optIndex === correctIndex) {
      const qNum = Object.keys(userAnswers).length + 1;
      const praise = getAppreciationMessage(qNum, 1, 'medium');
      setPracticeAppreciations((prev) => ({ ...prev, [qId]: praise }));
      soundEffects.playCorrectSound();
      triggerCelebrationConfetti(false);
    } else {
      soundEffects.playWrongSound();
    }
  };

  const handleJumpToSection = (idx: number, secId: string) => {
    setActiveSectionIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const el =
        document.getElementById('sub-sections-anchor') ||
        document.getElementById(`topic-header-${topic.id}`) ||
        document.querySelector('main');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  const currentSections =
    viewMode === 'paginated'
      ? [topic.sections[activeSectionIndex] || topic.sections[0]]
      : topic.sections;

  const topicVideoLesson = hasVideoLesson(topic.id) ? getVideoLessonForTopic(topic.id) : null;

  return (
    <div className="space-y-6">
      {/* Topic Header Card - Standalone container with isolated audio button */}
      <div
        id={`topic-header-${topic.id}`}
        className="rounded-2xl border p-5 sm:p-7 relative overflow-hidden shadow-sm space-y-4 tactile-card vibrant-card-banner"
      >
        <div className="space-y-3">
          {/* Top Row: Unboxed editorial metadata & Audio indicator */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold flex-wrap" style={{ color: 'var(--text-muted)' }}>
              <span className="font-extrabold" style={{ color: 'var(--accent-primary)' }}>
                {topic.yearLevel}
              </span>
              <span aria-hidden="true">·</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {topic.difficulty} Tier
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock size={13} /> {topic.readTimeMinutes} min study
              </span>
            </div>

            <AudioButton
              id={`topic-header-${topic.id}`}
              textToRead={`${topic.title}. For ${topic.yearLevel}. ${topic.summary}`}
              label={`${topic.title} Overview`}
              title="Listen to topic overview"
              size="md"
              className="shrink-0"
            />
          </div>

          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words text-balance"
            style={{ color: 'var(--text-primary)' }}
          >
            {topic.title}
          </h1>

          <p
            className="text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {topic.summary}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <button
            type="button"
            onClick={() => handleTabChange('theory')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs tactile-btn"
            style={{
              backgroundColor: activeTab === 'theory' ? '#0d9488' : '#f0fdf4',
              borderColor: activeTab === 'theory' ? '#0f766e' : '#99f6e4',
              color: activeTab === 'theory' ? '#ffffff' : '#0f766e',
            }}
          >
            <BookOpen size={16} />
            <span>Concepts</span>
          </button>

          {topicVideoLesson && (
            <button
              type="button"
              id="tab-topic-video-btn"
              onClick={() => handleTabChange('video')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs relative tactile-btn"
              style={{
                backgroundColor: activeTab === 'video' ? '#e11d48' : '#fff1f2',
                borderColor: activeTab === 'video' ? '#be123c' : '#fecdd3',
                color: activeTab === 'video' ? '#ffffff' : '#be123c',
              }}
              title="Video Lesson"
            >
              <Video size={16} />
              <span>Video Lesson</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleTabChange('tips')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs tactile-btn"
            style={{
              backgroundColor: activeTab === 'tips' ? '#4f46e5' : '#eef2ff',
              borderColor: activeTab === 'tips' ? '#3730a3' : '#c7d2fe',
              color: activeTab === 'tips' ? '#ffffff' : '#3730a3',
            }}
          >
            <Sparkles size={16} />
            <span>Tips & Tricks</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('formulas')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs tactile-btn"
            style={{
              backgroundColor: activeTab === 'formulas' ? '#d97706' : '#fffbeb',
              borderColor: activeTab === 'formulas' ? '#b45309' : '#fde68a',
              color: activeTab === 'formulas' ? '#ffffff' : '#b45309',
            }}
          >
            <Award size={16} />
            <span>Formulas</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('practice')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs tactile-btn"
            style={{
              backgroundColor: activeTab === 'practice' ? '#059669' : '#ecfdf5',
              borderColor: activeTab === 'practice' ? '#047857' : '#a7f3d0',
              color: activeTab === 'practice' ? '#ffffff' : '#047857',
            }}
          >
            <GraduationCap size={16} />
            <span>Practice</span>
          </button>

          {topic.toolType && (
            <button
              type="button"
              onClick={() => handleTabChange('tools')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs tactile-btn"
              style={{
                backgroundColor: activeTab === 'tools' ? '#0284c7' : '#f0f9ff',
                borderColor: activeTab === 'tools' ? '#0369a1' : '#bae6fd',
                color: activeTab === 'tools' ? '#ffffff' : '#0369a1',
              }}
            >
              <Cpu size={16} />
              <span>Tools</span>
            </button>
          )}

          {topicAssessment && (
            <button
              type="button"
              id="tab-topic-assessment-btn"
              onClick={() => handleTabChange('assessment')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs relative tactile-btn"
              style={{
                backgroundColor: activeTab === 'assessment' ? '#7c3aed' : '#faf5ff',
                borderColor: activeTab === 'assessment' ? '#6d28d9' : '#e9d5ff',
                color: activeTab === 'assessment' ? '#ffffff' : '#6d28d9',
              }}
            >
              <Award size={16} />
              <span>Assessment</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab: Video Tutoring Lesson Masterclass */}
      {activeTab === 'video' && topicVideoLesson && (
        <div id="video-lesson-anchor" className="space-y-6">
          <VideoTutoringClip
            topicId={topic.id}
            customLesson={topicVideoLesson}
            onGoToAssessment={() => setActiveTab('assessment')}
            onGoToTheory={() => setActiveTab('theory')}
          />
        </div>
      )}

      {/* Tab 1: Concepts & Worked Examples */}
      {activeTab === 'theory' && (
        <div id="sub-sections-anchor" className="space-y-6">
          {/* Interactive Human Concept Explainer for Primes, Squares, Cubes & Factors */}
          {topic.id === 'multiplication-division-factors' && (
            <ConceptExplainerCard initialConcept="prime" />
          )}
          {/* Sub-section Navigation & Page Controls Banner */}
          {topic.sections.length > 1 && (
            <div
              className="rounded-2xl border p-4 sm:p-5 space-y-4 shadow-2xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              {/* Header: Status & View Mode Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="flex items-center justify-center p-1.5 rounded-lg border text-xs font-black shrink-0"
                    style={{
                      backgroundColor: 'var(--badge-bg)',
                      borderColor: 'var(--border-card-strong)',
                      color: 'var(--badge-text)',
                    }}
                  >
                    <Layers size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>
                        {viewMode === 'paginated'
                          ? `Section ${activeSectionIndex + 1} of ${topic.sections.length}`
                          : `All ${topic.sections.length} Sections`}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>
                      {topic.sections[activeSectionIndex]?.title}
                    </p>
                  </div>
                </div>

                {/* View Mode Switcher (Step-by-step page vs All) */}
                <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0 p-1 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-card)' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('paginated')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    style={{
                      backgroundColor: viewMode === 'paginated' ? 'var(--accent-primary)' : 'transparent',
                      color: viewMode === 'paginated' ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                    }}
                    title="View 1 sub-section at a time for easy step-by-step learning"
                  >
                    <LayoutGrid size={13} />
                    <span>Page View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    style={{
                      backgroundColor: viewMode === 'all' ? 'var(--accent-primary)' : 'transparent',
                      color: viewMode === 'all' ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                    }}
                    title="View all sub-sections in one long scrolling page"
                  >
                    <Layers size={13} />
                    <span>View All</span>
                  </button>
                </div>
              </div>

              {/* Sub-section Navigation Jump Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider mr-1 shrink-0" style={{ color: 'var(--text-muted)' }}>
                  Sections:
                </span>
                {topic.sections.map((sec, sIdx) => {
                  const isActive = viewMode === 'paginated' ? activeSectionIndex === sIdx : false;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleJumpToSection(sIdx, sec.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-2xs hover:scale-[1.02] active:scale-95"
                      style={{
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                        borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-card)',
                        color: isActive ? 'var(--accent-contrast)' : 'var(--text-primary)',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0"
                        style={{
                          backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--badge-bg)',
                          color: isActive ? 'var(--accent-contrast)' : 'var(--badge-text)',
                        }}
                      >
                        {sIdx + 1}
                      </span>
                      <span className="truncate max-w-[180px] sm:max-w-[260px]">{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sections List (Paginated or All) */}
          {currentSections.map((sec, loopIdx) => {
            const actualIdx = viewMode === 'paginated' ? activeSectionIndex : loopIdx;
            const isHighlighted = highlightedSectionId === sec.id;

            return (
              <section
                key={sec.id}
                id={`sec-container-${sec.id}`}
                className={`rounded-2xl border p-5 sm:p-7 space-y-6 shadow-xs transition-all duration-300 ${
                  isHighlighted ? 'ring-4 ring-offset-2 scale-[1.005]' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isHighlighted ? 'var(--accent-primary)' : 'var(--border-card)',
                }}
              >
                {/* Section Header Banner in Page View */}
                {viewMode === 'paginated' && topic.sections.length > 1 && (
                  <div
                    className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--bg-card-subtle)',
                      borderColor: 'var(--border-card)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>Sub-Section {actualIdx + 1} of {topic.sections.length}</span>
                    <span style={{ color: 'var(--accent-primary)' }}>{topic.title}</span>
                  </div>
                )}

                {/* Separate Subsection A: Core Concept & Explanation */}
                <ReadableCard
                  id={`sec-concept-${sec.id}`}
                  textToRead={`Section ${actualIdx + 1}: ${sec.title}. ${sec.content}`}
                  label={`Section ${actualIdx + 1}: ${sec.title}`}
                  highlightStyle="inner"
                  className="p-5 sm:p-6 rounded-xl border space-y-3"
                  ariaLabel={`Concept Explanation: ${sec.title}`}
                >
                  <div
                    className="flex items-start justify-between gap-3 pb-3 border-b"
                    style={{ borderColor: 'var(--border-card)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--accent-contrast)',
                        }}
                      >
                        {actualIdx + 1}
                      </span>
                      <h2
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {sec.title}
                      </h2>
                    </div>

                    <AudioButton
                      id={`sec-concept-${sec.id}`}
                      textToRead={`Section ${actualIdx + 1}: ${sec.title}. ${sec.content}`}
                      label={`Section ${actualIdx + 1}: ${sec.title}`}
                      title="Listen to concept explanation"
                      size="sm"
                    />
                  </div>

                  <p
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {sec.content}
                  </p>
                </ReadableCard>

              {/* Prerequisite & Term Indicators (e.g. "Wait, what is LCM?") */}
              {sec.prerequisites && sec.prerequisites.length > 0 && (
                <div className="space-y-3">
                  {sec.prerequisites.map((prereq, pIdx) => (
                    <ReadableCard
                      key={pIdx}
                      id={`sec-prereq-${sec.id}-${pIdx}`}
                      textToRead={`Concept Refresher: What is ${prereq.term}? ${prereq.quickDefinition}. ${
                        prereq.targetTopicTitle
                          ? `You can refer to the topic ${prereq.targetTopicTitle} to study this in depth.`
                          : ''
                      }`}
                      label={`Refresher: ${prereq.term}`}
                      highlightStyle="inner"
                      className="p-3.5 sm:p-4 rounded-xl border-2 space-y-2.5 shadow-2xs transition-all"
                      ariaLabel={`Prerequisite Guide for ${prereq.term}`}
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--contrast-amber-border)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 shadow-2xs"
                            style={{
                              backgroundColor: 'var(--accent-primary)',
                              color: 'var(--accent-contrast)',
                            }}
                          >
                            ?
                          </span>
                          <span
                            className="text-xs sm:text-sm font-black tracking-tight"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Wait, what is{' '}
                            <span
                              className="px-2.5 py-0.5 rounded-md font-black tracking-wide inline-block shadow-2xs border"
                              style={{
                                backgroundColor: 'var(--badge-bg)',
                                color: 'var(--badge-text)',
                                borderColor: 'var(--border-card-strong)',
                              }}
                            >
                              {prereq.term}
                            </span>
                            ?
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0">
                          {prereq.targetTopicId && onSelectTopic && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectTopic(prereq.targetTopicId!, prereq.targetSectionId);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer hover:scale-105 border shadow-2xs active:scale-95"
                              style={{
                                backgroundColor: 'var(--accent-primary)',
                                borderColor: 'var(--border-card-strong)',
                                color: 'var(--accent-contrast)',
                              }}
                              title={`Refer to ${
                                prereq.targetSectionTitle
                                  ? `${prereq.targetTopicTitle} → ${prereq.targetSectionTitle}`
                                  : prereq.targetTopicTitle || 'Section'
                              }`}
                            >
                              <span>
                                Refer to {prereq.targetSectionTitle || prereq.targetTopicTitle || 'Section'}
                              </span>
                              <ChevronRight size={13} />
                            </button>
                          )}

                          <AudioButton
                            id={`sec-prereq-${sec.id}-${pIdx}`}
                            textToRead={`What is ${prereq.term}? ${prereq.quickDefinition}. ${
                              prereq.targetTopicTitle ? `Refer to topic: ${prereq.targetTopicTitle}.` : ''
                            }`}
                            label={`Refresher: ${prereq.term}`}
                            title={`Listen to explanation of ${prereq.term}`}
                            size="sm"
                          />
                        </div>
                      </div>

                      <div
                        className="p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm leading-relaxed"
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          borderColor: 'var(--border-card)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <span className="font-extrabold mr-1" style={{ color: 'var(--contrast-amber)' }}>
                          Quick Guide:
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{prereq.quickDefinition}</span>
                      </div>
                    </ReadableCard>
                  ))}
                </div>
              )}

              {/* Separate Subsection B: Creative Mental Model / Visual Metaphor */}
              {sec.visualMetaphor && (
                <ReadableCard
                  id={`sec-metaphor-${sec.id}`}
                  textToRead={`Creative Mental Picture for ${sec.title}: ${sec.visualMetaphor}`}
                  label={`Mental Picture: ${sec.title}`}
                  highlightStyle="inner"
                  className="p-4 sm:p-5 rounded-xl border space-y-2 shadow-2xs"
                  ariaLabel="Creative Mental Picture"
                  style={{
                    backgroundColor: 'var(--contrast-indigo-bg)',
                    borderColor: 'var(--contrast-indigo-border)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="shrink-0" style={{ color: 'var(--contrast-indigo)' }} />
                      <span
                        className="font-extrabold uppercase tracking-wider text-xs"
                        style={{ color: 'var(--contrast-indigo)' }}
                      >
                        Creative Mental Picture (How Kids Understand Best)
                      </span>
                    </div>

                    <AudioButton
                      id={`sec-metaphor-${sec.id}`}
                      textToRead={`Creative Mental Picture for ${sec.title}: ${sec.visualMetaphor}`}
                      label={`Mental Picture: ${sec.title}`}
                      title="Listen to mental picture"
                      size="sm"
                    />
                  </div>

                  <p className="mt-1 leading-relaxed font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                    {sec.visualMetaphor}
                  </p>
                </ReadableCard>
              )}

              {/* Separate Subsection C: Math expressions callout if any */}
              {sec.mathExpressions && sec.mathExpressions.length > 0 && (
                <div
                  className="border rounded-xl p-4 sm:p-5 space-y-3"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs uppercase font-extrabold tracking-wider block"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Mathematical Formulation:
                    </span>
                    <AudioButton
                      id={`sec-math-${sec.id}`}
                      textToRead={`Mathematical formulations for ${sec.title}: ${sec.mathExpressions.join('. ')}`}
                      label={`Math Formulation: ${sec.title}`}
                      title="Listen to mathematical formulations"
                      size="sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    {sec.mathExpressions.map((expr, i) => (
                      <MathView key={i} math={expr} block={true} className="font-bold" />
                    ))}
                  </div>
                </div>
              )}

              {/* Separate Subsection D: Key Takeaways / Essential Rules */}
              {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                <ReadableCard
                  id={`sec-rules-${sec.id}`}
                  textToRead={`Essential Key Rules for ${sec.title}: ${sec.keyTakeaways.join('. ')}`}
                  label={`Key Rules: ${sec.title}`}
                  highlightStyle="inner"
                  className="p-4 sm:p-5 rounded-xl border space-y-2.5 shadow-2xs"
                  ariaLabel="Essential Key Rules"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <Lightbulb size={17} />
                      <span>Essential Key Rules</span>
                    </div>

                    <AudioButton
                      id={`sec-rules-${sec.id}`}
                      textToRead={`Essential Key Rules for ${sec.title}: ${sec.keyTakeaways.join('. ')}`}
                      label={`Key Rules: ${sec.title}`}
                      title="Listen to key rules"
                      size="sm"
                    />
                  </div>

                  <ul className="space-y-2 text-sm sm:text-base leading-relaxed">
                    {sec.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-primary)' }} className="font-bold text-base">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </ReadableCard>
              )}

              {/* Separate Subsection E: Progressive Worked Examples */}
              {sec.workedExamples && sec.workedExamples.length > 0 && (
                <div
                  className="mt-6 pt-5 border-t space-y-4"
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  {/* Worked Examples Level Filter Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
                    <span
                      className="text-xs uppercase font-extrabold tracking-wider shrink-0"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Worked Examples
                    </span>

                    {/* Level selector pills */}
                    <div className="flex flex-wrap items-center gap-1">
                      {[
                        { id: 'All', label: 'All' },
                        { id: 'Level 1', label: 'Easy' },
                        { id: 'Level 2', label: 'Medium' },
                        { id: 'Level 3', label: 'Multi-Step' },
                        { id: 'Level 4', label: 'Real-World' },
                        { id: 'Level 5', label: 'Hard' },
                      ].map((lvl) => {
                        const isSelected = selectedExampleLevel === lvl.id;
                        return (
                          <button
                            key={lvl.id}
                            type="button"
                            onClick={() => {
                              setSelectedExampleLevel(lvl.id);
                              // Auto-expand matching examples
                              const matching = sec.workedExamples.filter(
                                (e) => lvl.id === 'All' || (e.level && e.level.includes(lvl.id))
                              );
                              const newExpanded = { ...expandedExamples };
                              matching.forEach((m) => {
                                newExpanded[m.id] = true;
                              });
                              setExpandedExamples(newExpanded);
                            }}
                            className="px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border shrink-0"
                            style={{
                              backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                              borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-card)',
                              color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                            }}
                          >
                            {lvl.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {sec.workedExamples
                    .filter((ex) => {
                      if (selectedExampleLevel === 'All') return true;
                      return ex.level ? ex.level.includes(selectedExampleLevel) : true;
                    })
                    .map((ex) => {
                    const isExpanded = expandedExamples[ex.id] ?? true;
                    const levelLabel =
                      ex.level ||
                      (ex.title.toLowerCase().includes('starter') || ex.title.toLowerCase().includes('easy')
                        ? 'Level 1: Easy'
                        : ex.title.toLowerCase().includes('challenge') || ex.title.toLowerCase().includes('hard')
                        ? 'Level 3: Hard'
                        : 'Level 2: Medium');

                    const getLevelBadgeStyles = () => {
                      if (levelLabel.includes('Easy') || levelLabel.includes('Level 1')) {
                        return {
                          backgroundColor: 'var(--contrast-teal-bg)',
                          color: 'var(--contrast-teal)',
                          borderColor: 'var(--border-card-strong)',
                        };
                      }
                      if (levelLabel.includes('Hard') || levelLabel.includes('Level 3') || levelLabel.includes('Mastery')) {
                        return {
                          backgroundColor: 'var(--contrast-warm-bg)',
                          color: 'var(--contrast-warm)',
                          borderColor: 'var(--contrast-warm-border)',
                        };
                      }
                      return {
                        backgroundColor: 'var(--contrast-amber-bg)',
                        color: 'var(--contrast-amber)',
                        borderColor: 'var(--contrast-amber-border)',
                      };
                    };

                    const mathProblemText = ex.mathProblem ? ` Formula: ${ex.mathProblem}.` : '';
                    const stepsText = ex.steps
                      .map((s) => `Step ${s.stepNumber}, ${s.title}: ${s.explanation}.${s.math ? ` Math: ${s.math}.` : ''}`)
                      .join(' ');
                    const exampleSpeechText = `Worked Example ${levelLabel}: ${ex.title}. Problem: ${ex.problem}.${mathProblemText} Solution: ${stepsText} Final answer: ${ex.finalAnswer}.${ex.proTip ? ` Pro tip: ${ex.proTip}` : ''}`;

                    return (
                      <ReadableCard
                        key={ex.id}
                        id={`example-${ex.id}`}
                        textToRead={exampleSpeechText}
                        label={`Example: ${ex.title}`}
                        highlightStyle="inner"
                        enableClickToRead={false}
                        className="rounded-xl border overflow-hidden p-0 shadow-2xs"
                        ariaLabel={`Worked Example: ${ex.title}`}
                      >
                        <div
                          onClick={() => toggleExample(ex.id)}
                          className="flex items-center justify-between p-3.5 sm:p-4 transition-colors cursor-pointer border-b gap-3"
                          style={{
                            backgroundColor: 'var(--bg-card-hover)',
                            borderColor: 'var(--border-card)',
                          }}
                        >
                          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0 pr-1">
                            <span
                              className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md border shrink-0"
                              style={getLevelBadgeStyles()}
                            >
                              {levelLabel}
                            </span>
                            <span
                              className="font-bold text-sm sm:text-base break-words"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {ex.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <AudioButton
                              id={`example-${ex.id}`}
                              textToRead={exampleSpeechText}
                              label={`Example: ${ex.title}`}
                              title="Listen to full worked example"
                              size="sm"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExample(ex.id);
                              }}
                              className="p-1 rounded cursor-pointer shrink-0"
                              style={{ color: 'var(--text-muted)' }}
                              aria-label={isExpanded ? 'Collapse example' : 'Expand example'}
                            >
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 sm:p-5 space-y-4">
                            <div
                              className="p-3.5 sm:p-4 border rounded-xl text-base sm:text-lg font-semibold leading-relaxed relative flex items-start justify-between gap-3"
                              style={{
                                backgroundColor: 'var(--bg-card-subtle)',
                                borderColor: 'var(--border-card-strong)',
                                color: 'var(--text-primary)',
                              }}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span
                                    className="px-2 py-0.5 rounded text-xs font-black uppercase tracking-wider"
                                    style={{
                                      backgroundColor: 'var(--badge-bg)',
                                      color: 'var(--badge-text)',
                                    }}
                                  >
                                    Question
                                  </span>
                                </div>
                                <span className="leading-relaxed">{ex.problem}</span>
                                {ex.mathProblem && (
                                  <div className="mt-2">
                                    <MathView math={ex.mathProblem} block={true} />
                                  </div>
                                )}
                              </div>
                              <AudioButton
                                id={`question-${ex.id}`}
                                textToRead={`Question for ${ex.title}: ${ex.problem}.${ex.mathProblem ? ` Formula: ${ex.mathProblem}` : ''}`}
                                label={`Question: ${ex.title}`}
                                title="Listen to question"
                                size="sm"
                                className="shrink-0 mt-0.5"
                              />
                            </div>

                            {/* Steps with individual Step Audio buttons */}
                            <div className="space-y-3">
                              {ex.steps.map((step) => {
                                const stepAudioText = `Step ${step.stepNumber}, ${step.title}: ${step.explanation}.${step.math ? ` Math: ${step.math}` : ''}`;
                                return (
                                  <div
                                    key={step.stepNumber}
                                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border transition-all"
                                    style={{
                                      backgroundColor: 'var(--bg-card-hover)',
                                      borderColor: 'var(--border-card)',
                                    }}
                                  >
                                    <span
                                      className="flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-bold shrink-0 mt-0.5"
                                      style={{
                                        backgroundColor: 'var(--accent-primary)',
                                        color: 'var(--accent-contrast)',
                                      }}
                                    >
                                      {step.stepNumber}
                                    </span>
                                    <div className="space-y-1.5 text-sm sm:text-base flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <strong
                                          className="font-extrabold block text-base sm:text-lg"
                                          style={{ color: 'var(--text-primary)' }}
                                        >
                                          {step.title}
                                        </strong>
                                        <AudioButton
                                          id={`step-${ex.id}-${step.stepNumber}`}
                                          textToRead={stepAudioText}
                                          label={`Step ${step.stepNumber}: ${step.title}`}
                                          title={`Listen to Step ${step.stepNumber}`}
                                          size="sm"
                                        />
                                      </div>
                                      <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {step.explanation}
                                      </p>
                                      {step.math && (
                                        <div className="mt-1.5">
                                          <MathView math={step.math} block={true} />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Final Answer */}
                            <div
                              className="p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base font-bold flex items-center justify-between gap-3"
                              style={{
                                backgroundColor: 'var(--reading-highlight-bg)',
                                borderColor: 'var(--reading-highlight-border)',
                                color: 'var(--text-primary)',
                              }}
                            >
                              <span className="font-extrabold flex items-center gap-2">
                                <CheckCircle2 size={19} className="shrink-0" style={{ color: 'var(--contrast-teal)' }} />
                                <span>Final Solution:</span>
                              </span>
                              <div className="flex items-center gap-2">
                                <span
                                  className="font-mono text-base sm:text-lg font-black px-3 py-1 rounded-lg border shadow-2xs tracking-wide"
                                  style={{
                                    backgroundColor: 'var(--bg-card-subtle)',
                                    borderColor: 'var(--border-card-strong)',
                                    color: 'var(--accent-primary)',
                                  }}
                                >
                                  {ex.finalAnswer}
                                </span>
                                <AudioButton
                                  id={`solution-${ex.id}`}
                                  textToRead={`Final solution for ${ex.title} is: ${ex.finalAnswer}`}
                                  label={`Solution: ${ex.title}`}
                                  title="Listen to final solution"
                                  size="sm"
                                />
                              </div>
                            </div>

                            {/* Pro Tip */}
                            {ex.proTip && (
                              <div
                                className="text-sm sm:text-base p-3 sm:p-3.5 rounded-xl border leading-relaxed flex items-start justify-between gap-3"
                                style={{
                                  backgroundColor: 'var(--bg-card-hover)',
                                  borderColor: 'var(--border-card-strong)',
                                  color: 'var(--text-primary)',
                                }}
                              >
                                <div className="flex-1">
                                  💡 <strong className="font-bold">Pro Tip:</strong> {ex.proTip}
                                </div>
                                <AudioButton
                                  id={`protip-${ex.id}`}
                                  textToRead={`Pro tip for ${ex.title}: ${ex.proTip}`}
                                  label="Pro Tip"
                                  title="Listen to pro tip"
                                  size="sm"
                                  className="shrink-0"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ReadableCard>
                    );
                  })}
                </div>
              )}

              {/* Sub-section Page-by-Page Bottom Navigation Footer */}
              {viewMode === 'paginated' && topic.sections.length > 1 && (
                <div
                  className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  {/* Previous Button */}
                  <button
                    type="button"
                    disabled={activeSectionIndex === 0}
                    onClick={() => handleJumpToSection(activeSectionIndex - 1, topic.sections[activeSectionIndex - 1].id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-card-subtle)',
                      borderColor: 'var(--border-card)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous: {topic.sections[activeSectionIndex - 1]?.title || 'Start'}</span>
                  </button>

                  {/* Step Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {topic.sections.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => handleJumpToSection(dotIdx, topic.sections[dotIdx].id)}
                        className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                        style={{
                          backgroundColor:
                            dotIdx === activeSectionIndex ? 'var(--accent-primary)' : 'var(--border-card)',
                          transform: dotIdx === activeSectionIndex ? 'scale(1.3)' : 'scale(1)',
                        }}
                        aria-label={`Jump to sub-section ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Button or Finish to Practice */}
                  {activeSectionIndex < topic.sections.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => handleJumpToSection(activeSectionIndex + 1, topic.sections[activeSectionIndex + 1].id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-2xs cursor-pointer hover:scale-[1.02] active:scale-95"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        borderColor: 'var(--border-card-strong)',
                        color: 'var(--accent-contrast)',
                      }}
                    >
                      <span>Next: {topic.sections[activeSectionIndex + 1]?.title}</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('practice');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-2xs cursor-pointer hover:scale-[1.02] active:scale-95"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        borderColor: 'var(--border-card-strong)',
                        color: 'var(--accent-contrast)',
                      }}
                    >
                      <span>Try Practice Questions ({topic.practiceQuestions.length})</span>
                      <GraduationCap size={16} />
                    </button>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    )}

      {/* Tab 2: Tips & Tricks */}
      {activeTab === 'tips' && (
        <div className="space-y-4">
          <div
            className="border rounded-xl p-3.5 flex items-center gap-2.5"
            style={{
              backgroundColor: 'var(--contrast-indigo-bg)',
              borderColor: 'var(--contrast-indigo-border)',
              color: 'var(--text-primary)',
            }}
          >
            <Sparkles className="shrink-0" size={18} style={{ color: 'var(--contrast-indigo)' }} />
            <h3 className="font-bold text-sm sm:text-base">
              Exam Tips & Shortcuts
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.tipsAndTricks.map((tip) => {
              const tipSpeechText = `${tip.title}. ${tip.badge}. ${tip.content}. ${tip.ruleSummary ? `Remember: ${tip.ruleSummary}` : ''}`;
              return (
                <ReadableCard
                  key={tip.id}
                  id={`tip-${tip.id}`}
                  textToRead={tipSpeechText}
                  label={`Tip: ${tip.title}`}
                  className="p-5 space-y-3 relative flex flex-col justify-between shadow-xs border"
                  ariaLabel={`Tip: ${tip.title}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: 'var(--contrast-amber-bg)',
                          borderColor: 'var(--contrast-amber-border)',
                          color: 'var(--contrast-amber)',
                        }}
                      >
                        {tip.badge}
                      </span>
                      <AudioButton
                        id={`tip-${tip.id}`}
                        textToRead={tipSpeechText}
                        label={`Tip: ${tip.title}`}
                        title="Listen to tip"
                        size="sm"
                      />
                    </div>

                    <h4
                      className="font-bold text-base sm:text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {tip.title}
                    </h4>

                    <p
                      className="text-sm sm:text-base mt-2 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {tip.content}
                    </p>

                    {tip.mathExample && (
                      <div className="mt-2.5">
                        <MathView math={tip.mathExample} block={true} />
                      </div>
                    )}
                  </div>

                  {tip.ruleSummary && (
                    <div
                      className="mt-3 pt-3 border-t text-sm font-semibold"
                      style={{
                        borderColor: 'var(--border-card)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      🔑 <strong>Remember:</strong> {tip.ruleSummary}
                    </div>
                  )}
                </ReadableCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Key Formulas & Important Info */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* Formulas list */}
          <div
            className="rounded-2xl border p-5 sm:p-7 space-y-4 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <h3
              className="font-bold text-lg sm:text-xl flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Award style={{ color: 'var(--accent-primary)' }} size={20} />
              <span>Must-Know Formulas & Definitions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.keyFormulas.map((f) => {
                const formulaSpeechText = `Formula: ${f.name}. Formula is: ${f.formula}. Description: ${f.description}. ${f.keyNote ? `Warning: ${f.keyNote}` : ''}`;
                return (
                  <ReadableCard
                    key={f.id}
                    id={`formula-${f.id}`}
                    textToRead={formulaSpeechText}
                    label={`Formula: ${f.name}`}
                    highlightStyle="inner"
                    className="p-4 space-y-2 flex flex-col justify-between shadow-xs border"
                    ariaLabel={`Formula: ${f.name}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {f.name}
                        </span>
                        <AudioButton
                          id={`formula-${f.id}`}
                          textToRead={formulaSpeechText}
                          label={`Formula: ${f.name}`}
                          title="Listen to formula"
                          size="sm"
                        />
                      </div>
                      <MathView math={f.formula} block={true} className="font-bold my-1" />
                      <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        {f.description}
                      </p>
                    </div>
                    {f.keyNote && (
                      <div
                        className="text-[11px] p-2 rounded border mt-2"
                        style={{
                          backgroundColor: 'var(--contrast-warm-bg)',
                          borderColor: 'var(--contrast-warm-border)',
                          color: 'var(--contrast-warm)',
                        }}
                      >
                        ⚠️ {f.keyNote}
                      </div>
                    )}
                  </ReadableCard>
                );
              })}
            </div>
          </div>

          {/* Important Info Cards */}
          {topic.importantInfo.length > 0 && (
            <div
              className="rounded-2xl border p-5 sm:p-7 space-y-4 shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              <h3
                className="font-bold text-lg flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <AlertTriangle style={{ color: 'var(--accent-primary)' }} size={20} />
                <span>Important Information & Exam Guidelines</span>
              </h3>

              <div className="space-y-3">
                {topic.importantInfo.map((info) => {
                  const infoSpeechText = `Important Note: ${info.title}. Priority ${info.priority}. ${info.content}`;
                  return (
                    <ReadableCard
                      key={info.id}
                      id={`important-info-${info.id}`}
                      textToRead={infoSpeechText}
                      label={`Note: ${info.title}`}
                      highlightStyle="inner"
                      className="p-4 rounded-xl border space-y-1.5 shadow-xs"
                      ariaLabel={`Note: ${info.title}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-extrabold uppercase tracking-wider"
                          style={{
                            color: (info.priority === 'HIGH' || info.priority === 'CRITICAL') ? 'var(--contrast-warm)' : 'var(--contrast-teal)',
                          }}
                        >
                          {info.priority}: {info.title}
                        </span>
                        <AudioButton
                          id={`important-info-${info.id}`}
                          textToRead={infoSpeechText}
                          label={`Note: ${info.title}`}
                          title="Listen to note"
                          size="sm"
                        />
                      </div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {info.content}
                      </p>
                      {info.math && <MathView math={info.math} block={true} />}
                    </ReadableCard>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Interactive Self-Check Practice */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div
            className="rounded-2xl border p-5 sm:p-7 space-y-6 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div
              className="flex items-center justify-between pb-3 border-b"
              style={{ borderColor: 'var(--border-card)' }}
            >
              <div>
                <h3
                  className="font-bold text-lg sm:text-xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Interactive Practice & Check Understanding
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  Test your understanding with instant feedback, hints, and step-by-step walkthroughs.
                </p>
              </div>

              {topicAssessment && (
                <button
                  type="button"
                  onClick={() => setActiveTab('assessment')}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    borderColor: 'var(--border-card-strong)',
                    color: 'var(--badge-text)',
                  }}
                >
                  <Award size={13} />
                  <span>Take 25-Question Assessment →</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {topic.practiceQuestions.map((q, qIndex) => {
                const selected = userAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;
                const showingExplanation = showExplanations[q.id];
                const showingHint = showHints[q.id];
                const questionSpeechText = `Question ${qIndex + 1}: ${q.question}. Options are: ${q.options.join(
                  ', '
                )}`;

                return (
                  <ReadableCard
                    key={q.id}
                    id={`practice-${q.id}`}
                    textToRead={questionSpeechText}
                    label={`Question ${qIndex + 1}`}
                    highlightStyle="inner"
                    className="p-5 rounded-xl border space-y-4 shadow-xs"
                    ariaLabel={`Question ${qIndex + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span
                          className="flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-bold shrink-0 mt-0.5"
                          style={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'var(--accent-contrast)',
                          }}
                        >
                          Q{qIndex + 1}
                        </span>
                        <div>
                          <p
                            className="font-bold text-base sm:text-lg leading-snug"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {q.question}
                          </p>
                          {q.mathQuestion && (
                            <div className="mt-2">
                              <MathView math={q.mathQuestion} block={true} />
                            </div>
                          )}
                        </div>
                      </div>

                      <AudioButton
                        id={`practice-${q.id}`}
                        textToRead={questionSpeechText}
                        label={`Question ${qIndex + 1}`}
                        title="Listen to question"
                        size="sm"
                      />
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;

                        let bgStyle = 'var(--bg-card-hover)';
                        let borderStyle = 'var(--border-card)';
                        let textColor = 'var(--text-primary)';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            bgStyle = 'var(--reading-highlight-bg)';
                            borderStyle = 'var(--reading-highlight-border)';
                            textColor = 'var(--text-primary)';
                          } else if (isThisSelected && !isCorrect) {
                            bgStyle = 'var(--contrast-warm-bg)';
                            borderStyle = 'var(--contrast-warm-border)';
                            textColor = 'var(--text-primary)';
                          } else {
                            bgStyle = 'var(--bg-card-subtle)';
                            borderStyle = 'var(--border-card)';
                            textColor = 'var(--text-secondary)';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, optIdx, q.correctIndex)}
                            disabled={isAnswered}
                            className="p-3.5 rounded-xl border text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between cursor-pointer"
                            style={{
                              backgroundColor: bgStyle,
                              borderColor: borderStyle,
                              color: textColor,
                            }}
                          >
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 size={18} className="shrink-0 ml-2" style={{ color: 'var(--contrast-teal)' }} />
                            )}
                            {isAnswered && isThisSelected && !isCorrect && (
                              <XCircle size={18} className="shrink-0 ml-2" style={{ color: 'var(--contrast-warm)' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Hint & Solution Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        <HelpCircle size={16} />
                        <span>{showingHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                      </button>

                      {isAnswered && (
                        <span
                          className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border shadow-2xs inline-flex items-center gap-1.5 flex-wrap"
                          style={{
                            backgroundColor: isCorrect ? 'var(--contrast-teal-bg)' : 'var(--contrast-warm-bg)',
                            color: isCorrect ? 'var(--contrast-teal)' : 'var(--contrast-warm)',
                            borderColor: isCorrect ? 'var(--contrast-teal-border)' : 'var(--contrast-warm-border)',
                          }}
                        >
                          {isCorrect ? (
                            <>
                              <span>{practiceAppreciations[q.id]?.emoji || '🌟'}</span>
                              <span>{practiceAppreciations[q.id]?.title || 'Spot On, Math Legend!'}</span>
                              {practiceAppreciations[q.id]?.celebrationBadge && (
                                <span
                                  className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white ml-1"
                                  style={{ backgroundColor: 'var(--contrast-teal-border)' }}
                                >
                                  {practiceAppreciations[q.id]?.celebrationBadge}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>✗ Not quite — Check the worked steps below!</span>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Hint Box with isolated Audio button */}
                    {showingHint && (
                      <div
                        className="p-3.5 border rounded-xl text-sm sm:text-base font-medium leading-relaxed flex items-start justify-between gap-3"
                        style={{
                          backgroundColor: 'var(--contrast-amber-bg)',
                          borderColor: 'var(--contrast-amber-border)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          💡 <strong>Hint:</strong> {q.hint}
                        </div>
                        <AudioButton
                          id={`hint-${q.id}`}
                          textToRead={`Hint for question ${qIndex + 1}: ${q.hint}`}
                          label={`Hint: Q${qIndex + 1}`}
                          title="Listen to hint"
                          size="sm"
                          className="shrink-0"
                        />
                      </div>
                    )}

                    {/* Explanation Box with isolated Audio button */}
                    {showingExplanation && (
                      <div
                        id={`explanation-${q.id}`}
                        className="p-4 sm:p-5 border rounded-xl space-y-2.5 text-sm sm:text-base shadow-2xs leading-relaxed"
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          borderColor: 'var(--border-card-strong)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <strong
                            className="font-bold flex items-center gap-1.5"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            <Sparkles size={14} />
                            <span>Detailed Step-by-Step Explanation:</span>
                          </strong>
                          <AudioButton
                            id={`explanation-${q.id}`}
                            textToRead={`Explanation for question ${qIndex + 1}: ${q.explanation}`}
                            label={`Explanation: Q${qIndex + 1}`}
                            title="Listen to explanation"
                            size="sm"
                          />
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>{q.explanation}</p>
                        {q.mathExplanation && (
                          <MathView math={q.mathExplanation} block={true} />
                        )}
                      </div>
                    )}
                  </ReadableCard>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Interactive Visual Tools */}
      {activeTab === 'tools' && topic.toolType && (
        <div className="space-y-4">
          {topic.toolType === 'fractions' && <FractionsVisualizer />}
          {topic.toolType === 'bidmas' && <BidmasEvaluator />}
          {topic.toolType === 'angles' && <AnglesExplorer />}
          {topic.toolType === 'area-perimeter' && <AreaPerimeterSandbox />}
          {topic.toolType === 'roman-numerals' && <RomanNumeralsConverter />}
          {topic.toolType === 'place-value' && <PlaceValueSandbox />}
          {topic.toolType === 'decimals-percentages' && <DecimalsPercentagesConverter />}
          {topic.toolType === 'factors-multiples' && <FactorsMultiplesLaboratory />}
          {topic.toolType === 'averages-data' && <AveragesDataStudio />}
          {topic.toolType === 'coordinates' && <CoordinatesTransformStudio />}
        </div>
      )}

      {/* Tab 6: Dedicated Topic Assessment (25 Questions Easy to Difficult) */}
      {activeTab === 'assessment' && topicAssessment && (
        <AssessmentView
          assessment={topicAssessment}
          onBackToTheory={() => setActiveTab('theory')}
        />
      )}
    </div>
  );
};
