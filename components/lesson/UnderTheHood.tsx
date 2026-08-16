"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Cog } from "lucide-react";
import { InsightCode } from "@/components/lesson/InsightCode";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { InsightSection } from "@/lib/types";

export function UnderTheHood({
  section,
  embedded = false,
}: {
  section: InsightSection;
  /** When true, render content always open (parent accordion owns collapse). */
  embedded?: boolean;
}) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const [open, setOpen] = useState(false);

  if (!section.paragraphs.length) return null;

  const body = (
    <div className="space-y-3 text-[15px] leading-7 text-slate-300">
      {section.paragraphs.map((p, i) => (
        <p key={i}>
          <RichText text={loc(p, locale)} />
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="space-y-2 pt-1">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-xl border border-violet-400/15 bg-slate-950/40 px-3 py-2 text-sm"
            >
              <span className="text-violet-300">▸</span>
              <span>
                <RichText text={loc(b, locale)} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.code ? (
        <InsightCode code={section.code} caption={section.codeCaption} />
      ) : null}
    </div>
  );

  if (embedded) {
    return (
      <section className="rounded-3xl border border-violet-400/25 bg-violet-400/5 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-100">
          <Cog size={16} />
          {t("underTheHood", locale)}
        </div>
        <p className="mb-3 text-sm leading-relaxed text-slate-300">{t("underTheHoodHint", locale)}</p>
        {body}
      </section>
    );
  }

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
            <Cog size={16} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-violet-100">
              {t("underTheHood", locale)}
            </span>
            <span className="mt-0.5 block text-sm leading-relaxed text-slate-300">
              {t("underTheHoodHint", locale)}
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
            <div className="border-t border-violet-400/20 px-5 py-4 sm:px-6">
              {body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
