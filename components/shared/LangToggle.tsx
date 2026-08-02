"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";

export function LangToggle() {
  const { locale, setLocale } = useLanguage();
  const { playClick } = useSound();

  return (
    <div
      className="flex items-center rounded-full border border-white/10 bg-slate-950/60 p-1"
      role="group"
      aria-label="Language"
    >
      {(["en", "ar"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              if (code !== locale) playClick();
              setLocale(code);
            }}
            className={`relative min-w-[52px] rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              active ? "text-slate-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10">
              {code === "en" ? t("langEn", locale) : t("langAr", locale)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
