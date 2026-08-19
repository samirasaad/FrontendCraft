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
      Array.from({ length: reduce ? 0 : 22 }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 13) % 88)}%`,
        delay: (index % 8) * 0.28,
        duration: 2.6 + (index % 5) * 0.45,
        drift: index % 2 === 0 ? 18 : -16,
        rotate: (index % 6) * 60,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        size: 5 + (index % 4) * 2,
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
          className="absolute top-0 rounded-[2px]"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * 1.7,
            backgroundColor: piece.color,
          }}
          initial={{ y: -24, opacity: 0, x: 0 }}
          animate={{
            y: ["-8%", "118%"],
            x: [0, piece.drift, 0],
            opacity: [0, 1, 1, 0],
            rotate: [piece.rotate, piece.rotate + 280],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
            repeat: Infinity,
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

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.18, 1] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -start-8 bottom-0 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.3, 0.75, 0.3], scale: [1.1, 1, 1.1] }
              }
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative text-center">
              <div className="relative mx-auto mb-4 h-16 w-16">
                {reduce ? null : (
                  <motion.span
                    aria-hidden
                    className={`absolute inset-0 rounded-2xl ${
                      highScore
                        ? "bg-emerald-400/35"
                        : "bg-amber-400/30"
                    }`}
                    animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                <motion.div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${
                    highScore
                      ? "bg-emerald-400/15 text-emerald-300 shadow-[0_0_36px_rgba(52,211,153,0.35)]"
                      : "bg-amber-400/12 text-amber-200 shadow-[0_0_28px_rgba(251,191,36,0.22)]"
                  }`}
                  initial={reduce ? false : { scale: 0.5, rotate: -12 }}
                  animate={
                    reduce
                      ? { scale: 1 }
                      : {
                          scale: [1, 1.08, 1],
                          rotate: highScore ? [0, -10, 10, 0] : [0, 8, -8, 0],
                        }
                  }
                  transition={
                    reduce
                      ? undefined
                      : {
                          scale: {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                  }
                >
                  {highScore ? (
                    <PartyPopper size={28} />
                  ) : (
                    <Sparkles size={26} />
                  )}
                </motion.div>
              </div>

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

              <div className="relative mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`absolute inset-y-0 start-0 overflow-hidden rounded-full ${
                    highScore
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-300"
                      : "bg-gradient-to-r from-amber-300 to-orange-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  {reduce ? null : (
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 start-0 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent"
                      animate={{ x: ["-120%", "280%"] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.7,
                      }}
                    />
                  )}
                </motion.div>
              </div>
              <p className="mt-1 text-xs font-semibold tabular-nums text-slate-500" dir="ltr">
                {percent}%
              </p>
            </div>

            <div className="relative mt-6 space-y-2.5">
              {highScore && nextLesson ? (
                <motion.button
                  type="button"
                  onClick={onNextLesson}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-yellow-300 via-cyan-300 to-yellow-300 bg-[length:200%_100%] px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.28)] transition hover:brightness-110"
                  animate={
                    reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : { duration: 3.4, repeat: Infinity, ease: "linear" }
                  }
                >
                  {t("activityCongratsNextLesson", locale)}
                  <ArrowRight size={16} className={RTL_FLIP} />
                </motion.button>
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
