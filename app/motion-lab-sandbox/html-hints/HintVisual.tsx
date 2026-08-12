"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { HintLivePreview } from "./HintLivePreview";

export function HintVisual({
  code,
  visual,
  beatId,
  ar,
  compact = false,
}: {
  /** HTML from the code strip — preview must match this */
  code: string;
  visual: string;
  beatId: string;
  ar: boolean;
  compact?: boolean;
}) {
  const glow = visual === "glow";
  const bad = isBadVisual(visual) || beatId === "hook";
  const right = (beatId === "fix" || beatId === "done") && !isBadVisual(visual);

  return (
    <PhoneFrame compact={compact} wrong={bad} right={right}>
      <div className={`flex min-h-0 flex-1 flex-col ${compact ? "p-2" : "p-3"}`}>
        <motion.div
          layout
          animate={
            glow
              ? { scale: [1, 1.02, 1] }
              : bad
                ? { x: [0, -5, 5, -4, 4, 0] }
                : { scale: 1 }
          }
          transition={
            glow
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : bad
                ? { duration: 0.55, repeat: Infinity, repeatDelay: 0.65, ease: "easeInOut" }
                : { duration: 0.55, ease: "easeInOut" }
          }
          className="flex min-h-0 flex-1 flex-col"
        >
          <HintLivePreview code={code} bad={bad} good={right || glow} compact={compact} />
        </motion.div>
      </div>
      <StatusPill beatId={beatId} ar={ar} compact={compact} />
    </PhoneFrame>
  );
}

function isBadVisual(visual: string): boolean {
  return [
    "broken",
    "quirks",
    "garbled",
    "dead-link",
    "divs",
    "fake-list",
    "lonely-input",
    "multi-h1",
    "no-lang",
    "wrong-btn",
  ].includes(visual);
}

function StatusPill({
  beatId,
  ar,
  compact = false,
}: {
  beatId: string;
  ar: boolean;
  compact?: boolean;
}) {
  const phase =
    beatId === "hook" ? "problem" : beatId === "fix" ? "action" : "done";

  const label =
    phase === "problem" ? (ar ? "غلط" : "Wrong") : ar ? "صح" : "Right";

  if (phase === "problem") {
    return (
      <Pill tone="problem" compact={compact} className="hint-status--wrong">
        <X size={compact ? 14 : 16} strokeWidth={3} />
        <span>{label}</span>
      </Pill>
    );
  }

  return (
    <Pill tone="done" compact={compact} className="hint-status--right">
      <Check size={compact ? 14 : 16} strokeWidth={3} />
      <span>{label}</span>
    </Pill>
  );
}

function Pill({
  children,
  tone,
  compact = false,
  className = "",
}: {
  children: ReactNode;
  tone: "problem" | "action" | "done";
  compact?: boolean;
  className?: string;
}) {
  const styles = {
    problem: "bg-red-200 text-red-950",
    action: "bg-emerald-200 text-emerald-950",
    done: "bg-emerald-200 text-emerald-950",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full items-center justify-center gap-1.5 font-black uppercase tracking-wide ${
        tone === "problem"
          ? "border-t-[3px] border-red-600"
          : "border-t-[3px] border-emerald-600"
      } ${compact ? "px-2 py-1.5 text-[11px]" : "px-3 py-2 text-xs"} ${styles[tone]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PhoneFrame({
  children,
  compact = false,
  wrong = false,
  right = false,
}: {
  children: ReactNode;
  compact?: boolean;
  wrong?: boolean;
  right?: boolean;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden border-2 bg-slate-900 shadow-[0_20px_48px_rgba(0,0,0,0.5)] ${
        wrong
          ? "border-red-600 shadow-[0_0_28px_rgba(220,38,38,0.35)]"
          : right
            ? "border-emerald-600 shadow-[0_0_28px_rgba(22,163,74,0.35)]"
            : "border-cyan-400 shadow-[0_0_32px_rgba(34,211,238,0.2)]"
      } ${compact ? "max-w-[12.5rem] rounded-[1.25rem]" : "max-w-[15.5rem] rounded-[1.6rem]"}`}
    >
      <div
        className={`flex shrink-0 justify-center border-b bg-slate-950 ${
          wrong ? "border-red-600/50" : right ? "border-emerald-600/50" : "border-cyan-500/40"
        } ${compact ? "py-1" : "py-1.5"}`}
      >
        <span
          className={`rounded-full ${
            wrong
              ? "bg-red-500"
              : right
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-yellow-300 to-cyan-300"
          } ${compact ? "h-1 w-8" : "h-1.5 w-10"}`}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col bg-white [color-scheme:light]">{children}</div>
    </div>
  );
}
