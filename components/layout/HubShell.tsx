"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-20 top-10 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute end-0 top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <header
        className={`mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between px-4 sm:px-6 ${
          fitViewport ? "py-2.5" : "py-5"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span
              className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-cyan-400 text-slate-950 ${
                fitViewport ? "h-8 w-8" : "h-10 w-10"
              }`}
            >
              <Sparkles size={fitViewport ? 15 : 18} />
            </span>
            {fitViewport ? (
              <p className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
                {t("brand", locale)}
              </p>
            ) : (
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {t("brand", locale)}
                </p>
                <p className="text-xs text-slate-400">
                  {t("hubTagline", locale)}
                </p>
              </div>
            )}
          </Link>
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
