"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_LOOP_S, LAB_ORBIT_S } from "@/lib/motion-pace";

export function ThisContextVisualizer() {
  const { locale } = useLanguage();
  const label =
    locale === "ar" ? "this → counter (lexical)" : "this → counter (lexical)";

  return (
    <div className="relative mx-auto flex h-52 w-full max-w-sm items-center justify-center">
      <motion.div
        className="absolute h-36 w-36 rounded-full border border-yellow-300/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: LAB_ORBIT_S, ease: "linear" }}
      />
      <motion.div
        className="absolute h-24 w-24 rounded-full border border-dashed border-cyan-300/40"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: LAB_ORBIT_S, ease: "linear" }}
      />
      <div className="z-10 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 backdrop-blur">
        <span className="font-mono text-sm text-yellow-200">counter</span>
        <span className="font-mono text-xs text-slate-400">count: 1</span>
      </div>
      <motion.div
        className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/40"
        animate={{
          x: [60, 0, -60, 0, 60],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{ repeat: Infinity, duration: LAB_LOOP_S, ease: "easeInOut" }}
      >
        <span className="inline-block rtl:rotate-180">→</span>
      </motion.div>
      <p className="absolute bottom-2 text-center text-sm text-slate-300">{label}</p>
    </div>
  );
}
