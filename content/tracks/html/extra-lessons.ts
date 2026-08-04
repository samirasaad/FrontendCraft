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
    readMinutes: 11,
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
    <link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
  </head>
  <body>
    <main>
      <h1>Fast hero</h1>
      <img
        src="/hero.webp"
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
    readMinutes: 9,
    icon: "Zap",
    visualizer: "media-stage",
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
        L("Reserve space to avoid `CLS`", "احجز مساحة عشان تتجنب `CLS`"),
        L("`Lazy-load` non-critical media", "أخّر تحميل الميديا غير الحرجة"),
        L("Preload `LCP` carefully", "Preload لـ `LCP` بحذر"),
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
        src="/hero.avif"
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
        src="/lesson.webp"
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
        "Media mounts without shoving the page around.",
        "الميديا بتظهر من غير ما تزق الصفحة.",
      ),
    },
  },
  {
    id: "html-adv-arch",
    order: 18,
    slug: "html-architecture-partials",
    tier: "advanced",
    readMinutes: 10,
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
          "Keep one `<main>` landmark. Split recurring chrome (nav/footer) so content pages stay focused.",
          "خلّي `<main>` واحد. افصل الـ chrome المتكرر (nav/footer) عشان صفحات المحتوى تفضل مركزة.",
        ),
        L(
          "In component frameworks, your component tree should still emit sensible landmarks and heading ranks.",
          "في أطر المكونات، الـ tree لسه لازم يطلع landmarks ومراتب headings معقولة.",
        ),
        L(
          "Prefer server-rendered meaningful HTML for critical content — JS can enhance, not invent the whole document.",
          "فضّل HTML معنوي من السيرفر للمحتوى الحرج — JS يعزّز، مش يخترع المستند كله.",
        ),
      ],
      keyPoints: [
        L("`Landmarks` first", "`Landmarks` أولًا"),
        L("One main per page", "main واحد لكل صفحة"),
        L("Enhance, don't replace, `HTML`", "عزّز `HTML` ومتستبدلوش"),
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
        "Blocks lock into a clear page architecture.",
        "البلوكات بتتركب في معمارية صفحة واضحة.",
      ),
    },
  },
  {
    id: "html-pro-sec",
    order: 22,
    slug: "html-security-hardening",
    tier: "pro",
    readMinutes: 13,
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
          "HTML is a trust-boundary surface, not a security system by itself. Every URL, embedded document, and submitted field declares what another origin or server may receive. Review that contract before styling the component.",
          "HTML سطح حدود ثقة، مش security system لوحده. كل URL و document مضمّن وfield بيتبعت بيعلن إيه origin أو server تاني ممكن يستقبله. راجع العقد ده قبل ما تركز في الستايل.",
        ),
        L(
          "For an external `target=\"_blank\"` link, add `rel=\"noopener noreferrer\"`. `noopener` prevents the new page from controlling `window.opener`; `noreferrer` also suppresses the Referer header. Tell users when a link opens a new tab when that context matters.",
          "مع لينك خارجي `target=\"_blank\"` ضيف `rel=\"noopener noreferrer\"`. `noopener` يمنع الصفحة الجديدة تتحكم في `window.opener`؛ و`noreferrer` كمان يمنع Referer header. وضّح للمستخدم لما اللينك هيفتح tab جديدة لو السياق مهم.",
        ),
        L(
          "Treat every iframe as untrusted until proven otherwise. Start with a restrictive `sandbox` and add only the tokens the embed needs. Avoid combining `allow-scripts` and `allow-same-origin` for a same-origin frame: that can let it remove its own sandbox.",
          "اعتبر كل iframe غير موثوق لحد ما تثبت العكس. ابدأ بـ `sandbox` مقيّد وزوّد tokens اللي الـ embed محتاجها بس. متجمعش `allow-scripts` و`allow-same-origin` مع frame من نفس الـ origin: ده ممكن يخلّيه يشيل sandbox بنفسه.",
        ),
        L(
          "Autocomplete is user-data routing. Use precise values such as `username`, `current-password`, `new-password`, `one-time-code`, `cc-number`, and `transaction-amount` so the browser and password manager understand intent. Do not use `autocomplete=\"off\"` as a security control; browsers may ignore it.",
          "Autocomplete هو routing لبيانات المستخدم. استخدم قيم دقيقة زي `username` و`current-password` و`new-password` و`one-time-code` و`cc-number` و`transaction-amount` عشان المتصفح وpassword manager يفهموا النية. متستخدمش `autocomplete=\"off\"` كـ security control؛ المتصفحات ممكن تتجاهله.",
        ),
        L(
          "Never place API keys, auth tokens, private URLs, or business secrets in HTML, comments, hidden inputs, `data-*`, or client bundles. A hidden field is visible to the user. Keep secrets on the server and authorize every request there.",
          "متحطش API keys أو auth tokens أو URLs خاصة أو business secrets في HTML أو comments أو hidden inputs أو `data-*` أو client bundles. الـ hidden field ظاهر للمستخدم. خلّي الأسرار على السيرفر وauthorize كل request هناك.",
        ),
        L(
          "Forms create a data egress path. Audit the form `action`, method, and every submit button's `formaction` — a secondary button can send the same fields elsewhere. Set a deliberate `referrerpolicy`, and treat `download` as a hint: cross-origin behavior varies, and a download never makes untrusted content safe.",
          "الـ forms بتعمل مسار خروج للبيانات. راجع `action` وmethod وكل `formaction` على submit buttons — زرار ثانوي ممكن يبعت نفس fields لمكان تاني. حدّد `referrerpolicy` بقصد، واعتبر `download` hint: السلوك cross-origin بيختلف، والتحميل مش بيخلي محتوى غير موثوق آمن.",
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
    readMinutes: 12,
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
          "The Speculation Rules API lets a document describe likely future navigations with `<script type=\"speculationrules\">`. It is a performance enhancement layered over ordinary links, not a replacement for real `<a href>` navigation.",
          "Speculation Rules API بتخلي الـ document يوصف التنقلات المحتملة بـ `<script type=\"speculationrules\">`. ده performance enhancement فوق لينكات عادية، مش بديل لـ `<a href>` حقيقي.",
        ),
        L(
          "`prefetch` warms a future document's response so navigation still renders it normally. `prerender` goes further: the browser loads and renders a likely next page in the background, then can activate it quickly. Prerender is more powerful and costs more CPU, memory, and bandwidth.",
          "`prefetch` بيسخّن response للـ document الجاي عشان التنقل لسه يرسمه بشكل عادي. `prerender` أعمق: المتصفح بيحمّل ويرسم الصفحة المحتملة في الخلفية، وبعدها يفعّلها بسرعة. Prerender أقوى وتكلفته أعلى CPU وmemory وbandwidth.",
        ),
        L(
          "Keep rules same-origin unless you have an explicit, tested cross-origin policy. Start with a small list of high-confidence, read-only destinations such as a product detail or lesson page—not every link in the navigation.",
          "خلّي القواعد same-origin إلا لو عندك policy صريحة ومختبرة للـ cross-origin. ابدأ بقائمة صغيرة من وجهات read-only عالية الثقة زي صفحة منتج أو درس — مش كل لينك في الـ navigation.",
        ),
        L(
          "Never prerender logout, checkout, delete, unsubscribe, or any URL that mutates state or burns one-time tokens. A prerender can execute page code before the user commits to navigation; keep destructive work behind a user gesture and a server-side confirmation.",
          "ماتعملش prerender لـ logout أو checkout أو delete أو unsubscribe أو أي URL بيغيّر state أو يستهلك one-time tokens. الـ prerender ممكن يشغّل page code قبل ما المستخدم يقرر يتنقل؛ خلّي الشغل المدمر ورا user gesture وserver-side confirmation.",
        ),
        L(
          "Progressive enhancement is mandatory. Unsupported browsers simply ignore the rules, so the destination must be complete and fast on a direct visit. Feature-detect only when you need UI behavior; the markup stays safe to ship without detection.",
          "Progressive enhancement إلزامي. المتصفحات غير المدعومة بتتجاهل القواعد ببساطة، فوجهة التنقل لازم تكون كاملة وسريعة في الزيارة المباشرة. اعمل feature detect بس لو محتاج سلوك UI؛ الـ markup يفضل آمن للنشر من غير detection.",
        ),
        L(
          "Measure the next-page journey, not just a prettier waterfall. A correctly targeted prerender can improve the next navigation's LCP, but over-speculation competes with the current page's LCP and wastes data. Monitor Core Web Vitals and real-user conversion paths before widening rules.",
          "قِس رحلة الصفحة الجاية، مش waterfall أحلى بس. prerender مستهدف صح ممكن يحسن LCP للتنقل الجاي، لكن speculation زيادة بتنافس LCP للصفحة الحالية وبتضيّع data. راقب Core Web Vitals ومسارات المستخدمين الحقيقيين قبل ما توسّع القواعد.",
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
    readMinutes: 13,
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
          "`dir=\"auto\"` lets the browser infer direction from the first strong character — useful for user-generated names and comments. Prefer an explicit `dir` for chrome you control (nav, forms, product UI) so layout does not flip unexpectedly.",
          "`dir=\"auto\"` بيخلّي المتصفح يستنتج الاتجاه من أول حرف قوي — مفيد لأسماء وتعليقات المستخدم. فضّل `dir` صريح للـ chrome اللي بتتحكم فيه (nav و forms و UI المنتج) عشان الـ layout ما يتقلبش فجأة.",
        ),
        L(
          "Mixed strings break without isolation. Wrap an English product code or URL inside Arabic copy with `<bdi>` (bidirectional isolate) or a span with `dir=\"ltr\"`. Use `<bdo dir=\"ltr\">` only when you must force order against the Unicode bidi algorithm.",
          "الجمل المخلوطة بتكسر من غير عزل. لفّ كود منتج إنجليزي أو URL جوّه نص عربي بـ `<bdi>` (bidirectional isolate) أو span بـ `dir=\"ltr\"`. استخدم `<bdo dir=\"ltr\">` بس لما تضطر تفرض الترتيب ضد خوارزمية Unicode bidi.",
        ),
        L(
          "Forms and inputs inherit direction. For email, URL, OTP, and code fields inside an RTL page, set `dir=\"ltr\"` (and often `inputmode`) on the control so caret movement and pasted tokens stay readable. Keep the visible `<label>` in the page language.",
          "الـ forms والـ inputs بتورّث الاتجاه. لإيميل و URL و OTP وحقول الكود جوّه صفحة RTL، حط `dir=\"ltr\"` (وغالبًا `inputmode`) على الـ control عشان حركة الـ caret واللصق يفضلوا مقروءين. خلّي الـ `<label>` الظاهر بلغة الصفحة.",
        ),
        L(
          "Assistive tech and SEO both read language tags. Mark a long English quotation with `lang=\"en\"` inside Arabic content. Do not rely on CSS alone for mirroring — logical CSS helps layout, but correct `lang`/`dir` in HTML is what screen readers and browsers use for pronunciation and bidi.",
          "التقنيات المساعدة والـ SEO بيقرأوا وسوم اللغة. علّم اقتباس إنجليزي طويل بـ `lang=\"en\"` جوّه محتوى عربي. متعتمدش على CSS لوحده للعكس — الـ CSS المنطقي بيساعد الـ layout، لكن `lang`/`dir` الصح في HTML هو اللي قارئات الشاشة والمتصفحات بتستخدمه للنطق و bidi.",
        ),
        L(
          "Treat direction flips as product bugs: a forgotten `dir` on a modal, toast, or portal can strand focus and reading order. When you teleport UI (dialog, popover), inherit or set `dir`/`lang` explicitly on the teleported root.",
          "اعتبر تقلّب الاتجاه bug منتج: `dir` منسي على modal أو toast أو portal يقدر يبوّظ الـ focus وترتيب القراءة. لما تنقل UI (dialog أو popover)، ورّث أو حط `dir`/`lang` صراحة على جذر العنصر المنقول.",
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
    visualizer: "document-tree",
    content: {
      title: L("Common Pitfalls", "أخطاء شائعة"),
      summary: L(
        "Capstone — every classic HTML trap in one lesson, wrong vs right side by side.",
        "خاتمة — كل فخاخ HTML الكلاسيكية في درس واحد، غلط مقابل صح جنب بعض.",
      ),
      paragraphs: [
        L(
          "Other HTML lessons stay focused on teaching. All the traps live in this single pitfalls lesson at the end of the Pro tier.",
          "دروس HTML التانية مركزة على الشرح. كل الفخاخ عايشة في درس pitfalls واحد في آخر مستوى Pro.",
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
        L("Capstone for the whole `HTML` track", "خاتمة للـ `HTML` track كله"),
        L("Wrong vs right on every card", "غلط مقابل صح في كل كارت"),
        L("Revisit the matching lesson after each card", "ارجع للدرس المناسب بعد كل كارت"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Link vs button</title>
  </head>
  <body>
    <main>
      <h1>Navigation vs actions</h1>
      <p><a href="/javascript">Open JS track</a></p>
      <p><button type="button">Mark complete</button></p>
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
    <title>Valid nesting</title>
  </head>
  <body>
    <main>
      <article>
        <h1>Lesson notes</h1>
        <section class="note">
          <h2>Note</h2>
          <p>Valid nesting beats div soup.</p>
        </section>
      </article>
    </main>
  </body>
</html>`,
          "Full page: section with heading + paragraph",
          "صفحة كاملة: section بـ heading وفقرة",
        ),
      ],
      visualHint: L(
        "The tree stays honest when nesting follows the rules.",
        "الشجرة بتفضل صادقة لما الـ nesting يمشي على القواعد.",
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
        L("`Filter` → `preview` → `copy` → `paste` in `playground`", "فلتر → معاينة → نسخ → لصق في الـ `playground`"),
        L("Prefer `boilerplate` for full `document` fragments", "فضّل `boilerplate` لمقاطع المستند الكاملة"),
        L("Check `Baseline` before shipping bleeding-edge `tags`", "راجع `Baseline` قبل ما تنشر `tags` جديدة"),
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
