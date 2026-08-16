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

export function FeedbackPanel({
  question,
  phase,
  attempts,
  hintLevel,
  showExplanation,
  showDemo,
  onTryAgain,
  onHint,
  onShowAnswer,
  onContinue,
  canContinue,
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
}) {
  const { locale } = useLanguage();

  if (phase === "answer") return null;

  const celebrate = phase === "celebrate";
  const revealed = phase === "revealed";
  const triesLeft = Math.max(0, MAX_WRONG_ATTEMPTS - attempts);
  const showHelp = phase === "reflect";

  return (
    <div className="mt-4 space-y-3">
      {celebrate ? (
        <div className="rounded-2xl border border-emerald-400/35 bg-emerald-400/10 px-4 py-3">
          <p className="font-semibold text-emerald-100">{t("levelQuizCorrect", locale)}</p>
        </div>
      ) : null}

      {showHelp ? (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3">
          <p className="font-semibold text-rose-100">{t("levelQuizWrong", locale)}</p>
          <p className="mt-1 text-base leading-relaxed text-rose-100">
            {triesLeft > 0
              ? t("levelQuizAttemptsLeft", locale).replace("{n}", String(triesLeft))
              : t("levelQuizNoAttemptsLeft", locale)}
          </p>
        </div>
      ) : null}

      {hintLevel > 0 && question.hint ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-4 text-lg leading-relaxed text-amber-50"
        >
          <Lightbulb size={22} className="mt-0.5 shrink-0 text-amber-200" />
          <div>
            <p className="mb-1 text-base font-semibold text-amber-200">
              {t("activityHint", locale)}
            </p>
            <RichText text={loc(question.hint, locale)} />
          </div>
        </motion.div>
      ) : null}

      <AnimatePresence>
        {(showExplanation || celebrate || revealed) ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`overflow-hidden rounded-2xl border px-4 py-4 ${
              celebrate
                ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 to-cyan-400/10"
                : "border-white/12 bg-slate-950/60"
            }`}
          >
            <p className="text-base font-semibold text-slate-300">
              {t("levelQuizWhy", locale)}
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-100">
              <RichText text={loc(question.explanation, locale)} />
            </p>
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

      {showHelp && !showExplanation ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onTryAgain}
            className="rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-4 py-2.5 text-sm font-bold text-slate-950"
          >
            {t("levelQuizTryAgain", locale)}
          </button>
          {question.hint && hintLevel === 0 ? (
            <button
              type="button"
              onClick={onHint}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              {t("levelQuizGetHint", locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onShowAnswer}
            className="text-sm font-medium text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            {t("levelQuizShowAnswer", locale)}
          </button>
        </div>
      ) : null}

      {canContinue ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:brightness-110"
          >
            {t("levelQuizContinue", locale)}
            <ArrowRight size={14} className={RTL_FLIP} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
