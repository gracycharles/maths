/**
 * Audio Speech Synthesis engine with Mathematical expression pre-processing
 * Converts LaTeX and mathematical shorthand into natural conversational English speech.
 */

export function cleanMathForSpeech(text: string): string {
  if (!text) return '';

  let speech = text;

  // Clean redundant section labels: e.g. "Section 1: 1. The Roller..." -> "Section 1: The Roller..."
  speech = speech.replace(/\bSection\s+(\d+):\s*\1\.\s*/gi, 'Section $1: ');

  // Replace Markdown headers and bold/italic syntax
  speech = speech.replace(/#{1,6}\s+/g, '');
  speech = speech.replace(/\*\*(.*?)\*\*/g, '$1');
  speech = speech.replace(/\*(.*?)\*/g, '$1');
  speech = speech.replace(/`([^`]+)`/g, '$1');

  // Strip LaTeX text and formatting commands
  speech = speech.replace(/\\text\{([^}]+)\}/g, '$1');
  speech = speech.replace(/\\mathrm\{([^}]+)\}/g, '$1');
  speech = speech.replace(/\\mathbf\{([^}]+)\}/g, '$1');
  speech = speech.replace(/\\mathit\{([^}]+)\}/g, '$1');
  speech = speech.replace(/\\underline\{([^}]+)\}/g, '$1');

  // 1. Common English & Latin Abbreviations (Fix "e.g." reading as "eg", "i.e." as "eye", etc.)
  // e.g. / E.g. / eg. / (e.g. 4.95) -> "for example"
  speech = speech.replace(/\b(?:e\.g\.|e\.g|eg\.|eg)\b:?/gi, 'for example, ');
  // i.e. / I.e. / ie. -> "that is"
  speech = speech.replace(/\b(?:i\.e\.|i\.e|ie\.)\b:?/gi, 'that is, ');
  // etc. / etc -> "and so on"
  speech = speech.replace(/\b(?:etc\.|etc)\b/gi, 'and so on');
  // ex. / Ex. 1 -> "example 1"
  speech = speech.replace(/\b(?:ex\.|Ex\.)\s*(\d+)\b/g, 'example $1');
  speech = speech.replace(/\b(?:ex\.|Ex\.)\b:?/g, 'example: ');
  // vs. / vs / v. -> "versus"
  speech = speech.replace(/\b(?:vs\.|vs)\b/gi, 'versus');
  // approx. / approx -> "approximately"
  speech = speech.replace(/\b(?:approx\.|approx)\b/gi, 'approximately');
  // w.r.t. -> "with respect to"
  speech = speech.replace(/\b(?:w\.r\.t\.|wrt)\b/gi, 'with respect to');
  // No. / Nos. -> "number" / "numbers"
  speech = speech.replace(/\b(?:no\.|No\.)\s*(\d+)\b/g, 'number $1');
  speech = speech.replace(/\b(?:nos\.|Nos\.)\s*(\d+)\b/g, 'numbers $1');
  // Q1, Q2 -> "Question 1, Question 2"
  speech = speech.replace(/\bQ(\d+)\b/gi, 'Question $1');

  // 2. Curriculum & Assessment Acronyms & Base Systems
  speech = speech.replace(/\b(?:LCM|lcm)\b/g, 'L C M, lowest common multiple');
  speech = speech.replace(/\b(?:HCF|hcf)\b/g, 'H C F, highest common factor');
  speech = speech.replace(/\bBIDMAS\b/g, 'Bid-mass');
  speech = speech.replace(/\bBODMAS\b/g, 'Bod-mass');
  speech = speech.replace(/\b(?:SATs|SATS)\b/g, 'Sats');
  speech = speech.replace(/\b(?:KS2|ks2)\b/g, 'Key Stage 2');
  speech = speech.replace(/\b(?:KS1|ks1)\b/g, 'Key Stage 1');

  // Base System Normalization (Prevents TTS from spelling B-A-S-E letter-by-letter)
  speech = speech.replace(/\bBase-10\b/gi, 'base ten');
  speech = speech.replace(/\bBase-60\b/gi, 'base sixty');
  speech = speech.replace(/\bBase-2\b/gi, 'base two');
  speech = speech.replace(/\bBase-(\d+)\b/gi, 'base $1');
  speech = speech.replace(/\bBase\b/g, 'base');

  // 3. Currency Formatting (UK Pounds & Pence)
  // £4.95 -> 4 pounds and 95 pence
  speech = speech.replace(/£(\d+)\.(\d{2})\b/g, '$1 pounds and $2 pence');
  speech = speech.replace(/£(\d+)\.(\d)\b/g, '$1 pounds and $20 pence');
  speech = speech.replace(/£1\b/g, '1 pound');
  speech = speech.replace(/£(\d+)\b/g, '$1 pounds');
  // 85p / 50p -> 85 pence / 50 pence
  speech = speech.replace(/\b(\d+)p\b/g, '$1 pence');

  // 4. LaTeX Vectors & Matrices
  speech = speech.replace(
    /\\begin\{pmatrix\}\s*([^\\]+)\s*\\\\\s*([^\\]+)\s*\\end\{pmatrix\}/g,
    'vector: $1 horizontal, $2 vertical'
  );
  speech = speech.replace(/\\vec\{([^}]+)\}/g, 'vector $1');

  // 5. Mixed numbers: 1\frac{3}{20} or 1 3/20 -> 1 and 3 over 20
  speech = speech.replace(/(\d+)\s*\\frac\{([^}]+)\}\{([^}]+)\}/gi, '$1 and $2 over $3');
  speech = speech.replace(/(\d+)\s*\bfrac\{([^}]+)\}\{([^}]+)\}/gi, '$1 and $2 over $3');
  speech = speech.replace(/(\d+)\s*\\frac\s*(\d+)\s*(\d+)/gi, '$1 and $2 over $3');
  speech = speech.replace(/\b(\d+)\s+(\d+)\/(\d+)\b/g, '$1 and $2 over $3');

  // 6. Fractions: \frac{a}{b}, \frac25, or 2/5 -> a over b
  speech = speech.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/gi, '$1 over $2');
  speech = speech.replace(/\bfrac\{([^}]+)\}\{([^}]+)\}/gi, '$1 over $2');
  speech = speech.replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])/gi, '$1 over $2');
  // Simple fractions like 3/4 or 1/2
  speech = speech.replace(/\b(\d+)\/(\d+)\b/g, '$1 over $2');

  // 7. Ratios: 2:3 or 1:4:5 -> 2 to 3 / 1 to 4 to 5
  speech = speech.replace(/\b(\d+)\s*:\s*(\d+)\s*:\s*(\d+)\b/g, '$1 to $2 to $3');
  speech = speech.replace(/\b(\d+)\s*:\s*(\d+)\b/g, '$1 to $2');

  // 8. Square roots: \sqrt{x} or \sqrt[n]{x}
  speech = speech.replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, '$1-th root of $2');
  speech = speech.replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1');
  speech = speech.replace(/√(\w+|\([^)]+\))/g, 'square root of $1');

  // 9. Units & Measurement conversions
  speech = speech.replace(/cm\^3|cu\s*cm|cubic\s*cm/gi, 'cubic centimetres');
  speech = speech.replace(/m\^3|cu\s*m|cubic\s*m/gi, 'cubic metres');
  speech = speech.replace(/cm\^2|sq\s*cm|square\s*cm/gi, 'square centimetres');
  speech = speech.replace(/m\^2|sq\s*m|square\s*m/gi, 'square metres');
  speech = speech.replace(/km\^2|sq\s*km|square\s*km/gi, 'square kilometres');

  speech = speech.replace(/(\d+(?:\.\d+)?)\s*km\/h\b|(\d+)\s*kmph\b/gi, '$1 kilometres per hour');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*mph\b/gi, '$1 miles per hour');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*m\/s\b/gi, '$1 metres per second');

  speech = speech.replace(/(\d+(?:\.\d+)?)\s*mm\b/gi, '$1 millimetres');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*cm\b/gi, '$1 centimetres');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*km\b/gi, '$1 kilometres');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*kg\b/gi, '$1 kilograms');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*mg\b/gi, '$1 milligrams');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*ml\b/gi, '$1 millilitres');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*cl\b/gi, '$1 centilitres');

  speech = speech.replace(/(\d+(?:\.\d+)?)\s*hrs?\b/gi, '$1 hours');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*mins?\b/gi, '$1 minutes');
  speech = speech.replace(/(\d+(?:\.\d+)?)\s*secs?\b/gi, '$1 seconds');

  speech = speech.replace(/(\d+)\s*(?:d\.p\.|dp)\b/gi, '$1 decimal places');
  speech = speech.replace(/(\d+)\s*(?:s\.f\.|sf)\b/gi, '$1 significant figures');

  // Temperatures
  speech = speech.replace(/(-?\d+(?:\.\d+)?)\s*°C\b/g, '$1 degrees Celsius');
  speech = speech.replace(/(-?\d+(?:\.\d+)?)\s*°F\b/g, '$1 degrees Fahrenheit');
  speech = speech.replace(/°/g, ' degrees ');

  // 10. Powers and exponents
  speech = speech.replace(/([a-zA-Z0-9)]+)\^2\b/g, '$1 squared');
  speech = speech.replace(/([a-zA-Z0-9)]+)\^3\b/g, '$1 cubed');
  speech = speech.replace(/([a-zA-Z0-9)]+)\^\{?(-?\d+|[a-zA-Z]+)\}?/g, '$1 to the power of $2');

  // 11. Arithmetic operations
  // 6 × 6 or 38 x 46 -> 6 times 6
  speech = speech.replace(/(\d+)\s*[×xX]\s*(\d+)/g, '$1 times $2');

  // LaTeX spacing commands: \; \, \: \! \quad \qquad
  speech = speech.replace(/\\[,;:! ]/g, ' ');
  speech = speech.replace(/\\quad|\\qquad/g, ' ');

  // Special math operators & symbols
  speech = speech.replace(/\\implies/g, ' which gives ');
  speech = speech.replace(/\\to|\\rightarrow/g, ' becomes ');
  speech = speech.replace(/\\cdot/g, ' times ');
  speech = speech.replace(/\\pm|±/g, ' plus or minus ');
  speech = speech.replace(/\\times|×/g, ' times ');
  speech = speech.replace(/\\div|÷/g, ' divided by ');
  speech = speech.replace(/\\neq|≠/g, ' is not equal to ');
  speech = speech.replace(/\\leq|\\le|≤/g, ' is less than or equal to ');
  speech = speech.replace(/\\geq|\\ge|≥/g, ' is greater than or equal to ');
  speech = speech.replace(/\\approx|≈/g, ' is approximately ');
  speech = speech.replace(/\\pi|π/g, ' pi ');
  speech = speech.replace(/\\theta|θ/g, ' theta ');
  speech = speech.replace(/\\degree/g, ' degrees ');
  speech = speech.replace(/\\%/g, ' percent');
  speech = speech.replace(/%/g, ' percent');

  // Typographic quotation marks & dashes
  speech = speech.replace(/[“”]/g, '"');
  speech = speech.replace(/[‘’]/g, "'");
  speech = speech.replace(/[—–]/g, ', ');

  // Clean any remaining LaTeX commands (\foo -> empty or word)
  speech = speech.replace(/\\[a-zA-Z]+/g, ' ');
  speech = speech.replace(/[{}]/g, '');
  speech = speech.replace(/\\\\/g, ' ');
  speech = speech.replace(/\\/g, '');
  speech = speech.replace(/\$/g, '');

  // Clarify numbered pedagogical steps (e.g. "1. Underline... 2. Circle..." -> "Step 1: Underline... Step 2: Circle...")
  speech = speech.replace(/(?<=(?:^|[.:!?\n]|\bto\b|\bnumber\b|\binstead:))\s*(\d+)\.\s+([A-Z])/gi, ' Step $1: $2');

  // Clean duplicate punctuation and extra spaces
  speech = speech.replace(/,\s*,+/g, ',');
  speech = speech.replace(/\s+/g, ' ').trim();

  return speech;
}

/**
 * Splits text into bite-sized spoken chunks (100-130 characters max).
 * This eliminates the 15-second browser speech synthesis cutoff bug completely,
 * allows smooth continuous playback, and ensures crystal-clear articulation.
 */
export function splitTextIntoSpeechChunks(text: string, maxChars = 130): string[] {
  if (!text) return [];

  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxChars) {
    return [clean];
  }

  // Split on sentence-ending punctuation: [.!?;\n] followed by space and capital letter, digit, or end
  // Keeps decimal numbers like 3.14 intact
  const rawSentences = clean.split(/(?<=[.!?;\n])\s+(?=[A-Z0-9])/);
  const chunks: string[] = [];

  for (let s of rawSentences) {
    s = s.trim();
    if (!s) continue;

    if (s.length <= maxChars) {
      chunks.push(s);
    } else {
      // Long sentence: split on natural clause boundaries (commas, colons, dashes, or conjunctions)
      const subClauses = s.split(/(?<=[,:\u2014\-])\s+|(?=\b(?:and|but|which|where|because)\b\s+)/i);
      let buffer = '';
      for (const sub of subClauses) {
        const subTrimmed = sub.trim();
        if (!subTrimmed) continue;
        if (!buffer) {
          buffer = subTrimmed;
        } else if (buffer.length + subTrimmed.length + 1 <= maxChars) {
          buffer += ' ' + subTrimmed;
        } else {
          chunks.push(buffer);
          buffer = subTrimmed;
        }
      }
      if (buffer) chunks.push(buffer);
    }
  }

  return chunks;
}

export interface AudioSpeechState {
  activeId: string | null;
  isSpeaking: boolean;
  isPaused: boolean;
  label: string | null;
  rate: number;
  currentChunkText?: string;
  currentChunkIndex?: number;
  totalChunks?: number;
}

export type AudioListener = (state: AudioSpeechState) => void;

class AudioSpeechManager {
  private currentId: string | null = null;
  private currentLabel: string | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<AudioListener> = new Set();
  private voices: SpeechSynthesisVoice[] = [];
  private _isSpeaking: boolean = false;
  private _isPaused: boolean = false;
  private _rate: number = 0.95;
  private _pitch: number = 1.08;
  private chunks: string[] = [];
  private currentChunkIndex: number = 0;
  private playSessionId: number = 0;
  private chunkWatchdogTimer: any = null;
  private pendingStartTimer: any = null;
  private activeChunkCallback: ((index: number, total: number, chunkText: string) => void) | null = null;
  private activeEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }

      // Global keyboard shortcut: Escape halts all audio reading
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._isSpeaking) {
          this.stop();
        }
      });

      // When tab/window is hidden (e.g. tablet locked or switching apps), cleanly stop
      // to avoid background audio hanging or zombie speaking states on mobile/tablet.
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this._isSpeaking) {
          this.stop();
        }
      });
    }
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          this.voices = v;
        }
      } catch (e) {
        // Safe fallback
      }
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    // Send immediate state snapshot
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): AudioSpeechState {
    return {
      activeId: this.currentId,
      isSpeaking: this._isSpeaking,
      isPaused: this._isPaused,
      label: this.currentLabel,
      rate: this._rate,
      currentChunkText: this.chunks[this.currentChunkIndex] || undefined,
      currentChunkIndex: this.currentChunkIndex,
      totalChunks: this.chunks.length,
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('AudioListener notification error:', err);
      }
    });
  }

  public isPlaying(): boolean {
    return this._isSpeaking && !this._isPaused;
  }

  public getCurrentId(): string | null {
    return this.currentId;
  }

  public getCurrentLabel(): string | null {
    return this.currentLabel;
  }

  public getRate(): number {
    return this._rate;
  }

  public setRate(rate: number) {
    this._rate = Math.max(0.5, Math.min(2.0, rate));
    if (this._isSpeaking && !this._isPaused && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.clearWatchdog();
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // safe fallback
      }
      setTimeout(() => {
        if (this._isSpeaking && !this._isPaused) {
          this.playCurrentChunk();
        }
      }, 50);
    }
    this.notify();
  }

  /**
   * Speaks an array of captions sequentially, firing onCaptionStart for each caption
   * and onEnd when the last caption completes. Enables 100% video-audio-caption synchronization.
   */
  public speakCaptions(
    id: string,
    captions: Array<{ id?: string; text: string; spokenText?: string }>,
    options?: {
      label?: string;
      rate?: number;
      pitch?: number;
      startIndex?: number;
      forcePlay?: boolean;
      onCaptionStart?: (index: number, caption: { id?: string; text: string; spokenText?: string }) => void;
      onEnd?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options?.onEnd?.();
      return;
    }

    if (this.currentId === id && !options?.forcePlay) {
      this.stop();
      return;
    }

    this.stop();

    if (!captions || captions.length === 0) {
      options?.onEnd?.();
      return;
    }

    // Clean each caption's text for speech
    this.chunks = captions
      .map((c) => cleanMathForSpeech(c.spokenText || c.text).trim())
      .filter(Boolean);

    if (this.chunks.length === 0) {
      options?.onEnd?.();
      return;
    }

    const session = ++this.playSessionId;
    this.currentId = id;
    this.currentLabel = options?.label || 'Classroom Clip';
    this._rate = options?.rate ?? this._rate;
    this._pitch = options?.pitch ?? 1.08;
    this.currentChunkIndex = Math.max(0, Math.min(options?.startIndex ?? 0, this.chunks.length - 1));
    this._isSpeaking = true;
    this._isPaused = false;
    this.activeChunkCallback = (idx, total, text) => {
      if (options?.onCaptionStart && captions[idx]) {
        try {
          options.onCaptionStart(idx, captions[idx]);
        } catch (e) {
          console.error('onCaptionStart error:', e);
        }
      }
    };
    this.activeEndCallback = options?.onEnd || null;

    this.notify();

    // Browser / iframe user gesture unlock & unpause safety
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    } catch {}

    this.clearPendingStart();
    if (this.playSessionId === session && this._isSpeaking) {
      this.playCurrentChunk();
    }
  }

  public speak(
    id: string,
    rawText: string,
    options?: {
      label?: string;
      rate?: number;
      pitch?: number;
      forcePlay?: boolean;
      onChunkChange?: (index: number, total: number, chunkText: string) => void;
      onEnd?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported on this browser.');
      return;
    }

    // If already playing this exact ID and not forcing play, clicking again immediately STOPS it
    if (this.currentId === id && !options?.forcePlay) {
      this.stop();
      return;
    }

    // Stop any ongoing speech first cleanly
    this.stop();

    const spokenText = cleanMathForSpeech(rawText);
    if (!spokenText.trim()) return;

    this.chunks = splitTextIntoSpeechChunks(spokenText);
    if (this.chunks.length === 0) return;

    const session = ++this.playSessionId;
    this.currentId = id;
    this.currentLabel = options?.label || cleanMathForSpeech(rawText).slice(0, 60);
    this._rate = options?.rate ?? this._rate;
    this._pitch = options?.pitch ?? 1.0;
    this.currentChunkIndex = 0;
    this._isSpeaking = true;
    this._isPaused = false;
    this.activeChunkCallback = options?.onChunkChange || null;
    this.activeEndCallback = options?.onEnd || null;

    this.notify();

    // Browser / iframe user gesture unlock & unpause safety
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    this.clearPendingStart();
    if (this.playSessionId === session && this._isSpeaking) {
      this.playCurrentChunk();
    }
  }

  private playCurrentChunk() {
    this.clearWatchdog();
    const sessionId = this.playSessionId;

    if (
      !this._isSpeaking ||
      this._isPaused ||
      this.currentChunkIndex >= this.chunks.length ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      const endCb = this.activeEndCallback;
      this.finish();
      endCb?.();
      return;
    }

    const chunkText = this.chunks[this.currentChunkIndex];
    if (!chunkText || !chunkText.trim()) {
      this.currentChunkIndex++;
      this.playCurrentChunk();
      return;
    }

    // Notify listeners and active chunk callback
    this.notify();
    if (this.activeChunkCallback) {
      try {
        this.activeChunkCallback(this.currentChunkIndex, this.chunks.length, chunkText);
      } catch (err) {
        console.error('ActiveChunkCallback error:', err);
      }
    }

    // Refresh voices if not yet cached (Android loads voices asynchronously)
    if (this.voices.length === 0) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = this._rate;
    utterance.pitch = this._pitch;

    // Pick preferred clear English voice (prioritizing British young female educational voices)
    if (this.voices.length > 0) {
      const preferredVoice =
        // 1. Highest priority: British English female voices
        this.voices.find(
          (v) =>
            v.lang.startsWith('en-GB') &&
            (v.name.includes('Female') ||
              v.name.includes('Hazel') ||
              v.name.includes('Serena') ||
              v.name.includes('Victoria') ||
              v.name.includes('Libby') ||
              v.name.includes('Sonia') ||
              v.name.includes('Stephanie') ||
              v.name.includes('Martha') ||
              v.name.includes('Amy') ||
              v.name.includes('Emily') ||
              v.name.includes('Google UK English Female') ||
              v.name.toLowerCase().includes('en-gb-wavenet-a') ||
              v.name.toLowerCase().includes('en-gb-neural2-a') ||
              v.name.toLowerCase().includes('en-gb-standard-a'))
        ) ||
        // 2. High priority: British English natural/online voices
        this.voices.find(
          (v) =>
            v.lang.startsWith('en-GB') &&
            (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))
        ) ||
        // 3. Any British English voice
        this.voices.find((v) => v.lang.startsWith('en-GB')) ||
        // 4. Other English female educational voices
        this.voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Female') ||
              v.name.includes('Samantha') ||
              v.name.includes('Jenny') ||
              v.name.includes('Zira'))
        ) ||
        // 5. Any English voice
        this.voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    this.currentUtterance = utterance;

    // Retain global reference in a persistent Set on window to prevent V8 Garbage Collection
    // on Android tablets and mobile browsers mid-speech.
    if (typeof window !== 'undefined') {
      if (!(window as any).__ttsUtteranceAnchor) {
        (window as any).__ttsUtteranceAnchor = new Set();
      }
      (window as any).__ttsUtteranceAnchor.add(utterance);
    }

    let chunkResolved = false;
    const advanceToNext = () => {
      if (chunkResolved) return;
      chunkResolved = true;
      this.clearWatchdog();

      if (typeof window !== 'undefined' && (window as any).__ttsUtteranceAnchor) {
        (window as any).__ttsUtteranceAnchor.delete(utterance);
      }

      if (this.playSessionId !== sessionId || !this._isSpeaking) return;

      this.currentChunkIndex++;
      if (this.currentChunkIndex < this.chunks.length) {
        this.playCurrentChunk();
      } else {
        const endCb = this.activeEndCallback;
        this.finish();
        endCb?.();
      }
    };

    utterance.onstart = () => {
      if (this.playSessionId !== sessionId) return;
      this._isSpeaking = true;
      this._isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      advanceToNext();
    };

    utterance.onerror = (e) => {
      if (this.playSessionId !== sessionId) return;
      // 'interrupted' or 'canceled' happens when the user intentionally stops or switches topics
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }
      console.warn('Speech chunk event notice:', e.error);
      advanceToNext();
    };

    // Watchdog Timer for Android Tablets / Chrome:
    // On Android, Google TTS occasionally drops the 'onend' event after finishing an utterance.
    // This watchdog calculates the maximum expected time for this chunk based on word count.
    // If 'onend' doesn't fire within that time, the watchdog safely auto-advances so the player
    // never hangs or stays open indefinitely.
    const words = chunkText.trim().split(/\s+/).length;
    const expectedDurationMs = Math.max(3000, ((words * 500) / this._rate) + 3000);

    this.chunkWatchdogTimer = setTimeout(() => {
      if (this.playSessionId === sessionId && this._isSpeaking && !this._isPaused) {
        advanceToNext();
      }
    }, expectedDurationMs);

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to invoke window.speechSynthesis.speak:', err);
      advanceToNext();
    }
  }

  private clearWatchdog() {
    if (this.chunkWatchdogTimer) {
      clearTimeout(this.chunkWatchdogTimer);
      this.chunkWatchdogTimer = null;
    }
  }

  private clearPendingStart() {
    if (this.pendingStartTimer) {
      clearTimeout(this.pendingStartTimer);
      this.pendingStartTimer = null;
    }
  }

  private finish() {
    this.clearWatchdog();
    this.clearPendingStart();
    this._isSpeaking = false;
    this._isPaused = false;
    this.currentId = null;
    this.currentLabel = null;
    this.currentUtterance = null;
    this.chunks = [];
    this.currentChunkIndex = 0;
    if (typeof window !== 'undefined' && (window as any).__ttsUtteranceAnchor) {
      (window as any).__ttsUtteranceAnchor.clear();
    }
    this.notify();
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this._isSpeaking) {
      this._isPaused = true;
      this.clearWatchdog();
      this.clearPendingStart();

      // On Android Chrome, pause() behaves as cancel() and breaks the queue.
      // Therefore, we cleanly cancel speech while keeping currentChunkIndex intact.
      // When resume() is clicked, it will seamlessly restart from the current sentence.
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // safe fallback
      }
      this.notify();
    }
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this._isPaused) {
      this._isPaused = false;
      this.notify();

      // Give 50ms for the Android audio driver to settle, then play the current chunk
      setTimeout(() => {
        if (this._isSpeaking && !this._isPaused) {
          this.playCurrentChunk();
        }
      }, 50);
    }
  }

  public stop() {
    this.playSessionId++; // Immediately invalidates any pending timers or callbacks
    this.clearWatchdog();
    this.clearPendingStart();

    // Immediately reset active state synchronously so the UI and floating controller close instantly
    this._isSpeaking = false;
    this._isPaused = false;
    this.chunks = [];
    this.currentChunkIndex = 0;
    this.currentId = null;
    this.currentLabel = null;
    this.activeChunkCallback = null;
    this.activeEndCallback = null;

    if (this.currentUtterance) {
      this.currentUtterance.onstart = null;
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance.onpause = null;
      this.currentUtterance.onresume = null;
      this.currentUtterance = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.cancel();
      } catch (e) {
        // Safe fallback
      }
      if ((window as any).__ttsUtteranceAnchor) {
        (window as any).__ttsUtteranceAnchor.clear();
      }
    }

    this.notify();
  }
}

export const audioSpeech = new AudioSpeechManager();

export function speakMathText(text: string, rate?: number, onEnd?: () => void): void {
  audioSpeech.speak('interactive-math', text, {
    rate: rate ?? 1.0,
    forcePlay: true,
    onEnd,
  });
}

export function isAudioSpeechActive(): boolean {
  return audioSpeech.isPlaying();
}

export function stopMathSpeech(): void {
  audioSpeech.stop();
}
