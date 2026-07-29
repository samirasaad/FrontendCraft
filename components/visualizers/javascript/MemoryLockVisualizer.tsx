"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function MemoryLockVisualizer() {
  const { locale } = useLanguage();
  const labels =
    locale === "ar"
      ? { var: "var (open)", let: "let (mutable)", const: "const (locked)" }
      : { var: "var (open)", let: "let (mutable)", const: "const (locked)" };

  return (
    <div className="flex flex-wrap items-end justify-center gap-4 py-4 sm:gap-6">
      {[
        { key: "var", color: "from-amber-400/30 to-amber-500/10", lock: false, bounce: true },
        { key: "let", color: "from-cyan-400/30 to-cyan-500/10", lock: false, bounce: true },
        { key: "const", color: "from-yellow-300/40 to-yellow-500/10", lock: true, bounce: false },
      ].map((box, i) => (
        <motion.div
          key={box.key}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 220 }}
          className="flex w-28 flex-col items-center gap-2 sm:w-32"
        >
          <motion.div
            className={`relative flex h-24 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b ${box.color} backdrop-blur-md`}
            animate={
              box.bounce
                ? { y: [0, -6, 0], boxShadow: ["0 0 0 rgba(250,204,21,0)", "0 0 24px rgba(34,211,238,0.25)", "0 0 0 rgba(250,204,21,0)"] }
                : { scale: [1, 1.02, 1] }
            }
            transition={{ repeat: Infinity, duration: box.bounce ? 2.2 : 2.8, delay: i * 0.2 }}
          >
            <span className="font-mono text-sm font-semibold text-yellow-200">
              {box.key === "const" ? "PI" : box.key === "let" ? "score" : "x"}
            </span>
            {box.lock && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
                transition={{ delay: 0.6, repeat: Infinity, repeatDelay: 2.4 }}
                className="absolute -top-3 right-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-slate-900"
              >
                🔒
              </motion.span>
            )}
          </motion.div>
          <p className="text-center text-[11px] text-slate-300">
            {labels[box.key as keyof typeof labels]}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
