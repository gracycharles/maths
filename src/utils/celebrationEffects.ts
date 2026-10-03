import confetti from 'canvas-confetti';

/**
 * Kid-friendly celebration effects & appreciation engine for Maths Master
 * Provides varied visual confetti decors and empowering, creative praise.
 */

export interface AppreciationMessage {
  title: string;
  subtitle: string;
  emoji: string;
  celebrationBadge: string;
  decorName: string;
}

// 32+ Creative, motivating title praise variations with uplifting emojis & badges
const APPRECIATION_TITLES: { title: string; emoji: string; badge: string; decorName: string }[] = [
  { title: 'Spot On, Math Legend!', emoji: '🌟', badge: 'Math Legend', decorName: 'Starlight Sparkle' },
  { title: 'Bullseye! Calculated to Perfection!', emoji: '🎯', badge: 'Sharp Shooter', decorName: 'Bullseye Target' },
  { title: 'Pure Brain Power in Action!', emoji: '⚡', badge: 'High Voltage', decorName: 'Lightning Burst' },
  { title: 'Math Wizard Status Achieved!', emoji: '🧙‍♂️✨', badge: 'Spellbound', decorName: 'Magic Wand' },
  { title: 'Absolute Genius at Work!', emoji: '💡', badge: 'Brilliant Mind', decorName: 'Inspiration Blast' },
  { title: 'Spectacular Cosmic Reasoning!', emoji: '🚀', badge: 'Cosmic Logic', decorName: 'Rocket Launch' },
  { title: 'Boom! That Problem Had No Chance!', emoji: '💥', badge: 'Problem Buster', decorName: 'Cosmic Popper' },
  { title: 'Top-Notch Logic! High Five!', emoji: '✋', badge: 'High Five', decorName: 'Golden Ribbon' },
  { title: 'Sharp as a Needle! You Crushed It!', emoji: '🧠', badge: 'Sharp Thinker', decorName: 'Crystal Gem' },
  { title: 'Outstanding Problem Solving!', emoji: '🏆', badge: 'Gold Trophy', decorName: 'Trophy Shower' },
  { title: 'Mathematical Mastery Unlocked!', emoji: '🔑', badge: 'Master Key', decorName: 'Golden Cascade' },
  { title: 'Precision Level 100! Phenomenal!', emoji: '💎', badge: 'Flawless Gem', decorName: 'Diamond Shimmer' },
  { title: 'Equations Fear You! Incredible!', emoji: '🦁', badge: 'Math Champion', decorName: 'Safari Lion' },
  { title: 'Golden Ratio of Greatness!', emoji: '⭐', badge: 'Star Pupil', decorName: 'Golden Spiral' },
  { title: 'First-Rate Deductive Thinking!', emoji: '🧩', badge: 'Puzzle Master', decorName: 'Puzzle Sparkle' },
  { title: 'Math Superhero Powers Activated!', emoji: '🦸‍♀️', badge: 'Super Scholar', decorName: 'Hero Cape' },
  { title: 'Lightning Fast Calculation!', emoji: '⚡', badge: 'Speed Demon', decorName: 'Turbo Dash' },
  { title: 'Flawless Step-by-Step Logic!', emoji: '📐', badge: 'Geometry Ace', decorName: 'Protractor Arc' },
  { title: 'Superb Mathematical Instincts!', emoji: '🦉', badge: 'Wise Owl', decorName: 'Moonlight Glow' },
  { title: 'Arithmetic Sorcery! Bravo!', emoji: '🪄', badge: 'Enchanter', decorName: 'Fairy Dust' },
  { title: 'Astronomical Brilliance!', emoji: '🪐', badge: 'Galaxy Brain', decorName: 'Saturn Rings' },
  { title: 'Unshakable Focus and Grit!', emoji: '🛡️', badge: 'Iron Will', decorName: 'Hero Shield' },
  { title: 'Diamond-Grade Accuracy!', emoji: '✨', badge: 'Crystal Core', decorName: 'Prism Flare' },
  { title: 'Eagle-Eyed Proof Reader!', emoji: '🦅', badge: 'Eagle Eye', decorName: 'Sky High' },
  { title: 'Phenomenal Pattern Detective!', emoji: '🔍', badge: 'Sherlock Math', decorName: 'Magnifier' },
  { title: 'Grandmaster of Calculations!', emoji: '👑', badge: 'Crown Jewel', decorName: 'Royal Fanfare' },
  { title: 'Slicker than a Sliding Rule!', emoji: '🛹', badge: 'Smooth Operator', decorName: 'Skate Hop' },
  { title: 'Algebraic Supernova!', emoji: '🎆', badge: 'Supernova', decorName: 'Star Nebula' },
  { title: 'Champion of the Number Line!', emoji: '🥇', badge: 'Number One', decorName: 'Olympic Gold' },
  { title: 'Unstoppable Momentum!', emoji: '🚄', badge: 'Bullet Train', decorName: 'Hyper Speed' },
  { title: 'Textbook Precision & Finesse!', emoji: '📚', badge: 'Distinction', decorName: 'Honor Roll' },
  { title: 'Mind-Blowing Mental Math!', emoji: '🤯', badge: 'Mind Blown', decorName: 'Brainstorm' },
];

/**
 * Returns a dynamically crafted, non-repetitive appreciation message
 */
export function getAppreciationMessage(
  questionNumber: number,
  attemptsCount: number,
  difficulty?: 'easy' | 'medium' | 'hard'
): AppreciationMessage {
  // Use a pseudo-random rotation combined with question number to ensure no back-to-back repeats
  const index = (questionNumber * 11 + attemptsCount * 7 + Math.floor(Math.random() * 5)) % APPRECIATION_TITLES.length;
  const item = APPRECIATION_TITLES[index];

  let subtitle = '';
  if (attemptsCount === 1) {
    const firstTryQuotes = [
      'Nailed it on the very first try — textbook accuracy!',
      'Zero mistakes on that run. Pure focus and mathematical insight!',
      'First attempt perfection! Your problem-solving instincts are razor-sharp.',
      'Direct hit on attempt 1! You breezed through that like a true pro.',
      'One shot, one bullseye! That’s how real champions do mathematics.',
      'Flawless opening move! Clear calculation and absolute certainty.',
    ];
    subtitle = firstTryQuotes[(questionNumber + attemptsCount) % firstTryQuotes.length];
  } else {
    const persistenceQuotes = [
      'Superb persistence! You analyzed the steps and cracked the code!',
      'Real mathematicians learn from every step — great problem-solving grit!',
      'Way to stick with it! You adjusted your reasoning and conquered it!',
      'Mastered through reflection! That proves genuine deep understanding.',
      'Growth mindset in action! You refined your calculation to perfection.',
      'Awesome comeback! That determination is what builds true math genius.',
    ];
    subtitle = persistenceQuotes[(questionNumber + attemptsCount) % persistenceQuotes.length];
  }

  if (difficulty === 'hard') {
    subtitle += ' Conquered a Level 3 Reasoning Challenge!';
  } else if (difficulty === 'medium') {
    subtitle += ' Multi-step application mastered!';
  }

  return {
    title: item.title,
    subtitle,
    emoji: item.emoji,
    celebrationBadge: item.badge,
    decorName: item.decorName,
  };
}

let lastConfettiStyleIndex = -1;

/**
 * Triggers one of 8 distinct, cheerful celebration confetti decors:
 * 1. Dual side cannons with gold/amber stars
 * 2. Rainbow spiral shower with floating ribbons
 * 3. Cosmic rocket comet launch (high vertical velocity)
 * 4. Staggered party popper double-burst (carnival fiesta)
 * 5. Shimmering diamond & crystal shower (cyan, aqua, lavender)
 * 6. Solar flare starburst (360 radiant expansion)
 * 7. Emerald & gold treasure shower (coins & gems)
 * 8. Grand fireworks multi-wave finale (for milestones or hard problems)
 */
export function triggerCelebrationConfetti(isSpecialMilestone: boolean = false): void {
  try {
    const styles = [
      // 1. Dual Golden Starburst Cannons (left & right stage burst)
      () => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.04, y: 0.72 },
          colors: ['#f59e0b', '#fbbf24', '#d97706', '#fef3c7', '#ffd700'],
          shapes: ['star', 'circle'],
          scalar: 1.2,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.96, y: 0.72 },
          colors: ['#f59e0b', '#fbbf24', '#10b981', '#6ee7b7', '#ffd700'],
          shapes: ['star', 'circle'],
          scalar: 1.2,
        });
      },

      // 2. Rainbow Spiral Shower (wide vibrant canopy)
      () => {
        confetti({
          particleCount: 75,
          spread: 100,
          origin: { x: 0.5, y: 0.62 },
          colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4'],
          shapes: ['circle', 'square'],
          decay: 0.91,
          scalar: 1.15,
        });
      },

      // 3. Cosmic Rocket Comet Fountain (high velocity upward launch)
      () => {
        confetti({
          particleCount: 70,
          spread: 55,
          startVelocity: 48,
          origin: { x: 0.5, y: 0.85 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ffffff'],
          shapes: ['star'],
          scalar: 1.35,
        });
      },

      // 4. Staggered Party Popper Double-Burst
      () => {
        confetti({
          particleCount: 45,
          angle: 70,
          spread: 70,
          origin: { x: 0.35, y: 0.7 },
          colors: ['#10b981', '#f59e0b', '#3b82f6'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 110,
            spread: 70,
            origin: { x: 0.65, y: 0.7 },
            colors: ['#ec4899', '#8b5cf6', '#f59e0b', '#ffd700'],
          });
        }, 130);
      },

      // 5. Shimmering Diamond & Crystal Shower (luminous cool cyan & violet)
      () => {
        confetti({
          particleCount: 65,
          spread: 85,
          origin: { x: 0.5, y: 0.58 },
          colors: ['#38bdf8', '#818cf8', '#c084fc', '#e0e7ff', '#a5f3fc'],
          shapes: ['star', 'circle'],
          scalar: 1.25,
          ticks: 240,
        });
      },

      // 6. Solar Flare Starburst (radiant warm gold & amber 360 burst)
      () => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { x: 0.5, y: 0.65 },
          colors: ['#f59e0b', '#fbbf24', '#f97316', '#ef4444', '#fef08a'],
          shapes: ['star'],
          scalar: 1.3,
        });
      },

      // 7. Emerald & Gold Treasure Shower (rich green and gold victory rain)
      () => {
        confetti({
          particleCount: 70,
          angle: 90,
          spread: 80,
          origin: { x: 0.5, y: 0.7 },
          colors: ['#10b981', '#059669', '#34d399', '#f59e0b', '#fbbf24'],
          shapes: ['circle', 'square'],
          scalar: 1.2,
        });
      },

      // 8. Grand Fireworks Multi-Wave Show
      () => {
        confetti({
          particleCount: 85,
          spread: 110,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#ffd700', '#f59e0b', '#10b981', '#38bdf8', '#c084fc', '#f43f5e'],
          shapes: ['star', 'circle'],
          scalar: 1.35,
        });
        setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 55,
            spread: 60,
            origin: { x: 0.1, y: 0.65 },
            colors: ['#fbbf24', '#f59e0b'],
          });
          confetti({
            particleCount: 40,
            angle: 125,
            spread: 60,
            origin: { x: 0.9, y: 0.65 },
            colors: ['#38bdf8', '#818cf8'],
          });
        }, 160);
      },
    ];

    if (isSpecialMilestone) {
      // Milestone / 100% completion: triple burst grand finale!
      styles[7]();
      setTimeout(() => styles[0](), 220);
      setTimeout(() => styles[1](), 420);
      return;
    }

    let choice = Math.floor(Math.random() * styles.length);
    if (choice === lastConfettiStyleIndex) {
      choice = (choice + 1) % styles.length;
    }
    lastConfettiStyleIndex = choice;
    styles[choice]();
  } catch {
    // Fail silently if canvas context is restricted in background
  }
}
