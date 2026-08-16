"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  AlertOctagon,
  AlertTriangle,
  AppWindow,
  ArrowLeftRight,
  Blocks,
  BookCopy,
  Box,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clapperboard,
  Columns2,
  Cpu,
  Ear,
  Eye,
  FileCode,
  FileText,
  Film,
  Globe,
  HeartHandshake,
  Focus,
  FormInput,
  Gauge,
  Gift,
  Heading,
  Highlighter,
  Images,
  Keyboard,
  Languages,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Link2,
  List,
  ListFilter,
  ListTree,
  MonitorCheck,
  Move,
  Network,
  NotebookTabs,
  Paintbrush,
  Palette,
  PanelLeftClose,
  Radar,
  Ruler,
  Scale,
  Search,
  Share2,
  Shield,
  Sparkles,
  Square,
  Table,
  Tablet,
  Target,
  Timer,
  Trophy,
  Type,
  Variable,
  Volume2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { getTrack } from "@/content/tracks";
import { RichText } from "@/components/shared/RichText";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import {
  TIER_FILTERS,
  TIER_ORDER,
  tierBadgeClass,
  tierBlurb,
  tierDotClass,
  tierEmoji,
  tierFilterActiveClass,
  tierFilterIdleClass,
  tierLabel,
  type TierFilter,
} from "@/lib/tiers";
import { isLevelQuizLesson } from "@/lib/level-quiz/capstones";
import type { Tier } from "@/lib/types";

/** Inner content width — outer `.lessons-panel` clips while animating. */
const SIDEBAR_INNER = "22rem";
const SIDEBAR_INNER_POPOVER = "min(22rem, 90vw)";

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
  FileText,
  LayoutTemplate,
  Type,
  Heading,
  Highlighter,
  Link2,
  List,
  FormInput,
  Table,
  Accessibility,
  Ear,
  Eye,
  Globe,
  HeartHandshake,
  Search,
  Clapperboard,
  Gauge,
  Zap,
  Cpu,
  AlertTriangle,
  AlertOctagon,
  BookCopy,
  NotebookTabs,
  Keyboard,
  MonitorCheck,
  AppWindow,
  ListTree,
  Images,
  Share2,
  Volume2,
  Blocks,
  Shield,
  Radar,
  Languages,
  Ruler,
  Palette,
  Square,
  Paintbrush,
  Columns2,
  LayoutGrid,
  Move,
  Tablet,
  Variable,
  Sparkles,
  Film,
  ArrowLeftRight,
  Trophy,
};

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const {
    lessons,
    activeLessonId,
    setActiveLessonId,
    isComplete,
    progressPercent,
    completedCount,
    totalCount,
    trackId,
  } = useProgress();
  const { playClick } = useSound();
  const track = useMemo(() => getTrack(trackId), [trackId]);
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [expandedTiers, setExpandedTiers] = useState<Set<Tier>>(() => new Set());

  function selectLesson(lesson: (typeof lessons)[number]) {
    playClick();
    setActiveLessonId(lesson.id);
    router.replace(`/${trackId}/learn?lesson=${lesson.slug}`, { scroll: false });
    if (
      open &&
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      // Let the lesson paint first, then slide the menu out (avoids a close flash).
      window.setTimeout(() => onToggle(), 40);
    }
  }

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

  useEffect(() => {
    if (!activeLessonId || !open) return;
    const el = document.querySelector<HTMLElement>(
      `[data-lesson-id="${activeLessonId}"]`,
    );
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeLessonId, open]);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onToggle();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onToggle]);

  const [isPopover, setIsPopover] = useState(false);
  /** Skip the first paint so mount↔media sync doesn’t flash a fake open animation. */
  const [panelReady, setPanelReady] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsPopover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const readyId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPanelReady(true));
    });
    return () => {
      mq.removeEventListener("change", sync);
      window.cancelAnimationFrame(readyId);
    };
  }, []);

  const reduce = useReducedMotion();
  const panelOpen = open;

  /** Keep body mounted while the CSS width/slide (~820ms) finishes closing. */
  const [showPanelBody, setShowPanelBody] = useState(panelOpen);
  useEffect(() => {
    if (panelOpen) {
      setShowPanelBody(true);
      return;
    }
    if (reduce) {
      setShowPanelBody(false);
      return;
    }
    const id = window.setTimeout(() => setShowPanelBody(false), 850);
    return () => window.clearTimeout(id);
  }, [panelOpen, reduce]);

  return (
    <>
      <AnimatePresence>
        {panelOpen && isPopover ? (
          <motion.button
            key="lessons-backdrop"
            type="button"
            aria-label={t("closeMenu", locale)}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.55, ease: [0.45, 0.05, 0.25, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            }}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-md lg:hidden"
            onClick={() => {
              playClick();
              onToggle();
            }}
          />
        ) : null}
      </AnimatePresence>

      <aside
        className={`lessons-panel ${panelOpen ? "is-open" : "is-closed"}${
          panelReady && !reduce ? " is-ready" : ""
        }`}
      >
        <div
          className="flex h-full flex-col"
          style={{
            width: isPopover ? SIDEBAR_INNER_POPOVER : SIDEBAR_INNER,
          }}
        >
          <div className="relative flex h-12 shrink-0 items-center border-b border-white/10">
            <p
              className={`min-w-0 px-3 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-500 ease-out ${
                panelOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!panelOpen}
            >
              <span className="text-white">{loc(track.title, locale)}</span>
              <span className="text-slate-600"> · </span>
              <span className="text-cyan-300">{t("lessons", locale)}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                playClick();
                onToggle();
              }}
              className={`absolute top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-[inset-inline,background-color] duration-700 ease-[cubic-bezier(0.45,0.05,0.25,1)] hover:bg-white/10 ${
                panelOpen ? "end-3" : "start-1"
              }`}
              aria-label={
                panelOpen ? t("closeMenu", locale) : t("openMenu", locale)
              }
              aria-expanded={panelOpen}
            >
              <PanelLeftClose
                size={16}
                className={`transition-transform duration-700 ease-[cubic-bezier(0.45,0.05,0.25,1)] ${
                  panelOpen
                    ? "rotate-0 rtl:rotate-180"
                    : "rotate-180 rtl:rotate-0"
                }`}
              />
            </button>
          </div>

          <div
            className={`min-h-0 flex-1 flex-col transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.45,0.05,0.25,1)] ${
              showPanelBody ? "flex" : "hidden"
            } ${
              panelOpen
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0 rtl:translate-x-2"
            }`}
            aria-hidden={!panelOpen}
            style={{
              transitionDelay: reduce ? "0ms" : panelOpen ? "180ms" : "0ms",
            }}
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
                  tabIndex={panelOpen ? 0 : -1}
                />
              </div>

              <div
                role="toolbar"
                aria-label={t("lessons", locale)}
                className="mt-2.5 grid grid-cols-3 gap-1.5"
              >
                {TIER_FILTERS.map((filter) => {
                  const active = tierFilter === filter;
                  const label =
                    filter === "all"
                      ? t("filterAll", locale)
                      : tierLabel(filter, locale);
                  const count =
                    filter === "all"
                      ? totalCount
                      : (tierStats[filter]?.total ?? 0);
                  return (
                    <button
                      key={filter}
                      type="button"
                      tabIndex={panelOpen ? 0 : -1}
                      aria-pressed={active}
                      title={label}
                      onClick={() => {
                        if (filter !== tierFilter) playClick();
                        setTierFilter(filter);
                      }}
                      className={`group flex min-w-0 items-center justify-center gap-1 rounded-lg border px-1.5 py-1.5 text-[10px] font-semibold tracking-wide transition duration-200 ${
                        active
                          ? tierFilterActiveClass(filter)
                          : tierFilterIdleClass(filter)
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          active ? "bg-slate-950/45" : tierDotClass(filter)
                        }`}
                        aria-hidden
                      />
                      <span className="truncate">{label}</span>
                      <span
                        className={`tabular-nums ${
                          active
                            ? "text-slate-950/55"
                            : "text-current opacity-45"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <div className="mb-1 flex justify-between text-[11px] text-slate-400">
                  <span>{t("progress", locale)}</span>
                  <span dir="ltr">
                    {completedCount}/{totalCount} · {progressPercent}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800 rtl:rotate-180">
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
                      tabIndex={panelOpen ? 0 : -1}
                      onClick={() => toggleTier(tier)}
                      aria-expanded={openTier}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-start transition hover:bg-white/5"
                    >
                      <ChevronDown
                        size={14}
                        className={`shrink-0 text-slate-400 transition-transform ${
                          openTier
                            ? "rotate-0"
                            : "ltr:-rotate-90 rtl:rotate-90"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                          {tierEmoji(tier)} {tierLabel(tier, locale)}
                        </span>
                        <span className="mt-0.5 block text-[10px] leading-snug text-slate-400">
                          {tierBlurb(tier, locale, trackId)}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${tierBadgeClass(tier)}`}
                        dir="ltr"
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
                                  data-lesson-id={lesson.id}
                                  tabIndex={panelOpen ? 0 : -1}
                                  onClick={() => selectLesson(lesson)}
                                  className={`group flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-start transition ${
                                    active
                                      ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                                      : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
                                  }`}
                                >
                                  <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                      active
                                        ? "bg-gradient-to-br from-yellow-300 to-cyan-400 text-slate-950"
                                        : "bg-slate-800 text-slate-300 group-hover:text-yellow-200"
                                    }`}
                                  >
                                    <Icon size={14} />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2">
                                      <span className="truncate text-sm font-medium text-slate-100">
                                        {lesson.order}.{" "}
                                        <RichText
                                          text={loc(lesson.content.title, locale)}
                                        />
                                      </span>
                                      {isLevelQuizLesson(lesson) ? (
                                        done ? (
                                          <CheckCircle2
                                            size={14}
                                            className="shrink-0 text-cyan-300"
                                          />
                                        ) : (
                                          <Trophy
                                            size={14}
                                            className="shrink-0 text-yellow-300"
                                            aria-label={t("lessonTabLevelQuiz", locale)}
                                          />
                                        )
                                      ) : done ? (
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
                                    {active ? (
                                      <span className="mt-0.5 block text-[11px] leading-snug text-slate-400">
                                        <RichText
                                          text={loc(
                                            lesson.content.summary,
                                            locale,
                                          )}
                                        />
                                      </span>
                                    ) : null}
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
    </>
  );
}
