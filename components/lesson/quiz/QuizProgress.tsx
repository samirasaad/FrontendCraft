"use client";

import { motion } from "framer-motion";

export function QuizProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold uppercase tracking-[0.16em] text-cyan-300/90">
          {label}
        </span>
        <span className="font-mono text-slate-500" dir="ltr">
          {current}/{total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10 rtl:rotate-180">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        />
      </div>
    </div>
  );
}
