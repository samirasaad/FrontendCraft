"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Square,
  TreePine,
} from "lucide-react";
import { LabStage } from "@/components/visualizers/html/LabStage";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { LAB_STEP_MS } from "@/lib/motion-pace";
import { RTL_FLIP } from "@/lib/rtl";

type NodeKind = "doctype" | "element" | "text";

interface TreeNode {
  id: string;
  kind: NodeKind;
  label: string;
  role?: string;
  children?: TreeNode[];
}

const SAMPLE_TREE: TreeNode = {
  id: "root",
  kind: "doctype",
  label: "<!DOCTYPE html>",
  children: [
    {
      id: "html",
      kind: "element",
      label: 'html lang="en"',
      role: "document",
      children: [
        {
          id: "head",
          kind: "element",
          label: "head",
          role: "none",
          children: [
            {
              id: "title",
              kind: "element",
              label: "title",
              role: "document title",
              children: [
                {
                  id: "title-text",
                  kind: "text",
                  label: '"FrontendCraft"',
                  role: "name",
                },
              ],
            },
          ],
        },
        {
          id: "body",
          kind: "element",
          label: "body",
          role: "document body",
          children: [
            {
              id: "nav",
              kind: "element",
              label: "nav",
              role: "navigation",
              children: [
                {
                  id: "nav-text",
                  kind: "text",
                  label: '"Primary"',
                  role: "link name",
                },
              ],
            },
            {
              id: "main",
              kind: "element",
              label: "main",
              role: "main",
              children: [
                {
                  id: "h1",
                  kind: "element",
                  label: "h1",
                  role: "heading level 1",
                  children: [
                    {
                      id: "h1-text",
                      kind: "text",
                      label: '"Document Anatomy"',
                      role: "name",
                    },
                  ],
                },
                {
                  id: "img",
                  kind: "element",
                  label: 'img alt="Chart"',
                  role: "img",
                },
              ],
            },
            {
              id: "footer",
              kind: "element",
              label: "footer",
              role: "contentinfo",
              children: [
                {
                  id: "foot-text",
                  kind: "text",
                  label: '"© FrontendCraft"',
                  role: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function flatten(
  node: TreeNode,
  depth = 0,
): { node: TreeNode; depth: number }[] {
  const row = [{ node, depth }];
  for (const child of node.children ?? []) {
    row.push(...flatten(child, depth + 1));
  }
  return row;
}

const controlBtn =
  "inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5";

export function DomTreeEngine() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [screenReader, setScreenReader] = useState(false);
  /** Bumped to cancel any in-flight play timeout (Stop/Pause race). */
  const playGen = useRef(0);

  const rows = useMemo(() => flatten(SAMPLE_TREE), []);
  const maxStep = Math.max(0, rows.length - 1);
  const finished = step >= maxStep && rows.length > 0;
  const current = rows[step]?.node;

  function cancelPlayback() {
    playGen.current += 1;
    setPlaying(false);
  }

  useEffect(() => {
    if (!playing) return;
    if (step >= maxStep) {
      playGen.current += 1;
      setPlaying(false);
      return;
    }
    const gen = playGen.current;
    const id = window.setTimeout(() => {
      if (playGen.current !== gen) return;
      setStep((s) => Math.min(s + 1, maxStep));
    }, LAB_STEP_MS);
    return () => {
      window.clearTimeout(id);
    };
  }, [playing, step, maxStep]);

  function handlePlayPause() {
    playClick();
    if (playing) {
      cancelPlayback();
      return;
    }
    // Finished / stopped on full tree: start the reveal again.
    if (finished) {
      playGen.current += 1;
      setStep(0);
    }
    setPlaying(true);
  }

  function handleStop() {
    playClick();
    // Halt the reveal here — keep nodes painted so far, don't reset or jump ahead.
    playGen.current += 1;
    setPlaying(false);
  }

  function handleStep() {
    playClick();
    cancelPlayback();
    setStep((s) => {
      if (s >= maxStep) return s;
      return Math.min(s + 1, maxStep);
    });
  }

  const playLabel = playing
    ? t("simPause", locale)
    : finished
      ? t("simReplay", locale)
      : t("simPlay", locale);

  const status = (() => {
    if (playing) {
      return loc(
        {
          en: `Revealing ${current?.label ?? "node"} — walking Parent → Child → Text.`,
          ar: `بيظهر ${current?.label ?? "node"} — بيمشي Parent → Child → Text.`,
        },
        locale,
      );
    }
    if (finished) {
      return loc(
        {
          en: "Full tree revealed. Replay to watch Parent → Child → Text again.",
          ar: "الشجرة كاملة ظاهرة. Replay عشان تشوف Parent → Child → Text تاني.",
        },
        locale,
      );
    }
    if (step === 0) {
      return loc(
        {
          en: `Stopped on ${current?.label ?? "node"}. Play or Step to continue painting.`,
          ar: `Stopped على ${current?.label ?? "node"}. Play أو Step عشان تكمل الرسم.`,
        },
        locale,
      );
    }
    return loc(
      {
        en: `Stopped on ${current?.label ?? "node"} — painting paused here. Play to continue.`,
        ar: `Stopped على ${current?.label ?? "node"} — الرسم واقف هنا. Play عشان تكمل.`,
      },
      locale,
    );
  })();

  return (
    <LabStage className="space-y-3 !border-orange-400/25">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-100">
          <TreePine size={14} className="text-orange-300" />
          {t("domTreeTitle", locale)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={handlePlayPause}
            className={controlBtn}
            aria-label={playLabel}
            aria-pressed={playing}
          >
            {playing ? (
              <Pause size={12} />
            ) : finished ? (
              <RotateCcw size={12} />
            ) : (
              <Play size={12} />
            )}
            {playLabel}
          </button>
          <button
            type="button"
            onClick={handleStop}
            disabled={!playing}
            className={controlBtn}
            aria-label={t("simStop", locale)}
          >
            <Square size={11} fill="currentColor" />
            {t("simStop", locale)}
          </button>
          <button
            type="button"
            onClick={handleStep}
            disabled={finished}
            className={controlBtn}
            aria-label={t("simStep", locale)}
          >
            <SkipForward size={12} className={RTL_FLIP} />
            {t("simStep", locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setScreenReader((v) => !v);
            }}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
              screenReader
                ? "border-sky-400/40 bg-sky-400/20 text-sky-50"
                : "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
            }`}
            aria-pressed={screenReader}
          >
            <Accessibility size={12} />
            {t("simScreenReader", locale)}
          </button>
        </div>
      </div>

      <p
        className="min-h-11 text-sm leading-relaxed text-slate-300"
        aria-live="polite"
      >
        {status}
      </p>

      {/* Full-tree height from the start — every node keeps its slot; paint fades in. */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-3">
        <div className="space-y-0.5">
          {rows.map((row, index) => {
            const revealed = index <= step;
            const { node, depth } = row;
            const isText = node.kind === "text";
            const isDoctype = node.kind === "doctype";
            const isLatest = revealed && index === step;
            return (
              <motion.div
                key={node.id}
                aria-hidden={!revealed}
                initial={false}
                animate={{
                  opacity: revealed ? 1 : 0,
                  filter:
                    isLatest && !reduce ? "brightness(1.15)" : "brightness(1)",
                }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative"
                style={{ marginInlineStart: depth * 16 }}
              >
                {depth > 0 ? (
                  <span
                    aria-hidden
                    className={`absolute -start-2.5 top-1/2 h-px w-2.5 bg-orange-300/45 ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null}
                <div
                  className={`mb-1 inline-flex min-h-[28px] max-w-full flex-wrap items-center gap-1.5 rounded-xl border px-2 py-1 font-mono text-[11px] transition-shadow ${
                    isDoctype
                      ? "border-yellow-300/40 bg-yellow-300/10 text-yellow-100"
                      : isText
                        ? "border-white/10 bg-slate-950/50 text-slate-300"
                        : "border-orange-400/35 bg-orange-400/10 text-orange-50"
                  } ${
                    isLatest ? "shadow-[0_0_16px_rgba(251,146,60,0.28)]" : ""
                  }`}
                >
                  <span className="font-semibold">{node.label}</span>
                  {/* Reserve SR badge width so toggling SR doesn't resize the card. */}
                  <span
                    className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                      screenReader && node.role
                        ? "border-sky-400/30 bg-sky-400/15 text-sky-100"
                        : "invisible border-transparent"
                    }`}
                  >
                    SR: {node.role ?? "none"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </LabStage>
  );
}
