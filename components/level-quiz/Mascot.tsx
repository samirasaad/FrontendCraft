"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Mascot({
  mood,
}: {
  mood: "idle" | "happy" | "sad" | "think";
}) {
  const reduce = useReducedMotion();
  const emoji =
    mood === "happy"
      ? "🎉"
      : mood === "sad"
        ? "😅"
        : mood === "think"
          ? "🤔"
          : "✨";

  return (
    <motion.div
      aria-hidden
      animate={
        reduce
          ? undefined
          : mood === "happy"
            ? { y: [0, -6, 0], rotate: [0, -8, 8, 0] }
            : mood === "sad"
              ? { x: [0, -4, 4, -2, 2, 0] }
              : mood === "idle"
                ? { y: [0, -3, 0] }
                : undefined
      }
      transition={{
        duration: mood === "happy" ? 0.6 : 0.45,
        repeat: !reduce && mood === "idle" ? Infinity : 0,
        repeatDelay: 2,
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-300/25 bg-sky-400/10 text-lg"
    >
      {emoji}
    </motion.div>
  );
}
