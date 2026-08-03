import type { TrackDefinition, TrackId } from "@/lib/types";
import { javascriptMeta } from "@/content/tracks/javascript/meta";
import { lessons as javascriptLessons } from "@/content/tracks/javascript/lessons";
import { htmlMeta } from "@/content/tracks/html/meta";
import { lessons as htmlLessons } from "@/content/tracks/html/lessons";
import { cssMeta } from "@/content/tracks/css/meta";
import { lessons as cssLessons } from "@/content/tracks/css/lessons";
import { tailwindMeta } from "@/content/tracks/tailwind/meta";
import { lessons as tailwindLessons } from "@/content/tracks/tailwind/lessons";
import { reactMeta } from "@/content/tracks/react/meta";
import { lessons as reactLessons } from "@/content/tracks/react/lessons";

export const tracks: TrackDefinition[] = [
  { ...javascriptMeta, lessons: javascriptLessons },
  { ...htmlMeta, lessons: htmlLessons },
  { ...cssMeta, lessons: cssLessons },
  { ...tailwindMeta, lessons: tailwindLessons },
  { ...reactMeta, lessons: reactLessons },
].sort((a, b) => a.order - b.order);

export const trackIds = tracks.map((track) => track.id);

export function isTrackId(value: string): value is TrackId {
  return trackIds.includes(value as TrackId);
}

export function getTrack(id: TrackId): TrackDefinition {
  const track = tracks.find((item) => item.id === id);
  if (!track) {
    throw new Error(`Unknown track: ${id}`);
  }
  return track;
}

export function getAvailableTracks(): TrackDefinition[] {
  return tracks.filter((track) => track.status === "available");
}
