"use client";

import Link from "next/link";
import { LayoutList, PanelLeft } from "lucide-react";
import { BrandLockup } from "@/components/shared/BrandLockup";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";
import type { TrackDefinition } from "@/lib/types";

interface HeaderProps {
  track: TrackDefinition;
  onToggleLessons?: () => void;
  lessonsOpen?: boolean;
}

export function Header({ track, onToggleLessons, lessonsOpen }: HeaderProps) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const { progressPercent, completedCount, totalCount } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          {onToggleLessons ? (
            <button
              type="button"
              onClick={() => {
                playClick();
                onToggleLessons();
              }}
              aria-label={
                lessonsOpen ? t("closeMenu", locale) : t("openMenu", locale)
              }
              aria-expanded={lessonsOpen}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-cyan-100 lg:hidden"
            >
              <PanelLeft size={16} className={RTL_FLIP} />
            </button>
          ) : null}

          <BrandLockup
            href="/"
            onClick={() => playClick()}
            className="min-w-0"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href={`/${track.id}`}
            onClick={() => playClick()}
            title={t("backToCurriculum", locale)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 sm:px-2.5"
          >
            <LayoutList size={13} className="shrink-0 text-cyan-300/90" />
            <span className="hidden sm:inline">{t("backToCurriculum", locale)}</span>
          </Link>

          <div
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 sm:gap-2 sm:px-2.5 sm:py-1.5"
            title={`${t("progress", locale)} ${completedCount}/${totalCount}`}
          >
            <span
              className="relative hidden h-1.5 w-12 overflow-hidden rounded-full bg-slate-800 sm:block"
              aria-hidden
            >
              <span
                className={`absolute inset-y-0 start-0 rounded-full bg-gradient-to-r ${track.accent} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </span>
            <span
              className="font-mono text-[11px] font-semibold tabular-nums text-cyan-300"
              dir="ltr"
            >
              {completedCount}
              <span className="text-slate-500">/{totalCount}</span>
            </span>
          </div>

          <SfxToggle compact />
          <span className="lg:hidden">
            <LangToggle compact />
          </span>
          <span className="hidden lg:inline-flex">
            <LangToggle />
          </span>
        </div>
      </div>
    </header>
  );
}
