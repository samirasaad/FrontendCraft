import { L, pitfall } from "@/content/helpers";
import type { PitfallExample } from "@/lib/types";

/** All HTML wrong/right pairs — shown only inside the Pitfalls tier. */
export const collectedHtmlPitfalls: PitfallExample[] = [
  pitfall(
    `<html>
  <body>...</body>
</html>`,
    L(
      "No doctype / lang / charset — quirks and a11y suffer.",
      "من غير `doctype`/`lang`/`charset` — `quirks` و `a11y` بيتضرروا.",
    ),
    `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>App</title></head>
  <body>...</body>
</html>`,
    L(
      "Start every page from a complete, modern skeleton.",
      "ابدأ كل صفحة من هيكل حديث مكتمل.",
    ),
    L("Document shell", "هيكل المستند"),
  ),
  pitfall(
    `<div class="header">...</div>
<div class="main">...</div>`,
    L("Classes are not `semantics`.", "الـ classes مش `semantics`."),
    `<header>...</header>
<main>...</main>`,
    L(
      "Use the element that already means the role.",
      "استخدم العنصر اللي معناه هو الدور نفسه.",
    ),
    L("Semantic landmarks", "`Landmarks` الـ `semantic`"),
  ),
  pitfall(
    `<p class="title">Big text</p>`,
    L("Styled paragraphs are not `headings`.", "فقرة بشكل عنوان مش `heading`."),
    `<h2>Big text</h2>`,
    L(
      "Pick the correct rank; style with CSS.",
      "اختار المستوى الصح؛ والشكل من CSS.",
    ),
    L("Headings", "العناوين"),
  ),
  pitfall(
    `<a href="/x"><img src="https://placehold.co/80x80/94a3b8/fff.jpg?text=X"></a>`,
    L(
      "Missing alt → empty accessible name.",
      "من غير alt → اسم وصول فاضي.",
    ),
    `<a href="/x"><img src="https://placehold.co/80x80/94a3b8/fff.jpg?text=X" alt="Open lab X" /></a>`,
    L("Give the link a spoken name.", "ادي للينك اسم يتقال."),
    L("`Links` & `images`", "اللينكات والصور"),
  ),
  pitfall(
    `<div>• Item</div>`,
    L("Fake bullets are not lists.", "نقط مزيفة مش `lists`."),
    `<ul><li>Item</li></ul>`,
    L(
      "Real lists expose list semantics to screen readers.",
      "الـ lists الحقيقية بتدي semantics لقارئ الشاشة.",
    ),
    L("Lists", "القوائم"),
  ),
  pitfall(
    `<input placeholder="Email" />`,
    L(
      "Placeholder is not a label — it disappears while typing.",
      "الـ `placeholder` مش `label` — بيختفي وأنت بتكتب.",
    ),
    `<label>Email <input type="email" name="email" /></label>`,
    L(
      "Visible label stays while the user types.",
      "الـ label يفضل ظاهر والمستخدم بيكتب.",
    ),
    L("Forms & labels", "النماذج والـ `labels`"),
  ),
  pitfall(
    `<div class="row"><div>Beginner</div><div>3/3</div></div>`,
    L("Div grids are not `data tables`.", "شبكات الـ `div` مش جداول بيانات."),
    `<table>...</table>`,
    L(
      "Use tables for tabular data, not page layout.",
      "استخدم الجداول لبيانات جدولية مش لـ layout الصفحة.",
    ),
    L("`Tables`", "الجداول"),
  ),
  pitfall(
    `<div role="button">Save</div>`,
    L(
      "Fake buttons need full keyboard support — easy to get wrong.",
      "أزرار مزيفة محتاجة دعم كيبورد كامل — سهل تتغلط.",
    ),
    `<button type="button">Save</button>`,
    L(
      "Native elements ship the hard parts.",
      "العناصر الأصلية بتجيب الجزء الصعب جاهز.",
    ),
    L("Accessibility controls", "عناصر التحكم و`accessibility`"),
  ),
  pitfall(
    `<title>Untitled</title>`,
    L(
      "Default titles waste the richest SERP text.",
      "عناوين افتراضية بتضيع أهم نص في نتائج البحث.",
    ),
    `<title>FrontendCraft — JavaScript lab</title>`,
    L("Specific, human `titles` win clicks.", "عنوان واضح وبشري بيكسب نقرات."),
    L("Meta & SEO", "الـ `meta` و `SEO`"),
  ),
  pitfall(
    `<video src="x.mp4" autoplay></video>`,
    L(
      "Autoplay without controls/captions hurts users.",
      "Autoplay من غير controls/captions بيضر المستخدم.",
    ),
    `<video controls playsinline>
  <source src="x.mp4" type="video/mp4" />
</video>`,
    L(
      "Give control to the user; add tracks when you can.",
      "سيّب التحكم للمستخدم؛ وزوّد tracks لما تقدر.",
    ),
    L("Media", "الوسائط"),
  ),
  pitfall(
    `<a href="#" onclick="save()">Save</a>`,
    L("Fake navigation for an action.", "تنقّل مزيف لفعل."),
    `<button type="button" onclick="save()">Save</button>`,
    L(
      "Real button semantics + keyboard support.",
      "زر حقيقي + دعم كيبورد.",
    ),
    L("Buttons vs links", "الأزرار مقابل اللينكات"),
  ),
  pitfall(
    `<p><div>card</div></p>`,
    L("`Block` inside `<p>` is invalid.", "`Block` جوه `<p>` باطل."),
    `<div><p>card</p></div>`,
    L(
      "Or use `<section>` / `<article>` for the card.",
      "أو استخدم `<section>` / `<article>` للكارت.",
    ),
    L("Invalid nesting", "تداخل غير صالح"),
  ),
  pitfall(
    `<a href="https://example.com" target="_blank">Docs</a>`,
    L(
      "`target=\"_blank\"` without `rel` can expose `window.opener` to the new page.",
      "`target=\"_blank\"` من غير `rel` ممكن يفتح `window.opener` للصفحة الجديدة.",
    ),
    `<a href="https://example.com" target="_blank" rel="noopener noreferrer">Docs</a>`,
    L(
      "Always pair new tabs with `rel=\"noopener noreferrer\"`.",
      "دايمًا اربط التاب الجديد بـ `rel=\"noopener noreferrer\"`.",
    ),
    L("New-tab links", "لينكات التاب الجديد"),
  ),
  pitfall(
    `<h1>Lab</h1>
<h3>Lesson</h3>`,
    L(
      "Skipping heading levels breaks the document outline for screen readers.",
      "تخطي مستويات العناوين بيكسر الـ outline لقارئ الشاشة.",
    ),
    `<h1>Lab</h1>
<h2>Lesson</h2>`,
    L(
      "Step down one level at a time; style size with CSS.",
      "انزل مستوى واحد كل مرة؛ وحجم الخط من CSS.",
    ),
    L("Heading order", "ترتيب العناوين"),
  ),
  pitfall(
    `<img src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero" alt="Hero" />`,
    L(
      "No width/height → layout shift (CLS) when the image loads.",
      "من غير width/height → قفزة layout (CLS) لما الصورة تتحمّل.",
    ),
    `<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="Learner at a laptop"
  width="1200"
  height="630"
/>`,
    L(
      "Reserve space with `width`/`height` (or CSS `aspect-ratio`).",
      "احجز المساحة بـ `width`/`height` (أو `aspect-ratio`).",
    ),
    L("Image dimensions", "مقاسات الصور"),
  ),
  pitfall(
    `<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="Hero"
  loading="lazy"
/>`,
    L(
      "`loading=\"lazy\"` on the LCP/hero image delays the biggest paint.",
      "`loading=\"lazy\"` على صورة LCP/hero بيأخّر أكبر رسم.",
    ),
    `<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="Learner at a laptop"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
    L(
      "Eager-load above-the-fold heroes; lazy-load the rest.",
      "حمّل صور أول شاشة بسرعة؛ والباقي `lazy`.",
    ),
    L("Lazy LCP image", "صورة LCP بـ lazy"),
  ),
  pitfall(
    `<iframe src="/embed"></iframe>`,
    L(
      "Untitled iframes are unnamed frames for screen readers.",
      "`iframe` من غير عنوان = إطار من غير اسم لقارئ الشاشة.",
    ),
    `<iframe src="/embed" title="Lesson preview"></iframe>`,
    L(
      "Give every iframe a short, descriptive `title`.",
      "ادي لكل `iframe` عنوان قصير وواضح.",
    ),
    L("iframe title", "عنوان الـ iframe"),
  ),
  pitfall(
    `<div aria-hidden="true">
  <button type="button">Close</button>
</div>`,
    L(
      "Focusable controls inside `aria-hidden` trap keyboard and screen-reader users.",
      "عناصر عليها focus جوّه `aria-hidden` بتحبس مستخدمي الكيبورد/screen readers.",
    ),
    `<div hidden>
  <button type="button">Close</button>
</div>`,
    L(
      "Hide the whole path (`hidden` / `inert`) — or remove it from the DOM.",
      "اخفي المسار كله (`hidden` / `inert`) — أو شيّله من الـ DOM.",
    ),
    L("Hidden but focusable", "مخفي ولسه عليه focus"),
  ),
  pitfall(
    `<button>Save</button>
<button>Cancel</button>`,
    L(
      "Missing `type` defaults to `submit` inside forms — surprise submits.",
      "من غير `type` الافتراضي `submit` جوّه الفورم — إرسال مفاجئ.",
    ),
    `<button type="submit">Save</button>
<button type="button">Cancel</button>`,
    L(
      "Set `type` explicitly on every button.",
      "حط `type` صريح على كل زر.",
    ),
    L("Button types", "أنواع الأزرار"),
  ),
  pitfall(
    `<a href="#">Open dialog</a>`,
    L(
      "`href=\"#\"` is fake navigation and breaks middle-click / open-in-new-tab.",
      "`href=\"#\"` تنقّل مزيف وبيكسر middle-click / فتح في تاب جديد.",
    ),
    `<button type="button">Open dialog</button>`,
    L(
      "Use a button for in-page actions; use real URLs for links.",
      "استخدم زر لأفعال جوّه الصفحة؛ وURL حقيقي للينكات.",
    ),
    L("href=\"#\" actions", "أفعال بـ href=\"#\""),
  ),
  pitfall(
    `<br /><br /><br />
<p>Next section</p>`,
    L(
      "Stacking `<br>` for spacing is layout, not content.",
      "تكديس `<br>` للمسافات = layout مش محتوى.",
    ),
    `<section class="stack">
  <p>Next section</p>
</section>`,
    L(
      "Space with CSS (`margin` / `gap`), not line breaks.",
      "اعمل المسافات بـ CSS (`margin` / `gap`) مش بكسور سطر.",
    ),
    L("Spacing with br", "مسافات بـ br"),
  ),
  pitfall(
    `<img
  src="https://placehold.co/48x48/e2e8f0/64748b.svg?text=%2A"
  alt="sparkle icon"
/>`,
    L(
      "Decorative images with text `alt` add noise for screen readers.",
      "صور ديكور بـ `alt` نصّي بتزوّد ضوضاء لقارئ الشاشة.",
    ),
    `<img
  src="https://placehold.co/48x48/e2e8f0/64748b.svg?text=%2A"
  alt=""
/>`,
    L(
      "Empty `alt=\"\"` marks decoration; informative images need real `alt`.",
      "`alt=\"\"` للديكور؛ الصور المفيدة محتاجة `alt` حقيقي.",
    ),
    L("Decorative alt", "alt للديكور"),
  ),
  pitfall(
    `<meta name="description" content="Welcome to our website." />`,
    L(
      "Generic descriptions waste the SERP snippet under your title.",
      "وصف عام بيضيّع snippet نتائج البحث تحت العنوان.",
    ),
    `<meta name="description" content="Learn HTML with live labs, quizzes, and bilingual tips on FrontendCraft." />`,
    L(
      "Write a specific description that matches the page intent.",
      "اكتب وصف محدد يطابق هدف الصفحة.",
    ),
    L("Meta description", "وصف الـ meta"),
  ),
  pitfall(
    `<html>
  <head><title>App</title></head>
  <body>...</body>
</html>`,
    L(
      "Missing viewport meta breaks mobile layout and tap targets.",
      "من غير viewport meta بيتكسّر layout الموبايل وأماكن اللمس.",
    ),
    `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>App</title>
</head>`,
    L(
      "Always ship a responsive viewport meta in `<head>`.",
      "دايمًا حط viewport meta متجاوب في `<head>`.",
    ),
    L("Viewport meta", "ميتـا الـ viewport"),
  ),
  pitfall(
    `<h1>Home</h1>
...
<h1>Pricing</h1>`,
    L(
      "Multiple `<h1>`s confuse the page’s main topic for screen readers and SEO.",
      "أكتر من `<h1>` بيلبّس موضوع الصفحة على screen readers و SEO.",
    ),
    `<h1>Home</h1>
...
<h2>Pricing</h2>`,
    L(
      "Keep one main `<h1>`; nest the rest under it.",
      "خلّي `<h1>` واحد رئيسي؛ والباقي تحته.",
    ),
    L("Multiple h1", "أكتر من h1"),
  ),
  pitfall(
    `<label>Email</label>
<input type="email" name="email" />`,
    L(
      "A nearby label without `for`/`id` is not programmatically tied.",
      "`label` قريب من غير `for`/`id` مش مربوط برمجيًا.",
    ),
    `<label for="email">Email</label>
<input id="email" type="email" name="email" />`,
    L(
      "Connect labels with matching `for` and `id` (or wrap the input).",
      "اربط الـ labels بـ `for` و `id` متطابقين (أو لفّ الـ input).",
    ),
    L("Label association", "ربط الـ label"),
  ),
  pitfall(
    `<span onclick="toggle()" tabindex="0">Menu</span>`,
    L(
      "Custom widgets need roles, keyboard keys, and states — easy to miss.",
      "ودجت مخصصة محتاجة roles ومفاتيح كيبورد وحالات — سهل تتفوت.",
    ),
    `<button type="button" aria-expanded="false">Menu</button>`,
    L(
      "Prefer native controls; add ARIA only when you must customize.",
      "فضّل عناصر أصلية؛ وزوّد ARIA بس لما لازم تخصّص.",
    ),
    L("Custom widgets", "ودجت مخصصة"),
  ),
  pitfall(
    `<a href="/js">
  <h2>JavaScript</h2>
  <button type="button">Start</button>
</a>`,
    L(
      "Interactive content nested inside links creates nested controls — broken for screen readers.",
      "محتوى تفاعلي جوّه لينك = عناصر متداخلة — بايظة لـ screen readers.",
    ),
    `<article>
  <h2><a href="/js">JavaScript</a></h2>
  <button type="button">Start</button>
</article>`,
    L(
      "One interactive job per control — link the title, keep the button separate.",
      "شغل تفاعلي واحد لكل عنصر — لينك العنوان، والزر منفصل.",
    ),
    L("Nested interactives", "تفاعل متداخل"),
  ),
  pitfall(
    `<div id="root"></div>`,
    L(
      "An empty client root ships no content for the first HTML response / crawlers.",
      "root فاضي من الكلاينت = مفيش محتوى في أول رد HTML / للزاحف.",
    ),
    `<main id="root">
  <h1>JavaScript lab</h1>
  <p>Start with values and memory.</p>
</main>`,
    L(
      "SSR or prerender real title, text, and links in the first HTML.",
      "اعمل SSR أو prerender لعنوان ونص ولينكات حقيقية في أول HTML.",
    ),
    L("Empty SPA shell", "هيكل SPA فاضي"),
  ),
  pitfall(
    `<input type="text" name="email" />`,
    L(
      "Wrong `type` skips mobile keyboards, built-in validation, and autofill hints.",
      "`type` غلط = كيبورد موبايل غلط، وفحص مدمج ضعيف، وautofill ضعيف.",
    ),
    `<input type="email" name="email" autocomplete="email" />`,
    L(
      "Pick the matching input type and helpful `autocomplete` values.",
      "اختار `type` المناسب وقيم `autocomplete` مفيدة.",
    ),
    L("Input types", "أنواع الـ input"),
  ),
];
