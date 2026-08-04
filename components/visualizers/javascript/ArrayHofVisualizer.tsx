"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_LOOP_S } from "@/lib/motion-pace";

const items = [
  { from: "10", map: "9", keep: false },
  { from: "25", map: "22.5", keep: true },
  { from: "40", map: "36", keep: true },
  { from: "5", map: "4.5", keep: false },
];

export function ArrayHofVisualizer() {
  const { locale } = useLanguage();
  const stages =
    locale === "ar"
      ? ["map", "filter", "reduce → 58.5"]
      : ["map", "filter", "reduce → 58.5"];

  return (
    <div className="space-y-4 py-2">
      <div className="flex justify-between gap-2 text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs">
        {stages.map((stage) => (
          <span key={stage} className="rounded-full bg-white/5 px-2 py-1">
            {stage}
          </span>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <motion.div
          className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
        />
        <div className="relative flex justify-between gap-2">
          {items.map((item, i) => (
            <motion.div
              key={item.from}
              className="flex flex-col items-center gap-2"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="rounded-md bg-slate-800 px-2 py-1 font-mono text-[11px] text-slate-300">
                {item.from}
              </span>
              <motion.span
                className="rounded-md bg-yellow-300/20 px-2 py-1 font-mono text-[11px] text-yellow-200"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: LAB_LOOP_S, delay: i * 0.1 }}
              >
                {item.map}
              </motion.span>
              <motion.span
                className={`rounded-md px-2 py-1 font-mono text-[11px] ${
                  item.keep
                    ? "bg-cyan-400/20 text-cyan-200"
                    : "bg-slate-800/80 text-slate-500 line-through"
                }`}
                animate={item.keep ? { scale: [1, 1.08, 1] } : { opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: LAB_LOOP_S, delay: i * 0.1 }}
              >
                {item.keep ? "✓" : "✕"}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
