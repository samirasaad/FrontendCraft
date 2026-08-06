"use client";

import { Monitor } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { BrowserWalkthrough } from "@/lib/types";

export function SeeInBrowser({
  walkthrough,
  embedded = false,
}: {
  walkthrough: BrowserWalkthrough;
  embedded?: boolean;
}) {
  const { locale } = useLanguage();

  if (!walkthrough.steps.length) return null;

  const body = (
    <div className="space-y-4">
      {walkthrough.intro ? (
        <p
          className={`text-[15px] text-slate-300 ${
            locale === "ar" ? "leading-[1.75]" : "leading-7"
          }`}
        >
          <RichText text={loc(walkthrough.intro, locale)} />
        </p>
      ) : null}
      <p className="text-xs text-slate-500">
        <RichText text={t("seeInBrowserShortcut", locale)} />
      </p>
      <ol className="space-y-3">
        {walkthrough.steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-xl border border-sky-400/20 bg-slate-950/50 px-3 py-3 sm:px-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-xs font-bold text-sky-200"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-sky-100">
                <RichText text={loc(step.title, locale)} />
              </p>
              <p
                className={`mt-1 text-sm text-slate-300 ${
                  locale === "ar" ? "leading-[1.7]" : "leading-relaxed"
                }`}
              >
                <RichText text={loc(step.detail, locale)} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

  if (embedded) {
    return (
      <section className="rounded-3xl border border-sky-400/25 bg-sky-400/5 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
          <Monitor size={16} />
          {t("seeInBrowser", locale)}
        </div>
        <p className="mb-4 text-xs text-slate-400">{t("seeInBrowserHint", locale)}</p>
        {body}
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-sky-400/25 bg-sky-400/5 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
        <Monitor size={16} />
        {t("seeInBrowser", locale)}
      </div>
      <p className="mb-4 text-xs text-slate-400">{t("seeInBrowserHint", locale)}</p>
      {body}
    </section>
  );
}
