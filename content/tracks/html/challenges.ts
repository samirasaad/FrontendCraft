import { L } from "@/content/helpers";
import type { LessonChallenge } from "@/lib/types";

export const htmlChallenges: Record<string, LessonChallenge> = {
  "document-anatomy": {
    prompt: L(
      "Which snippet starts a modern HTML document correctly?",
      "أنهي snippet بيبدأ مستند HTML حديث صح؟",
    ),
    options: [
      {
        id: "a",
        label: L("Missing doctype", "من غير doctype"),
        code: `<html><head><title>Hi</title></head><body></body></html>`,
      },
      {
        id: "b",
        label: L("Modern shell", "هيكل حديث"),
        code: `<!DOCTYPE html>\n<html lang="en">\n  <head><meta charset="UTF-8" /><title>Hi</title></head>\n  <body></body>\n</html>`,
      },
      {
        id: "c",
        label: L("XHTML leftover", "بقايا XHTML"),
        code: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0">`,
      },
    ],
    correctId: "b",
    explanation: L(
      "`<!DOCTYPE html>` + `lang` + charset unlock standards mode and accessibility language.",
      "`<!DOCTYPE html>` + `lang` + charset بيفعّلوا standards mode ولغة الوصول.",
    ),
  },
  "semantic-structure": {
    prompt: L(
      "Pick the semantic landmark shell:",
      "اختار هيكل landmarks الـ semantic:",
    ),
    options: [
      {
        id: "a",
        label: L("Div soup", "Div soup"),
        code: `<div class="header"></div><div class="main"></div>`,
      },
      {
        id: "b",
        label: L("Landmarks", "Landmarks"),
        code: `<header></header><nav aria-label="Primary"></nav><main></main><footer></footer>`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Native landmarks give screen readers jump targets without ARIA gymnastics.",
      "الـ landmarks الأصلية بتدي قارئات الشاشة قفزات من غير ARIA زيادة.",
    ),
  },
  "text-formatting": {
    prompt: L(
      "Which tag marks strong importance for assistive tech?",
      "أنهي tag بيعلّم أهمية قوية لـ assistive tech؟",
    ),
    options: [
      {
        id: "a",
        label: L("CSS-only bold", "bold بـ CSS بس"),
        code: `<span style="font-weight:bold">Important</span>`,
      },
      {
        id: "b",
        label: L("Semantic strong", "strong semantic"),
        code: `<strong>Important</strong>`,
      },
      {
        id: "c",
        label: L("Stylistic b only", "b شكلي بس"),
        code: `<b>Important</b>`,
      },
    ],
    correctId: "b",
    explanation: L(
      "`<strong>` means importance. `<b>` is usually stylistic; CSS bold alone is not semantic.",
      "`<strong>` تعني أهمية. `<b>` غالبًا شكلي؛ الـ bold من CSS لوحده مش semantic.",
    ),
  },
  "accessibility-basics": {
    prompt: L(
      "Which control is ready for keyboard + screen readers?",
      "أنهي control جاهز للكيبورد و screen readers؟",
    ),
    options: [
      {
        id: "a",
        label: L("Div button", "Div button"),
        code: `<div onclick="save()">Save</div>`,
      },
      {
        id: "b",
        label: L("Native button", "Native button"),
        code: `<button type="button">Save</button>`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Native `<button>` ships role, focus, and Enter/Space activation for free.",
      "`<button>` الأصلي بيجيب role و focus و Enter/Space من غير تعب.",
    ),
  },
  "sr-practice": {
    prompt: L(
      "Which pattern is ready for keyboard + screen readers?",
      "أنهي نمط جاهز للكيبورد و screen readers؟",
    ),
    options: [
      {
        id: "a",
        label: L("Hidden focusable control", "control مخفي وعليه focus"),
        code: `<div aria-hidden="true"><button>Next</button></div>`,
      },
      {
        id: "b",
        label: L("Native control + clear name", "Native control + name واضح"),
        code: `<button type="button" aria-expanded="false" aria-controls="more">More</button>`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Never leave Tab stops inside `aria-hidden`. Prefer native controls with name + state that match the UI.",
      "متسيبش Tab جوّه `aria-hidden`. فضّل native controls مع name + state تطابق الـ UI.",
    ),
  },
  "meta-seo": {
    prompt: L(
      "Which pattern is ready for crawl → render → index?",
      "أنهي نمط جاهز لمسار crawl → render → index؟",
    ),
    options: [
      {
        id: "a",
        label: L("Empty CSR shell", "CSR shell فاضي"),
        code: `<title>Untitled</title>\n<div id="root"></div>`,
      },
      {
        id: "b",
        label: L("SSR head + main + real link", "SSR head + main + لينك حقيقي"),
        code: `<title>HTML track</title>\n<link rel="canonical" href="https://example.com/html" />\n<main>\n  <h1>HTML track</h1>\n  <a href="/html/forms-inputs">Learn HTML forms</a>\n</main>`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Ship title, canonical, primary copy, and real `<a href>` links in the first HTML — not an empty mount node.",
      "اطلع title و canonical والنص الأساسي ولينكات `<a href>` حقيقية في أول HTML — مش mount node فاضي.",
    ),
  },
  "html-core-web-vitals": {
    prompt: L(
      "Which markup helps LCP and CLS together?",
      "أنهي markup بيساعد LCP و CLS مع بعض؟",
    ),
    options: [
      {
        id: "a",
        label: L("Lazy hero with no size", "Hero lazy من غير مقاس"),
        code: `<img src="/hero.jpg" alt="Hero" loading="lazy" />`,
      },
      {
        id: "b",
        label: L("Sized hero, high priority", "Hero بمقاس وأولوية عالية"),
        code: `<img src="/hero.jpg" alt="Hero" width="1200" height="630" fetchpriority="high" />`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Size reserves layout (CLS) and skip lazy on the LCP element; fetchpriority helps the critical image win the network.",
      "المقاس بيحجز الـ layout (CLS) ومتعملش lazy على عنصر LCP؛ fetchpriority بيساعد الصورة الحرجة تكسب الشبكة.",
    ),
  },
  "native-dialog": {
    prompt: L(
      "How should you open a modal dialog?",
      "تفتح modal dialog إزاي؟",
    ),
    options: [
      {
        id: "a",
        label: L("Toggle a CSS class on a div", "تبدّل class على div"),
        code: `overlay.classList.add("open")`,
      },
      {
        id: "b",
        label: L("Native showModal()", "Native showModal()"),
        code: `dialog.showModal()`,
      },
    ],
    correctId: "b",
    explanation: L(
      "`showModal()` gives top-layer, backdrop, and focus trap from the engine.",
      "`showModal()` بيدي top-layer و backdrop و focus trap من الـ engine.",
    ),
  },
  "browser-compatibility": {
    prompt: L(
      "Safest way to gate a Newly Baseline API?",
      "أأمن طريقة تقيّد بيها API من Baseline Newly؟",
    ),
    options: [
      {
        id: "a",
        label: L("User-agent sniffing", "شمّ user-agent"),
        code: `if (/Safari/.test(navigator.userAgent)) …`,
      },
      {
        id: "b",
        label: L("Feature detection", "Feature detection"),
        code: `if ("showModal" in HTMLDialogElement.prototype) …`,
      },
    ],
    correctId: "b",
    explanation: L(
      "Feature detection asks the engine — UA strings lie and rot.",
      "Feature detection بيسأل الـ engine — نصوص الـ UA بتكذب وبتتعفن.",
    ),
  },
  "html-cheatsheet": {
    prompt: L(
      "Before copying a Newly Baseline snippet into production, you should…",
      "قبل ما تنسخ snippet من Baseline Newly للإنتاج، المفروض…",
    ),
    options: [
      {
        id: "a",
        label: L("Ship it everywhere with no fallback", "تنشره في كل حتة من غير fallback"),
      },
      {
        id: "b",
        label: L("Check Baseline + plan a fallback", "تراجع Baseline وتحط خطة fallback"),
      },
    ],
    correctId: "b",
    explanation: L(
      "Cheat cards include compatibility badges so you can decide before paste.",
      "كروت الـ CheatSheet فيها شارات توافق عشان تقرر قبل اللصق.",
    ),
  },
};

/** Default challenge when a lesson has no custom one. */
export function defaultHtmlChallenge(titleEn: string): LessonChallenge {
  return {
    prompt: L(
      `Quick check: which practice matches “${titleEn}”?`,
      `اختبار سريع: أنهي ممارسة بتطابق “${titleEn}”؟`,
    ),
    options: [
      {
        id: "a",
        label: L("Skip semantics and fix it later with CSS only", "تخطّي الـ semantics وتصلح بعدين بـ CSS بس"),
      },
      {
        id: "b",
        label: L("Prefer meaningful HTML first, enhance with CSS/JS", "فضّل HTML معنوي أولًا، وعزّز بـ CSS/JS"),
      },
    ],
    correctId: "b",
    explanation: L(
      "Production HTML starts with meaning — styling and scripts enhance, they don’t replace structure.",
      "HTML الإنتاج بيبدأ بالمعنى — الستايل والـ scripts بيزوّدوا، مش بيستبدلوا الهيكل.",
    ),
  };
}
