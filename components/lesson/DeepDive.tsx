"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Layers } from "lucide-react";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

/** Collapses secondary concept content so the teaching spine stays short. */
export function DeepDive({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const [open, setOpen] = useState(false);

  if (!children) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
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
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-300">
            <Layers size={16} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-100">
              {t("deepDive", locale)}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">
              {t("deepDiveHint", locale)}
            </span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/10 px-3 py-4 sm:px-4">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
