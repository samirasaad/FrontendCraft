"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function PrimitiveVsReferenceVisualizer() {
  const { locale } = useLanguage();
  const copy = locale === "ar" ? "value copy" : "value copy";
  const shared = locale === "ar" ? "shared address" : "shared address";

  return (
    <div className="grid gap-6 py-2 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-yellow-300">
          Primitive
        </p>
        <div className="flex items-center justify-center gap-3">
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-300/20 font-mono text-yellow-200"
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            a:5
          </motion.div>
          <motion.div
            className="h-0.5 w-8 bg-yellow-300/60"
            animate={{ scaleX: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-300/20 font-mono text-yellow-200"
            animate={{ x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            b:9
          </motion.div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">{copy}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-cyan-300">
          Reference
        </p>
        <div className="relative flex flex-col items-center gap-3">
          <div className="flex gap-6">
            <span className="rounded-lg bg-cyan-400/15 px-3 py-2 font-mono text-sm text-cyan-200">
              user1
            </span>
            <span className="rounded-lg bg-cyan-400/15 px-3 py-2 font-mono text-sm text-cyan-200">
              user2
            </span>
          </div>
          <motion.div
            className="h-8 w-px bg-cyan-400/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          <motion.div
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 font-mono text-sm text-cyan-100"
            animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.35)", "0 0 0 rgba(34,211,238,0)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {"{ name: \"Omar\" }"}
          </motion.div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">{shared}</p>
      </div>
    </div>
  );
}
