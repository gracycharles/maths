'use client';

import React, { Component, useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  Minimize2,
  List,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Sliders,
} from 'lucide-react';
import { getVideoLessonForTopic, VideoLesson, VideoChapter } from '../../data/videoLessons/index';
import { WhiteboardVisuals } from './WhiteboardVisuals';
import { audioSpeech } from '../../utils/audioSpeech';
import { soundEffects } from '../../utils/soundEffects';
import { wakeLockController } from '../../utils/wakeLock';

interface WhiteboardErrorBoundaryProps {
  children: React.ReactNode;
  chapterId: string;
}

interface WhiteboardErrorBoundaryState {
  hasError: boolean;
}

class WhiteboardErrorBoundary extends React.Component<
  WhiteboardErrorBoundaryProps,
  WhiteboardErrorBoundaryState
> {
  constructor(props: WhiteboardErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: WhiteboardErrorBoundaryProps) {
    if (prevProps.chapterId !== this.props.chapterId && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="p-6 rounded-2xl border text-center space-y-3"
          style={{
            backgroundColor: 'var(--contrast-amber-bg)',
            borderColor: 'var(--contrast-amber-border)',
            color: 'var(--contrast-amber)',
          }}
        >
          <p className="font-extrabold text-sm sm:text-base">
            ⚡ Scene Display Refreshed
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Select another chapter or click below to resume.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-contrast)',
              borderColor: 'var(--border-card-strong)',
            }}
          >
            Reset Scene
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface VideoTutoringClipProps {
  topicId?: string;
  customLesson?: VideoLesson;
  onGoToAssessment?: () => void;
  onGoToTheory?: () => void;
}

export const VideoTutoringClip: React.FC<VideoTutoringClipProps> = ({
  topicId = 'fractions-mastery',
  customLesson,
  onGoToAssessment,
  onGoToTheory,
}) => {
  const lesson = customLesson || getVideoLessonForTopic(topicId);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [activeCaptionIndex, setActiveCaptionIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [hasVoiceAudio, setHasVoiceAudio] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(true);

  // Checkpoint Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(false);
  const currentChapterIndexRef = useRef(0);
  const activeCaptionIndexRef = useRef(0);
  const playbackRateRef = useRef(1);
  const hasVoiceAudioRef = useRef(true);
  const mutedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextChapterTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize refs for async callbacks
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentChapterIndexRef.current = currentChapterIndex;
  }, [currentChapterIndex]);

  useEffect(() => {
    activeCaptionIndexRef.current = activeCaptionIndex;
  }, [activeCaptionIndex]);

  useEffect(() => {
    playbackRateRef.current = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    hasVoiceAudioRef.current = hasVoiceAudio;
  }, [hasVoiceAudio]);

  const activeChapter: VideoChapter =
    lesson.chapters[currentChapterIndex] || lesson.chapters[0];

  const currentCaptionObj =
    activeChapter.captions[activeCaptionIndex] || activeChapter.captions[0];
  const currentCaption = currentCaptionObj?.text || '';

  // Calculate current playback time from chapter and caption progress
  const updateCurrentTime = (chapIdx: number, capIdx: number) => {
    const chap = lesson.chapters[chapIdx];
    if (!chap) return;
    const totalCaps = Math.max(1, chap.captions.length);
    const progress = capIdx / totalCaps;
    const time = chap.startTime + Math.round(progress * chap.duration);
    setCurrentTime(Math.min(lesson.totalDuration, time));
  };

  // Clear timers helper
  const clearAllTimers = () => {
    if (mutedTimerRef.current) {
      clearTimeout(mutedTimerRef.current);
      mutedTimerRef.current = null;
    }
    if (nextChapterTimerRef.current) {
      clearTimeout(nextChapterTimerRef.current);
      nextChapterTimerRef.current = null;
    }
  };

  // Reset playback when topic changes
  useEffect(() => {
    clearAllTimers();
    setIsPlaying(false);
    setCurrentChapterIndex(0);
    setActiveCaptionIndex(0);
    setCurrentTime(0);
    setSelectedQuizOption(null);
    setQuizResult(null);
    audioSpeech.stop();
  }, [topicId]);

  // Sync fullscreen state with native document events and keydown
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Speak captions or run timer for muted playback
  const playFromPosition = (
    chapIdx: number,
    capIdx: number,
    rate: number = playbackRateRef.current
  ) => {
    clearAllTimers();
    const chap = lesson.chapters[chapIdx];
    if (!chap) return;

    if (!hasVoiceAudioRef.current) {
      // Muted voice mode: advance captions via calculated reading timer
      runMutedCaptionTimer(chapIdx, capIdx);
      return;
    }

    const captions = chap.captions;
    if (!captions || captions.length === 0) {
      // Fallback if chapter has no individual captions
      audioSpeech.speak(`chap-${chap.id}`, chap.teacherSpokenScript, {
        rate,
        label: chap.title,
        forcePlay: true,
        onEnd: () => {
          handleChapterAudioComplete(chapIdx);
        },
      });
      return;
    }

    const sessionKey = `clip-${chap.id}-${capIdx}-${Date.now()}`;
    audioSpeech.speakCaptions(sessionKey, captions, {
      rate,
      startIndex: capIdx,
      label: chap.title,
      forcePlay: true,
      onCaptionStart: (index) => {
        if (!isPlayingRef.current) return;
        setActiveCaptionIndex(index);
        updateCurrentTime(chapIdx, index);
      },
      onEnd: () => {
        handleChapterAudioComplete(chapIdx);
      },
    });
  };

  // Muted caption pacing timer
  const runMutedCaptionTimer = (chapIdx: number, capIdx: number) => {
    clearAllTimers();
    const chap = lesson.chapters[chapIdx];
    if (!chap || !chap.captions || chap.captions.length === 0) return;

    const cap = chap.captions[capIdx];
    const wordCount = (cap?.text || '').trim().split(/\s+/).length;
    const durationMs = Math.max(2200, ((wordCount * 360) / playbackRateRef.current) + 500);

    mutedTimerRef.current = setTimeout(() => {
      if (!isPlayingRef.current) return;
      if (capIdx < chap.captions.length - 1) {
        const nextCap = capIdx + 1;
        setActiveCaptionIndex(nextCap);
        updateCurrentTime(chapIdx, nextCap);
        runMutedCaptionTimer(chapIdx, nextCap);
      } else {
        handleChapterAudioComplete(chapIdx);
      }
    }, durationMs);
  };

  // Chapter finished handler: advances to next chapter with a natural 400ms transition
  const handleChapterAudioComplete = (finishedChapIdx: number) => {
    clearAllTimers();
    if (!isPlayingRef.current) return;

    if (finishedChapIdx < lesson.chapters.length - 1) {
      const nextChapIdx = finishedChapIdx + 1;
      // Brief natural pause of 400ms between chapters (no dead silence!)
      nextChapterTimerRef.current = setTimeout(() => {
        if (!isPlayingRef.current) return;
        setCurrentChapterIndex(nextChapIdx);
        setActiveCaptionIndex(0);
        updateCurrentTime(nextChapIdx, 0);
        playFromPosition(nextChapIdx, 0, playbackRateRef.current);
      }, 400);
    } else {
      // Completed all chapters
      setIsPlaying(false);
      audioSpeech.stop();
      setCurrentTime(lesson.totalDuration);
    }
  };

  // Play / Pause toggle
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearAllTimers();
      audioSpeech.stop();
    } else {
      setIsPlaying(true);
      playFromPosition(currentChapterIndex, activeCaptionIndex, playbackRate);
    }
  };

  // Seek handler
  const handleSeek = (targetTime: number) => {
    clearAllTimers();
    const clamped = Math.max(0, Math.min(lesson.totalDuration, targetTime));
    setCurrentTime(clamped);

    // Find corresponding chapter
    const targetChapIdx = lesson.chapters.findIndex((chap, idx) => {
      const nextChap = lesson.chapters[idx + 1];
      if (!nextChap) return true;
      return clamped >= chap.startTime && clamped < nextChap.startTime;
    });

    const chapIdx = targetChapIdx !== -1 ? targetChapIdx : 0;
    const targetChap = lesson.chapters[chapIdx];

    // Find caption index within that chapter
    const capIdx = targetChap.captions.reduce((bestIdx, curr, idx) => {
      if (clamped >= curr.time) {
        return idx;
      }
      return bestIdx;
    }, 0);

    setCurrentChapterIndex(chapIdx);
    setActiveCaptionIndex(capIdx);

    if (isPlaying) {
      playFromPosition(chapIdx, capIdx, playbackRate);
    }
  };

  const handleSkip = (seconds: number) => {
    handleSeek(currentTime + seconds);
  };

  const handleJumpToChapter = (chapter: VideoChapter) => {
    clearAllTimers();
    const idx = lesson.chapters.findIndex((c) => c.id === chapter.id);
    if (idx === -1) return;

    setCurrentChapterIndex(idx);
    setActiveCaptionIndex(0);
    setCurrentTime(chapter.startTime);

    if (isPlaying) {
      playFromPosition(idx, 0, playbackRate);
    }
  };

  // Handle rate change
  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying) {
      playFromPosition(currentChapterIndex, activeCaptionIndex, rate);
    }
  };

  // Keep screen awake while playing
  useEffect(() => {
    if (isPlaying) {
      wakeLockController.request();
    } else {
      wakeLockController.release();
    }
  }, [isPlaying]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      audioSpeech.stop();
      wakeLockController.release();
    };
  }, []);

  const handleCheckpointAnswer = (
    isCorrect: boolean,
    feedback: string,
    teacherSpokenFeedback?: string,
    optId?: string
  ) => {
    if (optId) {
      setSelectedQuizOption(optId);
    }
    setQuizResult({ isCorrect, feedback });
    if (isCorrect) {
      soundEffects.playCorrectSound();
    } else {
      soundEffects.playWrongSound();
    }
    if (hasVoiceAudio) {
      const spokenFeedback =
        teacherSpokenFeedback ||
        (isCorrect
          ? `Superb! Spot on! ${feedback}`
          : `Watch out! ${feedback}`);
      audioSpeech.speak(
        `quiz-feedback-${Date.now()}`,
        spokenFeedback,
        { rate: playbackRate, label: 'Teacher Feedback', forcePlay: true }
      );
    }
  };

  const toggleFullscreen = async () => {
    soundEffects.playClickSound();
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (containerRef.current && containerRef.current.requestFullscreen) {
        try {
          await containerRef.current.requestFullscreen();
        } catch {
          // Fallback to CSS fullscreen
        }
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        try {
          await document.exitFullscreen();
        } catch {
          // Fallback
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="video-tutoring-player-container"
      className={
        isFullscreen
          ? 'fixed inset-0 z-[100] rounded-none border-0 h-screen w-screen overflow-y-auto flex flex-col bg-[var(--bg-card)] text-[var(--text-primary)] shadow-none'
          : 'rounded-3xl border shadow-lg overflow-hidden flex flex-col transition-all relative z-10'
      }
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-card-strong)',
      }}
    >
      {/* Floating Exit Fullscreen Restore Pill */}
      {isFullscreen && (
        <button
          type="button"
          id="exit-video-fullscreen-floating-btn"
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-[120] px-4 py-2 rounded-2xl bg-rose-600 text-white font-black text-xs sm:text-sm border-2 border-white shadow-2xl flex items-center gap-2 hover:bg-rose-700 cursor-pointer transition-all active:scale-95"
          title="Exit Fullscreen (ESC)"
        >
          <Minimize2 size={18} />
          <span>Exit Fullscreen</span>
        </button>
      )}

      {/* Top Video Stage Bar */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between gap-3 text-xs sm:text-sm font-bold select-none relative z-10"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <span
            className="truncate font-bold text-xs sm:text-sm"
            style={{ color: 'var(--text-primary)' }}
          >
            Scene {activeChapter.chapterNumber} of {lesson.chapters.length}: {activeChapter.title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Scene Dropdown */}
          <select
            value={activeChapter.id}
            onChange={(e) => {
              const chap = lesson.chapters.find((c) => c.id === e.target.value);
              if (chap) handleJumpToChapter(chap);
            }}
            className="hidden md:inline-block px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-card)',
            }}
            title="Jump to scene"
          >
            {lesson.chapters.map((c) => (
              <option key={c.id} value={c.id}>
                Scene {c.chapterNumber}: {c.title}
              </option>
            ))}
          </select>

          {/* Chapters Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 hover:opacity-90"
            style={{
              backgroundColor: showChaptersDrawer ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: showChaptersDrawer ? 'var(--accent-contrast)' : 'var(--text-primary)',
              borderColor: 'var(--border-card)',
            }}
            title="View chapters"
          >
            <List size={13} />
            <span className="hidden sm:inline">Chapters</span>
          </button>

          {/* Collapse / Expand Controls */}
          <button
            type="button"
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 hover:opacity-90"
            style={{
              backgroundColor: isControlsCollapsed ? 'var(--bg-card)' : 'var(--accent-primary)',
              color: isControlsCollapsed ? 'var(--text-secondary)' : 'var(--accent-contrast)',
              borderColor: 'var(--border-card)',
            }}
            title={isControlsCollapsed ? 'Show Controls' : 'Hide Controls'}
          >
            <Sliders size={13} />
            <span className="hidden md:inline">{isControlsCollapsed ? 'Controls' : 'Hide'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs hover:opacity-90"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-card)',
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Chapters Overlay Modal */}
      {showChaptersDrawer && (
        <div
          className="p-4 sm:p-6 border-b space-y-4 animate-fadeIn select-none z-40 relative shadow-xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card-strong)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List size={16} style={{ color: 'var(--accent-primary)' }} />
              <span className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>
                Chapters ({lesson.chapters.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowChaptersDrawer(false)}
              className="text-xs font-bold px-3 py-1 rounded-lg border cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
              }}
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {lesson.chapters.map((chap, idx) => {
              const isActive = idx === currentChapterIndex;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => {
                    handleJumpToChapter(chap);
                    setShowChaptersDrawer(false);
                  }}
                  className={`p-3 rounded-xl border text-left font-semibold text-xs transition-all cursor-pointer shadow-2xs hover:scale-101 flex flex-col justify-between gap-2 ${
                    isActive ? 'ring-2 ring-amber-500 font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--reading-highlight-bg)' : 'var(--bg-card-subtle)',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-card)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-extrabold">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px]"
                      style={{
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                        color: isActive ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                      }}
                    >
                      Scene {chap.chapterNumber}
                    </span>
                    <span className="font-mono text-stone-500">{formatTime(chap.startTime)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-snug">{chap.title}</p>
                    <p className="text-[11px] font-normal mt-0.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                      {chap.subtitle}
                    </p>
                  </div>
                  {isActive && (
                    <div
                      className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5"
                      style={{ color: 'var(--contrast-amber)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--contrast-amber)' }}
                      />
                      Active
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Video Body (Smartboard Stage) */}
      <div className="p-4 sm:p-6 space-y-4 relative flex-1 flex flex-col justify-between min-h-[420px]">
        {/* Dynamic Classroom Whiteboard Screen */}
        <div
          id="classroom-whiteboard-stage"
          className="rounded-2xl border p-4 sm:p-6 shadow-inner relative overflow-hidden transition-all flex-1 min-h-[380px] flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-card)',
          }}
        >
          {/* Smartboard Canvas Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Whiteboard Content with live sync */}
          <div className="relative z-10 flex-1">
            <WhiteboardErrorBoundary chapterId={activeChapter.id}>
              <WhiteboardVisuals
                chapter={activeChapter}
                lesson={lesson}
                currentTime={currentTime}
                activeCaptionIndex={activeCaptionIndex}
                isPlaying={isPlaying}
                onCheckpointAnswer={handleCheckpointAnswer}
                selectedQuizOption={selectedQuizOption}
                quizResult={quizResult}
              />
            </WhiteboardErrorBoundary>
          </div>

          {/* Synchronized Captions Bar */}
          {showCaptions && currentCaption && (
            <div
              className="mt-4 p-3 rounded-xl border text-center relative z-10 transition-all shadow-xs"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.88)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                <p className="leading-snug">{currentCaption}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Controls Bar */}
      {isControlsCollapsed ? (
        /* Collapsed Compact Dock */
        <div
          className="p-2 sm:px-4 sm:py-2.5 border-t select-none sticky bottom-0 z-30 transition-all flex items-center justify-between gap-2 shadow-lg backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card-strong)',
          }}
        >
          {/* Play & Time */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="h-8 px-3 rounded-lg font-extrabold text-xs border flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              style={{
                backgroundColor: 'var(--accent-primary)',
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current ml-0.5" />}
              <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
              {formatTime(currentTime)} <span className="opacity-50 font-normal">/ {formatTime(lesson.totalDuration)}</span>
            </span>
          </div>

          {/* Progress Slider */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-3 flex items-center gap-2 group cursor-pointer relative">
            <input
              type="range"
              min={0}
              max={lesson.totalDuration}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer relative z-10"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                accentColor: 'var(--accent-primary)',
              }}
              title="Seek"
            />
          </div>

          {/* Audio toggle & Expand */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                const next = !hasVoiceAudio;
                setHasVoiceAudio(next);
                if (!next) {
                  audioSpeech.stop();
                  if (isPlaying) runMutedCaptionTimer(currentChapterIndex, activeCaptionIndex);
                } else if (isPlaying) {
                  playFromPosition(currentChapterIndex, activeCaptionIndex, playbackRate);
                }
              }}
              className="p-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs hover:opacity-90"
              style={{
                backgroundColor: hasVoiceAudio ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                color: hasVoiceAudio ? 'var(--accent-contrast)' : 'var(--text-primary)',
                borderColor: hasVoiceAudio ? 'var(--accent-primary)' : 'var(--border-card)',
              }}
              title={hasVoiceAudio ? 'Mute' : 'Unmute'}
            >
              {hasVoiceAudio ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            <button
              type="button"
              onClick={() => setIsControlsCollapsed(false)}
              className="px-2.5 py-1.5 rounded-lg font-bold text-xs border flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:opacity-90"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-primary)',
              }}
              title="Expand Controls"
            >
              <ChevronDown size={14} />
              <span className="hidden sm:inline">Controls</span>
            </button>
          </div>
        </div>
      ) : (
        /* Full Expanded Controls Bar */
        <div
          className="p-4 border-t space-y-3 select-none sticky bottom-0 z-30 transition-all shadow-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-card)',
          }}
        >
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="relative w-full h-4 flex items-center group cursor-pointer">
              <input
                type="range"
                min={0}
                max={lesson.totalDuration}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer relative z-10"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  accentColor: 'var(--accent-primary)',
                }}
              />
            </div>

            {/* Time & Chapter Progress */}
            <div className="flex items-center justify-between text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                  {formatTime(currentTime)}
                </span>
                <span>/</span>
                <span className="font-mono">{formatTime(lesson.totalDuration)}</span>
              </div>

              <span className="hidden sm:inline font-semibold truncate max-w-xs">
                {activeChapter.subtitle}
              </span>

              <span className="text-[10px] uppercase tracking-wider font-extrabold" style={{ color: 'var(--accent-primary)' }}>
                {Math.round((currentTime / lesson.totalDuration) * 100)}%
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Prev Chapter */}
              <button
                type="button"
                onClick={() => {
                  const prevIndex = Math.max(0, currentChapterIndex - 1);
                  handleJumpToChapter(lesson.chapters[prevIndex]);
                }}
                disabled={currentChapterIndex === 0}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs disabled:opacity-40 hover:opacity-90"
                style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-card)' }}
                title="Previous Scene"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Rewind */}
              <button
                type="button"
                onClick={() => handleSkip(-10)}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs hover:opacity-90"
                style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-card)' }}
                title="Rewind 10s"
              >
                <RotateCcw size={15} />
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="h-10 px-4 rounded-xl font-extrabold text-sm border flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  borderColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={17} className="fill-current" /> : <Play size={17} className="fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              {/* Forward */}
              <button
                type="button"
                onClick={() => handleSkip(10)}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs hover:opacity-90"
                style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-card)' }}
                title="Skip forward 10s"
              >
                <SkipForward size={15} />
              </button>

              {/* Next Chapter */}
              <button
                type="button"
                onClick={() => {
                  const nextIndex = Math.min(lesson.chapters.length - 1, currentChapterIndex + 1);
                  handleJumpToChapter(lesson.chapters[nextIndex]);
                }}
                disabled={currentChapterIndex === lesson.chapters.length - 1}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs disabled:opacity-40 hover:opacity-90"
                style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-card)' }}
                title="Next Scene"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Speed, Captions, Mute & Collapse */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center rounded-lg border overflow-hidden shadow-2xs text-xs font-bold"
                style={{ borderColor: 'var(--border-card)' }}
              >
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => handleChangePlaybackRate(speed)}
                    className="px-2 py-1 transition-colors cursor-pointer"
                    style={{
                      backgroundColor: playbackRate === speed ? 'var(--accent-primary)' : 'var(--bg-card)',
                      color: playbackRate === speed ? 'var(--accent-contrast)' : 'var(--text-muted)',
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Captions Toggle */}
              <button
                type="button"
                onClick={() => setShowCaptions(!showCaptions)}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs hover:opacity-90"
                style={{
                  backgroundColor: showCaptions ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  color: showCaptions ? 'var(--accent-contrast)' : 'var(--text-primary)',
                  borderColor: showCaptions ? 'var(--accent-primary)' : 'var(--border-card)',
                }}
                title={showCaptions ? 'Captions On' : 'Captions Off'}
              >
                <Subtitles size={15} />
              </button>

              {/* Voice Mute Toggle */}
              <button
                type="button"
                onClick={() => {
                  const next = !hasVoiceAudio;
                  setHasVoiceAudio(next);
                  if (!next) {
                    audioSpeech.stop();
                    if (isPlaying) runMutedCaptionTimer(currentChapterIndex, activeCaptionIndex);
                  } else if (isPlaying) {
                    playFromPosition(currentChapterIndex, activeCaptionIndex, playbackRate);
                  }
                }}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs hover:opacity-90"
                style={{
                  backgroundColor: hasVoiceAudio ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  color: hasVoiceAudio ? 'var(--accent-contrast)' : 'var(--text-primary)',
                  borderColor: hasVoiceAudio ? 'var(--accent-primary)' : 'var(--border-card)',
                }}
                title={hasVoiceAudio ? 'Narration On' : 'Narration Muted'}
              >
                {hasVoiceAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Hide Controls */}
              <button
                type="button"
                onClick={() => setIsControlsCollapsed(true)}
                className="p-2 rounded-xl border transition-all cursor-pointer shadow-2xs hover:opacity-90 flex items-center gap-1 text-xs font-bold"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-secondary)',
                }}
                title="Hide bar"
              >
                <ChevronUp size={15} />
                <span className="hidden sm:inline">Hide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Buttons */}
      <div
        className="p-3.5 sm:p-4 border-t flex items-center justify-between gap-3 text-xs"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-card)',
        }}
      >
        <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
          {activeChapter.title}
        </span>

        <div className="flex items-center gap-2">
          {onGoToTheory && (
            <button
              type="button"
              onClick={onGoToTheory}
              className="px-3.5 py-1.5 rounded-xl border font-bold text-xs transition-all cursor-pointer shadow-2xs hover:opacity-90 flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-card)',
              }}
            >
              <BookOpen size={13} />
              <span>Revision Notes</span>
            </button>
          )}

          {onGoToAssessment && (
            <button
              type="button"
              onClick={onGoToAssessment}
              className="px-3.5 py-1.5 rounded-xl border font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--accent-primary)',
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              <Award size={13} />
              <span>Practice Questions</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
