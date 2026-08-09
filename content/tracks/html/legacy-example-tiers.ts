import { mediumExample } from "@/content/helpers";
import type { CodeExample } from "@/lib/types";

/** Medium-tier playground scenarios for HTML legacy lessons (between simple and hard). */
export const htmlMediumExamples: Record<string, CodeExample> = {
  "document-anatomy": mediumExample(
    `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Lesson 1</h1>
    <p>Charset and viewport are set — body copy scales on phones.</p>
  </body>
</html>`,
    "Complete head with charset + viewport on an RTL page",
    "head مكتمل مع charset و viewport على صفحة RTL",
  ),
  "semantic-structure": mediumExample(
    `<header>
  <p>FrontendCraft</p>
</header>
<main>
  <section>
    <h1>HTML basics</h1>
    <p>One main region with a titled section inside.</p>
  </section>
</main>
<footer><small>© 2026</small></footer>`,
    "Header, main with section, footer — no nav yet",
    "header و main فيه section و footer — من غير nav لسه",
  ),
  "text-headings": mediumExample(
    `<article>
  <h1>Course overview</h1>
  <h2>Week 1</h2>
  <h3>Document anatomy</h3>
  <p>Headings step down one level at a time.</p>
</article>`,
    "h1 → h2 → h3 outline without skipping levels",
    "outline من h1 لـ h3 من غير قفز مستويات",
  ),
  "text-formatting": mediumExample(
    `<p>
  Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save.
  Version <del>1.4</del> <ins>1.5</ins> ships today.
</p>
<p>Published <time datetime="2026-08-06">Aug 6, 2026</time>.</p>`,
    "Keyboard shortcut, revision markup, and machine-readable date",
    "اختصار كيبورد ومراجعة نص وتاريخ مقروء للآلة",
  ),
  "links-images": mediumExample(
    `<p>
  Read the
  <a href="/html/lists">lists lesson</a>
  or email
  <a href="mailto:hello@example.com">hello@example.com</a>.
</p>`,
    "Internal lesson link + mailto contact",
    "لينك درس داخلي + mailto للتواصل",
  ),
  lists: mediumExample(
    `<h2>Shopping list</h2>
<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Eggs</li>
</ul>`,
    "Unordered grocery list under a heading",
    "قائمة مشتريات غير مرتبة تحت عنوان",
  ),
  "forms-inputs": mediumExample(
    `<form>
  <label>
    Username
    <input name="username" autocomplete="username" required />
  </label>
  <label>
    <input type="checkbox" name="terms" required />
    I agree to the terms
  </label>
  <button type="submit">Create account</button>
</form>`,
    "Text field + checkbox agreement before submit",
    "حقل نص + checkbox موافقة قبل الإرسال",
  ),
  tables: mediumExample(
    `<table>
  <thead>
    <tr>
      <th scope="col">Lesson</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Semantic HTML</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>Forms</td>
      <td>In progress</td>
    </tr>
  </tbody>
</table>`,
    "Data table with column headers (no caption yet)",
    "جدول بيانات برؤوس أعمدة (من غير caption لسه)",
  ),
  "accessibility-basics": mediumExample(
    `<a href="#content">Skip to main content</a>
<main id="content">
  <h1>Contact</h1>
  <label>
    Email
    <input name="email" type="email" autocomplete="email" required />
  </label>
</main>`,
    "Skip link + labeled form control",
    "رابط تخطي + حقل فورم بـ label",
  ),
  "meta-seo": mediumExample(
    `<head>
  <title>Learn HTML — FrontendCraft</title>
  <meta name="description" content="Bilingual HTML lessons with live sandboxes." />
</head>
<body>
  <main>
    <h1>HTML curriculum</h1>
    <p>Ship meaningful titles and descriptions per route.</p>
  </main>
</body>`,
    "Unique title + meta description aligned with visible h1",
    "title فريد + meta description متوافق مع h1 الظاهر",
  ),
  "media-embed": mediumExample(
    `<figure>
  <img
    src="https://placehold.co/640x360/0f172a/38bdf8.jpg?text=Lesson+poster"
    alt="Video poster frame for an HTML media lesson"
    width="640"
    height="360"
  />
  <figcaption>Poster image with descriptive alt text</figcaption>
</figure>`,
    "Poster image with descriptive alt + figcaption",
    "صورة poster بـ alt وصفي + figcaption",
  ),
};
