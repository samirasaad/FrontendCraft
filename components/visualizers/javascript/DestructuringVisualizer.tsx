"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_LOOP_S } from "@/lib/motion-pace";

const trays = [
  { key: "name", value: "Nour" },
  { key: "job", value: "dev" },
  { key: "city", value: "Cairo" },
];

export function DestructuringVisualizer() {
  const { locale } = useLanguage();
  const gift = locale === "ar" ? "user object" : "user object";
  const unpack = locale === "ar" ? "unpacking…" : "unpacking…";

  return (
    <div className="flex flex-col items-center gap-5 py-3">
      <motion.div
        className="relative flex h-24 w-28 items-center justify-center rounded-2xl border border-yellow-300/40 bg-gradient-to-br from-yellow-300/30 to-amber-500/10"
        animate={{ rotate: [0, -3, 3, 0], y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
      >
        <span className="text-3xl">🎁</span>
        <span className="absolute -bottom-2 rounded-full bg-slate-900 px-2 text-[10px] text-yellow-200">
          {gift}
        </span>
      </motion.div>
      <p className="text-sm text-slate-300">{unpack}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {trays.map((tray, i) => (
          <motion.div
            key={tray.key}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
            className="min-w-[88px] rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-center"
          >
            <p className="font-mono text-[10px] text-cyan-300">{tray.key}</p>
            <p className="font-mono text-sm text-yellow-100">{tray.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
