import type { LabDefinition, LabId } from "@/lib/types";
import { javascriptMeta } from "@/content/labs/javascript/meta";
import { lessons as javascriptLessons } from "@/content/labs/javascript/lessons";
import { htmlMeta } from "@/content/labs/html/meta";
import { lessons as htmlLessons } from "@/content/labs/html/lessons";
import { cssMeta } from "@/content/labs/css/meta";
import { lessons as cssLessons } from "@/content/labs/css/lessons";
import { tailwindMeta } from "@/content/labs/tailwind/meta";
import { lessons as tailwindLessons } from "@/content/labs/tailwind/lessons";
import { reactMeta } from "@/content/labs/react/meta";
import { lessons as reactLessons } from "@/content/labs/react/lessons";
import { accessibilityMeta } from "@/content/labs/accessibility/meta";
import { lessons as accessibilityLessons } from "@/content/labs/accessibility/lessons";
import { seoMeta } from "@/content/labs/seo/meta";
import { lessons as seoLessons } from "@/content/labs/seo/lessons";

export const labs: LabDefinition[] = [
  { ...javascriptMeta, lessons: javascriptLessons },
  { ...htmlMeta, lessons: htmlLessons },
  { ...cssMeta, lessons: cssLessons },
  { ...tailwindMeta, lessons: tailwindLessons },
  { ...reactMeta, lessons: reactLessons },
  { ...accessibilityMeta, lessons: accessibilityLessons },
  { ...seoMeta, lessons: seoLessons },
].sort((a, b) => a.order - b.order);

export const labIds = labs.map((lab) => lab.id);

export function isLabId(value: string): value is LabId {
  return labIds.includes(value as LabId);
}

export function getLab(id: LabId): LabDefinition {
  const lab = labs.find((item) => item.id === id);
  if (!lab) {
    throw new Error(`Unknown lab: ${id}`);
  }
  return lab;
}

export function getAvailableLabs(): LabDefinition[] {
  return labs.filter((lab) => lab.status === "available");
}
