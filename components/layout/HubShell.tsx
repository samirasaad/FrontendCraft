"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Atmosphere } from "@/components/shared/Atmosphere";
import { BrandLockup } from "@/components/shared/BrandLockup";
import { LangToggle } from "@/components/shared/LangToggle";
import { SfxToggle } from "@/components/shared/SfxToggle";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";

/** Shared atmosphere + chrome for home and track picker. */
export function HubShell({
  children,
  showHomeLink = false,
  /** Home: fill the viewport, but allow scroll on short screens. */
  fitViewport = false,
}: {
  children: ReactNode;
  showHomeLink?: boolean;
  fitViewport?: boolean;
}) {
  const { locale } = useLanguage();

  return (
    <div
      className={`relative bg-slate-950 text-slate-100 ${
        fitViewport ? "flex min-h-dvh flex-col" : "min-h-screen"
      }`}
    >
      <Atmosphere />

      <header className="sticky top-0 z-20 mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between gap-3 border-b border-white/5 bg-slate-950/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <BrandLockup />
          {showHomeLink ? (
            <Link
              href="/"
              className="ms-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 transition hover:bg-white/10"
            >
              {t("backHome", locale)}
            </Link>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SfxToggle />
          <LangToggle />
        </div>
      </header>

      <main
        className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${
          fitViewport
            ? "flex flex-1 flex-col pb-8 pt-3"
            : "pb-16 pt-8 sm:pt-12"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
