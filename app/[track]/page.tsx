import { notFound } from "next/navigation";
import { Dashboard } from "@/components/layout/Dashboard";
import { getTrack, isTrackId, trackIds } from "@/content/tracks";

export function generateStaticParams() {
  return trackIds.map((track) => ({ track }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackParam } = await params;
  if (!isTrackId(trackParam)) notFound();

  const track = getTrack(trackParam);
  return <Dashboard track={track} />;
}
