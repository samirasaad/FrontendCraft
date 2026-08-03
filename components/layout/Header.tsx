"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { loc, t } from "@/content/i18n/ui-strings";
import type { TrackDefinition } from "@/lib/types";

interface HeaderProps {
  track: TrackDefinition;
}

export function Header({ track }: HeaderProps) {
  const { locale } = useLanguage();
  const { progressPercent, completedCount, totalCount } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${track.id}`}
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 sm:inline-flex"
          >
            <ArrowLeft size={12} />
            {t("backToCurriculum", locale)}
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${track.accent} text-slate-950 shadow-lg shadow-yellow-300/20`}
            >
              <Sparkles size={18} />
            </span>
            <div>
              <p className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-white sm:text-lg">
                {loc(track.title, locale)}
              </p>
              <p className="hidden text-xs text-slate-400 sm:block">
                {loc(track.tagline, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Compact glance — survives a collapsed sidebar; full meter lives in the sidebar */}
          <div
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5"
            title={`${t("progress", locale)} ${completedCount}/${totalCount}`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {t("progress", locale)}
            </span>
            <span className="font-mono text-[11px] font-semibold text-cyan-300">
              {completedCount}/{totalCount}
            </span>
            <span
              className="relative hidden h-1.5 w-14 overflow-hidden rounded-full bg-slate-800 sm:block"
              aria-hidden
            >
              <span
                className={`absolute inset-y-0 start-0 rounded-full bg-gradient-to-r ${track.accent} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </span>
          </div>
          <SfxToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
