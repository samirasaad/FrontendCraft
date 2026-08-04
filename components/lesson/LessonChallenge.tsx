"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { LessonChallenge as Challenge } from "@/lib/types";

export function LessonChallenge({
  challenge,
  onAnswered,
}: {
  challenge: Challenge;
  onAnswered?: (correct: boolean) => void;
}) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const correct = selected === challenge.correctId;

  return (
    <section className="rounded-3xl border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-slate-950/50 to-cyan-400/5 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-yellow-100">
        <HelpCircle size={16} className="text-yellow-300" />
        {t("challengeTitle", locale)}
      </div>
      <p className="mb-4 text-[15px] leading-7 text-slate-200">
        <RichText text={loc(challenge.prompt, locale)} />
      </p>

      <div
        className="space-y-2"
        role="radiogroup"
        aria-label={t("challengeTitle", locale)}
      >
        {challenge.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectOption = option.id === challenge.correctId;
          let tone =
            "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/5";
          if (answered && isSelected && correct) {
            tone = "border-emerald-400/45 bg-emerald-400/15";
          } else if (answered && isSelected && !correct) {
            tone = "border-rose-400/45 bg-rose-400/15";
          } else if (answered && isCorrectOption) {
            tone = "border-emerald-400/35 bg-emerald-400/10";
          }

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={answered}
              onClick={() => {
                playClick();
                setSelected(option.id);
                const ok = option.id === challenge.correctId;
                if (ok) playSuccess();
                onAnswered?.(ok);
              }}
              className={`w-full rounded-2xl border px-4 py-3 text-start transition disabled:cursor-default ${tone}`}
            >
              <span className="block text-sm font-semibold text-white">
                <RichText text={loc(option.label, locale)} />
              </span>
              {option.code ? (
                <pre
                  dir="ltr"
                  className="mt-2 overflow-x-auto whitespace-pre-wrap text-start font-mono text-[11px] leading-5 text-cyan-100/85"
                >
                  {option.code}
                </pre>
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 flex items-start gap-2 rounded-2xl border px-3 py-3 text-sm leading-6 ${
              correct
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-50"
                : "border-rose-400/30 bg-rose-400/10 text-rose-50"
            }`}
            role="status"
          >
            {correct ? (
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            ) : (
              <XCircle size={16} className="mt-0.5 shrink-0" />
            )}
            <span>
              <span className="font-semibold">
                {correct
                  ? t("challengeCorrect", locale)
                  : t("challengeWrong", locale)}{" "}
              </span>
              <RichText text={loc(challenge.explanation, locale)} />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
