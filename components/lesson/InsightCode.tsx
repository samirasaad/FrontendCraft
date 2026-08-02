"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { LocalizedString } from "@/lib/types";

export function InsightCode({
  code,
  caption,
}: {
  code: string;
  caption?: LocalizedString;
}) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    playClick();
    try {
      await navigator.clipboard.writeText(code);
      playSuccess();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <p className="truncate text-[11px] text-slate-500">
          {caption
            ? loc(caption, locale)
            : t("insightCodeLabel", locale)}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200 transition hover:bg-white/10"
        >
          {copied ? (
            <Check size={12} className="text-cyan-300" />
          ) : (
            <Copy size={12} />
          )}
          {copied ? t("copied", locale) : t("copy", locale)}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[12px] leading-5 text-cyan-100/90">
        {code}
      </pre>
    </div>
  );
}
