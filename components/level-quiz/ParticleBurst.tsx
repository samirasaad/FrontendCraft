"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#fde047", "#22d3ee", "#34d399", "#f472b6", "#a78bfa"];

export function ParticleBurst({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: reduce ? 0 : 14 }, (_, i) => ({
        id: i,
        x: (i % 7) * 14 - 40,
        color: COLORS[i % COLORS.length],
        delay: i * 0.03,
      })),
    [reduce],
  );

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
          style={{ backgroundColor: p.color }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.3],
            x: p.x,
            y: -40 - (p.id % 5) * 12,
          }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
