"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ActivityOptionLetter } from "@/components/lesson/lesson-activity/LessonActivityCodeSnippet";
import { RichText } from "@/components/shared/RichText";

const LETTERS = ["A", "B", "C", "D"] as const;

export function LessonActivityOptionCard({
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
    "border-white/12 bg-slate-950/55 hover:border-sky-300/40 hover:bg-sky-400/5";
  let glow = "";
  let letterTone: "idle" | "selected" | "correct" | "wrong" = "idle";

  if (answered && isCorrectOption) {
    tone =
      "border-emerald-400/60 bg-emerald-400/15 shadow-[0_0_28px_rgba(52,211,153,0.22)]";
    glow = "ring-2 ring-emerald-300/35";
    letterTone = "correct";
  } else if (answered && isWrongSelection) {
    tone =
      "border-rose-400/55 bg-rose-400/12 shadow-[0_0_22px_rgba(251,113,133,0.2)]";
    glow = "ring-2 ring-rose-300/30";
    letterTone = "wrong";
  } else if (answered) {
    tone = "border-white/8 bg-slate-950/40 opacity-50";
  } else if (selected) {
    tone =
      "border-sky-300/70 bg-sky-400/15 shadow-[0_0_28px_rgba(56,189,248,0.28)] scale-[1.01]";
    glow = "ring-2 ring-sky-300/45";
    letterTone = "selected";
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
      className={`group relative flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3.5 text-start transition disabled:cursor-default ${tone} ${glow}`}
    >
      {selected && !answered ? (
        <span
          aria-hidden
          className="absolute inset-y-2 start-0 w-1 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        />
      ) : null}
      <ActivityOptionLetter tone={letterTone}>
        {LETTERS[index] ?? index + 1}
      </ActivityOptionLetter>
      <span
        className={`min-w-0 flex-1 pt-0.5 text-base font-medium leading-snug ${
          selected && !answered ? "text-white" : "text-slate-100"
        }`}
      >
        <RichText text={label} />
      </span>
      {selected && !answered ? (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-300/40 bg-sky-400/20 text-sky-100">
          <Check size={14} strokeWidth={2.5} />
        </span>
      ) : null}
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
