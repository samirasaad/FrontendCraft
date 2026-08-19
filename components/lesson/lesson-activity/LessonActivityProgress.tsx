"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/content/i18n/ui-strings";

export function LessonActivityProgress({
  current,
  total,
}: {
  current: number;
  total: number;
  /** @deprecated label is built inside for correct RTL bidi */
  label?: string;
}) {
  const { locale } = useLanguage();
  const ar = locale === "ar";
  const pct = total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));
  const label = ar
    ? `سؤال ${current} من ${total}`
    : t("activityProgress", locale)
        .replace("{current}", String(current))
        .replace("{total}", String(total));

  return (
    <div className="lesson-activity-progress mb-3 flex items-center gap-3">
      <span className="shrink-0 text-sm font-semibold leading-none text-cyan-200">
        {ar ? (
          <span className="inline-flex items-baseline gap-1" dir="rtl">
            <span>سؤال</span>
            <span className="font-mono tabular-nums text-slate-400">
              <bdi>{current}</bdi>
              <span className="mx-1">من</span>
              <bdi>{total}</bdi>
            </span>
          </span>
        ) : (
          label
        )}
      </span>
      <div
        className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={label}
      >
        <div
          className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-sm tabular-nums text-slate-500" dir="ltr">
        {pct}%
      </span>
    </div>
  );
}
