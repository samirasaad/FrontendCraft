"use client";

import { useState } from "react";
import type { HtmlHintId } from "./types";
import { HTML_HINTS } from "./hints";

type CopyTarget = "en" | "ar" | null;

export function HintPostCaption({
  hintId,
  compact = false,
}: {
  hintId: HtmlHintId;
  compact?: boolean;
}) {
  const hint = HTML_HINTS.find((h) => h.id === hintId);
  const [copied, setCopied] = useState<CopyTarget>(null);

  if (!hint) return null;

  async function copyText(text: string, target: CopyTarget) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div
      className={`mx-auto w-full text-start ${compact ? "max-w-sm px-3" : "max-w-md"}`}
      data-hint-post-caption
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Post caption · English &amp; Egyptian Arabic
      </p>

      <div className="space-y-3">
        <CaptionBlock
          label="English"
          text={hint.caption.en}
          copied={copied === "en"}
          onCopy={() => copyText(hint.caption.en, "en")}
          compact={compact}
        />
        <CaptionBlock
          label="عربي مصري"
          text={hint.caption.ar}
          copied={copied === "ar"}
          onCopy={() => copyText(hint.caption.ar, "ar")}
          compact={compact}
          dir="rtl"
        />
      </div>
    </div>
  );
}

function CaptionBlock({
  label,
  text,
  copied,
  onCopy,
  compact,
  dir,
}: {
  label: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
  compact?: boolean;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/80">
          {label}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-200"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <p
        dir={dir}
        className={`leading-relaxed text-slate-300 ${compact ? "text-xs" : "text-sm"}`}
      >
        {text}
      </p>
    </div>
  );
}
