"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Clock3, Lightbulb, Sparkles } from "lucide-react";
import { AccessibilityCard } from "@/components/lesson/AccessibilityCard";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { CheatSheetCards } from "@/components/lesson/CheatSheetCards";
import { CodeRunner } from "@/components/lesson/CodeRunner";
import { ComparePractice } from "@/components/lesson/ComparePractice";
import { LessonChallenge } from "@/components/lesson/LessonChallenge";
import { PitfallsBox } from "@/components/lesson/PitfallsBox";
import { SeoCallout } from "@/components/lesson/SeoCallout";
import { StickyLessonBar } from "@/components/lesson/StickyLessonBar";
import { UnderTheHood } from "@/components/lesson/UnderTheHood";
import { Visualizer } from "@/components/lesson/Visualizer";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { tierBadgeClass, tierEmoji, tierLabel } from "@/lib/tiers";
import type { Lesson } from "@/lib/types";

function LessonBody({ lesson }: { lesson: Lesson }) {
  const { locale } = useLanguage();
  const { trackId, lessons } = useProgress();
  const isCheatsheet = lesson.tier === "cheatsheet";
  const [challengePassed, setChallengePassed] = useState(
    !lesson.content.challenge,
  );

  return (
    <>
      <motion.article
        key={`${lesson.id}-${locale}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28 }}
        className="space-y-6 pb-28"
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
                    <Sparkles
                      size={14}
                      className="mt-0.5 shrink-0 text-yellow-300"
                    />
                    <span>{loc(point, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <motion.section
            layout
            className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/15 via-slate-900/50 to-amber-300/10 p-5 backdrop-blur-xl sm:p-6"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-2xl"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <motion.span
                  animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={16} />
                </motion.span>
                {t("visualLab", locale)}
              </div>
              <p className="mb-4 text-xs text-slate-400">
                {loc(lesson.content.visualHint, locale)}
              </p>
              <Visualizer trackId={trackId} kind={lesson.visualizer} />
            </div>
          </motion.section>
        </div>

        <UnderTheHood section={lesson.content.underTheHood} />

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

        {lesson.content.compareCards?.length ? (
          <ComparePractice cards={lesson.content.compareCards} />
        ) : null}

        {lesson.content.pitfalls ? (
          <PitfallsBox pitfalls={lesson.content.pitfalls} />
        ) : null}

        {isCheatsheet && lesson.content.cheatCards ? (
          <CheatSheetCards cards={lesson.content.cheatCards} />
        ) : null}

        {lesson.content.examples?.length ? (
          <CodeRunner
            key={`runner-${lesson.id}`}
            examples={lesson.content.examples}
          />
        ) : null}

        {lesson.content.challenge ? (
          <LessonChallenge
            key={`challenge-${lesson.id}`}
            challenge={lesson.content.challenge}
            onAnswered={(ok) => {
              if (ok) setChallengePassed(true);
            }}
          />
        ) : null}
      </motion.article>

      <StickyLessonBar lesson={lesson} challengePassed={challengePassed} />
    </>
  );
}

export function LessonContent() {
  const { lessons, activeLessonId } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activeLessonId]);

  if (lessons.length === 0) {
    return null;
  }

  const lesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  return (
    <AnimatePresence mode="wait">
      <LessonBody key={lesson.id} lesson={lesson} />
    </AnimatePresence>
  );
}
