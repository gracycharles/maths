'use client';

import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Sparkles, Check, X, ArrowRight, RefreshCw, AlertTriangle, Box, Grid } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import { WhiteboardType } from '../../data/videoLessons/types';

interface ExpandedWhiteboardScenesProps {
  type: WhiteboardType;
  currentTime?: number;
}

export const ExpandedWhiteboardScenes: React.FC<ExpandedWhiteboardScenesProps> = ({
  type,
  currentTime = 0,
}) => {
  // Local state for interactive explorations (declared at top level to ensure consistent React hook execution order)
  const [selectedPrimeTestNum, setSelectedPrimeTestNum] = useState<number>(7);
  const [attemptedRows, setAttemptedRows] = useState<number>(2);
  const [selectedSquareN, setSelectedSquareN] = useState<number>(4);
  const [selectedCubeN, setSelectedCubeN] = useState<number>(3);
  const [balanceStep, setBalanceStep] = useState<number>(1);
  const [metricUnit, setMetricUnit] = useState<'km' | 'm' | 'cm'>('m');
  const [fdpShadedCount, setFdpShadedCount] = useState<number>(50);
  const [targetVal, setTargetVal] = useState<number>(80);
  const [activeBlocks, setActiveBlocks] = useState<{ id: string; pct: number; label: string }[]>([
    { id: '1', pct: 10, label: '10%' },
    { id: '2', pct: 5, label: '5%' },
  ]);
  const [exampleIdx, setExampleIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shiftFactor, setShiftFactor] = useState<number>(100);
  const [startTemp, setStartTemp] = useState<number>(2);
  const [dropAmount, setDropAmount] = useState<number>(5);
  const [people, setPeople] = useState<number>(10);

  // Dedicated interactive states for Place Value, Rounding, Shift & Negatives
  const [pvExampleId, setPvExampleId] = useState<'large' | 'decimal' | 'zero'>('large');
  const [selectedPvCol, setSelectedPvCol] = useState<number>(1); // default highlight 7 in hundred thousands
  const [roundingExampleId, setRoundingExampleId] = useState<number>(0);
  const [shiftBaseNum, setShiftBaseNum] = useState<number>(3.4);
  const [negScenarioId, setNegScenarioId] = useState<number>(0);

  // Dedicated interactive states for all other scenes
  const [ratioScenarioIdx, setRatioScenarioIdx] = useState<number>(0);
  const [squashRatioIdx, setSquashRatioIdx] = useState<number>(0);
  const [recipeType, setRecipeType] = useState<'pancakes' | 'cupcakes'>('pancakes');
  const [diffScenarioIdx, setDiffScenarioIdx] = useState<number>(0);
  const [bracketsExIdx, setBracketsExIdx] = useState<number>(0);
  const [leftRightExIdx, setLeftRightExIdx] = useState<number>(0);
  const [bidmasExIdx, setBidmasExIdx] = useState<number>(0);
  const [algebraExIdx, setAlgebraExIdx] = useState<number>(0);
  const [metricTab, setMetricTab] = useState<'length' | 'mass' | 'capacity'>('length');
  const [pavShapeIdx, setPavShapeIdx] = useState<number>(0);
  const [angleTypeIdx, setAngleTypeIdx] = useState<number>(0);
  const [coordPointIdx, setCoordPointIdx] = useState<number>(0);
  const [romanTab, setRomanTab] = useState<'symbols' | 'subtractive' | 'years'>('symbols');
  const [avgDatasetIdx, setAvgDatasetIdx] = useState<number>(0);
  const [wpScenarioIdx, setWpScenarioIdx] = useState<number>(0);
  const [wpStepActive, setWpStepActive] = useState<number>(3);

  switch (type) {
    /* ----------------------------------------------------
     * 1. PRIME TILE RECTANGLE TEST
     * ---------------------------------------------------- */
    case 'prime_tile_test': {
      const q = Math.floor(selectedPrimeTestNum / attemptedRows);
      const rem = selectedPrimeTestNum % attemptedRows;
      const isPrime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].includes(selectedPrimeTestNum);

      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-amber-700 dark:text-amber-300">
              The Tile Rectangle Test: Can {selectedPrimeTestNum} tiles make equal rectangular rows?
            </span>
            <span className="font-medium text-amber-900 dark:text-amber-200">
              Try different rows below to see if any tiles get left out!
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Pick tiles:</span>
              {[6, 7, 8, 9, 12, 13, 15, 16, 17].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setSelectedPrimeTestNum(n);
                    setAttemptedRows(2);
                    playSound('click');
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: selectedPrimeTestNum === n ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                    color: selectedPrimeTestNum === n ? 'var(--accent-contrast)' : 'var(--text-primary)',
                    borderColor: selectedPrimeTestNum === n ? 'var(--accent-primary)' : 'var(--border-card)',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Rows:</span>
              {[1, 2, 3, 4].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setAttemptedRows(r);
                    playSound(selectedPrimeTestNum % r === 0 ? 'correct' : 'wrong');
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: attemptedRows === r ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                    color: attemptedRows === r ? 'var(--accent-contrast)' : 'var(--text-primary)',
                    borderColor: attemptedRows === r ? 'var(--accent-primary)' : 'var(--border-card)',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Tile Grid */}
          <div
            className="p-4 rounded-xl border flex flex-col items-center justify-center min-h-[140px] gap-2 shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div className="space-y-1.5">
              {Array.from({ length: attemptedRows }).map((_, rIdx) => {
                const rowCount = q + (rIdx < rem ? 1 : 0);
                return (
                  <div key={rIdx} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono w-10 text-right" style={{ color: 'var(--text-muted)' }}>R{rIdx + 1}:</span>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: rowCount }).map((_, cIdx) => {
                        const isStickingOut = rIdx < rem && cIdx === rowCount - 1 && q > 0;
                        return (
                          <div
                            key={cIdx}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs font-black shadow-2xs transition-all ${
                              isStickingOut ? 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-400' : ''
                            }`}
                            style={isStickingOut ? undefined : {
                              backgroundColor: 'var(--accent-primary)',
                              color: 'var(--accent-contrast)',
                            }}
                          >
                            {rIdx * q + cIdx + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verdict */}
            <div className="mt-3 pt-3 border-t w-full text-center text-xs sm:text-sm font-extrabold" style={{ borderColor: 'var(--border-card)' }}>
              {rem === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  ✓ Perfect Rectangle! {selectedPrimeTestNum} can be arranged into {attemptedRows} equal rows of {q}!
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400">
                  ✗ Unequal! {rem} leftover tile{rem > 1 ? 's' : ''} sticking out. Cannot make an equal rectangle!
                </span>
              )}
            </div>
          </div>

          <div
            className="p-3 rounded-xl border text-xs"
            style={{
              backgroundColor: 'var(--reading-highlight-bg)',
              borderColor: 'var(--accent-primary)',
              color: 'var(--text-primary)',
            }}
          >
            <strong>Teacher Key Insight:</strong> {selectedPrimeTestNum} {isPrime ? 'is a PRIME NUMBER because it only ever forms a 1-row stick (1 × ' + selectedPrimeTestNum + ')!' : 'is a COMPOSITE NUMBER because it forms equal rectangular rows!'}
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 2. SQUARE NUMBER GRID
     * ---------------------------------------------------- */
    case 'square_number_grid':
      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 flex items-center justify-between text-xs">
            <span className="font-extrabold text-blue-700 dark:text-blue-300">
              Geometric Square Array: Side × Side = Area
            </span>
            <span className="font-medium text-blue-900 dark:text-blue-200">
              Width and Height are identical!
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Pick Square:</span>
            {[2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setSelectedSquareN(n);
                  playSound('click');
                }}
                className="px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                style={{
                  backgroundColor: selectedSquareN === n ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  color: selectedSquareN === n ? 'var(--accent-contrast)' : 'var(--text-primary)',
                  borderColor: selectedSquareN === n ? 'var(--accent-primary)' : 'var(--border-card)',
                }}
              >
                {n}² = {n * n}
              </button>
            ))}
          </div>

          <div
            className="p-4 rounded-xl border flex flex-col items-center justify-center shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <span className="text-xs font-black mb-2" style={{ color: 'var(--accent-primary)' }}>
              {selectedSquareN} wide × {selectedSquareN} high = {selectedSquareN * selectedSquareN} tiles (Square!)
            </span>
            <div
              className="grid gap-1.5 p-3 rounded-xl border-2 shadow-sm"
              style={{
                gridTemplateColumns: `repeat(${selectedSquareN}, minmax(0, 1fr))`,
                borderColor: 'var(--accent-primary)',
                backgroundColor: 'var(--bg-card-subtle)',
              }}
            >
              {Array.from({ length: selectedSquareN * selectedSquareN }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs font-bold shadow-2xs"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-contrast)',
                  }}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-2.5 rounded-lg border text-xs w-full text-center"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-secondary)',
              }}
            >
              <strong>Why Square Numbers have an ODD number of factors:</strong> The center factor ({selectedSquareN} × {selectedSquareN}) pairs with itself and is only listed once!
            </div>
          </div>
        </div>
      );

    /* ----------------------------------------------------
     * 3. CUBE 3D BLOCKS
     * ---------------------------------------------------- */
    case 'cube_3d_blocks':
      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-purple-500/10 border-purple-500/20 flex items-center justify-between text-xs">
            <span className="font-extrabold text-purple-700 dark:text-purple-300">
              Cube Numbers (3D): Length × Width × Height
            </span>
            <span className="font-medium text-purple-900 dark:text-purple-200">
              Solid 3D Rubik's blocks!
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Pick Cube:</span>
            {[1, 2, 3, 4].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setSelectedCubeN(c);
                  playSound('click');
                }}
                className="px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                style={{
                  backgroundColor: selectedCubeN === c ? 'var(--accent-primary)' : 'var(--bg-card-subtle)',
                  color: selectedCubeN === c ? 'var(--accent-contrast)' : 'var(--text-primary)',
                  borderColor: selectedCubeN === c ? 'var(--accent-primary)' : 'var(--border-card)',
                }}
              >
                {c}³ = {c * c * c}
              </button>
            ))}
          </div>

          <div
            className="p-4 rounded-xl border flex flex-col items-center justify-center space-y-3 shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <span className="text-xs sm:text-sm font-black" style={{ color: 'var(--accent-primary)' }}>
              {selectedCubeN} wide × {selectedCubeN} deep × {selectedCubeN} high = {selectedCubeN * selectedCubeN * selectedCubeN} Cubes
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {Array.from({ length: selectedCubeN }).map((_, lIdx) => (
                <div key={lIdx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>Layer {lIdx + 1}</span>
                  <div
                    className="grid gap-1 p-1.5 rounded-lg border"
                    style={{
                      gridTemplateColumns: `repeat(${selectedCubeN}, minmax(0, 1fr))`,
                      backgroundColor: 'var(--bg-card-subtle)',
                      borderColor: 'var(--border-card-strong)',
                    }}
                  >
                    {Array.from({ length: selectedCubeN * selectedCubeN }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shadow-2xs"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--accent-contrast)',
                        }}
                      >
                        {lIdx * (selectedCubeN * selectedCubeN) + bIdx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    /* ----------------------------------------------------
     * 4. FACTOR RAINBOW BOARD
     * ---------------------------------------------------- */
    case 'factor_rainbow_board':
      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20 flex items-center justify-between text-xs">
            <span className="font-extrabold text-emerald-700 dark:text-emerald-300">
              Factor Rainbow for 12: Paired from Outside In
            </span>
            <span className="font-medium text-emerald-900 dark:text-emerald-200">
              Zero remainders or crumbs!
            </span>
          </div>

          <div
            className="p-4 rounded-xl border space-y-4 shadow-2xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div
              className="flex items-center justify-around py-3 px-4 rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card-strong)',
              }}
            >
              {[
                { num: 1, pair: 12, color: 'text-rose-500 border-rose-400' },
                { num: 2, pair: 6, color: 'text-amber-500 border-amber-400' },
                { num: 3, pair: 4, color: 'text-emerald-500 border-emerald-400' },
                { num: 4, pair: 3, color: 'text-emerald-500 border-emerald-400' },
                { num: 6, pair: 2, color: 'text-amber-500 border-amber-400' },
                { num: 12, pair: 1, color: 'text-rose-500 border-rose-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs ${item.color}`}
                    style={{ backgroundColor: 'var(--bg-card)' }}>
                    {item.num}
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>× {item.pair}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                className="p-2 rounded-lg border font-bold"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                1 × 12 = 12
              </div>
              <div
                className="p-2 rounded-lg border font-bold"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                2 × 6 = 12
              </div>
              <div
                className="p-2 rounded-lg border font-bold"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                3 × 4 = 12
              </div>
            </div>
          </div>
        </div>
      );

    /* ----------------------------------------------------
     * 5. PLACE VALUE HOUSES (The Place Value Hotel Masterclass)
     * ---------------------------------------------------- */
    case 'place_value_houses': {
      const pvData = {
        large: {
          title: 'Large Numbers: 3,745,219',
          subtitle: 'From Millions down to Ones',
          columns: [
            { title: 'Millions', digit: '3', value: '3,000,000', power: '10⁶', desc: 'Three million' },
            { title: 'Hundred Th.', digit: '7', value: '700,000', power: '10⁵', desc: 'Seven hundred thousand' },
            { title: 'Ten Th.', digit: '4', value: '40,000', power: '10⁴', desc: 'Forty thousand' },
            { title: 'Thousands', digit: '5', value: '5,000', power: '10³', desc: 'Five thousand' },
            { title: 'Hundreds', digit: '2', value: '200', power: '10²', desc: 'Two hundred' },
            { title: 'Tens', digit: '1', value: '10', power: '10¹', desc: 'One ten' },
            { title: 'Ones', digit: '9', value: '9', power: '10⁰', desc: 'Nine units' },
          ],
          expanded: '3,000,000 + 700,000 + 40,000 + 5,000 + 200 + 10 + 9 = 3,745,219',
        },
        decimal: {
          title: 'Decimals: 24.685',
          subtitle: 'Tens, Ones & Fractional Tenths, Hundredths, Thousandths',
          columns: [
            { title: 'Tens', digit: '2', value: '20', power: '10¹', desc: 'Two tens' },
            { title: 'Ones', digit: '4', value: '4', power: '10⁰', desc: 'Four ones' },
            { title: '• POINT •', digit: '•', value: 'Anchored', power: 'Fixed', desc: 'Fixed Decimal Anchor' },
            { title: 'Tenths', digit: '6', value: '0.6', power: '1/10', desc: 'Six tenths (6/10)' },
            { title: 'Hundredths', digit: '8', value: '0.08', power: '1/100', desc: 'Eight hundredths (8/100)' },
            { title: 'Thousandths', digit: '5', value: '0.005', power: '1/1000', desc: 'Five thousandths (5/1000)' },
          ],
          expanded: '20 + 4 + 0.6 + 0.08 + 0.005 = 24.685',
        },
        zero: {
          title: 'Zero Placeholder Trap: 4,052 vs 452',
          subtitle: 'Why zero is the superhero that keeps digits in their correct rooms',
          columns: [
            { title: 'Thousands', digit: '4', value: '4,000', power: '10³', desc: 'Four thousand' },
            { title: 'Hundreds', digit: '0', value: '0', power: '10²', desc: 'Zero placeholder superhero!' },
            { title: 'Tens', digit: '5', value: '50', power: '10¹', desc: 'Five tens (50)' },
            { title: 'Ones', digit: '2', value: '2', power: '10⁰', desc: 'Two ones' },
          ],
          expanded: '4,000 + 0 + 50 + 2 = 4,052 (Without 0, 4 becomes 400 in 452!)',
        },
      };

      const currentDataset = pvData[pvExampleId];
      const activeCol = currentDataset.columns[Math.min(selectedPvCol, currentDataset.columns.length - 1)] || currentDataset.columns[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-sky-500/10 border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-sky-700 dark:text-sky-300">
              🏨 The Grand Place Value Hotel (Base-10 System)
            </span>
            <span className="font-medium text-sky-900 dark:text-sky-200">
              Step Left = 10× Bigger | Step Right = 10× Smaller (÷10)
            </span>
          </div>

          {/* Interactive Example Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'large' as const, label: 'Millions: 3,745,219' },
              { id: 'decimal' as const, label: 'Decimals: 24.685' },
              { id: 'zero' as const, label: 'Zero Placeholder: 4,052 vs 452' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setPvExampleId(tab.id);
                  setSelectedPvCol(1);
                  playSound('click');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  pvExampleId === tab.id
                    ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Hotel Rooms / Columns */}
          <div
            className="p-3.5 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="text-center text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {currentDataset.subtitle} — <span className="font-bold text-sky-600 dark:text-sky-400">Tap any room to inspect its value!</span>
            </div>

            <div className={`grid gap-1.5 text-center ${currentDataset.columns.length > 6 ? 'grid-cols-4 sm:grid-cols-7' : 'grid-cols-4 sm:grid-cols-6'}`}>
              {currentDataset.columns.map((col, idx) => {
                const isSelected = idx === selectedPvCol;
                const isDecimalPoint = col.digit === '•';

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPvCol(idx);
                      playSound('click');
                    }}
                    className={`p-2 rounded-xl border transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-400'
                        : isDecimalPoint
                        ? 'bg-amber-500/15 border-amber-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <span className="text-[10px] font-bold block truncate" style={{ color: 'var(--text-muted)' }}>
                      {col.title}
                    </span>
                    <span className={`text-base sm:text-lg font-black block my-0.5 ${
                      isDecimalPoint ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'
                    }`}>
                      {col.digit}
                    </span>
                    <span className="text-[9px] font-mono block opacity-75" style={{ color: 'var(--text-secondary)' }}>
                      {col.power}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Column Inspector Card */}
            <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <span className="font-extrabold text-sky-800 dark:text-sky-200">
                  Room: {activeCol.title} (Digit: {activeCol.digit})
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  Worth: <strong className="text-sky-600 dark:text-sky-400 font-mono text-sm">{activeCol.value}</strong> ({activeCol.desc})
                </p>
              </div>
              <div className="text-[11px] font-mono font-bold bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300">
                {activeCol.power} column
              </div>
            </div>

            {/* Expanded Form Equation */}
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono text-[11px] sm:text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">Expanded Form:</span>
              <span className="text-slate-800 dark:text-slate-100 font-semibold">{currentDataset.expanded}</span>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 6. ROUNDING MOUNTAIN (Interactive Rollercoaster Masterclass)
     * ---------------------------------------------------- */
    case 'rounding_mountain': {
      const roundingExamples = [
        {
          target: 'Nearest 10',
          original: '84',
          targetCol: 'Tens (8)',
          neighborDigit: 4,
          direction: 'down',
          result: '80',
          rule: '4 is on the left slope ➔ rolls back down to 80 ("Stay at Rest")!',
          workedText: 'Underline 8 tens, circle 4 ones. 4 ≤ 4 so tens stays 8: 80.',
        },
        {
          target: 'Nearest 10',
          original: '87',
          targetCol: 'Tens (8)',
          neighborDigit: 7,
          direction: 'up',
          result: '90',
          rule: '7 is on the right slope ➔ zooms over peak 5 to 90 ("Raise the Score")!',
          workedText: 'Underline 8 tens, circle 7 ones. 7 ≥ 5 so 8 climbs to 9 tens: 90.',
        },
        {
          target: 'Nearest 100',
          original: '348',
          targetCol: 'Hundreds (3)',
          neighborDigit: 4,
          direction: 'down',
          result: '300',
          rule: 'Tens digit is 4 ➔ rolls back down to 300.',
          workedText: 'Underline 3 hundreds, circle 4 tens. 4 < 5 so hundreds stays 3: 300.',
        },
        {
          target: 'Nearest 100',
          original: '352',
          targetCol: 'Hundreds (3)',
          neighborDigit: 5,
          direction: 'up',
          result: '400',
          rule: 'Tens digit is 5 ➔ 5 is on the peak! Climbs over to 400 ("Raise the Score")!',
          workedText: 'Underline 3 hundreds, circle 5 tens. 5 ≥ 5 so 3 hundreds climbs to 4: 400.',
        },
        {
          target: 'Nearest 1,000',
          original: '4,500',
          targetCol: 'Thousands (4)',
          neighborDigit: 5,
          direction: 'up',
          result: '5,000',
          rule: 'Hundreds digit is 5 ➔ exactly on the peak summit! Rounds UP to 5,000.',
          workedText: 'Underline 4 thousands, circle 5 hundreds. 5 ≥ 5 so 4 thousands becomes 5,000.',
        },
        {
          target: 'Nearest Whole Number',
          original: '7.6',
          targetCol: 'Units (7)',
          neighborDigit: 6,
          direction: 'up',
          result: '8',
          rule: 'Tenths digit is 6 ➔ 6 is past the peak! Rounds up to whole number 8.',
          workedText: 'Underline 7 ones, circle 6 tenths. 6 ≥ 5 so 7 rounds up to 8.',
        },
        {
          target: 'The Domino 9',
          original: '996 (to 10)',
          targetCol: 'Tens (9)',
          neighborDigit: 6,
          direction: 'up',
          result: '1,000',
          rule: '6 rounds up 9 tens to 10 tens (100). That cascades into thousands to make 1,000!',
          workedText: 'Deciding digit is 6. 9 + 1 = 10, carrying over into hundreds and thousands: 1,000!',
        },
      ];

      const curEx = roundingExamples[roundingExampleId] || roundingExamples[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-amber-700 dark:text-amber-300">
              🎢 The Rounding Mountain Rollercoaster
            </span>
            <span className="font-medium text-amber-900 dark:text-amber-200">
              0, 1, 2, 3, 4 Roll Back | 5, 6, 7, 8, 9 Zoom Forward!
            </span>
          </div>

          {/* Interactive Example Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {roundingExamples.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setRoundingExampleId(idx);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  roundingExampleId === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {ex.original} ({ex.target})
              </button>
            ))}
          </div>

          {/* Mountain Rollercoaster Stage */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Active Example Callout */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Round {curEx.original} to {curEx.target}:</span>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                  Target: {curEx.targetCol} ➔ Deciding Neighbor: <span className="underline decoration-2">{curEx.neighborDigit}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 dark:text-slate-300 font-bold">Outcome:</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                  curEx.direction === 'up'
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                    : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-400'
                }`}>
                  {curEx.original} ➔ {curEx.result} ({curEx.direction === 'up' ? '▲ Round UP' : '▼ Round DOWN'})
                </span>
              </div>
            </div>

            {/* Rollercoaster Slopes Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center items-stretch">
              {/* Left Slope: 0-4 Roll Down */}
              <div className={`p-3 rounded-xl border transition-all ${
                curEx.direction === 'down'
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 ring-2 ring-rose-400'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  Slope 1: Roll Down (Stay at Rest)
                </span>
                <div className="text-lg font-black text-rose-600 dark:text-rose-400 my-1">
                  0, 1, 2, 3, 4
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Not enough power to reach summit! Cart rolls back down to lower benchmark.
                </p>
                {curEx.direction === 'down' && (
                  <div className="mt-2 text-[10px] font-bold py-1 px-2 rounded bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200">
                    🛒 Cart rolls down to {curEx.result}
                  </div>
                )}
              </div>

              {/* Peak Summit: 5 */}
              <div className="p-3 rounded-xl border bg-amber-50 dark:bg-amber-950/30 border-amber-400 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">▲</span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                  Summit Peak: 5
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  Reaching 5 means you crest the top and plunge forward into the next column!
                </p>
              </div>

              {/* Right Slope: 5-9 Zoom Up */}
              <div className={`p-3 rounded-xl border transition-all ${
                curEx.direction === 'up'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 ring-2 ring-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Slope 2: Zoom Up (Raise the Score)
                </span>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 my-1">
                  5, 6, 7, 8, 9
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Gravity takes over! Cart accelerates down the far side to the higher benchmark.
                </p>
                {curEx.direction === 'up' && (
                  <div className="mt-2 text-[10px] font-bold py-1 px-2 rounded bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    🚀 Cart zooms forward to {curEx.result}
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-step Rule Box */}
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <span className="font-extrabold text-amber-600">The 3-Step Golden Rule:</span>
              <span>1. Underline target column. 2. Circle neighbor immediately right. 3. 4 or less roll back, 5 or more raise the score!</span>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 7. FDP 100-GRID BOARD (The FDP Trinity Masterclass)
     * ---------------------------------------------------- */
    case 'fdp_grid_board': {
      const fdpBenchmarks = [
        { label: '10% (Tenth)', val: 10, frac: '1/10', dec: '0.10', desc: '1 strip of 10 squares' },
        { label: '20% (Fifth)', val: 20, frac: '1/5', dec: '0.20', desc: '2 strips of 10 squares' },
        { label: '25% (Quarter)', val: 25, frac: '1/4', dec: '0.25', desc: '1 quadrant (quarter of whole)' },
        { label: '50% (Half)', val: 50, frac: '1/2', dec: '0.50', desc: 'Half the chocolate bar' },
        { label: '75% (Three-Quarters)', val: 75, frac: '3/4', dec: '0.75', desc: '3 quarters of the whole' },
        { label: '80% (Four-Fifths)', val: 80, frac: '4/5', dec: '0.80', desc: '4 fifths of the whole' },
        { label: '100% (Whole)', val: 100, frac: '1/1', dec: '1.00', desc: 'Entire 100-square grid' },
      ];

      const currentBench = fdpBenchmarks.find((b) => b.val === fdpShadedCount) || {
        label: `${fdpShadedCount}%`,
        val: fdpShadedCount,
        frac: `${fdpShadedCount}/100`,
        dec: (fdpShadedCount / 100).toFixed(2),
        desc: `${fdpShadedCount} squares out of 100`,
      };

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-teal-700 dark:text-teal-300">
              🍫 The 100-Square Grid: Fractions, Decimals &amp; Percentages (FDP Trinity)
            </span>
            <span className="font-medium text-teal-900 dark:text-teal-200">
              "Per Cent" = Out of 100 (Latin: <em>per centum</em>)
            </span>
          </div>

          {/* Benchmark Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {fdpBenchmarks.map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() => {
                  setFdpShadedCount(b.val);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  fdpShadedCount === b.val
                    ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Interactive Grid & Side-by-Side Equivalence Card */}
          <div
            className="p-4 rounded-xl border flex flex-col md:flex-row items-center justify-around gap-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* 10x10 Interactive Grid */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="grid grid-cols-10 gap-1 p-2 rounded-xl border shadow-inner bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
              >
                {Array.from({ length: 100 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFdpShadedCount(idx + 1);
                      playSound('click');
                    }}
                    title={`Square ${idx + 1}`}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] transition-all cursor-pointer ${
                      idx < fdpShadedCount
                        ? 'bg-teal-500 border border-teal-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-teal-100'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Click any square or use presets to change shaded amount ({fdpShadedCount} / 100)
              </span>
            </div>

            {/* Equivalent Values Card */}
            <div className="w-full md:w-1/2 space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between">
                <span className="font-bold text-teal-800 dark:text-teal-200">Percentage:</span>
                <span className="font-mono font-black text-lg text-teal-600 dark:text-teal-400">
                  {fdpShadedCount}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
                <span className="font-bold text-sky-800 dark:text-sky-200">Decimal (÷ 100):</span>
                <span className="font-mono font-black text-lg text-sky-600 dark:text-sky-400">
                  {(fdpShadedCount / 100).toFixed(2)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <span className="font-bold text-amber-800 dark:text-amber-200">Fraction:</span>
                <span className="font-mono font-black text-lg text-amber-600 dark:text-amber-400">
                  {fdpShadedCount}/100 {currentBench.frac !== `${fdpShadedCount}/100` && `= ${currentBench.frac}`}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Meaning:</strong> {currentBench.desc} out of 100 parts total.
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 8. RATIO BAR BOARD (Singapore Bar Sharing Masterclass)
     * ---------------------------------------------------- */
    case 'ratio_bar_board': {
      const ratioScenarios = [
        {
          title: 'Share £35 between Maya & Liam in ratio 2:3',
          total: 35,
          unit: '£',
          parts: [
            { name: 'Maya', count: 2, color: 'bg-sky-500', text: 'text-sky-700 dark:text-sky-300' },
            { name: 'Liam', count: 3, color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300' },
          ],
        },
        {
          title: 'Share 40 sweets between Alex & Ben in ratio 1:3',
          total: 40,
          unit: 'sweets',
          parts: [
            { name: 'Alex', count: 1, color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
            { name: 'Ben', count: 3, color: 'bg-purple-500', text: 'text-purple-700 dark:text-purple-300' },
          ],
        },
        {
          title: 'Share 48 stickers between Sam & Priya in ratio 3:5',
          total: 48,
          unit: 'stickers',
          parts: [
            { name: 'Sam', count: 3, color: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-300' },
            { name: 'Priya', count: 5, color: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300' },
          ],
        },
        {
          title: 'Three-Way Share: 60 marbles among Tom, Lily & Jack in ratio 1:2:3',
          total: 60,
          unit: 'marbles',
          parts: [
            { name: 'Tom', count: 1, color: 'bg-cyan-500', text: 'text-cyan-700 dark:text-cyan-300' },
            { name: 'Lily', count: 2, color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300' },
            { name: 'Jack', count: 3, color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
          ],
        },
      ];

      const currentScenario = ratioScenarios[ratioScenarioIdx] || ratioScenarios[0];
      const totalRatioParts = currentScenario.parts.reduce((sum, p) => sum + p.count, 0);
      const onePartValue = currentScenario.total / totalRatioParts;

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Summary */}
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-amber-800 dark:text-amber-200">
              📊 The 3-Step Bar Model: Sharing into Ratios
            </span>
            <span className="font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
              1 Part = {currentScenario.unit === '£' ? `£${onePartValue}` : `${onePartValue} ${currentScenario.unit}`}
            </span>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {ratioScenarios.map((scen, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setRatioScenarioIdx(idx);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  ratioScenarioIdx === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {scen.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Visual Bar Model Card */}
          <div
            className="p-4 sm:p-5 rounded-2xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="text-center font-bold text-xs text-slate-600 dark:text-slate-300">
              {currentScenario.title}
            </div>

            {/* Individual Person Rows */}
            <div className="space-y-3">
              {currentScenario.parts.map((p, pIdx) => {
                const personTotal = p.count * onePartValue;
                return (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className={p.text}>
                        {p.name} ({p.count} part{p.count > 1 ? 's' : ''}):
                      </span>
                      <span className="font-mono text-sm">
                        {p.count} × {currentScenario.unit === '£' ? `£${onePartValue}` : onePartValue} ={' '}
                        <strong className="text-amber-600 dark:text-amber-400">
                          {currentScenario.unit === '£' ? `£${personTotal}` : `${personTotal} ${currentScenario.unit}`}
                        </strong>
                      </span>
                    </div>

                    {/* Bar Blocks */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {Array.from({ length: p.count }).map((_, bIdx) => (
                        <div
                          key={bIdx}
                          className={`px-3 py-2 rounded-lg text-white font-mono font-black text-xs shadow-xs flex items-center justify-center ${p.color}`}
                        >
                          {currentScenario.unit === '£' ? `£${onePartValue}` : onePartValue}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3-Step Recipe Box */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800">
                <span className="font-extrabold block text-amber-700 dark:text-amber-300">Step 1: Add Parts</span>
                <span className="font-mono text-[11px]">{currentScenario.parts.map((p) => p.count).join(' + ')} = {totalRatioParts} parts</span>
              </div>
              <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800">
                <span className="font-extrabold block text-amber-700 dark:text-amber-300">Step 2: Divide Total</span>
                <span className="font-mono text-[11px]">{currentScenario.total} ÷ {totalRatioParts} = {onePartValue} (1 part)</span>
              </div>
              <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800">
                <span className="font-extrabold block text-amber-700 dark:text-amber-300">Step 3: Multiply Each</span>
                <span className="font-mono text-[11px]">Parts × {onePartValue} = Each share</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 9. BIDMAS PRIORITY BOARD (The VIP Order of Operations)
     * ---------------------------------------------------- */
    case 'bidmas_priority_board': {
      const bidmasExamples = [
        {
          title: 'Ex 1: Multiplication outranks Addition',
          expression: '2 + 3 × 4',
          step1: 'Step 1: Multiply first (3 × 4 = 12)',
          step2: 'Step 2: Add 2 (2 + 12 = 14)',
          result: '14',
          trap: 'Trap: Doing 2 + 3 = 5 first gives 5 × 4 = 20 (WRONG without brackets!)',
          rankHighlight: 'multiply',
        },
        {
          title: 'Ex 2: VIP Brackets & Indices (Powers)',
          expression: '(6 + 4) ÷ 2 + 3²',
          step1: 'Step 1: VIP Brackets: (6 + 4 = 10)',
          step2: 'Step 2: Indices: 3² = 9 ➔ 10 ÷ 2 + 9',
          step3: 'Step 3: Division outranks addition: 10 ÷ 2 = 5 ➔ 5 + 9 = 14',
          result: '14',
          trap: 'Never add before dividing!',
          rankHighlight: 'brackets',
        },
        {
          title: 'Ex 3: Addition does NOT outrank Subtraction',
          expression: '20 − 4 × 3 + 5',
          step1: 'Step 1: Multiply first: 4 × 3 = 12 ➔ 20 − 12 + 5',
          step2: 'Step 2: Subtract & Add are equal rank! Go LEFT to RIGHT: 20 − 12 = 8',
          step3: 'Step 3: 8 + 5 = 13',
          result: '13',
          trap: 'Trap: Adding 12 + 5 = 17 first gives 20 − 17 = 3 (WRONG!)',
          rankHighlight: 'add_sub',
        },
        {
          title: 'Ex 4: Division & Multiplication Tie-Breaker',
          expression: '24 ÷ 6 × 2',
          step1: 'Step 1: ÷ and × have equal priority rank',
          step2: 'Step 2: Tie-breaker rule: Work strictly LEFT TO RIGHT!',
          step3: 'Step 3: 24 ÷ 6 = 4, then 4 × 2 = 8',
          result: '8',
          trap: 'Trap: Doing 6 × 2 = 12 first gives 24 ÷ 12 = 2 (WRONG!)',
          rankHighlight: 'div_mult',
        },
      ];

      const currentEx = bidmasExamples[bidmasExIdx] || bidmasExamples[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-rose-800 dark:text-rose-200">
              👑 BIDMAS Priority Hierarchy: Order of Operations
            </span>
            <span className="font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300">
              Expression: {currentEx.expression} = {currentEx.result}
            </span>
          </div>

          {/* Example Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {bidmasExamples.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setBidmasExIdx(idx);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  bidmasExIdx === idx
                    ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {ex.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Interactive BIDMAS Ladder & Worked Card */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Priority Hierarchy Ladder */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div
                className={`p-2 rounded-lg font-black transition-all ${
                  currentEx.rankHighlight === 'brackets'
                    ? 'bg-purple-600 text-white ring-2 ring-purple-300 shadow-md scale-102'
                    : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                }`}
              >
                1. B: Brackets ()
                <span className="block text-[10px] font-normal">VIP: Do first!</span>
              </div>

              <div
                className={`p-2 rounded-lg font-black transition-all ${
                  currentEx.rankHighlight === 'brackets' && currentEx.expression.includes('²')
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-md scale-102'
                    : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                }`}
              >
                2. I: Indices (n²)
                <span className="block text-[10px] font-normal">Powers &amp; roots</span>
              </div>

              <div
                className={`p-2 rounded-lg font-black transition-all ${
                  currentEx.rankHighlight === 'multiply' || currentEx.rankHighlight === 'div_mult'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-300 shadow-md scale-102'
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                }`}
              >
                3. DM: Divide / Multiply
                <span className="block text-[10px] font-normal">Equal Rank (L ➔ R)</span>
              </div>

              <div
                className={`p-2 rounded-lg font-black transition-all ${
                  currentEx.rankHighlight === 'add_sub'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-md scale-102'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                }`}
              >
                4. AS: Add / Subtract
                <span className="block text-[10px] font-normal">Equal Rank (L ➔ R)</span>
              </div>
            </div>

            {/* Step-by-Step Resolution */}
            <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="text-center">
                <span className="font-mono text-lg font-black text-rose-600 dark:text-rose-400">
                  {currentEx.expression} = {currentEx.result}
                </span>
              </div>

              <div className="space-y-1 font-medium text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>{currentEx.step1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>{currentEx.step2}</span>
                </div>
                {currentEx.step3 && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>{currentEx.step3}</span>
                  </div>
                )}
              </div>

              {/* Watch out trap */}
              <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] text-red-700 dark:text-red-300 font-medium">
                ⚠️ <strong>Common SATs Pitfall:</strong> {currentEx.trap}
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 10. ALGEBRA BALANCE BOARD (Two-Pan Equation Scale)
     * ---------------------------------------------------- */
    case 'algebra_balance_board': {
      const algebraEquations = [
        {
          id: 0,
          eq: '2x + 3 = 11',
          boxes: 2,
          added: 3,
          rightTotal: 11,
          step1Op: 'Subtract 3 from both sides',
          step1Left: '2x',
          step1Right: '8',
          step2Op: 'Divide both sides by 2',
          ans: 'x = 4',
          check: '2(4) + 3 = 8 + 3 = 11 ✓',
        },
        {
          id: 1,
          eq: '3x − 5 = 16',
          boxes: 3,
          added: -5,
          rightTotal: 16,
          step1Op: 'Add 5 to both sides (inverse of −5)',
          step1Left: '3x',
          step1Right: '21',
          step2Op: 'Divide both sides by 3',
          ans: 'x = 7',
          check: '3(7) − 5 = 21 − 5 = 16 ✓',
        },
        {
          id: 2,
          eq: '4x + 6 = 30',
          boxes: 4,
          added: 6,
          rightTotal: 30,
          step1Op: 'Subtract 6 from both sides',
          step1Left: '4x',
          step1Right: '24',
          step2Op: 'Divide both sides by 4',
          ans: 'x = 6',
          check: '4(6) + 6 = 24 + 6 = 30 ✓',
        },
        {
          id: 3,
          eq: '5x = 45',
          boxes: 5,
          added: 0,
          rightTotal: 45,
          step1Op: 'No loose coins! Directly divide by 5',
          step1Left: 'x',
          step1Right: '9',
          step2Op: 'One gift box is unshielded!',
          ans: 'x = 9',
          check: '5(9) = 45 ✓',
        },
      ];

      const currentEq = algebraEquations[algebraExIdx] || algebraEquations[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div
            className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--contrast-amber)',
            }}
          >
            <span className="font-extrabold">
              ⚖️ Two-Pan Balancing Scale: Solve {currentEq.eq}
            </span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              Whatever you do to one side, you MUST do to the other!
            </span>
          </div>

          {/* Equation Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {algebraEquations.map((eqItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAlgebraExIdx(idx);
                  setBalanceStep(1);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  algebraExIdx === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {eqItem.eq}
              </button>
            ))}
          </div>

          {/* Balance Scale Stage */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Visual Balance Pans */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              {/* Left Pan */}
              <div
                className="text-center p-3 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--contrast-amber-border)',
                }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide block" style={{ color: 'var(--contrast-amber)' }}>
                  Left Pan
                </span>
                <div className="font-black font-mono text-base" style={{ color: 'var(--contrast-amber)' }}>
                  {balanceStep === 1 && (
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {Array.from({ length: currentEq.boxes }).map((_, b) => (
                        <span key={b} className="px-2 py-1 rounded bg-amber-500 text-white text-xs shadow-xs">
                          🎁 x
                        </span>
                      ))}
                      {currentEq.added !== 0 && (
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                          {currentEq.added > 0 ? `+ ${currentEq.added}` : `− ${Math.abs(currentEq.added)}`}
                        </span>
                      )}
                    </div>
                  )}
                  {balanceStep === 2 && (
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="font-bold">{currentEq.step1Left}</span>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">(isolated boxes)</span>
                    </div>
                  )}
                  {balanceStep === 3 && (
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      🎁 1 Box = {currentEq.ans.split('= ')[1]}
                    </div>
                  )}
                </div>
              </div>

              {/* Fulcrum / Equal Sign */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-mono font-black text-lg text-slate-700 dark:text-slate-200 shadow-inner">
                  =
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1">Level Fulcrum</span>
              </div>

              {/* Right Pan */}
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                  Right Pan
                </span>
                <div className="font-black font-mono text-base text-emerald-600 dark:text-emerald-400">
                  {balanceStep === 1 && <span>{currentEq.rightTotal} coins</span>}
                  {balanceStep === 2 && <span>{currentEq.step1Right} coins</span>}
                  {balanceStep === 3 && (
                    <span className="text-emerald-600 dark:text-emerald-400 text-lg">
                      {currentEq.ans.split('= ')[1]} coins per box!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setBalanceStep(1); playSound('click'); }}
                className={`px-3 py-1.5 rounded-lg font-bold border cursor-pointer transition-all ${
                  balanceStep === 1 ? 'bg-amber-600 text-white border-amber-700 shadow-xs' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                1. Initial Equation
              </button>
              <button
                type="button"
                onClick={() => { setBalanceStep(2); playSound('click'); }}
                className={`px-3 py-1.5 rounded-lg font-bold border cursor-pointer transition-all ${
                  balanceStep === 2 ? 'bg-amber-600 text-white border-amber-700 shadow-xs' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                2. {currentEq.step1Op}
              </button>
              <button
                type="button"
                onClick={() => { setBalanceStep(3); playSound('correct'); }}
                className={`px-3 py-1.5 rounded-lg font-bold border cursor-pointer transition-all ${
                  balanceStep === 3 ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                3. Final Answer ({currentEq.ans}!)
              </button>
            </div>

            {/* Check Proof */}
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-center">
              <strong>Detective Check:</strong> Substitute into original equation: {currentEq.check}
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 11. METRIC STAIRCASE BOARD (Length, Mass & Liquid Volume)
     * ---------------------------------------------------- */
    case 'metric_staircase_board': {
      const metricCategories = {
        length: {
          title: 'Length & Distance',
          steps: [
            { name: 'Kilometer (km)', sub: '1,000 m', factorDown: '× 1,000', toUnit: 'm' },
            { name: 'Meter (m)', sub: 'Base Unit', factorDown: '× 100', toUnit: 'cm' },
            { name: 'Centimeter (cm)', sub: '1/100 m', factorDown: '× 10', toUnit: 'mm' },
            { name: 'Millimeter (mm)', sub: '1/1,000 m', factorDown: 'Smallest', toUnit: '' },
          ],
          examples: [
            { from: '3.5 km', to: '3,500 m', rule: '3.5 × 1,000' },
            { from: '450 cm', to: '4.5 m', rule: '450 ÷ 100' },
            { from: '72 mm', to: '7.2 cm', rule: '72 ÷ 10' },
          ],
        },
        mass: {
          title: 'Mass & Weight',
          steps: [
            { name: 'Tonne (t)', sub: '1,000 kg', factorDown: '× 1,000', toUnit: 'kg' },
            { name: 'Kilogram (kg)', sub: '1,000 g', factorDown: '× 1,000', toUnit: 'g' },
            { name: 'Gram (g)', sub: 'Base Unit', factorDown: '× 1,000', toUnit: 'mg' },
            { name: 'Milligram (mg)', sub: '1/1,000 g', factorDown: 'Smallest', toUnit: '' },
          ],
          examples: [
            { from: '2.4 kg', to: '2,400 g', rule: '2.4 × 1,000' },
            { from: '850 g', to: '0.85 kg', rule: '850 ÷ 1,000' },
            { from: '1.2 tonnes', to: '1,200 kg', rule: '1.2 × 1,000' },
          ],
        },
        capacity: {
          title: 'Capacity & Liquid Volume',
          steps: [
            { name: 'Kilolitre (kl)', sub: '1,000 L', factorDown: '× 1,000', toUnit: 'L' },
            { name: 'Litre (L)', sub: 'Base Unit', factorDown: '× 1,000', toUnit: 'ml' },
            { name: 'Centilitre (cl)', sub: '1/100 L', factorDown: '× 10', toUnit: 'ml' },
            { name: 'Millilitre (ml)', sub: '1/1,000 L', factorDown: 'Smallest', toUnit: '' },
          ],
          examples: [
            { from: '1.75 L', to: '1,750 ml', rule: '1.75 × 1,000' },
            { from: '350 ml', to: '0.35 L', rule: '350 ÷ 1,000' },
            { from: '50 cl', to: '500 ml', rule: '50 × 10' },
          ],
        },
      };

      const currentCategory = metricCategories[metricTab];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-emerald-800 dark:text-emerald-200">
              🪜 The Metric Staircase: {currentCategory.title}
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300">
              Going Down = Multiply (×) | Going Up = Divide (÷)
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center gap-2 text-xs">
            {(['length', 'mass', 'capacity'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setMetricTab(tab);
                  playSound('click');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer capitalize ${
                  metricTab === tab
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {tab === 'length' ? '📏 Length (m)' : tab === 'mass' ? '⚖️ Mass (kg)' : '🧪 Capacity (L)'}
              </button>
            ))}
          </div>

          {/* Staircase Steps Display */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              {currentCategory.steps.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs"
                >
                  <span className="font-black text-sm block text-emerald-600 dark:text-emerald-400">
                    {st.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 block">{st.sub}</span>
                  {st.toUnit && (
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 block mt-1">
                      ↓ {st.factorDown} to {st.toUnit}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Conversion Challenges */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-200 block">
                ⭐ Real SATs Conversions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentCategory.examples.map((ex, eIdx) => (
                  <div key={eIdx} className="p-2 rounded bg-white/70 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-800 text-center font-mono">
                    <strong className="text-emerald-700 dark:text-emerald-300">{ex.from}</strong> = {ex.to}
                    <span className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 font-sans mt-0.5">({ex.rule})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 12. PERIMETER, AREA, VOLUME BOARD (1D vs 2D vs 3D)
     * ---------------------------------------------------- */
    case 'perimeter_area_volume_board': {
      const pavShapes = [
        {
          name: 'Garden Rectangle (6m × 4m)',
          l: 6,
          w: 4,
          h: 0,
          is3D: false,
          pFormula: '2 × (6 + 4) = 20 m',
          pDesc: 'Walking the fence around the garden border',
          aFormula: '6 × 4 = 24 m²',
          aDesc: 'Covering the lawn with 24 grass square tiles',
          vFormula: 'N/A (Flat 2D shape)',
          vDesc: 'No height or thickness',
        },
        {
          name: 'Square Bedroom (5m × 5m)',
          l: 5,
          w: 5,
          h: 0,
          is3D: false,
          pFormula: '4 × 5 = 20 m',
          pDesc: 'Skirting board along all 4 walls',
          aFormula: '5 × 5 = 25 m²',
          aDesc: '25 square metres of carpet tiles',
          vFormula: 'N/A (Flat 2D shape)',
          vDesc: 'No height or thickness',
        },
        {
          name: 'Toy Box Cuboid (4cm × 3cm × 2cm)',
          l: 4,
          w: 3,
          h: 2,
          is3D: true,
          pFormula: '4 × (4 + 3 + 2) = 36 cm (12 edges)',
          pDesc: 'Total length of all 12 wire edges',
          aFormula: '2(12 + 8 + 6) = 52 cm² (Surface Area)',
          aDesc: 'Wrapping paper covering all 6 flat faces',
          vFormula: '4 × 3 × 2 = 24 cm³',
          vDesc: 'Filling the box with 24 unit 1cm³ cubes!',
        },
      ];

      const currentPav = pavShapes[pavShapeIdx] || pavShapes[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div
            className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--contrast-amber)',
            }}
          >
            <span className="font-extrabold">
              📐 Spatial Geometry: 1D Perimeter vs 2D Area vs 3D Volume
            </span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              Fence (cm) vs Carpet (cm²) vs Water Cubes (cm³)
            </span>
          </div>

          {/* Shape Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {pavShapes.map((sh, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPavShapeIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  pavShapeIdx === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {sh.name.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* 3-Pillar Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* 1D Perimeter */}
            <div className="p-3.5 rounded-xl border bg-rose-500/10 border-rose-500/30 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-rose-800 dark:text-rose-300 uppercase">1D: Perimeter</span>
                <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px]">The Fence</span>
              </div>
              <div className="font-mono font-black text-sm text-rose-700 dark:text-rose-300">
                {currentPav.pFormula}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {currentPav.pDesc}
              </p>
              <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                Unit: Linear (cm, m, km)
              </div>
            </div>

            {/* 2D Area */}
            <div className="p-3.5 rounded-xl border bg-blue-500/10 border-blue-500/30 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-blue-800 dark:text-blue-300 uppercase">2D: Area</span>
                <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-bold text-[10px]">Carpet Tiles</span>
              </div>
              <div className="font-mono font-black text-sm text-blue-700 dark:text-blue-300">
                {currentPav.aFormula}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {currentPav.aDesc}
              </p>
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Unit: Square (cm², m²)
              </div>
            </div>

            {/* 3D Volume */}
            <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-emerald-800 dark:text-emerald-300 uppercase">3D: Volume</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px]">Water Cubes</span>
              </div>
              <div className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">
                {currentPav.vFormula}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {currentPav.vDesc}
              </p>
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Unit: Cubic (cm³, m³)
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 13. ANGLES CLOCK BOARD (Rotational Geometry)
     * ---------------------------------------------------- */
    case 'angles_clock_board': {
      const angleTypes = [
        { name: 'Acute Angle', deg: '45°', desc: 'Less than 90° (cute, sharp slice of pizza)', color: 'text-amber-500', bg: 'bg-amber-500' },
        { name: 'Right Angle', deg: '90°', desc: 'Exactly 90° (quarter turn, corner of book or square)', color: 'text-emerald-500', bg: 'bg-emerald-500' },
        { name: 'Obtuse Angle', deg: '135°', desc: 'Between 90° and 180° (wide open laptop screen)', color: 'text-sky-500', bg: 'bg-sky-500' },
        { name: 'Straight Line', deg: '180°', desc: 'Exactly 180° (half turn, two right angles joined)', color: 'text-indigo-500', bg: 'bg-indigo-500' },
        { name: 'Reflex Angle', deg: '240°', desc: 'Greater than 180° (bent all the way backwards)', color: 'text-purple-500', bg: 'bg-purple-500' },
        { name: 'Full Turn', deg: '360°', desc: 'Exactly 360° (complete 360 rotation around a point)', color: 'text-rose-500', bg: 'bg-rose-500' },
      ];

      const currentAngle = angleTypes[angleTypeIdx] || angleTypes[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-blue-800 dark:text-blue-200">
              🧭 Angle Rotational Turns: The Clock Face &amp; Compass
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              Selected: {currentAngle.name} ({currentAngle.deg})
            </span>
          </div>

          {/* Angle Type Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {angleTypes.map((a, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAngleTypeIdx(idx);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  angleTypeIdx === idx
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>

          {/* Visual Protractor/Clock Stage */}
          <div
            className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-around gap-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Visual SVG Angle Wedge */}
            <div className="w-32 h-32 relative rounded-full border-4 border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 shadow-inner">
              <div className="absolute w-2 h-2 rounded-full bg-slate-900 dark:bg-white z-10" />
              {/* Baseline arm */}
              <div className="absolute w-12 h-1 bg-slate-800 dark:bg-white left-1/2 origin-left" />
              {/* Rotated arm */}
              <div
                className="absolute w-12 h-1 bg-blue-500 left-1/2 origin-left transition-transform duration-500"
                style={{
                  transform: `rotate(-${parseInt(currentAngle.deg)}deg)`,
                }}
              />
              <span className="text-xs font-black font-mono absolute bottom-2 text-slate-700 dark:text-slate-200">
                {currentAngle.deg}
              </span>
            </div>

            {/* Description Card */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                <span className={`font-black text-sm block ${currentAngle.color}`}>
                  {currentAngle.name} ({currentAngle.deg})
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">
                  {currentAngle.desc}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                <div>• Angles on a straight line add to <strong>180°</strong></div>
                <div>• Angles around a point add to <strong>360°</strong></div>
                <div>• Angles inside any triangle add to <strong>180°</strong></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 14. COORDINATES GRID BOARD (4-Quadrant Masterclass)
     * ---------------------------------------------------- */
    case 'coordinates_grid_board': {
      const coordPoints = [
        { name: 'Point A', x: 3, y: 4, quad: 'Quadrant 1 (Top-Right)', xDir: '3 RIGHT', yDir: '4 UP', color: 'text-indigo-600 dark:text-indigo-400' },
        { name: 'Point B', x: -3, y: 4, quad: 'Quadrant 2 (Top-Left)', xDir: '3 LEFT', yDir: '4 UP', color: 'text-amber-600 dark:text-amber-400' },
        { name: 'Point C', x: -4, y: -3, quad: 'Quadrant 3 (Bottom-Left)', xDir: '4 LEFT', yDir: '3 DOWN', color: 'text-rose-600 dark:text-rose-400' },
        { name: 'Point D', x: 3, y: -4, quad: 'Quadrant 4 (Bottom-Right)', xDir: '3 RIGHT', yDir: '4 DOWN', color: 'text-emerald-600 dark:text-emerald-400' },
        { name: 'Origin (0,0)', x: 0, y: 0, quad: 'Center Anchor', xDir: '0 (Stay)', yDir: '0 (Stay)', color: 'text-slate-700 dark:text-slate-200 font-bold' },
      ];

      const currentPoint = coordPoints[coordPointIdx] || coordPoints[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-indigo-800 dark:text-indigo-200">
              📍 4-Quadrant Coordinates: Along Corridor (x), Up/Down Stairs (y)
            </span>
            <span className="font-bold text-indigo-700 dark:text-indigo-300">
              Rule: X before Y (alphabetical order!)
            </span>
          </div>

          {/* Point Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {coordPoints.map((pt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCoordPointIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  coordPointIdx === idx
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {pt.name}: ({pt.x}, {pt.y})
              </button>
            ))}
          </div>

          {/* Coordinate Plane Display */}
          <div
            className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-around gap-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Visual Plane */}
            <div className="w-40 h-40 relative rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-inner flex items-center justify-center">
              {/* Axes */}
              <div className="absolute w-full h-[2px] bg-slate-400 dark:bg-slate-600 top-1/2" />
              <div className="absolute h-full w-[2px] bg-slate-400 dark:bg-slate-600 left-1/2" />
              <span className="absolute right-1 top-1/2 text-[10px] font-black text-slate-700 dark:text-slate-200">+x</span>
              <span className="absolute left-1 top-1/2 text-[10px] font-black text-slate-700 dark:text-slate-200">−x</span>
              <span className="absolute top-1 left-1/2 text-[10px] font-black text-slate-700 dark:text-slate-200">+y</span>
              <span className="absolute bottom-1 left-1/2 text-[10px] font-black text-slate-700 dark:text-slate-200">−y</span>

              {/* Point Dot */}
              <div
                className="absolute w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-300 shadow-md transition-all duration-300"
                style={{
                  left: `calc(50% + ${currentPoint.x * 14}px - 6px)`,
                  top: `calc(50% - ${currentPoint.y * 14}px - 6px)`,
                }}
              />
            </div>

            {/* Explanatory Details */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                <div className="font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">
                  ( {currentPoint.x} , {currentPoint.y} )
                </div>
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  {currentPoint.quad}
                </div>
              </div>

              <div className="space-y-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">x</span>
                  <span>Horizontal movement: <strong>{currentPoint.xDir}</strong> along corridor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">y</span>
                  <span>Vertical movement: <strong>{currentPoint.yDir}</strong> the stairs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 15. ROMAN NUMERALS BOARD (Ancient Roman Decoders)
     * ---------------------------------------------------- */
    case 'roman_numerals_board': {
      const romanSymbols = [
        { sym: 'I', val: 1, hook: '1 finger' },
        { sym: 'V', val: 5, hook: 'V shape between thumb & fingers' },
        { sym: 'X', val: 10, hook: 'Two crossed hands (5+5)' },
        { sym: 'L', val: 50, hook: 'Lucky (L = 50)' },
        { sym: 'C', val: 100, hook: 'Cows / Century (C = 100)' },
        { sym: 'D', val: 500, hook: 'Drink (D = 500)' },
        { sym: 'M', val: 1000, hook: 'Milk / Millennium (M = 1,000)' },
      ];

      const subtractivePairs = [
        { roman: 'IV', val: 4, rule: '5 − 1 = 4' },
        { roman: 'IX', val: 9, rule: '10 − 1 = 9' },
        { roman: 'XL', val: 40, rule: '50 − 10 = 40' },
        { roman: 'XC', val: 90, rule: '100 − 10 = 90' },
        { roman: 'CD', val: 400, rule: '500 − 100 = 400' },
        { roman: 'CM', val: 900, rule: '1000 − 100 = 900' },
      ];

      const yearExamples = [
        { year: 2026, roman: 'MMXXVI', parts: '2000 (MM) + 20 (XX) + 6 (VI)' },
        { year: 1984, roman: 'MCMLXXXIV', parts: '1000 (M) + 900 (CM) + 80 (LXXX) + 4 (IV)' },
        { year: 74, roman: 'LXXIV', parts: '70 (LXX) + 4 (IV)' },
        { year: 99, roman: 'XCIX', parts: '90 (XC) + 9 (IX) [Trap: NOT IC!]' },
      ];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div
            className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--contrast-amber)',
            }}
          >
            <span className="font-extrabold">
              🏛️ Roman Numerals: Lucky Cows Drink Milk (L, C, D, M)
            </span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              Subtractive rule prevents 4 identical symbols!
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center gap-2 text-xs">
            {(['symbols', 'subtractive', 'years'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setRomanTab(tab);
                  playSound('click');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer capitalize ${
                  romanTab === tab
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {tab === 'symbols' ? '7 Core Symbols' : tab === 'subtractive' ? 'Subtractive Rule' : 'Year Decoders'}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {romanTab === 'symbols' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
                {romanSymbols.map((r) => (
                  <div
                    key={r.sym}
                    className="p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs"
                  >
                    <span className="font-black text-xl font-serif block" style={{ color: 'var(--contrast-amber)' }}>
                      {r.sym}
                    </span>
                    <span className="text-xs font-mono font-bold block text-slate-700 dark:text-slate-200">
                      = {r.val}
                    </span>
                    <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 block">{r.hook}</span>
                  </div>
                ))}
              </div>
            )}

            {romanTab === 'subtractive' && (
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subtractivePairs.map((p) => (
                    <div
                      key={p.roman}
                      className="p-2.5 rounded-lg border text-center font-mono"
                      style={{
                        backgroundColor: 'var(--contrast-amber-bg)',
                        borderColor: 'var(--contrast-amber-border)',
                      }}
                    >
                      <strong className="text-base block" style={{ color: 'var(--contrast-amber)' }}>{p.roman} = {p.val}</strong>
                      <span className="text-[10px] font-bold" style={{ color: 'var(--text-primary)' }}>{p.rule}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-700 dark:text-red-300 text-center">
                  ⚠️ <strong>Golden Rule:</strong> You can NEVER write 4 of the same symbol in a row (e.g., 4 is IV, NOT IIII; 40 is XL, NOT XXXX)!
                </div>
              </div>
            )}

            {romanTab === 'years' && (
              <div className="space-y-2 text-xs">
                {yearExamples.map((y) => (
                  <div
                    key={y.year}
                    className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2"
                  >
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">
                      Year {y.year}
                    </span>
                    <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
                      {y.roman}
                    </span>
                    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      {y.parts}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 16. AVERAGES RHYME BOARD (Hey Diddle Diddle Masterclass)
     * ---------------------------------------------------- */
    case 'averages_rhyme_board': {
      const averageDatasets = [
        {
          name: 'Dataset 1 (Odd count)',
          data: [3, 5, 5, 8, 9],
          mean: '30 ÷ 5 = 6',
          median: '5 (the single middle number)',
          mode: '5 (appears twice)',
          range: '9 − 3 = 6',
        },
        {
          name: 'Dataset 2 (Even count: 2 middle numbers)',
          data: [2, 4, 6, 8, 10, 12],
          mean: '42 ÷ 6 = 7',
          median: '(6 + 8) ÷ 2 = 7 (halfway between 6 and 8!)',
          mode: 'None (all appear once)',
          range: '12 − 2 = 10',
        },
        {
          name: 'Dataset 3 (Football Goals)',
          data: [1, 2, 2, 4, 7, 8, 11],
          mean: '35 ÷ 7 = 5',
          median: '4 (middle item)',
          mode: '2 (appears twice)',
          range: '11 − 1 = 10',
        },
      ];

      const currentAvg = averageDatasets[avgDatasetIdx] || averageDatasets[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-purple-500/10 border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-purple-800 dark:text-purple-200">
              🎵 Hey Diddle Diddle, the Median's the Middle!
            </span>
            <span className="font-bold text-purple-700 dark:text-purple-300">
              Add &amp; Divide for the Mean, Mode is Most, Range is Difference!
            </span>
          </div>

          {/* Dataset Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {averageDatasets.map((ds, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAvgDatasetIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  avgDatasetIdx === idx
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {ds.name.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* Visual Ordered Cards */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-700 dark:text-slate-200 mr-1">Sorted Data:</span>
              {currentAvg.data.map((num, nIdx) => (
                <div
                  key={nIdx}
                  className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-300 dark:border-purple-700 flex items-center justify-center font-mono font-black text-sm text-purple-700 dark:text-purple-300 shadow-2xs"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Rhyme 4-Quadrant Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {/* Median */}
              <div className="p-3 rounded-xl border bg-purple-500/10 border-purple-500/30 space-y-1">
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Median (Middle)</span>
                <span className="font-mono font-black text-base text-purple-800 dark:text-purple-200 block">
                  {currentAvg.median.split(' ')[0]}
                </span>
                <p className="text-[10px] font-medium text-slate-700 dark:text-slate-200">
                  {currentAvg.median}
                </p>
              </div>

              {/* Mean */}
              <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/30 space-y-1">
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">Mean (Add &amp; Divide)</span>
                <span className="font-mono font-black text-base text-blue-800 dark:text-blue-200 block">
                  {currentAvg.mean.split('= ')[1]}
                </span>
                <p className="text-[10px] font-medium text-slate-700 dark:text-slate-200">
                  Sum ÷ Count = {currentAvg.mean}
                </p>
              </div>

              {/* Mode */}
              <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">Mode (Most Popular)</span>
                <span className="font-mono font-black text-base text-amber-800 dark:text-amber-200 block">
                  {currentAvg.mode.split(' ')[0]}
                </span>
                <p className="text-[10px] font-medium text-slate-700 dark:text-slate-200">
                  {currentAvg.mode}
                </p>
              </div>

              {/* Range */}
              <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">Range (Difference)</span>
                <span className="font-mono font-black text-base text-emerald-800 dark:text-emerald-200 block">
                  {currentAvg.range.split('= ')[1]}
                </span>
                <p className="text-[10px] font-medium text-slate-700 dark:text-slate-200">
                  Highest − Lowest = {currentAvg.range}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 17. WORD PROBLEMS BAR BOARD (RUCSAC Bar Models)
     * ---------------------------------------------------- */
    case 'word_problems_bar_board': {
      const wordProblemScenarios = [
        {
          title: 'Liam has £12 more than Maya (Total £48)',
          category: 'Singapore Comparison Bar Model',
          step1: 'Step 1: Subtract the extra £12 ➔ £48 − £12 = £36',
          step2: 'Step 2: Divide equally into 2 shares ➔ £36 ÷ 2 = £18 (Maya)',
          step3: 'Step 3: Add £12 for Liam ➔ £18 + £12 = £30 (Liam)',
          check: 'Check: £18 + £30 = £48 ✓',
          bars: [
            { name: 'Maya', blocks: ['£18'], color: 'bg-sky-500', total: '£18' },
            { name: 'Liam', blocks: ['£18', '+£12'], color: 'bg-amber-500', total: '£30' },
          ],
        },
        {
          title: 'Cinema Tickets & Change from £50',
          category: 'Multi-Step Money Word Problem',
          step1: 'Step 1: 2 Adult tickets @ £8.50 = £17.00',
          step2: 'Step 2: 3 Child tickets @ £4.50 = £13.50 + Popcorn £6 = £19.50',
          step3: 'Step 3: Total spent = £17 + £19.50 = £36.50 ➔ Change = £50 − £36.50 = £13.50',
          check: 'Check: £36.50 + £13.50 = £50 ✓',
          bars: [
            { name: 'Adults', blocks: ['£17.00'], color: 'bg-purple-500', total: '£17.00' },
            { name: 'Children & Snacks', blocks: ['£19.50'], color: 'bg-teal-500', total: '£19.50' },
            { name: 'Change Given', blocks: ['£13.50'], color: 'bg-emerald-500', total: '£13.50' },
          ],
        },
        {
          title: 'School Minibus Excursion (Remainder Trap!)',
          category: 'Division with Remainder Round-Up',
          step1: 'Step 1: Total passengers = 145 students + 15 teachers = 160 passengers',
          step2: 'Step 2: 160 passengers ÷ 16 seats per minibus = exactly 10 minibuses',
          step3: 'Step 3: If 161 passengers, you MUST round UP to 11 minibuses! (No one left behind!)',
          check: 'Check: 10 minibuses × 16 seats = 160 capacity ✓',
          bars: [
            { name: 'Students', blocks: ['145'], color: 'bg-blue-500', total: '145' },
            { name: 'Teachers', blocks: ['15'], color: 'bg-rose-500', total: '15' },
          ],
        },
      ];

      const currentWp = wordProblemScenarios[wpScenarioIdx] || wordProblemScenarios[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-emerald-800 dark:text-emerald-200">
              🧩 Singapore Bar Model &amp; RUCSAC Word Problem Solver
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300">
              {currentWp.category}
            </span>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {wordProblemScenarios.map((wp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setWpScenarioIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  wpScenarioIdx === idx
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                Problem {idx + 1}
              </button>
            ))}
          </div>

          {/* Visual Bar Model Card */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="text-center font-bold text-sm text-slate-800 dark:text-slate-100">
              {currentWp.title}
            </div>

            {/* Visual Bars */}
            <div className="space-y-2 text-xs">
              {currentWp.bars.map((bar, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <span className="w-24 font-bold text-slate-600 dark:text-slate-300">{bar.name}:</span>
                  <div className="flex items-center gap-1">
                    {bar.blocks.map((blk, kIdx) => (
                      <div
                        key={kIdx}
                        className={`px-3 py-1.5 rounded-lg text-white font-mono font-bold text-xs shadow-2xs ${
                          blk.startsWith('+') ? 'bg-amber-500' : bar.color
                        }`}
                      >
                        {blk}
                      </div>
                    ))}
                  </div>
                  <span className="font-black text-sm ml-2 text-slate-700 dark:text-slate-200">
                    = {bar.total}
                  </span>
                </div>
              ))}
            </div>

            {/* 3-Step Solution Flow */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1 font-medium text-slate-700 dark:text-slate-200">
              <div>{currentWp.step1}</div>
              <div>{currentWp.step2}</div>
              <div>{currentWp.step3}</div>
              <div className="pt-1 border-t border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">
                {currentWp.check}
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 18. FDP BENCHMARK HIGHWAY
     * ---------------------------------------------------- */
    case 'fdp_benchmark_highway': {
      const benchmarks = [
        { label: '1/2', fraction: '\\frac{1}{2}', decimal: '0.5', percent: '50%', color: 'from-blue-500 to-indigo-600', width: '50%' },
        { label: '1/4', fraction: '\\frac{1}{4}', decimal: '0.25', percent: '25%', color: 'from-emerald-500 to-teal-600', width: '25%' },
        { label: '3/4', fraction: '\\frac{3}{4}', decimal: '0.75', percent: '75%', color: 'from-amber-500 to-orange-600', width: '75%' },
        { label: '1/5', fraction: '\\frac{1}{5}', decimal: '0.2', percent: '20%', color: 'from-purple-500 to-pink-600', width: '20%' },
        { label: '2/5', fraction: '\\frac{2}{5}', decimal: '0.4', percent: '40%', color: 'from-purple-600 to-indigo-600', width: '40%' },
        { label: '1/10', fraction: '\\frac{1}{10}', decimal: '0.1', percent: '10%', color: 'from-rose-500 to-red-600', width: '10%' },
        { label: '1/8', fraction: '\\frac{1}{8}', decimal: '0.125', percent: '12.5%', color: 'from-cyan-500 to-blue-600', width: '12.5%' },
      ];
      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-blue-700 dark:text-blue-300">
              ⚡ The Golden Benchmark Highway: Instant Conversions
            </span>
            <span className="font-medium text-blue-900 dark:text-blue-200">
              Tap any benchmark to see Fraction ↔ Decimal ↔ Percentage alignment!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {benchmarks.map((b, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border flex flex-col items-center justify-between gap-2 shadow-xs hover:scale-102 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                }}
                onClick={() => playSound('pop')}
              >
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                  <MathView math={b.fraction} />
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${b.color}`}
                    style={{ width: b.width }}
                  />
                </div>
                <div className="flex items-center justify-between w-full text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <span>{b.decimal}</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">{b.percent}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 text-xs text-center font-bold text-slate-700 dark:text-slate-300">
            💡 Pro-Tip: <MathView math="\\frac{1}{5} = 20\\%" /> means <MathView math="\\frac{3}{5} = 3 \\times 20\\% = 60\\%" />! Benchmarks unlock every multiple.
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 19. FDP LEGO BLOCKS (Mental Percentage Builder)
     * ---------------------------------------------------- */
    case 'fdp_lego_blocks': {
      const blockTen = targetVal * 0.1;
      const blockFive = targetVal * 0.05;
      const blockOne = targetVal * 0.01;
      const blockFifty = targetVal * 0.5;

      const totalPercent = activeBlocks.reduce((sum, b) => sum + b.pct, 0);
      const totalCalculated = (targetVal * totalPercent) / 100;

      const addBlock = (pct: number, label: string) => {
        setActiveBlocks((prev) => [...prev, { id: Math.random().toString(), pct, label }]);
        playSound('click');
      };

      const removeBlock = (id: string) => {
        setActiveBlocks((prev) => prev.filter((b) => b.id !== id));
        playSound('pop');
      };

      const resetBlocks = () => {
        setActiveBlocks([]);
        playSound('click');
      };

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-800 dark:text-amber-200">Base Number (£/units):</span>
              {[80, 240, 160, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTargetVal(val);
                    playSound('click');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-black border text-xs cursor-pointer transition-all ${
                    targetVal === val
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {val === 80 ? '£80' : val}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={resetBlocks}
              className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={12} /> Clear Blocks
            </button>
          </div>

          {/* Lego toolbox buttons */}
          <div className="space-y-1.5">
            <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Snap a Lego Block:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => addBlock(10, '10%')}
                className="p-2.5 rounded-xl border bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex flex-col items-center gap-0.5 cursor-pointer shadow-2xs transition-all active:scale-95"
              >
                <span>+ 10% Block</span>
                <span className="text-[10px] font-medium opacity-80">({targetVal} ÷ 10 = {blockTen})</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(5, '5%')}
                className="p-2.5 rounded-xl border bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex flex-col items-center gap-0.5 cursor-pointer shadow-2xs transition-all active:scale-95"
              >
                <span>+ 5% Block</span>
                <span className="text-[10px] font-medium opacity-80">(Half of 10% = {blockFive})</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(1, '1%')}
                className="p-2.5 rounded-xl border bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex flex-col items-center gap-0.5 cursor-pointer shadow-2xs transition-all active:scale-95"
              >
                <span>+ 1% Block</span>
                <span className="text-[10px] font-medium opacity-80">({targetVal} ÷ 100 = {blockOne})</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(50, '50%')}
                className="p-2.5 rounded-xl border bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex flex-col items-center gap-0.5 cursor-pointer shadow-2xs transition-all active:scale-95"
              >
                <span>+ 50% Block</span>
                <span className="text-[10px] font-medium opacity-80">(Half of {targetVal} = {blockFifty})</span>
              </button>
            </div>
          </div>

          {/* Active Stacking Tray */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                Active Lego Construction ({activeBlocks.length} blocks):
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono">
                  {totalPercent}% of {targetVal}
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  = £{totalCalculated}
                </span>
              </div>
            </div>

            {activeBlocks.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Tap the buttons above to snap 10%, 5%, or 1% Lego blocks together!
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {activeBlocks.map((b) => {
                  const val = (targetVal * b.pct) / 100;
                  return (
                    <div
                      key={b.id}
                      className="px-3 py-1.5 rounded-lg border flex items-center gap-2 bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200 text-xs font-bold shadow-2xs animate-scaleIn"
                    >
                      <span>🧱 {b.label} (£{val})</span>
                      <button
                        type="button"
                        onClick={() => removeBlock(b.id)}
                        className="text-slate-500 dark:text-slate-300 hover:text-red-500 cursor-pointer ml-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Formula sum string */}
            {activeBlocks.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>
                  {activeBlocks.map((b) => `£${(targetVal * b.pct) / 100}`).join(' + ')} = £{totalCalculated}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-sans font-black">
                  🎯 {totalPercent}% calculated mentally!
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 20. FDP REVERSE PERCENTAGE TRICK (x% of y = y% of x)
     * ---------------------------------------------------- */
    case 'fdp_reverse_trick': {
      const examples = [
        {
          x: 16,
          y: 50,
          originalStr: '16% of 50',
          flippedStr: '50% of 16',
          originalThinking: '16% of 50 sounds awkward...',
          flippedThinking: '50% of 16 just means HALF of 16 = 8!',
          result: 8,
        },
        {
          x: 8,
          y: 25,
          originalStr: '8% of 25',
          flippedStr: '25% of 8',
          originalThinking: '8% of 25 sounds tricky...',
          flippedThinking: '25% of 8 just means ONE QUARTER (1/4) of 8 = 2!',
          result: 2,
        },
        {
          x: 4,
          y: 75,
          originalStr: '4% of 75',
          flippedStr: '75% of 4',
          originalThinking: '4% of 75 takes long to calculate...',
          flippedThinking: '75% of 4 means THREE QUARTERS (3/4) of 4 = 3!',
          result: 3,
        },
        {
          x: 12,
          y: 50,
          originalStr: '12% of 50',
          flippedStr: '50% of 12',
          originalThinking: '12% of 50 requires division...',
          flippedThinking: '50% of 12 is simply half of 12 = 6!',
          result: 6,
        },
      ];

      const cur = examples[exampleIdx];

      return (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-xl border bg-purple-500/10 border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-purple-700 dark:text-purple-300">
              ✨ The Reverse Percentage Magic Trick: <MathView math="x\\% \\text{ of } y = y\\% \\text{ of } x" />
            </span>
            <span className="font-medium text-purple-900 dark:text-purple-200">
              Swap tricky numbers to create instant mental calculations!
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setExampleIdx(idx);
                  setIsFlipped(false);
                  playSound('click');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                  exampleIdx === idx
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {ex.originalStr}
              </button>
            ))}
          </div>

          {/* Interactive Flip Card Container */}
          <div
            className="p-5 rounded-2xl border text-center space-y-4 shadow-sm"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className={`p-4 rounded-xl border transition-all duration-500 ${!isFlipped ? 'bg-amber-500/15 border-amber-500/40 scale-105 shadow-md' : 'opacity-40 border-slate-300'}`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Standard Way</span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">{cur.originalStr}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFlipped(!isFlipped);
                  playSound('whoosh');
                }}
                className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                title="Click to Flip!"
              >
                <RefreshCw size={20} className={isFlipped ? 'rotate-180 transition-transform duration-500' : 'transition-transform duration-500'} />
              </button>

              <div className={`p-4 rounded-xl border transition-all duration-500 ${isFlipped ? 'bg-emerald-500/15 border-emerald-500/40 scale-105 shadow-md' : 'opacity-40 border-slate-300'}`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Magic Flipped Way</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">{cur.flippedStr}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              {isFlipped ? (
                <div className="space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm block">
                    ⚡ {cur.flippedThinking}
                  </span>
                  <span>Answer = {cur.result}! Because both sides equal <MathView math={`\\frac{${cur.x} \\times ${cur.y}}{100} = ${cur.result}`} />.</span>
                </div>
              ) : (
                <span>Tap the purple circle to flip the numbers and solve in 1 second!</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 21. PLACE VALUE SHIFT (The Digit Slide Dance Masterclass)
     * ---------------------------------------------------- */
    case 'place_value_shift': {
      const baseNum = shiftBaseNum;
      const computedResult = Number((baseNum * shiftFactor).toFixed(4));
      const isMultiplying = shiftFactor >= 1;
      const jumpSteps =
        shiftFactor === 10 || shiftFactor === 0.1
          ? 1
          : shiftFactor === 100 || shiftFactor === 0.01
          ? 2
          : shiftFactor === 1000
          ? 3
          : 1;

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-blue-700 dark:text-blue-300">
              🕺 The Digit Slide Dance: Fixed Decimal Anchor
            </span>
            <span className="font-medium text-blue-900 dark:text-blue-200">
              {isMultiplying ? '⬅️ Digits slide LEFT to multiply' : '➡️ Digits slide RIGHT to divide'}
            </span>
          </div>

          {/* Number Presets */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 mr-1">Choose Number:</span>
            {[3.4, 0.07, 450, 52].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setShiftBaseNum(num);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  shiftBaseNum === num
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Operation Shift Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {[
              { label: '× 10 (Slide 1 Left)', factor: 10 },
              { label: '× 100 (Slide 2 Left)', factor: 100 },
              { label: '× 1,000 (Slide 3 Left)', factor: 1000 },
              { label: '÷ 10 (Slide 1 Right)', factor: 0.1 },
              { label: '÷ 100 (Slide 2 Right)', factor: 0.01 },
            ].map((opt) => (
              <button
                key={opt.factor}
                type="button"
                onClick={() => {
                  setShiftFactor(opt.factor);
                  playSound('click');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold border transition-all cursor-pointer ${
                  shiftFactor === opt.factor
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Place Value Column Display */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Main Result Headline */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Current Equation:</span>
                <span className="font-mono text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400">
                  {baseNum} {isMultiplying ? `× ${shiftFactor}` : `÷ ${Math.round(1 / shiftFactor)}`} = {computedResult}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-xs font-bold text-blue-800 dark:text-blue-200 text-center">
                Digits slid <span className="font-mono font-black">{jumpSteps}</span> place{jumpSteps > 1 ? 's' : ''} {isMultiplying ? 'LEFT ⬅️' : 'RIGHT ➡️'}
              </div>
            </div>

            {/* Place Value Columns Grid */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
              <div
                className="p-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--text-secondary)' }}>Thousands</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{computedResult >= 1000 ? Math.floor((computedResult / 1000) % 10) : '0'}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--text-muted)' }}>1,000</span>
              </div>
              <div
                className="p-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--text-secondary)' }}>Hundreds</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{computedResult >= 100 ? Math.floor((computedResult / 100) % 10) : '0'}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--text-muted)' }}>100</span>
              </div>
              <div
                className="p-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--text-secondary)' }}>Tens</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{computedResult >= 10 ? Math.floor((computedResult / 10) % 10) : '0'}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--text-muted)' }}>10</span>
              </div>
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  backgroundColor: 'var(--contrast-indigo-bg)',
                  borderColor: 'var(--contrast-indigo-border)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--contrast-indigo)' }}>Ones</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{Math.floor(computedResult) % 10}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--contrast-indigo)' }}>1</span>
              </div>
              <div
                className="p-2 rounded-lg border-2 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: 'var(--contrast-amber-bg)',
                  borderColor: 'var(--contrast-amber-border)',
                }}
              >
                <span className="text-[8px] font-black block" style={{ color: 'var(--contrast-amber)' }}>POINT</span>
                <span className="text-xl font-black leading-none block" style={{ color: 'var(--contrast-amber)' }}>•</span>
                <span className="text-[8px] font-black block" style={{ color: 'var(--contrast-amber)' }}>LOCKED</span>
              </div>
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  backgroundColor: 'var(--contrast-amber-bg)',
                  borderColor: 'var(--contrast-amber-border)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--contrast-amber)' }}>Tenths</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{Math.floor((computedResult * 10) % 10)}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--contrast-amber)' }}>1/10</span>
              </div>
              <div
                className="p-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="text-[9px] font-black block truncate" style={{ color: 'var(--text-secondary)' }}>Hundredths</span>
                <span className="text-base font-black block" style={{ color: 'var(--text-primary)' }}>{Math.floor((computedResult * 100) % 10)}</span>
                <span className="text-[8px] font-bold block" style={{ color: 'var(--text-muted)' }}>1/100</span>
              </div>
            </div>

            {/* Pedagogical Myth Buster Box */}
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <span className="text-base">💡</span>
              <div>
                <strong>Golden Secret:</strong> The decimal point is cemented into the ground—it NEVER moves! Count zeros in the multiplier (10 = 1 zero, 100 = 2 zeros, 1,000 = 3 zeros) to know how many columns the digits slide!
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 22. NEGATIVE THERMOMETER (The Sub-Zero Masterclass)
     * ---------------------------------------------------- */
    case 'negative_thermometer': {
      const scenarios = [
        {
          title: '1. Temperature Drop: 3°C drop by 5°C',
          start: 3,
          change: -5,
          end: -2,
          type: 'drop',
          description: 'Start at 3°C, count back past 0: 3 ➔ 2 ➔ 1 ➔ 0 ➔ -1 ➔ -2°C.',
          note: 'Ground level is zero. 2 steps below ground is -2°C!',
        },
        {
          title: '2. Morning Warm-Up: -4°C rose by 7°C',
          start: -4,
          change: 7,
          end: 3,
          type: 'rise',
          description: 'Start at freezing -4°C, warm up: -4 ➔ -3 ➔ -2 ➔ -1 ➔ 0 ➔ 1 ➔ 2 ➔ 3°C.',
          note: 'Crosses through zero into positive springtime temperatures!',
        },
        {
          title: '3. Difference Across Zero: -5°C to 8°C',
          start: -5,
          change: 13,
          end: 8,
          type: 'diff',
          description: 'Bridge across zero: 5 steps from -5 to 0, plus 8 steps from 0 to 8 = 13°C range!',
          note: 'Never subtract negative values directly—add the two distances to zero: 5 + 8 = 13°C.',
        },
        {
          title: '4. Which is Colder & Smaller? -10°C vs -2°C',
          start: -10,
          change: 8,
          end: -2,
          type: 'compare',
          description: '-10 is 10 steps below zero, while -2 is only 2 steps below zero.',
          note: 'On a number line, numbers get SMALLER as you travel left: -10 < -2!',
        },
      ];

      const activeScen = scenarios[negScenarioId] || scenarios[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-3 rounded-xl border bg-cyan-500/10 border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-cyan-700 dark:text-cyan-300">
              ❄️ Sub-Zero Winter Thermometer &amp; Number Elevator
            </span>
            <span className="font-medium text-cyan-900 dark:text-cyan-200">
              Count through zero: Freezing Basements vs Warm Penthouses
            </span>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {scenarios.map((scen, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNegScenarioId(idx);
                  playSound('click');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  negScenarioId === idx
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {scen.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Interactive Stage */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Scenario Callout */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-extrabold text-cyan-700 dark:text-cyan-300 text-sm block">
                  {activeScen.title}
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  {activeScen.description}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-800 dark:text-cyan-200 font-mono font-black text-sm">
                Result: {activeScen.end}°C
              </div>
            </div>

            {/* Interactive Stepping Number Line */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold overflow-x-auto py-2">
                {[-10, -8, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 8].map((val) => {
                  const isStart = val === activeScen.start;
                  const isEnd = val === activeScen.end;
                  const isZero = val === 0;

                  return (
                    <div key={val} className="flex flex-col items-center gap-1 min-w-[28px]">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                          isEnd
                            ? 'bg-rose-600 text-white border-rose-700 scale-125 shadow-md ring-2 ring-rose-300'
                            : isStart
                            ? 'bg-cyan-600 text-white border-cyan-700 scale-110 shadow-md ring-2 ring-cyan-300'
                            : isZero
                            ? 'bg-amber-400 text-black border-amber-500 font-black scale-105'
                            : val < 0
                            ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-300'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200'
                        }`}
                      >
                        {val}
                      </div>
                      {isZero ? (
                        <span className="text-[8px] font-black text-amber-600">ZERO</span>
                      ) : isStart ? (
                        <span className="text-[8px] font-bold text-cyan-600">START</span>
                      ) : isEnd ? (
                        <span className="text-[8px] font-bold text-rose-600">END</span>
                      ) : (
                        <span className="text-[8px] text-transparent">•</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Zone Indicators */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                  ❄️ Sub-Zero Freezing Zone (Below 0)
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                  ☀️ Positive Warm Zone (Above 0)
                </div>
              </div>
            </div>

            {/* Note Callout */}
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span><strong>Key Takeaway:</strong> {activeScen.note}</span>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 23. RATIO SQUASH DRINK MIXTURE (Part-to-Part vs Whole)
     * ---------------------------------------------------- */
    case 'ratio_squash_drink': {
      const drinkRecipes = [
        {
          name: 'Blackcurrant Cordial (1 : 4)',
          cordialName: 'Squash',
          mixerName: 'Water',
          cordialParts: 1,
          mixerParts: 4,
          totalParts: 5,
          cordialPct: '20%',
          mixerPct: '80%',
          bottleSize: 500,
          cordialMl: 100,
          mixerMl: 400,
          cordialColor: 'bg-amber-500',
          mixerColor: 'bg-cyan-400/80',
          summary: 'Ratio 1:4 means 1 part squash for every 4 parts water (5 total parts). Squash is 1/5 of the whole drink!',
        },
        {
          name: 'Double Strength Orange (1 : 9)',
          cordialName: 'Squash',
          mixerName: 'Water',
          cordialParts: 1,
          mixerParts: 9,
          totalParts: 10,
          cordialPct: '10%',
          mixerPct: '90%',
          bottleSize: 500,
          cordialMl: 50,
          mixerMl: 450,
          cordialColor: 'bg-orange-500',
          mixerColor: 'bg-cyan-400/80',
          summary: 'Ratio 1:9 means 1 part squash to 9 parts water (10 total parts). Squash is 1/10 of the whole drink!',
        },
        {
          name: 'Strawberry Milkshake (2 : 3)',
          cordialName: 'Syrup',
          mixerName: 'Milk',
          cordialParts: 2,
          mixerParts: 3,
          totalParts: 5,
          cordialPct: '40%',
          mixerPct: '60%',
          bottleSize: 500,
          cordialMl: 200,
          mixerMl: 300,
          cordialColor: 'bg-pink-500',
          mixerColor: 'bg-amber-100 dark:bg-amber-900/40',
          summary: 'Ratio 2:3 means 2 parts syrup to 3 parts milk (5 total parts). Syrup is 2/5 of the milkshake!',
        },
      ];

      const currentDrink = drinkRecipes[squashRatioIdx] || drinkRecipes[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div
            className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--contrast-amber)',
            }}
          >
            <span className="font-extrabold">
              🍹 Part-to-Part vs Part-to-Whole: {currentDrink.name}
            </span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              Total Parts = {currentDrink.cordialParts} + {currentDrink.mixerParts} = {currentDrink.totalParts} parts
            </span>
          </div>

          {/* Recipe Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {drinkRecipes.map((dr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSquashRatioIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  squashRatioIdx === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {dr.name.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* Visual Glass & Calculation Stage */}
          <div
            className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-around gap-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            {/* Visual Glass */}
            <div className="w-24 h-40 border-4 border-slate-300 dark:border-slate-600 rounded-b-2xl overflow-hidden flex flex-col justify-end relative shadow-inner bg-slate-50 dark:bg-slate-900">
              <div
                className={`w-full ${currentDrink.mixerColor} flex items-center justify-center text-[10px] font-black text-slate-800 dark:text-slate-200 transition-all`}
                style={{ height: currentDrink.mixerPct }}
              >
                {currentDrink.mixerName} ({currentDrink.mixerParts}/{currentDrink.totalParts})
              </div>
              <div
                className={`w-full ${currentDrink.cordialColor} flex items-center justify-center text-[10px] font-black text-white transition-all`}
                style={{ height: currentDrink.cordialPct }}
              >
                {currentDrink.cordialName} ({currentDrink.cordialParts}/{currentDrink.totalParts})
              </div>
            </div>

            {/* Calculations & Conversions */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div
                className="p-2.5 rounded-lg border space-y-1"
                style={{
                  backgroundColor: 'var(--contrast-amber-bg)',
                  borderColor: 'var(--contrast-amber-border)',
                }}
              >
                <span className="font-bold block" style={{ color: 'var(--contrast-amber)' }}>
                  1. Ratio (Part to Part):
                </span>
                <span className="font-mono font-black text-sm" style={{ color: 'var(--text-primary)' }}>
                  {currentDrink.cordialParts} : {currentDrink.mixerParts} ({currentDrink.cordialName} : {currentDrink.mixerName})
                </span>
              </div>

              <div className="p-2.5 rounded-lg border bg-cyan-500/10 border-cyan-500/20 space-y-1">
                <span className="font-bold text-cyan-800 dark:text-cyan-300 block">
                  2. Fraction &amp; Percentage (Part to Whole):
                </span>
                <span className="font-mono font-black text-sm text-cyan-700 dark:text-cyan-300">
                  {currentDrink.cordialName} is {currentDrink.cordialParts}/{currentDrink.totalParts} ({currentDrink.cordialPct}) of the entire drink!
                </span>
              </div>

              <div className="p-2.5 rounded-lg border bg-emerald-500/10 border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  3. In a 500 ml Bottle:
                </span>
                <span className="font-mono text-xs text-slate-700 dark:text-slate-200 block">
                  1 part = 500 ml ÷ {currentDrink.totalParts} = <strong>{500 / currentDrink.totalParts} ml</strong>
                </span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 block">
                  {currentDrink.cordialMl} ml {currentDrink.cordialName} + {currentDrink.mixerMl} ml {currentDrink.mixerName} = 500 ml ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 24. RATIO RECIPE SCALING (Unit Rate Masterclass)
     * ---------------------------------------------------- */
    case 'ratio_recipe_scaling': {
      const recipes = {
        pancakes: {
          title: 'Fluffy Pancakes',
          baseServings: 4,
          ingredients: [
            { name: 'Plain Flour', baseQty: 200, unit: 'g' },
            { name: 'Whole Milk', baseQty: 300, unit: 'ml' },
            { name: 'Fresh Eggs', baseQty: 2, unit: 'eggs' },
            { name: 'Caster Sugar', baseQty: 40, unit: 'g' },
          ],
        },
        cupcakes: {
          title: 'Vanilla Cupcakes',
          baseServings: 4,
          ingredients: [
            { name: 'Self-Raising Flour', baseQty: 160, unit: 'g' },
            { name: 'Butter', baseQty: 160, unit: 'g' },
            { name: 'Sugar', baseQty: 120, unit: 'g' },
            { name: 'Eggs', baseQty: 2, unit: 'eggs' },
          ],
        },
      };

      const currentRecipe = recipes[recipeType];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-emerald-800 dark:text-emerald-200">
              🥞 The 1-Portion Unit Rate Trick: Scaling {currentRecipe.title}
            </span>
            <span className="font-medium text-emerald-900 dark:text-emerald-200">
              Find 1 portion first (divide by 4), then multiply for {people} people!
            </span>
          </div>

          {/* Controls: Recipe & People Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Recipe Toggle */}
            <div className="flex gap-1">
              {(['pancakes', 'cupcakes'] as const).map((rKey) => (
                <button
                  key={rKey}
                  type="button"
                  onClick={() => { setRecipeType(rKey); playSound('click'); }}
                  className={`px-3 py-1 rounded-lg font-bold border capitalize cursor-pointer ${
                    recipeType === rKey
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white/80 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {rKey}
                </button>
              ))}
            </div>

            {/* People Selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">Party Size:</span>
              {[2, 4, 8, 10, 12].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setPeople(p); playSound('click'); }}
                  className={`px-2.5 py-1 rounded-lg font-black border cursor-pointer ${
                    people === p
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white/80 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Table */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentRecipe.ingredients.map((ing, iIdx) => {
                const perPerson = ing.baseQty / currentRecipe.baseServings;
                const scaledTotal = perPerson * people;

                return (
                  <div
                    key={iIdx}
                    className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-black text-slate-800 dark:text-slate-100 block">
                        {ing.name}
                      </span>
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 block">
                        Unit rate: {perPerson} {ing.unit} per person
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400 block">
                        {scaledTotal} {ing.unit}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 block">
                        ({people} × {perPerson})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-center text-emerald-900 dark:text-emerald-200">
              💡 <strong>SATs Rule of Thumb:</strong> Scaling factor = (New servings ÷ Old servings). Here: {people} ÷ 4 = <strong>{(people / 4).toFixed(2).replace('.00', '')}× multiplier</strong>!
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 25. RATIO DIFFERENCE PUZZLES (When Someone Gets MORE)
     * ---------------------------------------------------- */
    case 'ratio_difference_board': {
      const diffPuzzles = [
        {
          title: 'Liam & Maya Stickers (5 : 3)',
          personA: 'Liam',
          partsA: 5,
          personB: 'Maya',
          partsB: 3,
          diffParts: 2,
          diffQty: 6,
          unitVal: 3,
          totalQty: 24,
          unitName: 'stickers',
          explanation: 'Liam has 5 parts and Maya has 3 parts. Liam has 2 MORE parts, which equals 6 stickers. 1 part = 6 ÷ 2 = 3 stickers!',
        },
        {
          title: 'Red & Blue Marbles (7 : 4)',
          personA: 'Red Bag',
          partsA: 7,
          personB: 'Blue Bag',
          partsB: 4,
          diffParts: 3,
          diffQty: 15,
          unitVal: 5,
          totalQty: 55,
          unitName: 'marbles',
          explanation: 'Red has 7 parts and Blue has 4 parts. The difference is 3 parts, which equals 15 marbles. 1 part = 15 ÷ 3 = 5 marbles!',
        },
        {
          title: 'School Library Books (8 : 5)',
          personA: 'Fiction',
          partsA: 8,
          personB: 'Non-Fiction',
          partsB: 5,
          diffParts: 3,
          diffQty: 24,
          unitVal: 8,
          totalQty: 104,
          unitName: 'books',
          explanation: 'Fiction has 8 parts, Non-Fiction has 5 parts. Difference is 3 parts = 24 books. 1 part = 24 ÷ 3 = 8 books!',
        },
      ];

      const currentPuzzle = diffPuzzles[diffScenarioIdx] || diffPuzzles[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-purple-500/10 border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-purple-800 dark:text-purple-200">
              🧩 Ratio Difference Puzzles: {currentPuzzle.title}
            </span>
            <span className="font-bold text-purple-700 dark:text-purple-300">
              Difference = {currentPuzzle.partsA} − {currentPuzzle.partsB} = {currentPuzzle.diffParts} parts ({currentPuzzle.diffQty} {currentPuzzle.unitName})
            </span>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {diffPuzzles.map((pz, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDiffScenarioIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  diffScenarioIdx === idx
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                Puzzle {idx + 1}
              </button>
            ))}
          </div>

          {/* Visual Bar Models */}
          <div
            className="p-4 rounded-xl border space-y-4 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="space-y-3 text-xs">
              {/* Group B (Shorter) */}
              <div className="flex items-center gap-2">
                <span className="w-24 font-black text-slate-700 dark:text-slate-200">{currentPuzzle.personB}:</span>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: currentPuzzle.partsB }).map((_, n) => (
                    <div
                      key={n}
                      className="w-10 h-8 rounded-lg bg-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-2xs"
                    >
                      {currentPuzzle.unitVal}
                    </div>
                  ))}
                </div>
                <span className="font-black text-sm ml-2 text-slate-800 dark:text-slate-100">
                  = {currentPuzzle.partsB * currentPuzzle.unitVal} {currentPuzzle.unitName}
                </span>
              </div>

              {/* Group A (Longer with Difference highlighted) */}
              <div className="flex items-center gap-2">
                <span className="w-24 font-black text-slate-700 dark:text-slate-200">{currentPuzzle.personA}:</span>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: currentPuzzle.partsB }).map((_, n) => (
                    <div
                      key={n}
                      className="w-10 h-8 rounded-lg bg-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-2xs"
                    >
                      {currentPuzzle.unitVal}
                    </div>
                  ))}
                  {Array.from({ length: currentPuzzle.diffParts }).map((_, n) => (
                    <div
                      key={n}
                      className="w-10 h-8 rounded-lg bg-amber-500 text-white font-black flex items-center justify-center text-xs shadow-2xs ring-2 ring-amber-300 animate-pulse"
                    >
                      {currentPuzzle.unitVal}
                    </div>
                  ))}
                </div>
                <span className="font-black text-sm ml-2 text-amber-600 dark:text-amber-400">
                  = {currentPuzzle.partsA * currentPuzzle.unitVal} {currentPuzzle.unitName} (+{currentPuzzle.diffQty} more!)
                </span>
              </div>
            </div>

            {/* Step-by-Step Logic Card */}
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-1">
              <span className="font-bold text-purple-800 dark:text-purple-200 block">
                {currentPuzzle.explanation}
              </span>
              <div className="flex items-center justify-between pt-1 border-t border-purple-300 dark:border-purple-700 text-slate-700 dark:text-slate-300 font-mono">
                <span>1 Unit Block = <strong>{currentPuzzle.unitVal} {currentPuzzle.unitName}</strong></span>
                <span>Total Combined = <strong>{currentPuzzle.totalQty} {currentPuzzle.unitName}</strong></span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 26. BIDMAS BRACKETS BOARD (VIP Velvet Rope)
     * ---------------------------------------------------- */
    case 'bidmas_brackets_board': {
      const bracketPuzzles = [
        {
          title: 'Ex 1: (2 + 3) × 4 vs 2 + 3 × 4',
          withoutExp: '2 + 3 × 4',
          withoutStep1: 'Multiply first: 3 × 4 = 12',
          withoutRes: '2 + 12 = 14',
          withExp: '(2 + 3) × 4',
          withStep1: 'VIP Brackets first: 2 + 3 = 5',
          withRes: '5 × 4 = 20',
          moral: 'Brackets completely flip the winner from 14 to 20!',
        },
        {
          title: 'Ex 2: (30 − 6) ÷ 3 vs 30 − 6 ÷ 3',
          withoutExp: '30 − 6 ÷ 3',
          withoutStep1: 'Divide first: 6 ÷ 3 = 2',
          withoutRes: '30 − 2 = 28',
          withExp: '(30 − 6) ÷ 3',
          withStep1: 'VIP Brackets first: 30 − 6 = 24',
          withRes: '24 ÷ 3 = 8',
          moral: 'Without brackets: 28! With brackets: 8!',
        },
        {
          title: 'Ex 3: 4 × (2 + 3)² vs (4 × 2) + 3²',
          withoutExp: '(4 × 2) + 3²',
          withoutStep1: 'Brackets 4×2=8, Indices 3²=9',
          withoutRes: '8 + 9 = 17',
          withExp: '4 × (2 + 3)²',
          withStep1: 'Brackets 2+3=5, Indices 5²=25',
          withRes: '4 × 25 = 100',
          moral: 'Powers apply to the result of brackets: 5² = 25, giving 100!',
        },
      ];

      const currentBp = bracketPuzzles[bracketsExIdx] || bracketPuzzles[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div
            className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--contrast-amber)',
            }}
          >
            <span className="font-extrabold">
              👑 VIP Brackets: Jump Straight to the Front of the Queue!
            </span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              Whatever is inside brackets () MUST be computed first!
            </span>
          </div>

          {/* Puzzle Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {bracketPuzzles.map((bp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setBracketsExIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  bracketsExIdx === idx
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {bp.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Showdown Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Without Brackets */}
            <div
              className="p-4 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-card)',
              }}
            >
              <span className="text-[10px] font-black uppercase tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
                Standard Rules (No Brackets):
              </span>
              <div className="text-lg font-mono font-black" style={{ color: 'var(--text-primary)' }}>
                {currentBp.withoutExp}
              </div>
              <div className="space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <div>Step 1: {currentBp.withoutStep1}</div>
                <div className="font-bold text-sm text-blue-600 dark:text-blue-400">
                  Result: {currentBp.withoutRes}
                </div>
              </div>
            </div>

            {/* With VIP Brackets */}
            <div
              className="p-4 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--contrast-amber-bg)',
                borderColor: 'var(--contrast-amber-border)',
              }}
            >
              <span className="text-[10px] font-black uppercase tracking-wider block" style={{ color: 'var(--contrast-amber)' }}>
                VIP Brackets Override:
              </span>
              <div className="text-lg font-mono font-black" style={{ color: 'var(--contrast-amber)' }}>
                {currentBp.withExp}
              </div>
              <div className="space-y-1" style={{ color: 'var(--text-primary)' }}>
                <div>Step 1: {currentBp.withStep1}</div>
                <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  Result: {currentBp.withRes}
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-2.5 rounded-lg border text-xs text-center font-medium"
            style={{
              backgroundColor: 'var(--contrast-amber-bg)',
              borderColor: 'var(--contrast-amber-border)',
              color: 'var(--text-primary)',
            }}
          >
            ⭐ <strong style={{ color: 'var(--contrast-amber)' }}>Key Insight:</strong> {currentBp.moral}
          </div>
        </div>
      );
    }

    /* ----------------------------------------------------
     * 27. BIDMAS LEFT TO RIGHT (Equal Rank Tie-Breaker)
     * ---------------------------------------------------- */
    case 'bidmas_left_to_right': {
      const tieBreakers = [
        {
          title: 'Ex 1: 12 ÷ 3 × 2',
          expression: '12 ÷ 3 × 2',
          correctStep: '12 ÷ 3 = 4, then 4 × 2 = 8',
          correctResult: '8',
          wrongStep: 'Doing 3 × 2 = 6 first, then 12 ÷ 6 = 2',
          wrongResult: '2',
          rule: '÷ and × have EQUAL rank! Work strictly left to right.',
        },
        {
          title: 'Ex 2: 20 − 7 + 3',
          expression: '20 − 7 + 3',
          correctStep: '20 − 7 = 13, then 13 + 3 = 16',
          correctResult: '16',
          wrongStep: 'Doing 7 + 3 = 10 first, then 20 − 10 = 10',
          wrongResult: '10',
          rule: '− and + have EQUAL rank! "A" does NOT outrank "S". Go left to right.',
        },
        {
          title: 'Ex 3: 24 ÷ 4 × 2 ÷ 3',
          expression: '24 ÷ 4 × 2 ÷ 3',
          correctStep: '24 ÷ 4 = 6 ➔ 6 × 2 = 12 ➔ 12 ÷ 3 = 4',
          correctResult: '4',
          wrongStep: 'Multiplying in the middle first',
          wrongResult: 'Incorrect',
          rule: 'A chain of × and ÷ is resolved one operation at a time from left to right.',
        },
      ];

      const currentTb = tieBreakers[leftRightExIdx] || tieBreakers[0];

      return (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-blue-800 dark:text-blue-200">
              📖 Equal Rank Twins: Work strictly LEFT TO RIGHT!
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              (÷ and × are tied) &amp; (+ and − are tied)
            </span>
          </div>

          {/* Selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {tieBreakers.map((tb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setLeftRightExIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  leftRightExIdx === idx
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                }`}
              >
                {tb.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Showdown Stage */}
          <div
            className="p-4 rounded-xl border space-y-3 shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="text-xl font-mono font-black text-center text-blue-600 dark:text-blue-400">
              {currentTb.expression}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 space-y-1">
                <span className="font-black text-sm block">✓ Correct (Left to Right):</span>
                <p>{currentTb.correctStep}</p>
                <span className="font-black text-base text-emerald-600 dark:text-emerald-400 block">
                  = {currentTb.correctResult}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-200 space-y-1">
                <span className="font-black text-sm block">✗ Common SATs Trap:</span>
                <p>{currentTb.wrongStep}</p>
                <span className="font-black text-base text-red-600 dark:text-red-400 block">
                  = {currentTb.wrongResult} (WRONG!)
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-center text-slate-700 dark:text-slate-300">
              ⭐ <strong>Tie-Breaker Rule:</strong> {currentTb.rule}
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
