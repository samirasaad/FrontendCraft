"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  Box,
  CheckCircle2,
  Circle,
  Clapperboard,
  FileCode,
  Focus,
  FormInput,
  Gift,
  Layers,
  LayoutTemplate,
  Link2,
  List,
  ListFilter,
  Network,
  Scale,
  Search,
  Table,
  Target,
  Timer,
  Type,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";

const iconMap: Record<string, LucideIcon> = {
  Box,
  Layers,
  Scale,
  Focus,
  Target,
  ListFilter,
  Gift,
  Timer,
  Network,
  Workflow,
  FileCode,
  LayoutTemplate,
  Type,
  Link2,
  List,
  FormInput,
  Table,
  Accessibility,
  Search,
  Clapperboard,
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { locale, dir } = useLanguage();
  const {
    lessons,
    activeLessonId,
    setActiveLessonId,
    isComplete,
    progressPercent,
    completedCount,
    totalCount,
  } = useProgress();
  const { playClick } = useSound();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter((lesson) => {
      const title = loc(lesson.content.title, locale).toLowerCase();
      const summary = loc(lesson.content.summary, locale).toLowerCase();
      return title.includes(q) || summary.includes(q) || lesson.slug.includes(q);
    });
  }, [query, locale, lessons]);

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {t("lessons", locale)}
        </p>
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder", locale)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-2.5 pe-3 ps-9 text-sm text-slate-100 outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
          />
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] text-slate-400">
            <span>{t("progress", locale)}</span>
            <span>
              {completedCount}/{totalCount} · {progressPercent}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-400"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {filtered.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-slate-500">
            {lessons.length === 0 ? t("emptyTrack", locale) : t("noResults", locale)}
          </p>
        )}
        {filtered.map((lesson) => {
          const Icon = iconMap[lesson.icon] ?? Box;
          const active = lesson.id === activeLessonId;
          const done = isComplete(lesson.id);
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => {
                playClick();
                setActiveLessonId(lesson.id);
                onClose();
              }}
              className={`group flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-start transition ${
                active
                  ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                  : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  active
                    ? "bg-gradient-to-br from-yellow-300 to-cyan-400 text-slate-950"
                    : "bg-slate-800 text-slate-300 group-hover:text-yellow-200"
                }`}
              >
                <Icon size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-100">
                    {lesson.order}. {loc(lesson.content.title, locale)}
                  </span>
                  {done ? (
                    <CheckCircle2 size={14} className="shrink-0 text-cyan-300" />
                  ) : (
                    <Circle size={14} className="shrink-0 text-slate-600" />
                  )}
                </span>
                <span className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                  {loc(lesson.content.summary, locale)}
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden h-[calc(100vh-65px)] w-80 shrink-0 border-e border-white/10 bg-slate-950/40 lg:sticky lg:top-[65px] lg:block">
        {content}
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={t("closeMenu", locale)}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 start-0 z-50 w-[min(100%,20rem)] border-e border-white/10 bg-slate-950 shadow-2xl lg:hidden"
              initial={{ x: dir === "rtl" ? 48 : -48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir === "rtl" ? 48 : -48, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
