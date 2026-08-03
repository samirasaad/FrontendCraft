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
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { tracks } from "@/content/tracks";
import { loc, t } from "@/content/i18n/ui-strings";

const iconMap: Record<string, LucideIcon> = {
  Braces,
  Code2,
  Palette,
  Wind,
  Atom,
};

function TrackPickerInner() {
  const { locale, dir } = useLanguage();
  const { playClick } = useSound();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <HubShell showHomeLink>
      <div className="mb-8 max-w-2xl">
        <Link
          href="/"
          onClick={() => playClick()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-200"
        >
          <Back size={14} />
          {t("backHome", locale)}
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {t("chooseTrack", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          {t("chooseTrackHint", locale)}
        </p>
      </div>

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
                    <Arrow size={14} />
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
            <Link
              key={track.id}
              href={`/${track.id}`}
              onClick={() => playClick()}
              className="block"
            >
              {card}
            </Link>
          );
        })}
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
