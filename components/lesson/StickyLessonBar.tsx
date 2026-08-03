"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import type { Lesson } from "@/lib/types";

export function StickyLessonBar({
  lesson,
  challengePassed,
}: {
  lesson: Lesson;
  /** When a challenge exists, next is softer until answered correctly — still allowed. */
  challengePassed?: boolean;
}) {
  const { locale, dir } = useLanguage();
  const { lessons, isComplete, toggleComplete, setActiveLessonId } =
    useProgress();
  const { playClick, playSuccess } = useSound();

  const done = isComplete(lesson.id);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const prev = index > 0 ? lessons[index - 1] : null;
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto mx-auto flex max-w-4xl flex-col gap-2 rounded-2xl border border-white/15 bg-slate-950/90 p-3 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:p-3.5"
      >
        {!challengePassed && lesson.content.challenge ? (
          <p className="min-w-0 flex-1 text-[11px] text-yellow-200/80 sm:me-auto">
            {t("challengeHintBar", locale)}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (done) playClick();
              else playSuccess();
              toggleComplete(lesson.id);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition ${
              done
                ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-400/40"
                : "bg-white/10 text-slate-100 hover:bg-white/15"
            }`}
          >
            <CheckCircle2 size={14} />
            {done ? t("markIncomplete", locale) : t("markComplete", locale)}
          </button>

          {prev ? (
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveLessonId(prev.id);
              }}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10"
            >
              <PrevIcon size={14} />
              {t("prev", locale)}
            </button>
          ) : null}

          <button
            type="button"
            disabled={!next}
            onClick={() => {
              if (!next) return;
              playClick();
              if (!done) toggleComplete(lesson.id);
              setActiveLessonId(next.id);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-3.5 py-2 text-xs font-bold text-slate-950 transition enabled:hover:brightness-110 disabled:opacity-40"
          >
            {t("nextLessonArrow", locale)}
            <NextIcon size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
