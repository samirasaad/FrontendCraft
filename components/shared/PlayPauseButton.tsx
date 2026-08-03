"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

/** Autoplay that respects prefers-reduced-motion (starts paused). */
export function useAutoPlay(defaultPlaying = true) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(() => defaultPlaying && !reduce);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  function toggle() {
    setPlaying((p) => !p);
  }

  return { playing, setPlaying, toggle, reduce: !!reduce };
}

export function PlayPauseButton({
  playing,
  onToggle,
  compact = false,
  className = "",
}: {
  playing: boolean;
  onToggle: () => void;
  compact?: boolean;
  className?: string;
}) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const label = playing ? t("simPause", locale) : t("simPlay", locale);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        playClick();
        onToggle();
      }}
      aria-pressed={playing}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 font-semibold text-slate-200 backdrop-blur transition hover:border-white/25 hover:bg-slate-900 ${
        compact
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-[11px]"
      } ${className}`}
    >
      {playing ? (
        <Pause size={compact ? 10 : 12} />
      ) : (
        <Play size={compact ? 10 : 12} />
      )}
      {label}
    </button>
  );
}
