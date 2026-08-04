"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/content/i18n/ui-strings";

export function QuizProgress({
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

  return (
    <div className="quiz-progress mb-5">
      <div className="quiz-progress__meta mb-2 flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold tracking-wide text-cyan-300/90">
          {ar ? (
            <span className="inline-flex items-baseline gap-1" dir="rtl">
              <span>سؤال</span>
              <span className="font-mono tabular-nums">
                <bdi>{current}</bdi>
                <span className="mx-1">من</span>
                <bdi>{total}</bdi>
              </span>
            </span>
          ) : (
            <span className="uppercase tracking-[0.16em]">
              {t("quizProgress", locale)
                .replace("{current}", String(current))
                .replace("{total}", String(total))}
            </span>
          )}
        </span>
        <span
          className="quiz-progress__count font-mono text-slate-500"
          dir="ltr"
          hidden={ar}
        >
          {current}/{total}
        </span>
      </div>

      <div
        className="quiz-progress__track h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={
          ar ? `سؤال ${current} من ${total}` : `Question ${current} of ${total}`
        }
      >
        <div
          className="quiz-progress__fill h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
