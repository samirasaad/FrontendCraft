"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#fde047", "#22d3ee", "#34d399", "#f472b6", "#a78bfa", "#fb923c"];

export function ConfettiBurst({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: reduce ? 0 : 24 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 11) % 92)}%`,
        delay: (i % 8) * 0.04,
        color: COLORS[i % COLORS.length],
        size: 5 + (i % 3) * 2,
      })),
    [reduce],
  );

  if (!active || !pieces.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 180 }}
          transition={{ duration: 2.6, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
