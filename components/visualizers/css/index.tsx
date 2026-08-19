"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TrackStage,
  labEase,
  labSpring,
} from "@/components/visualizers/html/TrackStage";
import { useAutoPlay } from "@/components/shared/PlayPauseButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { LAB_LOOP_S, LAB_STEP_MS } from "@/lib/motion-pace";
import type { Locale } from "@/lib/types";
import { FrontendTipsPanel } from "@/components/shared/FrontendTipsPanel";

type Cap = { en: string; ar: string };

type Step = {
  caption: Cap;
  visual: ReactNode;
};

function pick(cap: Cap, locale: Locale) {
  return locale === "ar" ? cap.ar : cap.en;
}

function StepDots({
  count,
  active,
}: {
  count: number;
  active: number;
}) {
  return (
    <div className="mt-2 flex shrink-0 justify-center gap-1.5" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === active
              ? "w-5 bg-cyan-300"
              : "w-1.5 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

/** Shared timed shell: play/pause + descriptive caption + no-scroll stage. */
function CssLab({
  title,
  steps,
  footer,
  showCaption = true,
}: {
  title: Cap;
  steps: Step[];
  footer?: ReactNode;
  showCaption?: boolean;
}) {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % steps.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing, steps.length]);

  const current = steps[step] ?? steps[0];

  return (
    <TrackStage
      playing={playing}
      onTogglePlay={toggle}
      title={pick(title, locale)}
      caption={showCaption ? pick(current.caption, locale) : undefined}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: labEase }}
              className="flex h-full w-full max-w-xl flex-col items-center justify-center"
            >
              {current.visual}
            </motion.div>
          </AnimatePresence>
        </div>
        <StepDots count={steps.length} active={step} />
        {footer ? (
          <div className="min-h-0 flex-1 overflow-y-auto pt-2">{footer}</div>
        ) : null}
      </div>
    </TrackStage>
  );
}

function DemoCard({
  children,
  className = "",
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl border border-white/15 bg-slate-900/80 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-cyan-300/25 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-100">
      {children}
    </span>
  );
}

/* ─── Labs ─────────────────────────────────────────────────────────────── */

export function CascadeLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Cascade & specificity", ar: "الـ Cascade و Specificity" }}
      steps={[
        {
          caption: {
            en: "Three rules hit the same paragraph — watch which color wins.",
            ar: "ثلاث قواعد على نفس الفقرة — شوف أنهي لون بيكسب.",
          },
          visual: (
            <div className="w-full space-y-3">
              <div className="flex flex-wrap gap-2 text-[11px]">
                <Tag>p {"{ color: steelblue }"}</Tag>
                <Tag>.note {"{ color: tomato }"}</Tag>
                <Tag>#hero {"{ color: gold }"}</Tag>
              </div>
              <DemoCard className="p-4 text-center text-lg font-semibold text-slate-400">
                Waiting…
              </DemoCard>
            </div>
          ),
        },
        {
          caption: {
            en: "Element selector (`p`) applies first — lowest specificity.",
            ar: "Selector العنصر (`p`) يتطبّق الأول — أقل `specificity`.",
          },
          visual: (
            <DemoCard className="w-full p-5 text-center text-lg font-semibold text-sky-300">
              steelblue from `p`
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "Class (`.note`) beats the element selector.",
            ar: "الـ `class` (`.note`) بتكسب Selector العنصر.",
          },
          visual: (
            <DemoCard className="w-full p-5 text-center text-lg font-semibold text-orange-300">
              tomato from `.note`
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "ID (`#hero`) wins the cascade — highest of these three.",
            ar: "الـ `ID` (`#hero`) بيكسب الـ `cascade` — الأعلى هنا.",
          },
          visual: (
            <DemoCard className="w-full p-5 text-center text-lg font-semibold text-amber-200 shadow-[0_0_24px_rgba(251,191,36,0.25)]">
              gold from `#hero` wins
            </DemoCard>
          ),
        },
      ]}
    />
  );
}

export function BoxModelLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Box model", ar: "نموذج الصندوق" }}
      steps={[
        {
          caption: {
            en: "Content sits in the middle — text and media live here.",
            ar: "الـ `content` في النص — النص والميديا هنا.",
          },
          visual: (
            <div className="flex h-44 w-56 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-400/15 font-mono text-xs text-cyan-50">
              content
            </div>
          ),
        },
        {
          caption: {
            en: "`padding` adds space inside the border — breathing room.",
            ar: "`padding` بيزوّد مسافة جوّه الـ `border`.",
          },
          visual: (
            <div className="flex h-48 w-64 items-center justify-center rounded-lg border-4 border-amber-300/50 bg-amber-400/10 p-6">
              <div className="flex h-full w-full items-center justify-center rounded bg-cyan-400/20 font-mono text-xs text-cyan-50">
                + padding
              </div>
            </div>
          ),
        },
        {
          caption: {
            en: "`border` draws the edge; `margin` pushes neighbors away.",
            ar: "`border` بيرسم الحافة؛ `margin` بيبعد الجيران.",
          },
          visual: (
            <div className="flex h-52 w-72 items-center justify-center rounded-xl border border-dashed border-fuchsia-300/40 bg-fuchsia-400/5 p-4">
              <div className="flex h-full w-full items-center justify-center rounded-lg border-4 border-amber-300/55 bg-amber-400/10 p-4">
                <div className="flex h-full w-full items-center justify-center rounded bg-cyan-400/20 font-mono text-[11px] text-cyan-50">
                  margin · border · padding · content
                </div>
              </div>
            </div>
          ),
        },
        {
          caption: {
            en: "`box-sizing: border-box` keeps declared width including padding + border.",
            ar: "`box-sizing: border-box` بيخلي الـ `width` يشمل `padding` و `border`.",
          },
          visual: (
            <div className="w-full max-w-sm space-y-2 text-center">
              <DemoCard className="border-emerald-300/40 bg-emerald-400/10 p-3 font-mono text-xs text-emerald-100">
                width: 220px · border-box → stays 220px
              </DemoCard>
              <DemoCard className="border-rose-300/35 bg-rose-400/10 p-3 font-mono text-xs text-rose-100">
                content-box → grows past 220px
              </DemoCard>
            </div>
          ),
        },
      ]}
    />
  );
}

export function SizingLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Units & sizing", ar: "الوحدات والمقاسات" }}
      steps={[
        {
          caption: {
            en: "`px` is fixed — great for crisp borders, stiff for fluid type.",
            ar: "`px` ثابت — ممتاز للحدود الدقيقة، صلب للخطوط السائلة.",
          },
          visual: (
            <p className="text-center font-semibold text-white" style={{ fontSize: 28 }}>
              28px heading
            </p>
          ),
        },
        {
          caption: {
            en: "`rem` scales with the root font size — safer for spacing + type.",
            ar: "`rem` بيكبر مع خط الـ `root` — أأمن للخطوط والمسافات.",
          },
          visual: (
            <div className="space-y-2 text-center">
              <p className="text-2xl font-semibold text-cyan-100">2rem title</p>
              <p className="text-sm text-slate-300">1rem body · scales together</p>
            </div>
          ),
        },
        {
          caption: {
            en: "`clamp(min, preferred, max)` keeps type fluid but bounded.",
            ar: "`clamp(min, preferred, max)` بيخلي الخط سائل بس بحدود.",
          },
          visual: (
            <motion.p
              className="text-center font-bold text-amber-100"
              animate={{ fontSize: ["1.5rem", "2.75rem", "1.5rem"] }}
              transition={{ duration: LAB_LOOP_S * 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              clamp(1.5rem, 7vw, 3rem)
            </motion.p>
          ),
        },
        {
          caption: {
            en: "Pair fluid width with `max-width` so layouts never stretch forever.",
            ar: "اربط العرض السائل بـ `max-width` عشان الـ `layout` متتمدش للأبد.",
          },
          visual: (
            <div className="w-full max-w-md rounded-xl border border-white/15 bg-slate-950/60 p-3">
              <div className="mx-auto w-[min(92%,18rem)] rounded-lg bg-cyan-400/20 px-3 py-4 text-center font-mono text-[11px] text-cyan-50">
                width: min(92%, 18rem)
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

export function TypeColorLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Color & typography", ar: "الألوان والـ Typography" }}
      steps={[
        {
          caption: {
            en: "Readable body type needs comfortable `line-height` (about 1.5–1.7).",
            ar: "النص المقروء محتاج `line-height` مريحة (حوالي 1.5–1.7).",
          },
          visual: (
            <p className="max-w-sm text-sm leading-[1.65] text-slate-200">
              Comfortable reading rhythm gives every line room to breathe — not cramped, not sparse.
            </p>
          ),
        },
        {
          caption: {
            en: "Semantic color tokens keep meaning consistent (danger stays danger).",
            ar: "`color tokens` المعنوية بتخلي المعنى ثابت (الخطر يفضل خطر).",
          },
          visual: (
            <div className="flex flex-wrap justify-center gap-2">
              {[
                ["--text", "#e2e8f0"],
                ["--accent", "#38bdf8"],
                ["--danger", "#fb7185"],
              ].map(([name, color]) => (
                <div
                  key={name}
                  className="rounded-lg border border-white/15 px-3 py-2 text-center font-mono text-[11px]"
                  style={{ background: `${color}22`, color }}
                >
                  {name}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "Low contrast looks stylish — until you cannot read outdoors.",
            ar: "التباين الضعيف شكله شيك — لحد ما متنفعش تقرأ في الشمس.",
          },
          visual: (
            <div className="grid w-full max-w-sm gap-2 sm:grid-cols-2">
              <DemoCard className="bg-slate-700 p-3 text-center text-xs text-slate-500">
                weak contrast ✗
              </DemoCard>
              <DemoCard className="bg-slate-900 p-3 text-center text-xs text-cyan-100">
                strong contrast ✓
              </DemoCard>
            </div>
          ),
        },
      ]}
    />
  );
}

export function FlowLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Display & flow", ar: "الـ Display و Flow" }}
      steps={[
        {
          caption: {
            en: "`block` takes the full row and stacks vertically.",
            ar: "`block` بياخد الصف كامل وبيتكدّس رأسي.",
          },
          visual: (
            <div className="w-56 space-y-1.5">
              <div className="rounded bg-cyan-400/30 px-2 py-2 font-mono text-[10px]">block A</div>
              <div className="rounded bg-cyan-400/30 px-2 py-2 font-mono text-[10px]">block B</div>
            </div>
          ),
        },
        {
          caption: {
            en: "`inline` sits in the text flow — width follows content.",
            ar: "`inline` بيقعد في تدفق النص — العرض حسب المحتوى.",
          },
          visual: (
            <p className="max-w-xs text-sm text-slate-200">
              Text with{" "}
              <span className="rounded bg-amber-400/30 px-1 font-mono text-amber-50">
                inline
              </span>{" "}
              chips in a sentence.
            </p>
          ),
        },
        {
          caption: {
            en: "`inline-block` keeps flow but accepts width / height.",
            ar: "`inline-block` بيفضل في السطر وبيقبل `width` / `height`.",
          },
          visual: (
            <div className="flex flex-wrap gap-2">
              {["card", "chip", "tile"].map((label) => (
                <div
                  key={label}
                  className="inline-flex h-14 w-20 items-center justify-center rounded-lg border border-emerald-300/40 bg-emerald-400/15 font-mono text-[10px] text-emerald-50"
                >
                  {label}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "`none` removes the box from layout entirely — not just invisible.",
            ar: "`none` بيشيل الصندوق من الـ `layout` تمامًا — مش إخفاء بس.",
          },
          visual: (
            <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
              <span className="rounded bg-white/10 px-2 py-2">A</span>
              <span className="rounded border border-dashed border-rose-300/40 px-2 py-2 text-rose-200/70 line-through">
                B display:none
              </span>
              <span className="rounded bg-white/10 px-2 py-2">C</span>
            </div>
          ),
        },
      ]}
    />
  );
}

export function SurfaceLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Backgrounds & borders", ar: "الخلفيات والحدود" }}
      steps={[
        {
          caption: {
            en: "`background` paints behind content — color, image, or gradient.",
            ar: "`background` بيرسم ورا المحتوى — لون أو صورة أو تدرج.",
          },
          visual: (
            <div className="h-36 w-64 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-slate-800 to-amber-400/30 shadow-inner" />
          ),
        },
        {
          caption: {
            en: "`border` affects layout size; `outline` never shifts neighbors.",
            ar: "`border` بيأثر على المقاس؛ `outline` مبتزحزحش الجيران.",
          },
          visual: (
            <div className="flex gap-4">
              <div className="flex h-24 w-28 items-center justify-center rounded-lg border-4 border-amber-300/70 bg-slate-900 font-mono text-[10px] text-amber-100">
                border
              </div>
              <div className="flex h-24 w-28 items-center justify-center rounded-lg bg-slate-900 font-mono text-[10px] text-cyan-100 outline outline-4 outline-cyan-300/70">
                outline
              </div>
            </div>
          ),
        },
        {
          caption: {
            en: "`border-radius` softens corners — keeps the same box model.",
            ar: "`border-radius` بينعّم الزوايا — نفس نموذج الصندوق.",
          },
          visual: (
            <motion.div
              className="h-32 w-48 border-2 border-fuchsia-300/50 bg-fuchsia-400/15"
              animate={{ borderRadius: ["4px", "28px", "4px"] }}
              transition={{ duration: LAB_LOOP_S * 1.2, repeat: Infinity }}
            />
          ),
        },
      ]}
    />
  );
}

export function FlexboxLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Flexbox", ar: "Flexbox" }}
      steps={[
        {
          caption: {
            en: "`display: flex` lays children on one main axis (row by default).",
            ar: "`display: flex` بيرص الأبناء على محور رئيسي (صف افتراضيًا).",
          },
          visual: (
            <div className="flex w-72 gap-2 rounded-xl border border-white/15 bg-slate-950/50 p-3">
              {["1", "2", "3"].map((n) => (
                <div
                  key={n}
                  className="flex h-14 flex-1 items-center justify-center rounded-lg bg-cyan-400/25 font-mono text-sm text-cyan-50"
                >
                  {n}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "`justify-content` distributes free space on the main axis.",
            ar: "`justify-content` بيوزّع المسافة الفاضية على المحور الرئيسي.",
          },
          visual: (
            <div className="flex w-72 justify-between gap-2 rounded-xl border border-white/15 bg-slate-950/50 p-3">
              {["A", "B", "C"].map((n) => (
                <div
                  key={n}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400/25 font-mono text-sm text-amber-50"
                >
                  {n}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "`align-items` controls the cross axis — stretch, center, end…",
            ar: "`align-items` بيتحكم في المحور العرضي — stretch أو center أو end…",
          },
          visual: (
            <div className="flex h-28 w-72 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/50 p-3">
              <div className="h-10 w-12 rounded-lg bg-emerald-400/30" />
              <div className="h-20 w-12 rounded-lg bg-emerald-400/30" />
              <div className="h-14 w-12 rounded-lg bg-emerald-400/30" />
            </div>
          ),
        },
        {
          caption: {
            en: "`flex-wrap` + `gap` let rows reflow without margin hacks.",
            ar: "`flex-wrap` و `gap` بيخلّوا الصفوف تلف من غير لَفّات `margin`.",
          },
          visual: (
            <div className="flex w-64 flex-wrap gap-2 rounded-xl border border-white/15 bg-slate-950/50 p-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="flex h-10 w-[30%] items-center justify-center rounded-md bg-fuchsia-400/25 font-mono text-[10px] text-fuchsia-50"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}

export function GridLabVisualizer() {
  return (
    <CssLab
      title={{ en: "CSS Grid", ar: "CSS Grid" }}
      steps={[
        {
          caption: {
            en: "`grid-template-columns` defines lab sizes across the row.",
            ar: "`grid-template-columns` بتحدد مقاسات الأعمدة.",
          },
          visual: (
            <div className="grid w-72 grid-cols-3 gap-2">
              {["1fr", "1fr", "1fr"].map((label, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-lg border border-cyan-300/35 bg-cyan-400/15 font-mono text-[10px] text-cyan-50"
                >
                  {label}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "`repeat(auto-fit, minmax(…))` builds responsive columns automatically.",
            ar: "`repeat(auto-fit, minmax(…))` بيعمل أعمدة متجاوبة لوحدها.",
          },
          visual: (
            <div className="grid w-full max-w-sm grid-cols-2 gap-2 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="flex h-12 items-center justify-center rounded-lg bg-amber-400/20 font-mono text-[10px] text-amber-50"
                >
                  cell {i + 1}
                </div>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "Items can span tracks — perfect for featured cards.",
            ar: "العناصر تقدر تمتد على كذا `track` — ممتاز للكروت المميزة.",
          },
          visual: (
            <div className="grid w-72 grid-cols-3 grid-rows-2 gap-2">
              <div className="col-span-2 row-span-2 flex items-center justify-center rounded-xl bg-emerald-400/25 font-mono text-xs text-emerald-50">
                span 2×2
              </div>
              <div className="rounded-lg bg-white/10" />
              <div className="rounded-lg bg-white/10" />
            </div>
          ),
        },
      ]}
    />
  );
}

export function PositioningLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Positioning", ar: "الـ Positioning" }}
      steps={[
        {
          caption: {
            en: "`static` is the default — offsets like `top` do nothing.",
            ar: "`static` هو الافتراضي — قيم زي `top` مابتتعملش.",
          },
          visual: (
            <DemoCard className="relative h-36 w-64 p-3">
              <div className="rounded bg-white/10 px-2 py-1 font-mono text-[10px]">
                static in flow
              </div>
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "`relative` keeps the spot in flow, then nudges with offsets.",
            ar: "`relative` بيفضل مكانه في الـ flow وبعدين بيتحرك بالـ offsets.",
          },
          visual: (
            <DemoCard className="relative h-36 w-64 p-3">
              <motion.div
                className="absolute rounded bg-cyan-400/30 px-2 py-1 font-mono text-[10px] text-cyan-50"
                animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
                transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
              >
                relative + top/left
              </motion.div>
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "`absolute` leaves flow and anchors to the nearest positioned ancestor.",
            ar: "`absolute` بيخرج من الـ flow وبيترسّى على أقرب جد `positioned`.",
          },
          visual: (
            <DemoCard className="relative h-36 w-64 p-3">
              <div className="h-full rounded border border-dashed border-white/20" />
              <span className="absolute end-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 font-mono text-[10px] text-slate-950">
                badge
              </span>
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "`sticky` scrolls with the page until it hits the threshold — then sticks.",
            ar: "`sticky` بيتحرك مع الـ scroll لحد العتبة — وبعدين بيلزق.",
          },
          visual: (
            <DemoCard className="h-40 w-64 overflow-hidden p-0">
              <div className="sticky top-0 z-10 border-b border-cyan-300/40 bg-cyan-400/25 px-3 py-1.5 font-mono text-[10px] text-cyan-50">
                sticky header
              </div>
              <div className="space-y-2 p-3">
                <div className="h-3 rounded bg-white/10" />
                <div className="h-3 w-4/5 rounded bg-white/10" />
                <div className="h-3 w-3/5 rounded bg-white/10" />
              </div>
            </DemoCard>
          ),
        },
      ]}
    />
  );
}

export function ResponsiveLabVisualizer() {
  const [width, setWidth] = useState(92);
  const { playing, toggle } = useAutoPlay(true);
  const reduce = useReducedMotion();
  const { locale } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % 3);
      setWidth((w) => (w === 92 ? 58 : w === 58 ? 36 : 92));
    }, LAB_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const captions: Cap[] = [
    {
      en: "Wide viewport — multi-column layout fits comfortably.",
      ar: "شاشة واسعة — الـ layout متعدد الأعمدة مرتاح.",
    },
    {
      en: "Medium width — `media queries` start simplifying the layout.",
      ar: "عرض متوسط — الـ `media queries` بتبسّط الـ layout.",
    },
    {
      en: "Narrow phone width — stack columns; keep tap targets large.",
      ar: "عرض موبايل ضيق — كدّس الأعمدة؛ خلّي أماكن اللمس كبيرة.",
    },
  ];

  const cols = step === 0 ? 3 : step === 1 ? 2 : 1;

  return (
    <TrackStage
      playing={playing}
      onTogglePlay={toggle}
      title={pick({ en: "Responsive media", ar: "التجاوب والـ Media" }, locale)}
      caption={pick(captions[step], locale)}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div
          className="overflow-hidden rounded-xl border border-white/15 bg-slate-950/70 p-3 transition-all duration-500"
          style={{ width: `${width}%` }}
        >
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: cols }, (_, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center rounded-lg bg-cyan-400/20 font-mono text-[10px] text-cyan-50"
              >
                col {i + 1}
              </div>
            ))}
          </div>
        </div>
        <p className="font-mono text-[11px] text-slate-400">
          preview ≈ {width}% · {cols} column{cols > 1 ? "s" : ""}
        </p>
        <StepDots count={3} active={step} />
      </div>
    </TrackStage>
  );
}

export function VariablesLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Custom properties", ar: "الـ Custom Properties" }}
      steps={[
        {
          caption: {
            en: "Define tokens once on `:root` — reuse them everywhere.",
            ar: "عرّف الـ tokens مرة على `:root` — واستخدمها في كل حتة.",
          },
          visual: (
            <DemoCard className="w-72 space-y-1 p-4 font-mono text-[11px] text-cyan-100">
              <p>:root {"{"}</p>
              <p className="ps-3">--brand: #38bdf8;</p>
              <p className="ps-3">--radius: 12px;</p>
              <p>{"}"}</p>
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "`var(--brand)` paints both the button and the badge from one source.",
            ar: "`var(--brand)` بيلّون الزر والـ badge من مصدر واحد.",
          },
          visual: (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-950"
                style={{ background: "#38bdf8" }}
              >
                Save
              </button>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px] text-slate-950"
                style={{ background: "#38bdf8" }}
              >
                --brand
              </span>
            </div>
          ),
        },
        {
          caption: {
            en: "Change the token once — every `var()` consumer updates.",
            ar: "غيّر الـ token مرة — كل مستهلك `var()` بيتحدّث.",
          },
          visual: (
            <motion.div
              className="flex items-center gap-3"
              animate={{ backgroundColor: ["#38bdf8", "#fbbf24", "#38bdf8"] }}
              transition={{ duration: LAB_LOOP_S * 1.5, repeat: Infinity }}
            >
              <motion.div
                className="h-14 w-28 rounded-xl"
                animate={{ backgroundColor: ["#38bdf8", "#fbbf24", "#38bdf8"] }}
                transition={{ duration: LAB_LOOP_S * 1.5, repeat: Infinity }}
              />
              <motion.div
                className="h-8 w-8 rounded-full"
                animate={{ backgroundColor: ["#38bdf8", "#fbbf24", "#38bdf8"] }}
                transition={{ duration: LAB_LOOP_S * 1.5, repeat: Infinity }}
              />
            </motion.div>
          ),
        },
        {
          caption: {
            en: "`var(--x, fallback)` shows the fallback when a token is missing.",
            ar: "`var(--x, fallback)` بيظهر البديل لو الـ token مش موجود.",
          },
          visual: (
            <DemoCard className="w-64 p-4 text-center font-mono text-xs text-amber-100">
              var(--missing, tomato) → tomato
            </DemoCard>
          ),
        },
      ]}
    />
  );
}

export function MotionLabVisualizer() {
  return (
    <CssLab
      title={{ en: "Transitions & transforms", ar: "الـ Transitions و Transforms" }}
      steps={[
        {
          caption: {
            en: "`transition` eases property changes instead of snapping.",
            ar: "`transition` بتنعّم تغيّر الخصائص بدل القفزة المفاجئة.",
          },
          visual: (
            <motion.div
              className="h-16 w-16 rounded-2xl bg-cyan-400"
              animate={{ x: [0, 80, 0] }}
              transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
            />
          ),
        },
        {
          caption: {
            en: "`transform: scale()` grows the box without reflowing siblings.",
            ar: "`transform: scale()` بيكبّر الصندوق من غير ما يزحزح الجيران.",
          },
          visual: (
            <motion.div
              className="h-20 w-20 rounded-2xl bg-amber-400/90"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
            />
          ),
        },
        {
          caption: {
            en: "`rotate` + `translate` combine in one transform for rich motion.",
            ar: "`rotate` و `translate` بيتجمعوا في `transform` واحد.",
          },
          visual: (
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-fuchsia-400/90 font-mono text-xs text-slate-950"
              animate={{ rotate: [0, 12, -8, 0], y: [0, -10, 0] }}
              transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
            >
              hover
            </motion.div>
          ),
        },
      ]}
      footer={<FrontendTipsPanel />}
      showCaption={false}
    />
  );
}

export function AnimationLabVisualizer() {
  return (
    <CssLab
      title={{ en: "CSS animations", ar: "CSS Animations" }}
      steps={[
        {
          caption: {
            en: "`@keyframes` names a motion recipe you can reuse.",
            ar: "`@keyframes` بتسمّي وصفة حركة تقدر تعيد استخدامها.",
          },
          visual: (
            <DemoCard className="w-72 space-y-1 p-4 font-mono text-[11px] text-cyan-100">
              <p>@keyframes pulse {"{"}</p>
              <p className="ps-3">from {"{ opacity: .4 }"}</p>
              <p className="ps-3">to {"{ opacity: 1 }"}</p>
              <p>{"}"}</p>
            </DemoCard>
          ),
        },
        {
          caption: {
            en: "`animation-name` + duration attach the recipe to an element.",
            ar: "`animation-name` والمدة بيربطوا الوصفة بالعنصر.",
          },
          visual: (
            <motion.div
              className="h-16 w-16 rounded-full bg-cyan-300"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
            />
          ),
        },
        {
          caption: {
            en: "Respect `prefers-reduced-motion` — pause decorative loops.",
            ar: "احترم `prefers-reduced-motion` — وقّف الحلقات الزخرفية.",
          },
          visual: (
            <DemoCard className="w-64 border-emerald-300/35 bg-emerald-400/10 p-4 text-center text-sm text-emerald-50">
              @media (prefers-reduced-motion: reduce) {"{"} animation: none {"}"}
            </DemoCard>
          ),
        },
      ]}
    />
  );
}

export function LogicalLayoutLabVisualizer() {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => setRtl((v) => !v), LAB_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <TrackStage
      playing={playing}
      onTogglePlay={toggle}
      title={pick(
        { en: "Logical properties", ar: "الخصائص المنطقية" },
        locale,
      )}
      caption={pick(
        rtl
          ? {
              en: "`dir=rtl` — `margin-inline-start` flips to the right automatically.",
              ar: "`dir=rtl` — `margin-inline-start` بيتقلب لليمين لوحده.",
            }
          : {
              en: "`dir=ltr` — `margin-inline-start` sits on the left (start edge).",
              ar: "`dir=ltr` — `margin-inline-start` على الشمال (حافة البداية).",
            },
        locale,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <div
          dir={rtl ? "rtl" : "ltr"}
          className="w-72 rounded-xl border border-white/15 bg-slate-950/60 p-4"
        >
          <motion.div
            layout
            transition={labSpring}
            className="rounded-lg bg-cyan-400/25 px-3 py-3 font-mono text-xs text-cyan-50"
            style={{ marginInlineStart: 28 }}
          >
            margin-inline-start: 28px
          </motion.div>
        </div>
        <p className="font-mono text-[11px] text-slate-400">
          dir=&quot;{rtl ? "rtl" : "ltr"}&quot;
        </p>
        <StepDots count={2} active={rtl ? 1 : 0} />
      </div>
    </TrackStage>
  );
}

export function CssPitfallsLabVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [beat, setBeat] = useState(0);
  const [showFix, setShowFix] = useState(false);
  const ar = locale === "ar";

  const beats = [
    {
      id: "important",
      title: { en: "!important arms race", ar: "حرب !important" },
      trap: {
        en: "Stacking `!important` hides the real specificity problem.",
        ar: "تكديس `!important` بيغطي مشكلة الـ specificity الحقيقية.",
      },
      fix: {
        en: "Win with a clear component class — no `!important` needed.",
        ar: "اكسب بـ `component class` واضح — من غير `!important`.",
      },
      wrongCode: "color: red !important;",
      rightCode: ".card__title { color: … }",
      wrongVisual: (
        <div className="space-y-2">
          <div className="rounded-lg border border-rose-300/40 bg-rose-400/15 px-3 py-2 font-mono text-[11px] text-rose-100">
            p {"{"} color: steelblue {"}"}
          </div>
          <div className="rounded-lg border border-rose-300/50 bg-rose-500/20 px-3 py-2 font-mono text-[11px] font-semibold text-rose-50 shadow-[0_0_16px_rgba(251,113,133,0.2)]">
            .note {"{"} color: tomato !important {"}"}
          </div>
          <p className="text-center text-sm font-semibold text-orange-300">
            tomato forever ✗
          </p>
        </div>
      ),
      rightVisual: (
        <div className="space-y-2">
          <div className="rounded-lg border border-emerald-300/35 bg-emerald-400/10 px-3 py-2 font-mono text-[11px] text-emerald-100">
            .card__title {"{"} color: #38bdf8 {"}"}
          </div>
          <div className="rounded-xl border border-cyan-300/40 bg-slate-900 px-3 py-3 text-center text-sm font-semibold text-cyan-200">
            Featured title
          </div>
          <p className="text-center text-[10px] text-emerald-200/75">
            intentional override ✓
          </p>
        </div>
      ),
    },
    {
      id: "box",
      title: { en: "content-box surprise", ar: "مفاجأة content-box" },
      trap: {
        en: "Declared `width: 220px` grows past 220 once padding + border add on.",
        ar: "`width: 220px` بتكبر عن 220 لما الـ padding و border يتضافوا.",
      },
      fix: {
        en: "`box-sizing: border-box` keeps the declared width honest.",
        ar: "`box-sizing: border-box` بيخلي الـ width المعلن صادق.",
      },
      wrongCode: "box-sizing: content-box",
      rightCode: "box-sizing: border-box",
      wrongVisual: (
        <div className="relative mx-auto w-[11rem]">
          <div className="rounded-lg border-4 border-rose-300/60 bg-rose-400/20 p-5 text-center font-mono text-[10px] text-rose-50">
            220 + pad + border
          </div>
          <p className="mt-2 text-center text-[9px] text-rose-200/70">
            wider than you asked ✗
          </p>
        </div>
      ),
      rightVisual: (
        <div className="relative mx-auto w-[11rem]">
          <div className="rounded-lg border-4 border-emerald-300/60 bg-emerald-400/20 p-5 text-center font-mono text-[10px] text-emerald-50">
            stays 220px
          </div>
          <p className="mt-2 text-center text-[9px] text-emerald-200/70">
            padding inside the width ✓
          </p>
        </div>
      ),
    },
    {
      id: "overflow",
      title: { en: "Fixed-pixel overflow", ar: "فيضان px ثابت" },
      trap: {
        en: "`width: 420px` on a 320px phone punches through the viewport.",
        ar: "`width: 420px` على موبايل 320px بيخرم الشاشة.",
      },
      fix: {
        en: "Fluid widths: `width: min(100%, 40rem)` + flex/grid.",
        ar: "عروض سائلة: `width: min(100%, 40rem)` + flex/grid.",
      },
      wrongCode: "width: 420px",
      rightCode: "width: min(100%, 40rem)",
      wrongVisual: (
        <div className="mx-auto w-40 overflow-hidden rounded-lg border border-rose-300/40">
          <motion.div
            className="bg-rose-400/25 p-3 font-mono text-[10px] text-rose-100"
            animate={reduce ? undefined : { x: [0, -40, 0] }}
            transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
            style={{ width: 220 }}
          >
            420px panel overflow
          </motion.div>
        </div>
      ),
      rightVisual: (
        <div className="mx-auto w-40 rounded-lg border border-emerald-300/40 bg-emerald-400/15 p-3 text-center font-mono text-[10px] text-emerald-50">
          min(100%, 40rem)
          <p className="mt-1 text-[9px] text-emerald-200/70">fits any screen ✓</p>
        </div>
      ),
    },
    {
      id: "absolute",
      title: { en: "Lost absolute anchor", ar: "مراساة absolute ضايعة" },
      trap: {
        en: "`position: absolute` with a static parent anchors to a distant ancestor.",
        ar: "`position: absolute` مع أب static بيترسّى على جد بعيد.",
      },
      fix: {
        en: "Set the intended parent to `position: relative` first.",
        ar: "خلّي الأب المقصود `position: relative` الأول.",
      },
      wrongCode: "parent: static",
      rightCode: "parent: relative",
      wrongVisual: (
        <div className="relative h-28 w-full max-w-[14rem] rounded-xl border border-dashed border-rose-300/35 bg-slate-950/50 p-2">
          <div className="h-full rounded-lg border border-white/10 bg-white/5" />
          <span className="absolute -end-1 -top-2 rounded-full bg-rose-400 px-2 py-0.5 font-mono text-[9px] text-slate-950">
            badge flew away
          </span>
        </div>
      ),
      rightVisual: (
        <div className="relative h-28 w-full max-w-[14rem] rounded-xl border border-emerald-300/40 bg-slate-950/50 p-2">
          <div className="h-full rounded-lg border border-emerald-300/25 bg-emerald-400/5" />
          <span className="absolute end-2 top-2 rounded-full bg-emerald-300 px-2 py-0.5 font-mono text-[9px] text-slate-950">
            badge
          </span>
        </div>
      ),
    },
  ] as const;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => {
      setShowFix((wasFix) => {
        if (!wasFix) return true;
        setBeat((b) => (b + 1) % beats.length);
        return false;
      });
    }, LAB_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing, beats.length]);

  function goTo(index: number) {
    if (index === beat) return;
    playClick();
    setBeat(index);
    setShowFix(false);
  }

  const current = beats[beat];
  const caption = showFix
    ? ar
      ? `✓ الصح: ${current.fix.ar}`
      : `✓ Fix: ${current.fix.en}`
    : ar
      ? `✗ الغلط: ${current.trap.ar}`
      : `✗ Mistake: ${current.trap.en}`;

  return (
    <TrackStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "أخطاء CSS الشائعة" : "CSS pitfalls"}
      caption={caption}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/80">
            {ar ? current.title.ar : current.title.en}
          </p>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              showFix
                ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                : "border-rose-300/40 bg-rose-400/15 text-rose-100"
            }`}
          >
            {showFix ? (ar ? "صح" : "right") : ar ? "غلط" : "wrong"}
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <motion.div
            animate={{
              opacity: showFix ? 0.35 : 1,
              scale: showFix ? 0.96 : 1,
              filter: showFix ? "grayscale(0.35)" : "none",
            }}
            transition={{ duration: 0.35, ease: labEase }}
            className="flex h-full min-h-[10rem] flex-col rounded-2xl border border-rose-400/35 bg-gradient-to-br from-rose-400/15 via-slate-950/70 to-slate-950/40 p-3"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-rose-200">
              ✗ {ar ? "غلط" : "Wrong"}
            </p>
            <code className="mb-2 rounded-md border border-rose-300/20 bg-rose-400/10 px-1.5 py-0.5 font-mono text-[10px] text-rose-100">
              {current.wrongCode}
            </code>
            <div className="flex flex-1 items-center justify-center">
              {current.wrongVisual}
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="flex items-center justify-center"
            animate={
              reduce
                ? undefined
                : { scale: showFix ? [1, 1.15, 1] : 1 }
            }
            transition={{ duration: 0.45 }}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
                showFix
                  ? "border-emerald-300/45 bg-emerald-400/20 text-emerald-100"
                  : "border-white/15 bg-slate-950/80 text-slate-300"
              }`}
            >
              →
            </span>
          </motion.div>

          <motion.div
            animate={{
              opacity: showFix ? 1 : 0.4,
              scale: showFix ? 1 : 0.96,
              boxShadow: showFix
                ? "0 0 28px rgba(52,211,153,0.18)"
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4, ease: labEase }}
            className="flex h-full min-h-[10rem] flex-col rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-400/15 via-slate-950/70 to-slate-950/40 p-3"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              ✓ {ar ? "صح" : "Right"}
            </p>
            <code className="mb-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-100">
              {current.rightCode}
            </code>
            <div className="flex flex-1 items-center justify-center">
              {current.rightVisual}
            </div>
          </motion.div>
        </div>

        <div className="mt-2.5 flex shrink-0 flex-wrap items-center justify-center gap-1.5">
          {beats.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={b.id}
              aria-current={i === beat ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === beat
                  ? showFix
                    ? "bg-emerald-300 text-slate-950"
                    : "bg-rose-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {b.id}
            </button>
          ))}
        </div>
      </div>
    </TrackStage>
  );
}


export function CssCheatsheetLabVisualizer() {
  return (
    <CssLab
      title={{ en: "CSS cheatsheet", ar: "مرجع CSS" }}
      steps={[
        {
          caption: {
            en: "Layout toolkit: `flex` for one axis, `grid` for two.",
            ar: "عدة الـ layout: `flex` لمحور، `grid` لمحورين.",
          },
          visual: (
            <div className="flex gap-3">
              <DemoCard className="flex h-20 w-28 items-center justify-center p-2 font-mono text-[10px] text-cyan-100">
                flex
              </DemoCard>
              <DemoCard className="grid h-20 w-28 grid-cols-2 gap-1 p-2 font-mono text-[10px] text-amber-100">
                <span className="rounded bg-amber-400/20" />
                <span className="rounded bg-amber-400/20" />
                <span className="rounded bg-amber-400/20" />
                <span className="rounded bg-amber-400/20" />
              </DemoCard>
            </div>
          ),
        },
        {
          caption: {
            en: "Box toolkit: `border-box`, `gap`, logical spacing.",
            ar: "عدة الصندوق: `border-box` و `gap` ومسافات منطقية.",
          },
          visual: (
            <div className="flex flex-wrap justify-center gap-2">
              {["border-box", "gap", "padding-inline"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          ),
        },
        {
          caption: {
            en: "Motion toolkit: short transitions, reduced-motion safe loops.",
            ar: "عدة الحركة: `transitions` قصيرة وحلقات آمنة مع reduced-motion.",
          },
          visual: (
            <motion.div
              className="h-12 w-12 rounded-xl bg-fuchsia-400"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
            />
          ),
        },
      ]}
    />
  );
}

export const cssVisualizers = {
  "cascade-lab": () => <CascadeLabVisualizer />,
  "box-model-lab": () => <BoxModelLabVisualizer />,
  "sizing-lab": () => <SizingLabVisualizer />,
  "type-color-lab": () => <TypeColorLabVisualizer />,
  "flow-lab": () => <FlowLabVisualizer />,
  "surface-lab": () => <SurfaceLabVisualizer />,
  "flexbox-lab": () => <FlexboxLabVisualizer />,
  "grid-lab": () => <GridLabVisualizer />,
  "positioning-lab": () => <PositioningLabVisualizer />,
  "responsive-lab": () => <ResponsiveLabVisualizer />,
  "variables-lab": () => <VariablesLabVisualizer />,
  "motion-lab": () => <MotionLabVisualizer />,
  "animation-lab": () => <AnimationLabVisualizer />,
  "logical-layout-lab": () => <LogicalLayoutLabVisualizer />,
  "css-pitfalls-lab": () => <CssPitfallsLabVisualizer />,
  "css-cheatsheet-lab": () => <CssCheatsheetLabVisualizer />,
} as const satisfies Record<
  Exclude<import("@/lib/visualizer-ids").CssVisualizerId, "level-quiz">,
  () => ReactNode
>;
