/** Slower step timing for TikTok capture (sandbox only). */
export const RECORD_LAB_STEP_MS = 5200;

/** Wrong/problem beat stays on screen longer than do-this / all-good. */
const HINT_HOOK_BEAT_MULT = 2;
const HINT_OTHER_BEAT_MULT = 0.75;

export function hintBeatMs(beatId: string, baseMs: number): number {
  return Math.round(baseMs * (beatId === "hook" ? HINT_HOOK_BEAT_MULT : HINT_OTHER_BEAT_MULT));
}
