/** Share of correct answers treated as a “high score” for next-lesson nudge. */
export const ACTIVITY_HIGH_SCORE_RATIO = 0.8;

export function isHighActivityScore(score: number, total: number): boolean {
  if (total <= 0) return false;
  return score / total >= ACTIVITY_HIGH_SCORE_RATIO;
}

export function activityScorePercent(score: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}
