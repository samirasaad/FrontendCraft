"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LessonContent } from "@/components/lesson/LessonContent";
import { Atmosphere } from "@/components/shared/Atmosphere";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import { SoundProvider } from "@/context/SoundContext";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { TrackDefinition } from "@/lib/types";

function LessonQuerySync() {
  const searchParams = useSearchParams();
  const { lessons, setActiveLessonId } = useProgress();

  useEffect(() => {
    const slug = searchParams.get("lesson");
    if (!slug) return;
    const match = lessons.find((l) => l.slug === slug || l.id === slug);
    if (match) setActiveLessonId(match.id);
  }, [searchParams, lessons, setActiveLessonId]);

  return null;
}

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function sync() {
      setMenuOpen(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Suspense fallback={null}>
        <LessonQuerySync />
      </Suspense>
      <Atmosphere fixed extraBloom />

      <Header
        track={track}
        lessonsOpen={menuOpen}
        onToggleLessons={() => setMenuOpen((v) => !v)}
      />
      <div className="flex w-full">
        <Sidebar
          open={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
        />
        <main className="min-w-0 flex-1 px-3 py-4 transition-[margin,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4 sm:py-5 lg:px-5 lg:py-6">
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
