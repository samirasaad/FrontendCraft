"use client";

import { motion } from "framer-motion";

export function Mascot({
  mood,
}: {
  mood: "idle" | "happy" | "sad" | "think";
}) {
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
        mood === "happy"
          ? { y: [0, -6, 0], rotate: [0, -8, 8, 0] }
          : mood === "sad"
            ? { x: [0, -4, 4, -2, 2, 0] }
            : { y: [0, -3, 0] }
      }
      transition={{ duration: mood === "happy" ? 0.6 : 0.45, repeat: mood === "idle" ? Infinity : 0, repeatDelay: 2 }}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 to-violet-400/15 text-2xl shadow-[0_0_24px_rgba(34,211,238,0.2)]"
    >
      {emoji}
    </motion.div>
  );
}
