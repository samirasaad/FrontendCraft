"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function AsyncAwaitVisualizer() {
  const { locale } = useLanguage();
  const client = locale === "ar" ? "Browser" : "Browser";
  const api = locale === "ar" ? "API" : "API";

  return (
    <div className="relative mx-auto h-44 w-full max-w-md py-2">
      <div className="absolute inset-x-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-300/40 via-cyan-400/60 to-yellow-300/40" />
      <div className="absolute start-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
        <div className="rounded-xl border border-yellow-300/30 bg-yellow-300/10 px-3 py-2 text-xs text-yellow-100">
          {client}
        </div>
        <span className="font-mono text-[10px] text-slate-400">await fetch</span>
      </div>
      <div className="absolute end-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
        <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">
          {api}
        </div>
        <span className="font-mono text-[10px] text-slate-400">JSON</span>
      </div>
      <motion.div
        className="absolute start-[12%] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-cyan-400 text-[10px] font-bold text-slate-950 shadow-lg shadow-cyan-400/40"
        animate={{ x: ["0%", "420%", "0%"] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
      >
        {"{}"}
      </motion.div>
      <motion.p
        className="absolute bottom-1 inset-x-0 text-center text-[11px] text-slate-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        async / await
      </motion.p>
    </div>
  );
}
