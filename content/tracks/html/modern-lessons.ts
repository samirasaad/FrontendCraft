import {
  L,
  realWorldExample,
  simpleExample,
  support,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";

/** Modern high-value HTML lessons inserted before Pro / Pitfalls / CheatSheet. */
export const modernLessons: LessonDraft[] = [
  {
    id: "html-11",
    order: 11,
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
        "Watch the form flow highlight keyboard-aware inputs.",
        "اتفرّج على مسار الفورم وهو بيوضّح inputs واعية بالكيبورد.",
      ),
    },
  },
  {
    id: "html-12",
    order: 12,
    slug: "browser-compatibility",
    tier: "advanced",
    readMinutes: 11,
    icon: "Globe2",
    visualizer: "a11y-check",
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
      ],
      keyPoints: [
        L("Use Baseline + caniuse / MDN — not folklore", "استخدم Baseline + caniuse / MDN — مش الإشاعات"),
        L("Widely = default; Newly = needs a fallback plan", "Widely = افتراضي؛ Newly = محتاج خطة fallback"),
        L("Feature-detect; progressive-enhance", "Feature-detect؛ بعدين progressive-enhance"),
        L("Test at least one WebKit (Safari) path", "اختبر مسار WebKit (Safari) واحد على الأقل"),
      ],
      examples: [
        simpleExample(
          `<script>
  const canModal =
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";

  if (canModal) {
    document.getElementById("confirm")?.showModal();
  } else {
    // Fallback: navigate to a confirm page or open a custom overlay
    location.href = "/confirm-reset";
  }
</script>`,
          "Feature-detect showModal before calling it",
          "افحص showModal قبل ما تستدعيه",
        ),
        realWorldExample(
          `<!-- Progressive enhancement: details works; name grouping is optional -->
<details>
  <summary>Shipping checklist</summary>
  <ul>
    <li>Baseline status reviewed</li>
    <li>Safari smoke test</li>
    <li>Fallback documented</li>
  </ul>
</details>`,
          "Ship the widely-supported core first",
          "انشر النواة المدعومة على نطاق واسع أولًا",
        ),
      ],
      visualHint: L(
        "Compatibility checks light up as you compare engine support.",
        "فحوصات التوافق بتولع وانت بتقارن دعم الـ engines.",
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
          label: L("<picture> + modern image types", "<picture> + modern image types"),
          support: support("38+", "38+", "9.1+", "79+", "widely", {
            notes: L(
              "Always terminate with <img> — type negotiation fails open to JPEG/PNG.",
              "دايمًا اختم بـ <img> — تفاوض type بيرجع لـ JPEG/PNG.",
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
      ],
    },
  },
  {
    id: "html-13",
    order: 13,
    slug: "native-dialog",
    tier: "advanced",
    readMinutes: 10,
    icon: "AppWindow",
    visualizer: "a11y-check",
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
        "Accessibility checks light up when the dialog is named and focused.",
        "فحوصات الوصول بتولع لما الـ dialog يبقى مسمّى وعليه focus.",
      ),
    },
  },
  {
    id: "html-14",
    order: 14,
    slug: "details-summary",
    tier: "intermediate",
    readMinutes: 8,
    icon: "ListTree",
    visualizer: "semantic-blocks",
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
        "Blocks expand like native disclosure regions.",
        "البلوكات بتتفتح زي مناطق disclosure أصلية.",
      ),
    },
  },
  {
    id: "html-15",
    order: 15,
    slug: "picture-source",
    tier: "advanced",
    readMinutes: 10,
    icon: "Images",
    visualizer: "media-stage",
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
        "The media stage swaps sources as the viewport changes.",
        "مسرح الميديا بيبدّل المصادر مع تغيّر الشاشة.",
      ),
    },
  },
  {
    id: "html-16",
    order: 16,
    slug: "head-social-meta",
    tier: "intermediate",
    readMinutes: 9,
    icon: "Share2",
    visualizer: "meta-card",
    content: {
      title: L(
        "Head & Social Meta (OG, Twitter, Theme)",
        "Head و Social Meta (OG و Twitter و Theme)",
      ),
      summary: L(
        "Social share cards, theme-color, and favicon rules — builds on the SEO & Performance lesson.",
        "كروت المشاركة و theme-color وقواعد الـ favicon — بيكمل درس SEO & Performance.",
      ),
      paragraphs: [
        L(
          "Core crawling, SSR vs CSR, and Core Web Vitals live in SEO & Performance Insights. This lesson focuses on Open Graph, Twitter Cards, theme-color, and favicon strategy.",
          "الزحف الأساسي و SSR مقابل CSR و Core Web Vitals في درس SEO & Performance. الدرس ده مركز على Open Graph و Twitter Cards و theme-color واستراتيجية الـ favicon.",
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
        "The meta card previews how a link unfurl might look.",
        "كارت الـ meta بيعاين شكل اللينك لما يتفتح.",
      ),
    },
  },
];
