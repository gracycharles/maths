/**
 * Screen Wake Lock & Keep-Alive Utility
 * Prevents screens and browser tabs (including Samsung Smart TVs, mobile, and desktop devices)
 * from dimming or going to sleep while actively learning or playing video/audio.
 */

type WakeLockSentinel = {
  released: boolean;
  release: () => Promise<void>;
  addEventListener: (type: 'release', listener: () => void) => void;
};

class WakeLockController {
  private sentinel: WakeLockSentinel | null = null;
  private isRequested = false;
  private keepAliveInterval: NodeJS.Timeout | null = null;
  private hiddenListenerBound = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initVisibilityListener();
      this.initGestureListener();
    }
  }

  private initGestureListener() {
    if (typeof window === 'undefined') return;
    const handleGesture = async () => {
      if (this.isRequested && (!this.sentinel || this.sentinel.released)) {
        await this.request();
      }
    };
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });
  }

  private initVisibilityListener() {
    if (this.hiddenListenerBound || typeof document === 'undefined') return;
    this.hiddenListenerBound = true;

    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible' && this.isRequested) {
        // Re-acquire wake lock after user switches back to this tab
        await this.request();
      }
    });
  }

  /**
   * Request the screen to stay awake
   */
  async request(): Promise<boolean> {
    this.isRequested = true;

    // 1. Try native Screen Wake Lock API (Chromium / Tizen / modern Smart TVs)
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator && (navigator as any).wakeLock?.request) {
      try {
        if (!this.sentinel || this.sentinel.released) {
          this.sentinel = await (navigator as any).wakeLock.request('screen');
          this.sentinel?.addEventListener('release', () => {
            this.sentinel = null;
          });
        }
        return true;
      } catch (err) {
        // Screen Wake Lock might fail if battery saver is active or not allowed in frame
      }
    }

    // 2. Fallback keep-alive heartbeat for TV browsers / older engines
    this.startKeepAliveHeartbeat();
    return true;
  }

  /**
   * Release the wake lock and allow system idle sleep
   */
  async release(): Promise<void> {
    this.isRequested = false;
    if (this.sentinel && !this.sentinel.released) {
      try {
        await this.sentinel.release();
      } catch (e) {
        // safe ignore
      }
      this.sentinel = null;
    }
    this.stopKeepAliveHeartbeat();
  }

  private startKeepAliveHeartbeat() {
    if (this.keepAliveInterval) return;
    // Periodic minimal activity tick every 25 seconds to prevent browser tab throttling on Smart TVs
    this.keepAliveInterval = setInterval(() => {
      if (this.isRequested && typeof window !== 'undefined') {
        // Ping harmless micro-event on window to signal activity
        window.dispatchEvent(new CustomEvent('app_keepalive_tick'));
      }
    }, 25000);
  }

  private stopKeepAliveHeartbeat() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  public isLocked(): boolean {
    return this.isRequested && (this.sentinel !== null && !this.sentinel.released);
  }
}

export const wakeLockController = new WakeLockController();
