"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PlayPauseButton } from "@/components/shared/PlayPauseButton";
import { LAB_LOOP_S } from "@/lib/motion-pace";

/**
 * Shared stage chrome for Motion labs — atmosphere, play/pause, caption,
 * and a fixed tall frame that fits the full visualization without scrolling.
 */
export function LabStage({
  children,
  className = "",
  /** When set with `onTogglePlay`, shows a Play/Pause control. */
  playing,
  onTogglePlay,
  /** Super-descriptive status line for the current step. */
  caption,
  /** Optional short lab title above the caption. */
  title,
}: {
  children: ReactNode;
  className?: string;
  playing?: boolean;
  onTogglePlay?: () => void;
  caption?: ReactNode;
  title?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const timed =
    typeof playing === "boolean" && typeof onTogglePlay === "function";
  const hasChrome = timed || caption != null || title != null;

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-950/90 to-cyan-950/40 p-3 sm:p-4 ${className}`}
    >
      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -start-8 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
            transition={{
              duration: LAB_LOOP_S,
              repeat: Infinity,
              ease: "easeInOut",
            }}
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

      {hasChrome ? (
        <div className="relative z-20 mb-2.5 flex shrink-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {title ? (
              <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
                {title}
              </div>
            ) : null}
            {caption != null ? (
              <div
                className="text-sm leading-snug text-slate-200 sm:text-[15px]"
                role="status"
                aria-live="polite"
              >
                {caption}
              </div>
            ) : null}
          </div>
          {timed ? (
            <PlayPauseButton
              playing={playing}
              onToggle={onTogglePlay}
              compact
              className="shrink-0"
            />
          ) : null}
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
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

/** Readable step / status hint (legacy — prefer LabStage `caption`). */
export const labTipClass =
  "mb-2 shrink-0 text-sm leading-snug text-slate-200";

export const labTipInlineClass = "text-sm leading-snug text-slate-300";

/**
 * Tall fixed viewport for every motion lab — holds the complete visualization
 * without growing or scrolling inside the frame.
 */
export const LAB_FRAME_CLASS =
  "h-[min(36rem,calc(100dvh-12rem))] min-h-[18rem] w-full overflow-hidden sm:min-h-[26rem] md:min-h-[32rem]";
