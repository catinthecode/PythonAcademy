// Web Audio synthesizer for kid-friendly sound effects.
// Zero dependencies, instant loading, offline-ready, and non-intrusive.

let ctx: AudioContext | null = null;
const MUTE_KEY = 'python-academy.muted';

let muted = typeof localStorage !== 'undefined' ? localStorage.getItem(MUTE_KEY) === 'true' : false;
const listeners = new Set<(muted: boolean) => void>();

function getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
            ctx = new AudioCtx();
        }
    }
    if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
    }
    return ctx;
}

export function isMuted(): boolean {
    return muted;
}

export function setMuted(val: boolean) {
    muted = val;
    try {
        localStorage.setItem(MUTE_KEY, String(val));
    } catch {
        // ignore storage errors
    }
    listeners.forEach(fn => fn(muted));
}

export function toggleMute(): boolean {
    setMuted(!muted);
    return muted;
}

export function subscribeSound(fn: (muted: boolean) => void): () => void {
    listeners.add(fn);
    return () => {
        listeners.delete(fn);
    };
}

// Tone generator helper
function playTone(freq: number, type: OscillatorType, duration: number, delay = 0, gainLevel = 0.15) {
    if (muted) return;
    const c = getContext();
    if (!c) return;

    const osc = c.createOscillator();
    const gain = c.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);

    gain.gain.setValueAtTime(gainLevel, c.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(c.destination);

    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration);
}

/** Soft wooden pop for button clicks, card taps, tile ordering */
export function playTap() {
    if (muted) return;
    const c = getContext();
    if (!c) return;

    const osc = c.createOscillator();
    const gain = c.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, c.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(c.destination);

    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.05);
}

/** Cheerful 3-note ascending chime when a puzzle is solved */
export function playSuccess() {
    if (muted) return;
    // C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
    playTone(523.25, 'sine', 0.18, 0, 0.15);
    playTone(659.25, 'sine', 0.18, 0.08, 0.16);
    playTone(783.99, 'sine', 0.22, 0.16, 0.18);
    playTone(1046.50, 'sine', 0.40, 0.24, 0.22);
}

/** Triumphant, rich fanfare when a boss is defeated */
export function playBossDefeat() {
    if (muted) return;
    // Epic fanfare with bright triangle & sine layers
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) => {
        playTone(f, 'triangle', 0.25, i * 0.09, 0.2);
    });
    // Final sustaining chord
    setTimeout(() => {
        playTone(523.25, 'sine', 0.8, 0, 0.18);
        playTone(783.99, 'sine', 0.8, 0, 0.18);
        playTone(1046.50, 'triangle', 0.8, 0, 0.22);
    }, 450);
}

/** Gentle, playful wobble/boing when code needs fixing - friendly, never discouraging */
export function playError() {
    if (muted) return;
    const c = getContext();
    if (!c) return;

    const osc = c.createOscillator();
    const gain = c.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(170, c.currentTime + 0.22);

    gain.gain.setValueAtTime(0.14, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(c.destination);

    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.22);
}

/** Crisp bell ping for each star earned */
export function playStar(index = 0) {
    if (muted) return;
    // Higher pitch per star (C6, E6, G6)
    const pitches = [1046.5, 1318.5, 1567.98];
    const freq = pitches[index] ?? 1318.5;
    playTone(freq, 'sine', 0.4, 0, 0.2);
    playTone(freq * 2, 'triangle', 0.2, 0, 0.05); // shimmer harmonic
}

/** Triumphant level-up sequence */
export function playLevelUp() {
    if (muted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
        playTone(f, 'sine', 0.2, i * 0.1, 0.2);
    });
}

/** Soft page chime when finishing a comic reading */
export function playReadFinish() {
    if (muted) return;
    playTone(587.33, 'sine', 0.2, 0, 0.12);
    playTone(880.00, 'sine', 0.35, 0.1, 0.15);
}
