import {
  L,
  hardExample,
  hardHtmlDoc,
  mediumExample,
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
        "LCP, INP, and CLS — speed numbers you measure like product bugs.",
        "LCP و INP و CLS — أرقام سرعة تقيسها زي bugs المنتج.",
      ),
      paragraphs: [
        L(
          "Core Web Vitals are real-user speed numbers, not SEO tricks: `LCP` (largest contentful paint), `INP` (interaction to next paint), and `CLS` (cumulative layout shift). If they get worse, treat it like a product bug.",
          "Core Web Vitals أرقام سرعة من ناس حقيقية، مش حيل SEO: `LCP` و `INP` و `CLS`. لو بقوا أسوأ، عاملهم زي bug في المنتج.",
        ),
        L(
          "`LCP` is often a big hero `<img>` or a large heading. Give it width and height. Don’t use `loading=\"lazy\"` on that first-screen image. Use `fetchpriority=\"high\"` or preload when you know the URL.",
          "`LCP` غالبًا صورة hero كبيرة أو عنوان كبير. حط `width` و `height`. متستخدمش `loading=\"lazy\"` على صورة أول الشاشة. استخدم `fetchpriority=\"high\"` أو preload لما تعرف الـ URL.",
        ),
        L(
          "`INP` is how fast the page reacts after a tap or click. Keep click handlers small. Split long JavaScript work. Delay extra JS so the main thread stays free.",
          "`INP` هو سرعة رد الصفحة بعد ضغطة. خلّي كود الضغطة صغير. قطّع شغل JavaScript الطويل. أخّر JS الزيادة عشان الـ main thread يفضل فاضي.",
        ),
        L(
          "`CLS` jumps when images have no size, ads load late, or fonts change text size. Reserve space with `width`/`height` or CSS `aspect-ratio`. Don’t shove banners above content that is already on screen.",
          "`CLS` بيحصل لما الصور من غير مقاس، أو الإعلان يجي متأخر، أو الخط يغيّر حجم النص. احجز مساحة بـ `width`/`height` أو `aspect-ratio`. متزقش بنرات فوق محتوى ظاهر.",
        ),
        L(
          "Measure with CrUX / Search Console (real users) and lab tools (Lighthouse, Web Vitals). More media tips are in Media & Loading Performance.",
          "قِس بـ CrUX / Search Console (ناس حقيقية) وأدوات lab (Lighthouse و Web Vitals). نصائح الميديا الزيادة في درس Media & Loading Performance.",
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Core Web Vitals — INP</title>
  </head>
  <body>
    <main>
      <h1>Fast response</h1>
      <button type="button" id="toggle">Toggle details</button>
      <p id="status" hidden>Details are visible.</p>
    </main>
    <script>
      document.getElementById("toggle").addEventListener("click", () => {
        const status = document.getElementById("status");
        status.hidden = !status.hidden;
      });
    </script>
  </body>
</html>`,
          "Full page: light click handler for INP",
          "صفحة كاملة: handler ضغطة خفيف لـ INP",
        ),
        hardExample(
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
      <p>Content stays put while the ad slot reserves space.</p>
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lazy below fold</title>
  </head>
  <body>
    <main>
      <h1>Gallery</h1>
      <p>Hero loads eagerly above.</p>
      <img
        src="https://placehold.co/640x360/0284c7/fff.jpg?text=Gallery+1"
        alt="Screenshot of the HTML playground"
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
      />
    </main>
  </body>
</html>`,
          "Full page: lazy below-the-fold gallery image",
          "صفحة كاملة: صورة معرض lazy تحت الشاشة",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>Gallery</h1>
  <p>Hero loads eagerly above the fold.</p>
  <img
    src="https://placehold.co/640x360/0284c7/fff.jpg?text=Below+fold"
    alt="Gallery thumbnail from the HTML lesson"
    width="640"
    height="360"
    loading="lazy"
    decoding="async"
  />
  <iframe
    title="Lesson walkthrough embed"
    src="about:blank"
    loading="lazy"
    width="640"
    height="200"
  ></iframe>
</main>`,
            { title: "Below-the-fold media" },
          ),
          "Full page: lazy image + lazy iframe with dimensions",
          "صفحة كاملة: صورة و iframe متأخرين بمقاسات",
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
        "Think in page parts — header, main, footer — before you add many `<div>`s.",
        "فكّر بأجزاء الصفحة — header و main و footer — قبل ما تكتر `<div>`.",
      ),
      paragraphs: [
        L(
          "Keep one `<main>` per page. Put header, nav, and footer in their own tags. That split makes `<main>` easy to scan and gives screen readers places to jump.",
          "خلّي `<main>` واحد في الصفحة. حط header و nav و footer في وسومهم. الفصل ده بيخلّي `<main>` سهل يتتصفح وبيدي قارئ الشاشة أماكن يقفز ليها.",
        ),
        L(
          "Landmarks are only half the structure. Headings need a real order too. One `<h1>` per page, then `<h2>` / `<h3>` by the real outline — not by the font size you want.",
          "الـ landmarks نص الهيكل بس. العناوين كمان محتاجة ترتيب حقيقي. `<h1>` واحد لكل صفحة، وبعدين `<h2>` / `<h3>` حسب الـ outline الحقيقي — مش حسب حجم الخط اللي عايزه.",
        ),
        L(
          "In React or other components, the same rules apply. The finished page still needs one `<main>`, honest landmarks, and correct heading ranks — even if the markup lives in many files.",
          "في React أو مكونات تانية، نفس القواعد. الصفحة النهائية لسه محتاجة `<main>` واحد و landmarks صادقة وترتيب عناوين صح — حتى لو الـ markup في ملفات كتير.",
        ),
        L(
          "Prefer HTML from the server for the main content. JavaScript should add extra interaction to a page that already works — not build the whole page from an empty box.",
          "فضّل HTML من السيرفر للمحتوى الأساسي. JavaScript يزوّد تفاعل على صفحة شغالة أصلًا — مش يبني الصفحة كلها من صندوق فاضي.",
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
        mediumExample(
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
      <nav aria-label="Primary">
        <a href="/">Home</a>
        <a href="/html">HTML</a>
      </nav>
    </header>
    <main id="content">
      <h1>Main content</h1>
    </main>
    <footer>
      <p>© FrontendCraft</p>
    </footer>
  </body>
</html>`,
          "Full page: landmarks + labeled primary nav",
          "صفحة كاملة: landmarks + nav أساسي مسمّى",
        ),
        hardExample(
          hardHtmlDoc(
            `<a href="#content">Skip to main content</a>
<header>
  <p>Learning hub</p>
  <nav aria-label="Labs">
    <a href="/html">HTML</a>
    <a href="/css">CSS</a>
  </nav>
</header>
<main id="content">
  <article>
    <h1>Document architecture</h1>
    <section aria-labelledby="tips-heading">
      <h2 id="tips-heading">Landmark tips</h2>
      <p>One <code>&lt;main&gt;</code>, labeled <code>&lt;nav&gt;</code>, and a skip link.</p>
    </section>
  </article>
</main>
<footer>
  <p><small>© 2026 Learning hub</small></p>
</footer>`,
            { title: "Document architecture" },
          ),
          "Full page: skip link, landmarks, article, and footer",
          "صفحة كاملة: skip link و landmarks و article و footer",
        ),
      ],
      visualHint: L(
        "Landmarks assemble step by step — tree, page preview, and screen-reader roles stay in sync.",
        "الـ landmarks بتتجمّع خطوة بخطوة — الشجرة ومعاينة الصفحة وأدوار قارئ الشاشة مع بعض.",
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
        "Safe HTML at the edges: new tabs, embeds, forms, and data in the browser.",
        "HTML آمن على الحدود: تاب جديدة، embeds، forms، وبيانات جوّه المتصفح.",
      ),
      paragraphs: [
        L(
          "HTML sits at the edge of your app. Every URL, iframe, and form field decides what another site or server can see. Review that before you style the page.",
          "HTML بيقعد على طرف التطبيق. كل URL و iframe وحقل فورم بيحدد إيه اللي موقع أو سيرفر تاني يقدر يشوفه. راجع كده قبل ما تظبط الستايل.",
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Embedded widget</title>
  </head>
  <body>
    <main>
      <h1>Weather widget</h1>
      <iframe
        title="Live weather forecast"
        src="https://widgets.example.net/weather"
        sandbox="allow-scripts"
        referrerpolicy="no-referrer"
        width="320"
        height="240"
      ></iframe>
    </main>
  </body>
</html>`,
          "Full page: sandboxed third-party iframe",
          "صفحة كاملة: iframe طرف ثالث داخل sandbox",
        ),
        hardExample(
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
        "Prefetch and prerender so the next click feels fast — but not on unsafe URLs.",
        "Prefetch و prerender عشان الضغطة الجاية تحس سريعة — بس مش على URLs مش آمنة.",
      ),
      paragraphs: [
        L(
          "The Speculation Rules API lets the page hint at likely next pages with `<script type=\"speculationrules\">`. It sits on top of normal `<a href>` links. Browsers that do not support it ignore it — every URL must still work on a normal visit.",
          "Speculation Rules API بتخلي الصفحة تلمّح للصفحات الجاية المحتملة بـ `<script type=\"speculationrules\">`. ده طبقة فوق لينكات `<a href>` العادية. المتصفح اللي مش بيدعمها بيتجاهلها — كل URL لازم يفضل شغال في زيارة عادية.",
        ),
        L(
          "`prefetch` downloads the next page early, then the click still paints as usual. `prerender` goes further — the browser loads and draws the page in the background so the click feels instant. Prerender uses more CPU, memory, and data.",
          "`prefetch` بينزّل الصفحة الجاية بدري، والضغطة لسه بترسم عادي. `prerender` أعمق — المتصفح بيحمّل ويرسم الصفحة في الخلفية عشان الضغطة تحس فورية. Prerender بيستخدم CPU و memory وبيانات أكتر.",
        ),
        L(
          "Keep rules same-origin unless you tested cross-origin. Start with a short list of safe, read-only pages — a product page or the next lesson — not every link.",
          "خلّي القواعد same-origin إلا لو اختبرت cross-origin. ابدأ بقائمة قصيرة من صفحات آمنة للقراءة — صفحة منتج أو الدرس الجاي — مش كل لينك.",
        ),
        L(
          "Never prerender logout, checkout, delete, or any URL that changes data or burns a one-time token. A prerender can run page code before the user really navigates. Keep dangerous actions behind a real click.",
          "متعملش prerender لـ logout أو checkout أو delete أو أي URL بيغيّر بيانات أو بيحرق token لمرة واحدة. الـ prerender ممكن يشغّل كود الصفحة قبل ما المستخدم يتنقل فعلًا. خلّي الأفعال الخطرة ورا ضغطة حقيقية.",
        ),
        L(
          "Measure the next page’s speed, not only a prettier waterfall. A good prerender can improve the next `LCP`, but too much speculation fights the current page and wastes data. Watch Core Web Vitals before you add more rules.",
          "قِس سرعة الصفحة الجاية، مش waterfall أحلى بس. prerender مستهدف بيحسّن `LCP` الجاي، لكن speculation زيادة بيحارب الصفحة الحالية وبيضيع بيانات. راقب Core Web Vitals قبل ما تزود القواعد.",
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lesson hub</title>
    <script type="speculationrules">
      {
        "prefetch": [
          { "urls": ["/html/forms"] }
        ]
      }
    </script>
  </head>
  <body>
    <main>
      <h1>Next up</h1>
      <a href="/html/forms">Forms lesson</a>
      <a href="/logout">Sign out</a>
      <!-- Only prefetch read-only, same-origin lesson links. -->
    </main>
  </body>
</html>`,
          "Full page: targeted prefetch for one lesson link",
          "صفحة كاملة: prefetch مستهدف لدرس واحد",
        ),
        hardExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lesson hub</title>
    <script type="speculationrules">
      {
        "prerender": [
          {
            "urls": ["/html/forms"],
            "eagerness": "moderate"
          }
        ]
      }
    </script>
  </head>
  <body>
    <main>
      <h1>Next lesson</h1>
      <a href="/html/forms">HTML forms</a>
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
        "Bilingual and RTL-ready pages — `lang`, `dir`, mixed Arabic/English, and forms that stay readable.",
        "صفحات ثنائية اللغة وجاهزة لـ RTL — `lang` و `dir` وعربي/إنجليزي مخلوط، و forms تفضل مقروءة.",
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
    <title>RTL demo — هيكل المستند</title>
  </head>
  <body>
    <main>
      <h1>هيكل المستند</h1>
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RTL demo — Sign in</title>
  </head>
  <body>
    <main>
      <h1>تسجيل الدخول</h1>
      <form>
        <label>
          البريد الإلكتروني
          <input
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            dir="ltr"
            required
          />
        </label>
        <button type="submit">متابعة</button>
      </form>
    </main>
  </body>
</html>`,
          "RTL page with Arabic label and LTR email field",
          "صفحة RTL بـ label عربي وحقل إيميل LTR",
        ),
        hardExample(
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document</title>
  </head>
  <body>
    <main>
      <h1>Hello</h1>
      <p>Landmarks added — still room to fix semantics on the cards.</p>
    </main>
  </body>
</html>`,
          "Document with main landmark, no nav yet",
          "مستند فيه main landmark، من غير nav لسه",
        ),
        hardExample(
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
        <a href="/html">HTML lab</a>
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
    id: "html-pro-apis",
    order: 25,
    slug: "html-browser-apis",
    tier: "pro",
    readMinutes: 9,
    icon: "Cpu",
    visualizer: "baseline-compat",
    content: {
      title: L("HTML & browser APIs", "HTML و APIs المتصفح"),
      summary: L(
        "Geolocation, Drag and Drop, and Web Storage — browser features you call from JavaScript with HTML hooks.",
        "Geolocation و Drag and Drop و Web Storage — مميزات متصفح بتناديها من JavaScript مع hooks من HTML.",
      ),
      paragraphs: [
        L(
          "These are **browser APIs**, not new HTML tags. Your HTML still provides the buttons, drop zones, and forms — JavaScript asks the browser for location, drag events, or saved data.",
          "دول **browser APIs**، مش tags HTML جديدة. الـ HTML لسه بيدي الأزرار ومناطق السحب والفورم — و JavaScript بيطلب من المتصفح الموقع أو أحداث السحب أو بيانات محفوظة.",
        ),
        L(
          "**Geolocation** (`navigator.geolocation`): ask the user for their location (with permission). Always explain why you need it, handle “denied”, and never assume GPS works offline or indoors.",
          "**Geolocation** (`navigator.geolocation`): اطلب موقع المستخدم (بإذن). دايمًا وضّح ليه محتاجه، تعامل مع الرفض، ومتفترضش إن GPS شغال offline أو جوّه المباني.",
        ),
        L(
          "**Drag and Drop**: mark something `draggable=\"true\"`, listen for `dragstart` / `drop`, and use `dataTransfer`. Pair with keyboard alternatives — not everyone can drag with a mouse.",
          "**Drag and Drop**: خلّي العنصر `draggable=\"true\"`، اسمع `dragstart` / `drop`، واستخدم `dataTransfer`. وفّر بديل كيبورد — مش كل الناس تقدر تسحب بالماوس.",
        ),
        L(
          "**Web Storage**: `localStorage` keeps data until cleared; `sessionStorage` lasts for the tab session. Store small strings only (stringify objects). Don’t put secrets or passwords here — storage is readable by any script on your origin.",
          "**Web Storage**: `localStorage` بيفضل لحد ما يتمسح؛ `sessionStorage` لمدة جلسة التاب. خزّن نصوص صغيرة بس (stringify للـ objects). متخزنش أسرار أو كلمات مرور — أي سكربت على نفس الـ origin يقدر يقراها.",
        ),
      ],
      keyPoints: [
        L("Geolocation needs user permission — always handle deny", "Geolocation محتاج إذن — دايمًا تعامل مع الرفض"),
        L("`draggable=\"true\"` + drop events · add a keyboard path", "`draggable=\"true\"` + أحداث drop · وفّر مسار كيبورد"),
        L("`localStorage` persists · `sessionStorage` is per tab", "`localStorage` بيفضل · `sessionStorage` لكل تاب"),
        L("Never store secrets in Web Storage", "متخزنش أسرار في Web Storage"),
      ],
      examples: [
        simpleExample(
          `<button type="button" id="locate">Share my city</button>
<p id="status" role="status"></p>

<script>
  document.getElementById("locate").onclick = () => {
    if (!navigator.geolocation) {
      status.textContent = "Geolocation not supported";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        status.textContent =
          "Lat " + pos.coords.latitude.toFixed(2) +
          ", Lng " + pos.coords.longitude.toFixed(2);
      },
      () => { status.textContent = "Permission denied or unavailable"; }
    );
  };
</script>`,
          "Ask for location with a clear button + status text",
          "اطلب الموقع بزر واضح + نص حالة",
        ),
        mediumExample(
          `<div id="bin" class="dropzone">Drop files or text here</div>
<p id="item" draggable="true">Drag me</p>

<script>
  const item = document.getElementById("item");
  const bin = document.getElementById("bin");

  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.id);
  });

  bin.addEventListener("dragover", (e) => e.preventDefault());
  bin.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    bin.append(document.getElementById(id));
  });
</script>`,
          "Minimal drag-and-drop with draggable + drop zone",
          "سحب وإفلات بسيط بـ draggable + منطقة drop",
        ),
        hardExample(
          `<label for="note">Quick note</label>
<textarea id="note" rows="3"></textarea>
<button type="button" id="save">Save</button>
<button type="button" id="load">Load</button>

<script>
  const note = document.getElementById("note");
  const KEY = "draft-note";

  document.getElementById("save").onclick = () => {
    localStorage.setItem(KEY, note.value);
  };
  document.getElementById("load").onclick = () => {
    note.value = localStorage.getItem(KEY) || "";
  };
  // Auto-restore on visit
  note.value = localStorage.getItem(KEY) || "";
</script>`,
          "Save a draft with localStorage",
          "احفظ مسودة بـ localStorage",
        ),
      ],
      visualHint: L(
        "Permission → location · drag → drop · save → reload storage.",
        "إذن → موقع · سحب → إفلات · حفظ → إعادة تحميل التخزين.",
      ),
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
        mediumExample(
          `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Form demo</title>
  </head>
  <body>
    <main>
      <h1>Subscribe</h1>
      <form>
        <label>
          Email
          <input name="email" type="email" autocomplete="email" required />
        </label>
        <button type="submit">Join</button>
      </form>
    </main>
  </body>
</html>`,
          "Full page with a labeled email form",
          "صفحة كاملة بفورم إيميل بـ label",
        ),
        hardExample(
          hardHtmlDoc(
            `<main>
  <h1>HTML cheatsheet</h1>
  <p>Semantic landmarks you reach for on most pages.</p>
  <dl>
    <dt><code>&lt;main&gt;</code></dt>
    <dd>Primary page content — one per document.</dd>
    <dt><code>&lt;nav&gt;</code></dt>
    <dd>Major navigation links.</dd>
    <dt><code>&lt;section&gt;</code></dt>
    <dd>Thematic grouping with a heading.</dd>
    <dt><code>&lt;article&gt;</code></dt>
    <dd>Self-contained content such as a post or card.</dd>
    <dt><code>&lt;aside&gt;</code></dt>
    <dd>Related content tangential to the main flow.</dd>
  </dl>
</main>`,
            { title: "HTML cheatsheet" },
          ),
          "Full page: semantic landmarks reference",
          "صفحة كاملة: مرجع معالم semantic",
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
