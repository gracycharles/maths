'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
      
      setIsVisible(scrollTop > 240);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // SVG circular progress calculation
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      id="btn-go-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Back to top"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group border"
      style={{
        backgroundColor: 'var(--accent-primary)',
        borderColor: 'var(--border-card-strong)',
        color: 'var(--accent-contrast)',
      }}
    >
      {/* Background Progress Ring */}
      <svg className="absolute w-10 h-10 sm:w-11 sm:h-11 -rotate-90 pointer-events-none" viewBox="0 0 38 38">
        <circle
          cx="19"
          cy="19"
          r={radius}
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="19"
          cy="19"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <ArrowUp size={18} className="stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
