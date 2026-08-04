"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Clock3,
  Code2,
  Lightbulb,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { AccessibilityCard } from "@/components/lesson/AccessibilityCard";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { CheatSheetCards } from "@/components/lesson/CheatSheetCards";
import { CodeRunner } from "@/components/lesson/CodeRunner";
import { ComparePractice } from "@/components/lesson/ComparePractice";
import { DeepDive } from "@/components/lesson/DeepDive";
import { LessonChallenge } from "@/components/lesson/LessonChallenge";
import { Quiz } from "@/components/lesson/quiz/Quiz";
import { PitfallsBox } from "@/components/lesson/PitfallsBox";
import { SeoCallout } from "@/components/lesson/SeoCallout";
import { StickyLessonBar } from "@/components/lesson/StickyLessonBar";
import { UnderTheHood } from "@/components/lesson/UnderTheHood";
import { Visualizer } from "@/components/lesson/Visualizer";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";
import { tierBadgeClass, tierLabel } from "@/lib/tiers";
import type { Lesson } from "@/lib/types";

type LessonTab = "concept" | "live" | "quiz";

function ConceptPanel({
  lesson,
  onOpenLive,
  onOpenLiveWithCode,
}: {
  lesson: Lesson;
  onOpenLive?: () => void;
  onOpenLiveWithCode?: (code: string) => void;
}) {
  const { locale } = useLanguage();
  const { trackId } = useProgress();
  const { playClick } = useSound();
  const isCheatsheet = lesson.tier === "cheatsheet";
  const hasLive = Boolean(lesson.content.examples?.length);

  const deepDive = (
    <>
      <UnderTheHood section={lesson.content.underTheHood} embedded />
      <AccessibilityCard section={lesson.content.accessibility} />
      <SeoCallout section={lesson.content.seo} />

      {lesson.slug === "browser-compatibility" ? (
        <div className="space-y-4">
          {lesson.content.browserSupport ? (
            <BrowserSupport support={lesson.content.browserSupport} />
          ) : null}
          {lesson.content.browserMatrices?.map((matrix, index) => (
            <div key={`${matrix.label.en}-${index}`} className="space-y-2">
              <p className="px-1 text-sm font-semibold text-emerald-100">
                <RichText text={loc(matrix.label, locale)} />
              </p>
              <BrowserSupport support={matrix.support} />
            </div>
          ))}
        </div>
      ) : null}

      {lesson.content.compareCards?.length ? (
        <ComparePractice cards={lesson.content.compareCards} />
      ) : null}

      {lesson.content.pitfalls ? (
        <PitfallsBox pitfalls={lesson.content.pitfalls} />
      ) : null}
    </>
  );

  const hasDeepDive =
    lesson.content.underTheHood.paragraphs.length > 0 ||
    lesson.content.accessibility.paragraphs.length > 0 ||
    lesson.content.seo.paragraphs.length > 0 ||
    lesson.slug === "browser-compatibility" ||
    Boolean(lesson.content.compareCards?.length) ||
    Boolean(lesson.content.pitfalls);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-5">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6 xl:col-span-3">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-yellow-200">
            <Lightbulb size={16} />
            {t("explanation", locale)}
          </div>
          <div
            className={`space-y-4 text-[15px] text-slate-300 ${
              locale === "ar" ? "leading-[1.8]" : "leading-7"
            }`}
          >
            {lesson.content.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={loc(p, locale)} />
              </p>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              {t("keyPoints", locale)}
            </p>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((point, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 rounded-2xl border border-white/5 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 ${
                    locale === "ar" ? "leading-[1.75]" : "leading-snug"
                  }`}
                >
                  <Sparkles
                    size={14}
                    className="mt-0.5 shrink-0 text-yellow-300"
                  />
                  <span>
                    <RichText text={loc(point, locale)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {hasLive && onOpenLive ? (
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpenLive();
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3.5 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
            >
              <Code2 size={14} />
              {t("openInLive", locale)}
              <span aria-hidden className={`inline-block ${RTL_FLIP}`}>
                →
              </span>
            </button>
          ) : null}
        </section>

        <motion.section
          layout
          className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-slate-900/60 p-4 backdrop-blur-xl sm:p-5 xl:col-span-2 xl:sticky xl:top-20 xl:self-start"
        >
          <div className="relative z-10 flex flex-col">
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <Sparkles size={16} />
              {t("visualLab", locale)}
            </div>
            <p
              className={`mb-3 text-sm text-slate-300 ${
                locale === "ar" ? "leading-relaxed" : "leading-snug"
              }`}
            >
              <RichText text={loc(lesson.content.visualHint, locale)} />
            </p>
            <Visualizer trackId={trackId} kind={lesson.visualizer} />
          </div>
        </motion.section>
      </div>

      {isCheatsheet && lesson.content.cheatCards ? (
        <CheatSheetCards
          cards={lesson.content.cheatCards}
          onOpenInLive={
            hasLive && onOpenLiveWithCode ? onOpenLiveWithCode : undefined
          }
        />
      ) : null}

      {hasDeepDive ? <DeepDive>{deepDive}</DeepDive> : null}
    </div>
  );
}

/** Make CheatSheet snippets runnable in the track playground. */
function prepareCheatLiveCode(code: string, trackId: string): string {
  const trimmed = code.trim();
  if (
    trackId === "css" &&
    trimmed.length > 0 &&
    !/<\/?[a-zA-Z!]/.test(trimmed)
  ) {
    return `<style>
${trimmed}
</style>
<div class="row" style="padding:1rem;font-family:system-ui,sans-serif">
  <button class="btn" type="button">Button</button>
  <div class="card" style="margin-top:1rem;padding:1rem;border:1px solid #94a3b8;border-radius:8px">Card</div>
  <h1 style="margin-top:1rem">Heading</h1>
  <aside class="sidebar" style="margin-top:1rem">Sidebar</aside>
  <div class="grid" style="margin-top:1rem">
    <div style="background:#e0f2fe;padding:8px;border-radius:6px">1</div>
    <div style="background:#fef9c3;padding:8px;border-radius:6px">2</div>
  </div>
</div>`;
  }
  return trimmed;
}

function LessonBody({ lesson }: { lesson: Lesson }) {
  const { locale, dir } = useLanguage();
  const { lessons, markComplete, isComplete, trackId } = useProgress();
  const { playClick, playSuccess } = useSound();
  const hasLive = Boolean(lesson.content.examples?.length);
  const hasQuiz = Boolean(lesson.content.quiz || lesson.content.challenge);
  const [tab, setTab] = useState<LessonTab>("concept");
  const [liveSeed, setLiveSeed] = useState<string | null>(null);
  const [challengePassed, setChallengePassed] = useState(
    () => !hasQuiz || isComplete(lesson.id),
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs = useMemo(() => {
    const list: {
      id: LessonTab;
      label: string;
      icon: typeof BookOpen;
    }[] = [
      {
        id: "concept",
        label: t("lessonTabConcept", locale),
        icon: BookOpen,
      },
      {
        id: "live",
        label: t("lessonTabLive", locale),
        icon: Code2,
      },
      {
        id: "quiz",
        label: t("lessonTabQuiz", locale),
        icon: ListChecks,
      },
    ];
    return hasQuiz ? list : list.filter((item) => item.id !== "quiz");
  }, [locale, hasQuiz]);

  useEffect(() => {
    setTab("concept");
    setLiveSeed(null);
    setChallengePassed(!hasQuiz || isComplete(lesson.id));
  }, [lesson.id, hasQuiz, isComplete]);

  const selectTab = useCallback(
    (next: LessonTab) => {
      setTab((current) => {
        if (next === current) return current;
        playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return next;
      });
    },
    [playClick],
  );

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = tabs.findIndex((item) => item.id === tab);
    if (index < 0) return;
    const last = tabs.length - 1;
    let nextIndex = index;
    const goNext =
      (event.key === "ArrowRight" && dir === "ltr") ||
      (event.key === "ArrowLeft" && dir === "rtl");
    const goPrev =
      (event.key === "ArrowLeft" && dir === "ltr") ||
      (event.key === "ArrowRight" && dir === "rtl");
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else if (goNext) nextIndex = index === last ? 0 : index + 1;
    else if (goPrev) nextIndex = index === 0 ? last : index - 1;
    const next = tabs[nextIndex];
    selectTab(next.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      className="space-y-5 pb-24"
    >
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierBadgeClass(lesson.tier)}`}
          >
            {tierLabel(lesson.tier, locale)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Clock3 size={12} />
            {lesson.readMinutes} {t("readTime", locale)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <BookOpen size={12} />
            <span dir="ltr">
              {lesson.order}/{lessons.length}
            </span>
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <RichText text={loc(lesson.content.title, locale)} />
        </h1>
        <p
          className={`max-w-3xl text-base text-slate-300 sm:text-[17px] ${
            locale === "ar" ? "leading-[1.8]" : "leading-relaxed"
          }`}
        >
          <RichText text={loc(lesson.content.summary, locale)} />
        </p>
      </header>

      <div
        role="tablist"
        aria-label={t("lessonTablist", locale)}
        onKeyDown={onTabKeyDown}
        className="sticky top-12 z-30 -mx-1 flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90 p-1.5 backdrop-blur-xl sm:top-14"
      >
        {tabs.map((item, index) => {
          const active = tab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              id={`lesson-tab-${item.id}`}
              aria-controls={`lesson-panel-${item.id}`}
              onClick={() => selectTab(item.id)}
              className={`relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon size={15} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          role="tabpanel"
          id={`lesson-panel-${tab}`}
          aria-labelledby={`lesson-tab-${tab}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {tab === "concept" ? (
            <ConceptPanel
              lesson={lesson}
              onOpenLive={
                hasLive
                  ? () => {
                      setLiveSeed(null);
                      selectTab("live");
                    }
                  : undefined
              }
              onOpenLiveWithCode={
                hasLive
                  ? (code) => {
                      setLiveSeed(prepareCheatLiveCode(code, trackId));
                      selectTab("live");
                    }
                  : undefined
              }
            />
          ) : null}

          {tab === "live" ? (
            hasLive ? (
              <CodeRunner
                key={`runner-${lesson.id}`}
                examples={lesson.content.examples!}
                seedCode={liveSeed}
                onClearSeed={() => setLiveSeed(null)}
              />
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center text-sm text-slate-500">
                {t("lessonTabLiveEmpty", locale)}
              </p>
            )
          ) : null}

          {tab === "quiz" ? (
            lesson.content.quiz ? (
              <Quiz
                key={`quiz-${lesson.id}`}
                quiz={lesson.content.quiz}
                onComplete={() => {
                  setChallengePassed(true);
                  markComplete(lesson.id);
                  playSuccess();
                }}
              />
            ) : lesson.content.challenge ? (
              <LessonChallenge
                key={`challenge-${lesson.id}`}
                challenge={lesson.content.challenge}
                onAnswered={(ok) => {
                  if (ok) {
                    setChallengePassed(true);
                    markComplete(lesson.id);
                  }
                }}
              />
            ) : null
          ) : null}
        </motion.div>
      </AnimatePresence>

      <StickyLessonBar
        lesson={lesson}
        challengePassed={challengePassed}
        onOpenQuiz={hasQuiz ? () => selectTab("quiz") : undefined}
      />
    </motion.div>
  );
}

export function LessonContent() {
  const { lessons, activeLessonId } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activeLessonId]);

  if (lessons.length === 0) {
    return null;
  }

  const lesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  return (
    <AnimatePresence mode="wait">
      <LessonBody key={lesson.id} lesson={lesson} />
    </AnimatePresence>
  );
}
