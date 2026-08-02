"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { AccessibilityCard } from "@/components/lesson/AccessibilityCard";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { CheatSheetCards } from "@/components/lesson/CheatSheetCards";
import { CodeRunner } from "@/components/lesson/CodeRunner";
import { PitfallsBox } from "@/components/lesson/PitfallsBox";
import { SeoCallout } from "@/components/lesson/SeoCallout";
import { UnderTheHood } from "@/components/lesson/UnderTheHood";
import { Visualizer } from "@/components/lesson/Visualizer";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { tierBadgeClass, tierEmoji, tierLabel } from "@/lib/tiers";
import type { Lesson } from "@/lib/types";

function LessonBody({ lesson }: { lesson: Lesson }) {
  const { locale, dir } = useLanguage();
  const {
    trackId,
    lessons,
    isComplete,
    toggleComplete,
    setActiveLessonId,
  } = useProgress();
  const { playClick, playSuccess } = useSound();
  const done = isComplete(lesson.id);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;
  const isCheatsheet = lesson.tier === "cheatsheet";

  return (
    <motion.article
      key={`${lesson.id}-${locale}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      className="space-y-6"
    >
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierBadgeClass(lesson.tier)}`}
          >
            {tierEmoji(lesson.tier)} {tierLabel(lesson.tier, locale)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Clock3 size={12} />
            {lesson.readMinutes} {t("readTime", locale)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <BookOpen size={12} />
            {lesson.order}/{lessons.length}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {loc(lesson.content.title, locale)}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {loc(lesson.content.summary, locale)}
        </p>
        <button
          type="button"
          onClick={() => {
            if (done) {
              playClick();
            } else {
              playSuccess();
            }
            toggleComplete(lesson.id);
          }}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            done
              ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/40"
              : "bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950 hover:brightness-110"
          }`}
        >
          <CheckCircle2 size={16} />
          {done ? t("markIncomplete", locale) : t("markComplete", locale)}
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-yellow-200">
            <Lightbulb size={16} />
            {t("explanation", locale)}
          </div>
          <div className="space-y-4 text-[15px] leading-7 text-slate-300">
            {lesson.content.paragraphs.map((p, i) => (
              <p key={i}>{loc(p, locale)}</p>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              {t("keyPoints", locale)}
            </p>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-2xl border border-white/5 bg-slate-950/40 px-3 py-2 text-sm text-slate-200"
                >
                  <Sparkles size={14} className="mt-0.5 shrink-0 text-yellow-300" />
                  <span>{loc(point, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-900/40 to-yellow-300/10 p-5 backdrop-blur-xl sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <Sparkles size={16} />
            {t("visualLab", locale)}
          </div>
          <p className="mb-4 text-xs text-slate-400">
            {loc(lesson.content.visualHint, locale)}
          </p>
          <Visualizer trackId={trackId} kind={lesson.visualizer} />
        </section>
      </div>

      <UnderTheHood section={lesson.content.underTheHood} />

      {/* Dedicated curriculum lessons — not repeated on every topic */}
      {lesson.slug === "accessibility-basics" ? (
        <AccessibilityCard section={lesson.content.accessibility} />
      ) : null}

      {lesson.slug === "meta-seo" ? (
        <SeoCallout section={lesson.content.seo} />
      ) : null}

      {lesson.slug === "browser-compatibility" ? (
        <div className="space-y-4">
          {lesson.content.browserSupport ? (
            <BrowserSupport support={lesson.content.browserSupport} />
          ) : null}
          {lesson.content.browserMatrices?.map((matrix, index) => (
            <div key={`${matrix.label.en}-${index}`} className="space-y-2">
              <p className="px-1 text-sm font-semibold text-emerald-100">
                {loc(matrix.label, locale)}
              </p>
              <BrowserSupport support={matrix.support} />
            </div>
          ))}
        </div>
      ) : null}

      {lesson.content.pitfalls ? (
        <PitfallsBox pitfalls={lesson.content.pitfalls} />
      ) : null}

      {isCheatsheet && lesson.content.cheatCards ? (
        <CheatSheetCards cards={lesson.content.cheatCards} />
      ) : null}

      <CodeRunner key={lesson.id} examples={lesson.content.examples} />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={!prev}
          onClick={() => {
            if (!prev) return;
            playClick();
            setActiveLessonId(prev.id);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition enabled:hover:bg-white/10 disabled:opacity-40"
        >
          <PrevIcon size={16} />
          {t("prev", locale)}
        </button>
        <button
          type="button"
          disabled={!next}
          onClick={() => {
            if (!next) return;
            playClick();
            setActiveLessonId(next.id);
          }}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition enabled:hover:brightness-110 disabled:opacity-40"
        >
          {t("next", locale)}
          <NextIcon size={16} />
        </button>
      </div>
    </motion.article>
  );
}

export function LessonContent() {
  const { lessons, activeLessonId } = useProgress();

  if (lessons.length === 0) {
    return null;
  }

  const lesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  return (
    <AnimatePresence mode="wait">
      <LessonBody lesson={lesson} />
    </AnimatePresence>
  );
}
