'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { mathTopics } from '@/data/mathTopics';
import { CategoryId, YearLevel } from '@/types/math';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TopicDetail } from '@/components/TopicDetail';
import { AssessmentView } from '@/components/AssessmentView';
import { QuickFormulaDrawer } from '@/components/QuickFormulaDrawer';
import { GoToTop } from '@/components/GoToTop';
import { FloatingAudioController } from '@/components/FloatingAudioController';
import { allAssessments, getAssessmentForTopic } from '@/data/assessments';
import { wakeLockController } from '@/utils/wakeLock';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('place-value-and-rounding');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<YearLevel | 'All'>('All');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isFormulaDrawerOpen, setIsFormulaDrawerOpen] = useState<boolean>(false);

  // Mode: 'learn' (Concepts & Practice) vs 'video' (Masterclasses) vs 'tools' (Sandboxes) vs 'assessment' (25-Question SATs Tests)
  const [sidebarMode, setSidebarMode] = useState<'learn' | 'video' | 'tools' | 'assessment'>('learn');
  const [activeDetailTab, setActiveDetailTab] = useState<
    'theory' | 'video' | 'tips' | 'formulas' | 'practice' | 'tools' | 'assessment'
  >('theory');

  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('maths_master_sidebar_open');
      if (saved !== null) {
        setIsDesktopSidebarOpen(saved === 'true');
      }
    } catch (e) {}
  }, []);

  const handleToggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('maths_master_sidebar_open', String(next));
        } catch (e) {
          // safe fallback
        }
      }
      return next;
    });
  };

  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);

  // Keep screen awake while user is studying or taking assessments
  useEffect(() => {
    wakeLockController.request();
    return () => {
      wakeLockController.release();
    };
  }, []);

  // Filter topics based on category and year level
  const filteredTopics = useMemo(() => {
    return mathTopics.filter((t) => {
      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      // Year level filter
      if (selectedYear !== 'All' && t.yearLevel !== selectedYear) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedYear]);

  // Current active topic - strictly respects the active filters
  const activeTopic = useMemo(() => {
    // 1. Try finding the selected topic in the currently filtered list
    const inFiltered = filteredTopics.find((t) => t.id === selectedTopicId);
    if (inFiltered) return inFiltered;

    // 2. Try matching anywhere in all core mathTopics
    const inAll = mathTopics.find((t) => t.id === selectedTopicId);
    if (inAll) return inAll;

    // 3. If current topic is not found (e.g. extension assessment), pick first filtered or first topic
    if (filteredTopics.length > 0) return filteredTopics[0];
    return mathTopics[0];
  }, [selectedTopicId, filteredTopics]);

  // Check if current selection is an assessment
  const currentAssessment = useMemo(() => {
    return getAssessmentForTopic(selectedTopicId) || allAssessments[0];
  }, [selectedTopicId]);

  // Handler for selecting year level from the top band
  const handleSelectYear = (year: YearLevel | 'All') => {
    setSelectedYear(year);

    // If switching to a specific year level, select the first topic belonging to that year
    let matching = mathTopics.filter((t) => {
      if (year !== 'All' && t.yearLevel !== year) return false;
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      return true;
    });

    // If current category has no topics for this year, reset category to 'all'
    if (matching.length === 0 && year !== 'All') {
      setSelectedCategory('all');
      matching = mathTopics.filter((t) => t.yearLevel === year);
    }

    if (matching.length > 0) {
      setSelectedTopicId(matching[0].id);
      setTargetSectionId(null);
    }
  };

  // Handler for selecting a topic directly, ensuring filters do not hide the target topic
  const handleSelectTopicDirectly = (id: string, sectionId?: string) => {
    const target = mathTopics.find((t) => t.id === id);
    if (target) {
      if (selectedCategory !== 'all' && target.category !== selectedCategory) {
        setSelectedCategory('all');
      }
      if (selectedYear !== 'All' && target.yearLevel !== selectedYear) {
        setSelectedYear('All');
      }
    }
    setSelectedTopicId(id);
    setActiveDetailTab('theory');
    if (sectionId) {
      setTargetSectionId(sectionId);
    } else {
      setTargetSectionId(null);
    }
  };

  // Handler for selecting an assessment directly
  const handleOpenAssessment = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSidebarMode('assessment');
    setActiveDetailTab('assessment');
    setTargetSectionId(null);
  };

  // Does the current selected topic have a full mathTopic lesson?
  const hasMatchingLesson = mathTopics.some((t) => t.id === selectedTopicId);

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Top Navbar */}
      <Header
        selectedYear={selectedYear}
        onSelectYear={handleSelectYear}
        onOpenFormulaDrawer={() => setIsFormulaDrawerOpen(true)}
        isMobileNavOpen={isMobileNavOpen}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        onToggleDesktopSidebar={handleToggleDesktopSidebar}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 sm:pb-32 flex flex-col lg:flex-row gap-6 min-w-0 app-main-layout">
        {/* Left Sidebar for Mobile, Tablet Landscape, & Desktop */}
        <Sidebar
          topics={filteredTopics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={(id) => {
            setSelectedTopicId(id);
            if (sidebarMode === 'video') setActiveDetailTab('video');
            else if (sidebarMode === 'tools') setActiveDetailTab('tools');
            else if (sidebarMode === 'assessment') setActiveDetailTab('assessment');
            else setActiveDetailTab('theory');
            setTargetSectionId(null);
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isOpenOnMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
          isDesktopOpen={isDesktopSidebarOpen}
          onToggleDesktop={handleToggleDesktopSidebar}
          activeMode={sidebarMode}
          onSelectMode={(mode) => {
            setSidebarMode(mode);
            if (mode === 'video') setActiveDetailTab('video');
            else if (mode === 'tools') setActiveDetailTab('tools');
            else if (mode === 'assessment') setActiveDetailTab('assessment');
            else setActiveDetailTab('theory');
          }}
          onOpenAssessment={handleOpenAssessment}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 w-full">
          {/* Quick expand pill when menu is collapsed on tablet landscape / desktop */}
          {!isDesktopSidebarOpen && (
            <div className="flex items-center mb-3">
              <button
                id="expand-sidebar-pill-btn"
                type="button"
                onClick={handleToggleDesktopSidebar}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:opacity-90 cursor-pointer shadow-2xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card-strong)',
                  color: 'var(--text-primary)',
                }}
                title="Open topic navigator menu"
                aria-label="Open topic navigator menu"
              >
                <PanelLeftOpen size={15} style={{ color: 'var(--accent-primary)' }} />
                <span>
                  Show Topic Navigator ({sidebarMode === 'assessment' ? allAssessments.length : filteredTopics.length})
                </span>
              </button>
            </div>
          )}

          {/* If an extension assessment without full lesson is selected in assessment mode */}
          {!hasMatchingLesson && currentAssessment ? (
            <AssessmentView
              assessment={currentAssessment}
              onBackToTheory={() => {
                setSidebarMode('learn');
                setActiveDetailTab('theory');
              }}
            />
          ) : (
            <TopicDetail
              topic={activeTopic}
              onSelectTopic={handleSelectTopicDirectly}
              targetSectionId={targetSectionId}
              onClearTargetSection={() => setTargetSectionId(null)}
              initialTab={activeDetailTab}
            />
          )}
        </main>
      </div>

      {/* Floating Go To Top Button */}
      <GoToTop />

      {/* Floating Audio Controller whenever speech is active */}
      <FloatingAudioController />

      {/* Quick Formula Sheet Slide-over */}
      <QuickFormulaDrawer
        isOpen={isFormulaDrawerOpen}
        onClose={() => setIsFormulaDrawerOpen(false)}
        onSelectTopic={(id) => {
          handleSelectTopicDirectly(id);
          setIsFormulaDrawerOpen(false);
        }}
      />
    </div>
  );
}
