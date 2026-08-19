import {
  AlertTriangle,
  BookCopy,
  Flame,
  LayoutGrid,
  Milestone,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { tierIconClass } from "@/lib/tiers";
import type { Tier } from "@/lib/types";

const TIER_ICON: Record<Tier | "all", LucideIcon> = {
  all: LayoutGrid,
  beginner: Sprout,
  intermediate: Milestone,
  advanced: Flame,
  pro: Zap,
  pitfalls: AlertTriangle,
  cheatsheet: BookCopy,
};

export function TierIcon({
  tier,
  size = 16,
  className = "",
}: {
  tier: Tier | "all";
  size?: number;
  className?: string;
}) {
  const Icon = TIER_ICON[tier];
  return (
    <Icon
      size={size}
      strokeWidth={2.25}
      aria-hidden
      className={`shrink-0 ${className || tierIconClass(tier)}`}
    />
  );
}
