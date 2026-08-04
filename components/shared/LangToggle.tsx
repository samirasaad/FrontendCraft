"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";

export function LangToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();

  if (compact) {
    const next = locale === "en" ? "ar" : "en";
    return (
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.92, rotate: -4 }}
        onClick={() => {
          playClick();
          setLocale(next);
        }}
        className="inline-flex h-9 min-w-[2.5rem] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 px-2.5 text-[11px] font-bold text-slate-100 transition hover:border-cyan-300/30 hover:bg-white/10"
        aria-label="Language"
        title={next === "ar" ? t("langAr", locale) : t("langEn", locale)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={locale}
            initial={
              reduce
                ? false
                : { opacity: 0, y: 10, rotate: -8, scale: 0.85 }
            }
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, y: -10, rotate: 8, scale: 0.85 }
            }
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="inline-block"
          >
            {locale === "en" ? t("langEn", locale) : t("langAr", locale)}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <div
      className="flex items-center rounded-full border border-white/10 bg-slate-950/60 p-1"
      role="group"
      aria-label="Language"
    >
      {(["en", "ar"] as const).map((code) => {
        const active = locale === code;
        return (
          <motion.button
            key={code}
            type="button"
            whileTap={reduce ? undefined : { scale: 0.94 }}
            onClick={() => {
              if (code !== locale) playClick();
              setLocale(code);
            }}
            className={`relative min-w-[52px] rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200 ${
              active ? "text-slate-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300"
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 26, mass: 0.7 }
                }
              />
            ) : null}
            <motion.span
              className="relative z-10 inline-block"
              animate={
                active && !reduce
                  ? { scale: [1, 1.08, 1], rotate: [0, -2, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.35, ease: [0.34, 1.35, 0.64, 1] }}
            >
              {code === "en" ? t("langEn", locale) : t("langAr", locale)}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
