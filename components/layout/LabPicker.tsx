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
import { LAB_JOB_KEYS } from "@/components/layout/LabJobVisual";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { labs } from "@/content/labs";
import { loc, t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";
import type { Locale, LabDefinition } from "@/lib/types";

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
  labId,
  icon: Icon,
  available,
  size = "md",
}: {
  labId: PathId;
  icon: LucideIcon;
  available: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const node = PATH_NODE[labId];
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
  pathLabs,
  locale,
}: {
  pathLabs: LabDefinition[];
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
          {pathLabs.map((lab, index) => {
            const node = PATH_NODE[lab.id as PathId];
            const Icon = iconMap[lab.icon] ?? Braces;
            const available = lab.status === "available";
            const job = t(LAB_JOB_KEYS[lab.id].job, locale);
            const label = `${index + 1}. ${node.short} — ${job}`;
            const className =
              "flex w-[4.5rem] shrink-0 snap-start flex-col items-center gap-1.5 rounded-xl px-1 py-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40";

            const body = (
              <>
                <TrackMark
                  labId={lab.id as PathId}
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
              <li key={lab.id}>
                {available ? (
                  <Link
                    href={`/${lab.id}`}
                    onClick={() => playClick()}
                    aria-label={label}
                    className={`${className} active:bg-white/[0.05]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div aria-label={label} className={className}>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="relative mx-auto hidden max-w-3xl items-start justify-between sm:flex lg:max-w-4xl">
        <div
          className="pointer-events-none absolute inset-x-8 top-[1.125rem] h-px bg-gradient-to-r from-orange-400/50 via-white/15 to-amber-300/40"
          aria-hidden
        />
        {pathLabs.map((lab, index) => {
          const node = PATH_NODE[lab.id as PathId];
          const Icon = iconMap[lab.icon] ?? Braces;
          const available = lab.status === "available";
          const job = t(LAB_JOB_KEYS[lab.id].job, locale);
          const label = `${index + 1}. ${node.short} — ${job}`;
          const className =
            "relative z-10 flex w-[4.75rem] flex-col items-center gap-2 rounded-xl px-1 py-1 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300/40 lg:w-[5.25rem]";

          const body = (
            <>
              <TrackMark
                labId={lab.id as PathId}
                icon={Icon}
                available={available}
              />
              <span className="flex flex-col items-center gap-0.5">
                <span
                  className={`font-[family-name:var(--font-display)] text-xs font-bold tracking-tight ${
                    available ? "text-white" : "text-slate-500"
                  }`}
                >
                  {node.short}
                </span>
                <span className="text-[10px] text-slate-600">{job}</span>
              </span>
            </>
          );

          return (
            <li key={lab.id} className="flex justify-center">
              {available ? (
                <Link
                  href={`/${lab.id}`}
                  onClick={() => playClick()}
                  aria-label={label}
                  className={`${className} hover:bg-white/[0.04]`}
                >
                  {body}
                </Link>
              ) : (
                <div aria-label={label} className={`${className} cursor-default`}>
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

function LabPickerInner() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();

  const byId = Object.fromEntries(labs.map((tr) => [tr.id, tr])) as Record<
    string,
    LabDefinition
  >;
  const pathLabs = PATH_ORDER.map((id) => byId[id]).filter(Boolean);
  const liveLabs = pathLabs.filter((tr) => tr.status === "available");
  const upcomingLabs = pathLabs.filter((tr) => tr.status !== "available");

  return (
    <HubShell>
      <div className="flex flex-col gap-7 py-1 sm:gap-10 sm:py-4">
        <header className="flex flex-col gap-5 sm:gap-6">
          <div className="max-w-xl">
            <h1 className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t("chooseTrack", locale)}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:mt-2.5 sm:text-[17px]">
              {t("chooseTrackHint", locale)}
            </p>
          </div>

          <PathRail pathLabs={pathLabs} locale={locale} />
        </header>

        <section aria-labelledby="live-heading" className="flex flex-col gap-3">
          <h2
            id="live-heading"
            className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-white sm:text-lg"
          >
            {t("trackPathLabel", locale)}
          </h2>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {liveLabs.map((lab, index) => {
              const Icon = iconMap[lab.icon] ?? Braces;
              const copy = LAB_JOB_KEYS[lab.id];
              const startHere = lab.id === "html";
              const pathIndex = pathLabs.findIndex((tr) => tr.id === lab.id);

              return (
                <li key={lab.id}>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="h-full"
                  >
                    <Link
                      href={`/${lab.id}`}
                      onClick={() => playClick()}
                      className={`group flex h-full flex-col justify-between gap-5 rounded-[1.35rem] border p-5 outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300/50 sm:p-6 ${
                        startHere
                          ? "border-orange-300/40 bg-gradient-to-br from-orange-400/12 via-white/[0.02] to-transparent hover:border-orange-300/55"
                          : "border-cyan-300/25 bg-gradient-to-br from-sky-400/10 via-white/[0.02] to-transparent hover:border-cyan-300/40"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <TrackMark
                          labId={lab.id as PathId}
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
                              {loc(lab.title, locale)}
                            </h3>
                            {startHere ? (
                              <span className="rounded-full bg-orange-300/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-200">
                                {t("trackStartHere", locale)}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {t(copy.job, locale)}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {t(copy.hint, locale)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
                        <span className="text-sm tabular-nums text-slate-500">
                          {lab.lessons.length} {t("lessonsCount", locale)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-sm font-bold ${
                            startHere ? "text-yellow-200" : "text-cyan-200"
                          }`}
                        >
                          {startHere
                            ? t("trackStartCta", locale)
                            : t("trackEnterLab", locale)}
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

        {upcomingLabs.length > 0 ? (
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
            <ul className="flex flex-wrap gap-2">
              {upcomingLabs.map((lab) => {
                const Icon = iconMap[lab.icon] ?? Braces;
                const copy = LAB_JOB_KEYS[lab.id];
                return (
                  <li key={lab.id}>
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.02] py-1.5 pe-3.5 ps-1.5">
                      <TrackMark
                        labId={lab.id as PathId}
                        icon={Icon}
                        available={false}
                        size="sm"
                      />
                      <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-slate-400">
                        {loc(lab.title, locale)}
                      </span>
                      <span className="hidden text-[11px] text-slate-600 sm:inline">
                        {t(copy.job, locale)}
                      </span>
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

export function LabPicker() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <LabPickerInner />
      </SoundProvider>
    </LanguageProvider>
  );
}
