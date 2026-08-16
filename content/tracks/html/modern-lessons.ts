import {
  L,
  hardExample,
  hardHtmlDoc,
  mediumExample,
  simpleExample,
  support,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import { screenReaderPracticeCards } from "@/content/tracks/html/compare-cards";

/** Modern high-value HTML lessons — final order lives in HTML_CURRICULUM_ORDER. */
export const modernLessons: LessonDraft[] = [
  {
    id: "html-11",
    order: 9,
    slug: "form-ux-attributes",
    tier: "intermediate",
    readMinutes: 7,
    icon: "Keyboard",
    visualizer: "form-flow",
    content: {
      title: L(
        "Form UX: inputmode, pattern & autocomplete",
        "تجربة النماذج: `inputmode` و `pattern` و `autocomplete`",
      ),
      summary: L(
        "Show the right phone keyboard, speed autofill, and check values with attributes — before you write JavaScript.",
        "ظهر كيبورد الموبايل الصح، سرّع الـ autofill، واتحقق من القيم بالـ attributes — قبل ما تكتب JavaScript.",
      ),
      paragraphs: [
        L(
          "`inputmode` tells the phone which keyboard to show (`email`, `tel`, `numeric`, `decimal`, `url`, `search`). It does not change the value. Keep a correct `type` as the real fallback.",
          "`inputmode` بيقول للموبايل أنهي كيبورد يظهر (`email` و `tel` و `numeric` و `decimal` و `url` و `search`). مش بيغيّر القيمة. خلّي `type` الصحيح هو الـ fallback الحقيقي.",
        ),
        L(
          "`autocomplete` values (`name`, `email`, `tel`, `street-address`, `one-time-code`) let the browser and password manager fill fields safely. A wrong value is worse than leaving `autocomplete` off.",
          "قيم `autocomplete` (`name` و `email` و `tel` و `street-address` و `one-time-code`) بتخلّي المتصفح ومدير كلمات المرور يملوا الحقول بأمان. القيمة الغلط أسوأ من إنك متكتبش `autocomplete`.",
        ),
        L(
          "`pattern` checks the text with a `regex` when the form submits. Add a clear `title` or error message — a `regex` alone does not explain the mistake.",
          "`pattern` بيفحص النص بـ `regex` لما الفورم تتبعت. حط `title` أو رسالة خطأ واضحة — الـ `regex` لوحده مش بيشرح الغلط.",
        ),
      ],
      keyPoints: [
        L("Use `type` for meaning; `inputmode` for the keyboard", "استخدم `type` للمعنى؛ `inputmode` للكيبورد"),
        L("Prefer standard `autocomplete` tokens", "فضّل رموز `autocomplete` القياسية"),
        L("Explain `pattern` failures in plain language", "اشرح فشل `pattern` بلغة بسيطة"),
      ],
      examples: [
        simpleExample(
          `<label>
  Phone
  <input
    name="phone"
    type="tel"
    inputmode="tel"
    autocomplete="tel"
    pattern="[0-9+\\-\\s]{8,}"
    title="Include country code if possible"
    required
  />
</label>`,
          "Tel field with keyboard + autocomplete + pattern",
          "حقل هاتف بكيبورد و autocomplete و pattern",
        ),
        mediumExample(
          `<form>
  <label>
    Full name
    <input name="name" autocomplete="name" required />
  </label>
  <label>
    Email
    <input
      name="email"
      type="email"
      inputmode="email"
      autocomplete="email"
      required
    />
  </label>
  <button type="submit">Sign up</button>
</form>`,
          "Sign-up form with name + email autocomplete",
          "فورم تسجيل بـ autocomplete للاسم والإيميل",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Verify sign-in</h1>
  <form action="/verify" method="post">
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      inputmode="email"
      autocomplete="email"
      required
    />

    <label for="otp">One-time code</label>
    <input
      id="otp"
      name="otp"
      inputmode="numeric"
      autocomplete="one-time-code"
      pattern="[0-9]{6}"
      maxlength="6"
      aria-describedby="otp-hint"
      required
    />
    <p id="otp-hint">Enter the 6-digit code from your email.</p>

    <button type="submit">Continue</button>
  </form>
</main>`,
            { title: "Sign-in verification" },
          ),
          "Full page: email + OTP with autocomplete and hint",
          "صفحة كاملة: email و OTP مع autocomplete وتلميح",
        ),
      ],
      visualHint: L(
        "Same form lab — focus, types, checkbox, then submit.",
        "نفس معمل الفورم — `focus` وكتابة و `checkbox` وبعدين `submit`.",
      ),
    },
  },
  {
    id: "html-12",
    order: 14,
    slug: "browser-compatibility",
    tier: "advanced",
    readMinutes: 8,
    icon: "MonitorCheck",
    visualizer: "baseline-compat",
    content: {
      title: L(
        "Browser Compatibility & Baseline",
        "التوافق مع المتصفحات و `Baseline`",
      ),
      summary: L(
        "Chrome, Firefox, Safari, Edge, W3C Baseline, and when you need a fallback.",
        "Chrome و Firefox و Safari و Edge و W3C Baseline، وإمتى تحتاج fallback.",
      ),
      paragraphs: [
        L(
          "Browsers update themselves, but every API does not arrive everywhere on the same day. W3C Baseline marks each feature as Widely available, Newly available, or Limited availability. Check that before you build a screen around a tag or API.",
          "المتصفحات بتحدّث نفسها، بس كل API مش بيوصل كل حتة في نفس اليوم. W3C Baseline بيعلّم كل ميزة Widely available أو Newly available أو Limited availability. راجع كده قبل ما تبني شاشة على tag أو API.",
        ),
        L(
          "Widely available is safe as a default for most products. Newly available (like reliable `<dialog>` `showModal()`) works in current browsers, but you still need a plan: a `polyfill`, or a simple HTML fallback for older browsers.",
          "Widely available آمن كافتراضي لمعظم المنتجات. Newly available (زي `showModal()` في `<dialog>`) شغال في المتصفحات الحالية، بس لسه محتاج خطة: `polyfill`، أو HTML fallback بسيط للمتصفحات الأقدم.",
        ),
        L(
          "Detect the feature. Do not guess from the user-agent string: `if ('showModal' in HTMLDialogElement.prototype)`. Keep a usable HTML fallback so a gap in Safari or an old company Chrome does not break the whole flow.",
          "اكشف الميزة. متخمّنش من نص الـ user-agent: `if ('showModal' in HTMLDialogElement.prototype)`. سيّب HTML fallback يشتغل عشان فجوة في Safari أو Chrome شركة قديم متكسرش التدفق كله.",
        ),
        L(
          "Safari / WebKit often gets new APIs later than Chrome and Firefox — test it by hand. The tables below are the source of truth for this lab: `dialog`, `details`, `picture`, lazy media, form hints, `template`, `search`, `popover`, `inert`, and media tracks.",
          "Safari / WebKit غالبًا بياخد الـ APIs الجديدة بعد Chrome و Firefox — اختبره بإيدك. الجداول تحت هي المصدر الموثوق للمعمل ده: `dialog` و `details` و `picture` و lazy media وتلميحات الفورم و `template` و `search` و `popover` و `inert` و media tracks.",
        ),
      ],
      keyPoints: [
        L("Use `Baseline` + caniuse / MDN — not rumors", "استخدم `Baseline` + caniuse / MDN — مش الإشاعات"),
        L("Widely = default; Newly = needs a fallback plan", "`Widely` = افتراضي؛ `Newly` = محتاج خطة `fallback`"),
        L("Feature-detect; progressive-enhance", "Feature-`detect`؛ بعدين progressive-enhance"),
        L("Test at least one WebKit (Safari) path", "اختبر مسار `WebKit` (`Safari`) واحد على الأقل"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Feature-detect showModal</title>
  </head>
  <body>
    <main>
      <h1>Baseline check</h1>
      <p id="status">Click Open to feature-detect <code>showModal</code>.</p>
      <button type="button" id="open">Open confirm</button>
      <p id="fallback" hidden>
        Fallback path: <a href="#confirm-page">Confirm reset page</a>
      </p>
    </main>

    <dialog id="confirm" aria-labelledby="dlg-title">
      <h2 id="dlg-title">Confirm</h2>
      <p>Reset progress?</p>
      <form method="dialog">
        <button value="cancel">Cancel</button>
        <button value="ok">Reset</button>
      </form>
    </dialog>

    <script>
      const dialog = document.getElementById("confirm");
      const status = document.getElementById("status");
      const fallback = document.getElementById("fallback");
      const canModal =
        typeof HTMLDialogElement !== "undefined" &&
        typeof HTMLDialogElement.prototype.showModal === "function";

      status.textContent = canModal
        ? "showModal is available — progressive enhancement path."
        : "showModal missing — showing HTML fallback link.";

      if (!canModal) {
        fallback.hidden = false;
      }

      document.getElementById("open").addEventListener("click", () => {
        if (canModal) {
          dialog.showModal();
        } else {
          fallback.hidden = false;
          fallback.querySelector("a")?.focus();
        }
      });
    </script>
  </body>
</html>`,
          "Feature-detect showModal before calling it",
          "افحص showModal قبل ما تستدعيه",
        ),
        mediumExample(
          `<main>
      <h1>Hero image</h1>
      <picture>
        <source srcset="/students-coding.svg" type="image/svg+xml" />
        <img
          src="https://placehold.co/800x450/0284c7/fff.jpg?text=JPEG+fallback"
          alt="Course banner"
          width="800"
          height="450"
        />
      </picture>
    </main>`,
          "Picture with a real SVG source + JPEG fallback",
          "picture بمصدر SVG حقيقي + JPEG fallback",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Release gate</h1>
  <p id="status">Checking Baseline support…</p>
  <button type="button" id="open">Reset progress</button>
  <p id="fallback" hidden>
    Fallback: <a href="#confirm-reset">Confirm on a separate page</a>
  </p>

  <details>
    <summary>Compatibility checklist</summary>
    <ul>
      <li>Baseline status reviewed</li>
      <li>Safari smoke test scheduled</li>
      <li>Fallback path documented</li>
    </ul>
  </details>

  <dialog id="confirm" aria-labelledby="dlg-title">
    <h2 id="dlg-title">Confirm reset</h2>
    <p>This clears your lesson progress.</p>
    <form method="dialog">
      <button value="cancel">Cancel</button>
      <button value="ok">Reset</button>
    </form>
  </dialog>

  <script>
    const dialog = document.getElementById("confirm");
    const status = document.getElementById("status");
    const fallback = document.getElementById("fallback");
    const canModal =
      typeof HTMLDialogElement !== "undefined" &&
      typeof HTMLDialogElement.prototype.showModal === "function";

    status.textContent = canModal
      ? "showModal supported — native dialog path."
      : "showModal missing — HTML fallback link only.";

    if (!canModal) fallback.hidden = false;

    document.getElementById("open").addEventListener("click", () => {
      if (canModal) dialog.showModal();
      else {
        fallback.hidden = false;
        fallback.querySelector("a")?.focus();
      }
    });
  </script>
</main>`,
            { title: "Baseline release gate" },
          ),
          "Full page: feature-detect dialog + checklist + HTML fallback",
          "صفحة كاملة: feature-detect لـ dialog + checklist + fallback HTML",
        ),
      ],
      visualHint: L(
        "Watch Baseline Widely → Newly → Limited, the engine scan, then detect → fallback.",
        "اتفرّج على Baseline Widely → Newly → Limited، ومسح الـ engines، وبعدين detect → fallback.",
      ),
      browserSupport: support(
        "90+",
        "90+",
        "15+",
        "90+",
        "widely",
        {
          notes: L(
            "Treat this as your product’s evergreen floor unless stakeholders require older engines.",
            "اعتبر ده الحد الأدنى الحديث لمنتجك إلا لو أصحاب المصلحة طالبين engines أقدم.",
          ),
          fallback: L(
            "For forced legacy (old WebViews), gate modern APIs and keep server-rendered HTML usable without them.",
            "للـ legacy الإجباري (WebViews قديمة)، اقفل الـ APIs الحديثة وسيّب HTML السيرفر يشتغل من غيرها.",
          ),
        },
      ),
      browserMatrices: [
        {
          label: L("Native <dialog> showModal()", "Native <dialog> showModal()"),
          support: support("37+", "98+", "15.4+", "79+", "newly", {
            notes: L(
              "Baseline newly available — Safari 15.4+ required for reliable modal behavior.",
              "Baseline newly available — محتاج Safari 15.4+ لسلوك modal موثوق.",
            ),
            fallback: L(
              "Custom focus-trapped dialog with role=\"dialog\" + aria-modal=\"true\" + Esc.",
              "dialog مخصص بـ focus trap و role=\"dialog\" و aria-modal=\"true\" و Esc.",
            ),
          }),
        },
        {
          label: L("<details> / <summary>", "<details> / <summary>"),
          support: support("12+", "49+", "6+", "79+", "widely", {
            notes: L(
              "Core disclosure is widely available; exclusive name= grouping is newer.",
              "الـ disclosure الأساسي Widely؛ تجميع name= الحصري أحدث.",
            ),
            fallback: L(
              "Independent FAQs, or a tiny script to close siblings.",
              "FAQ مستقل، أو script صغير يقفل الإخوة.",
            ),
          }),
        },
        {
          label: L('<details name=""> exclusive accordion', '<details name=""> exclusive accordion'),
          support: support("120+", "130+", "17.2+", "120+", "newly", {
            notes: L(
              "Same name groups close siblings when one opens — core <details> still works without it.",
              "نفس name بيقفل الإخوة لما واحد يتفتح — <details> الأساسي لسه شغال من غيرها.",
            ),
            fallback: L(
              "Leave disclosures independent, or close siblings with a few lines of JS.",
              "سيّب الـ disclosures مستقلة، أو اقفل الإخوة بـ JS صغير.",
            ),
          }),
        },
        {
          label: L("<picture> + modern image types", "<picture> + modern image types"),
          support: support("38+", "38+", "9.1+", "79+", "widely", {
            notes: L(
              "Always terminate with <img> — type negotiation fails open to JPEG/PNG.",
              "دايمًا اختم بـ <img> — تفاوض type بيرجع لـ JPEG/PNG.",
            ),
          }),
        },
        {
          label: L('<img loading="lazy">', '<img loading="lazy">'),
          support: support("77+", "75+", "15.4+", "79+", "widely", {
            notes: L(
              "Never lazy-load the LCP/hero image — only below-the-fold media.",
              "متعَمِلش lazy على صورة LCP/hero — للميديا تحت الشاشة بس.",
            ),
            fallback: L(
              "Omit the attribute; eager load is the default and always safe.",
              "شيل الـ attribute؛ التحميل الفوري هو الافتراضي وآمن دايمًا.",
            ),
          }),
        },
        {
          label: L("fetchpriority on <img> / <link>", "fetchpriority على <img> / <link>"),
          support: support("102+", "132+", "17.2+", "102+", "newly", {
            notes: L(
              "Hint only — pair with sized images and careful LCP preload.",
              "تلميح بس — اربطه بصور بمقاس و preload حذر لـ LCP.",
            ),
            fallback: L(
              "Skip the attribute; browsers still load without the priority hint.",
              "سيّب الـ attribute؛ المتصفحات بتحمّل من غير تلميح الأولوية.",
            ),
          }),
        },
        {
          label: L("`inputmode` attribute", "`inputmode` attribute"),
          support: support("66+", "95+", "12.1+", "79+", "widely", {
            notes: L(
              "Hint only — keep a correct type= as the real keyboard fallback.",
              "تلميح بس — خلّي type= الصحيح هو fallback الكيبورد.",
            ),
          }),
        },
        {
          label: L("<datalist>", "<datalist>"),
          support: support("20+", "4+", "12.1+", "12+", "widely", {
            notes: L(
              "Suggestions only — users can still type free text unless you validate.",
              "اقتراحات بس — المستخدم يقدر يكتب نص حر إلا لو عملت التحقق من البيانات (validation).",
            ),
            fallback: L(
              "Plain <input> or a <select> when the list must be closed.",
              "<input> عادي أو <select> لما القائمة لازم تبقى مغلقة.",
            ),
          }),
        },
        {
          label: L("<template>", "<template>"),
          support: support("26+", "22+", "8+", "13+", "widely", {
            notes: L(
              "Inert document fragment until cloned — great for client-rendered rows.",
              "جزء مستند خامل لحد ما يتنسخ — ممتاز لصفوف بتترندر على الـ client.",
            ),
          }),
        },
        {
          label: L("<search>", "<search>"),
          support: support("135+", "136+", "17+", "135+", "newly", {
            notes: L(
              "Landmark for site/app search UI — older engines treat unknown tags as generic.",
              "landmark لواجهة البحث — المحركات الأقدم بتعامل الـ tags المجهولة كعامة.",
            ),
            fallback: L(
              'Use <form role="search"> — same accessible landmark on older browsers.',
              'استخدم <form role="search"> — نفس الـ landmark على المتصفحات الأقدم.',
            ),
          }),
        },
        {
          label: L("popover attribute", "popover attribute"),
          support: support("114+", "125+", "17+", "114+", "newly", {
            notes: L(
              "Top-layer menus/tooltips with light-dismiss — not a modal <dialog>.",
              "menus/tooltips في الـ top layer مع light-dismiss — مش <dialog> modal.",
            ),
            fallback: L(
              "Custom overlay with focus management, or keep the content in-page.",
              "overlay مخصص مع إدارة focus، أو سيّب المحتوى في الصفحة.",
            ),
          }),
        },
        {
          label: L("inert attribute", "inert attribute"),
          support: support("102+", "112+", "15.5+", "102+", "widely", {
            notes: L(
              "Makes a subtree non-interactive and hidden from screen readers — pair carefully with dialogs/menus.",
              "بيخلي subtree غير تفاعلي ومخفي عن screen readers — استخدمه بحذر مع dialogs/menus.",
            ),
            fallback: L(
              "aria-hidden + tabindex=-1 on focusable children, or a small inert polyfill for forced legacy.",
              "aria-hidden + tabindex=-1 على العناصر القابلة للتركيز، أو polyfill صغير للـ legacy الإجباري.",
            ),
          }),
        },
        {
          label: L("<video> / <audio> + <track>", "<video> / <audio> + <track>"),
          support: support("3+", "3.5+", "3.1+", "12+", "widely", {
            notes: L(
              "Provide multiple <source> types; captions via <track kind=\"captions\">.",
              "وفّر أكتر من <source>؛ الترجمة عبر <track kind=\"captions\">.",
            ),
            fallback: L(
              "Download link or transcript when media cannot play.",
              "لينك تحميل أو transcript لما الميديا متعجزش تشتغل.",
            ),
          }),
        },
      ],
    },
  },
  {
    id: "html-13",
    order: 12,
    slug: "native-dialog",
    tier: "advanced",
    readMinutes: 7,
    icon: "AppWindow",
    visualizer: "native-dialog",
    content: {
      title: L("Native <dialog> Modals", "النوافذ الـ `modal` بـ `<dialog>` الأصلي"),
      summary: L(
        "Native modal: backdrop, focus stays inside, Escape closes — no UI library.",
        "modal أصلي: backdrop، والـ focus جوّه، و Escape بيقفل — من غير مكتبة UI.",
      ),
      paragraphs: [
        L(
          "`showModal()` opens the dialog on top, dims the page with `::backdrop`, and moves focus inside. Escape closes it — you do not need extra JavaScript for that keyboard path.",
          "`showModal()` بيفتح الـ dialog فوق، وبيعتّم الصفحة بـ `::backdrop`، وبينقل الـ focus جوّه. Escape بيقفله — مش محتاج JavaScript زيادة لمسار الكيبورد ده.",
        ),
        L(
          "Use `<form method=\"dialog\">` buttons to close and send a value without JavaScript — the button `value` becomes `dialog.returnValue`. `close()` and Escape both send focus back to the button that opened the dialog.",
          "استخدم أزرار `<form method=\"dialog\">` عشان تقفل وتبعت قيمة من غير JavaScript — `value` الزرار بيبقى `dialog.returnValue`. `close()` و Escape بيرجّعوا الـ focus للزرار اللي فتح الـ dialog.",
        ),
        L(
          "Non-modal `show()` is rare. Prefer `showModal()` for “are you sure?” screens. Style `dialog::backdrop` to dim the page — don’t build a second full-screen overlay.",
          "`show()` من غير modal نادر. فضّل `showModal()` لشاشات “متأكد؟”. ستايل `dialog::backdrop` عشان تعتّم الصفحة — متبنيش overlay تاني يغطي الشاشة.",
        ),
        L(
          "Support details are in the Browser Compatibility lesson. If `showModal()` is required, plan a fallback for Safari below 15.4.",
          "تفاصيل الدعم في درس Browser Compatibility. لو `showModal()` لازم، حط خطة fallback لـ Safari أقل من 15.4.",
        ),
      ],
      keyPoints: [
        L("Prefer `showModal()` over custom div `overlays`", "فضّل `showModal()` عن `overlays` بـ div"),
        L("Escape and `method=\"dialog\"` close it for free", "Escape و`method=\"dialog\"` بيقفلوه من غير كود إضافي"),
        L("Style `dialog::backdrop` instead of a custom overlay", "ستايل `dialog::backdrop` بدل overlay مخصص"),
        L("Focus moves in on open and returns to the invoker on close", "الـ `focus` بيدخل عند الفتح ويرجع للزر عند القفل"),
      ],
      examples: [
        simpleExample(
          `<button type="button" id="open">Open</button>
<dialog id="confirm" aria-labelledby="dlg-title">
  <h2 id="dlg-title">Confirm</h2>
  <p>Reset progress?</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="ok">Reset</button>
  </form>
</dialog>
<script>
  const d = document.getElementById("confirm");
  document.getElementById("open").onclick = () => d.showModal();
</script>`,
          "Modal dialog with labeled title + dialog form",
          "dialog modal بعنوان مسمّى + form dialog",
        ),
        mediumExample(
          `<button type="button" id="settings-open">Settings</button>
<dialog id="settings" aria-labelledby="settings-title">
  <h2 id="settings-title">Preferences</h2>
  <label>
    <input type="checkbox" name="notify" />
    Email updates
  </label>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="save">Save</button>
  </form>
</dialog>
<script>
  const dlg = document.getElementById("settings");
  document.getElementById("settings-open").onclick = () => dlg.showModal();
</script>`,
          "Preferences dialog with checkbox + dialog buttons",
          "dialog تفضيلات بـ checkbox وأزرار dialog",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Lesson settings</h1>
  <button type="button" id="share-open">Share lesson</button>

  <dialog id="share" aria-labelledby="share-title">
    <form method="dialog">
      <h2 id="share-title">Share this lesson</h2>
      <label>
        Copy link
        <input readonly dir="ltr" value="https://example.com/html/forms" />
      </label>
      <div>
        <button value="cancel">Close</button>
        <button value="done">Done</button>
      </div>
    </form>
  </dialog>

  <script>
    const share = document.getElementById("share");
    document.getElementById("share-open").onclick = () => share.showModal();
  </script>
</main>`,
            { title: "Share dialog" },
          ),
          "Full page: modal share sheet with dialog form",
          "صفحة كاملة: share sheet modal مع form dialog",
        ),
      ],
      visualHint: L(
        "Open with showModal() — backdrop, named title, then Escape restores focus to the invoker.",
        "اتفتح بـ showModal() — backdrop وعنوان مسمّى، وبعدين Escape بيرجّع الـ focus للزر.",
      ),
    },
  },
  {
    id: "html-14",
    order: 10,
    slug: "details-summary",
    tier: "intermediate",
    readMinutes: 7,
    icon: "ListTree",
    visualizer: "details-accordion",
    content: {
      title: L(
        "<details> & <summary> Accordions",
        "أكورديون بـ `<details>` و `<summary>`",
      ),
      summary: L(
        "Open/close FAQ blocks with `<details>` — no JavaScript. Keyboard works by default.",
        "افتح واقفل أسئلة FAQ بـ `<details>` — من غير JavaScript. الكيبورد شغال لوحده.",
      ),
      paragraphs: [
        L(
          "`<details>` stays closed until the user clicks `<summary>` (or you set `open`). Screen readers treat it like a button that can expand.",
          "`<details>` بيفضل مقفول لحد ما المستخدم يضغط `<summary>` (أو تحط `open`). قارئ الشاشة بيتعامل معاه زي زرار بيتفتح.",
        ),
        L(
          "Accordion groups can share a `name` so opening one closes the others (where the browser supports it). Don’t put buttons or links inside `<summary>` in a messy way.",
          "مجموعات الـ accordion تقدر تشارك `name` عشان فتح واحدة يقفل الباقي (لو المتصفح بيدعم). متحطش أزرار أو لينكات جوّه `<summary>` بشكل ملبّك.",
        ),
        L(
          "For a complex app with animation or tabs tied to the URL, a custom pattern may still win. For content FAQs, start with native `<details>`.",
          "لتطبيق معقّد فيه أنيميشن أو tabs مربوطة بالـ URL، pattern مخصص ممكن يبقى أحسن. لأسئلة المحتوى، ابدأ بـ `<details>` الأصلي.",
        ),
      ],
      keyPoints: [
        L("Summary is the only direct child that acts as the `toggle`", "summary هو الابن المباشر اللي بيعمل `toggle`"),
        L("Use `open` for default-expanded sections sparingly", "استخدم `open` للفتح الافتراضي بحذر"),
        L("`name` groups exclusive disclosures where supported", "`name` بيجمّع disclosures حصرية حسب الدعم"),
      ],
      examples: [
        simpleExample(
          `<details>
  <summary>What is semantic HTML?</summary>
  <p>Elements that describe meaning — not just boxes.</p>
</details>`,
          "Single disclosure widget",
          "ودجت disclosure واحدة",
        ),
        mediumExample(
          `<details>
  <summary>What is semantic HTML?</summary>
  <p>Elements that describe meaning — not just boxes.</p>
</details>
<details>
  <summary>Why use native elements?</summary>
  <p>Keyboard and screen reader support come for free.</p>
</details>`,
          "Independent FAQ items without accordion grouping",
          "عناصر FAQ مستقلة من غير تجميع accordion",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Course FAQ</h1>
  <details name="faq" open>
    <summary>What is semantic HTML?</summary>
    <p>Tags that describe meaning — not just boxes for styling.</p>
  </details>
  <details name="faq">
    <summary>Is CSS available?</summary>
    <p>Yes — the CSS lab covers layout, color, and responsive design.</p>
  </details>
  <details name="faq">
    <summary>Can I practice in the sandbox?</summary>
    <p>Every lesson includes a live playground tab.</p>
  </details>
</main>`,
            { title: "Course FAQ" },
          ),
          "Full page: exclusive FAQ group with name",
          "صفحة كاملة: مجموعة FAQ حصرية بـ name",
        ),
      ],
      visualHint: L(
        "Watch a FAQ open — then name=\"faq\" keeps only one panel open at a time.",
        "اتفرّج على FAQ بيتفتح — وبعدين name=\"faq\" بيخلي لوحة واحدة مفتوحة في نفس الوقت.",
      ),
    },
  },
  {
    id: "html-15",
    order: 13,
    slug: "picture-source",
    tier: "advanced",
    readMinutes: 7,
    icon: "Images",
    visualizer: "picture-source",
    content: {
      title: L(
        "<picture> & <source> Responsive Images",
        "صور متجاوبة بـ `<picture>` و `<source>`",
      ),
      summary: L(
        "Serve the right format and crop per viewport — always with a final `<img>` fallback.",
        "قدّم الصيغة والقصّة الصح حسب الشاشة — ودائمًا بـ `<img>` في الآخر كـ fallback.",
      ),
      paragraphs: [
        L(
          "`<picture>` lets you list `<source>` candidates (`type`, `media`, `srcset`). The browser picks the first compatible source, then falls through to `<img>`.",
          "`<picture>` بيخلّيك تسرد مرشحي `<source>` (`type` و `media` و `srcset`). المتصفح بيختار أول مصدر متوافق وبعدين ينزل لـ `<img>`.",
        ),
        L(
          "Use `type` to pick the file format (AVIF → WebP → JPEG). Use `media` for a different crop on phone vs desktop. `width` and `height` on `<img>` still stop the page from jumping (`CLS`).",
          "استخدم `type` عشان تختار صيغة الملف (AVIF → WebP → JPEG). استخدم `media` لقصّة مختلفة على الموبايل والدسك توب. `width` و `height` على `<img>` لسه بيمنعوا الصفحة تقفز (`CLS`).",
        ),
        L(
          "`srcset` + `sizes` on a lone `<img>` is enough for resolution switching. Reach for `<picture>` when format or crop must change.",
          "`srcset` + `sizes` على `<img>` لوحده يكفي لتبديل الدقة. استخدم `<picture>` لما الصيغة أو القصّة لازم تتغيّر.",
        ),
      ],
      keyPoints: [
        L("Always include a trailing `<img>` with alt + `dimensions`", "دايمًا ختم بـ `<img>` فيه alt وأبعاد"),
        L("Order sources from most preferred to `fallback`", "رتّب الـ sources من المفضّل للـ `fallback`"),
        L("Prefer picture for art direction / modern formats", "فضّل picture للتوجيه البصري والصيغ الحديثة"),
      ],
      examples: [
        simpleExample(
          `<picture>
  <source srcset="/students-coding.svg" type="image/svg+xml" />
  <img
    src="https://placehold.co/640x360/0284c7/fff.jpg?text=JPEG+fallback"
    alt="Learner coding"
    width="640"
    height="360"
  />
</picture>`,
          "SVG source + JPEG fallback",
          "مصدر SVG + JPEG fallback",
        ),
        mediumExample(
          `<picture>
  <source
    media="(max-width: 640px)"
    srcset="https://placehold.co/640x360/f59e0b/111.jpg?text=Mobile+crop"
  />
  <img
    src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Desktop+hero"
    alt="Course thumbnail"
    width="1200"
    height="630"
  />
</picture>`,
          "Art-directed mobile crop + desktop hero",
          "قصّة موبايل موجّهة + hero ديسكتوب",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Course hero</h1>
  <figure>
    <picture>
      <source srcset="/students-coding.svg" type="image/svg+xml" />
      <source
        media="(max-width: 640px)"
        srcset="https://placehold.co/640x360/f59e0b/111.jpg?text=Mobile+crop"
      />
      <img
        src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Desktop+hero"
        alt="Students coding together in a classroom"
        width="1200"
        height="630"
        decoding="async"
        fetchpriority="high"
      />
    </picture>
    <figcaption>SVG source, art-directed mobile crop, and JPEG fallback.</figcaption>
  </figure>
</main>`,
            { title: "Responsive hero image" },
          ),
          "Full page: SVG + art direction + sized hero img",
          "صفحة كاملة: SVG + art direction + img hero بمقاسات",
        ),
      ],
      visualHint: L(
        "Format or crop first, then a last `<img>` with `alt` and size.",
        "الصيغة أو القصّة الأول، وبعدين `<img>` في الآخر مع `alt` ومقاس.",
      ),
    },
  },
  {
    id: "html-16",
    order: 16,
    slug: "head-social-meta",
    tier: "advanced",
    readMinutes: 7,
    icon: "Share2",
    visualizer: "meta-card",
    content: {
      title: L(
        "Head & Social Meta (OG, Twitter, Theme)",
        "وسوم `head` والسوشيال (`OG` و `Twitter` و `theme`)",
      ),
      summary: L(
        "Social share cards, theme-color, and favicon rules — builds on Advanced SEO Insights.",
        "كروت المشاركة و theme-color وقواعد الـ favicon — بيكمل درس SEO Insights المتقدم.",
      ),
      paragraphs: [
        L(
          "Crawl → render → index, SSR vs CSR, titles, canonicals, and JSON-LD live in Advanced SEO Insights. Core Web Vitals live in Pro. This lesson focuses on Open Graph, Twitter Cards, theme-color, and favicon strategy.",
          "مسار crawl → render → index و SSR مقابل CSR والعناوين والـ canonicals و JSON-LD في درس SEO Insights المتقدم. Core Web Vitals في Pro. الدرس ده مركز على Open Graph و Twitter Cards و theme-color واستراتيجية الـ favicon.",
        ),
        L(
          "Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter Card tags power previews on Slack, LinkedIn, X, and more. They must be present in the first HTML response — client-only injection is often ignored.",
          "وسوم Open Graph و Twitter Cards بتغذي المعاينات على Slack و LinkedIn و X. لازم تكون في أول استجابة HTML — الحقن من الـ client غالبًا بيتتجاهل.",
        ),
        L(
          "`theme-color` tints mobile browser UI. Pair SVG favicons with an ICO/`sizes=\"any\"` fallback, plus `apple-touch-icon` for iOS home screens.",
          "`theme-color` بيلوّن واجهة المتصفح على الموبايل. اربط favicon SVG مع ICO كـ fallback، و `apple-touch-icon` لشاشة iOS.",
        ),
        L(
          "Keep `<title>` and meta description unique per route. Absolute HTTPS URLs for `og:image` avoid broken preview crawlers.",
          "خلّي `<title>` و meta description فريدين لكل route. روابط HTTPS مطلقة لـ `og:image` تتجنّب معاينات مكسورة.",
        ),
      ],
      keyPoints: [
        L("Ship `OG` + `Twitter` tags in the first `HTML` response", "طلّع وسوم `OG` و`Twitter` في أول استجابة `HTML`"),
        L("Absolute `HTTPS` URLs for `og:image`", "روابط `HTTPS` مطلقة لـ `og:image`"),
        L("`theme-color` tints the mobile browser chrome", "`theme-color` بيلوّن واجهة المتصفح على الموبايل"),
        L("`SVG` favicon + `ICO` fallback + `apple-touch-icon`", "`favicon` بـ`SVG` + fallback `ICO` + `apple-touch-icon`"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrontendCraft — HTML</title>
    <meta name="description" content="Interactive HTML lab" />
    <meta name="theme-color" content="#020617" />
  </head>
  <body>
    <main>
      <h1>HTML lab</h1>
      <p>Check the browser tab title and theme-color from this head.</p>
    </main>
  </body>
</html>`,
          "Core head tags + theme color",
          "وسوم head أساسية + theme color",
        ),
        mediumExample(
          `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrontendCraft — HTML</title>
    <meta name="description" content="Interactive HTML lab" />
    <meta name="theme-color" content="#020617" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <main>
      <h1>HTML lab</h1>
      <p>SVG favicon with ICO and apple-touch fallbacks.</p>
    </main>
  </body>
</html>`,
          "Favicon strategy: SVG + ICO + apple-touch-icon",
          "استراتيجية favicon: SVG + ICO + apple-touch-icon",
        ),
        hardExample(
          `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML Lab — Learn semantic markup</title>
    <meta name="description" content="Interactive HTML lessons with live previews" />
    <meta property="og:title" content="HTML Lab" />
    <meta property="og:description" content="Interactive HTML lessons with live previews" />
    <meta property="og:image" content="https://placehold.co/1200x630/0f172a/38bdf8?text=HTML+Lab" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <main>
      <h1>HTML Lab</h1>
      <p>Share-ready head tags — title, description, and Open Graph for this lesson page.</p>
    </main>
  </body>
</html>`,
          "Share-ready head for a lesson page",
          "head جاهز للمشاركة لصفحة درس",
        ),
      ],
      visualHint: L(
        "Share card builds layer by layer — og:title, description, then og:image.",
        "كارت المشاركة بيتبني طبقة طبقة — og:title وبعدين description وبعدين og:image.",
      ),
    },
  },
  {
    id: "html-17",
    order: 19,
    slug: "sr-practice",
    tier: "advanced",
    readMinutes: 8,
    icon: "Eye",
    visualizer: "sr-ready",
    content: {
      title: L(
        "Bad vs Screen-Reader Ready",
        "غلط مقابل جاهز لقارئ الشاشة",
      ),
      summary: L(
        "Practice: bad HTML vs screen-reader ready — name, role, value, focus, and live updates.",
        "تدريب: HTML غلط مقابل جاهز لقارئ الشاشة — name و role و value و focus و live updates.",
      ),
      paragraphs: [
        L(
          "Other lessons teach one topic. This lesson is the full practice set after semantics, forms, dialog, and a11y basics — buttons vs links, images, landmarks, tables, forms, focus, dialogs, and live regions.",
          "الدروس التانية بتعلّم موضوع واحد. الدرس ده مجموعة التدريب الكاملة بعد semantics و forms و dialog وأساسيات a11y — buttons مقابل links، صور، landmarks، tables، forms، focus، dialogs، و live regions.",
        ),
        L(
          "On each card, read the bad side first (what keyboard / NVDA / VoiceOver lose), then the ready side. Ask: does this control have a clear name, the right role, and a value that matches the screen?",
          "في كل كارت، اقرأ الجانب الغلط الأول (إيه اللي الكيبورد / NVDA / VoiceOver بيخسروه)، وبعدين الجانب الجاهز. اسأل: الـ control ده عنده اسم واضح، و role صح، وقيمة تطابق الشاشة؟",
        ),
        L(
          "Ship checklist: prefer native HTML, use ARIA only when needed, keep focus order = DOM order, and never leave Tab stops inside `aria-hidden`. When a card is clear, open the matching lesson and try it — then test with keyboard only and one screen reader.",
          "Checklist للشحن: فضّل native HTML، استخدم ARIA عند الحاجة بس، خلّي ترتيب الـ focus = ترتيب الـ DOM، ومتسيبش Tab جوّه `aria-hidden`. لما الكارت يبقى واضح، افتح الدرس المناسب وجرّبه — وبعدين اختبر بالكيبورد بس + screen reader واحد.",
        ),
      ],
      keyPoints: [
        L(
          "Native HTML first — ARIA only when needed",
          "Native HTML أولًا — ARIA عند الحاجة بس",
        ),
        L(
          "Name, role, and value must match the UI",
          "Name و role و value لازم يطابقوا الـ UI",
        ),
        L(
          "Focus order follows the DOM — no positive tabindex",
          "ترتيب الـ focus يتبع الـ DOM — من غير tabindex موجب",
        ),
        L(
          "Test keyboard-only + NVDA or VoiceOver",
          "اختبر keyboard-only + NVDA أو VoiceOver",
        ),
      ],
      examples: [
        simpleExample(
          `<main>
  <h1>Actions vs navigation</h1>
  <p><a href="#html">Open HTML lab</a></p>
  <p><button type="button">Mark lesson complete</button></p>
</main>`,
          "Link for nav, button for action",
          "لينك للتنقّل وزر للفعل",
        ),
        mediumExample(
          `<header>
  <nav aria-label="Primary">
    <a href="#html">HTML lab</a>
  </nav>
</header>
<main>
  <img
    src="/students-coding.svg"
    alt="Students coding together at laptops"
    width="320"
    height="180"
  />
</main>`,
          "Labeled nav + informative image alt",
          "nav مسمّى + alt وصفي للصورة",
        ),
        hardExample(
          hardHtmlDoc(
            `<a class="skip" href="#main">Skip to content</a>
<header>
  <nav aria-label="Primary">
    <a href="#html">HTML lab</a>
    <a href="#css">CSS lab</a>
  </nav>
</header>
<main id="main" tabindex="-1">
  <h1>Newsletter</h1>
  <form>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" required />
    <button type="submit">Subscribe</button>
  </form>
</main>`,
            { title: "Accessible newsletter page" },
          ),
          "Full page: skip link, labeled nav, and email form",
          "صفحة كاملة: skip link و nav مسمّى وفورم إيميل",
        ),
      ],
      visualHint: L(
        "Warm-up: Bad vs Ready — hear what a screen reader announces, then practice on the cards below.",
        "تسخين: غلط مقابل جاهز — اسمع إيه اللي قارئ الشاشة بيعلنه، وبعدين تدرّب على الكروت تحت.",
      ),
      compareCards: screenReaderPracticeCards,
    },
  },
  {
    id: "html-12",
    order: 5,
    slug: "inline-vs-block",
    tier: "beginner",
    readMinutes: 6,
    icon: "Columns2",
    visualizer: "semantic-blocks",
    content: {
      title: L("Inline vs block elements", "عناصر inline مقابل block"),
      summary: L(
        "Block elements build page sections. Inline elements sit inside a line of text.",
        "عناصر block بتبني أقسام الصفحة. عناصر inline بتقعد جوّه سطر النص.",
      ),
      paragraphs: [
        L(
          "**Block** elements start on a new line and take the full available width by default — like `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`, and `<main>`. Use them for structure and big pieces of content.",
          "عناصر **block** بتبدأ في سطر جديد وبتاخد العرض المتاح كله افتراضيًا — زي `<div>` و `<p>` و `<h1>` و `<ul>` و `<section>` و `<main>`. استخدمها للبنية والقطع الكبيرة.",
        ),
        L(
          "**Inline** elements flow inside text without forcing a new line — like `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, and `<code>`. Use them for words or small bits inside a paragraph.",
          "عناصر **inline** بتمشي جوّه النص من غير سطر جديد — زي `<span>` و `<a>` و `<strong>` و `<em>` و `<img>` و `<code>`. استخدمها لكلمات أو قطع صغيرة جوّه الفقرة.",
        ),
        L(
          "A common beginner mix-up: putting a block tag inside an inline tag (for example a `<div>` inside a `<span>` or `<a>`). Keep blocks for layout/sections and inline for text pieces. CSS can change display later — start with the natural HTML default.",
          "خلط شائع للمبتدئ: تحط block جوّه inline (مثلاً `<div>` جوّه `<span>` أو `<a>`). خلّي block للبنية والأقسام، و inline لقطع النص. CSS يقدر يغيّر العرض بعدين — ابدأ بالافتراضي الطبيعي في HTML.",
        ),
      ],
      keyPoints: [
        L("Block = new line + full width (structure)", "Block = سطر جديد + عرض كامل (بنية)"),
        L("Inline = inside the text line (pieces)", "Inline = جوّه سطر النص (قطع)"),
        L("Don’t nest block inside inline", "متحطش block جوّه inline"),
        L("`div` is a block box · `span` is an inline hook", "`div` صندوق block · `span` hook inline"),
      ],
      examples: [
        simpleExample(
          `<p>
  Hello <strong>world</strong> —
  <a href="/about">about us</a>
</p>
<div class="card">
  <h2>Card title</h2>
  <p>A whole section on its own line.</p>
</div>`,
          "Inline tags inside a paragraph · block card below",
          "وسوم inline جوّه فقرة · كارت block تحتها",
        ),
        mediumExample(
          `<!-- Good -->
<p>Price: <span class="price">$19</span></p>

<!-- Awkward: block inside inline -->
<span>
  <div>Don’t do this</div>
</span>`,
          "span for a price hook · avoid block-in-inline",
          "span لسعر · تجنب block جوّه inline",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Inline vs block</h1>
  <p>
    This sentence has
    <strong>important</strong> and
    <a href="#more">inline</a> pieces.
  </p>
  <section>
    <h2>Next section</h2>
    <p>Sections are block-level regions.</p>
  </section>
</main>`,
            { title: "Inline vs block demo" },
          ),
          "Full page: paragraph inlines + block section",
          "صفحة كاملة: inline في فقرة + section بلوك",
        ),
      ],
      visualHint: L(
        "Watch what sits on one line (inline) vs what stacks as boxes (block).",
        "اتفرّج على اللي بيقعد في سطر واحد (inline) مقابل اللي بيتكدّس كصناديق (block).",
      ),
    },
  },
  {
    id: "html-13",
    order: 7,
    slug: "classes-and-ids",
    tier: "beginner",
    readMinutes: 6,
    icon: "Blocks",
    visualizer: "document-tree",
    content: {
      title: L("Classes and IDs", "الـ classes والـ IDs"),
      summary: L(
        "class groups many elements. id names one unique element — then CSS and JavaScript can find them.",
        "`class` بيجمّع عناصر كتير. `id` بيسمّي عنصر واحد فريد — وبعدين CSS و JavaScript يلاقوهم.",
      ),
      paragraphs: [
        L(
          "`class=\"card\"` can appear on many elements. Classes are for shared styles and shared behavior — buttons, cards, badges.",
          "`class=\"card\"` ممكن يظهر على عناصر كتير. الـ classes للستايل والسلوك المشترك — أزرار، كروت، بادجات.",
        ),
        L(
          "`id=\"email\"` must be unique on the page. Use ids to connect a `<label for=\"...\">`, jump to a section with `href=\"#...\"`, or target one element in JavaScript.",
          "`id=\"email\"` لازم يكون فريد في الصفحة. استخدم الـ ids لربط `<label for=\"...\">`، أو القفز لقسم بـ `href=\"#...\"`، أو استهداف عنصر واحد في JavaScript.",
        ),
        L(
          "Beginner rules: prefer `class` for styling many things; use `id` when you need exactly one target. Don’t start class/id names with a number, and keep names short and clear (`btn-primary`, not `x1`).",
          "قواعد للمبتدئ: فضّل `class` لتنسيق حاجات كتير؛ استخدم `id` لما محتاج هدف واحد بس. متبدأش الأسماء برقم، وخلّيها قصيرة وواضحة (`btn-primary` مش `x1`).",
        ),
      ],
      keyPoints: [
        L("`class` = many elements · `id` = one unique element", "`class` = عناصر كتير · `id` = عنصر واحد فريد"),
        L("Match `label for` with the input `id`", "طابق `label for` مع `id` الـ input"),
        L("Use clear names: `card`, `btn`, `hero` — not random letters", "أسماء واضحة: `card` و `btn` و `hero` — مش حروف عشوائية"),
        L("CSS targets `.class` and `#id`", "CSS بيستهدف `.class` و `#id`"),
      ],
      examples: [
        simpleExample(
          `<button class="btn btn-primary">Save</button>
<button class="btn">Cancel</button>

<label for="email">Email</label>
<input id="email" name="email" type="email" />`,
          "Shared class on buttons · unique id for the label",
          "class مشترك على الأزرار · id فريد للـ label",
        ),
        mediumExample(
          `<nav>
  <a href="#about">About</a>
</nav>
<main>
  <section id="about">
    <h2>About us</h2>
    <p class="lead">We teach HTML by building.</p>
  </section>
</main>`,
          "id for in-page jump · class for lead text style",
          "id للقفز جوّه الصفحة · class لنص lead",
        ),
        hardExample(
          hardHtmlDoc(
            `<header>
  <p class="brand">FrontendCraft</p>
</header>
<main id="main">
  <article class="card">
    <h1 class="card-title">Lesson</h1>
    <p class="card-body">Classes group styles. One id marks the main landmark.</p>
  </article>
</main>`,
            { title: "Classes and IDs" },
          ),
          "Full page: brand/card classes + main id",
          "صفحة كاملة: classes للبراند/الكارت + id للـ main",
        ),
      ],
      visualHint: L(
        "Spot what is shared (class) vs what is unique (id) on the page.",
        "ميّز اللي مشترك (class) عن اللي فريد (id) في الصفحة.",
      ),
    },
  },
  {
    id: "html-14",
    order: 2,
    slug: "html-comments",
    tier: "beginner",
    readMinutes: 5,
    icon: "FileCode",
    visualizer: "document-tree",
    content: {
      title: L("HTML comments", "تعليقات HTML"),
      summary: L(
        "Leave notes in the source with `<!-- -->`. They never show on the page — and they are not a place for secrets.",
        "سيب ملاحظات في المصدر بـ `<!-- -->`. مش بتظهر في الصفحة — ومش مكان للأسرار.",
      ),
      paragraphs: [
        L(
          "Write a comment with `<!--` then your note then `-->`. The browser keeps it in the HTML source but does **not** draw it on the page. Use comments to explain *why* a block exists, or to temporarily hide markup while you experiment.",
          "اكتب تعليق بـ `<!--` وبعدين ملاحظتك وبعدين `-->`. المتصفح بيسيبه في مصدر HTML لكن **مش** بيرسمه على الصفحة. استخدم التعليقات عشان تشرح *ليه* القطعة موجودة، أو تخفي markup مؤقت وأنت بتجرّب.",
        ),
        L(
          "Rules: comments can sit between tags (in `<head>` or `<body>`). Do not nest comments (`<!-- <!-- no --> -->` breaks). Avoid `--` in the middle of a comment. Never put passwords, API keys, or private URLs in comments — anyone can View Source.",
          "القواعد: التعليق يقدر يقعد بين الوسوم (في `<head>` أو `<body>`). متعملش تعليقات جوّه بعض (`<!-- <!-- no --> -->` بيتكسر). تجنّب `--` في نص التعليق. متحطش كلمات مرور أو API keys أو روابط خاصة — أي حد يقدر يعمل View Source.",
        ),
        L(
          "Related source skill: the characters `<`, `>`, and `&` start markup. To show them as text, write `&lt;`, `&gt;`, and `&amp;`. `&nbsp;` is a non-breaking space. Comments are for humans; entities are for characters the parser would otherwise treat as code.",
          "مهارة مصدر مرتبطة: الحروف `<` و `>` و `&` بتفتح markup. عشان تظهر كنص اكتب `&lt;` و `&gt;` و `&amp;`. `&nbsp;` مسافة مش بتتكسر. التعليقات للبشر؛ الـ entities للحروف اللي الـ parser هيتعامل معاها ككود.",
        ),
      ],
      keyPoints: [
        L("`<!-- note -->` is invisible on the page", "`<!-- note -->` مش ظاهر في الصفحة"),
        L("Do not nest comments · avoid `--` inside", "متعشّشش تعليقات · تجنّب `--` جوّه"),
        L("Never store secrets in comments", "متخزنش أسرار في التعليقات"),
        L("Show `<` `>` `&` as `&lt;` `&gt;` `&amp;`", "اظهر `<` `>` `&` كـ `&lt;` `&gt;` `&amp;`"),
      ],
      examples: [
        simpleExample(
          `<!-- Site header: logo + main nav -->
<header>
  <p>FrontendCraft</p>
</header>

<!-- <p>Old hero — kept for reference</p> -->
<p>New hero copy.</p>`,
          "A note above a header · commented-out old paragraph",
          "ملاحظة فوق الهيدر · فقرة قديمة متعطّلة بتعليق",
        ),
        mediumExample(
          `<p>Write tags as text: <code>&lt;section&gt;</code></p>
<p>Tom &amp; Jerry</p>
<!-- Safe: explains the entity, not a secret -->`,
          "Entities for special characters · comment explains why",
          "Entities للحروف الخاصة · تعليق بيشرح السبب",
        ),
        hardExample(
          hardHtmlDoc(
            `<!-- Doctype and lang are required — see document anatomy -->
<main>
  <h1>Comments</h1>
  <p>Notes in source. Nothing secret here.</p>
</main>`,
            { title: "HTML comments" },
          ),
          "Full page with a useful source comment",
          "صفحة كاملة بتعليق مفيد في المصدر",
        ),
      ],
      visualHint: L(
        "Find the comment in Elements — it is in the tree, not painted on the page.",
        "لاقي التعليق في Elements — موجود في الشجرة، مش مرسوم على الصفحة.",
      ),
    },
  },
  {
    id: "html-15",
    order: 8,
    slug: "global-attributes",
    tier: "beginner",
    readMinutes: 6,
    icon: "Sparkles",
    visualizer: "document-tree",
    content: {
      title: L("Global attributes", "الخصائص العامة"),
      summary: L(
        "`hidden`, `title`, `lang`, `data-*`, and boolean attributes work on almost every element.",
        "`hidden` و `title` و `lang` و `data-*` والخصائص البوليانية بتشتغل على أغلب العناصر.",
      ),
      paragraphs: [
        L(
          "Some attributes are **global** — you can put them on most tags. `hidden` hides the element from the page (and from screen readers). `title` is a native tooltip — never use it as the only label. `lang` on a child overrides the page language for that subtree (useful for a French quote on an English page).",
          "في خصائص **عامة** — تقدر تحطها على أغلب الوسوم. `hidden` بيخفي العنصر من الصفحة (ومن قارئات الشاشة). `title` tooltip أصلي — متستخدمهوش كـ label الوحيد. `lang` على عنصر ابن بيغيّر لغة الجزء ده (مفيد لاقتباس فرنسي في صفحة إنجليزي).",
        ),
        L(
          "`data-*` attributes store extra info for CSS or JavaScript (`data-category=\"sale\"`, `data-price=\"19\"`). They are not secrets. Boolean attributes like `hidden`, `disabled`, and `required` are true when present — write `hidden`, not `hidden=\"false\"` (that still hides).",
          "خصائص `data-*` بتخزّن معلومات زيادة لـ CSS أو JavaScript (`data-category=\"sale\"` و `data-price=\"19\"`). مش أسرار. الخصائص البوليانية زي `hidden` و `disabled` و `required` تبقى true لما تكون موجودة — اكتب `hidden`، مش `hidden=\"false\"` (برضه هيخفي).",
        ),
        L(
          "Be careful with `tabindex`. `0` puts an element in the natural Tab order; `-1` makes it focusable from script only. Do not use `tabindex=\"1\"` or higher — it hijacks keyboard order. Prefer real `<button>` and `<a>` over making a `<div>` focusable.",
          "خد بالك من `tabindex`. `0` بيحط العنصر في ترتيب Tab الطبيعي؛ `-1` يخليه قابل للتركيز من السكربت بس. متستخدمش `tabindex=\"1\"` أو أعلى — بيبوّظ ترتيب الكيبورد. فضّل `<button>` و `<a>` الحقيقيين عن إنك تخلي `<div>` قابل للتركيز.",
        ),
      ],
      keyPoints: [
        L("`hidden` hides from the page and from screen readers", "`hidden` بيخفي من الصفحة ومن قارئ الشاشة"),
        L("`data-*` = extra data for CSS/JS — not secrets", "`data-*` = بيانات زيادة لـ CSS/JS — مش أسرار"),
        L("Boolean attrs: present = true (`hidden`, not `hidden=\"false\"`)", "خصائص بوليانية: موجودة = true (`hidden` مش `hidden=\"false\"`)"),
        L("`tabindex=\"0\"` or `-1` only — skip positive numbers", "`tabindex=\"0\"` أو `-1` بس — متستخدمش أرقام موجبة"),
      ],
      examples: [
        simpleExample(
          `<p hidden>Draft — not ready</p>
<p title="Updated today">Live copy</p>
<p lang="fr">Bonjour</p>`,
          "hidden · title tooltip · lang override",
          "hidden · title tooltip · تغيير lang",
        ),
        mediumExample(
          `<article class="card" data-lesson="html-15" data-tier="beginner">
  <h2>Global attributes</h2>
  <button type="button" disabled>Soon</button>
</article>`,
          "data-* on a card · disabled boolean attribute",
          "data-* على كارت · disabled كخاصية بوليانية",
        ),
        hardExample(
          hardHtmlDoc(
            `<main id="main" tabindex="-1">
  <p data-status="ok">Ready for keyboard users.</p>
  <button type="button">Focus me with Tab</button>
</main>`,
            { title: "Global attributes" },
          ),
          "tabindex -1 on main for skip-link targets",
          "tabindex -1 على main لأهداف skip-link",
        ),
      ],
      visualHint: L(
        "Inspect attributes in Elements — toggle hidden and watch the node stay in the tree.",
        "افحص الخصائص في Elements — شغّل hidden وشوف العنصر لسه في الشجرة.",
      ),
    },
  },
  {
    id: "html-16",
    order: 16,
    slug: "html-native-interactive",
    tier: "advanced",
    readMinutes: 8,
    icon: "AppWindow",
    visualizer: "native-dialog",
    content: {
      title: L("Template, popover & inert", "`<template>` و popover و inert"),
      summary: L(
        "Native HTML for cloneable markup, lightweight overlays, and making a subtree non-interactive — often without a JS library.",
        "HTML أصلي لـ markup قابل للنسخ، طبقات خفيفة، وتعطيل تفاعل جزء من الصفحة — غالبًا من غير مكتبة JS.",
      ),
      paragraphs: [
        L(
          "`<template>` holds HTML that does **not** render until JavaScript clones it (`template.content.cloneNode(true)`). Scripts and images inside stay inert. Use it for cards, rows, or client-rendered bits you do not want in the first paint.",
          "`<template>` بيحمل HTML **مش** بيترسم لحد ما JavaScript ينسخه (`template.content.cloneNode(true)`). السكربتات والصور جوّه تفضل inert. استخدمه للكروت أو الصفوف أو قطع الـ client اللي مش عايزها في أول رسم.",
        ),
        L(
          "`popover` on an element plus `popovertarget` on a button opens a lightweight overlay (menus, tips) with built-in light-dismiss and top-layer stacking. Pair with a real `<button type=\"button\">`. Check Baseline — this is newer than `<dialog>` in some browsers; keep a fallback when you must support older Safari.",
          "`popover` على عنصر مع `popovertarget` على زرار بيفتح طبقة خفيفة (قوائم، تلميحات) مع إغلاق بالضغط برة و top-layer جاهز. استخدم `<button type=\"button\">` حقيقي. راجع Baseline — أحدث من `<dialog>` في بعض المتصفحات؛ خلّي fallback لما لازم تدعم Safari الأقدم.",
        ),
        L(
          "`inert` on a container makes everything inside non-clickable and hidden from screen readers — useful behind a modal. Prefer native `<dialog>` `showModal()`, which does this for you. Don’t leave focusable controls inside `inert` or `aria-hidden` by accident.",
          "`inert` على حاوية بيخلّي اللي جوّه مش قابل للضغط ومخفي عن قارئ الشاشة — مفيد ورا الـ modal. فضّل `<dialog>` `showModal()` الأصلي لأنه بيعمل كده لوحده. متسيبش عناصر قابلة للتركيز جوّه `inert` أو `aria-hidden` بالغلط.",
        ),
      ],
      keyPoints: [
        L("`<template>` = inert clone source until JS copies it", "`<template>` = مصدر inert لحد ما JS ينسخه"),
        L("`popover` + `popovertarget` for light overlays", "`popover` + `popovertarget` للطبقات الخفيفة"),
        L("`inert` disables a subtree — dialogs often do this for you", "`inert` بيعطّل جزء من الشجرة — الـ dialog غالبًا بيعملها لوحده"),
        L("Check Baseline; keep a fallback for older browsers", "راجع Baseline؛ خلّي fallback للمتصفحات الأقدم"),
      ],
      examples: [
        simpleExample(
          `<template id="card">
  <article class="card">
    <h2></h2>
    <p></p>
  </article>
</template>
<p>Nothing from the template appears until you clone it.</p>`,
          "Template content is not visible yet",
          "محتوى الـ template لسه مش ظاهر",
        ),
        mediumExample(
          `<button type="button" popovertarget="tips">Tips</button>
<div id="tips" popover>
  <p>Use a real button. Esc and click-outside dismiss.</p>
  <button type="button" popovertarget="tips" popovertargetaction="hide">
    Close
  </button>
</div>`,
          "Native popover menu with a close button",
          "قائمة popover أصلية بزر إغلاق",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <p>Page content stays here while a dialog is open.</p>
</main>
<dialog id="confirm">
  <form method="dialog">
    <p>Reset progress?</p>
    <button value="cancel">Cancel</button>
    <button value="ok">Reset</button>
  </form>
</dialog>
<button type="button" onclick="document.getElementById('confirm').showModal()">
  Open
</button>`,
            { title: "Dialog applies inert for you" },
          ),
          "Prefer dialog showModal over hand-rolled inert",
          "فضّل dialog showModal عن inert يدوي",
        ),
      ],
      visualHint: L(
        "Inspect template in Elements (inert). Toggle a popover and watch the top layer.",
        "افحص الـ template في Elements (inert). شغّل popover وراقب الـ top layer.",
      ),
    },
  },
];
