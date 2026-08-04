import {
  L,
  realWorldExample,
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
    readMinutes: 9,
    icon: "Smartphone",
    visualizer: "form-flow",
    content: {
      title: L(
        "Form UX: inputmode, pattern & autocomplete",
        "Form UX: inputmode و pattern و autocomplete",
      ),
      summary: L(
        "Shape mobile keyboards, speed autofill, and validate with attributes — before you reach for JS.",
        "شكّل كيبورد الموبايل، سرّع الـ autofill، وتحقق بالـ attributes — قبل ما تلجأ لـ JS.",
      ),
      paragraphs: [
        L(
          "`inputmode` hints which soft keyboard to show (`email`, `tel`, `numeric`, `decimal`, `url`, `search`). It does not change the value type — keep a correct `type` as the real fallback.",
          "`inputmode` بيلمّح للكيبورد المناسب (`email` و `tel` و `numeric`…). مش بيغيّر نوع القيمة — خلّي `type` الصحيح هو الـ fallback الحقيقي.",
        ),
        L(
          "`autocomplete` tokens (`name`, `email`, `tel`, `street-address`, `one-time-code`) let browsers and password managers fill fields safely. Wrong tokens frustrate users more than omitting them.",
          "رموز `autocomplete` (`name` و `email` و `tel`…) بتخلّي المتصفح ومدير كلمات المرور يعبّوا الحقول بأمان. الرمز الغلط بيضايق أكتر من إنك متكتبوش.",
        ),
        L(
          "`pattern` adds a regex check on submit for `text`-like inputs. Pair it with a clear `title` / error message — regex alone is not accessible feedback.",
          "`pattern` بيضيف فحص regex عند الإرسال. اربطه بـ `title` أو رسالة خطأ واضحة — الـ regex لوحده مش feedback وصول.",
        ),
      ],
      keyPoints: [
        L("Use `type` for meaning; `inputmode` for the keyboard", "استخدم `type` للمعنى؛ `inputmode` للكيبورد"),
        L("Prefer standard autocomplete tokens", "فضّل رموز autocomplete القياسية"),
        L("Explain pattern failures in plain language", "اشرح فشل pattern بلغة بسيطة"),
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
        realWorldExample(
          `<form>
  <label>
    Email
    <input name="email" type="email" inputmode="email" autocomplete="email" required />
  </label>
  <label>
    One-time code
    <input
      name="otp"
      inputmode="numeric"
      autocomplete="one-time-code"
      pattern="[0-9]{6}"
      maxlength="6"
      required
    />
  </label>
  <button type="submit">Continue</button>
</form>`,
          "Checkout-style email + OTP fields",
          "حقول email و OTP بأسلوب checkout",
        ),
      ],
      visualHint: L(
        "Same form lab — focus, types, checkbox, then submit.",
        "نفس معمل الفورم — focus وكتابة و checkbox وبعدين submit.",
      ),
    },
  },
  {
    id: "html-12",
    order: 14,
    slug: "browser-compatibility",
    tier: "advanced",
    readMinutes: 11,
    icon: "Globe2",
    visualizer: "baseline-compat",
    content: {
      title: L(
        "Browser Compatibility & Baseline",
        "Browser Compatibility & Baseline",
      ),
      summary: L(
        "Dedicated compatibility lesson — Chrome, Firefox, Safari, Edge versions, W3C Baseline, and when to ship a fallback.",
        "درس توافق مخصص — إصدارات Chrome و Firefox و Safari و Edge، و W3C Baseline، وإمتى تعمل fallback.",
      ),
      paragraphs: [
        L(
          "Evergreen browsers update often, but “works on my machine” is not a release plan. Check W3C Baseline (Widely / Newly / Limited) and engine minimums before you bet a UX on a tag or API.",
          "المتصفحات الحديثة بتتحدث كتير، بس “شغال عندي” مش خطة إطلاق. راجع W3C Baseline (Widely / Newly / Limited) وأقل إصدارات قبل ما تبني UX على tag أو API.",
        ),
        L(
          "Baseline Widely available means safe defaults for most products. Newly available (e.g. reliable `<dialog showModal()>`) needs an explicit support policy or a polyfill / progressive enhancement path.",
          "Baseline Widely يعني افتراضي آمن لمعظم المنتجات. Newly (زي `<dialog showModal()>` الموثوق) محتاج سياسة دعم واضحة أو polyfill / progressive enhancement.",
        ),
        L(
          "Prefer feature detection over user-agent sniffing: `if ('showModal' in HTMLDialogElement.prototype)`. Keep a usable HTML fallback so Safari gaps or corporate Chrome lag don’t brick the flow.",
          "فضّل feature detection عن شمّ الـ user-agent: `if ('showModal' in HTMLDialogElement.prototype)`. سيّب HTML fallback مفيد عشان فجوات Safari أو Chrome الشركات متكسرش التدفق.",
        ),
        L(
          "Document your matrix once per feature family — don’t paste vague “supported everywhere” notes on every lesson. This lesson is the source of truth; cheat cards link back here with compact badges.",
          "وثّق المصفوفة مرة لكل عائلة ميزات — متلصقش ملاحظات “مدعوم في كل حتة” على كل درس. الدرس ده هو المصدر؛ كروت الـ CheatSheet بترجع له بشارات مختصرة.",
        ),
        L(
          "The matrices below cover the HTML track’s high-stakes tags and attributes: dialog, details, picture, lazy/fetchpriority media, forms hints, template, search, popover, inert, and media tracks.",
          "المصفوفات تحت بتغطي tags و attributes الحساسة في الـ HTML track: dialog و details و picture و lazy/fetchpriority و تلميحات الفورم و template و search و popover و inert و media tracks.",
        ),
      ],
      keyPoints: [
        L("Use Baseline + caniuse / MDN — not folklore", "استخدم Baseline + caniuse / MDN — مش الإشاعات"),
        L("Widely = default; Newly = needs a fallback plan", "Widely = افتراضي؛ Newly = محتاج خطة fallback"),
        L("Feature-detect; progressive-enhance", "Feature-detect؛ بعدين progressive-enhance"),
        L("Test at least one WebKit (Safari) path", "اختبر مسار WebKit (Safari) واحد على الأقل"),
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
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Progressive details</title>
  </head>
  <body>
    <main>
      <h1>Shipping checklist</h1>
      <!-- Progressive enhancement: details works; name grouping is optional -->
      <details>
        <summary>Open checklist</summary>
        <ul>
          <li>Baseline status reviewed</li>
          <li>Safari smoke test</li>
          <li>Fallback documented</li>
        </ul>
      </details>
    </main>
  </body>
</html>`,
          "Ship the widely-supported core first",
          "انشر النواة المدعومة على نطاق واسع أولًا",
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
          label: L("inputmode attribute", "inputmode attribute"),
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
              "اقتراحات بس — المستخدم يقدر يكتب نص حر إلا لو عملت validation.",
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
              "Makes a subtree non-interactive and hidden from AT — pair carefully with dialogs/menus.",
              "بيخلي subtree غير تفاعلي ومخفي عن AT — استخدمه بحذر مع dialogs/menus.",
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
    readMinutes: 10,
    icon: "AppWindow",
    visualizer: "native-dialog",
    content: {
      title: L("Native <dialog> Modals", "Native <dialog> Modals"),
      summary: L(
        "Ship modal dialogs with a native backdrop, focus trap, and Escape-to-close — without a UI library.",
        "اعمل modals بـ backdrop أصلي و focus trap و Escape — من غير مكتبة UI.",
      ),
      paragraphs: [
        L(
          "`HTMLDialogElement.showModal()` opens a top-layer dialog with a `::backdrop` and moves focus inside. `close()` / `form method=\"dialog\"` dismisses it and restores focus to the invoker when possible.",
          "`showModal()` بيفتح dialog في الـ top layer مع `::backdrop` وبينقل الـ focus لجواه. `close()` أو `form method=\"dialog\"` بيقفله ويرجّع الـ focus للزر اللي فتحه لما ينفع.",
        ),
        L(
          "Non-modal `show()` is rarer — prefer `showModal()` for confirms and blocking flows. Style `dialog::backdrop` for dimming; don't invent a second full-screen overlay.",
          "`show()` غير الـ modal نادر — فضّل `showModal()` للتأكيد والتدفقات الحاجزة. ستايل `dialog::backdrop` للتعتيم؛ متخترعش overlay تاني يغطي الشاشة.",
        ),
        L(
          "Compatibility details live in the Browser Compatibility lesson — treat Safari < 15.4 as needing a fallback when `showModal()` is critical.",
          "تفاصيل التوافق في درس Browser Compatibility — اعتبر Safari < 15.4 محتاج fallback لما `showModal()` يكون حرج.",
        ),
      ],
      keyPoints: [
        L("Prefer `showModal()` over custom div overlays", "فضّل `showModal()` عن overlays بـ div"),
        L("Use `method=\"dialog\"` buttons for built-in close", "استخدم أزرار `method=\"dialog\"` للإغلاق المدمج"),
        L("Name the dialog; manage focus on open/close", "سمّي الـ dialog؛ أدِر الـ focus عند الفتح/القفل"),
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
        realWorldExample(
          `<dialog id="share">
  <form method="dialog">
    <label>
      Copy link
      <input readonly value="https://frontendcraft-app.vercel.app/html" />
    </label>
    <button value="done">Done</button>
  </form>
</dialog>`,
          "Lightweight share sheet pattern",
          "نمط share sheet خفيف",
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
    readMinutes: 8,
    icon: "ListTree",
    visualizer: "details-accordion",
    content: {
      title: L(
        "<details> & <summary> Accordions",
        "<details> و <summary> Accordions",
      ),
      summary: L(
        "Native, zero-JS disclosures for FAQs and progressive disclosure — keyboard-friendly by default.",
        "Disclosure أصلي من غير JS للـ FAQ والكشف التدريجي — ودود للكيبورد افتراضيًا.",
      ),
      paragraphs: [
        L(
          "`<details>` is closed until the user activates `<summary>` (or you set the `open` attribute). Screen readers expose it as a disclosure / button-like control with expanded state.",
          "`<details>` مقفول لحد ما المستخدم يفعّل `<summary>` (أو تحط `open`). قارئات الشاشة بتعرضه كـ disclosure مع حالة expanded.",
        ),
        L(
          "Exclusive accordion groups can share a `name` attribute so opening one closes siblings (where supported). Don't nest interactive controls inside `<summary>` awkwardly.",
          "مجموعات الـ accordion الحصرية تقدر تشارك `name` عشان فتح واحدة يقفل الباقي (حسب الدعم). متتحطّش controls تفاعلية جوه `<summary>` بشكل عبيط.",
        ),
        L(
          "For complex app panels that need animation orchestration or URL-synced tabs, a custom pattern may still win — but start with native details for content FAQs.",
          "للوحات التطبيق المعقدة اللي محتاجة أنيميشن أو tabs مربوطة بالـ URL، pattern مخصص ممكن يفوز — بس ابدأ بـ details الأصلية لـ FAQ المحتوى.",
        ),
      ],
      keyPoints: [
        L("Summary is the only direct child that acts as the toggle", "summary هو الابن المباشر اللي بيعمل toggle"),
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
        realWorldExample(
          `<details name="faq">
  <summary>Is CSS available?</summary>
  <p>Coming soon on FrontendCraft.</p>
</details>
<details name="faq">
  <summary>Can I practice in the sandbox?</summary>
  <p>Yes — every lesson has a live playground.</p>
</details>`,
          "FAQ group with shared name",
          "مجموعة FAQ بـ name مشترك",
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
    readMinutes: 10,
    icon: "Images",
    visualizer: "picture-source",
    content: {
      title: L(
        "<picture> & <source> Responsive Images",
        "<picture> و <source> Responsive Images",
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
          "Use `type` for format negotiation (AVIF → WebP → JPEG) and `media` for art direction (different crops on mobile vs desktop). Width/height on `<img>` still matter for CLS.",
          "استخدم `type` لتفاوض الصيغة (AVIF → WebP → JPEG) و `media` للتوجيه البصري (قصّة مختلفة على الموبايل). width/height على `<img>` لسه مهمين ضد CLS.",
        ),
        L(
          "`srcset` + `sizes` on a lone `<img>` is enough for resolution switching. Reach for `<picture>` when format or crop must change.",
          "`srcset` + `sizes` على `<img>` لوحده يكفي لتبديل الدقة. استخدم `<picture>` لما الصيغة أو القصّة لازم تتغيّر.",
        ),
      ],
      keyPoints: [
        L("Always include a trailing `<img>` with alt + dimensions", "دايمًا ختم بـ `<img>` فيه alt وأبعاد"),
        L("Order sources from most preferred to fallback", "رتّب الـ sources من المفضّل للـ fallback"),
        L("Prefer picture for art direction / modern formats", "فضّل picture للتوجيه البصري والصيغ الحديثة"),
      ],
      examples: [
        simpleExample(
          `<picture>
  <source type="image/avif" srcset="/hero.avif" />
  <source type="image/webp" srcset="/hero.webp" />
  <img src="/hero.jpg" alt="Learner coding" width="640" height="360" />
</picture>`,
          "Format waterfall with img fallback",
          "تسلسل صيغ مع img fallback",
        ),
        realWorldExample(
          `<picture>
  <source
    media="(max-width: 640px)"
    srcset="/hero-mobile.avif 1x, /hero-mobile-2x.avif 2x"
    type="image/avif"
  />
  <source srcset="/hero.avif" type="image/avif" />
  <img
    src="/hero.jpg"
    alt="FrontendCraft playground"
    width="1200"
    height="630"
    decoding="async"
  />
</picture>`,
          "Art-directed mobile crop + desktop hero",
          "قصّة موبايل موجّهة + hero ديسكتوب",
        ),
      ],
      visualHint: L(
        "Format waterfall (AVIF → WebP → JPEG), then art direction for mobile vs desktop — trailing img always stays.",
        "تسلسل الصيغ (AVIF → WebP → JPEG)، وبعدين art direction للموبايل مقابل الديسكتوب — و img في الآخر دايمًا.",
      ),
    },
  },
  {
    id: "html-16",
    order: 16,
    slug: "head-social-meta",
    tier: "advanced",
    readMinutes: 9,
    icon: "Share2",
    visualizer: "meta-card",
    content: {
      title: L(
        "Head & Social Meta (OG, Twitter, Theme)",
        "Head و Social Meta (OG و Twitter و Theme)",
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
        L("SSR/SSG the social tags in `<head>`", "طلّع وسوم السوشيال من السيرفر في `<head>`"),
        L("Absolute og:image URLs", "روابط og:image مطلقة"),
        L("SVG + ICO favicon strategy", "استراتيجية favicon: SVG + ICO"),
      ],
      examples: [
        simpleExample(
          `<head>
  <meta charset="UTF-8" />
  <title>FrontendCraft — HTML</title>
  <meta name="description" content="Interactive HTML lab" />
  <meta name="theme-color" content="#020617" />
</head>`,
          "Core head tags + theme color",
          "وسوم head أساسية + theme color",
        ),
        realWorldExample(
          `<head>
  <title>Document Anatomy — FrontendCraft</title>
  <meta property="og:title" content="Document Anatomy" />
  <meta property="og:description" content="Learn the HTML document shell" />
  <meta property="og:image" content="https://example.com/og/html.png" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>`,
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
    readMinutes: 16,
    icon: "Accessibility",
    visualizer: "a11y-check",
    content: {
      title: L(
        "Bad vs Screen-Reader Ready",
        "Bad vs Screen-Reader Ready",
      ),
      summary: L(
        "Advanced practice: bad vs screen-reader ready HTML — name, role, value, focus, and live updates.",
        "تدريب Advanced: bad مقابل screen-reader ready HTML — name و role و value و focus و live updates.",
      ),
      paragraphs: [
        L(
          "Other lessons teach one topic. This Advanced lesson is the full practice set after semantics, forms, dialog, and a11y basics — buttons vs links, images, landmarks, tables, forms, focus, dialogs, and live regions.",
          "الدروس التانية بتعلّم موضوع واحد. درس Advanced ده هو مجموعة التدريب الكاملة بعد semantics و forms و dialog وأساسيات a11y — buttons مقابل links، صور، landmarks، tables، forms، focus، dialogs، و live regions.",
        ),
        L(
          "On each card, read the bad side first (what keyboard / NVDA / VoiceOver lose), then the ready side. Ask: does this control have a clear accessible name, the right role, and a value/state that matches the UI?",
          "في كل card، اقرأ الجانب الغلط الأول (إيه اللي الكيبورد / NVDA / VoiceOver بيخسروه)، وبعدين الجانب الجاهز. اسأل: الـ control ده عنده accessible name واضح، و role صح، و value/state تطابق الـ UI؟",
        ),
        L(
          "Ship checklist: prefer native HTML, use ARIA only when needed, keep focus order = DOM order, and never leave Tab stops inside `aria-hidden`. When a card is clear, open the matching topic lesson and try the pattern there — then test with keyboard only and one screen reader.",
          "Checklist للشحن: فضّل native HTML، استخدم ARIA عند الحاجة بس، خلّي ترتيب الـ focus = ترتيب الـ DOM، ومتسيبش Tab جوّه `aria-hidden`. لما الـ card يبقى واضح، افتح درس الموضوع وجرّب النمط هناك — وبعدين اختبر بالكيبورد بس + screen reader واحد.",
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
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ready: button vs link</title>
  </head>
  <body>
    <main>
      <h1>Actions vs navigation</h1>
      <p><a href="/html">Open HTML track</a></p>
      <p><button type="button">Mark lesson complete</button></p>
    </main>
  </body>
</html>`,
          "Full page: link for nav, button for action",
          "صفحة كاملة: لينك للتنقّل وزر للفعل",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ready: labeled form</title>
  </head>
  <body>
    <main>
      <h1>Newsletter</h1>
      <form>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required />
        <button type="submit">Subscribe</button>
      </form>
    </main>
  </body>
</html>`,
          "Full page: labeled email form",
          "صفحة كاملة: فورم إيميل بـ label",
        ),
      ],
      visualHint: L(
        "Warm-up: watch name · role · value as focus moves — then practice on the Bad vs Ready cards below.",
        "تسخين: اتفرّج على name · role · value مع حركة الـ focus — وبعدين تدرّب على كروت Bad مقابل Ready تحت.",
      ),
      compareCards: screenReaderPracticeCards,
    },
  },
];
