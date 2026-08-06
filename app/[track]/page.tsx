import { notFound } from "next/navigation";
import { CurriculumToc } from "@/components/layout/CurriculumToc";
import { getTrack, isTrackId, trackIds } from "@/content/tracks";

export function generateStaticParams() {
  return trackIds.map((track) => ({ track }));
}

export default async function TrackCurriculumPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackParam } = await params;
  if (!isTrackId(trackParam)) notFound();

  const track = getTrack(trackParam);
  return <CurriculumToc track={track} />;
}
