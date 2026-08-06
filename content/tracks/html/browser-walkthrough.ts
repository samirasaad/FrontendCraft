import { L } from "@/content/helpers";
import type { BrowserWalkthrough } from "@/lib/types";

const liveIntro = L(
  "Open the Live tab, run the example, then follow these DevTools steps.",
  "افتح تبويب Live، شغّل المثال، وبعدين اتبع خطوات DevTools دي.",
);

export const htmlBrowserWalkthrough: Record<string, BrowserWalkthrough> = {
  "document-anatomy": {
    intro: liveIntro,
    steps: [
      {
        title: L("Open DevTools", "افتح DevTools"),
        detail: L(
          "Press F12 (Windows/Linux) or Cmd+Option+I (Mac). Or right-click the preview → Inspect.",
          "اضغط F12 (Windows/Linux) أو Cmd+Option+I (Mac). أو كليك يمين على المعاينة → Inspect.",
        ),
      },
      {
        title: L("Elements — document shell", "Elements — هيكل المستند"),
        detail: L(
          "In Elements, expand <html> → <head> and <body>. Confirm <!DOCTYPE html>, <meta charset>, and lang on <html>.",
          "في Elements، وسّع <html> → <head> و <body>. تأكد من <!DOCTYPE html> و <meta charset> و lang على <html>.",
        ),
      },
      {
        title: L("Console — no load errors", "Console — مفيش أخطاء تحميل"),
        detail: L(
          "Open the Console tab. Reload the preview. You should see no red errors for a valid shell.",
          "افتح تبويب Console. اعمل Reload للمعاينة. المفروض مفيش أخطاء حمراء لـ shell صحيح.",
        ),
      },
      {
        title: L("Network — first document", "Network — أول مستند"),
        detail: L(
          "Open Network, reload once, and click the first row (type document). Status should be 200.",
          "افتح Network، اعمل reload مرة، واضغط على أول صف (type document). الحالة المفروض 200.",
        ),
      },
    ],
  },

  "semantic-structure": {
    intro: liveIntro,
    steps: [
      {
        title: L("Inspect landmarks", "افحص الـ landmarks"),
        detail: L(
          "In Elements, find <header>, <nav>, <main>, <footer>. Click each tag and read its role in the Accessibility pane.",
          "في Elements، دور على <header> و <nav> و <main> و <footer>. اضغط على كل tag واقرأ الـ role في لوحة Accessibility.",
        ),
      },
      {
        title: L("Accessibility tree", "شجرة Accessibility"),
        detail: L(
          "Open the Accessibility tab (Chrome: Elements → right sidebar → Accessibility). You should see banner, navigation, main, contentinfo.",
          "افتح تبويب Accessibility (Chrome: Elements → الشريط الجانبي → Accessibility). المفروض تشوف banner و navigation و main و contentinfo.",
        ),
      },
      {
        title: L("Compare with div soup", "قارن مع div soup"),
        detail: L(
          "Temporarily change <nav> to <div class=\"nav\"> in Live, run again, and watch the landmark disappear in Accessibility.",
          "غيّر مؤقتًا <nav> لـ <div class=\"nav\"> في Live، شغّل تاني، وشوف الـ landmark يختفي في Accessibility.",
        ),
      },
    ],
  },

  "text-headings": {
    intro: liveIntro,
    steps: [
      {
        title: L("Heading outline in Elements", "مخطط العناوين في Elements"),
        detail: L(
          "Expand the example in Elements. Check that h1–h6 appear in logical order under <main> or <body>.",
          "وسّع المثال في Elements. تأكد إن h1–h6 بالترتيب المنطقي تحت <main> أو <body>.",
        ),
      },
      {
        title: L("Computed styles", "Computed styles"),
        detail: L(
          "Select an h3, open Computed, and note font-size comes from CSS — not from skipping heading levels.",
          "اختار h3، افتح Computed، ولاحظ إن font-size جاي من CSS — مش من تخطي مستويات العناوين.",
        ),
      },
      {
        title: L("Screen reader heading list", "قائمة العناوين لقارئ الشاشة"),
        detail: L(
          "In Chrome Accessibility, expand the heading list (or use NVDA H key on a deployed page) to see the outline.",
          "في Chrome Accessibility، وسّع قائمة العناوين (أو استخدم مفتاح H في NVDA على صفحة منشورة) عشان تشوف الـ outline.",
        ),
      },
    ],
  },

  "text-formatting": {
    intro: liveIntro,
    steps: [
      {
        title: L("Select inline tags", "اختار وسوم inline"),
        detail: L(
          "In Elements, click <strong>, <em>, and <code> inside a paragraph. Each stays inside one <p> block box.",
          "في Elements، اضغط على <strong> و <em> و <code> جوه فقرة. كل واحد لسه جوه block box واحد <p>.",
        ),
      },
      {
        title: L("abbr expansion", "توسيع abbr"),
        detail: L(
          "Hover <abbr title=\"...\"> in the preview. In Elements, confirm the title attribute matches the expansion.",
          "مرّر على <abbr title=\"...\"> في المعاينة. في Elements، تأكد إن title attribute يطابق التوسيع.",
        ),
      },
      {
        title: L("Console — no false links", "Console — مفيش links وهمية"),
        detail: L(
          "Avoid styling plain text like links. Inspect <u> or underlined spans — they should not be <a> unless they navigate.",
          "تجنب تنسيق نص عادي كـ link. افحص <u> أو spans متخططة — مايبقوش <a> إلا لو بيودّوا لمكان.",
        ),
      },
    ],
  },

  "links-images": {
    intro: liveIntro,
    steps: [
      {
        title: L("Link panel", "لوحة اللينك"),
        detail: L(
          "Select an <a> in Elements. In the Styles or Properties panel, read href and rel on external links.",
          "اختار <a> في Elements. في Styles أو Properties، اقرأ href و rel على اللينكات الخارجية.",
        ),
      },
      {
        title: L("Image dimensions", "أبعاد الصورة"),
        detail: L(
          "Click <img> and check width/height attributes in Elements. In Computed, confirm layout space is reserved before the image loads.",
          "اضغط <img> واتأكد من width/height في Elements. في Computed، تأكد إن المساحة محجوزة قبل ما الصورة تحمّل.",
        ),
      },
      {
        title: L("Network — image request", "Network — طلب الصورة"),
        detail: L(
          "Reload with Network open. Filter Img, click the image row, and check status, type, and size.",
          "اعمل reload و Network مفتوح. فلتر Img، اضغط صف الصورة، واتأكد من status و type و size.",
        ),
      },
    ],
  },

  "lists": {
    intro: liveIntro,
    steps: [
      {
        title: L("List semantics", "معنى القوائم"),
        detail: L(
          "Select <ul> or <ol> in Elements. In Accessibility, confirm role list and the item count.",
          "اختار <ul> أو <ol> في Elements. في Accessibility، تأكد من role list وعدد العناصر.",
        ),
      },
      {
        title: L("Nested lists", "قوائم متداخلة"),
        detail: L(
          "Expand a nested <ul> inside <li>. Screen readers announce level changes — div-only fakes lose that.",
          "وسّع <ul> متداخل جوه <li>. قارئات الشاشة بتعلن تغيير المستوى — التقليد بـ div بيفقد ده.",
        ),
      },
      {
        title: L("Definition lists", "قوائم التعريف"),
        detail: L(
          "For <dl>, verify each <dt> is followed by <dd> in Elements — parser repairs bad pairs but AT can get confused.",
          "لـ <dl>، تأكد إن كل <dt> متبوع بـ <dd> في Elements — الـ parser بيصلح الأزواج الغلط لكن AT ممكن يتلخبط.",
        ),
      },
    ],
  },

  "forms-inputs": {
    intro: liveIntro,
    steps: [
      {
        title: L("Label association", "ربط الـ label"),
        detail: L(
          "Click an <input> in Elements. Check for <label for=\"id\"> or wrapping label — accessible name should match visible text.",
          "اضغط <input> في Elements. دور على <label for=\"id\"> أو label ملفوف — الاسم الوصولي لازم يطابق النص الظاهر.",
        ),
      },
      {
        title: L("Focus order", "ترتيب الـ focus"),
        detail: L(
          "Tab through the preview. Watch the focused field highlight in Elements as you move — order should match the visual layout.",
          "اعمل Tab في المعاينة. راقب الحقل المتفعّل في Elements وإنت بتتحرك — الترتيب لازم يطابق الشكل.",
        ),
      },
      {
        title: L("Console — validation", "Console — التحقق"),
        detail: L(
          "Submit empty required fields. Browser-native validation bubbles appear — check Console for no JS errors blocking submit.",
          "ابعت فورم فاضي فيه حقول required. رسائل التحقق الافتراضية بتظهر — اتأكد إن Console مفيهاش JS errors تمنع الإرسال.",
        ),
      },
    ],
  },

  "tables": {
    intro: liveIntro,
    steps: [
      {
        title: L("Table structure", "هيكل الجدول"),
        detail: L(
          "In Elements, expand <table> → <thead>, <tbody>, <tr>, <th>, <td>. Headers should use <th scope=\"col|row\">.",
          "في Elements، وسّع <table> → <thead> و <tbody> و <tr> و <th> و <td>. العناوين لازم <th scope=\"col|row\">.",
        ),
      },
      {
        title: L("Accessibility grid", "شبكة Accessibility"),
        detail: L(
          "Select the table in Accessibility — role table with row/column counts. Caption <caption> should name the table.",
          "اختار الجدول في Accessibility — role table مع عدد الصفوف/الأعمدة. <caption> لازم يسمّي الجدول.",
        ),
      },
      {
        title: L("Responsive overflow", "التجاوز على الشاشات الصغيرة"),
        detail: L(
          "Narrow the preview (device toolbar: Ctrl+Shift+M). Wrap tables in overflow-x:auto containers if horizontal scroll appears.",
          "ضيّق المعاينة (device toolbar: Ctrl+Shift+M). لف الجداول في overflow-x:auto لو ظهر scroll أفقي.",
        ),
      },
    ],
  },

  "accessibility-basics": {
    intro: liveIntro,
    steps: [
      {
        title: L("Focus ring", "حلقة الـ focus"),
        detail: L(
          "Tab to links and buttons. In Elements, confirm :focus-visible styles are not removed (no outline: none without a replacement).",
          "اعمل Tab للينكات والأزرار. في Elements، تأكد إن :focus-visible مش متشال (مفيش outline: none من غير بديل).",
        ),
      },
      {
        title: L("Alt text on images", "نص alt على الصور"),
        detail: L(
          "Select informative <img> — alt should describe function. Decorative images use alt=\"\" (ignored in Accessibility tree).",
          "اختار <img> معلوماتية — alt يوصف الوظيفة. الصور الديكور alt=\"\" (متجاهلة في Accessibility tree).",
        ),
      },
      {
        title: L("Color contrast (optional)", "تباين الألوان (اختياري)"),
        detail: L(
          "In Elements, pick text and open the color picker — Chrome shows contrast ratio against the background.",
          "في Elements، اختار نص وافتح color picker — Chrome بيعرض contrast ratio مقابل الخلفية.",
        ),
      },
    ],
  },

  "meta-seo": {
    intro: liveIntro,
    steps: [
      {
        title: L("Head metadata", "بيانات head"),
        detail: L(
          "In Elements, open <head>. Find <title>, <meta name=\"description\">, and <link rel=\"canonical\"> if present.",
          "في Elements، افتح <head>. دور على <title> و <meta name=\"description\"> و <link rel=\"canonical\"> لو موجود.",
        ),
      },
      {
        title: L("View page source", "عرض مصدر الصفحة"),
        detail: L(
          "Right-click preview → View frame source (or Ctrl+U on a deployed URL). Crawlers read this HTML first — not JS-only shells.",
          "كليك يمين على المعاينة → View frame source (أو Ctrl+U على URL منشور). الزواحف بتقرأ HTML ده أولًا — مش shells JS بس.",
        ),
      },
      {
        title: L("Network — document headers", "Network — headers المستند"),
        detail: L(
          "Reload with Network open, click the document request, and read Response Headers (status, content-type, cache).",
          "اعمل reload و Network مفتوح، اضغط طلب document، واقرأ Response Headers (status, content-type, cache).",
        ),
      },
    ],
  },

  "media-embed": {
    intro: liveIntro,
    steps: [
      {
        title: L("Media elements", "عناصر الميديا"),
        detail: L(
          "Select <video> or <audio> in Elements. Check controls, src/source children, and poster on video.",
          "اختار <video> أو <audio> في Elements. اتأكد من controls و src/source children و poster على الفيديو.",
        ),
      },
      {
        title: L("Network — media files", "Network — ملفات الميديا"),
        detail: L(
          "Play the media, filter Media in Network, and confirm the file loads (200) and reasonable size.",
          "شغّل الميديا، فلتر Media في Network، وتأكد إن الملف اتحمّل (200) بحجم معقول.",
        ),
      },
      {
        title: L("Console — autoplay policy", "Console — سياسة autoplay"),
        detail: L(
          "If autoplay fails, Console often logs a autoplay policy message — muted autoplay is usually allowed.",
          "لو autoplay فشل، Console غالبًا بيسجّل رسالة autoplay policy — autoplay muted عادة مسموح.",
        ),
      },
    ],
  },

  "form-ux-attributes": {
    intro: liveIntro,
    steps: [
      {
        title: L("Inspect form controls", "افحص عناصر الفورم"),
        detail: L(
          "Select an input in Elements. Check type, inputmode, autocomplete, and pattern in the attributes panel.",
          "اختار input في Elements. راجع type و inputmode و autocomplete و pattern في لوحة الـ attributes.",
        ),
      },
      {
        title: L("Test mobile keyboard hint", "جرّب تلميح كيبورد الموبايل"),
        detail: L(
          "Toggle device toolbar (Ctrl+Shift+M), focus the field, and note which keyboard appears for inputmode.",
          "فعّل device toolbar (Ctrl+Shift+M)، ركّز على الحقل، ولاحظ الكيبورد اللي بيظهر لـ inputmode.",
        ),
      },
      {
        title: L("Submit with invalid pattern", "ابعت بنمط غلط"),
        detail: L(
          "Submit the form with bad data. Browser validation should block submit — check Console for no JS errors masking native messages.",
          "ابعت الفورم ببيانات غلط. التحقق الأصلي لازم يمنع الإرسال — اتأكد إن Console مفيهاش JS errors تخبي الرسائل.",
        ),
      },
    ],
  },

  "details-summary": {
    intro: liveIntro,
    steps: [
      {
        title: L("Open and close details", "افتح واقفل details"),
        detail: L(
          "Click the summary in the preview. In Elements, watch the open attribute toggle on <details>.",
          "اضغط summary في المعاينة. في Elements، راقب open attribute على <details> وهو بيتغير.",
        ),
      },
      {
        title: L("Accessibility state", "حالة Accessibility"),
        detail: L(
          "With details open, check Accessibility — expanded state should sync without custom JavaScript.",
          "والـ details مفتوح، افحص Accessibility — حالة expanded لازم تتزامن من غير JavaScript مخصص.",
        ),
      },
      {
        title: L("Keyboard — Enter/Space", "كيبورد — Enter/Space"),
        detail: L(
          "Tab to summary and press Enter or Space. The panel should toggle — same as a native disclosure widget.",
          "اعمل Tab لـ summary واضغط Enter أو Space. اللوحة لازم تتفتح/تتقفل — زي disclosure أصلي.",
        ),
      },
    ],
  },

  "native-dialog": {
    intro: liveIntro,
    steps: [
      {
        title: L("Open the dialog", "افتح الـ dialog"),
        detail: L(
          "Trigger showModal() from the Live example. <dialog> should appear in Elements with open attribute.",
          "شغّل showModal() من مثال Live. <dialog> لازم يظهر في Elements مع open attribute.",
        ),
      },
      {
        title: L("Top layer and backdrop", "Top layer والـ backdrop"),
        detail: L(
          "In Elements, look for #top-layer or ::backdrop in Styles. The page behind should not receive clicks.",
          "في Elements، دور على #top-layer أو ::backdrop في Styles. الصفحة اللي ورا ما لازمش تستقبل كليكات.",
        ),
      },
      {
        title: L("Escape to close", "Escape للإغلاق"),
        detail: L(
          "Press Escape. Dialog closes and focus should return to the button that opened it.",
          "اضغط Escape. الـ dialog يقفل والـ focus لازم يرجع للزر اللي فتحه.",
        ),
      },
    ],
  },

  "picture-source": {
    intro: liveIntro,
    steps: [
      {
        title: L("picture element tree", "شجرة picture"),
        detail: L(
          "Expand <picture> in Elements — see <source> elements with type or media and the fallback <img>.",
          "وسّع <picture> في Elements — شوف <source> بـ type أو media و <img> الاحتياطي.",
        ),
      },
      {
        title: L("Network — chosen image", "Network — الصورة المختارة"),
        detail: L(
          "Reload with Network open, filter Img. Only the format the browser picks should load (plus fallback if needed).",
          "اعمل reload و Network مفتوح، فلتر Img. بس الصيغة اللي المتصفح اختارها لازم تتحمّل (مع fallback لو محتاج).",
        ),
      },
      {
        title: L("Computed dimensions", "الأبعاد المحسوبة"),
        detail: L(
          "Select the img inside picture. Confirm width/height reserve space to avoid layout shift.",
          "اختار img جوه picture. تأكد إن width/height بيحجزوا مساحة عشان مفيش layout shift.",
        ),
      },
    ],
  },

  "browser-compatibility": {
    intro: liveIntro,
    steps: [
      {
        title: L("Check Baseline in lesson", "راجع Baseline في الدرس"),
        detail: L(
          "Compare the lesson matrix with your target browsers. Note newly vs widely available features.",
          "قارن جدول الدرس مع المتصفحات المستهدفة. لاحظ الميزات newly مقابل widely available.",
        ),
      },
      {
        title: L("Console — unsupported APIs", "Console — APIs غير مدعومة"),
        detail: L(
          "Run the Live example. Unsupported APIs may log errors or silently skip — read Console after load.",
          "شغّل مثال Live. APIs غير المدعومة ممكن تسجّل errors أو تتخطى — اقرأ Console بعد التحميل.",
        ),
      },
      {
        title: L("Feature detection pattern", "نمط feature detection"),
        detail: L(
          "In Sources or Console, try typeof checks (in operator, CSS.supports) before copying snippets into production.",
          "في Sources أو Console، جرّب typeof checks (in operator، CSS.supports) قبل ما تنسخ snippets للإنتاج.",
        ),
      },
    ],
  },

  "head-social-meta": {
    intro: liveIntro,
    steps: [
      {
        title: L("Head — social tags", "Head — وسوم السوشيال"),
        detail: L(
          "In Elements, open <head>. Find og:title, og:image, twitter:card, and theme-color meta tags.",
          "في Elements، افتح <head>. دور على og:title و og:image و twitter:card و theme-color.",
        ),
      },
      {
        title: L("View frame source", "عرض مصدر الإطار"),
        detail: L(
          "Right-click preview → View frame source. Social crawlers read these tags from raw HTML.",
          "كليك يمين على المعاينة → View frame source. زواحف السوشيال بتقرأ الوسوم دي من HTML الخام.",
        ),
      },
      {
        title: L("Validate image URL", "تحقق من رابط الصورة"),
        detail: L(
          "Open og:image URL in a new tab from Elements. Broken images break link previews on Slack and iMessage.",
          "افتح og:image في تاب جديد من Elements. الصور المكسورة بتكسر المعاينة على Slack و iMessage.",
        ),
      },
    ],
  },

  "html-architecture-partials": {
    intro: liveIntro,
    steps: [
      {
        title: L("View composed HTML", "شوف HTML المجمّع"),
        detail: L(
          "Run the Live example. In Elements, see how header/main/footer partials merge into one document tree.",
          "شغّل مثال Live. في Elements، شوف إزاي header/main/footer بيتدمجوا في شجرة مستند واحدة.",
        ),
      },
      {
        title: L("One main landmark", "main landmark واحد"),
        detail: L(
          "Search Elements for <main>. There should be only one per page in the accessibility tree.",
          "دور في Elements على <main>. لازم يكون واحد بس لكل صفحة في accessibility tree.",
        ),
      },
      {
        title: L("Network — partial fetches", "Network — جلب الـ partials"),
        detail: L(
          "If the demo fetches HTML fragments, watch Network for document or fetch requests and their response HTML.",
          "لو الديمو بيجيب fragments، راقب Network لطلبات document أو fetch والـ HTML الراجع.",
        ),
      },
    ],
  },

  "sr-practice": {
    intro: liveIntro,
    steps: [
      {
        title: L("Accessibility tree scan", "مسح accessibility tree"),
        detail: L(
          "Open Accessibility panel. Walk the tree — every interactive control needs a name and correct role.",
          "افتح لوحة Accessibility. امشِ على الشجرة — كل عنصر تفاعلي محتاج اسم و role صح.",
        ),
      },
      {
        title: L("Keyboard-only pass", "جولة كيبورد بس"),
        detail: L(
          "Tab through the preview without a mouse. Focus order should match reading order; no traps in hidden panels.",
          "اعمل Tab في المعاينة من غير ماوس. ترتيب الـ focus لازم يطابق القراءة؛ مفيش فخاخ في panels مخفية.",
        ),
      },
      {
        title: L("Compare bad vs ready cards", "قارن كروت bad و ready"),
        detail: L(
          "Inspect the bad example in Elements, then the ready one — watch how roles and labels change in Accessibility.",
          "افحص المثال الغلط في Elements، وبعدين الصح — راقب إزاي roles والأسماء بتتغير في Accessibility.",
        ),
      },
    ],
  },

  "html-core-web-vitals": {
    intro: liveIntro,
    steps: [
      {
        title: L("Performance panel", "لوحة Performance"),
        detail: L(
          "Open DevTools → Performance. Record a reload and look for LCP, layout shifts, and long tasks.",
          "افتح DevTools → Performance. سجّل reload ودور على LCP و layout shifts و long tasks.",
        ),
      },
      {
        title: L("Lighthouse / Insights", "Lighthouse / Insights"),
        detail: L(
          "Run Lighthouse (or Performance insights) on the preview URL. Note LCP element and CLS sources.",
          "شغّل Lighthouse (أو Performance insights) على المعاينة. لاحظ عنصر LCP ومصادر CLS.",
        ),
      },
      {
        title: L("Network — render-blocking", "Network — حاجبات الرندر"),
        detail: L(
          "Reload with Network. Sort by start time — CSS and fonts in head can block first paint.",
          "اعمل reload و Network. رتّب حسب start time — CSS والخطوط في head ممكن تمنع first paint.",
        ),
      },
    ],
  },

  "html-perf-media": {
    intro: liveIntro,
    steps: [
      {
        title: L("Network — image weight", "Network — حجم الصور"),
        detail: L(
          "Filter Img in Network. Compare file sizes — modern formats (WebP/AVIF) should be smaller than huge PNGs.",
          "فلتر Img في Network. قارن الأحجام — صيغ حديثة (WebP/AVIF) لازم تكون أصغر من PNG ضخم.",
        ),
      },
      {
        title: L("lazy vs eager loading", "lazy مقابل eager"),
        detail: L(
          "Check loading attribute on images in Elements. Hero/LCP images should not be lazy.",
          "راجع loading attribute على الصور في Elements. صور الـ hero/LCP ما تتعملش lazy.",
        ),
      },
      {
        title: L("Layout shift highlight", "إبراز layout shift"),
        detail: L(
          "In Performance or Rendering, enable layout shift regions — unsized images flash when they load.",
          "في Performance أو Rendering، فعّل layout shift regions — صور من غير أبعاد بتعمل ومضة لما تحمّل.",
        ),
      },
    ],
  },

  "html-security-hardening": {
    intro: liveIntro,
    steps: [
      {
        title: L("Inspect external scripts", "افحص scripts خارجية"),
        detail: L(
          "In Elements, find script and link tags. Note crossorigin, integrity (SRI), and defer/async attributes.",
          "في Elements، دور على script و link. لاحظ crossorigin و integrity (SRI) و defer/async.",
        ),
      },
      {
        title: L("Network — third-party", "Network — طرف ثالث"),
        detail: L(
          "Reload and list third-party domains in Network. Unexpected calls may be trackers or leaky embeds.",
          "اعمل reload واعرض دومينات الطرف الثالث في Network. طلبات غير متوقعة ممكن تكون trackers أو embeds.",
        ),
      },
      {
        title: L("Console — mixed content", "Console — mixed content"),
        detail: L(
          "If HTTP assets load on HTTPS page, Console warns about mixed content — fix URLs to https.",
          "لو assets HTTP على صفحة HTTPS، Console بتحذّر من mixed content — صلّح الروابط لـ https.",
        ),
      },
    ],
  },

  "html-speculation-rules": {
    intro: liveIntro,
    steps: [
      {
        title: L("Find speculation rules", "دور على speculation rules"),
        detail: L(
          "In Elements, search for <script type=\"speculationrules\"> or rel=prefetch/prerender hints in head.",
          "في Elements، دور على <script type=\"speculationrules\"> أو rel=prefetch/prerender في head.",
        ),
      },
      {
        title: L("Network — prefetch", "Network — prefetch"),
        detail: L(
          "Hover or navigate links in the demo. Watch Network for prefetch/prerender requests before the click.",
          "مرّر أو تنقّل على اللينكات في الديمو. راقب Network لطلبات prefetch/prerender قبل الكليك.",
        ),
      },
      {
        title: L("Application — speculation", "Application — speculation"),
        detail: L(
          "In Chrome Application → Speculative loads (if available), see queued prerender/prefetch targets.",
          "في Chrome Application → Speculative loads (لو موجود)، شوف أهداف prerender/prefetch في الطابور.",
        ),
      },
    ],
  },

  "html-global-rtl": {
    intro: liveIntro,
    steps: [
      {
        title: L("dir and lang on html", "dir و lang على html"),
        detail: L(
          "Select <html> in Elements. Confirm dir=\"rtl\" or dir=\"ltr\" and lang match the page language.",
          "اختار <html> في Elements. تأكد إن dir=\"rtl\" أو dir=\"ltr\" و lang يطابقوا لغة الصفحة.",
        ),
      },
      {
        title: L("Reading order in DOM", "ترتيب القراءة في DOM"),
        detail: L(
          "Tab through links and paragraphs. Focus order should follow visual reading direction, not source file order only.",
          "اعمل Tab على اللينكات والفقرات. ترتيب الـ focus لازم يتبع اتجاه القراءة، مش ترتيب الملف بس.",
        ),
      },
      {
        title: L("Mixed LTR content", "محتوى LTR مخلوط"),
        detail: L(
          "Inspect English code inside Arabic paragraphs — dir=\"ltr\" or <bdi> wraps should appear in Elements.",
          "افحص كود إنجليزي جوه فقرات عربية — dir=\"ltr\" أو لف <bdi> لازم يظهر في Elements.",
        ),
      },
    ],
  },

  "html-common-pitfalls": {
    intro: liveIntro,
    steps: [
      {
        title: L("Compare wrong vs right", "قارن غلط وصح"),
        detail: L(
          "Run each pitfall card in Live. Inspect both versions in Elements — see what the parser or AT receives.",
          "شغّل كل كارت pitfall في Live. افحص النسختين في Elements — شوف إيه اللي الـ parser أو AT بيستقبله.",
        ),
      },
      {
        title: L("Validator mindset", "عقلية الـ validator"),
        detail: L(
          "Look for repaired DOM (e.g. p inside p) in Elements — the browser fixes HTML silently.",
          "دور على DOM متصلح (مثل p جوه p) في Elements — المتصفح بيصلح HTML في الخفاء.",
        ),
      },
      {
        title: L("Accessibility quick check", "فحص Accessibility سريع"),
        detail: L(
          "For each fix, re-scan Accessibility — names, roles, and heading lists should improve on the green side.",
          "لكل إصلاح، امسح Accessibility تاني — الأسماء والـ roles وقوائم العناوين لازم تتحسن في الجانب الأخضر.",
        ),
      },
    ],
  },

  "html-cheatsheet": {
    intro: L(
      "Pick a cheat card, copy snippet to Live, run it, then verify in DevTools.",
      "اختار كارت، انسخ الـ snippet لـ Live، شغّله، وبعدين اتأكد في DevTools.",
    ),
    steps: [
      {
        title: L("Paste in Live tab", "الصق في تبويب Live"),
        detail: L(
          "Copy a boilerplate from the cheat sheet into the editor and run. Preview should match the card description.",
          "انسخ boilerplate من الـ cheat sheet للمحرر وشغّل. المعاينة لازم تطابق وصف الكارت.",
        ),
      },
      {
        title: L("Elements — structure check", "Elements — فحص الهيكل"),
        detail: L(
          "Expand the pasted markup. Confirm semantic tags, attributes, and no accidental empty landmarks.",
          "وسّع الـ markup الملصوق. تأكد من الوسوم الدلالية والـ attributes ومفيش landmarks فاضية بالغلط.",
        ),
      },
      {
        title: L("Copy one pattern at a time", "انسخ نمط واحد كل مرة"),
        detail: L(
          "Test each snippet alone before combining — easier to spot which tag causes parse or a11y issues.",
          "اختبر كل snippet لوحده قبل الدمج — أسهل تكتشف أي tag سبب مشاكل parse أو a11y.",
        ),
      },
    ],
  },
};
