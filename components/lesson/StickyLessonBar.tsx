"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";
import { isLevelQuizLesson } from "@/lib/level-quiz/capstones";
import type { Lesson } from "@/lib/types";

export function StickyLessonBar({
  lesson,
  challengePassed,
  onOpenActivity,
  activityOpen = false,
}: {
  lesson: Lesson;
  /** Lesson activity is optional enrichment — nudge only, never blocks Next. */
  challengePassed?: boolean;
  onOpenActivity?: () => void;
  /** Hide the “open activity” nudge while that tab is already showing. */
  activityOpen?: boolean;
}) {
  const router = useRouter();
  const { locale } = useLanguage();
  const {
    lessons,
    isComplete,
    toggleComplete,
    setActiveLessonId,
    trackId,
  } = useProgress();
  const { playClick, playSuccess } = useSound();

  const done = isComplete(lesson.id);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const prev = index > 0 ? lessons[index - 1] : null;
  const showActivityHint =
    !activityOpen &&
    !challengePassed &&
    !isLevelQuizLesson(lesson) &&
    Boolean(lesson.content.challenge || lesson.content.activity);

  function goToLesson(target: Lesson) {
    setActiveLessonId(target.id);
    router.replace(`/${trackId}/learn?lesson=${target.slug}`, {
      scroll: false,
    });
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-2 pb-2 sm:px-4 sm:pb-3">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto mx-auto flex max-w-4xl items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/92 px-2.5 py-2 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-3 sm:p-3"
      >
        {showActivityHint ? (
          <button
            type="button"
            onClick={() => {
              playClick();
              onOpenActivity?.();
            }}
            className="hidden min-w-0 flex-1 whitespace-normal text-start text-sm leading-snug text-slate-200 transition hover:text-white sm:me-auto sm:block"
          >
            {lesson.content.levelQuiz
              ? t("levelQuizHintBar", locale)
              : t("challengeHintBar", locale)}
            <span aria-hidden className={`ms-1 inline-block ${RTL_FLIP}`}>
              →
            </span>
          </button>
        ) : (
          <span className="hidden flex-1 sm:block" />
        )}

        <div className="flex w-full flex-wrap items-center justify-end gap-1.5 sm:w-auto sm:gap-2">
          <button
            type="button"
            onClick={() => {
              if (done) playClick();
              else playSuccess();
              toggleComplete(lesson.id);
            }}
            title={done ? t("markIncomplete", locale) : t("markComplete", locale)}
            aria-label={done ? t("markIncomplete", locale) : t("markComplete", locale)}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold transition sm:px-3 ${
              done
                ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-400/40"
                : "bg-white/10 text-slate-100 hover:bg-white/15"
            }`}
          >
            <CheckCircle2 size={14} />
            <span className="hidden sm:inline">
              {done ? t("markIncomplete", locale) : t("markComplete", locale)}
            </span>
          </button>

          {prev ? (
            <button
              type="button"
              onClick={() => {
                playClick();
                goToLesson(prev);
              }}
              aria-label={t("prev", locale)}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-2 text-xs text-slate-200 hover:bg-white/10 sm:px-3"
            >
              <ChevronLeft size={14} className={RTL_FLIP} />
              <span className="hidden sm:inline">{t("prev", locale)}</span>
            </button>
          ) : null}

          <button
            type="button"
            disabled={!next}
            onClick={() => {
              if (!next) return;
              playClick();
              goToLesson(next);
            }}
            aria-label={t("nextLessonArrow", locale)}
            className="inline-flex max-w-[14rem] items-center gap-1 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-3 py-2 text-xs font-bold text-slate-950 transition enabled:hover:brightness-110 disabled:opacity-40 sm:max-w-xs sm:px-3.5"
          >
            <span className="hidden truncate sm:inline">
              {t("nextLessonArrow", locale)}
              {next ? (
                <>
                  <span className="mx-1 font-medium opacity-50">·</span>
                  {loc(next.content.title, locale)}
                </>
              ) : null}
            </span>
            <ChevronRight size={14} className={`shrink-0 ${RTL_FLIP}`} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
