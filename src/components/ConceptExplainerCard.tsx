'use client';

import React, { useState } from 'react';
import { MathView } from './MathView.tsx';
import { Sparkles, Grid, Box, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Volume2 } from 'lucide-react';
import { speakMathText, isAudioSpeechActive, stopMathSpeech } from '../utils/audioSpeech.ts';
import { playSound } from '../utils/soundEffects.ts';

interface ConceptExplainerCardProps {
  initialConcept?: 'prime' | 'square' | 'cube' | 'factors';
}

export const ConceptExplainerCard: React.FC<ConceptExplainerCardProps> = ({
  initialConcept = 'prime',
}) => {
  const [activeTab, setActiveTab] = useState<'prime' | 'square' | 'cube' | 'factors'>(initialConcept);

  // Prime Tile Tester state
  const [selectedNumber, setSelectedNumber] = useState<number>(7);
  const [attemptedRows, setAttemptedRows] = useState<number>(2);

  // Square Number state
  const [squareBase, setSquareBase] = useState<number>(4);

  // Cube state
  const [cubeBase, setCubeBase] = useState<number>(3);

  // Factor Rainbow state
  const [rainbowTarget, setRainbowTarget] = useState<number>(36);

  // Voice narration state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text: string) => {
    if (isAudioSpeechActive()) {
      stopMathSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakMathText(text, 1, () => setIsSpeaking(false));
  };

  // Calculations for Prime Tile Tester
  const quotient = Math.floor(selectedNumber / attemptedRows);
  const remainder = selectedNumber % attemptedRows;
  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const isSquare = (n: number) => {
    const s = Math.round(Math.sqrt(n));
    return s * s === n;
  };

  return (
    <div
      id="concept-human-explainer"
      className="p-4 sm:p-6 rounded-2xl border shadow-sm space-y-5 transition-all"
      style={{
        backgroundColor: 'var(--bg-card-subtle)',
        borderColor: 'var(--border-card-strong)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b"
        style={{ borderColor: 'var(--border-card)' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shadow-2xs"
            style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
          >
            💡
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Interactive Visual Guide: Why Concepts Work
            </h3>
            <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              No confusing math jargon. Built specifically for Primary 5 kids to touch and see.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl border bg-black/5 dark:bg-white/5 self-start sm:self-center">
          <button
            type="button"
            onClick={() => { setActiveTab('prime'); playSound('match'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'prime'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Primes (Tile Test)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('square'); playSound('match'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'square'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Square Numbers
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('cube'); playSound('match'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cube'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Cube Numbers
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('factors'); playSound('match'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'factors'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Factors vs Multiples
          </button>
        </div>
      </div>

      {/* TAB 1: PRIME NUMBER TILE TEST */}
      {activeTab === 'prime' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs sm:text-sm leading-relaxed text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3">
            <div>
              <span className="font-extrabold block text-amber-700 dark:text-amber-300 mb-1">
                🤔 Why is a Prime Number called Prime? (The Lonely Stick Test)
              </span>
              In real life, numbers are like square chocolate tiles. If you have 6 tiles, you can arrange them into a neat 2-row chocolate bar. But take 7 tiles: try making 2 rows or 3 rows—you ALWAYS have a lonely leftover tile! The ONLY way to arrange 7 tiles is one single skinny stick of 1 by 7. That is why 7 is PRIME!
            </div>
            <button
              type="button"
              onClick={() => handleSpeak(
                "Why is a prime number called prime? Imagine numbers as square chocolate tiles. If you have 6 tiles, you can make two equal rows of three. But take 7 tiles: try making two rows, one tile sticks out. Try three rows, one tile sticks out! The only way to arrange 7 tiles is a single straight line of 1 by 7. That is why 7 is prime! Prime numbers are lonely sticks that cannot form any other rectangle."
              )}
              className="px-2.5 py-1.5 rounded-lg border bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
            >
              <Volume2 size={14} />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>

          {/* Number Selector Chips */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Choose a number of tiles to test:
            </span>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20].map((num) => {
                const primeStatus = isPrime(num);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setSelectedNumber(num);
                      setAttemptedRows(2);
                      playSound('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                      selectedNumber === num
                        ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-xs'
                        : primeStatus
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/20'
                        : 'bg-black/5 dark:bg-white/5 border-transparent text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {num} {primeStatus && '★'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row Arranger Controls */}
          <div className="p-4 rounded-xl border bg-black/5 dark:bg-white/5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-black text-stone-700 dark:text-stone-200">
                Testing <span className="text-amber-500 text-base">{selectedNumber} Tiles</span>: How many rows do you want to arrange them into?
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setAttemptedRows(r);
                      playSound(selectedNumber % r === 0 ? 'correct' : 'wrong');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      attemptedRows === r
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {r} {r === 1 ? 'Row' : 'Rows'}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Grid / Stick Rendering */}
            <div className="p-4 rounded-xl border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center min-h-[140px] gap-2 overflow-x-auto">
              <div className="space-y-1.5 w-full flex flex-col items-center">
                {Array.from({ length: attemptedRows }).map((_, rIdx) => {
                  // How many tiles in this row?
                  const tilesInThisRow = quotient + (rIdx < remainder ? 1 : 0);
                  return (
                    <div key={rIdx} className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono w-12 text-right text-stone-400">Row {rIdx + 1}:</span>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: tilesInThisRow }).map((_, cIdx) => {
                          const isLeftover = rIdx < remainder && cIdx === tilesInThisRow - 1 && quotient > 0;
                          return (
                            <div
                              key={cIdx}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs font-black transition-all ${
                                isLeftover
                                  ? 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-400'
                                  : 'bg-amber-500 text-white shadow-2xs'
                              }`}
                            >
                              {rIdx * quotient + cIdx + 1}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Outcome */}
              <div className="mt-3 pt-3 border-t w-full text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm">
                {remainder === 0 ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                    <CheckCircle2 size={16} />
                    <span>
                      Perfect Match! {selectedNumber} divides into {attemptedRows} equal rows of {quotient} tiles with 0 leftovers.
                      {attemptedRows > 1 && ` (So ${attemptedRows} is a factor!)`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-extrabold">
                    <AlertCircle size={16} />
                    <span>
                      Uh oh! {remainder} leftover tile{remainder > 1 ? 's' : ''}! Not an equal rectangle.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Educational Takeaway Conclusion */}
            <div
              className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm ${
                isPrime(selectedNumber)
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200'
              }`}
            >
              <div>
                <span className="font-extrabold block text-xs uppercase tracking-wide">
                  {isPrime(selectedNumber) ? '🏆 VERDICT: PRIME NUMBER' : '🧱 VERDICT: COMPOSITE (TEAM) NUMBER'}
                </span>
                {isPrime(selectedNumber) ? (
                  <p>
                    <strong>{selectedNumber} is a PRIME NUMBER</strong> because no matter what you try, it can ONLY ever make a 1-row stick (1 × {selectedNumber}). It has exactly 2 factors: 1 and {selectedNumber}.
                  </p>
                ) : (
                  <p>
                    <strong>{selectedNumber} is a COMPOSITE NUMBER</strong> because its tiles can be arranged in neat equal rows (like {attemptedRows} rows of {quotient}). It has more than 2 factors.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Human Notes on 1 and 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div
                className="p-2.5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <span className="font-bold block mb-0.5" style={{ color: 'var(--contrast-amber)' }}>Why isn’t 1 a Prime?</span>
                <p style={{ color: 'var(--text-secondary)' }}>
                  A stick needs TWO different dimensions (length and width must be distinct numbers, like 1 × 7). 1 is just a single dot (1 × 1) with only ONE factor!
                </p>
              </div>
              <div
                className="p-2.5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <span className="font-bold block mb-0.5" style={{ color: 'var(--contrast-amber)' }}>Why is 2 the ONLY Even Prime?</span>
                <p style={{ color: 'var(--text-secondary)' }}>
                  2 tiles only make a 1 × 2 stick. But 4 makes 2 × 2, 6 makes 2 × 3, 8 makes 2 × 4. Every other even number can be split into 2 equal rows!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SQUARE NUMBER VISUALIZER */}
      {activeTab === 'square' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl border bg-blue-500/10 border-blue-500/20 text-xs sm:text-sm leading-relaxed text-blue-900 dark:text-blue-200 flex items-start justify-between gap-3">
            <div>
              <span className="font-extrabold block text-blue-700 dark:text-blue-300 mb-1">
                📐 Why are they called "Square Numbers"?
              </span>
              Numbers are not geometric shapes—so why say "9 is a square number"? Because if you arrange 9 tiles into equal rows and columns, it forms an <strong>ACTUAL PHYSICAL GEOMETRIC SQUARE</strong> on graph paper! Width is 3, Height is 3, Side × Side = 3 × 3 = 9!
            </div>
            <button
              type="button"
              onClick={() => handleSpeak(
                "Why are they called square numbers? Because if you arrange 9 square tiles into equal rows and columns, it forms an actual physical geometric square on paper! Three wide and three high. Side times side equals three times three which is 9. That is why three squared equals nine."
              )}
              className="px-2.5 py-1.5 rounded-lg border bg-blue-500/20 hover:bg-blue-500/30 text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
            >
              <Volume2 size={14} />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>

          {/* Square Size Selector */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Select a Base Number (n):
            </span>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setSquareBase(b);
                    playSound('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                    squareBase === b
                      ? 'bg-blue-600 text-white border-blue-700 scale-105 shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-stone-700 dark:text-stone-300 hover:border-stone-400'
                  }`}
                >
                  {b}² = {b * b}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Square Grid */}
          <div
            className="p-5 rounded-xl border flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                Width = {squareBase} tiles
              </span>
              <span className="text-xs font-bold text-stone-400">×</span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                Height = {squareBase} tiles
              </span>
              <span className="text-xs font-bold text-stone-400">=</span>
              <span className="text-sm font-black px-2 py-0.5 rounded-md bg-blue-500 text-white">
                {squareBase * squareBase} tiles (Square!)
              </span>
            </div>

            {/* Grid Array */}
            <div
              className="grid gap-1.5 p-3 rounded-xl border-2 border-blue-500/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm"
              style={{
                gridTemplateColumns: `repeat(${squareBase}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: squareBase * squareBase }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-black shadow-2xs hover:scale-105 transition-transform"
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Why Odd Number of Factors */}
            <div className="mt-4 p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 text-xs sm:text-sm text-blue-900 dark:text-blue-200 w-full">
              <span className="font-extrabold block text-blue-700 dark:text-blue-300 mb-1">
                🌟 The Big Exam Secret: Why do Square Numbers have an ODD number of factors?
              </span>
              Look at 16: Factors are 1, 2, 4, 8, 16.
              Notice the pairs: (1 × 16) and (2 × 8). But 4 pairs with <strong>ITSELF (4 × 4)</strong>! Because 4 doesn't have a second different partner, it is only listed ONCE! That leaves an odd total of <strong>5 factors</strong>! ALL non-square numbers have an even number of factors.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUBE NUMBERS */}
      {activeTab === 'cube' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl border bg-purple-500/10 border-purple-500/20 text-xs sm:text-sm leading-relaxed text-purple-900 dark:text-purple-200 flex items-start justify-between gap-3">
            <div>
              <span className="font-extrabold block text-purple-700 dark:text-purple-300 mb-1">
                🧊 Cube Numbers: The 3D Rubik's Block
              </span>
              If a square number is a flat 2D carpet tile on the floor, a cube number is a <strong>SOLID 3D BLOCK</strong>! You multiply THREE times: Length × Width × Height (n³ = n × n × n).
            </div>
            <button
              type="button"
              onClick={() => handleSpeak(
                "Cube numbers are 3D solid blocks like toy building blocks or a Rubik's cube. One cubed is one. Two cubed is two times two times two which equals eight blocks. Three cubed is three times three times three which equals twenty seven blocks! A standard Rubik's cube has twenty seven mini cubes inside."
              )}
              className="px-2.5 py-1.5 rounded-lg border bg-purple-500/20 hover:bg-purple-500/30 text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
            >
              <Volume2 size={14} />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>

          {/* Cube Selector */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Select Cube Base:
            </span>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCubeBase(c);
                    playSound('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                    cubeBase === c
                      ? 'bg-purple-600 text-white border-purple-700 scale-105 shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-stone-700 dark:text-stone-300 hover:border-stone-400'
                  }`}
                >
                  {c}³ = {c * c * c} {c === 3 && '(Rubik’s Cube!)'}
                </button>
              ))}
            </div>
          </div>

          {/* Cube Visual Layers */}
          <div
            className="p-5 rounded-xl border flex flex-col items-center justify-center space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-purple-700 dark:text-purple-300">
              <span>{cubeBase} wide</span> × <span>{cubeBase} deep</span> × <span>{cubeBase} high</span> ={' '}
              <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-extrabold text-sm">
                {cubeBase * cubeBase * cubeBase} 3D Cubes
              </span>
            </div>

            {/* Showing the layers stacked */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Array.from({ length: cubeBase }).map((_, layerIdx) => (
                <div key={layerIdx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-stone-400">Layer {layerIdx + 1}</span>
                  <div
                    className="grid gap-1 p-2 rounded-lg border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30"
                    style={{
                      gridTemplateColumns: `repeat(${cubeBase}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: cubeBase * cubeBase }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        className="w-6 h-6 rounded bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs"
                      >
                        {layerIdx * (cubeBase * cubeBase) + bIdx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 text-center max-w-md">
              Each layer contains {cubeBase * cubeBase} flat tiles. With {cubeBase} layers stacked on top of each other, the total is {cubeBase} × {cubeBase * cubeBase} = {cubeBase * cubeBase * cubeBase} unit cubes!
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: FACTORS VS MULTIPLES */}
      {activeTab === 'factors' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-xs sm:text-sm leading-relaxed text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3">
            <div>
              <span className="font-extrabold block text-emerald-700 dark:text-emerald-300 mb-1">
                🍫 The Golden Difference: Factors vs Multiples
              </span>
              Remember the rhyme: <strong>"Factors fit inside, Multiples jump outside!"</strong> Factors are the few whole numbers that divide evenly into a number without remainders. Multiples are the endless times table footsteps jumping forward forever!
            </div>
            <button
              type="button"
              onClick={() => handleSpeak(
                "Factors fit inside, Multiples jump outside! Factors are the small building blocks that divide into a number with no remainders. Multiples are the giant footsteps that jump forward along the times table line into infinity."
              )}
              className="px-2.5 py-1.5 rounded-lg border bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
            >
              <Volume2 size={14} />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>

          {/* Factor Rainbow Explorer */}
          <div className="p-4 rounded-xl border bg-black/5 dark:bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Explore Factor Rainbow for:
              </span>
              <div className="flex items-center gap-1.5">
                {[12, 24, 36, 48].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setRainbowTarget(t);
                      playSound('click');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      rainbowTarget === t
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                        : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Rainbow Pairs Display */}
            <div
              className="p-4 rounded-xl border space-y-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
              }}
            >
              <span className="text-xs font-bold text-stone-500 block">
                Factor Pairs multiplying to {rainbowTarget}:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(() => {
                  const pairs: [number, number][] = [];
                  for (let i = 1; i <= Math.sqrt(rainbowTarget); i++) {
                    if (rainbowTarget % i === 0) {
                      pairs.push([i, rainbowTarget / i]);
                    }
                  }
                  return pairs.map(([a, b], idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-center justify-between text-xs"
                    >
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-300">
                        {a} × {b} = {rainbowTarget}
                      </span>
                      {a === b && (
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-white">
                          Square!
                        </span>
                      )}
                    </div>
                  ));
                })()}
              </div>

              <div className="pt-2 text-xs text-stone-600 dark:text-stone-400">
                <strong>Multiples of {rainbowTarget}:</strong> {rainbowTarget}, {rainbowTarget * 2},{' '}
                {rainbowTarget * 3}, {rainbowTarget * 4}, {rainbowTarget * 5}, {rainbowTarget * 6}... (jumping infinitely!)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
