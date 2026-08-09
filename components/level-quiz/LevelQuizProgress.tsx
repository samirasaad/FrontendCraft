"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/content/i18n/ui-strings";

export function LevelQuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const { locale } = useLanguage();
  const pct = Math.round((current / Math.max(total, 1)) * 100);

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300/90">
        <span>
          {t("levelQuizProgress", locale)
            .replace("{current}", String(current))
            .replace("{total}", String(total))}
        </span>
        <span className="font-mono tabular-nums text-slate-500" dir="ltr">
          {pct}%
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 shadow-[0_0_16px_rgba(34,211,238,0.45)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
