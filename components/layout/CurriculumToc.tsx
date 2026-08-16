"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronsDownUp, ChevronsUpDown, Circle } from "lucide-react";
import { TrackJobVisual } from "@/components/layout/TrackJobVisual";
import { Atmosphere } from "@/components/shared/Atmosphere";
import { BrandLockup } from "@/components/shared/BrandLockup";
import { RichText } from "@/components/shared/RichText";
import { TierIcon } from "@/components/shared/TierIcon";
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
  tierIconClass,
  tierLabel,
  tierRailClass,
  tierTickClass,
  tierTopicLabelClass,
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

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

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
  return (
    <ul className={`ms-3 border-s-2 ps-3 ${railClass}`}>{children}</ul>
  );
}

function TreeItem({
  children,
  branch = false,
  tickClass = "bg-white/35",
}: {
  children: ReactNode;
  /** Topic label — no connector tick. */
  branch?: boolean;
  tickClass?: string;
}) {
  return (
    <li className="relative">
      {branch ? null : (
        <span
          aria-hidden
          className={`absolute top-[0.95rem] -start-[0.85rem] h-px w-[0.85rem] ${tickClass}`}
        />
      )}
      {children}
    </li>
  );
}

function LessonLeaf({
  lesson,
  index,
  trackId,
  nextLessonId,
  tickClass,
}: {
  lesson: Lesson;
  index: number;
  trackId: TrackDefinition["id"];
  nextLessonId?: string;
  tickClass: string;
}) {
  const { locale } = useLanguage();
  const { isComplete } = useProgress();
  const { playClick } = useSound();
  const done = isComplete(lesson.id);
  const next = lesson.id === nextLessonId;

  return (
    <TreeItem tickClass={tickClass}>
      <Link
        href={`/${trackId}/learn?lesson=${lesson.slug}`}
        onClick={() => playClick()}
        className={`group flex items-center gap-2 rounded-md py-1.5 pe-2 ps-1 transition ${FOCUS} ${
          next
            ? "bg-orange-400/10 ring-1 ring-inset ring-orange-300/25"
            : "hover:bg-white/5"
        }`}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          {done ? (
            <CheckCircle2
              size={15}
              strokeWidth={2.2}
              className="text-emerald-400"
              aria-label={t("lessonDone", locale)}
            />
          ) : (
            <Circle
              size={12}
              strokeWidth={2}
              className={next ? "text-orange-300" : "text-slate-500"}
              aria-hidden
            />
          )}
        </span>
        <span
          className={`w-6 shrink-0 font-mono text-[11px] tabular-nums ${
            next ? "text-orange-200" : "text-slate-400"
          }`}
        >
          {padIndex(index + 1)}
        </span>
        <span
          className={`min-w-0 text-[14px] leading-snug tracking-tight ${
            next
              ? "text-white"
              : "text-slate-200 group-hover:text-white"
          }`}
        >
          <RichText chips={false} text={loc(lesson.content.title, locale)} />
        </span>
        {next ? (
          <span className="shrink-0 rounded-full bg-orange-300/15 px-1.5 py-0.5 text-[10px] font-semibold text-orange-200">
            {t("upNext", locale)}
          </span>
        ) : null}
      </Link>
    </TreeItem>
  );
}

function TopicBranch({
  group,
  trackId,
  nextLessonId,
  startIndex,
  labelClass,
  tickClass,
}: {
  group: NestedGroup;
  trackId: TrackDefinition["id"];
  nextLessonId?: string;
  startIndex: number;
  labelClass: string;
  tickClass: string;
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
      tickClass={tickClass}
    />
  ));

  if (!titled) {
    return <>{leaves}</>;
  }

  return (
    <>
      <TreeItem branch>
        <p
          className={`px-1 pb-1 pt-2 text-[12px] font-semibold tracking-wide ${labelClass}`}
        >
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
        className={`flex w-full items-center gap-2 rounded-lg px-1 py-2 text-start transition hover:bg-white/4 ${FOCUS}`}
      >
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${tierIconClass(tier)} ${
            open ? "rotate-0" : "-rotate-90 rtl:rotate-90"
          }`}
        />
        <TierIcon tier={tier} size={18} />
        <span className="min-w-0 flex-1">
          <span
            className={`block text-[15px] font-semibold tracking-tight ${tierIconClass(tier)}`}
          >
            {tierLabel(tier, locale)}
          </span>
          <span className="mt-0.5 block text-[13px] font-normal leading-snug text-slate-400">
            {tierBlurb(tier, locale, trackId)}
          </span>
        </span>
        <span className="flex w-14 shrink-0 flex-col items-end gap-1">
          <span
            className="font-mono text-[12px] tabular-nums text-slate-300"
            dir="ltr"
          >
            {doneCount}/{lessons.length}
          </span>
          <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <span
              className={`absolute inset-y-0 start-0 rounded-full ${tierDotClass(tier)}`}
              style={{
                width: `${Math.round((doneCount / lessons.length) * 100)}%`,
              }}
            />
          </span>
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
                    labelClass={tierTopicLabelClass(tier)}
                    tickClass={tierTickClass(tier)}
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

  const continueLesson =
    lessons.find((l) => l.id === activeLessonId && !isComplete(l.id)) ??
    lessons.find((l) => !isComplete(l.id)) ??
    lessons.find((l) => l.id === activeLessonId) ??
    lessons[0];

  const [openTiers, setOpenTiers] = useState<Set<Tier>>(() => {
    const start = continueLesson?.tier;
    if (start) return new Set([start]);
    const first = TIER_ORDER.find((tier) =>
      lessons.some((lesson) => lesson.tier === tier),
    );
    return first ? new Set([first]) : new Set();
  });

  const allTiers = TIER_ORDER.filter((tier) => groups[tier].length > 0);
  const allOpen = allTiers.length > 0 && allTiers.every((tier) => openTiers.has(tier));

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <Atmosphere />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <BrandLockup href="/" onClick={() => playClick()} className="min-w-0" />
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/tracks"
              onClick={() => playClick()}
              aria-label={t("backToTracks", locale)}
              title={t("backToTracks", locale)}
              className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 sm:px-3 ${FOCUS}`}
            >
              <ArrowLeft size={12} className={RTL_FLIP} />
              <span className="hidden sm:inline">{t("backToTracks", locale)}</span>
            </Link>
            <SfxToggle compact />
            <span className="md:hidden">
              <LangToggle compact />
            </span>
            <span className="hidden md:inline-flex">
              <LangToggle />
            </span>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <a
          href="#lessons"
          className={`sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-30 focus:inline-flex focus:rounded-full focus:bg-orange-300 focus:px-3 focus:py-1.5 focus:text-sm focus:font-bold focus:text-slate-950 ${FOCUS}`}
        >
          {t("skipToLessons", locale)}
        </a>

        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 pt-5 sm:mb-8 sm:pt-8"
        >
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,1.15fr)] lg:gap-10">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("curriculumToc", locale)}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {loc(track.title, locale)}
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                {loc(track.tagline, locale)}
                {track.id === "html" ? null : (
                  <span className="text-slate-500">
                    {" "}
                    {loc(track.description, locale)}
                  </span>
                )}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {continueLesson ? (
                  <Link
                    href={`/${track.id}/learn?lesson=${continueLesson.slug}`}
                    onClick={() => playClick()}
                    className={`inline-flex min-h-11 max-w-full items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 ${FOCUS} ${
                      htmlTrack
                        ? "bg-orange-300"
                        : "bg-gradient-to-r from-yellow-300 to-cyan-300"
                    }`}
                  >
                    <span className="truncate">
                      {completedCount > 0
                        ? t("continueLearning", locale)
                        : t("startCurriculum", locale)}
                      <span className="mx-1.5 font-medium opacity-50">·</span>
                      <RichText
                        chips={false}
                        text={loc(continueLesson.content.title, locale)}
                      />
                    </span>
                    <ArrowRight size={14} className={`shrink-0 ${RTL_FLIP}`} />
                  </Link>
                ) : null}
                <div className="flex min-w-0 items-center gap-3 sm:max-w-sm">
                  <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={`absolute inset-y-0 start-0 rounded-full bg-gradient-to-r ${track.accent}`}
                      initial={false}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    />
                  </div>
                  <span
                    className="shrink-0 font-mono text-xs tabular-nums text-slate-500"
                    dir="ltr"
                  >
                    {completedCount}/{totalCount} {t("lessonsCount", locale)}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <TrackJobVisual trackId={track.id} variant="hero" />
            </div>
          </div>
        </motion.header>

        {totalCount === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/12 px-4 py-10 text-center text-sm text-slate-500">
            {t("emptyTrack", locale)}
          </p>
        ) : (
          <section
            id="lessons"
            tabIndex={-1}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 outline-none"
          >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-4">
                <h2 className="text-sm font-semibold text-white">
                  {t("levelsTree", locale)}
                </h2>
                <button
                  type="button"
                  aria-pressed={allOpen}
                  onClick={() => {
                    playClick();
                    setOpenTiers(
                      allOpen ? new Set() : new Set(allTiers),
                    );
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1 pe-3 ps-1.5 text-[11px] font-medium text-slate-200 transition hover:border-orange-300/30 hover:bg-orange-300/10 hover:text-white ${FOCUS}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-orange-200">
                    {allOpen ? (
                      <ChevronsDownUp size={14} aria-hidden />
                    ) : (
                      <ChevronsUpDown size={14} aria-hidden />
                    )}
                  </span>
                  {allOpen ? t("collapseAll", locale) : t("expandAll", locale)}
                </button>
              </div>
              <div className="px-2 py-1 sm:px-3">
                <ul className="divide-y divide-white/8">
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
            </section>
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
