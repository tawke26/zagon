'use client';

import { Lightbulb, Search, Users, LayoutGrid, Palette, Monitor, FlaskConical, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb,
  Search,
  Users,
  LayoutGrid,
  Palette,
  Monitor,
  FlaskConical,
};

interface StageBadgeProps {
  stageName: string;
  stageIcon: string;
}

export function StageBadge({ stageName, stageIcon }: StageBadgeProps) {
  const Icon = ICON_MAP[stageIcon];

  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent-dim)] border border-[var(--zagon-accent)]/20">
      {Icon && <Icon size={10} className="text-[var(--zagon-accent)]" />}
      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--zagon-accent)] font-bold">
        {stageName}
      </span>
    </div>
  );
}
