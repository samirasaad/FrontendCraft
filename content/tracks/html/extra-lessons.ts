import {
  L,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import { htmlCheatCards } from "@/content/tracks/html/cheatsheet-cards";
import { collectedHtmlPitfalls } from "@/content/tracks/html/collected-pitfalls";

export const extraLessons: LessonDraft[] = [
  {
    id: "html-pro-0",
    order: 20,
    slug: "html-core-web-vitals",
    tier: "pro",
    readMinutes: 8,
    icon: "Gauge",
    visualizer: "cwv-lab",
    content: {
      title: L("`Core Web Vitals`", "مؤشرات `Core Web Vitals`"),
      summary: L(
        "Dedicated performance lesson — LCP, INP, and CLS as product metrics you ship and measure.",
        "درس أداء مخصص — LCP و INP و CLS كمقاييس منتج بتنشرها وتقيسها.",
      ),
      paragraphs: [
        L(
          "Core Web Vitals are field metrics, not SEO meta tricks: LCP (largest contentful paint), INP (interaction to next paint), and CLS (cumulative layout shift). Treat regressions like product bugs.",
          "Core Web Vitals مقاييس ميدانية، مش حِيَل meta للـ SEO: LCP و INP و CLS. عامل الـ regressions زي bugs منتج.",
        ),
        L(
          "LCP is often a hero `<img>` or large text block. Size it, avoid `loading=\"lazy\"` above the fold, and consider `fetchpriority=\"high\"` / preload when you know the URL.",
          "LCP غالبًا `<img>` hero أو بلوك نص كبير. حط له مقاس، ومتعملش `loading=\"lazy\"` فوق الشاشة، وفكّر في `fetchpriority=\"high\"` / preload لما تعرف الـ URL.",
        ),
        L(
          "INP tracks how fast the UI responds after a tap or click. Keep event handlers light, break up long tasks, and defer non-critical JS so the main thread stays free.",
          "INP بيقيس سرعة رد الـ UI بعد ضغطة. خلّي الـ handlers خفيفة، قطّع الـ long tasks، وأخّر JS غير الحرج عشان الـ main thread يفضل فاضي.",
        ),
        L(
          "CLS spikes from unsized images, late ads, and web fonts that reflow text. Reserve space with `width`/`height` or CSS `aspect-ratio`, and avoid injecting banners above existing content.",
          "CLS بيزيد من صور من غير مقاس وإعلانات متأخرة وخطوط بتعمل reflow. احجز مساحة بـ `width`/`height` أو `aspect-ratio`، ومتحقنش بنرات فوق محتوى موجود.",
        ),
        L(
          "Measure with CrUX / Search Console field data and lab tools (Lighthouse, Web Vitals). Media-specific tactics continue in Media & Loading Performance.",
          "قِس بـ CrUX / Search Console field data وأدوات lab (Lighthouse و Web Vitals). تكتيكات الميديا في درس Media & Loading Performance.",
        ),
      ],
      keyPoints: [
        L("`LCP` < 2.5s · `INP` < 200ms · `CLS` < 0.1 (good)", "`LCP` < 2.5s · `INP` < 200ms · `CLS` < 0.1 (جيد)"),
        L("Never `lazy-load` the `LCP` element", "متعَمِلش lazy على عنصر `LCP`"),
        L("Reserve space before `bytes` arrive", "احجز المساحة قبل ما الـ `bytes` توصل"),
        L("Field data beats a green lab score alone", "Field data أهم من lab score أخضر لوحده"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Core Web Vitals — LCP</title>
    <link
      rel="preload"
      as="image"
      href="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=LCP+hero"
      fetchpriority="high"
    />
  </head>
  <body>
    <main>
      <h1>Fast hero</h1>
      <img
        src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=LCP+hero"
        alt="Learner at a code playground"
        width="1200"
        height="630"
        fetchpriority="high"
      />
    </main>
  </body>
</html>`,
          "Full page: sized LCP image with preload",
          "صفحة كاملة: صورة LCP بمقاس + preload",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Core Web Vitals — CLS</title>
    <style>
      .ad-slot { aspect-ratio: 16 / 9; min-height: 180px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Stable layout</h1>
      <aside class="ad-slot" aria-label="Sponsored">
        <!-- late-loaded creative cannot shove main content -->
      </aside>
      <button type="button">Save progress</button>
    </main>
  </body>
</html>`,
          "Full page: reserved slot + light interaction",
          "صفحة كاملة: مساحة محجوزة + تفاعل خفيف",
        ),
      ],
      visualHint: L(
        "Each vital flips from needs-work to good — watch LCP, then INP, then CLS.",
        "كل vital بيتحول من needs-work لـ good — اتفرّج على LCP وبعدين INP وبعدين CLS.",
      ),
    },
  },
  {
    id: "html-pro-1",
    order: 21,
    slug: "html-perf-media",
    tier: "pro",
    readMinutes: 8,
    icon: "Zap",
    visualizer: "media-perf-lab",
    content: {
      title: L("Media & Loading Performance", "أداء الميديا والتحميل"),
      summary: L(
        "Builds on Core Web Vitals — budget heavy images and embeds that usually kill LCP and CLS.",
        "بيكمل درس Core Web Vitals — حط ميزانية للصور والـ embeds التقيلة اللي غالبًا بتقتل LCP و CLS.",
      ),
      paragraphs: [
        L(
          "You already met LCP / INP / CLS in Core Web Vitals. Here the focus is media markup that usually causes those regressions.",
          "اتعرفت على LCP / INP / CLS في درس Core Web Vitals. هنا التركيز على markup الميديا اللي غالبًا بيسبب الـ regressions دي.",
        ),
        L(
          "Always set `width`/`height` (or aspect-ratio CSS) to reduce CLS. Prefer modern formats (WebP/AVIF) with fallbacks.",
          "حط `width`/`height` (أو aspect-ratio) عشان تقلل CLS. فضّل WebP/AVIF مع fallback.",
        ),
        L(
          "Use `loading=\"lazy\"` for below-the-fold media. Preload only the LCP image when you know it.",
          "استخدم `loading=\"lazy\"` للصور تحت الشاشة. Preload لصورة LCP بس لما تبقى متأكد.",
        ),
        L(
          "Iframes are expensive — lazy-load embeds and give them a click-to-load pattern when possible.",
          "الـ iframes غالية — أخّر تحميلها واستخدم نمط click-to-load لما تقدر.",
        ),
      ],
      keyPoints: [
        L("Always size media with `width`/`height` or `aspect-ratio`", "دايمًا حط مقاس بـ `width`/`height` أو `aspect-ratio`"),
        L("`loading=\"lazy\"` for anything below the fold", "`loading=\"lazy\"` لأي حاجة تحت الشاشة"),
        L("Never `lazy-load` the `LCP` image — preload it instead", "متعملش `lazy` على صورة `LCP` — اعمل preload بدالها"),
        L("`Lazy-load` iframes; try click-to-load for heavy embeds", "أخّر تحميل الـ iframes؛ جرّب click-to-load للـ embeds التقيلة"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Media performance</title>
  </head>
  <body>
    <main>
      <h1>Sized hero</h1>
      <img
        src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Sized+hero"
        alt="Learner at a code playground"
        width="1200"
        height="630"
        decoding="async"
      />
    </main>
  </body>
</html>`,
          "Full page: sized hero — stable layout",
          "صفحة كاملة: صورة hero بمقاس ثابت",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lazy media</title>
  </head>
  <body>
    <main>
      <h1>Below-the-fold media</h1>
      <img
        src="https://placehold.co/640x360/0284c7/fff.jpg?text=Below+fold"
        alt=""
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
      />
      <iframe
        title="Event Loop demo"
        src="https://example.com/embed"
        loading="lazy"
        width="640"
        height="360"
      ></iframe>
    </main>
  </body>
</html>`,
          "Full page: lazy image + lazy iframe",
          "صفحة كاملة: صورة و iframe متأخرين",
        ),
      ],
      visualHint: L(
        "Size → lazy below-fold → LCP priority → lazy iframes.",
        "مقاس → lazy تحت الشاشة → أولوية LCP → iframes متأخرة.",
      ),
    },
  },
  {
    id: "html-adv-arch",
    order: 18,
    slug: "html-architecture-partials",
    tier: "advanced",
    readMinutes: 8,
    icon: "Blocks",
    visualizer: "semantic-blocks",
    content: {
      title: L("`Document` Architecture", "هندسة المستند"),
      summary: L(
        "Think in reusable regions — header, main, templates — before you sprinkle divs.",
        "فكّر بمناطق قابلة لإعادة الاستخدام — header و main وقوالب — قبل ما ترش `div`.",
      ),
      paragraphs: [
        L(
          "Keep exactly one `<main>` landmark per page and pull recurring chrome — header, nav, footer — into their own regions. That split keeps `<main>` scannable and gives assistive tech clear jump points.",
          "خلّي `<main>` واحد بس في كل صفحة، وحطّ الـ chrome المتكرر — header و nav و footer — في مناطقه. الفصل ده بيخلي `<main>` سهل التصفح وبيدي التقنية المساعدة نقط قفز واضحة.",
        ),
        L(
          "Landmarks are only half the structure — headings need a logical rank too. One `<h1>` per page, then `<h2>`/`<h3>` nested by actual content hierarchy, not by the font size you want.",
          "الـ landmarks نص الهيكل بس — العناوين لازم مرتبة منطقية كمان. `<h1>` واحد لكل صفحة، وبعدين `<h2>`/`<h3>` متداخلة حسب ترتيب المحتوى الحقيقي، مش حسب حجم الخط اللي عايزه.",
        ),
        L(
          "In component frameworks the same rules apply — your component tree should still emit one main, sensible landmarks, and correct heading ranks, even when the markup is split across many files.",
          "في أطر المكونات نفس القواعد سارية — الـ component tree لسه لازم يطلّع main واحد و landmarks معقولة ومراتب headings صح، حتى لو الـ markup متقسم على ملفات كتير.",
        ),
        L(
          "Prefer server-rendered, meaningful HTML for critical content. JavaScript should enhance an already-usable document — add interactivity — not invent the whole page from an empty shell.",
          "فضّل HTML معنوي من السيرفر للمحتوى الحرج. الـ JavaScript المفروض يعزّز مستند شغال بالفعل — يضيف تفاعلية — مش يخترع الصفحة كلها من قالب فاضي.",
        ),
      ],
      keyPoints: [
        L("`Landmarks` first — one `<main>` per page", "`Landmarks` أولًا — `<main>` واحد لكل صفحة"),
        L("Heading ranks follow content, not font size", "مراتب العناوين تتبع المحتوى مش حجم الخط"),
        L("Component trees still need real landmarks + headings", "الـ component trees لسه محتاجة landmarks + headings حقيقية"),
        L("Enhance with `JS`, don't replace server `HTML`", "عزّز بـ `JS`، ومتستبدلش `HTML` السيرفر"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document architecture</title>
  </head>
  <body>
    <a href="#content">Skip</a>
    <header>
      <p>FrontendCraft</p>
    </header>
    <main id="content">
      <h1>Main content</h1>
    </main>
    <footer>
      <p>© FrontendCraft</p>
    </footer>
  </body>
</html>`,
          "Full page: skip link + landmarks",
          "صفحة كاملة: skip link + landmarks",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML Forms</title>
  </head>
  <body>
    <header>
      <p>FrontendCraft</p>
      <nav aria-label="Tracks">
        <a href="/html">HTML</a>
      </nav>
    </header>
    <main id="content">
      <article>
        <h1>HTML Forms</h1>
        <section aria-labelledby="tips">
          <h2 id="tips">Tips</h2>
          <p>Keep one main landmark.</p>
        </section>
      </article>
    </main>
  </body>
</html>`,
          "Full page: article inside main",
          "صفحة كاملة: article جوّه main",
        ),
      ],
      visualHint: L(
        "Landmarks assemble step by step — tree, page preview, and AT roles stay in sync.",
        "الـ landmarks بتتجمّع خطوة بخطوة — الشجرة ومعاينة الصفحة وأدوار التقنية المساعدة متزامنين.",
      ),
    },
  },
  {
    id: "html-pro-sec",
    order: 22,
    slug: "html-security-hardening",
    tier: "pro",
    readMinutes: 9,
    icon: "Shield",
    visualizer: "html-security-lab",
    content: {
      title: L("`HTML` `Security` Hardening", "تقوية أمان `HTML`"),
      summary: L(
        "Ship-safe markup at trust boundaries: external tabs, embeds, forms, and browser-held data.",
        "Markup آمن للإنتاج عند حدود الثقة: tabs خارجية و embeds و forms وبيانات المتصفح.",
      ),
      paragraphs: [
        L(
          "HTML sits at your app's trust boundary — every URL, embedded document, and submitted field decides what another origin or server can receive. Review that contract before you touch the styling.",
          "الـ HTML بيقعد عند حدود الثقة بتاعة تطبيقك — كل URL و document مضمّن وfield بيتبعت بيحدد إيه اللي origin أو server تاني ممكن يستقبله. راجع العقد ده قبل ما تلمس الستايل.",
        ),
        L(
          "For an external `target=\"_blank\"` link, always add `rel=\"noopener noreferrer\"`. `noopener` stops the new tab from controlling `window.opener`; `noreferrer` also drops the Referer header.",
          "مع أي لينك خارجي `target=\"_blank\"` ضيف دايمًا `rel=\"noopener noreferrer\"`. `noopener` بيمنع الـ tab الجديدة تتحكم في `window.opener`؛ و`noreferrer` كمان بيشيل الـ Referer header.",
        ),
        L(
          "Treat every iframe as untrusted. Start with a restrictive `sandbox` and grant only the tokens the embed needs — never combine `allow-scripts` with `allow-same-origin` on a same-origin frame, or it can strip its own sandbox.",
          "اعتبر كل iframe غير موثوق. ابدأ بـ `sandbox` مقيّد وزوّد الـ tokens اللي محتاجها الـ embed بس — متجمعش `allow-scripts` مع `allow-same-origin` على frame من نفس الـ origin، عشان ممكن يشيل الـ sandbox بتاعه لوحده.",
        ),
        L(
          "`autocomplete` routes user data — use precise values like `username`, `new-password`, `one-time-code`, and `cc-number` so browsers and password managers understand intent. Don't use `autocomplete=\"off\"` as a security control; browsers may ignore it.",
          "`autocomplete` بيوجّه بيانات المستخدم — استخدم قيم دقيقة زي `username` و`new-password` و`one-time-code` و`cc-number` عشان المتصفح وpassword manager يفهموا القصد. متستخدمش `autocomplete=\"off\"` كـ security control؛ المتصفحات ممكن تتجاهله.",
        ),
        L(
          "Never put API keys, tokens, or secrets in HTML, comments, hidden inputs, or client bundles — a hidden field is still visible. The same care applies to forms: audit every `action` and `formaction` (a secondary button can submit elsewhere), and set a deliberate `referrerpolicy`.",
          "متحطش API keys أو tokens أو أسرار في HTML أو comments أو hidden inputs أو client bundles — الـ hidden field لسه ظاهر. نفس الحذر مع الفورم: راجع كل `action` و`formaction` (زرار ثانوي ممكن يبعت لمكان تاني)، وحدّد `referrerpolicy` بقصد.",
        ),
      ],
      keyPoints: [
        L("`target=\"_blank\"` → `rel=\"noopener noreferrer\"`", "`target=\"_blank\"` → `rel=\"noopener noreferrer\"`"),
        L("`Sandbox` embeds by `default`; grant the minimum", "اعمل `sandbox` للـ embeds افتراضيًا؛ وامنح أقل صلاحيات"),
        L("`Autocomplete` `tokens` describe intent, not `security`", "`Autocomplete` `tokens` بتوصف النية، مش `security`"),
        L("`Secrets` never belong in `client`-`visible` `HTML`", "الأسرار عمرها ما مكانها `HTML` ظاهر للعميل"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Safe external link</title>
  </head>
  <body>
    <main>
      <h1>Partner documentation</h1>
      <a
        href="https://docs.example.com"
        target="_blank"
        rel="noopener noreferrer"
        referrerpolicy="strict-origin-when-cross-origin"
      >
        Open partner docs (new tab)
      </a>
    </main>
  </body>
</html>`,
          "Full page: external tab with opener and referrer protection",
          "صفحة كاملة: tab خارجية بحماية opener و referrer",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Checkout security boundary</title>
  </head>
  <body>
    <main>
      <h1>Confirm your account</h1>
      <iframe
        title="Third-party address lookup"
        src="https://widgets.example.net/address"
        sandbox="allow-forms allow-scripts"
        referrerpolicy="no-referrer"
      ></iframe>

      <form action="/account/confirm" method="post">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="username" />

        <label for="code">Verification code</label>
        <input id="code" name="code" inputmode="numeric" autocomplete="one-time-code" />

        <button type="submit">Confirm</button>
      </form>
    </main>
  </body>
</html>`,
          "Full page: least-privilege iframe + intentional autocomplete",
          "صفحة كاملة: iframe بأقل صلاحيات + autocomplete مقصود",
        ),
      ],
      visualHint: L(
        "Walk the trust boundary: close opener access, lock the iframe down, then label sensitive browser-held data.",
        "امشي في حدود الثقة: اقفل opener access، قيّد الـ iframe، وبعدها سمّي بيانات المتصفح الحساسة.",
      ),
    },
  },
  {
    id: "html-pro-spec",
    order: 23,
    slug: "html-speculation-rules",
    tier: "pro",
    readMinutes: 9,
    icon: "Radar",
    visualizer: "html-speculation-lab",
    content: {
      title: L(
        "Instant Navigation (Speculation Rules)",
        "تنقّل فوري (Speculation Rules)",
      ),
      summary: L(
        "Use modern prefetch and prerender rules to make the next intentional navigation feel instant—without speculating on unsafe routes.",
        "استخدم قواعد prefetch و prerender الحديثة عشان التنقّل المقصود الجاي يحس instant — من غير ما تتوقع routes مش آمنة.",
      ),
      paragraphs: [
        L(
          "The Speculation Rules API lets a page hint at likely future navigations with `<script type=\"speculationrules\">`. It's a performance layer on top of ordinary `<a href>` links — unsupported browsers just ignore it, so every destination must still work on a direct visit.",
          "Speculation Rules API بتخلي الصفحة تلمّح للتنقلات المحتملة بـ `<script type=\"speculationrules\">`. ده طبقة أداء فوق لينكات `<a href>` عادية — المتصفحات غير المدعومة بتتجاهلها ببساطة، فكل وجهة لازم تفضل شغالة في الزيارة المباشرة.",
        ),
        L(
          "`prefetch` warms a page's response so navigation still renders normally. `prerender` goes further — the browser loads and renders the page in the background so activation feels instant. Prerender is more powerful but costs more CPU, memory, and bandwidth.",
          "`prefetch` بيسخّن response الصفحة عشان التنقل يترسم عادي. `prerender` أعمق — المتصفح بيحمّل ويرسم الصفحة في الخلفية عشان التفعيل يحس فوري. Prerender أقوى لكن تكلفته أعلى CPU وmemory وbandwidth.",
        ),
        L(
          "Keep rules same-origin unless you have a tested cross-origin policy. Start with a short list of high-confidence, read-only destinations — a product page or the next lesson — not every link on the page.",
          "خلّي القواعد same-origin إلا لو عندك policy مختبرة للـ cross-origin. ابدأ بقائمة قصيرة من وجهات read-only عالية الثقة — صفحة منتج أو الدرس الجاي — مش كل لينك في الصفحة.",
        ),
        L(
          "Never prerender logout, checkout, delete, or any URL that mutates state or burns a one-time token — a prerender can run page code before the user commits to navigating. Keep destructive actions behind a real user gesture.",
          "ماتعملش prerender لـ logout أو checkout أو delete أو أي URL بيغيّر state أو يستهلك token لمرة واحدة — الـ prerender ممكن يشغّل كود الصفحة قبل ما المستخدم يقرر يتنقل. خلّي الأفعال المدمرة ورا user gesture حقيقي.",
        ),
        L(
          "Measure the next page's journey, not just a prettier waterfall — a well-targeted prerender improves the next LCP, but over-speculation competes with the current page and wastes data. Watch Core Web Vitals before widening the rules.",
          "قِس رحلة الصفحة الجاية، مش waterfall أحلى بس — prerender مستهدف صح بيحسّن LCP الجاي، لكن speculation زيادة بتنافس الصفحة الحالية وتضيّع data. راقب Core Web Vitals قبل ما توسّع القواعد.",
        ),
      ],
      keyPoints: [
        L("`Prefetch` warms `bytes`; `prerender` warms a rendered page", "`Prefetch` بيسخّن `bytes`؛ `prerender` بيسخّن صفحة مترسومة"),
        L("Start with `same-origin`, high-confidence read-only URLs", "ابدأ بـ `same-origin` وURLs read-only عالية الثقة"),
        L("Never `prerender` `logout` or mutating routes", "ماتعملش `prerender` لـ `logout` أو routes بتغيّر `state`"),
        L("Measure next-navigation `LCP` against current-page cost", "قارن `LCP` للتنقل الجاي بتكلفة الصفحة الحالية"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lesson index</title>
    <script type="speculationrules">
      {
        "prefetch": [
          { "urls": ["/html/forms", "/html/accessibility"] }
        ]
      }
    </script>
  </head>
  <body>
    <main>
      <h1>Choose your next lesson</h1>
      <a href="/html/forms">Forms</a>
      <a href="/html/accessibility">Accessibility</a>
    </main>
  </body>
</html>`,
          "Full page: same-origin prefetch for likely lesson links",
          "صفحة كاملة: same-origin prefetch للينكات دروس المتوقعة",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product collection</title>
    <script type="speculationrules">
      {
        "prerender": [
          {
            "urls": ["/products/keyboard"],
            "eagerness": "moderate"
          }
        ]
      }
    </script>
  </head>
  <body>
    <main>
      <h1>Popular today</h1>
      <a href="/products/keyboard">Mechanical keyboard</a>
      <a href="/logout">Sign out</a>
      <!-- Never add /logout, checkout, delete, or token URLs to prerender rules. -->
    </main>
  </body>
</html>`,
          "Full page: prerender a safe read-only destination, not logout",
          "صفحة كاملة: prerender لوجهة read-only آمنة، مش logout",
        ),
      ],
      visualHint: L(
        "See the next page move from cold click to prefetched to prerender-warm—while logout stays outside the rule.",
        "شوف الصفحة الجاية تتحرك من click بارد لـ prefetched لـ prerender-warm — والـ logout يفضل بره القاعدة.",
      ),
    },
  },
  {
    id: "html-pro-rtl",
    order: 24,
    slug: "html-global-rtl",
    tier: "pro",
    readMinutes: 9,
    icon: "Languages",
    visualizer: "html-global-rtl-lab",
    content: {
      title: L(
        "Global & Bidirectional HTML (RTL)",
        "HTML العالمي وثنائي الاتجاه (RTL)",
      ),
      summary: L(
        "Ship bilingual and RTL-ready documents — `lang`, `dir`, bidi isolation, and forms that don’t break Arabic ↔ English mixed content.",
        "انشر documents جاهزة لـ bilingual و RTL — `lang` و `dir` وعزل bidi و forms متتكسرش مع محتوى عربي ↔ إنجليزي مخلوط.",
      ),
      paragraphs: [
        L(
          "Global HTML starts on the root: set `lang` for the primary language and `dir` for the primary direction. A page that teaches in Egyptian Arabic with English technical terms often uses `lang=\"ar\" dir=\"rtl\"` on `<html>`, then overrides direction only where a phrase is truly LTR.",
          "الـ HTML العالمي بيبدأ من الـ root: حط `lang` للغة الأساسية و `dir` للاتجاه الأساسي. صفحة بتعلّم بالمصري مع مصطلحات إنجليزية غالبًا تستخدم `lang=\"ar\" dir=\"rtl\"` على `<html>`، وبعدين تعدّل الاتجاه بس لما الجملة فعلاً LTR.",
        ),
        L(
          "`dir=\"auto\"` infers direction from the first strong character — handy for user-generated names and comments. Use an explicit `dir` for chrome you control (nav, forms, dialogs), and set it again on any teleported UI like a modal or popover — a forgotten `dir` there can strand focus and reading order.",
          "`dir=\"auto\"` بيستنتج الاتجاه من أول حرف قوي — مفيد لأسماء وتعليقات المستخدم. استخدم `dir` صريح للـ chrome اللي بتتحكم فيه (nav و forms و dialogs)، وحطه تاني على أي UI بينتقل زي modal أو popover — `dir` منسي هناك ممكن يبوّظ الـ focus وترتيب القراءة.",
        ),
        L(
          "Mixed strings break without isolation. Wrap an English product code or URL inside Arabic copy with `<bdi>` (bidirectional isolate) or a span with `dir=\"ltr\"`. Reach for `<bdo dir=\"ltr\">` only when you must force order against the Unicode bidi algorithm.",
          "الجمل المخلوطة بتكسر من غير عزل. لفّ كود منتج إنجليزي أو URL جوّه نص عربي بـ `<bdi>` (bidirectional isolate) أو span بـ `dir=\"ltr\"`. استخدم `<bdo dir=\"ltr\">` بس لما تضطر تفرض الترتيب ضد خوارزمية Unicode bidi.",
        ),
        L(
          "Forms and inputs inherit direction. For email, URL, OTP, and code fields inside an RTL page, set `dir=\"ltr\"` (and often `inputmode`) on the control so caret movement and pasted tokens stay readable. Keep the visible `<label>` in the page language.",
          "الـ forms والـ inputs بتورّث الاتجاه. لإيميل و URL و OTP وحقول الكود جوّه صفحة RTL، حط `dir=\"ltr\"` (وغالبًا `inputmode`) على الـ control عشان حركة الـ caret واللصق يفضلوا مقروءين. خلّي الـ `<label>` الظاهر بلغة الصفحة.",
        ),
        L(
          "Screen readers and search engines both read language tags, so mark a long English quotation with `lang=\"en\"` inside Arabic content. Logical CSS helps layout mirror correctly, but correct `lang`/`dir` in the HTML is what actually drives pronunciation and bidi behavior.",
          "قارئات الشاشة ومحركات البحث بيقرأوا وسوم اللغة، فعلّم اقتباس إنجليزي طويل بـ `lang=\"en\"` جوّه محتوى عربي. الـ CSS المنطقي بيساعد الـ layout يتقلب صح، لكن `lang`/`dir` الصح في HTML هو اللي فعلًا بيتحكم في النطق وسلوك bidi.",
        ),
      ],
      keyPoints: [
        L("`Root` `lang` + `dir` declare the `document` `default`", "`Root` `lang` + `dir` بيعلنوا افتراضي المستند"),
        L("`Isolate` `mixed` English `tokens` with `<bdi>` or `dir=\"ltr\"`", "اعزل الرموز الإنجليزية المخلوطة بـ `<bdi>` أو `dir=\"ltr\"`"),
        L("Force `LTR` on email/`URL`/OTP `inputs` inside `RTL` pages", "افرض `LTR` على حقول الإيميل/`URL`/OTP جوّه صفحات `RTL`"),
        L("Teleporting `UI` must carry `lang`/`dir` with it", "الـ `UI` المتنقل لازم يشيل `lang`/`dir` معاه"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RTL demo — Document anatomy</title>
  </head>
  <body>
    <main>
      <h1>Document anatomy</h1>
      <p>
        English chrome on an RTL root. Isolate technical tokens so they stay LTR:
        <bdi dir="ltr">&lt;!DOCTYPE html&gt;</bdi>
        and
        <bdi lang="en" dir="ltr">html</bdi>.
      </p>
      <p lang="ar">
        ابدأ بـ
        <bdi dir="ltr">&lt;!DOCTYPE html&gt;</bdi>
        قبل بناء الصفحة.
      </p>
    </main>
  </body>
</html>`,
          "RTL root with English UI + isolated tokens",
          "Root RTL مع UI إنجليزي + tokens معزولة",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RTL demo — Create account</title>
  </head>
  <body>
    <main>
      <h1>Create account</h1>
      <p>RTL page direction with LTR fields for Latin data.</p>
      <form>
        <label>
          Name
          <input name="name" autocomplete="name" dir="auto" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            dir="ltr"
            required
          />
        </label>
        <label>
          One-time code
          <input
            name="otp"
            inputmode="numeric"
            autocomplete="one-time-code"
            dir="ltr"
          />
        </label>
        <button type="submit">Continue</button>
      </form>
    </main>
  </body>
</html>`,
          "RTL page, English labels, LTR email + OTP",
          "صفحة RTL، لابلز إنجليزي، إيميل و OTP بـ LTR",
        ),
      ],
      visualHint: L(
        "Watch the page flip to RTL, isolate an English token, then lock email/OTP inputs to LTR.",
        "اتفرّج الصفحة تتقلب لـ RTL، وتعزل token إنجليزي، وبعدين تقفل حقول الإيميل/OTP على LTR.",
      ),
    },
  },
  {
    id: "html-pit-1",
    order: 25,
    slug: "html-common-pitfalls",
    tier: "pro",
    readMinutes: 12,
    icon: "AlertOctagon",
    visualizer: "html-pitfalls-lab",
    content: {
      title: L("Common Pitfalls", "أخطاء شائعة"),
      summary: L(
        "Capstone — every classic HTML mistake in one lesson, wrong vs right side by side.",
        "خاتمة — كل أخطاء HTML الكلاسيكية في درس واحد، غلط مقابل صح جنب بعض.",
      ),
      paragraphs: [
        L(
          "Other HTML lessons stay focused on teaching. All the common mistakes live in this single pitfalls lesson at the end of the Pro tier.",
          "دروس HTML التانية مركزة على الشرح. كل الأخطاء الشائعة عايشة في درس pitfalls واحد في آخر مستوى Pro.",
        ),
        L(
          "Scan each card: skeleton, semantics, headings, links, lists, forms, tables, a11y, SEO, media, buttons vs links, and nesting.",
          "اتفرّج على كل كارت: الهيكل، الـ semantics، العناوين، اللينكات، القوائم، الفورم، الجداول، الوصول، الـ SEO، الميديا، الأزرار مقابل اللينكات، والـ nesting.",
        ),
        L(
          "When a card clicks for you, jump back to the matching Beginner–Pro lesson and rebuild it in the playground.",
          "لما كارت يوضّحلك، ارجع للدرس المناسب من Beginner لـ Pro وابنِه تاني في الـ playground.",
        ),
      ],
      keyPoints: [
        L("Missing `lang`, missing `alt`, skipped headings — the repeat offenders", "`lang` أو `alt` ناقص وقفز في العناوين — أكتر الأخطاء تكرارًا"),
        L("A `<div>` with `onclick` is never a real `<button>`", "الـ `<div>` مع `onclick` مش بديل لـ `<button>` حقيقي"),
        L("Labels, alt text, and table headers must match what's on screen", "الـ labels والـ alt والـ table headers لازم تطابق اللي ظاهر"),
        L("When a card clicks, rebuild the fix in the playground now", "لما كارت يوضّحلك، ابنِ الإصلاح في الـ playground فورًا"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Basic document template — edit and fix pitfalls here.</p>
  </body>
</html>`,
          "Basic document template",
          "قالب مستند أساسي",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrontendCraft — pitfalls practice</title>
    <meta
      name="description"
      content="Practice common HTML mistakes in a complete document shell."
    />
  </head>
  <body>
    <header>
      <nav aria-label="Primary">
        <a href="/html">HTML track</a>
      </nav>
    </header>
    <main>
      <h1>Pitfalls practice</h1>
      <p>Start from a real document shell, then apply the Prefer side of each card.</p>
    </main>
    <footer>
      <p><small>Rebuild one fix at a time.</small></p>
    </footer>
  </body>
</html>`,
          "Complete document shell to practice fixes",
          "هيكل مستند كامل للتدريب على الإصلاحات",
        ),
      ],
      visualHint: L(
        "Start from a basic document — then watch each mistake flip to the fix.",
        "ابدأ من مستند أساسي — وبعدين اتفرّج على كل غلط وهو بيتحول للصح.",
      ),
      pitfalls: collectedHtmlPitfalls,
    },
  },
  {
    id: "html-sheet-1",
    order: 26,
    slug: "html-cheatsheet",
    tier: "cheatsheet",
    readMinutes: 8,
    icon: "NotebookTabs",
    visualizer: "cheatsheet-lab",
    content: {
      title: L("Interactive CheatSheet", "CheatSheet تفاعلي"),
      summary: L(
        "Filterable cards with live previews, copy actions, and browser compatibility — modern HTML at a glance.",
        "كروت قابلة للفلترة مع معاينة مباشرة ونسخ وتوافق متصفحات — HTML الحديث بنظرة.",
      ),
      paragraphs: [
        L(
          "Use the category chips to jump between Structure, Forms, Media, and Interactive & Meta patterns.",
          "استخدم أزرار الفئات للتنقّل بين Structure و Forms و Media و Interactive & Meta.",
        ),
        L(
          "Each card shows a mini live preview, Copy Code, optional Copy Boilerplate, and a Baseline-aware compatibility bar.",
          "كل كارت فيه معاينة مباشرة و Copy Code و Copy Boilerplate اختياري وشريط توافق واعي بـ Baseline.",
        ),
        L(
          "Technical tag names stay in English in both locales on purpose — paste into the playground and tweak live.",
          "أسماء الـ tags التقنية بتفضل إنجليزي في اللغتين عن قصد — حطها في الـ playground وعدّل مباشرة.",
        ),
      ],
      keyPoints: [
        L("Use category chips to jump straight to what you need", "استخدم أزرار الفئات عشان توصل لللي محتاجه على طول"),
        L("`Copy Code` for the snippet, `Copy Boilerplate` for a full document", "`Copy Code` للمقطع، `Copy Boilerplate` للمستند الكامل"),
        L("The `Baseline` bar tells you if a `tag` is safe to ship today", "شريط `Baseline` بيقولك لو الـ `tag` آمن للنشر دلوقتي"),
        L("Paste into the playground and tweak live before using it for real", "حطه في الـ playground وعدّل مباشرة قبل ما تستخدمه فعليًا"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Demo</title>
  </head>
  <body>
    <main>
      <h1>Hi</h1>
      <p>Minimal valid document.</p>
    </main>
  </body>
</html>`,
          "Minimal valid document",
          "مستند صالح مختصر",
        ),
        realWorldExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dialog demo</title>
  </head>
  <body>
    <main>
      <h1>Native dialog</h1>
      <dialog id="hi" open>
        <p>Native dialog preview</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </main>
  </body>
</html>`,
          "Full page with native dialog",
          "صفحة كاملة مع native dialog",
        ),
      ],
      visualHint: L(
        "Watch filter → card focus → Baseline check → copy → paste into the playground.",
        "اتفرّج على filter → تركيز الكارت → مراجعة Baseline → نسخ → لصق في الـ playground.",
      ),
      cheatCards: htmlCheatCards,
    },
  },
];
