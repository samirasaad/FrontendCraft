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

type ToneKind = "click" | "success";

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
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  if (kind === "click") {
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

  // Soft two-note success ping
  const notes = [523.25, 783.99];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const t0 = now + i * 0.08;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.24);
  });
}

interface SoundContextValue {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
  playClick: () => void;
  playSuccess: () => void;
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

  const value = useMemo(
    () => ({ enabled, setEnabled, toggle, playClick, playSuccess }),
    [enabled, setEnabled, toggle, playClick, playSuccess],
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
