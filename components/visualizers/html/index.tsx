"use client";

import { motion } from "framer-motion";

export function DocumentTreeVisualizer() {
  const layers = ["<!DOCTYPE html>", "<html>", "<head> / <body>", "content"];
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      {layers.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="w-full max-w-xs rounded-xl border border-orange-300/30 bg-orange-400/10 px-3 py-2 text-center font-mono text-xs text-orange-100"
          style={{ width: `${100 - i * 8}%` }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

export function SemanticBlocksVisualizer() {
  const blocks = ["header", "nav", "main", "article", "footer"];
  return (
    <div className="grid gap-2 py-2">
      {blocks.map((block, i) => (
        <motion.div
          key={block}
          animate={{ opacity: [0.5, 1, 0.5], x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.15 }}
          className={`rounded-xl border border-amber-300/25 bg-amber-400/10 px-3 py-2 font-mono text-xs text-amber-100 ${
            block === "article" ? "ms-6" : ""
          }`}
        >
          &lt;{block}&gt;
        </motion.div>
      ))}
    </div>
  );
}

export function HeadingLadderVisualizer() {
  return (
    <div className="flex flex-col gap-2 py-3">
      {["h1", "h2", "h3", "h4"].map((tag, i) => (
        <motion.div
          key={tag}
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.12 }}
          className="rounded-lg bg-orange-400/15 px-3 py-2 font-mono text-orange-100"
          style={{ marginInlineStart: i * 16, fontSize: `${18 - i * 2}px` }}
        >
          &lt;{tag}&gt;
        </motion.div>
      ))}
    </div>
  );
}

export function LinkImageVisualizer() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.div
        className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs text-cyan-100"
        animate={{ x: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        &lt;a href&gt; →
      </motion.div>
      <motion.div
        className="flex h-20 w-36 flex-col justify-end rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-400/30 to-amber-500/10 p-2"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <span className="text-[10px] text-orange-50">alt=&quot;…&quot;</span>
      </motion.div>
    </div>
  );
}

export function ListStackVisualizer() {
  const kinds = [
    { label: "ul", items: ["• A", "• B"] },
    { label: "ol", items: ["1. A", "2. B"] },
    { label: "dl", items: ["dt", "dd"] },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      {kinds.map((kind, i) => (
        <motion.div
          key={kind.label}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.15 }}
          className="rounded-xl border border-white/10 bg-white/5 p-2"
        >
          <p className="mb-2 text-center font-mono text-[10px] text-orange-200">
            &lt;{kind.label}&gt;
          </p>
          {kind.items.map((item) => (
            <div
              key={item}
              className="mb-1 rounded-md bg-orange-400/15 px-2 py-1 font-mono text-[10px] text-orange-50"
            >
              {item}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function FormFlowVisualizer() {
  return (
    <div className="space-y-3 py-3">
      {["email", "password"].map((field, i) => (
        <motion.div
          key={field}
          className="rounded-xl border border-orange-300/30 bg-orange-400/10 px-3 py-2"
          animate={{ boxShadow: ["0 0 0 rgba(251,146,60,0)", "0 0 16px rgba(251,146,60,0.35)", "0 0 0 rgba(251,146,60,0)"] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
        >
          <p className="text-[10px] text-orange-200/80">label → input[{field}]</p>
          <div className="mt-1 h-2 rounded bg-orange-200/30" />
        </motion.div>
      ))}
      <motion.div
        className="rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-4 py-2 text-center text-xs font-bold text-slate-950"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        submit →
      </motion.div>
    </div>
  );
}

export function TableGridVisualizer() {
  return (
    <div className="overflow-hidden rounded-xl border border-orange-300/30 py-2">
      <div className="grid grid-cols-2 bg-orange-400/20 text-center font-mono text-[10px] text-orange-50">
        <span className="border-e border-b border-orange-300/20 p-2">th</span>
        <span className="border-b border-orange-300/20 p-2">th</span>
      </div>
      {[0, 1].map((row) => (
        <motion.div
          key={row}
          className="grid grid-cols-2 text-center font-mono text-[10px] text-orange-100/90"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ repeat: Infinity, duration: 2, delay: row * 0.2 }}
        >
          <span className="border-e border-b border-orange-300/15 p-2">td</span>
          <span className="border-b border-orange-300/15 p-2">td</span>
        </motion.div>
      ))}
    </div>
  );
}

export function A11yCheckVisualizer() {
  const checks = ["keyboard", "label", "alt", "focus"];
  return (
    <div className="grid grid-cols-2 gap-2 py-3">
      {checks.map((check, i) => (
        <motion.div
          key={check}
          className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-3 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
        >
          <p className="text-emerald-300">✓</p>
          <p className="font-mono text-[10px] text-emerald-100">{check}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function MetaCardVisualizer() {
  return (
    <div className="space-y-3 py-3">
      <motion.div
        className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-[10px] text-slate-500">browser tab</p>
        <p className="font-mono text-xs text-orange-100">&lt;title&gt;…&lt;/title&gt;</p>
      </motion.div>
      <motion.div
        className="rounded-xl border border-orange-300/30 bg-orange-400/10 p-3"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <p className="text-[10px] uppercase tracking-wider text-orange-200/70">share card</p>
        <p className="mt-1 text-sm text-orange-50">meta description</p>
      </motion.div>
    </div>
  );
}

export function MediaStageVisualizer() {
  return (
    <div className="flex flex-col items-center gap-3 py-3">
      <motion.div
        className="flex h-24 w-full max-w-xs items-center justify-center rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-400/20 to-slate-900"
        animate={{ boxShadow: ["0 0 0 rgba(251,146,60,0)", "0 0 24px rgba(251,146,60,0.35)", "0 0 0 rgba(251,146,60,0)"] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <span className="rounded-full bg-orange-300 px-3 py-1 text-xs font-bold text-slate-950">
          ▶ video
        </span>
      </motion.div>
      <motion.div
        className="w-full max-w-xs rounded-xl border border-dashed border-amber-300/40 px-3 py-2 text-center font-mono text-[11px] text-amber-100"
        animate={{ x: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        iframe embed
      </motion.div>
    </div>
  );
}
