"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubShell } from "@/components/layout/HubShell";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";

function NotFoundInner() {
  const { locale } = useLanguage();
  const { playClick } = useSound();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-10 text-center">
      <p className="font-mono text-sm font-semibold tracking-[0.28em] text-cyan-300/80">
        404
      </p>
      <div className="max-w-md space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t("notFoundTitle", locale)}
        </h1>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          {t("notFoundBody", locale)}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          onClick={() => playClick()}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
        >
          {t("notFoundHome", locale)}
          <ArrowRight size={16} className={RTL_FLIP} />
        </Link>
        <Link
          href="/tracks"
          onClick={() => playClick()}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          {t("notFoundTracks", locale)}
        </Link>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <HubShell showHomeLink>
          <NotFoundInner />
        </HubShell>
      </SoundProvider>
    </LanguageProvider>
  );
}
