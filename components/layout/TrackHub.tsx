"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Code2,
  Lock,
  Palette,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { LangToggle } from "@/components/shared/LangToggle";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { tracks } from "@/content/tracks";
import { loc, t } from "@/content/i18n/ui-strings";

const iconMap: Record<string, LucideIcon> = {
  Braces,
  Code2,
  Palette,
  Wind,
};

function TrackHubInner() {
  const { locale, dir } = useLanguage();
  const Arrow = ArrowRight;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
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

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-cyan-400 text-slate-950">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
              {t("brand", locale)}
            </p>
            <p className="text-xs text-slate-400">{t("hubTagline", locale)}</p>
          </div>
        </div>
        <LangToggle />
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {t("chooseTrack", locale)}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("brand", locale)}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400 sm:text-lg">
            {t("hubTagline", locale)}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map((track, index) => {
            const Icon = iconMap[track.icon] ?? Braces;
            const available = track.status === "available";
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`group relative h-full overflow-hidden rounded-3xl border p-5 transition sm:p-6 ${
                  available
                    ? "border-white/10 bg-white/[0.03] hover:border-cyan-400/40 hover:bg-cyan-400/5"
                    : "border-white/5 bg-white/[0.02] opacity-75"
                }`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${track.accent} text-slate-950`}
                >
                  <Icon size={22} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                    {loc(track.title, locale)}
                  </h2>
                  {!available && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                      <Lock size={10} />
                      {t("comingSoon", locale)}
                    </span>
                  )}
                </div>
                <p className="min-h-[48px] text-sm leading-relaxed text-slate-400">
                  {loc(track.description, locale)}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {track.lessons.length} {t("lessonsCount", locale)}
                  </span>
                  {available && (
                    <span className="inline-flex items-center gap-1 font-semibold text-cyan-300 transition group-hover:gap-2">
                      {t("openTrack", locale)}
                      <Arrow
                        size={14}
                        className={dir === "rtl" ? "rotate-180" : undefined}
                      />
                    </span>
                  )}
                </div>
              </motion.div>
            );

            if (!available) {
              return (
                <div key={track.id} aria-disabled className="cursor-not-allowed">
                  {card}
                </div>
              );
            }

            return (
              <Link key={track.id} href={`/${track.id}`} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export function TrackHub() {
  return (
    <LanguageProvider>
      <TrackHubInner />
    </LanguageProvider>
  );
}
