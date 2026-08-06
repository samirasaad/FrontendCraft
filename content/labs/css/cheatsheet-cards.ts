import { cheatCard, L } from "@/content/helpers";
import type { CheatCard } from "@/lib/types";

export const cssCheatCards: CheatCard[] = [
  cheatCard(
    L("Flex row", "صف `Flex`"),
    `.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}`,
    L("One-dimensional alignment for toolbars and card rows.", "محاذاة أحادية البعد لأشرطة الأدوات وصفوف الكروت."),
    {
      id: "display-flex",
      category: "structure",
      previewHtml: `<div style="display:flex;gap:8px;align-items:center"><span style="background:#38bdf8;padding:6px 10px;border-radius:8px;color:#020617">A</span><span style="background:#fde047;padding:6px 10px;border-radius:8px;color:#020617">B</span></div>`,
    },
  ),
  cheatCard(
    L("Simple grid", "`Grid` بسيط"),
    `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}`,
    L("Two equal columns with a gap.", "عمودين متساويين مع `gap`."),
    { id: "display-grid", category: "structure" },
  ),
  cheatCard(
    L("border-box", "`border-box`"),
    `*, *::before, *::after {
  box-sizing: border-box;
}`,
    L("Padding and border count inside width.", "الـ `padding` والـ `border` جوه الـ `width`."),
    { id: "box-border", category: "structure" },
  ),
  cheatCard(
    L("Fluid type", "خط سائل"),
    `h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}`,
    L("Type that scales between min and max.", "خط بيكبر بين حد أدنى وأقصى بـ `clamp()`."),
    { id: "clamp-type", category: "media" },
  ),
  cheatCard(
    L("Custom property", "`Custom property`"),
    `:root {
  --accent: #38bdf8;
}
.btn {
  background: var(--accent);
}`,
    L("Theme tokens on :root, reuse everywhere.", "`Theme tokens` على `:root` وتستخدمها في كل حتة."),
    { id: "custom-prop", category: "head" },
  ),
  cheatCard(
    L("Breakpoint", "`Breakpoint`"),
    `@media (min-width: 768px) {
  .sidebar { display: block; }
}`,
    L("Enhance layout from a width up.", "حسّن الـ `layout` من عرض معيّن."),
    { id: "media-md", category: "media" },
  ),
  cheatCard(
    L("Logical margin", "`Margin` منطقي"),
    `.card {
  margin-inline-start: 1rem;
  padding-block: 1rem;
}`,
    L("Follows writing direction automatically.", "بيتبع اتجاه الكتابة لوحده."),
    { id: "logical-margin", category: "structure" },
  ),
  cheatCard(
    L("Hover transition", "`Transition` عند الـ `hover`"),
    `.btn {
  transition: background 160ms ease, transform 160ms ease;
}
.btn:hover {
  transform: translateY(-1px);
}`,
    L("Animate only what changes — keep it short.", "حرّك اللي بيتغيّر بس — وقصّر المدة."),
    { id: "transition-hover", category: "interactive" },
  ),
];
