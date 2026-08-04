"use client";

import type { ReactNode } from "react";

function Frame({
  file,
  accent,
  children,
  muted,
}: {
  file: string;
  accent: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-slate-950/90 ${
        muted
          ? "border-white/8 opacity-70"
          : "border-white/12 shadow-lg shadow-black/20"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -end-8 -top-10 h-36 w-36 rounded-full blur-3xl ${accent}`}
      />
      <div className="relative flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-300/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ms-2 font-mono text-[11px] text-slate-500">{file}</span>
      </div>
      <div className="relative p-4 sm:p-5">{children}</div>
    </div>
  );
}

function HtmlVisual({ muted }: { muted?: boolean }) {
  return (
    <Frame file="index.html" accent="bg-orange-400/20" muted={muted}>
      <div className="grid min-h-[200px] gap-4 sm:grid-cols-2 sm:items-stretch">
        <div className="flex flex-col justify-center gap-2.5 font-mono text-[13px]">
          {[
            { tag: "h2", role: "heading" },
            { tag: "p", role: "text" },
            { tag: "button", role: "control" },
          ].map((row) => (
            <div
              key={row.tag}
              className="flex items-center gap-2 rounded-xl border border-dashed border-orange-300/40 bg-orange-400/[0.07] px-3.5 py-3"
            >
              <span className="text-orange-300">&lt;{row.tag}&gt;</span>
              <span className="ms-auto text-[10px] uppercase tracking-wider text-slate-500">
                {row.role}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Browser reads meaning
          </p>
          <div className="mt-4 space-y-3">
            <div className="h-3.5 w-[66%] rounded-md bg-orange-200/85" />
            <div className="h-2.5 w-full rounded-md bg-white/15" />
            <div className="h-2.5 w-[80%] rounded-md bg-white/10" />
            <div className="mt-1 inline-flex h-9 items-center rounded-lg border border-white/25 px-3.5 font-mono text-xs text-slate-300">
              Save
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CssVisual({ muted }: { muted?: boolean }) {
  return (
    <Frame file="styles.css" accent="bg-sky-400/20" muted={muted}>
      <div className="grid min-h-[200px] gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-xl border border-dashed border-white/20 bg-slate-900/50 p-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Before
          </p>
          <div className="h-3 w-1/2 rounded-full bg-white/20" />
          <div className="mt-3 h-2.5 w-3/4 rounded-full bg-white/10" />
          <div className="mt-5 h-10 w-28 rounded-md border border-white/25" />
        </div>

        <div className="flex justify-center py-1 sm:py-0">
          <span className="rounded-full border border-sky-300/35 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-200">
            CSS <span className="inline-block rtl:rotate-180">→</span>
          </span>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-amber-300/45 bg-slate-800 p-4 shadow-lg shadow-orange-400/15">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-300/20 via-transparent to-cyan-400/5"
          />
          <p className="relative mb-4 font-mono text-[10px] uppercase tracking-wider text-amber-200/90">
            After
          </p>
          <div className="relative h-3 w-1/2 rounded-full bg-orange-200" />
          <div className="relative mt-3 h-2.5 w-3/4 rounded-full bg-slate-400/60" />
          <div className="relative mt-5 flex h-10 w-28 items-center justify-center rounded-full bg-orange-300 font-mono text-xs font-bold text-slate-950">
            Save
          </div>
        </div>
      </div>
    </Frame>
  );
}

function JsVisual({ muted }: { muted?: boolean }) {
  return (
    <Frame file="app.js" accent="bg-yellow-300/15" muted={muted}>
      <div className="flex min-h-[200px] flex-col justify-center gap-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 p-4">
          <div className="h-3 w-1/2 rounded-full bg-orange-200/90" />
          <div className="mt-3 h-2.5 w-3/4 rounded-full bg-slate-500/50" />
          <div className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-cyan-300 px-5 font-mono text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20">
            Saved ✓
            <span className="rounded-full bg-slate-950/15 px-2 py-0.5 text-[10px] font-semibold">
              click
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-2">
          <div className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-3 py-3.5 text-center font-mono">
            <p className="text-[10px] text-slate-500">event</p>
            <p className="mt-1 text-sm font-semibold text-cyan-200">click</p>
          </div>
          <div className="flex justify-center">
            <span className={`inline-block font-mono text-xl text-slate-500 rtl:rotate-180`}>
              →
            </span>
          </div>
          <div className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-3 py-3.5 text-center font-mono">
            <p className="text-[10px] text-slate-500">state.saved</p>
            <p className="mt-1 text-sm font-bold text-cyan-200">true</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function ReactVisual({ muted }: { muted?: boolean }) {
  return (
    <Frame file="SaveCard.tsx" accent="bg-sky-400/20" muted={muted}>
      <div className="flex min-h-[200px] flex-col justify-center gap-3.5">
        <div className="mx-auto w-full max-w-[17rem] rounded-xl border border-sky-300/45 bg-sky-400/10 px-4 py-3.5 text-center shadow-lg shadow-sky-400/10">
          <p className="font-mono text-[11px] text-sky-200/80">define once</p>
          <p className="mt-1 font-mono text-[15px] font-semibold text-sky-50">
            {"function SaveCard()"}
          </p>
        </div>

        <div className="flex justify-center gap-10 text-sky-300/50" aria-hidden>
          <span className="inline-block text-xl rtl:-scale-x-100">↙</span>
          <span className="inline-block text-xl rtl:-scale-x-100">↘</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-sky-300/35 bg-slate-800 p-4"
            >
              <p className="font-mono text-xs text-sky-200/80">
                {"<SaveCard />"}
              </p>
              <div className="mt-3 h-2.5 w-3/4 rounded-full bg-orange-200/80" />
              <div className="mt-3 h-6 w-16 rounded-full bg-cyan-300" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/** Quiet, card-sized showcase — designed for the track picker, not the live lab. */
export function TrackCardVisual({
  trackId,
  muted = false,
}: {
  trackId: string;
  muted?: boolean;
}) {
  if (trackId === "html") return <HtmlVisual muted={muted} />;
  if (trackId === "css") return <CssVisual muted={muted} />;
  if (trackId === "javascript") return <JsVisual muted={muted} />;
  if (trackId === "react") return <ReactVisual muted={muted} />;
  return null;
}
