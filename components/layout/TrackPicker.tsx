"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Braces,
  Code2,
  Lock,
  Palette,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { HubShell } from "@/components/layout/HubShell";
import { TrackCardVisual } from "@/components/layout/TrackCardVisual";
import { TRACK_JOB_KEYS } from "@/components/layout/TrackJobVisual";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { tracks } from "@/content/tracks";
import { loc, t } from "@/content/i18n/ui-strings";
import type { TrackDefinition } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Braces,
  Code2,
  Palette,
  Wind,
  Atom,
};

const PATH_ORDER = ["html", "css", "javascript", "react"] as const;

function TrackPickerInner() {
  const { locale, dir } = useLanguage();
  const { playClick } = useSound();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const byId = Object.fromEntries(tracks.map((tr) => [tr.id, tr])) as Record<
    string,
    TrackDefinition
  >;
  const pathTracks = PATH_ORDER.map((id) => byId[id]).filter(Boolean);
  const tailwind = byId.tailwind;

  return (
    <HubShell>
      <div className="flex flex-col gap-8 py-2 sm:gap-10 sm:py-4">
        <header className="max-w-2xl">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("chooseTrack", locale)}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
            {t("chooseTrackHint", locale)}
          </p>
        </header>

        <section aria-labelledby="path-heading">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2
              id="path-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {t("trackPathLabel", locale)}
            </h2>
            <p className="hidden font-mono text-[11px] text-slate-600 sm:block">
              HTML{" "}
              <span className="inline-block rtl:rotate-180">→</span> CSS{" "}
              <span className="inline-block rtl:rotate-180">→</span> JS{" "}
              <span className="inline-block rtl:rotate-180">→</span> React
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {pathTracks.map((track, index) => {
              const Icon = iconMap[track.icon] ?? Braces;
              const available = track.status === "available";
              const copy = TRACK_JOB_KEYS[track.id];
              const startHere = track.id === "html";

              return (
                <li key={track.id} className="min-w-0">
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 transition sm:p-6 ${
                      available
                        ? startHere
                          ? "border-orange-300/35 bg-gradient-to-b from-orange-400/10 to-white/[0.02]"
                          : "border-white/12 bg-white/[0.03] hover:border-cyan-400/35 hover:bg-cyan-400/5"
                        : "border-white/6 bg-white/[0.015]"
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-slate-950 ${
                            available
                              ? track.accent
                              : "from-slate-600 to-slate-700 opacity-70"
                          }`}
                        >
                          {available ? (
                            <Icon size={20} />
                          ) : (
                            <Lock size={18} />
                          )}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white sm:text-2xl">
                              {loc(track.title, locale)}
                            </h3>
                            <span className="font-mono text-[11px] text-slate-600">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {t(copy.job, locale)}
                          </p>
                        </div>
                      </div>

                      {startHere && available ? (
                        <span className="shrink-0 rounded-full bg-orange-300/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-200">
                          {t("trackStartHere", locale)}
                        </span>
                      ) : available ? (
                        <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-200/90">
                          {t("trackLive", locale)}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {t("comingSoon", locale)}
                        </span>
                      )}
                    </div>

                    <p className="mb-4 max-w-md text-[15px] leading-relaxed text-slate-400">
                      {t(copy.hint, locale)}
                    </p>

                    <div className="pointer-events-none mb-5" aria-hidden>
                      <TrackCardVisual
                        trackId={track.id}
                        muted={!available}
                      />
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                      {available ? (
                        <>
                          <span className="text-sm text-slate-500">
                            {track.lessons.length} {t("lessonsCount", locale)}
                          </span>
                          <Link
                            href={`/${track.id}`}
                            onClick={() => playClick()}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                              startHere
                                ? "bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950 hover:brightness-110"
                                : "border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15"
                            }`}
                          >
                            {t("openTrack", locale)}
                            <Arrow size={15} />
                          </Link>
                        </>
                      ) : (
                        <span className="text-sm text-slate-600">
                          {t(copy.job, locale)}
                        </span>
                      )}
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </section>

        {tailwind ? (
          <section
            aria-labelledby="utility-heading"
            className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 max-w-xl">
                <p
                  id="utility-heading"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  {t("trackUtilityLabel", locale)}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-slate-300`}
                  >
                    <Wind size={14} />
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-slate-200">
                    {loc(tailwind.title, locale)}
                  </h3>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {t("comingSoon", locale)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {t("trackUtilityHint", locale)}
                </p>
              </div>
              <p className="shrink-0 text-[12px] text-slate-600 sm:text-end">
                {t(TRACK_JOB_KEYS.tailwind.hint, locale)}
              </p>
            </div>
          </section>
        ) : null}
      </div>
    </HubShell>
  );
}

export function TrackPicker() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <TrackPickerInner />
      </SoundProvider>
    </LanguageProvider>
  );
}
