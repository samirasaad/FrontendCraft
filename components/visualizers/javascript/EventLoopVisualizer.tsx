"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_LOOP_S, LAB_ORBIT_S } from "@/lib/motion-pace";

const stackFrames = ["D", "A"];
const queue = ["B micro", "C macro"];

export function EventLoopVisualizer() {
  const { locale } = useLanguage();
  const stackLabel = locale === "ar" ? "Call Stack" : "Call Stack";
  const queueLabel = locale === "ar" ? "Task Queue" : "Task Queue";
  const loopLabel = locale === "ar" ? "Event Loop" : "Event Loop";

  return (
    <div className="grid gap-4 py-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-center text-[10px] uppercase tracking-wider text-yellow-300">
          {stackLabel}
        </p>
        <div className="mx-auto flex w-28 flex-col-reverse gap-1">
          {stackFrames.map((frame, i) => (
            <motion.div
              key={frame}
              className="rounded-md bg-yellow-300/20 px-2 py-2 text-center font-mono text-xs text-yellow-100"
              animate={{ y: [4, 0, 4], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: LAB_LOOP_S, delay: i * 0.2 }}
            >
              {frame}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/10 text-[10px] text-cyan-100"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: LAB_ORBIT_S, ease: "linear" }}
        >
          {loopLabel}
        </motion.div>
        <motion.span
          className="text-cyan-300"
          animate={{ x: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: LAB_LOOP_S }}
        >
          ↔
        </motion.span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-center text-[10px] uppercase tracking-wider text-cyan-300">
          {queueLabel}
        </p>
        <div className="flex flex-col gap-1">
          {queue.map((job, i) => (
            <motion.div
              key={job}
              className="rounded-md bg-cyan-400/15 px-2 py-2 text-center font-mono text-[11px] text-cyan-100"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: LAB_LOOP_S, delay: i * 0.25 }}
            >
              {job}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
