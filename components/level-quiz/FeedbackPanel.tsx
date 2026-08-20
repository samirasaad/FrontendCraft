"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lightbulb } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { MAX_WRONG_ATTEMPTS } from "@/lib/level-quiz/engine";
import { RTL_FLIP } from "@/lib/rtl";
import type { LevelQuestion } from "@/lib/level-quiz/types";
import type { FeedbackPhase } from "@/hooks/useLevelQuizSession";

/** Prefer authored hint; otherwise a short soft nudge from the explanation. */
function resolveHint(question: LevelQuestion, locale: "en" | "ar"): string {
  if (question.hint) return loc(question.hint, locale);
  const explanation = loc(question.explanation, locale).trim();
  const cut = explanation.search(/[.!?。؟]/);
  if (cut > 12 && cut < 120) return explanation.slice(0, cut + 1);
  if (explanation.length <= 110) return explanation;
  return `${explanation.slice(0, 100).trim()}…`;
}

export function FeedbackPanel({
  question,
  phase,
  attempts,
  hintLevel,
  showDemo,
  onTryAgain,
  onHint,
  onShowAnswer,
  onContinue,
  canContinue,
  isLast,
}: {
  question: LevelQuestion;
  phase: FeedbackPhase;
  attempts: number;
  hintLevel: number;
  showExplanation: boolean;
  showDemo: boolean;
  onTryAgain: () => void;
  onHint: () => void;
  onShowAnswer: () => void;
  onContinue: () => void;
  canContinue: boolean;
  isLast?: boolean;
}) {
  const { locale } = useLanguage();

  if (phase === "answer") return null;

  const celebrate = phase === "celebrate";
  const revealed = phase === "revealed";
  const reflect = phase === "reflect";
  const triesLeft = Math.max(0, MAX_WRONG_ATTEMPTS - attempts);
  const hintText = resolveHint(question, locale);
  const hintVisible = hintLevel > 0;

  return (
    <div className="mt-4 space-y-3">
      <AnimatePresence mode="wait">
        {reflect ? (
          <motion.div
            key="reflect"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="overflow-hidden rounded-2xl border border-rose-400/30 bg-rose-400/10"
          >
            <div className="px-4 py-3.5">
              <p className="font-semibold text-rose-50">
                {t("levelQuizWrong", locale)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-rose-100/90">
                {triesLeft > 0
                  ? t("levelQuizAttemptsLeft", locale).replace(
                      "{n}",
                      String(triesLeft),
                    )
                  : t("levelQuizNoAttemptsLeft", locale)}
              </p>

              {hintVisible ? (
                <div className="mt-3 flex gap-2.5 rounded-xl border border-amber-300/25 bg-amber-300/10 px-3 py-3 text-base leading-relaxed text-amber-50">
                  <Lightbulb
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-200"
                  />
                  <div>
                    <p className="mb-0.5 text-sm font-semibold text-amber-200">
                      {t("activityHint", locale)}
                    </p>
                    <RichText text={hintText} />
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}

        {celebrate || revealed ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`overflow-hidden rounded-2xl border px-4 py-3.5 ${
              celebrate
                ? "border-emerald-400/40 bg-emerald-400/10"
                : "border-white/12 bg-slate-950/60"
            }`}
          >
            {celebrate ? (
              <p className="font-semibold text-emerald-100">
                {t("levelQuizCorrect", locale)}
              </p>
            ) : (
              <p className="font-semibold text-slate-200">
                {t("levelQuizAnswerRevealed", locale)}
              </p>
            )}

            <div className="mt-2.5">
              <p
                className={`text-sm font-semibold ${
                  celebrate ? "text-emerald-200/90" : "text-slate-400"
                }`}
              >
                {t("levelQuizWhy", locale)}
              </p>
              <p className="mt-1 text-base leading-relaxed text-slate-100">
                <RichText text={loc(question.explanation, locale)} />
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showDemo && question.demoHtml ? (
        <iframe
          title="demo"
          sandbox="allow-scripts"
          srcDoc={question.demoHtml}
          className="h-40 w-full rounded-2xl border border-white/10 bg-white"
        />
      ) : null}

      {reflect ? (
        <div className="sticky bottom-0 z-10 -mx-1 flex flex-wrap items-center gap-2 border-t border-white/10 bg-slate-950/95 px-1 py-3 backdrop-blur-md">
          <button
            type="button"
            onClick={onTryAgain}
            className="rounded-full bg-sky-300 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-200"
          >
            {t("levelQuizTryAgain", locale)}
          </button>
          {!hintVisible ? (
            <button
              type="button"
              onClick={onHint}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2.5 text-sm font-semibold text-amber-100 hover:bg-amber-300/20"
            >
              <Lightbulb size={15} />
              {t("levelQuizGetHint", locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onShowAnswer}
            className="px-2 py-2 text-sm font-medium text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            {t("levelQuizShowAnswer", locale)}
          </button>
        </div>
      ) : null}

      {canContinue ? (
        <div className="sticky bottom-0 z-10 -mx-1 border-t border-white/10 bg-slate-950/90 px-1 py-3 backdrop-blur-md">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-teal-200"
            >
              {isLast
                ? t("levelQuizFinish", locale)
                : t("levelQuizContinue", locale)}
              <ArrowRight size={14} className={RTL_FLIP} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
