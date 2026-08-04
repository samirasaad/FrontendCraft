"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { QuizCodeSnippet } from "@/components/lesson/quiz/QuizCodeSnippet";
import { QuizOptionCard } from "@/components/lesson/quiz/QuizOptionCard";
import { QuizProgress } from "@/components/lesson/quiz/QuizProgress";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";
import type { LessonQuiz, QuizQuestion } from "@/lib/types";

function fillTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function QuestionView({
  question,
  index,
  total,
  selected,
  onSelect,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const { locale } = useLanguage();
  const answered = selected !== null;
  const correct = selected === question.correctId;

  return (
    <div>
      <QuizProgress
        current={index + 1}
        total={total}
        label={fillTemplate(t("quizProgress", locale), {
          current: index + 1,
          total,
        })}
      />

      <p className="mb-4 text-base font-semibold leading-relaxed text-white sm:text-lg">
        <RichText text={loc(question.prompt, locale)} />
      </p>

      {question.code ? (
        <div className="mb-5">
          <QuizCodeSnippet
            code={question.code}
            language={question.language ?? "html"}
          />
        </div>
      ) : null}

      <div
        className="grid gap-2.5 sm:grid-cols-2"
        role="radiogroup"
        aria-label={loc(question.prompt, locale)}
      >
        {question.options.map((option, optionIndex) => (
          <QuizOptionCard
            key={option.id}
            index={optionIndex}
            label={loc(option.label, locale)}
            selected={selected === option.id}
            answered={answered}
            isCorrectOption={option.id === question.correctId}
            isWrongSelection={answered && selected === option.id && !correct}
            disabled={answered}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {answered ? (
          <motion.div
            key={`${question.id}-explain`}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className={`mt-5 overflow-hidden rounded-2xl border ${
              correct
                ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 via-slate-950/60 to-cyan-400/10 shadow-[0_0_28px_rgba(52,211,153,0.15)]"
                : "border-rose-400/35 bg-gradient-to-br from-rose-400/12 via-slate-950/60 to-amber-400/5 shadow-[0_0_22px_rgba(251,113,133,0.12)]"
            }`}
            role="status"
          >
            <div className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
              {correct ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />
              ) : (
                <XCircle size={18} className="mt-0.5 shrink-0 text-rose-300" />
              )}
              <div className="min-w-0">
                <p
                  className={`text-sm font-bold ${
                    correct ? "text-emerald-100" : "text-rose-100"
                  }`}
                >
                  {correct
                    ? t("challengeCorrect", locale)
                    : t("challengeWrong", locale)}
                </p>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {t("quizExplanation", locale)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">
                  <RichText text={loc(question.explanation, locale)} />
                </p>
              </div>
            </div>

            {question.hint ? (
              <div className="flex items-start gap-2.5 border-t border-white/10 bg-black/20 px-4 py-3 sm:px-5">
                <Lightbulb
                  size={15}
                  className="mt-0.5 shrink-0 text-amber-300"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/80">
                    {t("quizHint", locale)}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-300">
                    <RichText text={loc(question.hint, locale)} />
                  </p>
                </div>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ResultsView({
  score,
  total,
}: {
  score: number;
  total: number;
}) {
  const { locale } = useLanguage();
  const perfect = score === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
          perfect
            ? "bg-emerald-400/15 text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.25)]"
            : "bg-cyan-400/15 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.2)]"
        }`}
      >
        <Sparkles size={24} />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        {t("quizComplete", locale)}
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        {fillTemplate(t("quizScore", locale), { score, total })}
      </p>

      <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          initial={{ width: 0 }}
          animate={{
            width: `${Math.round((score / Math.max(total, 1)) * 100)}%`,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}

/** Multi-question interactive quiz with code snippet, glow feedback, and progress. */
export function Quiz({
  quiz,
  onComplete,
}: {
  quiz: LessonQuiz;
  /** Fires once when the learner reaches the results screen. */
  onComplete?: (result: { score: number; total: number }) => void;
}) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const questions = quiz.questions;
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"question" | "results">("question");
  const [reported, setReported] = useState(false);

  const question = questions[index];
  const answered = selected !== null;
  const isLast = index >= total - 1;

  const title = useMemo(
    () => (quiz.title ? loc(quiz.title, locale) : t("quizTitle", locale)),
    [quiz.title, locale],
  );

  function handleSelect(id: string) {
    if (selected || !question) return;
    playClick();
    setSelected(id);
    if (id === question.correctId) {
      playSuccess();
      setScore((s) => s + 1);
    }
  }

  function advance() {
    playClick();
    if (isLast) {
      setPhase("results");
      if (!reported) {
        setReported(true);
        onComplete?.({ score, total });
      }
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (!question && phase !== "results") return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/10 via-slate-950/70 to-emerald-400/5 p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-10 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative mb-5 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
          <Zap size={16} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
            Quiz
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
            {title}
          </h2>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === "results" ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
          >
            <ResultsView score={score} total={total} />
          </motion.div>
        ) : (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.28 }}
          >
            <QuestionView
              question={question}
              index={index}
              total={total}
              selected={selected}
              onSelect={handleSelect}
            />

            <AnimatePresence>
              {answered ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex justify-end"
                >
                  <button
                    type="button"
                    onClick={advance}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:brightness-110"
                  >
                    {isLast ? t("quizFinish", locale) : t("quizNext", locale)}
                    <ArrowRight size={14} className={RTL_FLIP} />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { QuizCodeSnippet } from "@/components/lesson/quiz/QuizCodeSnippet";
export { QuizOptionCard } from "@/components/lesson/quiz/QuizOptionCard";
export { QuizProgress } from "@/components/lesson/quiz/QuizProgress";
