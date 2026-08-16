import type { Locale } from "@/lib/types";

export const LOCALE_STORAGE_KEY = "frontendcraft-locale";
export const LOCALE_COOKIE = "frontendcraft-locale";
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ar" || value === "en";
}

export function parseLocale(value: string | null | undefined): Locale {
  return value === "ar" ? "ar" : DEFAULT_LOCALE;
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = localeDir(locale);
}

export function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  applyDocumentLocale(locale);
}

export function readLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

/** Blocking snippet for <head> — keep in sync with persistLocale keys. */
export const LOCALE_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var p=localStorage.getItem(k);if(p!=="ar"&&p!=="en"){var m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=(ar|en)/);p=m?m[1]:"en";}var r=document.documentElement;r.lang=p==="ar"?"ar":"en";r.dir=p==="ar"?"rtl":"ltr";document.cookie=k+"="+p+"; Path=/; Max-Age=31536000; SameSite=Lax";}catch(e){}})();`;
