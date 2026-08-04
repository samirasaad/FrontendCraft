"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_LOOP_S } from "@/lib/motion-pace";

export function ScopeVisualizer() {
  const { locale } = useLanguage();
  const outer = locale === "ar" ? "Outer scope" : "Outer scope";
  const inner = locale === "ar" ? "Function scope" : "Function scope";

  return (
    <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center">
      <div className="absolute inset-4 rounded-3xl border border-white/10 bg-slate-800/60" />
      <p className="absolute start-6 top-6 text-[11px] uppercase tracking-wider text-slate-400">
        {outer}
      </p>
      <motion.span
        className="absolute start-10 top-14 rounded-md bg-yellow-300/20 px-2 py-1 font-mono text-xs text-yellow-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
      >
        globalMsg
      </motion.span>

      <motion.div
        className="relative z-10 flex h-32 w-48 flex-col items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
        animate={{
          boxShadow: [
            "0 0 20px rgba(34,211,238,0.15)",
            "0 0 48px rgba(250,204,21,0.25)",
            "0 0 20px rgba(34,211,238,0.15)",
          ],
        }}
        transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
      >
        <p className="mb-2 text-[10px] uppercase tracking-wider text-cyan-200">{inner}</p>
        <span className="rounded-md bg-cyan-300/20 px-2 py-1 font-mono text-xs text-cyan-100">
          local
        </span>
        <span className="mt-2 rounded-md bg-yellow-300/15 px-2 py-0.5 font-mono text-[10px] text-yellow-100">
          + globalMsg ✓
        </span>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-yellow-300/10 blur-2xl"
        animate={{ x: [-30, 30, -30], y: [-10, 15, -10] }}
        transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
      />
    </div>
  );
}
