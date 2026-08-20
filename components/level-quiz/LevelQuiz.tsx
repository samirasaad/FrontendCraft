"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ConfettiBurst } from "@/components/level-quiz/ConfettiBurst";
import { FeedbackPanel } from "@/components/level-quiz/FeedbackPanel";
import { LevelQuizProgress } from "@/components/level-quiz/LevelQuizProgress";
import { Mascot } from "@/components/level-quiz/Mascot";
import { ParticleBurst } from "@/components/level-quiz/ParticleBurst";
import { LevelQuestionView } from "@/components/level-quiz/questions/LevelQuestions";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { useLevelQuizSession } from "@/hooks/useLevelQuizSession";
import type { LevelQuizDefinition, LevelQuizResult } from "@/lib/level-quiz/types";

export function LevelQuiz({
  quiz,
  onComplete,
}: {
  quiz: LevelQuizDefinition;
  onComplete?: (result: LevelQuizResult) => void;
}) {
  const { locale } = useLanguage();
  const { playClick, playSuccess, playVictory } = useSound();
  const reduceMotion = useReducedMotion();
  const s = useLevelQuizSession(quiz, onComplete);

  const mood =
    s.feedbackPhase === "celebrate"
      ? "happy"
      : s.feedbackPhase === "reflect"
        ? "sad"
        : s.feedbackPhase === "revealed"
          ? "think"
          : "idle";

  const feedback =
    s.feedbackPhase === "celebrate"
      ? "correct"
      : s.feedbackPhase === "reflect"
        ? "wrong"
        : "none";

  const inputDisabled =
    s.feedbackPhase !== "answer" && s.feedbackPhase !== "reflect";
  const revealed =
    s.feedbackPhase === "revealed" || s.feedbackPhase === "celebrate";
  const canContinue =
    s.feedbackPhase === "celebrate" ||
    s.feedbackPhase === "revealed" ||
    (s.feedbackPhase === "reflect" && s.showExplanation);

  useEffect(() => {
    if (s.feedbackPhase === "celebrate") playSuccess();
  }, [s.feedbackPhase, playSuccess]);

  useEffect(() => {
    if (s.phase === "results" && s.result?.passed) playVictory();
  }, [s.phase, s.result?.passed, playVictory]);

  function handleSubmit() {
    playClick();
    s.submit();
  }

  if (s.phase === "results" && s.result) {
    const missed = quiz.questions.filter((q) => s.scores[q.id] === false);
    const scoreLine = t("levelQuizScoreDetail", locale)
      .replace("{score}", String(s.result.score))
      .replace("{total}", String(s.result.total))
      .replace("{percent}", String(s.result.percent));

    return (
      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-slate-950/80 p-5 text-center sm:p-6">
        {s.result.passed && !reduceMotion ? (
          <ConfettiBurst active />
        ) : null}
        <Trophy
          className={`mx-auto mb-3 ${s.result.passed ? "text-cyan-300" : "text-slate-400"}`}
          size={32}
        />
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
          {s.result.passed
            ? t("levelQuizPassed", locale)
            : t("levelQuizKeepGoing", locale)}
        </h3>
        <p className="mt-2 text-sm text-slate-400" dir="ltr">
          {scoreLine}
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-start">
          <p className="text-sm font-semibold text-slate-200">
            {t("levelQuizMissedTitle", locale)}
          </p>
          {missed.length === 0 ? (
            <p className="mt-2 text-sm text-emerald-200/90">
              {t("levelQuizMissedEmpty", locale)}
            </p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {missed.map((q, i) => (
                <li
                  key={q.id}
                  className="rounded-xl border border-rose-400/20 bg-rose-400/5 px-3 py-2.5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-200/80">
                    {i + 1}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-slate-100">
                    <RichText text={loc(q.prompt, locale)} />
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-500">
                      {t("levelQuizWhy", locale)}{" "}
                    </span>
                    <RichText text={loc(q.explanation, locale)} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            playClick();
            s.reset();
          }}
          className="mt-5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10"
        >
          {t("levelQuizReplay", locale)}
        </button>
      </section>
    );
  }

  if (!s.question) return null;

  return (
    <section className="relative rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(56,189,248,0.06)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
        {!reduceMotion ? (
          <ParticleBurst active={s.feedbackPhase === "celebrate"} />
        ) : null}
      </div>

      <div className="relative mb-3 flex items-center gap-2.5">
        <Mascot mood={mood} />
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <LevelQuizProgress current={s.index + 1} total={s.total} />
          <span
            className="shrink-0 font-mono text-xs font-medium tabular-nums text-slate-500"
            dir="ltr"
          >
            {s.index + 1}/{s.total}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.question.id}
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
          className={s.shake ? "level-quiz-shake" : ""}
        >
          <LevelQuestionView
            question={s.question}
            answer={s.draft}
            onChange={s.setDraft}
            disabled={inputDisabled}
            revealed={revealed}
            feedback={feedback === "none" ? "none" : feedback}
          />

          {s.feedbackPhase === "answer" ? (
            <div className="sticky bottom-0 z-10 -mx-1 mt-4 border-t border-white/10 bg-slate-950/90 px-1 py-3 backdrop-blur-md">
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={s.draft == null}
                  onClick={handleSubmit}
                  className="rounded-full bg-sky-300 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-200 disabled:opacity-40"
                >
                  {t("levelQuizSubmit", locale)}
                </button>
              </div>
            </div>
          ) : null}

          <FeedbackPanel
            question={s.question}
            phase={s.feedbackPhase}
            attempts={s.attempts}
            hintLevel={s.hintLevel}
            showExplanation={s.showExplanation}
            showDemo={s.showDemo}
            onTryAgain={() => {
              playClick();
              s.tryAgain();
            }}
            onHint={() => {
              playClick();
              s.revealHint();
            }}
            onShowAnswer={() => {
              playClick();
              s.revealAnswer();
            }}
            onContinue={() => {
              playClick();
              s.continueAfterFeedback();
            }}
            canContinue={canContinue}
            isLast={s.isLast}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
