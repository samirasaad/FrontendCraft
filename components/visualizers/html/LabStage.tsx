"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Shared stage chrome for HTML Motion labs — atmosphere + consistent framing. */
export function LabStage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-950/90 to-cyan-950/40 p-3 sm:p-4 ${className}`}
    >
      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -start-8 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -end-10 bottom-0 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl"
            animate={{ opacity: [0.25, 0.55, 0.25], x: [0, -8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const labSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

export const labEase = [0.22, 1, 0.36, 1] as const;
