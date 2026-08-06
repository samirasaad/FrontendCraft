"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  PartyPopper,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import {
  activityScorePercent,
  isHighActivityScore,
} from "@/lib/lesson-activity";
import { RTL_FLIP } from "@/lib/rtl";
import type { Lesson } from "@/lib/types";

function fillTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

const CONFETTI_COLORS = [
  "#fde047",
  "#22d3ee",
  "#34d399",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
];

function ConfettiBurst({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: reduce ? 0 : 18 }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 17) % 84)}%`,
        delay: (index % 6) * 0.04,
        rotate: (index % 5) * 72,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        size: 6 + (index % 3) * 2,
      })),
    [reduce],
  );

  if (!active || pieces.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * 1.6,
            backgroundColor: piece.color,
            rotate: piece.rotate,
          }}
          initial={{ y: -12, opacity: 0, scale: 0.6 }}
          animate={{
            y: ["0%", "120vh"],
            opacity: [0, 1, 1, 0],
            rotate: piece.rotate + 180,
          }}
          transition={{
            duration: 2.4,
            delay: piece.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

export function ActivityCongratsOverlay({
  open,
  score,
  total,
  lesson,
  nextLesson,
  onNextLesson,
  onReviewLesson,
  onTryAgain,
}: {
  open: boolean;
  score: number;
  total: number;
  lesson: Lesson;
  nextLesson: Lesson | null;
  onNextLesson: () => void;
  onReviewLesson: () => void;
  onTryAgain: () => void;
}) {
  const { locale } = useLanguage();
  const { playSuccess } = useSound();
  const reduce = useReducedMotion();
  const highScore = isHighActivityScore(score, total);
  const percent = activityScorePercent(score, total);
  const perfect = score === total && total > 0;

  useEffect(() => {
    if (!open) return;
    playSuccess();
  }, [open, playSuccess]);

  const [backdropReady, setBackdropReady] = useState(false);

  useEffect(() => {
    if (!open) {
      setBackdropReady(false);
      return;
    }
    const id = window.setTimeout(() => setBackdropReady(true), 280);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="activity-congrats"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="activity-congrats-title"
        >
          <motion.button
            type="button"
            aria-label={t("activityCongratsDismiss", locale)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={backdropReady ? onReviewLesson : undefined}
            tabIndex={backdropReady ? 0 : -1}
          />

          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-6 shadow-[0_0_60px_rgba(34,211,238,0.18)] sm:p-7"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.92, rotate: -1.5 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, rotate: 0 }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.96 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <ConfettiBurst active={highScore} />

            <div
              aria-hidden
              className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -start-8 bottom-0 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl"
            />

            <div className="relative text-center">
              <motion.div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                  highScore
                    ? "bg-emerald-400/15 text-emerald-300 shadow-[0_0_36px_rgba(52,211,153,0.28)]"
                    : "bg-amber-400/12 text-amber-200 shadow-[0_0_28px_rgba(251,191,36,0.18)]"
                }`}
                initial={reduce ? false : { scale: 0.5, rotate: -12 }}
                animate={reduce ? undefined : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                {highScore ? <PartyPopper size={28} /> : <Sparkles size={26} />}
              </motion.div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
                {t("lessonTabActivity", locale)}
              </p>
              <h2
                id="activity-congrats-title"
                className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-[1.65rem]"
              >
                {perfect
                  ? t("activityCongratsPerfect", locale)
                  : highScore
                    ? t("activityCongratsGreat", locale)
                    : t("activityCongratsKeepGoing", locale)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {highScore
                  ? t("activityCongratsHighBody", locale)
                  : t("activityCongratsReviewBody", locale)}
              </p>

              <p className="mt-3 text-sm text-slate-400">
                {fillTemplate(t("activityScore", locale), { score, total })}
              </p>

              <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${
                    highScore
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-300"
                      : "bg-gradient-to-r from-amber-300 to-orange-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <p className="mt-1 text-xs font-semibold tabular-nums text-slate-500" dir="ltr">
                {percent}%
              </p>
            </div>

            <div className="relative mt-6 space-y-2.5">
              {highScore && nextLesson ? (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)] transition hover:brightness-110"
                >
                  {t("activityCongratsNextLesson", locale)}
                  <ArrowRight size={16} className={RTL_FLIP} />
                </button>
              ) : null}

              {highScore && !nextLesson ? (
                <button
                  type="button"
                  onClick={onReviewLesson}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
                >
                  {t("activityContinue", locale)}
                </button>
              ) : null}

              {!highScore ? (
                <>
                  <button
                    type="button"
                    onClick={onReviewLesson}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
                  >
                    <BookOpen size={16} />
                    {t("activityCongratsReviewLesson", locale)}
                  </button>
                  <button
                    type="button"
                    onClick={onTryAgain}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    <RotateCcw size={15} />
                    {t("activityRetry", locale)}
                  </button>
                </>
              ) : null}

              {highScore ? (
                <button
                  type="button"
                  onClick={onReviewLesson}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
                >
                  {t("activityCongratsStayOnLesson", locale)}
                </button>
              ) : null}
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-500">
              <span className="text-slate-400">
                {loc(lesson.content.title, locale)}
              </span>
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
