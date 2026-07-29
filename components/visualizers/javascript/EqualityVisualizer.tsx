"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function EqualityVisualizer() {
  const { locale } = useLanguage();
  const loose = locale === "ar" ? "Loose ==" : "Loose ==";
  const strict = locale === "ar" ? "Strict ===" : "Strict ===";

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex w-full max-w-md items-end justify-between gap-4">
        <motion.div
          className="flex flex-1 flex-col items-center gap-2"
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        >
          <div className="flex gap-2">
            <span className="rounded-lg bg-amber-400/20 px-3 py-2 font-mono text-amber-200">0</span>
            <span className="rounded-lg bg-rose-400/20 px-3 py-2 font-mono text-rose-200">false</span>
          </div>
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-amber-300 to-rose-300 opacity-70" />
          <p className="text-xs text-slate-400">{loose}</p>
          <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-[11px] text-amber-200">
            true (coerced)
          </span>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col items-center gap-2"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <div className="flex gap-2">
            <span className="rounded-lg bg-cyan-400/20 px-3 py-2 font-mono text-cyan-200">0</span>
            <span className="rounded-lg bg-yellow-300/20 px-3 py-2 font-mono text-yellow-200">false</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-300 text-xs text-cyan-200">
            ✕
          </div>
          <p className="text-xs text-slate-400">{strict}</p>
          <span className="rounded-full bg-cyan-300/20 px-2 py-0.5 text-[11px] text-cyan-200">
            false
          </span>
        </motion.div>
      </div>
    </div>
  );
}
