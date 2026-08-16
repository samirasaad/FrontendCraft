"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  applyDocumentLocale,
  localeDir,
  persistLocale,
  readLocale,
} from "@/lib/locale";
import type { Locale } from "@/lib/types";

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LISTENERS = new Set<() => void>();

let cached: Locale | null = null;

function emit() {
  cached = null;
  LISTENERS.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}

function getClientSnapshot(): Locale {
  cached ??= readLocale();
  return cached;
}

function commitLocale(next: Locale) {
  persistLocale(next);
  emit();
}

function clearLocaleAnimAttrs(root: HTMLElement) {
  delete root.dataset.localeTo;
  delete root.dataset.localeAnim;
}

function runLocaleChange(next: Locale) {
  if (next === readLocale()) return;

  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.dataset.localeTo = next;

  const doc = document as Document & {
    startViewTransition?: (update: () => void) => {
      finished: Promise<void>;
    };
  };

  if (!reduced && typeof doc.startViewTransition === "function") {
    const transition = doc.startViewTransition(() => {
      commitLocale(next);
    });
    void transition.finished.finally(() => {
      clearLocaleAnimAttrs(root);
    });
    return;
  }

  root.dataset.localeAnim = "out";
  window.setTimeout(() => {
    commitLocale(next);
    root.dataset.localeAnim = "in";
    window.setTimeout(() => {
      clearLocaleAnimAttrs(root);
    }, reduced ? 0 : 320);
  }, reduced ? 0 : 180);
}

function LanguageStore({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const locale = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    () => initialLocale,
  );

  useEffect(() => {
    persistLocale(readLocale());
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    runLocaleChange(next);
  }, []);

  const toggleLocale = useCallback(() => {
    runLocaleChange(readLocale() === "en" ? "ar" : "en");
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir: localeDir(locale),
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const parent = useContext(LanguageContext);
  if (parent) return children;

  return (
    <LanguageStore initialLocale={initialLocale ?? DEFAULT_LOCALE}>
      {children}
    </LanguageStore>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
