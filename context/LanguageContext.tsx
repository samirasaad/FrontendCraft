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
import type { Locale } from "@/lib/types";

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "frontendcraft-locale";
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

function getLocaleSnapshot(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "ar" ? "ar" : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale === "ar" ? "ar" : "en";
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

function commitLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  applyDocumentLocale(next);
  emit();
}

function clearLocaleAnimAttrs(root: HTMLElement) {
  delete root.dataset.localeTo;
  delete root.dataset.localeAnim;
}

function runLocaleChange(next: Locale) {
  if (next === getLocaleSnapshot()) return;

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

  // Fallback: soft directional fade when View Transitions are unavailable.
  root.dataset.localeAnim = "out";
  window.setTimeout(() => {
    commitLocale(next);
    root.dataset.localeAnim = "in";
    window.setTimeout(() => {
      clearLocaleAnimAttrs(root);
    }, reduced ? 0 : 320);
  }, reduced ? 0 : 180);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getLocaleSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    runLocaleChange(next);
  }, []);

  const toggleLocale = useCallback(() => {
    runLocaleChange(getLocaleSnapshot() === "en" ? "ar" : "en");
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir: locale === "ar" ? ("rtl" as const) : ("ltr" as const),
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
