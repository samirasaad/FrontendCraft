"use client";

import { useState } from "react";
import { Check, Copy, Play, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { loc, t } from "@/content/i18n/ui-strings";
import type { LocalizedString } from "@/lib/types";

interface CodeRunnerProps {
  code: string;
  expectedOutput: LocalizedString;
}

function CodeRunnerInner({
  code,
  previewHint,
}: {
  code: string;
  previewHint: string;
}) {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function handleRun() {
    setRunning(true);
    window.setTimeout(() => {
      setOutput(previewHint);
      setRunning(false);
    }, 650);
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_0_40px_rgba(15,23,42,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <Terminal size={16} className="text-yellow-300" />
          <span className="font-medium">{t("playground", locale)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
          >
            {copied ? <Check size={14} className="text-cyan-300" /> : <Copy size={14} />}
            {copied ? t("copied", locale) : t("copy", locale)}
          </button>
          <button
            type="button"
            onClick={handleRun}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-70"
          >
            <Play size={14} />
            {running ? t("running", locale) : t("run", locale)}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 text-cyan-100 sm:text-[13px]">
        <code>{code}</code>
      </pre>

      <div className="border-t border-white/10 bg-black/30 px-4 py-3">
        <p className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">
          {t("output", locale)}
        </p>
        <AnimatePresence mode="wait">
          <motion.pre
            key={output ?? "hint"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="min-h-[3rem] whitespace-pre-wrap font-mono text-sm text-yellow-200"
          >
            {output ?? `// ${previewHint}`}
          </motion.pre>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function CodeRunner({ code, expectedOutput }: CodeRunnerProps) {
  const { locale } = useLanguage();
  const previewHint = loc(expectedOutput, locale).replace(/\\n/g, "\n");

  return (
    <CodeRunnerInner
      key={`${code}-${locale}`}
      code={code}
      previewHint={previewHint}
    />
  );
}
