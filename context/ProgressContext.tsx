"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Lesson, TrackId } from "@/lib/types";

interface ProgressContextValue {
  trackId: TrackId;
  lessons: Lesson[];
  completedIds: Set<string>;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  toggleComplete: (id: string) => void;
  /** Mark a lesson complete without toggling off if already done. */
  markComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  progressPercent: number;
  completedCount: number;
  totalCount: number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);
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

function storageKeys(trackId: TrackId) {
  return {
    progress: `frontendcraft:${trackId}:progress`,
    active: `frontendcraft:${trackId}:active-lesson`,
  };
}

interface ProgressSnapshot {
  completed: string[];
  active: string;
}

function readSnapshot(trackId: TrackId, lessons: Lesson[]): ProgressSnapshot {
  const keys = storageKeys(trackId);
  let completed: string[] = [];
  let active = lessons[0]?.id ?? "";
  try {
    const raw = window.localStorage.getItem(keys.progress);
    if (raw) completed = JSON.parse(raw) as string[];
    const storedActive = window.localStorage.getItem(keys.active);
    if (storedActive && lessons.some((l) => l.id === storedActive)) {
      active = storedActive;
    }
  } catch {
    /* ignore */
  }
  return { completed, active };
}

const EMPTY_COMPLETED: string[] = [];
const serverCache = new Map<string, ProgressSnapshot>();

/** Must return a stable reference — React loops if this allocates every call. */
function getServerSnapshot(trackId: TrackId, lessons: Lesson[]): ProgressSnapshot {
  const active = lessons[0]?.id ?? "";
  const key = `${trackId}:${active}`;
  const cached = serverCache.get(key);
  if (cached) return cached;
  const snapshot: ProgressSnapshot = { completed: EMPTY_COMPLETED, active };
  serverCache.set(key, snapshot);
  return snapshot;
}

const cache = new Map<string, { json: string; snapshot: ProgressSnapshot }>();

function getSnapshot(trackId: TrackId, lessons: Lesson[]): ProgressSnapshot {
  const next = readSnapshot(trackId, lessons);
  const json = JSON.stringify(next);
  const cached = cache.get(trackId);
  if (cached && cached.json === json) return cached.snapshot;
  cache.set(trackId, { json, snapshot: next });
  return next;
}

export function ProgressProvider({
  trackId,
  lessons,
  children,
}: {
  trackId: TrackId;
  lessons: Lesson[];
  children: ReactNode;
}) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => getSnapshot(trackId, lessons),
    () => getServerSnapshot(trackId, lessons),
  );

  const completedIds = useMemo(
    () => new Set(snapshot.completed),
    [snapshot.completed],
  );

  const setActiveLessonId = useCallback(
    (id: string) => {
      window.localStorage.setItem(storageKeys(trackId).active, id);
      emit();
    },
    [trackId],
  );

  const toggleComplete = useCallback(
    (id: string) => {
      const current = new Set(readSnapshot(trackId, lessons).completed);
      if (current.has(id)) current.delete(id);
      else current.add(id);
      window.localStorage.setItem(
        storageKeys(trackId).progress,
        JSON.stringify([...current]),
      );
      emit();
    },
    [trackId, lessons],
  );

  const markComplete = useCallback(
    (id: string) => {
      const current = new Set(readSnapshot(trackId, lessons).completed);
      if (current.has(id)) return;
      current.add(id);
      window.localStorage.setItem(
        storageKeys(trackId).progress,
        JSON.stringify([...current]),
      );
      emit();
    },
    [trackId, lessons],
  );

  const isComplete = useCallback(
    (id: string) => completedIds.has(id),
    [completedIds],
  );

  const totalCount = lessons.length;
  const completedCount = [...completedIds].filter((id) =>
    lessons.some((lesson) => lesson.id === id),
  ).length;
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const value = useMemo(
    () => ({
      trackId,
      lessons,
      completedIds,
      activeLessonId: snapshot.active || lessons[0]?.id || "",
      setActiveLessonId,
      toggleComplete,
      markComplete,
      isComplete,
      progressPercent,
      completedCount,
      totalCount,
    }),
    [
      trackId,
      lessons,
      completedIds,
      snapshot.active,
      setActiveLessonId,
      toggleComplete,
      markComplete,
      isComplete,
      progressPercent,
      completedCount,
      totalCount,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
