import { notFound } from "next/navigation";
import { Dashboard } from "@/components/layout/Dashboard";
import { getLab, isLabId, labIds } from "@/content/labs";

export function generateStaticParams() {
  return labIds.map((lab) => ({ lab }));
}

export default async function LabLearnPage({
  params,
}: {
  params: Promise<{ lab: string }>;
}) {
  const { lab: labParam } = await params;
  if (!isLabId(labParam)) notFound();

  const lab = getLab(labParam);
  return <Dashboard lab={lab} />;
}
