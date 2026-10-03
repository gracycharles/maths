/**
 * Sound Effects Engine using Web Audio API
 * Provides cheerful, kid-friendly acoustic feedback for quiz questions,
 * interactive checkpoints, matching pair connections, tab switches, and victory celebrations.
 */

class SoundEffectsEngine {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('sat_maths_sound_fx');
        if (stored !== null) {
          this.isEnabled = stored === 'true';
        }
      }
    } catch {
      this.isEnabled = true;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    try {
      localStorage.setItem('sat_maths_sound_fx', enabled ? 'true' : 'false');
    } catch {
      // Ignore local storage error
    }
  }

  public toggle(): boolean {
    const nextState = !this.isEnabled;
    this.setEnabled(nextState);
    if (nextState) {
      this.playCorrectSound();
    }
    return nextState;
  }

  /**
   * Tactile click sound for UI buttons
   */
  public playClickSound(): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.04);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Crisp tab switch sound
   */
  public playTabSound(): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.06);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Interactive sandbox & visualizer action sound (e.g. fraction bar slider)
   */
  public playToolActionSound(pitchMultiplier = 1.0): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 480 * pitchMultiplier;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  private lastCorrectSoundIndex: number = -1;

  /**
   * Cheerful, uplifting celebration sound for correct answers with 7 distinct acoustic variations
   */
  public playCorrectSound(forcedVariation?: number): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const variations = [
      () => this.playChimeArpeggio(ctx),
      () => this.playMarimbaBounce(ctx),
      () => this.playArcadePowerUp(ctx),
      () => this.playCrystalBells(ctx),
      () => this.playStaccatoFanfare(ctx),
      () => this.playMagicWandTwinkle(ctx),
      () => this.playHappyWhimsicalBounce(ctx),
    ];

    let choice = forcedVariation;
    if (choice === undefined || choice < 0 || choice >= variations.length) {
      let nextChoice = Math.floor(Math.random() * variations.length);
      if (nextChoice === this.lastCorrectSoundIndex) {
        nextChoice = (nextChoice + 1) % variations.length;
      }
      choice = nextChoice;
    }

    this.lastCorrectSoundIndex = choice;
    variations[choice]();
  }

  private playChimeArpeggio(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0.0, dur: 0.28 },  // C5
      { freq: 659.25, time: 0.08, dur: 0.32 }, // E5
      { freq: 783.99, time: 0.16, dur: 0.36 }, // G5
      { freq: 1046.5, time: 0.24, dur: 0.55 }, // C6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3400, now + time);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.26, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  private playMarimbaBounce(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const notes = [
      { freq: 392.0, time: 0.0, dur: 0.18 },   // G4
      { freq: 523.25, time: 0.06, dur: 0.2 },  // C5
      { freq: 659.25, time: 0.12, dur: 0.22 }, // E5
      { freq: 783.99, time: 0.18, dur: 0.26 }, // G5
      { freq: 1046.5, time: 0.25, dur: 0.45 }, // C6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.3, now + time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  private playArcadePowerUp(ctx: AudioContext): void {
    const now = ctx.currentTime;

    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();

    sweepOsc.type = 'square';
    sweepOsc.frequency.setValueAtTime(440, now);
    sweepOsc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    sweepOsc.frequency.exponentialRampToValueAtTime(1320, now + 0.16);

    sweepGain.gain.setValueAtTime(0.0001, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    sweepOsc.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.22);

    const ringOsc = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ringOsc.type = 'triangle';
    ringOsc.frequency.setValueAtTime(1760, now + 0.15);

    ringGain.gain.setValueAtTime(0.0001, now + 0.15);
    ringGain.gain.exponentialRampToValueAtTime(0.24, now + 0.17);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    ringOsc.connect(ringGain);
    ringGain.connect(ctx.destination);
    ringOsc.start(now + 0.15);
    ringOsc.stop(now + 0.48);
  }

  private playCrystalBells(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const notes = [
      { freq: 659.25, time: 0.0, dur: 0.25 },   // E5
      { freq: 830.61, time: 0.07, dur: 0.3 },   // G#5
      { freq: 987.77, time: 0.14, dur: 0.35 },  // B5
      { freq: 1318.51, time: 0.21, dur: 0.55 }, // E6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.24, now + time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  private playStaccatoFanfare(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const notes = [
      { freq: 783.99, time: 0.0, dur: 0.1 },
      { freq: 783.99, time: 0.1, dur: 0.1 },
      { freq: 783.99, time: 0.2, dur: 0.12 },
      { freq: 1046.5, time: 0.32, dur: 0.5 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.3, now + time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  private playMagicWandTwinkle(ctx: AudioContext): void {
    const now = ctx.currentTime;
    const notes = [
      { freq: 1046.5, time: 0.0, dur: 0.15 },
      { freq: 1174.66, time: 0.05, dur: 0.15 },
      { freq: 1318.51, time: 0.10, dur: 0.18 },
      { freq: 1567.98, time: 0.15, dur: 0.20 },
      { freq: 1760.0, time: 0.20, dur: 0.22 },
      { freq: 2093.0, time: 0.26, dur: 0.50 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.18, now + time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  private playHappyWhimsicalBounce(ctx: AudioContext): void {
    const now = ctx.currentTime;

    const bounceOsc = ctx.createOscillator();
    const bounceGain = ctx.createGain();
    bounceOsc.type = 'sine';
    bounceOsc.frequency.setValueAtTime(440, now);
    bounceOsc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    bounceGain.gain.setValueAtTime(0.0001, now);
    bounceGain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
    bounceGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    bounceOsc.connect(bounceGain);
    bounceGain.connect(ctx.destination);
    bounceOsc.start(now);
    bounceOsc.stop(now + 0.16);

    const triad = [587.33, 739.99, 880.0, 1174.66];
    triad.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + 0.13 + idx * 0.04;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  public playWrongSound(): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const tones = [
      { startFreq: 260, endFreq: 220, time: 0.0, dur: 0.22 },
      { startFreq: 190, endFreq: 155, time: 0.16, dur: 0.32 },
    ];

    tones.forEach(({ startFreq, endFreq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now + time);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + time + dur * 0.9);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  public playPairConnectedSound(): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playVictoryFanfare(): void {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fanfare = [
      { freq: 523.25, time: 0.0, dur: 0.18 },
      { freq: 523.25, time: 0.16, dur: 0.18 },
      { freq: 523.25, time: 0.32, dur: 0.18 },
      { freq: 659.25, time: 0.48, dur: 0.35 },
      { freq: 783.99, time: 0.80, dur: 0.25 },
      { freq: 1046.5, time: 1.05, dur: 0.8 },
    ];

    fanfare.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = freq === 1046.5 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.28, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }
}

export const soundEffects = new SoundEffectsEngine();

export function playSound(type: 'click' | 'tab' | 'correct' | 'wrong' | 'match' | 'fanfare' | 'tool' | string): void {
  switch (type) {
    case 'click':
      soundEffects.playClickSound();
      break;
    case 'tab':
      soundEffects.playTabSound();
      break;
    case 'tool':
      soundEffects.playToolActionSound();
      break;
    case 'correct':
      soundEffects.playCorrectSound();
      break;
    case 'wrong':
      soundEffects.playWrongSound();
      break;
    case 'match':
      soundEffects.playPairConnectedSound();
      break;
    case 'fanfare':
      soundEffects.playVictoryFanfare();
      break;
    default:
      soundEffects.playClickSound();
      break;
  }
}
