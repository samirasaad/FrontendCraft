"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Microscope } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { LocalizedString } from "@/lib/types";

export function DeepDive({ paragraphs }: { paragraphs: LocalizedString[] }) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const [open, setOpen] = useState(false);

  if (paragraphs.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-400/25 bg-violet-400/5">
      <button
        type="button"
        onClick={() => {
          playClick();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start sm:px-6"
      >
        <span className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
            <Microscope size={16} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-violet-100">
              {t("explainMore", locale)}
            </span>
            <span className="mt-0.5 block text-xs text-slate-400">
              {t("explainMoreHint", locale)}
            </span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-violet-200 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-violet-400/20 px-5 py-4 text-[15px] leading-7 text-slate-300 sm:px-6">
              {paragraphs.map((p, i) => (
                <p key={i}>{loc(p, locale)}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
