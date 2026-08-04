"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PlayPauseButton } from "@/components/shared/PlayPauseButton";
import { LAB_LOOP_S } from "@/lib/motion-pace";

/** Shared stage chrome for HTML Motion labs — atmosphere + consistent framing. */
export function LabStage({
  children,
  className = "",
  /** When set with `onTogglePlay`, shows a Play/Pause control. */
  playing,
  onTogglePlay,
}: {
  children: ReactNode;
  className?: string;
  playing?: boolean;
  onTogglePlay?: () => void;
}) {
  const reduce = useReducedMotion();
  const timed = typeof playing === "boolean" && typeof onTogglePlay === "function";

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-950/90 to-cyan-950/40 p-3 sm:p-4 ${
        timed ? "pt-10 sm:pt-10" : ""
      } ${className}`}
    >
      {timed ? (
        <div className="absolute end-2.5 top-2.5 z-20">
          <PlayPauseButton
            playing={playing}
            onToggle={onTogglePlay}
            compact
          />
        </div>
      ) : null}
      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -start-8 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -end-10 bottom-0 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl"
            animate={{ opacity: [0.25, 0.55, 0.25], x: [0, -8, 0] }}
            transition={{
              duration: LAB_LOOP_S,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : null}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}

export const labSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

export const labEase = [0.22, 1, 0.36, 1] as const;

/** Readable step / status hint under lab chrome. */
export const labTipClass =
  "mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300";

export const labTipInlineClass =
  "text-sm leading-relaxed text-slate-300";

/** Fixed viewport for every motion lab — height does not grow with steps. */
export const LAB_FRAME_CLASS =
  "h-[22rem] w-full overflow-hidden sm:h-[26rem]";
