"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedString } from "@/lib/types";

type TipAction = "DO" | "DONT";

type TipCategoryId =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React"
  | "Git"
  | "UI/UX"
  | "General Frontend";

type Tip = {
  id: string;
  action: TipAction;
  category: TipCategoryId;
  difficulty: LocalizedString;
  title: LocalizedString;
  explanation: LocalizedString;
  code?: string;
  why: LocalizedString;
};

const DIFFICULTY_BEGINNER: LocalizedString = {
  en: "Beginner",
  ar: "مبتدئ",
};

function pick(value: LocalizedString, locale: "en" | "ar") {
  return locale === "ar" ? value.ar : value.en;
}

const CATEGORY_LABELS: Record<TipCategoryId, LocalizedString> = {
  HTML: { en: "HTML", ar: "HTML" },
  CSS: { en: "CSS", ar: "CSS" },
  JavaScript: { en: "JavaScript", ar: "JavaScript" },
  React: { en: "React", ar: "React" },
  Git: { en: "Git", ar: "Git" },
  "UI/UX": { en: "UI/UX", ar: "واجهة المستخدم/تجربة المستخدم" },
  "General Frontend": {
    en: "General Frontend",
    ar: "عام (Frontend)",
  },
};

const TIPS: Tip[] = [
  {
    id: "html-main-landmark",
    action: "DO",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use one `<main>`", ar: "استخدم `<main>` واحد" },
    explanation: {
      en: "Put your primary content in a single `<main>` landmark. It makes navigation predictable for everyone.",
      ar: "ضع المحتوى الأساسي داخل `<main>` واحد. ده بيخلي التصفح واضح ومُتوقع.",
    },
    code: `<main>\n  <!-- primary content -->\n</main>`,
    why: {
      en: "Screen readers can jump to landmarks fast.",
      ar: "قارئات الشاشة تقدر تقفز للـ landmarks بسرعة.",
    },
  },
  {
    id: "html-button-not-div",
    action: "DONT",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't use `<div>` for buttons", ar: "ماتستخدمش `<div>` كزر" },
    explanation: {
      en: "If it acts like a button, use `<button>`. Clickable `<div>` breaks keyboard + accessibility.",
      ar: "لو بيشتغل كزر، استخدم `<button>`. `<div>` قابل للنقر بيبوّظ الكيبورد والـ accessibility.",
    },
    code: `<button type="button">Save</button>`,
    why: {
      en: "Buttons already support Enter/Space and focus states.",
      ar: "الأزرار أصلًا مدعومة للـ Enter/Space وحالة focus.",
    },
  },
  {
    id: "ux-loading-state",
    action: "DO",
    category: "UI/UX",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Show a loading state", ar: "اعرض حالة التحميل" },
    explanation: {
      en: "While data loads, show a skeleton or spinner instead of a blank area.",
      ar: "وقت ما البيانات بتتحمّل، اعرض skeleton أو spinner بدل فراغ.",
    },
    code: `{isLoading ? <Spinner /> : <List />}`,
    why: {
      en: "Users understand something is happening.",
      ar: "المستخدم يفهم إن في حاجة ماشية.",
    },
  },
  {
    id: "ux-empty-state",
    action: "DONT",
    category: "UI/UX",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't leave empty screens", ar: "ماسيبش شاشة فاضية" },
    explanation: {
      en: "If there are no results, show a friendly message and a next step.",
      ar: "لو مفيش نتائج، اعرض رسالة واضحة وخطوة تالية.",
    },
    code: `<p>No results. Try again.</p>`,
    why: {
      en: "It prevents confusion and dead ends.",
      ar: "ده بيقلل اللبس ويمنع طريق مسدود.",
    },
  },
  {
    id: "html-link-text",
    action: "DO",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use descriptive link text", ar: "اكتب نص لينك وصفي" },
    explanation: {
      en: "Put the destination inside the `<a>` text. Avoid vague “click here”.",
      ar: "حط الوجهة جوّه نص `<a>`. بلاش “click here”.",
    },
    code: `<a href="/sale">Summer sale</a>`,
    why: {
      en: "Screen readers announce where the link goes.",
      ar: "قارئات الشاشة تقول رايح فين.",
    },
  },
  {
    id: "html-label-input",
    action: "DO",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Always link labels to inputs", ar: "اربِط الـ label بالـ input" },
    explanation: {
      en: "Use `<label for=\"...\">` + an input `id` so focusing works correctly.",
      ar: "استخدم `<label for=\"...\">` مع input `id` عشان الفوكس يشتغل صح.",
    },
    code: `<label htmlFor="email">Email</label>\n<input id="email" />`,
    why: {
      en: "It improves focus and form usability.",
      ar: "بيحسن استخدام الفورم.",
    },
  },
  {
    id: "html-form-button-type",
    action: "DONT",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't forget `type` in forms", ar: "ما تنساش `type` جوّه الفورم" },
    explanation: {
      en: "Inside `<form>`, a `<button>` defaults to submit. Use `type=\"button\"` for non-submit actions.",
      ar: "جوّه `<form>`, الزر الافتراضي submit. استخدم `type=\"button\"` للي مش-submit.",
    },
    code: `<button type="button">Preview</button>`,
    why: {
      en: "Prevents accidental submissions.",
      ar: "بيمنع الإرسال بالغلط.",
    },
  },
  {
    id: "html-image-alt",
    action: "DO",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Write meaningful `alt` text", ar: "اكتب `alt` بمعنى" },
    explanation: {
      en: "Use `alt` that describes the image when it matters. Decorative images can use `alt=\"\"`.",
      ar: "اكتب `alt` يشرح الصورة لو ليها معنى. الصور الزخرفية ممكن `alt=\"\"`.",
    },
    code: `<img src="product.jpg" alt="Product photo" />`,
    why: {
      en: "Screen readers get the missing context.",
      ar: "قارئات الشاشة تاخد السياق.",
    },
  },
  {
    id: "html-aria-hidden-focus",
    action: "DONT",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't hide focused elements", ar: "ما تخفيش عنصر عليه focus" },
    explanation: {
      en: "If an element can be focused, don't set `aria-hidden` on it.",
      ar: "لو عنصر قابل للتركيز، بلاش `aria-hidden` عليه.",
    },
    why: {
      en: "Focus and screen-reader state must stay consistent.",
      ar: "لازم حالة الفوكس والـ screen reader تبقى متوافقة.",
    },
  },
  {
    id: "css-variables-colors",
    action: "DO",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use CSS variables for colors", ar: "استخدم CSS variables للألوان" },
    explanation: {
      en: "Define repeated colors once in `:root` and reuse them everywhere.",
      ar: "اعرف الألوان المتكررة مرة واحدة في `:root` وابعتها في كل مكان.",
    },
    code: `:root { --brand: #38bdf8; }\n.button { color: var(--brand); }`,
    why: {
      en: "One change updates the whole UI.",
      ar: "تغيير واحد يعدّل الواجهة كلها.",
    },
  },
  {
    id: "css-avoid-important",
    action: "DONT",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't overuse `!important`", ar: "ما تكثرش `!important`" },
    explanation: {
      en: "Avoid `!important` everywhere. Fix the cascade with clear selectors and component classes.",
      ar: "تجنب `!important` طول الوقت. أصلح الـ cascade بـ selectors واضحة وcomponent classes.",
    },
    why: {
      en: "CSS becomes predictable instead of a fight.",
      ar: "الـ CSS بيبقى متوقع بدل مايبقى صراع.",
    },
  },
  {
    id: "css-modular-files",
    action: "DO",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Split CSS by feature", ar: "قسّم CSS حسب الميزة" },
    explanation: {
      en: "Don't dump all CSS into one huge file. Split styles so they stay understandable.",
      ar: "ما تكدّسش كل CSS في ملف واحد كبير. قسمه عشان يبقى مفهوم.",
    },
    why: {
      en: "Less scrolling, faster changes, fewer mistakes.",
      ar: "أقل تمرير، تغييرات أسرع، أخطاء أقل.",
    },
  },
  {
    id: "css-mobile-first",
    action: "DO",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Mobile-first your styles", ar: "ابدأ بـ mobile-first" },
    explanation: {
      en: "Write the base styles for small screens, then enhance with `@media (min-width: ...)`.",
      ar: "اكتب الأساس للموبايل، وبعدها حسّن بـ `@media (min-width: ...)`.",
    },
    code: `/* base */\n@media (min-width: 640px) {\n  /* enhance */\n}`,
    why: {
      en: "Phones work first, not as an afterthought.",
      ar: "الموبايل بيشتغل أولًا مش بعد ما تخلص.",
    },
  },
  {
    id: "css-font-size-sanity",
    action: "DONT",
    category: "UI/UX",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't randomize font sizes", ar: "ما تخلّيش أحجام الخط عشوائية" },
    explanation: {
      en: "Use a small, consistent type scale. It makes reading easier and layouts calmer.",
      ar: "استخدم scale ثابت وخفيف. ده بيخلي القراءة أريح.",
    },
    why: {
      en: "Consistency improves both UX and accessibility.",
      ar: "الثبات يحسن UX والـ accessibility.",
    },
  },
  {
    id: "css-border-box",
    action: "DO",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use `border-box`", ar: "استخدم `border-box`" },
    explanation: {
      en: "Set `box-sizing: border-box` so widths include padding + borders.",
      ar: "فعّل `box-sizing: border-box` عشان العرض يشمل padding وborder.",
    },
    code: `*, *::before, *::after { box-sizing: border-box; }`,
    why: {
      en: "Fewer layout surprises.",
      ar: "مفاجآت أقل في التصميم.",
    },
  },
  {
    id: "css-reduced-motion",
    action: "DO",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Respect reduced motion", ar: "احترم `prefers-reduced-motion`" },
    explanation: {
      en: "Pause decorative animations when motion should be reduced.",
      ar: "وقف الحركات الزخرفية لما لازم نقلل الحركة.",
    },
    code: `@media (prefers-reduced-motion: reduce) {\n  * { animation: none; }\n}`,
    why: {
      en: "It helps motion-sensitive users.",
      ar: "بيساعد اللي حساسين للحركة.",
    },
  },
  {
    id: "js-const-default",
    action: "DO",
    category: "JavaScript",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use `const` by default", ar: "استخدم `const` افتراضيًا" },
    explanation: {
      en: "Prefer `const` unless you need to reassign a value.",
      ar: "يفضل `const` إلا لو محتاج تغيّر قيمة.",
    },
    code: `const items = [];\nlet i = 0;`,
    why: {
      en: "It prevents accidental reassignments.",
      ar: "ده بيمنع إعادة تعيين بالغلط.",
    },
  },
  {
    id: "js-strict-equals",
    action: "DONT",
    category: "JavaScript",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't use `==`", ar: "ما تستخدمش `==`" },
    explanation: {
      en: "Use `===` so comparisons don't silently coerce types.",
      ar: "استخدم `===` عشان المقارنات ما تبهدلش الأنواع بشكل سري.",
    },
    code: `if (a === b) {\n  // OK\n}`,
    why: {
      en: "Fewer weird bugs.",
      ar: "أخطاء غريبة أقل.",
    },
  },
  {
    id: "js-meaningful-names",
    action: "DO",
    category: "JavaScript",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Name things clearly", ar: "سمِّ الأشياء بوضوح" },
    explanation: {
      en: "Choose variable names that describe the data, not `x` or `thing`.",
      ar: "اختار أسماء توضح البيانات، مش `x` أو `thing`.",
    },
    code: `const userId = params.get("userId");`,
    why: {
      en: "Reviews get faster and safer.",
      ar: "المراجعة بتبقى أسرع وأأمن.",
    },
  },
  {
    id: "js-extract-function",
    action: "DONT",
    category: "JavaScript",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't repeat logic", ar: "ما تكررش نفس المنطق" },
    explanation: {
      en: "If you paste the same steps twice, extract a function instead.",
      ar: "لو بتلصق نفس الخطوات مرتين، استخرج دالة بدل التكرار.",
    },
    code: `function formatTitle(t) {\n  return t.trim();\n}`,
    why: {
      en: "One fix updates everywhere.",
      ar: "تعديل واحد يعدّل في كل مكان.",
    },
  },
  {
    id: "react-stable-keys",
    action: "DO",
    category: "React",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use stable React keys", ar: "استخدم keys ثابتة" },
    explanation: {
      en: "Use an `id` as the key, not the array index, when items can reorder.",
      ar: "استخدم `id` كمفتاح بدل index لو العناصر بتتغير/تتترتب.",
    },
    code: `{items.map(item => (\n  <Row key={item.id} {...item} />\n))}`,
    why: {
      en: "Prevents UI mismatches when lists change.",
      ar: "بيمنع مشاكل في الـ UI لما القائمة تتغير.",
    },
  },
  {
    id: "react-small-components",
    action: "DO",
    category: "React",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Keep components focused", ar: "خلي كل Component له شغلته" },
    explanation: {
      en: "Make smaller components instead of one mega component for the whole page.",
      ar: "اعمل Components أصغر بدل Mega واحد لكل الصفحة.",
    },
    why: {
      en: "Easier to read, reuse, and test.",
      ar: "بيسهل القراءة وإعادة الاستخدام والاختبار.",
    },
  },
  {
    id: "react-reusable-ui",
    action: "DONT",
    category: "React",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't duplicate UI markup", ar: "ما تكررش نفس الـ markup" },
    explanation: {
      en: "If multiple places render the same UI, extract a reusable component.",
      ar: "لو أكتر من مكان بيعرض نفس الواجهة، استخرج Component reusable.",
    },
    why: {
      en: "Less duplication = fewer UI bugs.",
      ar: "تكرار أقل = أخطاء واجهة أقل.",
    },
  },
  {
    id: "frontend-devtools",
    action: "DO",
    category: "General Frontend",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use DevTools first", ar: "استخدم DevTools أولًا" },
    explanation: {
      en: "Before guessing, check Console errors and the Network tab.",
      ar: "قبل ما تفترض، شوف أخطاء الـ Console وتبويب Network.",
    },
    why: {
      en: "You’ll find the real cause faster.",
      ar: "هتلاقي السبب الحقيقي أسرع.",
    },
  },
  {
    id: "frontend-dont-ignore-errors",
    action: "DONT",
    category: "General Frontend",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't ignore console errors", ar: "ما تتجاهلش أخطاء Console" },
    explanation: {
      en: "If you see red errors, fix them before shipping.",
      ar: "لو في Errors حمراء، أصلحها قبل ما تسيبها.",
    },
    why: {
      en: "Errors often mean broken features.",
      ar: "الأخطاء غالبًا معناها ميزات بتبوظ.",
    },
  },
  {
    id: "frontend-mobile-test",
    action: "DO",
    category: "General Frontend",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Test on mobile early", ar: "جرّب على الموبايل بدري" },
    explanation: {
      en: "Open mobile sizes in DevTools and check tap targets + scrolling.",
      ar: "افتح أحجام الموبايل في DevTools وتأكد من لمس الشاشة والـ scrolling.",
    },
    why: {
      en: "Many layout bugs show up immediately.",
      ar: "أغلب مشاكل التصميم بتبان بسرعة.",
    },
  },
  {
    id: "frontend-test-a11y",
    action: "DO",
    category: "General Frontend",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Check accessibility basics", ar: "اتأكد من أساسيات الـ accessibility" },
    explanation: {
      en: "Use keyboard navigation and verify focus outlines are visible.",
      ar: "استخدم التنقل بالكيبورد وتأكد إن focus واضح.",
    },
    why: {
      en: "A UI isn’t finished until it works without a mouse.",
      ar: "ماينفعش تعتبر الواجهة “خلصت” قبل ما تشتغل من غير موباوس.",
    },
  },
  {
    id: "git-gitignore-secrets",
    action: "DO",
    category: "Git",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use `.gitignore` for secrets", ar: "استخدم `.gitignore` للـ أسرار" },
    explanation: {
      en: "Add `.env` and local credential files to `.gitignore`.",
      ar: "أضف `.env` وملفات بيانات الدخول المحلية لـ `.gitignore`.",
    },
    code: `.env.local\n*.pem`,
    why: {
      en: "Prevents accidental leaks to GitHub.",
      ar: "بيمنع تسريب بيانات بالغلط على GitHub.",
    },
  },
  {
    id: "git-dont-commit-keys",
    action: "DONT",
    category: "Git",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't commit API keys", ar: "ما تحطّش API keys في Git" },
    explanation: {
      en: "Never push real keys to the repo. Use environment variables instead.",
      ar: "ما ترفعش مفاتيح حقيقية للريبو. استخدم environment variables بدل كده.",
    },
    why: {
      en: "Protects you from security incidents.",
      ar: "بيحميك من حوادث أمنية.",
    },
  },
  {
    id: "ui-useful-errors",
    action: "DO",
    category: "UI/UX",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Show helpful error messages", ar: "اعرض رسائل خطأ مفيدة" },
    explanation: {
      en: "When something fails, tell users what happened and what to do next.",
      ar: "لو في مشكلة، قول للمستخدم حصل إيه و يعمل إيه بعد كده.",
    },
    code: `<p>Could not save. Try again.</p>`,
    why: {
      en: "Users recover faster.",
      ar: "المستخدمين بيرجعوا بسرعة.",
    },
  },
  {
    id: "html-keep-spacing",
    action: "DO",
    category: "HTML",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Use spacing classes consistently", ar: "استخدم spacing بشكل ثابت" },
    explanation: {
      en: "Keep vertical rhythm consistent so cards and text feel calm and readable.",
      ar: "خلّي الإيقاع العمودي ثابت عشان النص والـ cards يبقوا هاديين وسهلين.",
    },
    why: {
      en: "Better rhythm improves scannability.",
      ar: "إيقاع أحسن بيحسن القراءة السريعة.",
    },
  },
  {
    id: "css-limit-colors",
    action: "DONT",
    category: "CSS",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't use too many colors", ar: "ما تستخدمش ألوان كتير" },
    explanation: {
      en: "Pick a small palette and reuse it. Too many colors make UI feel noisy.",
      ar: "اختار Palette صغيرة وعاود استخدمها. كتير ألوان بيخلي الواجهة مزعجة.",
    },
    why: {
      en: "Your UI stays focused on the important parts.",
      ar: "الواجهة تركز على المهم.",
    },
  },
  {
    id: "javascript-meaningful-ids",
    action: "DO",
    category: "JavaScript",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Prefer clear IDs", ar: "خلي الـ IDs واضحة" },
    explanation: {
      en: "Use IDs that explain the role: `userId`, `postId`, `cartId`.",
      ar: "استخدم IDs توضّح الدور: `userId`, `postId`, `cartId`.",
    },
    why: {
      en: "It’s easier to debug and reason about.",
      ar: "ده بيخلي الديباج أسهل.",
    },
  },
  {
    id: "react-no-index-key",
    action: "DONT",
    category: "React",
    difficulty: DIFFICULTY_BEGINNER,
    title: { en: "Don't use array index as key", ar: "ما تستخدمش array index كـ key" },
    explanation: {
      en: "Index keys break when items insert/remove or reorder.",
      ar: "index keys بتبوظ لما العناصر تتضاف/تتحذف أو تتغير ترتيبها.",
    },
    code: `{items.map((item, i) => (\n  <Row key={i} />\n))}`,
    why: {
      en: "State can attach to the wrong item.",
      ar: "الحالة ممكن تتعلق بعنصر غلط.",
    },
  },
];

const TIPS_FOR_LIBRARY = TIPS.slice(0, 30);

const ACTION_FILTERS = [
  { id: "all" as const, label: { en: "All", ar: "الكل" } },
  { id: "do" as const, label: { en: "DO", ar: "افعل" } },
  { id: "dont" as const, label: { en: "DON'T", ar: "ما تفعلش" } },
] as const;

export function FrontendTipsPanel() {
  const { locale } = useLanguage();
  const [category, setCategory] = useState<
    "all" | TipCategoryId
  >("all");
  const [actionFilter, setActionFilter] = useState<
    "all" | "do" | "dont"
  >("all");

  const filtered = useMemo(() => {
    return TIPS_FOR_LIBRARY.filter((tip) => {
      if (category !== "all" && tip.category !== category) return false;
      if (actionFilter === "do" && tip.action !== "DO") return false;
      if (actionFilter === "dont" && tip.action !== "DONT") return false;
      return true;
    });
  }, [actionFilter, category]);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/55 p-3 backdrop-blur-xl sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-56">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <span aria-hidden className="text-base">
              ✨
            </span>
            Frontend Tips
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {locale === "ar"
              ? "كروت سريعة بشكل carousel — بسيطة، catchy، وسهلة التصوير."
              : "Quick carousel cards — simple, catchy, and screenshot-ready."}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300">
          {filtered.length}/{TIPS_FOR_LIBRARY.length}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            category === "all"
              ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
          }`}
          onClick={() => setCategory("all")}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {(
          [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git",
            "UI/UX",
            "General Frontend",
          ] as TipCategoryId[]
        ).map((id) => (
          <button
            key={id}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              category === id
                ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
            }`}
            onClick={() => setCategory(id)}
          >
            {pick(CATEGORY_LABELS[id], locale)}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-2" role="tablist">
        {ACTION_FILTERS.map((f) => {
          const active =
            actionFilter === f.id ||
            (f.id === "all" && actionFilter === "all");
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? f.id === "do"
                    ? "border-emerald-300/50 bg-emerald-300/20 text-emerald-50"
                    : f.id === "dont"
                      ? "border-rose-300/50 bg-rose-300/20 text-rose-50"
                      : "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              }`}
              onClick={() => {
                if (f.id === "all") setActionFilter("all");
                if (f.id === "do") setActionFilter("do");
                if (f.id === "dont") setActionFilter("dont");
              }}
            >
              {pick(f.label, locale)}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {filtered.map((tip) => {
          const categoryLabel = pick(CATEGORY_LABELS[tip.category], locale);
          const isDo = tip.action === "DO";
          const labelTone =
            isDo
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/30 bg-rose-400/10 text-rose-100";
          const cardTone = isDo
            ? "border-emerald-300/35 bg-linear-to-br from-emerald-950/40 via-slate-900/75 to-cyan-950/35 hover:border-emerald-300/55"
            : "border-rose-300/35 bg-linear-to-br from-rose-950/40 via-slate-900/75 to-orange-950/35 hover:border-rose-300/55";
          const footerTone = isDo
            ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
            : "border-rose-300/20 bg-rose-400/10 text-rose-100";

          return (
            <motion.article
              key={tip.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border p-3 transition ${cardTone}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${labelTone}`}
                >
                  {tip.action === "DO" ? "DO" : "DON'T"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
                  {categoryLabel}
                </span>
              </div>

              <h3 className="mt-2 text-base font-bold leading-tight text-white">
                {pick(tip.title, locale)}
              </h3>
              <div className="mt-1 space-y-1">
                <p className="text-sm leading-relaxed text-slate-100">
                  {tip.explanation.en}
                </p>
                <p className="text-sm leading-relaxed text-slate-200">
                  {tip.explanation.ar}
                </p>
              </div>

              {tip.code ? (
                <pre
                  dir="ltr"
                  className="mt-2 max-h-28 overflow-auto rounded-xl border border-white/10 bg-slate-950/65 p-3 font-mono text-[11px] leading-5 text-cyan-100"
                >
                  {tip.code}
                </pre>
              ) : null}

              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-sm font-semibold text-slate-100">💡 Why?</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">{tip.why.en}</p>
                <div className="mt-2 text-sm font-semibold text-slate-100">💡 ليه؟</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">{tip.why.ar}</p>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${footerTone}`}>
                  {isDo ? "Recommended move" : "Common trap"}
                </span>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                  {pick(tip.difficulty, locale)}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

