"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, PanelLeft, Sparkles } from "lucide-react";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { loc, t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";
import type { TrackDefinition } from "@/lib/types";

interface HeaderProps {
  track: TrackDefinition;
  onToggleLessons?: () => void;
  lessonsOpen?: boolean;
}

export function Header({ track, onToggleLessons, lessonsOpen }: HeaderProps) {
  const { locale } = useLanguage();
  const { progressPercent, completedCount, totalCount } = useProgress();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl transition-[padding] ${
        compact ? "py-0" : ""
      }`}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-2 px-3 transition-[padding] sm:px-4 ${
          compact ? "py-1.5" : "py-2.5"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onToggleLessons ? (
            <button
              type="button"
              onClick={onToggleLessons}
              aria-label={
                lessonsOpen ? t("closeMenu", locale) : t("openMenu", locale)
              }
              aria-expanded={lessonsOpen}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
            >
              <PanelLeft size={16} className={RTL_FLIP} />
            </button>
          ) : null}
          <Link
            href={`/${track.id}`}
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 sm:inline-flex"
          >
            <ArrowLeft size={12} className={RTL_FLIP} />
            {t("backToCurriculum", locale)}
          </Link>
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${track.accent} text-slate-950 shadow-lg shadow-yellow-300/20 ${
                compact ? "h-8 w-8" : "h-9 w-9"
              }`}
            >
              <Sparkles size={compact ? 16 : 18} />
            </span>
            <div className="min-w-0">
              <p
                className={`truncate font-[family-name:var(--font-display)] font-bold tracking-tight text-white ${
                  compact ? "text-sm" : "text-base sm:text-lg"
                }`}
              >
                {loc(track.title, locale)}
              </p>
              {!compact ? (
                <p className="hidden truncate text-xs text-slate-400 sm:block">
                  {loc(track.tagline, locale)}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 sm:px-2.5"
            title={`${t("progress", locale)} ${completedCount}/${totalCount}`}
          >
            <span
              className="relative h-1.5 w-10 overflow-hidden rounded-full bg-slate-800 sm:w-14"
              aria-hidden
            >
              <span
                className={`absolute inset-y-0 start-0 rounded-full bg-gradient-to-r ${track.accent} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </span>
            <span
              className="font-mono text-[11px] font-semibold text-cyan-300"
              dir="ltr"
            >
              {completedCount}/{totalCount}
            </span>
          </div>
          <SfxToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
