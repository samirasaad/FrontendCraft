"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";

export function SfxToggle({ compact = false }: { compact?: boolean }) {
  const { locale } = useLanguage();
  const { enabled, toggle, playClick } = useSound();

  return (
    <button
      type="button"
      onClick={() => {
        const next = !enabled;
        toggle();
        if (next) playClick();
      }}
      className={
        compact
          ? "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/10"
          : "inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-200 transition hover:bg-white/10"
      }
      aria-pressed={enabled}
      aria-label={enabled ? t("sfxOn", locale) : t("sfxOff", locale)}
      title={enabled ? t("sfxOn", locale) : t("sfxOff", locale)}
    >
      {enabled ? (
        <Volume2 size={14} className="text-cyan-300" />
      ) : (
        <VolumeX size={14} className="text-slate-500" />
      )}
      {!compact ? (
        <span className="hidden sm:inline">
          {enabled ? t("sfxOn", locale) : t("sfxOff", locale)}
        </span>
      ) : null}
    </button>
  );
}
