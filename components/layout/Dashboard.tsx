"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { SoundProvider } from "@/context/SoundContext";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { TrackDefinition } from "@/lib/types";

function EmptyTrackState({ track }: { track: TrackDefinition }) {
  const { locale } = useLanguage();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        {loc(track.title, locale)}
      </p>
      <p className="max-w-md text-slate-400">{t("emptyTrack", locale)}</p>
    </div>
  );
}

function DashboardShell({ track }: { track: TrackDefinition }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -start-24 top-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute -end-16 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 start-1/3 h-64 w-64 rounded-full bg-lime-300/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Header track={track} />
      <div className="flex w-full">
        <Sidebar
          open={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
        />
        <main className="min-w-0 flex-1 px-3 py-4 transition-[width] duration-300 sm:px-4 sm:py-5 lg:px-5 lg:py-6">
          {track.lessons.length === 0 ? (
            <EmptyTrackState track={track} />
          ) : (
            <LessonContent />
          )}
        </main>
      </div>
    </div>
  );
}

export function Dashboard({ track }: { track: TrackDefinition }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <ProgressProvider trackId={track.id} lessons={track.lessons}>
          <DashboardShell track={track} />
        </ProgressProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}
