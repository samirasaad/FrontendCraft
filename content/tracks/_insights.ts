import { insight, L } from "@/content/helpers";
import type { InsightSection, Lesson } from "@/lib/types";

export interface ProductionInsights {
  underTheHood: InsightSection;
  accessibility: InsightSection;
  seo: InsightSection;
}

export function defaultInsights(topicEn: string, topicAr: string): ProductionInsights {
  return {
    underTheHood: insight(
      [
        L(
          `Engines (V8/Blink, SpiderMonkey/Gecko, JavaScriptCore) parse, bytecode-compile, then JIT-optimize hot paths related to ${topicEn}. Prefer clear code — measure before micro-optimizing.`,
          `الـ engines (V8/Blink و SpiderMonkey/Gecko و JavaScriptCore) بتعمل parse و bytecode وبعدين JIT للمسارات الساخنة المتعلقة بـ ${topicAr}. اكتب code واضح — وقِس قبل أي micro-optimization.`,
        ),
        L(
          "Watch heap allocations vs stack frames: short-lived primitives are cheap; retained objects delay garbage collection.",
          "راقب الـ heap مقابل الـ stack: الـ primitives القصيرة رخيصة؛ الـ objects المحتجزة بتأخر الـ GC.",
        ),
      ],
      {
        bullets: [
          L("Parse → compile → optimize hot functions", "Parse → compile → تحسين الدوال الساخنة"),
          L("Avoid retaining large graphs unintentionally", "تجنب الإمساك بـ graphs كبيرة بالغلط"),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          `When ${topicEn} drives UI, expose state to assistive tech: name, role, and value must update together.`,
          `لما ${topicAr} يحرّك الـ UI، اعرض الحالة لأدوات الوصول: الاسم والدور والقيمة لازم يتحدثوا مع بعض.`,
        ),
        L(
          "Keyboard users need Tab order, visible focus, and activation with Enter/Space on controls — never mouse-only handlers.",
          "مستخدمي الكيبورد محتاجين ترتيب Tab و focus ظاهر وتفعيل بـ Enter/Space — مش handlers ماوس بس.",
        ),
      ],
      {
        bullets: [
          L("Keep accessible names stable and meaningful", "خلّي الـ accessible names ثابتة ومفهومة"),
          L("Announce async results with aria-live when needed", "أعلن نتائج الـ async بـ aria-live عند الحاجة"),
          L("Manage focus after major view changes", "أدِر الـ focus بعد تغيّرات العرض الكبيرة"),
        ],
        code: `<button type="button" aria-pressed="false">Toggle</button>`,
        codeCaption: L("Expose control state", "اعرض حالة الـ control"),
      },
    ),
    seo: insight(
      [
        L(
          `Crawlers care about meaningful HTML and fast, stable rendering. Client-only ${topicEn} that never lands in the initial HTML can delay indexing.`,
          `الـ crawlers بتهتم بـ HTML معنوي ورندر سريع وثابت. ${topicAr} اللي بيشتغل client-only ومن غير HTML أولي ممكن يأخر الفهرسة.`,
        ),
        L(
          "Protect Core Web Vitals: avoid layout shifts (CLS), long tasks that hurt INP, and heavy JS that blocks LCP.",
          "احمِ Core Web Vitals: تجنب CLS، والـ long tasks اللي بتضر INP، و JS الثقيل اللي بيمنع LCP.",
        ),
      ],
      {
        bullets: [
          L("Prefer SSR/SSG for primary content", "فضّل SSR/SSG للمحتوى الأساسي"),
          L("Hydrate enhancements — don't invent the whole document in JS", "اعمل hydrate للتحسينات — متخترعش المستند كله بـ JS"),
          L("Measure with Lighthouse / CrUX, not guesses", "قِس بـ Lighthouse / CrUX مش بالتخمين"),
        ],
      },
    ),
  };
}

/** Lesson shape before production insights are attached. */
export type LessonDraft = Omit<Lesson, "content"> & {
  content: Omit<
    Lesson["content"],
    "underTheHood" | "accessibility" | "seo"
  > & {
    underTheHood?: InsightSection;
    accessibility?: InsightSection;
    seo?: InsightSection;
    deepDive?: unknown;
  };
};

/** Strip legacy `deepDive` if present and attach production insight sections. */
export function withProductionInsights(
  lesson: LessonDraft,
  map: Record<string, ProductionInsights>,
): Lesson {
  const pack =
    map[lesson.slug] ??
    defaultInsights(lesson.content.title.en, lesson.content.title.ar);
  const {
    deepDive: _legacy,
    underTheHood: _u,
    accessibility: _a,
    seo: _s,
    ...rest
  } = lesson.content;

  void _legacy;
  void _u;
  void _a;
  void _s;

  return {
    ...lesson,
    content: {
      ...rest,
      underTheHood: pack.underTheHood,
      accessibility: pack.accessibility,
      seo: pack.seo,
    },
  };
}
