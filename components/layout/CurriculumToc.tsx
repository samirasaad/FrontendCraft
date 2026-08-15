"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { TrackJobVisual } from "@/components/layout/TrackJobVisual";
import { Atmosphere } from "@/components/shared/Atmosphere";
import { BrandLockup } from "@/components/shared/BrandLockup";
import { RichText } from "@/components/shared/RichText";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { loc, t } from "@/content/i18n/ui-strings";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";
import {
  HTML_CURRICULUM_TREE,
  type CurriculumTreeBranch,
} from "@/content/tracks/html/curriculum-order";
import {
  TIER_ORDER,
  tierBlurb,
  tierDotClass,
  tierLabel,
  tierRailClass,
} from "@/lib/tiers";
import type { Lesson, LocalizedString, Tier, TrackDefinition } from "@/lib/types";

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

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

type NestedGroup = {
  id: string;
  title?: LocalizedString;
  lessons: Lesson[];
};

function nestTierLessons(
  lessons: Lesson[],
  branches: readonly CurriculumTreeBranch[] | undefined,
): NestedGroup[] {
  if (!branches?.length) {
    return [{ id: "_lessons", lessons }];
  }
  const bySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));
  const used = new Set<string>();
  const groups: NestedGroup[] = [];
  for (const branch of branches) {
    const items = branch.slugs
      .map((slug) => bySlug.get(slug))
      .filter((lesson): lesson is Lesson => Boolean(lesson));
    for (const lesson of items) used.add(lesson.slug);
    if (items.length) {
      groups.push({ id: branch.id, title: branch.title, lessons: items });
    }
  }
  const leftover = lessons.filter((lesson) => !used.has(lesson.slug));
  if (leftover.length) {
    groups.push({ id: "_more", lessons: leftover });
  }
  return groups;
}

function TreeList({
  children,
  railClass,
}: {
  children: ReactNode;
  railClass: string;
}) {
  return <ul className={`ms-2 border-s ps-3 ${railClass}`}>{children}</ul>;
}

function TreeItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute top-[1.15rem] -start-3 h-px w-3 bg-white/20"
      />
      {children}
    </li>
  );
}

function LessonLeaf({
  lesson,
  index,
  trackId,
  nextLessonId,
}: {
  lesson: Lesson;
  index: number;
  trackId: TrackDefinition["id"];
  nextLessonId?: string;
}) {
  const { locale } = useLanguage();
  const { isComplete } = useProgress();
  const { playClick } = useSound();
  const done = isComplete(lesson.id);
  const next = lesson.id === nextLessonId;

  return (
    <TreeItem>
      <Link
        href={`/${trackId}/learn?lesson=${lesson.slug}`}
        onClick={() => playClick()}
        className={`group flex min-h-11 items-center gap-2.5 rounded-lg py-2 pe-2 ps-1.5 transition ${
          next
            ? "bg-orange-400/10 ring-1 ring-inset ring-orange-300/25"
            : "hover:bg-white/4"
        }`}
      >
        <span
          className={`flex h-6 w-7 shrink-0 items-center justify-center font-mono text-xs tabular-nums ${
            next ? "text-orange-200" : "text-slate-600"
          }`}
        >
          {padIndex(index + 1)}
        </span>
        <span
          className={`min-w-0 flex-1 truncate text-[15px] font-normal tracking-tight ${
            next
              ? "text-white"
              : "text-slate-300 group-hover:text-white"
          }`}
        >
          <RichText chips={false} text={loc(lesson.content.title, locale)} />
        </span>
        {next ? (
          <span className="shrink-0 rounded-full bg-orange-300/15 px-2 py-0.5 text-xs font-semibold text-orange-200">
            {t("upNext", locale)}
          </span>
        ) : done ? (
          <CheckCircle2
            size={16}
            strokeWidth={2}
            className="shrink-0 text-emerald-400"
            aria-label={t("lessonDone", locale)}
          />
        ) : (
          <span
            className="hidden shrink-0 font-mono text-xs tabular-nums text-slate-600 sm:inline"
            dir="ltr"
          >
            {lesson.readMinutes}m
          </span>
        )}
      </Link>
    </TreeItem>
  );
}

function TopicBranch({
  group,
  trackId,
  nextLessonId,
  startIndex,
}: {
  group: NestedGroup;
  trackId: TrackDefinition["id"];
  nextLessonId?: string;
  startIndex: number;
}) {
  const { locale } = useLanguage();
  const titled = Boolean(group.title);

  const leaves = group.lessons.map((lesson, i) => (
    <LessonLeaf
      key={lesson.id}
      lesson={lesson}
      index={startIndex + i}
      trackId={trackId}
      nextLessonId={nextLessonId}
    />
  ));

  if (!titled) {
    return <>{leaves}</>;
  }

  return (
    <>
      <TreeItem>
        <p className="px-1.5 pb-1 pt-3 text-[15px] font-semibold tracking-tight text-slate-200">
          {loc(group.title!, locale)}
        </p>
      </TreeItem>
      {leaves}
    </>
  );
}

function TierSection({
  tier,
  lessons,
  branches,
  open,
  onToggle,
  trackId,
  nextLessonId,
}: {
  tier: Tier;
  lessons: Lesson[];
  branches: readonly CurriculumTreeBranch[] | undefined;
  open: boolean;
  onToggle: () => void;
  trackId: TrackDefinition["id"];
  nextLessonId?: string;
}) {
  const { locale } = useLanguage();
  const { isComplete } = useProgress();
  const { playClick } = useSound();
  const doneCount = lessons.filter((l) => isComplete(l.id)).length;
  const groups = nestTierLessons(lessons, branches);

  if (lessons.length === 0) return null;

  let lessonOffset = 0;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          playClick();
          onToggle();
        }}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-2.5 text-start transition hover:bg-white/4"
      >
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90 rtl:rotate-90"
          }`}
        />
        <span
          aria-hidden
          className={`h-2 w-2 shrink-0 rounded-full ${tierDotClass(tier)}`}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[17px] font-semibold tracking-tight text-white">
            {tierLabel(tier, locale)}
          </span>
          <span className="mt-0.5 block truncate text-[14px] font-normal leading-snug text-slate-500">
            {tierBlurb(tier, locale, trackId)}
          </span>
        </span>
        <span
          className="shrink-0 font-mono text-[13px] tabular-nums text-slate-500"
          dir="ltr"
        >
          {doneCount}/{lessons.length}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pb-2"
          >
            <TreeList railClass={tierRailClass(tier)}>
              {groups.map((group) => {
                const startIndex = lessonOffset;
                lessonOffset += group.lessons.length;
                return (
                  <TopicBranch
                    key={group.id}
                    group={group}
                    trackId={trackId}
                    nextLessonId={nextLessonId}
                    startIndex={startIndex}
                  />
                );
              })}
            </TreeList>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function CurriculumTocInner({ track }: { track: TrackDefinition }) {
  const { locale } = useLanguage();
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
  const htmlTrack = track.id === "html";
  const treeSpec = htmlTrack ? HTML_CURRICULUM_TREE : undefined;

  const [openTiers, setOpenTiers] = useState<Set<Tier>>(() => {
    const first = TIER_ORDER.find((tier) =>
      lessons.some((lesson) => lesson.tier === tier),
    );
    return first ? new Set([first]) : new Set();
  });

  const continueLesson =
    lessons.find((l) => l.id === activeLessonId) ??
    lessons.find((l) => !isComplete(l.id)) ??
    lessons[0];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <Atmosphere />

      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <BrandLockup href="/" onClick={() => playClick()} />
          <Link
            href="/tracks"
            onClick={() => playClick()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
          >
            <ArrowLeft size={12} className={RTL_FLIP} />
            {t("backToTracks", locale)}
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SfxToggle />
          <LangToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 pt-2 sm:pt-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t("curriculumToc", locale)}
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {loc(track.title, locale)}
            </h1>
            <p
              className="font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl"
              dir="ltr"
            >
              {totalCount}
              <span className="ms-2 text-sm font-medium tracking-normal text-slate-500">
                {t("lessonsCount", locale)}
              </span>
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            {loc(track.tagline, locale)}
            {track.id === "html" ? null : (
              <span className="text-slate-500">
                {" "}
                {loc(track.description, locale)}
              </span>
            )}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            {continueLesson ? (
              <Link
                href={`/${track.id}/learn?lesson=${continueLesson.slug}`}
                onClick={() => playClick()}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-slate-950 transition hover:brightness-110 ${
                  htmlTrack
                    ? "bg-orange-300"
                    : "bg-gradient-to-r from-yellow-300 to-cyan-300"
                }`}
              >
                {completedCount > 0
                  ? t("continueLearning", locale)
                  : t("startCurriculum", locale)}
                <ArrowRight size={14} className={RTL_FLIP} />
              </Link>
            ) : null}
            <div className="flex min-w-[10rem] flex-1 items-center gap-3 sm:max-w-xs">
              <div className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/10 rtl:rotate-180">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${track.accent}`}
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
              </div>
              <span
                className="shrink-0 font-mono text-[11px] tabular-nums text-slate-500"
                dir="ltr"
              >
                {completedCount}/{totalCount}
              </span>
            </div>
          </div>
        </motion.header>

        <aside className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
          <div className="p-3 sm:p-4">
            <TrackJobVisual trackId={track.id} variant="hero" />
          </div>
        </aside>

        {totalCount === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/12 px-4 py-10 text-center text-sm text-slate-500">
            {t("emptyTrack", locale)}
          </p>
        ) : (
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-300">
                {t("levelsTree", locale)}
              </h2>
              <p
                className="font-mono text-sm tabular-nums text-slate-500"
                dir="ltr"
              >
                {totalCount} {t("lessonsCount", locale)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 px-2 py-1 sm:px-3">
              <ul className="divide-y divide-white/6">
                {TIER_ORDER.map((tier) => (
                  <TierSection
                    key={tier}
                    tier={tier}
                    lessons={groups[tier]}
                    branches={treeSpec?.[tier]}
                    trackId={track.id}
                    nextLessonId={continueLesson?.id}
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
              </ul>
            </div>
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
