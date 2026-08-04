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
  /** Home: lock to one viewport — no page scroll. */
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
        fitViewport
          ? "flex h-dvh max-h-dvh flex-col overflow-hidden"
          : "min-h-screen overflow-hidden"
      }`}
    >
      <Atmosphere />

      <header className="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <BrandLockup compact={fitViewport} />
          {showHomeLink ? (
            <Link
              href="/"
              className="ms-1 hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 transition hover:bg-white/10 sm:inline"
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
            ? "flex min-h-0 flex-1 flex-col overflow-hidden pb-3 pt-1"
            : "pb-16 pt-8 sm:pt-12"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
