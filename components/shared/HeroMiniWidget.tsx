"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/content/i18n/ui-strings";

const STACK_SEQUENCE = [
  ["script"],
  ["script", "fn()"],
  ["script"],
  [],
] as const;

const QUEUE_SEQUENCE = [
  ["timeout"],
  ["timeout"],
  ["timeout", "promise"],
  ["promise"],
] as const;

export function HeroMiniWidget() {
  const { locale } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((prev) => (prev + 1) % STACK_SEQUENCE.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  const stack = STACK_SEQUENCE[step];
  const queue = QUEUE_SEQUENCE[step];

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 22 }}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/25 bg-slate-950/70 p-4 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:p-5"
      aria-label={t("heroWidgetTitle", locale)}
    >
      <div className="pointer-events-none absolute -end-10 -top-10 h-28 w-28 rounded-full bg-yellow-300/15 blur-2xl" />
      <div className="pointer-events-none absolute -start-8 bottom-0 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />

      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {t("heroWidgetEyebrow", locale)}
          </p>
          <p className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
            {t("heroWidgetTitle", locale)}
          </p>
        </div>
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/40 bg-yellow-300/10 text-[10px] font-bold text-yellow-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          loop
        </motion.div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <div className="rounded-2xl border border-yellow-300/25 bg-yellow-300/5 p-2">
          <p className="mb-2 text-center text-[9px] uppercase tracking-wider text-yellow-200/80">
            Call Stack
          </p>
          <div className="flex h-28 flex-col-reverse justify-start gap-1">
            <AnimatePresence initial={false}>
              {stack.map((frame) => (
                <motion.div
                  key={`${step}-${frame}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="rounded-md bg-yellow-300/20 px-2 py-1.5 text-center font-mono text-[10px] text-yellow-50"
                >
                  {frame}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <motion.span
            className="text-cyan-300"
            animate={{ x: [-3, 3, -3], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            ↔
          </motion.span>
          <span className="text-[9px] text-slate-500">Event Loop</span>
        </div>

        <div className="rounded-2xl border border-cyan-300/25 bg-cyan-400/5 p-2">
          <p className="mb-2 text-center text-[9px] uppercase tracking-wider text-cyan-200/80">
            Task Queue
          </p>
          <div className="flex h-28 flex-col justify-start gap-1">
            <AnimatePresence initial={false}>
              {queue.map((job) => (
                <motion.div
                  key={`${step}-${job}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="rounded-md bg-cyan-400/15 px-2 py-1.5 text-center font-mono text-[10px] text-cyan-50"
                >
                  {job}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
        {t("heroWidgetCaption", locale)}
      </p>
    </motion.aside>
  );
}
