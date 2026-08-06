import { notFound } from "next/navigation";
import { CurriculumToc } from "@/components/layout/CurriculumToc";
import { getLab, isLabId, labIds } from "@/content/labs";

export function generateStaticParams() {
  return labIds.map((lab) => ({ lab }));
}

export default async function LabCurriculumPage({
  params,
}: {
  params: Promise<{ lab: string }>;
}) {
  const { lab: labParam } = await params;
  if (!isLabId(labParam)) notFound();

  const lab = getLab(labParam);
  return <CurriculumToc lab={lab} />;
}
