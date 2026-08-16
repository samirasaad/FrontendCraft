"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListChecks, Trophy } from "lucide-react";
import { ConfettiBurst } from "@/components/level-quiz/ConfettiBurst";
import { FeedbackPanel } from "@/components/level-quiz/FeedbackPanel";
import { LevelQuizProgress } from "@/components/level-quiz/LevelQuizProgress";
import { Mascot } from "@/components/level-quiz/Mascot";
import { ParticleBurst } from "@/components/level-quiz/ParticleBurst";
import { LevelQuestionView } from "@/components/level-quiz/questions/LevelQuestions";
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
  const { playClick, playSuccess } = useSound();
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
  const revealed = s.feedbackPhase === "revealed" || s.feedbackPhase === "celebrate";
  const canContinue =
    s.feedbackPhase === "celebrate" ||
    s.feedbackPhase === "revealed" ||
    (s.feedbackPhase === "reflect" && s.showExplanation);

  useEffect(() => {
    if (s.feedbackPhase === "celebrate") playSuccess();
  }, [s.feedbackPhase, playSuccess]);

  function handleSubmit() {
    playClick();
    s.submit();
  }

  if (s.phase === "results" && s.result) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/10 via-slate-950/70 to-emerald-400/5 p-6 text-center">
        <ConfettiBurst active={s.result.passed} />
        <Trophy className="mx-auto mb-3 text-cyan-300" size={32} />
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
          {s.result.passed ? t("levelQuizPassed", locale) : t("levelQuizKeepGoing", locale)}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          {s.result.score}/{s.result.total} · {s.result.percent}%
        </p>
        <button
          type="button"
          onClick={() => {
            playClick();
            s.reset();
          }}
          className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
        >
          {t("levelQuizReplay", locale)}
        </button>
      </section>
    );
  }

  if (!s.question) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/10 via-slate-950/70 to-violet-400/5 p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] sm:p-6">
      <ParticleBurst active={s.feedbackPhase === "celebrate"} />
      <div className="relative mb-4 flex items-center gap-3">
        <Mascot mood={mood} />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
            {t("lessonTabLevelQuiz", locale)}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
            {loc(quiz.title, locale)}
          </h2>
        </div>
        <span className="ms-auto flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
          <ListChecks size={16} />
        </span>
      </div>

      <LevelQuizProgress current={s.index + 1} total={s.total} />

      <AnimatePresence mode="wait">
        <motion.div
          key={s.question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
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
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                disabled={s.draft == null}
                onClick={handleSubmit}
                className="rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-4 py-2.5 text-sm font-bold text-slate-950 disabled:opacity-40"
              >
                {t("levelQuizSubmit", locale)}
              </button>
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
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
