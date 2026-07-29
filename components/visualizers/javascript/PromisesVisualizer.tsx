"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const states = ["pending", "fulfilled", "rejected"] as const;

export function PromisesVisualizer() {
  const { locale } = useLanguage();
  const waiter = locale === "ar" ? "order waiter" : "order waiter";

  return (
    <div className="space-y-5 py-2">
      <div className="flex items-center justify-center gap-3">
        <motion.div
          className="rounded-full bg-yellow-300/20 px-3 py-1 text-xs text-yellow-200"
          animate={{ x: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🍽️ {waiter}
        </motion.div>
        <motion.div
          className="h-px w-16 bg-gradient-to-r from-yellow-300/20 via-cyan-300 to-yellow-300/20"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span className="text-2xl">🍕</span>
      </div>
      <div className="flex justify-center gap-2 sm:gap-4">
        {states.map((state, i) => (
          <motion.div
            key={state}
            className={`rounded-xl border px-3 py-3 text-center sm:px-4 ${
              state === "pending"
                ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
                : state === "fulfilled"
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                  : "border-rose-300/30 bg-rose-300/10 text-rose-200"
            }`}
            animate={{
              opacity: state === "rejected" ? [0.4, 0.7, 0.4] : [0.7, 1, 0.7],
              y: [0, -4, 0],
            }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.25 }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase">{state}</p>
            <p className="mt-1 text-[10px] opacity-70">
              {state === "pending" ? "…" : state === "fulfilled" ? "✓" : "✕"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
