/**
 * Directional icons in Arabic RTL.
 *
 * Prefer ONE pattern everywhere:
 * - Forward / next / CTA:  <ArrowRight className={RTL_FLIP} /> or <ChevronRight className={RTL_FLIP} />
 * - Back / previous:       <ArrowLeft className={RTL_FLIP} />  or <ChevronLeft className={RTL_FLIP} />
 *
 * Do NOT swap ArrowLeft/ArrowRight by locale AND also apply RTL_FLIP — that double-flips.
 * Keep technical sequences (HTML → CSS → JS) in `dir="ltr"` so arrows stay →.
 */
export const RTL_FLIP = "rtl:rotate-180";

/** Merge class names and append the RTL flip utility. */
export function withRtlFlip(
  ...classes: Array<string | false | null | undefined>
): string {
  return [...classes.filter(Boolean), RTL_FLIP].join(" ");
}
