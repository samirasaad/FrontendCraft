"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  TRACK_JOB_KEYS,
  TrackJobVisual,
} from "@/components/layout/TrackJobVisual";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { loc, t } from "@/content/i18n/ui-strings";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import {
  TIER_ORDER,
  tierBadgeClass,
  tierBlurb,
  tierEmoji,
  tierLabel,
} from "@/lib/tiers";
import type { Lesson, Tier, TrackDefinition } from "@/lib/types";

function groupByTier(lessons: Lesson[]): Record<Tier, Lesson[]> {
  const groups = Object.fromEntries(
    TIER_ORDER.map((tier) => [tier, [] as Lesson[]]),
  ) as Record<Tier, Lesson[]>;
  for (const lesson of lessons) {
    groups[lesson.tier].push(lesson);
  }
  for (const tier of TIER_ORDER) {
    groups[tier].sort((a, b) => a.order - b.order);
  }
  return groups;
}

function TierBranch({
  tier,
  lessons,
  open,
  onToggle,
  trackId,
}: {
  tier: Tier;
  lessons: Lesson[];
  open: boolean;
  onToggle: () => void;
  trackId: string;
}) {
  const { locale, dir } = useLanguage();
  const { isComplete } = useProgress();
  const { playClick } = useSound();
  const doneCount = lessons.filter((l) => isComplete(l.id)).length;
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (lessons.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          playClick();
          onToggle();
        }}
        aria-expanded={open}
        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-start transition sm:px-5 ${
          open
            ? "border-cyan-400/35 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
        }`}
      >
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${tierBadgeClass(tier)}`}
        >
          {tierEmoji(tier)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              {tierLabel(tier, locale)}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tierBadgeClass(tier)}`}
              dir="ltr"
            >
              {doneCount}/{lessons.length}
            </span>
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm">
            {tierBlurb(tier, locale)}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-slate-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <ul className="relative ms-5 mt-2 space-y-1.5 border-s border-white/10 ps-4 sm:ms-7 sm:ps-5">
              {lessons.map((lesson, index) => {
                const done = isComplete(lesson.id);
                return (
                  <li key={lesson.id} className="relative">
                    <span
                      aria-hidden
                      className="absolute -start-[1.35rem] top-5 h-px w-3 bg-white/15 sm:-start-[1.6rem] sm:w-4"
                    />
                    <Link
                      href={`/${trackId}/learn?lesson=${lesson.slug}`}
                      onClick={() => playClick()}
                      className="group flex items-start gap-3 rounded-2xl border border-transparent bg-slate-950/40 px-3 py-2.5 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 sm:px-4"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 group-hover:border-cyan-400/40 group-hover:text-cyan-100">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-slate-100 group-hover:text-white">
                            {lesson.order}. {loc(lesson.content.title, locale)}
                          </span>
                          {done ? (
                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-cyan-300"
                            />
                          ) : (
                            <Circle
                              size={14}
                              className="shrink-0 text-slate-600"
                            />
                          )}
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
                          {loc(lesson.content.summary, locale)}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-slate-500">
                          <BookOpen size={10} />
                          {lesson.readMinutes} {t("readTime", locale)}
                        </span>
                      </span>
                      <Arrow
                        size={14}
                        className="mt-1 shrink-0 text-slate-600 transition group-hover:text-cyan-300"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CurriculumTocInner({ track }: { track: TrackDefinition }) {
  const { locale, dir } = useLanguage();
  const { playClick } = useSound();
  const {
    progressPercent,
    completedCount,
    totalCount,
    lessons,
    activeLessonId,
    isComplete,
  } = useProgress();

  const groups = useMemo(() => groupByTier(lessons), [lessons]);

  const [openTiers, setOpenTiers] = useState<Set<Tier>>(() => new Set());

  const continueLesson =
    lessons.find((l) => l.id === activeLessonId) ??
    lessons.find((l) => !isComplete(l.id)) ??
    lessons[0];

  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  const ForwardArrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  function setAll(open: boolean) {
    playClick();
    if (open) {
      setOpenTiers(
        new Set(TIER_ORDER.filter((tier) => groups[tier].length > 0)),
      );
    } else {
      setOpenTiers(new Set());
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-20 top-10 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute end-0 top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link
          href="/tracks"
          onClick={() => playClick()}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
        >
          <BackArrow size={12} />
          {t("backToTracks", locale)}
        </Link>
        <div className="flex items-center gap-2">
          <SfxToggle />
          <LangToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-slate-950/40 to-cyan-400/5 p-5 backdrop-blur-xl sm:p-7"
        >
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${track.accent} text-slate-950 shadow-lg shadow-cyan-400/15`}
              >
                <Sparkles size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {t("curriculumToc", locale)}
                </p>
                <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {loc(track.title, locale)}
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
                  {loc(track.description, locale)}
                </p>
              </div>
            </div>

            <div className="w-full shrink-0 sm:max-w-xs">
              <div className="mb-1.5 flex justify-between text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Layers size={12} />
                  {t("progress", locale)}
                </span>
                <span className="font-semibold text-cyan-300" dir="ltr">
                  {completedCount}/{totalCount} · {progressPercent}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10 rtl:rotate-180">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${track.accent}`}
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
              </div>
              {continueLesson ? (
                <Link
                  href={`/${track.id}/learn?lesson=${continueLesson.slug}`}
                  onClick={() => playClick()}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 sm:w-auto"
                >
                  {completedCount > 0
                    ? t("continueLearning", locale)
                    : t("startCurriculum", locale)}
                  <ForwardArrow size={16} />
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 sm:p-5">
            <div className="mb-4 max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
                {t("trackJobDemoLabel", locale)}
                <span className="mx-1.5 text-slate-600">·</span>
                <span className="tracking-normal text-slate-400">
                  {t(TRACK_JOB_KEYS[track.id].job, locale)}
                </span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                {t(TRACK_JOB_KEYS[track.id].body, locale)}
              </p>
            </div>
            <TrackJobVisual trackId={track.id} variant="hero" />
          </aside>
        </motion.section>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-slate-200">
            {t("levelsTree", locale)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAll(true)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/10"
            >
              {t("expandAll", locale)}
            </button>
            <button
              type="button"
              onClick={() => setAll(false)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/10"
            >
              {t("collapseAll", locale)}
            </button>
          </div>
        </div>

        {totalCount === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-slate-500">
            {t("emptyTrack", locale)}
          </p>
        ) : (
          <div className="space-y-3">
            {TIER_ORDER.map((tier) => (
              <TierBranch
                key={tier}
                tier={tier}
                lessons={groups[tier]}
                trackId={track.id}
                open={openTiers.has(tier)}
                onToggle={() => {
                  setOpenTiers((prev) => {
                    const next = new Set(prev);
                    if (next.has(tier)) next.delete(tier);
                    else next.add(tier);
                    return next;
                  });
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function CurriculumToc({ track }: { track: TrackDefinition }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <ProgressProvider trackId={track.id} lessons={track.lessons}>
          <CurriculumTocInner track={track} />
        </ProgressProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}
