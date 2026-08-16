"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  Atom,
  Braces,
  Code2,
  Lock,
  Palette,
  Search,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { HubShell } from "@/components/layout/HubShell";
import { TRACK_JOB_KEYS } from "@/components/layout/TrackJobVisual";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { tracks } from "@/content/tracks";
import { loc, t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";
import type { Locale, TrackDefinition } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Braces,
  Code2,
  Palette,
  Wind,
  Atom,
  Accessibility,
  Search,
};

const PATH_ORDER = [
  "html",
  "css",
  "javascript",
  "react",
  "tailwind",
  "accessibility",
  "seo",
] as const;

const PATH_NODE = {
  html: { short: "HTML", fill: "from-orange-400 to-amber-300" },
  css: { short: "CSS", fill: "from-sky-400 to-blue-500" },
  javascript: { short: "JS", fill: "from-yellow-300 to-cyan-400" },
  react: { short: "React", fill: "from-sky-300 to-cyan-400" },
  tailwind: { short: "TW", fill: "from-teal-300 to-cyan-500" },
  accessibility: { short: "A11y", fill: "from-emerald-300 to-teal-500" },
  seo: { short: "SEO", fill: "from-amber-300 to-orange-400" },
} as const;

type PathId = keyof typeof PATH_NODE;

function TrackMark({
  trackId,
  icon: Icon,
  available,
  size = "md",
}: {
  trackId: PathId;
  icon: LucideIcon;
  available: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const node = PATH_NODE[trackId];
  const box =
    size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const glyph = size === "lg" ? 18 : size === "sm" ? 14 : 15;

  return (
    <span
      className={`relative inline-flex ${box} shrink-0 items-center justify-center`}
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-full border ${
          available
            ? `border-transparent bg-gradient-to-br ${node.fill} text-slate-950 shadow-sm shadow-black/25`
            : "border-white/12 bg-slate-900 text-slate-500"
        }`}
      >
        <Icon size={glyph} strokeWidth={2.25} />
      </span>
      {!available ? (
        <span className="absolute -end-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-950 bg-slate-800 text-slate-400">
          <Lock size={8} strokeWidth={2.5} />
        </span>
      ) : null}
    </span>
  );
}

function PathRail({
  pathTracks,
  locale,
}: {
  pathTracks: TrackDefinition[];
  locale: Locale;
}) {
  const { playClick } = useSound();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <nav
      dir={dir}
      aria-label={t("trackPathNav", locale)}
      className="w-full rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-4 sm:px-6 sm:py-5"
    >
      <div className="relative sm:hidden">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-10 w-6 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent rtl:bg-gradient-to-l"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-10 w-6 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent rtl:bg-gradient-to-r"
          aria-hidden
        />
        <ol className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pathTracks.map((track, index) => {
            const node = PATH_NODE[track.id as PathId];
            const Icon = iconMap[track.icon] ?? Braces;
            const available = track.status === "available";
            const job = t(TRACK_JOB_KEYS[track.id].job, locale);
            const label = `${index + 1}. ${node.short} — ${job}`;
            const className =
              "flex w-[4.5rem] shrink-0 snap-start flex-col items-center gap-1.5 rounded-xl px-1 py-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40";

            const body = (
              <>
                <TrackMark
                  trackId={track.id as PathId}
                  icon={Icon}
                  available={available}
                />
                <span
                  className={`font-[family-name:var(--font-display)] text-xs font-bold tracking-tight ${
                    available ? "text-white" : "text-slate-500"
                  }`}
                >
                  {node.short}
                </span>
              </>
            );

            return (
              <li key={track.id}>
                {available ? (
                  <Link
                    href={`/${track.id}`}
                    onClick={() => playClick()}
                    aria-label={label}
                    className={`${className} active:bg-white/[0.05]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div
                    aria-label={`${label}. ${t("trackLockedHint", locale)}`}
                    className={className}
                  >
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="relative hidden w-full items-start sm:flex">
        <div
          className="pointer-events-none absolute inset-x-[4%] top-[1.125rem] h-px bg-white/12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute start-[4%] top-[1.125rem] h-px w-[14%] bg-orange-300/50"
          aria-hidden
        />
        {pathTracks.map((track, index) => {
          const node = PATH_NODE[track.id as PathId];
          const Icon = iconMap[track.icon] ?? Braces;
          const available = track.status === "available";
          const job = t(TRACK_JOB_KEYS[track.id].job, locale);
          const label = `${index + 1}. ${node.short} — ${job}`;
          const className =
            "relative z-10 flex w-full min-w-0 flex-col items-center gap-2 rounded-xl px-1 py-1 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300/40";

          const body = (
            <>
              <TrackMark
                trackId={track.id as PathId}
                icon={Icon}
                available={available}
              />
              <span className="flex min-w-0 flex-col items-center gap-0.5">
                <span
                  className={`whitespace-nowrap font-display text-xs font-bold tracking-tight ${
                    available ? "text-white" : "text-slate-500"
                  }`}
                >
                  {node.short}
                </span>
                <span
                  className={`whitespace-nowrap text-xs ${
                    available ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {job}
                </span>
              </span>
            </>
          );

          return (
            <li key={track.id} className="min-w-0 flex-1">
              {available ? (
                <Link
                  href={`/${track.id}`}
                  onClick={() => playClick()}
                  aria-label={label}
                  className={`${className} hover:bg-white/4`}
                >
                  {body}
                </Link>
              ) : (
                <div
                  aria-label={`${label}. ${t("trackLockedHint", locale)}`}
                  title={t("trackLockedHint", locale)}
                  className={`${className} cursor-default`}
                >
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function TrackPickerInner() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();

  const byId = Object.fromEntries(tracks.map((tr) => [tr.id, tr])) as Record<
    string,
    TrackDefinition
  >;
  const pathTracks = PATH_ORDER.map((id) => byId[id]).filter(Boolean);
  const liveTracks = pathTracks.filter((tr) => tr.status === "available");
  const upcomingTracks = pathTracks.filter((tr) => tr.status !== "available");

  return (
    <HubShell showHomeLink>
      <div className="flex flex-col gap-7 py-1 sm:gap-10 sm:py-4">
        <header className="flex flex-col gap-5 sm:gap-6">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t("chooseTrack", locale)}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-2.5 sm:text-[17px]">
              {t("chooseTrackHint", locale)}
            </p>
          </div>

          <PathRail pathTracks={pathTracks} locale={locale} />
        </header>

        <section aria-labelledby="live-heading" className="flex flex-col gap-3">
          <h2
            id="live-heading"
            className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-white sm:text-lg"
          >
            {t("trackPathLabel", locale)}
          </h2>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {liveTracks.map((track, index) => {
              const Icon = iconMap[track.icon] ?? Braces;
              const copy = TRACK_JOB_KEYS[track.id];
              const startHere = track.id === "html";
              const pathIndex = pathTracks.findIndex((tr) => tr.id === track.id);

              return (
                <li key={track.id}>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="h-full"
                  >
                    <Link
                      href={`/${track.id}`}
                      onClick={() => playClick()}
                      className={`group flex h-full flex-col justify-between gap-5 rounded-[1.35rem] border p-5 outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300/50 sm:p-6 ${
                        startHere
                          ? "border-orange-300/45 bg-gradient-to-br from-orange-400/14 via-white/[0.03] to-transparent shadow-[0_0_40px_rgba(251,146,60,0.08)] hover:border-orange-300/60"
                          : "border-white/12 bg-white/[0.03] hover:border-cyan-300/35 hover:bg-sky-400/[0.06]"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <TrackMark
                          trackId={track.id as PathId}
                          icon={Icon}
                          available
                          size="lg"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-mono text-[11px] tabular-nums text-slate-600">
                              {String(pathIndex + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white">
                              {loc(track.title, locale)}
                            </h3>
                            {startHere ? (
                              <span className="rounded-full bg-orange-300/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-200">
                                {t("trackStartHere", locale)}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {t(copy.job, locale)}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {t(copy.body, locale)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
                        <span className="text-sm tabular-nums text-slate-500">
                          {track.lessons.length} {t("lessonsCount", locale)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition ${
                            startHere
                              ? "bg-orange-300 text-slate-950 group-hover:brightness-110"
                              : "border border-white/15 bg-white/5 text-slate-100 group-hover:border-cyan-300/40 group-hover:text-cyan-100"
                          }`}
                        >
                          {startHere
                            ? t("trackStartCta", locale)
                            : t("trackEnter", locale)}
                          <ArrowRight
                            size={15}
                            className={`${RTL_FLIP} transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`}
                          />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </section>

        {upcomingTracks.length > 0 ? (
          <section
            aria-labelledby="upcoming-heading"
            className="flex flex-col gap-3"
          >
            <h2
              id="upcoming-heading"
              className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-slate-300 sm:text-lg"
            >
              {t("trackUpcomingLabel", locale)}
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingTracks.map((track) => {
                const Icon = iconMap[track.icon] ?? Braces;
                const copy = TRACK_JOB_KEYS[track.id];
                return (
                  <li key={track.id}>
                    <div
                      className="flex h-full flex-col justify-between gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5"
                      title={t("trackLockedHint", locale)}
                    >
                      <div className="flex items-start gap-3">
                        <TrackMark
                          trackId={track.id as PathId}
                          icon={Icon}
                          available={false}
                          size="md"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-lg font-bold tracking-tight text-slate-300">
                            {loc(track.title, locale)}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {t(copy.job, locale)}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            {t(copy.hint, locale)}
                          </p>
                        </div>
                      </div>
                      <p className="border-t border-white/6 pt-3 text-xs font-medium text-slate-600">
                        {t("trackLockedHint", locale)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
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
