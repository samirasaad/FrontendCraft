/**
 * Flip horizontal directional icons (arrows, chevrons, skip) in Arabic RTL.
 * Use on icons that point left/right in LTR — not on vertical-only icons.
 */
export const RTL_FLIP = "rtl:rotate-180";

/** Merge class names and append the RTL flip utility. */
export function withRtlFlip(
  ...classes: Array<string | false | null | undefined>
): string {
  return [...classes.filter(Boolean), RTL_FLIP].join(" ");
}
