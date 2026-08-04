"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { QuizOptionLetter } from "@/components/lesson/quiz/QuizCodeSnippet";
import { RichText } from "@/components/shared/RichText";

const LETTERS = ["A", "B", "C", "D"] as const;

export function QuizOptionCard({
  index,
  label,
  selected,
  answered,
  isCorrectOption,
  isWrongSelection,
  disabled,
  onSelect,
}: {
  index: number;
  label: string;
  selected: boolean;
  answered: boolean;
  isCorrectOption: boolean;
  isWrongSelection: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  let tone =
    "border-white/12 bg-slate-950/55 hover:border-cyan-300/35 hover:bg-cyan-400/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]";
  let glow = "";

  if (answered && isCorrectOption) {
    tone =
      "border-emerald-400/55 bg-emerald-400/15 shadow-[0_0_24px_rgba(52,211,153,0.22)]";
    glow = "ring-1 ring-emerald-300/40";
  } else if (answered && isWrongSelection) {
    tone =
      "border-rose-400/50 bg-rose-400/12 shadow-[0_0_18px_rgba(251,113,133,0.18)]";
    glow = "ring-1 ring-rose-300/30";
  } else if (answered) {
    tone = "border-white/8 bg-slate-950/40 opacity-55";
  } else if (selected) {
    tone =
      "border-cyan-300/45 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,211,238,0.15)]";
  }

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      onClick={onSelect}
      className={`group relative flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-start transition disabled:cursor-default ${tone} ${glow}`}
    >
      <QuizOptionLetter>{LETTERS[index] ?? index + 1}</QuizOptionLetter>
      <span className="min-w-0 flex-1 pt-0.5 text-sm font-medium leading-relaxed text-slate-100 sm:text-[15px]">
        <RichText text={label} />
      </span>
      {answered && isCorrectOption ? (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
          <Check size={14} strokeWidth={2.5} />
        </span>
      ) : null}
      {answered && isWrongSelection ? (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-400/20 text-rose-300">
          <X size={14} strokeWidth={2.5} />
        </span>
      ) : null}
    </motion.button>
  );
}
