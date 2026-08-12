"use client";

import { LessonActivityCodeSnippet } from "@/components/lesson/lesson-activity/LessonActivityCodeSnippet";

export function HintCodePanel({
  code,
  tone = "muted",
  compact = false,
}: {
  code: string;
  tone?: "muted" | "bad" | "good";
  compact?: boolean;
}) {
  const isMarkup = code.includes("<") || code.includes("<!");
  const isPlain = !isMarkup;

  if (isPlain) {
    return (
      <div data-hint-tone={tone} className="hint-code-panel" dir="ltr">
        <div
          className={`overflow-hidden rounded-lg border-2 bg-slate-950 ${
            tone === "bad"
              ? "border-red-600 shadow-[0_0_22px_rgba(220,38,38,0.45)]"
              : tone === "good"
                ? "border-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.35)]"
                : "border-cyan-400"
          }`}
        >
          <div
            className={`flex items-center gap-1 border-b px-2 py-1 ${
              tone === "bad"
                ? "border-red-600 bg-red-950"
                : tone === "good"
                  ? "border-emerald-600 bg-emerald-950"
                  : "border-white/10"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="ms-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              HTML
            </span>
          </div>
          <pre
            className={`overflow-hidden whitespace-pre-wrap break-words px-2.5 py-2 text-start font-mono text-[11px] leading-relaxed ${
              tone === "bad"
                ? "text-red-400 line-through decoration-red-500 decoration-2"
                : tone === "good"
                  ? "text-emerald-300"
                  : "text-slate-100"
            }`}
          >
            {code}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div data-hint-tone={tone} className="hint-code-panel">
      <div
        className={`overflow-hidden rounded-lg bg-slate-950 ${
          compact
            ? "[&_pre]:!overflow-hidden [&_pre]:!whitespace-pre-wrap [&_pre]:!break-words [&_pre]:!bg-slate-950 [&_pre]:!p-2 [&_pre]:!text-[12px] [&_pre]:!leading-[1.55] [&_[class*='border-b']]:!bg-slate-950 [&_[class*='border-b']]:!px-2 [&_[class*='border-b']]:!py-1 [&_[class*='border-b']_span:last-child]:!text-white"
            : "[&_pre]:overflow-hidden [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:bg-slate-950 [&_[class*='border-b']_span:last-child]:text-white"
        } ${tone === "bad" ? "[&_pre]:line-through [&_pre]:decoration-red-500 [&_pre]:decoration-2" : ""}`}
      >
        <LessonActivityCodeSnippet code={code} language="html" label="HTML" />
      </div>
    </div>
  );
}
