"use client";

import { useCallback, useMemo, useState } from "react";
import {
  evaluateLevelAnswer,
  isLevelQuizPassed,
  levelQuizPercent,
  MAX_WRONG_ATTEMPTS,
} from "@/lib/level-quiz/engine";
import type {
  LevelAnswerValue,
  LevelQuizDefinition,
  LevelQuizResult,
} from "@/lib/level-quiz/types";

export type FeedbackPhase = "answer" | "reflect" | "revealed" | "celebrate";

export function useLevelQuizSession(
  quiz: LevelQuizDefinition,
  onComplete?: (result: LevelQuizResult) => void,
) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"question" | "results">("question");
  const [feedbackPhase, setFeedbackPhase] = useState<FeedbackPhase>("answer");
  const [draft, setDraft] = useState<LevelAnswerValue | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [shake, setShake] = useState(false);
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const total = quiz.questions.length;
  const question = quiz.questions[index];
  const isLast = index >= total - 1;
  const correct = question
    ? scores[question.id] === true
    : false;

  const submit = useCallback(() => {
    if (!question || draft == null) return;
    const ok = evaluateLevelAnswer(question, draft);
    if (ok) {
      setScores((s) => ({ ...s, [question.id]: true }));
      setShowExplanation(true);
      setFeedbackPhase("celebrate");
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setShake(true);
    window.setTimeout(() => setShake(false), 480);
    if (nextAttempts >= MAX_WRONG_ATTEMPTS) {
      setScores((s) => ({ ...s, [question.id]: false }));
      setShowExplanation(true);
      if (question.demoHtml) setShowDemo(true);
      setFeedbackPhase("revealed");
      return;
    }
    setFeedbackPhase("reflect");
  }, [question, draft, attempts]);

  const tryAgain = useCallback(() => {
    setDraft(null);
    setFeedbackPhase("answer");
    setShowExplanation(false);
    setShowDemo(false);
  }, []);

  const revealHint = useCallback(() => {
    setHintLevel((h) => h + 1);
  }, []);

  const watchExplanation = useCallback(() => {
    setShowExplanation(true);
  }, []);

  const showInteractiveDemo = useCallback(() => {
    setShowDemo(true);
  }, []);

  const replay = useCallback(() => {
    setDraft(null);
    setFeedbackPhase("answer");
    setShowExplanation(false);
    setShowDemo(false);
    setAttempts(0);
    setHintLevel(0);
  }, []);

  const revealAnswer = useCallback(() => {
    if (!question) return;
    setShowExplanation(true);
    if (question.demoHtml) setShowDemo(true);
    setScores((s) => ({ ...s, [question.id]: false }));
    setFeedbackPhase("revealed");
  }, [question]);

  const continueAfterFeedback = useCallback(() => {
    if (!question) return;
    const shouldAdvance =
      feedbackPhase === "celebrate" ||
      feedbackPhase === "revealed" ||
      (feedbackPhase === "reflect" && showExplanation);

    if (!shouldAdvance) return;

    const questionCorrect = feedbackPhase === "celebrate";
    const nextScores = { ...scores, [question.id]: questionCorrect };

    if (isLast) {
      const score = Object.values(nextScores).filter(Boolean).length;
      const result: LevelQuizResult = {
        score,
        total,
        percent: levelQuizPercent(score, total),
        passed: isLevelQuizPassed(score, total),
      };
      setScores(nextScores);
      setPhase("results");
      onComplete?.(result);
      return;
    }

    setScores(nextScores);
    setIndex((i) => i + 1);
    setDraft(null);
    setAttempts(0);
    setHintLevel(0);
    setShowExplanation(false);
    setShowDemo(false);
    setFeedbackPhase("answer");
  }, [
    question,
    feedbackPhase,
    showExplanation,
    isLast,
    scores,
    total,
    onComplete,
  ]);

  const reset = useCallback(() => {
    setIndex(0);
    setPhase("question");
    setFeedbackPhase("answer");
    setDraft(null);
    setAttempts(0);
    setHintLevel(0);
    setShowExplanation(false);
    setShowDemo(false);
    setScores({});
  }, []);

  const result = useMemo((): LevelQuizResult | null => {
    if (phase !== "results") return null;
    const score = Object.values(scores).filter(Boolean).length;
    return {
      score,
      total,
      percent: levelQuizPercent(score, total),
      passed: isLevelQuizPassed(score, total),
    };
  }, [phase, scores, total]);

  return {
    quiz,
    index,
    question,
    total,
    phase,
    feedbackPhase,
    draft,
    setDraft,
    attempts,
    hintLevel,
    showExplanation,
    showDemo,
    shake,
    correct,
    isLast,
    result,
    submit,
    tryAgain,
    revealHint,
    watchExplanation,
    showInteractiveDemo,
    replay,
    revealAnswer,
    continueAfterFeedback,
    reset,
  };
}
