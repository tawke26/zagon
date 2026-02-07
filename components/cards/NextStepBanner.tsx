'use client';

import { ArrowRight } from 'lucide-react';

interface NextStepBannerProps {
  step: string;
}

export function NextStepBanner({ step }: NextStepBannerProps) {
  return (
    <div className="flex items-start gap-2.5 bg-[var(--accent-dim)] border border-[var(--zagon-accent)]/20 rounded-xl p-4">
      <ArrowRight size={16} className="text-[var(--zagon-accent)] mt-0.5 shrink-0" />
      <div>
        <span className="font-mono text-[10px] uppercase text-[var(--zagon-accent)] font-bold tracking-wider">
          Do this next
        </span>
        <p className="text-sm text-[var(--text)] mt-1 leading-relaxed">{step}</p>
      </div>
    </div>
  );
}
