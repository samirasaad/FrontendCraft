"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "frontendcraft:sfx";
const LISTENERS = new Set<() => void>();

function emit() {
  LISTENERS.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}

function readEnabled(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === "1";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return true;
}

type ToneKind = "click" | "success" | "victory";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  return audioCtx;
}

function playTone(kind: ToneKind) {
  const ctx = getCtx();
  if (!ctx) return;

  void ctx.resume();

  const now = ctx.currentTime;

  if (kind === "click") {
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.04);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.08);
    return;
  }

  if (kind === "success") {
    // Correct answer — bright two-step “ding-ding”
    const notes = [
      { freq: 587.33, at: 0, dur: 0.14 }, // D5
      { freq: 880.0, at: 0.1, dur: 0.2 }, // A5
    ];
    notes.forEach(({ freq, at, dur }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const t0 = now + at;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.07, t0 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    });
    return;
  }

  // Victory — short major arpeggio + sparkle for level clear
  const chord = [
    { freq: 523.25, at: 0, dur: 0.28 }, // C5
    { freq: 659.25, at: 0.1, dur: 0.28 }, // E5
    { freq: 783.99, at: 0.2, dur: 0.34 }, // G5
    { freq: 1046.5, at: 0.34, dur: 0.42 }, // C6
  ];
  chord.forEach(({ freq, at, dur }) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const t0 = now + at;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.075, t0 + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  });

  // Soft sparkle overtone on the last note
  const sparkle = ctx.createOscillator();
  const sg = ctx.createGain();
  const st = now + 0.38;
  sparkle.type = "triangle";
  sparkle.frequency.setValueAtTime(1568, st);
  sparkle.frequency.exponentialRampToValueAtTime(2093, st + 0.18);
  sg.gain.setValueAtTime(0.0001, st);
  sg.gain.exponentialRampToValueAtTime(0.035, st + 0.02);
  sg.gain.exponentialRampToValueAtTime(0.0001, st + 0.28);
  sparkle.connect(sg);
  sg.connect(ctx.destination);
  sparkle.start(st);
  sparkle.stop(st + 0.3);
}

interface SoundContextValue {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
  playClick: () => void;
  /** Correct answer / small win */
  playSuccess: () => void;
  /** Level cleared / strong quiz finish */
  playVictory: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, readEnabled, getServerSnapshot);

  const setEnabled = useCallback((value: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!readEnabled());
  }, [setEnabled]);

  const playClick = useCallback(() => {
    if (!readEnabled()) return;
    playTone("click");
  }, []);

  const playSuccess = useCallback(() => {
    if (!readEnabled()) return;
    playTone("success");
  }, []);

  const playVictory = useCallback(() => {
    if (!readEnabled()) return;
    playTone("victory");
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      setEnabled,
      toggle,
      playClick,
      playSuccess,
      playVictory,
    }),
    [enabled, setEnabled, toggle, playClick, playSuccess, playVictory],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}
