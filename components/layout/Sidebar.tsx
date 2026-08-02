"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  AlertTriangle,
  AppWindow,
  BookCopy,
  Box,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clapperboard,
  Cpu,
  FileCode,
  Focus,
  FormInput,
  Gauge,
  Gift,
  Globe2,
  Highlighter,
  Images,
  Layers,
  LayoutTemplate,
  Link2,
  List,
  ListFilter,
  ListTree,
  Network,
  PanelLeftClose,
  Scale,
  Search,
  Share2,
  Smartphone,
  Table,
  Target,
  Timer,
  Type,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import {
  TIER_FILTERS,
  TIER_ORDER,
  tierBadgeClass,
  tierBlurb,
  tierEmoji,
  tierLabel,
  type TierFilter,
} from "@/lib/tiers";
import type { Tier } from "@/lib/types";

/** Roughly 1:2–1:3 vs content; grows with the viewport up to 24rem. */
const SIDEBAR_WIDTH = "clamp(20rem, 32vw, 24rem)";

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
  Highlighter,
  Link2,
  List,
  FormInput,
  Table,
  Accessibility,
  Search,
  Clapperboard,
  Gauge,
  Zap,
  Cpu,
  AlertTriangle,
  BookCopy,
  Smartphone,
  AppWindow,
  ListTree,
  Images,
  Share2,
  Globe2,
};

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const { locale } = useLanguage();
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
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [expandedTiers, setExpandedTiers] = useState<Set<Tier>>(() => new Set());

  const activeTier = useMemo(() => {
    const active = lessons.find((l) => l.id === activeLessonId);
    return active ? active.tier : lessons[0]?.tier;
  }, [lessons, activeLessonId]);

  useEffect(() => {
    if (!activeTier) return;
    setExpandedTiers((prev) => {
      if (prev.has(activeTier)) return prev;
      const next = new Set(prev);
      next.add(activeTier);
      return next;
    });
  }, [activeTier]);

  useEffect(() => {
    if (tierFilter !== "all") {
      setExpandedTiers(new Set([tierFilter]));
      return;
    }
    if (query.trim()) {
      setExpandedTiers(new Set(TIER_ORDER));
    }
  }, [tierFilter, query]);

  function toggleTier(tier: Tier) {
    playClick();
    setExpandedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  }

  const tierStats = useMemo(() => {
    const stats = {} as Record<Tier, { total: number; done: number }>;
    for (const tier of TIER_ORDER) {
      stats[tier] = { total: 0, done: 0 };
    }
    for (const lesson of lessons) {
      stats[lesson.tier].total += 1;
      if (isComplete(lesson.id)) stats[lesson.tier].done += 1;
    }
    return stats;
  }, [lessons, isComplete]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter((lesson) => {
      if (tierFilter !== "all" && lesson.tier !== tierFilter) return false;
      if (!q) return true;
      const title = loc(lesson.content.title, locale).toLowerCase();
      const summary = loc(lesson.content.summary, locale).toLowerCase();
      return title.includes(q) || summary.includes(q) || lesson.slug.includes(q);
    });
  }, [query, locale, lessons, tierFilter]);

  const grouped = useMemo(() => {
    const map = new Map<Tier, typeof filtered>();
    for (const tier of TIER_ORDER) map.set(tier, []);
    for (const lesson of filtered) {
      map.get(lesson.tier)?.push(lesson);
    }
    return TIER_ORDER.map((tier) => ({
      tier,
      lessons: (map.get(tier) ?? []).slice().sort((a, b) => a.order - b.order),
    })).filter((group) => group.lessons.length > 0);
  }, [filtered]);

  const railWidth = "3rem";

  return (
    <aside
      className="sticky top-[57px] h-[calc(100vh-57px)] shrink-0 overflow-hidden border-e border-white/10 bg-slate-950/50 transition-[width] duration-300 ease-out"
      style={{ width: open ? SIDEBAR_WIDTH : railWidth }}
    >
      <div
        className="flex h-full flex-col"
        style={{ width: open ? SIDEBAR_WIDTH : railWidth }}
      >
        <div
          className={`flex items-center border-b border-white/10 py-2.5 ${
            open ? "justify-between px-3" : "justify-center px-1"
          }`}
        >
          {open ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {t("lessons", locale)}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => {
              playClick();
              onToggle();
            }}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label={open ? t("closeMenu", locale) : t("openMenu", locale)}
            aria-expanded={open}
          >
            <PanelLeftClose
              size={16}
              className={`transition-transform duration-300 ${open ? "rotate-0" : "rotate-180"}`}
            />
          </button>
        </div>

        <div
          className={`min-h-0 flex-1 flex-col ${open ? "flex" : "hidden"}`}
          aria-hidden={!open}
        >
        <div className="border-b border-white/10 p-3">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder", locale)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-2 pe-3 ps-9 text-sm text-slate-100 outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
              tabIndex={open ? 0 : -1}
            />
          </div>

          <div className="mt-2.5 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TIER_FILTERS.map((filter) => {
              const active = tierFilter === filter;
              const label =
                filter === "all"
                  ? t("filterAll", locale)
                  : `${tierEmoji(filter)} ${tierLabel(filter, locale)}`;
              return (
                <button
                  key={filter}
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    if (filter !== tierFilter) playClick();
                    setTierFilter(filter);
                  }}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                    active
                      ? "bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {TIER_ORDER.filter((tier) => tierStats[tier].total > 0).map((tier) => {
              const { done, total } = tierStats[tier];
              return (
                <button
                  key={tier}
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    playClick();
                    setTierFilter(tier);
                  }}
                  className={`rounded-xl border px-2 py-1.5 text-start transition hover:bg-white/5 ${tierBadgeClass(tier)}`}
                  title={t("tierProgress", locale)}
                >
                  <span className="block truncate text-[10px] font-semibold">
                    {tierEmoji(tier)} {tierLabel(tier, locale)}
                  </span>
                  <span className="text-[10px] opacity-80">
                    {done}/{total}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3">
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

        <nav className="flex-1 space-y-2 overflow-y-auto p-2.5">
          {grouped.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-slate-500">
              {lessons.length === 0
                ? t("emptyTrack", locale)
                : t("noResults", locale)}
            </p>
          )}
          {grouped.map(({ tier, lessons: tierLessons }) => {
            const openTier = expandedTiers.has(tier);
            return (
              <div
                key={tier}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => toggleTier(tier)}
                  aria-expanded={openTier}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-start transition hover:bg-white/5"
                >
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-slate-400 transition-transform ${openTier ? "rotate-0" : "-rotate-90"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                      {tierEmoji(tier)} {tierLabel(tier, locale)}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] text-slate-500">
                      {tierBlurb(tier, locale)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${tierBadgeClass(tier)}`}
                  >
                    {tierStats[tier].done}/{tierStats[tier].total}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openTier && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 border-t border-white/5 px-1.5 py-1.5">
                        {tierLessons.map((lesson) => {
                          const Icon = iconMap[lesson.icon] ?? Box;
                          const active = lesson.id === activeLessonId;
                          const done = isComplete(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              tabIndex={open ? 0 : -1}
                              onClick={() => {
                                playClick();
                                setActiveLessonId(lesson.id);
                              }}
                              className={`group flex w-full items-start gap-3 rounded-2xl border px-3 py-2.5 text-start transition ${
                                active
                                  ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                                  : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                                  active
                                    ? "bg-gradient-to-br from-yellow-300 to-cyan-400 text-slate-950"
                                    : "bg-slate-800 text-slate-300 group-hover:text-yellow-200"
                                }`}
                              >
                                <Icon size={15} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="truncate text-sm font-medium text-slate-100">
                                    {lesson.order}.{" "}
                                    {loc(lesson.content.title, locale)}
                                  </span>
                                  {done ? (
                                    <CheckCircle2
                                      size={14}
                                      className="shrink-0 text-cyan-300"
                                    />
                                  ) : (
                                    <Circle
                                      size={14}
                                      className="shrink-0 text-slate-600"
                                    />
                                  )}
                                </span>
                                <span className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                                  {loc(lesson.content.summary, locale)}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
        </div>
      </div>
    </aside>
  );
}
