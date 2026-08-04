import { L } from "@/content/helpers";
import type { ComparePair } from "@/lib/types";

/**
 * Full Bad vs Screen-Reader Ready set — lives only on the dedicated practice lesson.
 * Ordered: basics → structure → forms → advanced AT patterns.
 */
export const screenReaderPracticeCards: ComparePair[] = [
  {
    title: L("Buttons vs clickable divs", "`Buttons` مقابل `div` قابلة للضغط"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="btn" onclick="save()">Save</div>`,
      note: L(
        "No role, no Enter/Space, not in Tab order. Mouse-only “buttons” fail keyboard and screen readers.",
        "مفيش `role`، مفيش `Enter`/`Space`، ومش في ترتيب `Tab`. “الزر” اللي ماوس بس بيفشل مع الكيبورد و `screen readers`.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<button type="button">Save</button>`,
      note: L(
        "Native `<button>` is focusable, works with Enter/Space, and is announced as a button.",
        "`<button>` الأصلي عليه focus، بيشتغل بـ Enter/Space، وبيتعلن كـ button.",
      ),
    },
  },
  {
    title: L("`Links` vs fake `spans`", "`Links` مقابل `span` مزيف"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<span class="link" onclick="location='/js'">Open JS</span>`,
      note: L(
        "Not a real link: no Tab stop, wrong role, can’t open in a new tab.",
        "مش `link` حقيقي: مفيش `Tab`، `role` غلط، ومتقدرش تفتحه في `tab` جديد.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<a href="/javascript">Open JS track</a>`,
      note: L(
        "A real `href` gives link semantics, keyboard support, and clear AT announcement.",
        "`href` حقيقي بيدي link semantics وكيبورد وإعلان واضح لـ AT.",
      ),
    },
  },
  {
    title: L("`Button` for actions, link for navigation", "`Button` للفعل، `link` للتنقّل"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<a href="#" onclick="save(); return false">Save</a>`,
      note: L(
        "Fake links confuse AT (“link”) and break middle-click / copy URL.",
        "الـ link المزيف بيخدع AT (“link”) وبيكسر middle-click ونسخ الـ URL.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<button type="button">Save</button>\n<a href="/lessons/html">HTML track</a>`,
      note: L(
        "Actions → `<button>`. Routes → `<a href>`. Don’t mix the two jobs.",
        "الأفعال → `<button>`. المسارات → `<a href>`. متخلطش الشغل الاتنين.",
      ),
    },
  },
  {
    title: L("Meaningful link text", "نص link مفهوم"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<a href="/docs">Click here</a>`,
      note: L(
        "In a links list, “Click here” has no destination (WCAG 2.4.4).",
        "في قائمة الـ links، “Click here” مفيش وجهة (WCAG 2.4.4).",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<a href="/docs">Read the HTML docs</a>`,
      note: L(
        "The text alone should name the destination when read out of context.",
        "النص لوحده لازم يسمّي الوجهة لما يتقرأ برّه السياق.",
      ),
    },
  },
  {
    title: L("Warn when opening a new `tab`", "حذّر لما تفتح `tab` جديد"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<a href="https://mdn.dev" target="_blank" rel="noopener">MDN</a>`,
      note: L(
        "A new tab can surprise users — screen readers get no cue.",
        "الـ tab الجديد ممكن يفاجئ الناس — screen readers مفيش عندها إشارة.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<a href="https://mdn.dev" target="_blank" rel="noopener noreferrer">\n  MDN (opens in a new tab)\n</a>`,
      note: L(
        "Put the new-tab behavior in the visible / accessible name.",
        "حط سلوك الـ tab الجديد في الاسم الظاهر / accessible name.",
      ),
    },
  },
  {
    title: L("`Images` need text alternatives", "الصور محتاجة text alternatives"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<img src="/chart.png" />`,
      note: L(
        "Missing `alt` — AT may read a useless filename or just “image”.",
        "مفيش `alt` — AT ممكن تقرأ اسم ملف فاضي أو “image” بس.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<img src="/chart.png" alt="Sales grew 20% in March" />`,
      note: L(
        "Describe the meaning, not the file. Skip “image of…” fluff.",
        "وصف المعنى، مش الملف. متكتبش “image of…” زيادة.",
      ),
    },
  },
  {
    title: L("`Decorative` `images` stay silent", "الصور التزيينية تفضل صامتة"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<img src="/sparkle.svg" alt="sparkle decoration" />`,
      note: L(
        "Decorative noise clutters the screen reader reading order.",
        "الضوضاء التزيينية بتزحّم ترتيب قراءة الـ screen reader.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<img src="/sparkle.svg" alt="" />`,
      note: L(
        "Empty `alt` tells AT to skip pure decoration (better than omitting `alt`).",
        "`alt` فاضي بيقول لـ AT تتخطى التزيين (أحسن من حذف `alt`).",
      ),
    },
  },
  {
    title: L("Language of the page", "لغة الصفحة"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<html>\n  <body>مرحبا بكم في FrontendCraft</body>\n</html>`,
      note: L(
        "Missing `lang` makes TTS use the wrong pronunciation rules.",
        "من غير `lang`، الـ TTS بيستخدم قواعد نطق غلط.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<html lang="ar">\n  <body>مرحبا بكم في FrontendCraft</body>\n</html>`,
      note: L(
        "`lang` sets TTS for the page. Use `lang` on spans for mixed text too.",
        "`lang` بيضبط TTS للصفحة. استخدم `lang` على spans كمان للنص المختلط.",
      ),
    },
  },
  {
    title: L("`Skip link` to main `content`", "`Skip link` للمحتوى الرئيسي"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<nav>…20 links…</nav>\n<main id="main">…</main>`,
      note: L(
        "Keyboard users re-Tab through the whole chrome on every page.",
        "مستخدمي الكيبورد بيعيدوا Tab على كل الـ chrome في كل صفحة.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<a class="skip" href="#main">Skip to content</a>\n<nav>…</nav>\n<main id="main">…</main>`,
      note: L(
        "First focusable control jumps past repeated nav (WCAG 2.4.1).",
        "أول control عليه focus بيقفز ورا الـ nav المتكرر (WCAG 2.4.1).",
      ),
    },
  },
  {
    title: L("`Landmarks` vs `div soup`", "`Landmarks` مقابل `div soup`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="header">…</div>\n<div class="main">…</div>\n<div class="footer">…</div>`,
      note: L(
        "CSS classes are not landmarks — AT can’t jump to main / nav / footer.",
        "الـ CSS classes مش landmarks — AT متقدرش تقفز لـ main / nav / footer.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<header>…</header>\n<nav aria-label="Primary">…</nav>\n<main>…</main>\n<footer>…</footer>`,
      note: L(
        "Use native landmarks. Name `<nav>` with `aria-label` when you have more than one.",
        "استخدم landmarks أصلية. سمّي `<nav>` بـ `aria-label` لو عندك أكتر من واحد.",
      ),
    },
  },
  {
    title: L("One main `landmark`", "`main` `landmark` واحد"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<main>Hero</main>\n<main>Article</main>`,
      note: L(
        "Many `<main>` tags confuse “jump to main” and landmark lists.",
        "أكتر من `<main>` بيخربط “jump to main” وقوائم الـ landmarks.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<main>\n  <section aria-labelledby="h">…</section>\n</main>`,
      note: L(
        "One `<main>` per page. Put sections inside it.",
        "`<main>` واحد لكل صفحة. حط الـ sections جوّاه.",
      ),
    },
  },
  {
    title: L("Honest `heading` ranks", "مراتب `headings` صادقة"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<h1>Site</h1>\n<h4>Section</h4>`,
      note: L(
        "Skipped heading levels break outline navigation for many SR users.",
        "تخطّي مستويات الـ headings بيكسر تنقّل الـ outline لناس كتير بتستخدم SR.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<h1>Site</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>`,
      note: L(
        "One page `<h1>`, then levels in order. Don’t pick a level only for looks.",
        "`<h1>` واحد للصفحة، وبعدين المستويات بالترتيب. متختارش مستوى عشان الشكل بس.",
      ),
    },
  },
  {
    title: L("Lists need list `markup`", "القوائم محتاجة list `markup`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="item">HTML</div>\n<div class="item">CSS</div>`,
      note: L(
        "AT won’t say “list, 2 items” — list shortcuts fail.",
        "AT مش هتقول “list, 2 items” — اختصارات الـ list بتفشل.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>`,
      note: L(
        "`<ul>` / `<ol>` / `<dl>` expose count and item navigation.",
        "`<ul>` / `<ol>` / `<dl>` بتعرض العدد وتنقّل الـ items.",
      ),
    },
  },
  {
    title: L("`Table` `headers` for data cells", "`Table headers` لخلايا البيانات"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<table>\n  <tr><td>Name</td><td>Score</td></tr>\n  <tr><td>Sam</td><td>90</td></tr>\n</table>`,
      note: L(
        "Without `<th>`, AT can’t announce column/row context.",
        "من غير `<th>`، AT متقدرش تعلن سياق الـ column/row.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<table>\n  <caption>Leaderboard</caption>\n  <tr><th scope="col">Name</th><th scope="col">Score</th></tr>\n  <tr><td>Sam</td><td>90</td></tr>\n</table>`,
      note: L(
        "`scope` links headers to cells. `<caption>` names the table.",
        "`scope` بيربط الـ headers بالخلايا. `<caption>` بيسمّي الـ table.",
      ),
    },
  },
  {
    title: L("`Labels` beat `placeholders`", "`Labels` أحسن من `placeholders`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<input type="email" placeholder="Email" />`,
      note: L(
        "Placeholder fades while typing and is a weak accessible name.",
        "الـ placeholder بيختفي وانت بتكتب، واسمه كـ accessible name ضعيف.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<label>\n  Email\n  <input type="email" name="email" autocomplete="email" />\n</label>`,
      note: L(
        "Keep a visible label. Add `name` / `autocomplete` for browsers and AT.",
        "سيّب label ظاهر. زوّد `name` / `autocomplete` للمتصفح و AT.",
      ),
    },
  },
  {
    title: L("Label every control", "سمّي كل control"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<input type="checkbox" name="terms" />\nI agree`,
      note: L(
        "Text next to a control is not an accessible name by itself.",
        "النص جنب الـ control مش accessible name لوحده.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<label>\n  <input type="checkbox" name="terms" />\n  I agree to the terms\n</label>`,
      note: L(
        "A wrapping `<label>` sets the name and makes a bigger click/tap target.",
        "`<label>` الملفوف بيضبط الاسم وبيكبر منطقة الضغط.",
      ),
    },
  },
  {
    title: L("Group related radios", "جمّع الـ radios المرتبطة"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<p>Plan</p>\n<input type="radio" name="plan" value="free" /> Free\n<input type="radio" name="plan" value="pro" /> Pro`,
      note: L(
        "The group name is not exposed — SR may not say “Plan” with each option.",
        "اسم المجموعة مش ظاهر — الـ SR ممكن متقولش “Plan” مع كل option.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<fieldset>\n  <legend>Plan</legend>\n  <label><input type="radio" name="plan" value="free" /> Free</label>\n  <label><input type="radio" name="plan" value="pro" /> Pro</label>\n</fieldset>`,
      note: L(
        "`<fieldset>` + `<legend>` name the group. Same `name` ties the radios.",
        "`<fieldset>` + `<legend>` بيسمّوا المجموعة. نفس `name` بيربط الـ radios.",
      ),
    },
  },
  {
    title: L("Describe field errors", "وصف أخطاء الـ fields"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<input type="email" aria-invalid="true" />\n<span class="err">Invalid email</span>`,
      note: L(
        "Error text is not linked to the field — focus can miss it.",
        "نص الـ error مش مربوط بالـ field — الـ focus ممكن يفوته.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<label for="email">Email</label>\n<input id="email" type="email" aria-invalid="true" aria-describedby="email-err" />\n<span id="email-err" role="alert">Invalid email</span>`,
      note: L(
        "`aria-describedby` reads the error with the field. `role=\"alert\"` is optional for urgent errors.",
        "`aria-describedby` بيقرأ الـ error مع الـ field. `role=\"alert\"` اختياري للأخطاء العاجلة.",
      ),
    },
  },
  {
    title: L("`Icon-only` `controls` need names", "`Controls` بالأيقونات محتاجة `names`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<button type="button"><svg>…</svg></button>`,
      note: L(
        "Announced as “button” with no purpose — empty accessible name.",
        "بتتعلن “button” من غير غرض — accessible name فاضي.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<button type="button" aria-label="Close dialog">\n  <svg aria-hidden="true">…</svg>\n</button>`,
      note: L(
        "Add a name (`aria-label` or visually hidden text). Hide decorative SVG from AT.",
        "زوّد name (`aria-label` أو نص مخفي بصريًا). اخفي SVG التزييني عن AT.",
      ),
    },
  },
  {
    title: L("Don’t hide focusable `content`", "متخفيش محتوى عليه `focus`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div aria-hidden="true">\n  <button type="button">Continue</button>\n</div>`,
      note: L(
        "A focusable control inside `aria-hidden` is a classic AT trap.",
        "control عليه focus جوّه `aria-hidden` فخ كلاسيكي لـ AT.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<div hidden>\n  <button type="button">Continue</button>\n</div>`,
      note: L(
        "Use `hidden` or remove from the DOM. Don’t leave Tab stops inside `aria-hidden`.",
        "استخدم `hidden` أو اشيل من الـ DOM. متسيبش Tab جوّه `aria-hidden`.",
      ),
    },
  },
  {
    title: L("`Skip` positive `tabindex`", "تجنّب `tabindex` الموجب"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<a href="#a" tabindex="3">A</a>\n<button type="button" tabindex="1">B</button>`,
      note: L(
        "Positive `tabindex` breaks the natural reading and Tab order.",
        "`tabindex` الموجب بيكسر ترتيب القراءة و Tab الطبيعي.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<a href="#a">A</a>\n<button type="button">B</button>`,
      note: L(
        "DOM order should equal Tab order. Use `0` / `-1` only for custom widgets.",
        "ترتيب الـ DOM لازم يساوي ترتيب Tab. استخدم `0` / `-1` للـ custom widgets بس.",
      ),
    },
  },
  {
    title: L("Keep a `visible` `focus` style", "سيّب `focus` style ظاهر"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `button:focus { outline: none; }`,
      note: L(
        "Removing outline with no replacement makes keyboard users lose their place.",
        "شيل الـ outline من غير بديل بيضيّع مكان مستخدمي الكيبورد.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `button:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 2px;\n}`,
      note: L(
        "`:focus-visible` shows a clear ring for keyboard without annoying mouse clicks.",
        "`:focus-visible` بيظهر حلقة واضحة للكيبورد من غير ما يزعج ضغطات الماوس.",
      ),
    },
  },
  {
    title: L("`Modal overlays`", "`Modal overlays`"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="modal open">Confirm?</div>`,
      note: L(
        "No dialog role, no focus trap, no Escape — background stays in Tab order.",
        "مفيش dialog role، مفيش focus trap، مفيش Escape — الخلفية لسه في ترتيب Tab.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<dialog aria-labelledby="t">\n  <h2 id="t">Confirm?</h2>\n  <button type="button">OK</button>\n</dialog>`,
      note: L(
        "Native `<dialog>` + `showModal()` gives top layer, backdrop, and focus management.",
        "`<dialog>` أصلي + `showModal()` بيدي top layer و backdrop وإدارة focus.",
      ),
    },
  },
  {
    title: L("iframe needs a title", "الـ iframe محتاج title"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<iframe src="/embed"></iframe>`,
      note: L(
        "Screen readers hear “frame” with no purpose.",
        "الـ screen readers بتسمع “frame” من غير غرض.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<iframe title="Event Loop demo" src="/embed" loading="lazy"></iframe>`,
      note: L(
        "`title` names the embedded document in the accessibility tree.",
        "`title` بيسمّي المستند المضمّن في الـ accessibility tree.",
      ),
    },
  },
  {
    title: L("`Announce` async status", "أعلن حالة الـ async"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<p class="toast">Saved!</p>`,
      note: L(
        "A visual toast alone is silent — screen readers miss the confirmation.",
        "الـ toast البصري لوحده صامت — الـ screen readers بتفوّت التأكيد.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<p role="status" aria-live="polite">Saved!</p>`,
      note: L(
        "A polite live region announces the update without stealing focus.",
        "live region مهذب بيعلن التحديث من غير ما يسرق الـ focus.",
      ),
    },
  },
  {
    title: L("Expand/collapse `state`", "حالة expand/collapse"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="toggle open" onclick="…">More</div>\n<div class="panel">…</div>`,
      note: L(
        "No button role and no expanded state — AT can’t tell open vs closed.",
        "مفيش button role ومفيش expanded state — AT متعرفش مفتوح ولا مقفول.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<button type="button" aria-expanded="true" aria-controls="panel">More</button>\n<div id="panel">…</div>`,
      note: L(
        "Keep `aria-expanded` in sync with the panel. Prefer `<details>` when you can.",
        "خلّي `aria-expanded` يطابق الـ panel. فضّل `<details>` لما تقدر.",
      ),
    },
  },
  {
    title: L("Prefer native details", "فضّل details الأصلي"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<div class="faq-q" onclick="toggle()">Q?</div>\n<div class="faq-a hidden">A</div>`,
      note: L(
        "Custom FAQ often forgets keyboard, focus, and announced open state.",
        "الـ FAQ المخصص غالبًا بينسى الكيبورد والـ focus وحالة الفتح المعلنة.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<details>\n  <summary>Q?</summary>\n  <p>A</p>\n</details>`,
      note: L(
        "Native disclosure gives keyboard + AT behavior with almost no JS.",
        "الـ disclosure الأصلي بيدي كيبورد وسلوك AT من غير JS تقريبًا.",
      ),
    },
  },
  {
    title: L("Don’t override native `roles` lightly", "متستبدلش الـ native `roles` بسهولة"),
    bad: {
      label: L("Accessibility barrier", "حاجز `accessibility`"),
      code: `<h2 role="presentation">Pricing</h2>\n<div role="button" tabindex="0">Buy</div>`,
      note: L(
        "`role=\"presentation\"` on a heading removes meaning. Fake buttons need a full keyboard map.",
        "`role=\"presentation\"` على heading بيمسح المعنى. الـ button المزيف محتاج خريطة كيبورد كاملة.",
      ),
    },
    good: {
      label: L("Semantic & SR ready", "`semantic` وجاهز لقارئ الشاشة"),
      code: `<h2>Pricing</h2>\n<button type="button">Buy</button>`,
      note: L(
        "Keep native semantics. Use ARIA only when no HTML element fits.",
        "سيّب الـ native semantics. استخدم ARIA بس لما مفيش عنصر HTML يناسب.",
      ),
    },
  },
];
