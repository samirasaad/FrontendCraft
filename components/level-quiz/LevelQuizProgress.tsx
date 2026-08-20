"use client";

import { motion } from "framer-motion";

export function LevelQuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / Math.max(total, 1)) * 100);

  return (
    <div
      className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <motion.div
      className="absolute inset-y-0 start-0 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
