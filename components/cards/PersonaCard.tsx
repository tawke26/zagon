'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { StageBadge } from './StageBadge';
import { NextStepBanner } from './NextStepBanner';

interface PersonaCardProps {
  data: {
    name: string;
    age: number;
    occupation: string;
    pain_points?: string[];
    pain_point?: string;
    daily_life: string;
    tried_before: string[];
    why_failed?: string;
    next_step?: string;
  };
  stage?: { name: string; icon: string };
}

export default function PersonaCard({ data, stage }: PersonaCardProps) {
  const initials = data.name.charAt(0).toUpperCase();
  const painPoints = data.pain_points || (data.pain_point ? [data.pain_point] : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="bg-[var(--accent-dim)] px-5 py-4 flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--zagon-accent)] flex items-center justify-center">
          <span className="font-display font-bold text-lg text-[var(--bg)]">{initials}</span>
        </div>
        <div>
          <h3 className="font-display font-bold text-base text-[var(--text)]">
            {data.name}, {data.age}
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">{data.occupation}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {stage && <StageBadge stageName={stage.name} stageIcon={stage.icon} />}
          <User size={16} className="text-[var(--text-dim)]" />
        </div>
      </div>

      <div className="p-5 space-y-4">
        {painPoints.length > 0 && (
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">What bugs them</span>
            <div className="flex flex-wrap gap-1.5">
              {painPoints.map((point, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--danger-dim)] text-[var(--danger)] text-xs">
                  {point}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">A day in their life</span>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{data.daily_life}</p>
        </div>

        {data.tried_before.length > 0 && (
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Already tried</span>
            <div className="flex flex-wrap gap-1.5">
              {data.tried_before.slice(0, 3).map((item, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--zagon-border)] text-xs text-[var(--text-secondary)]">
                  {item}
                </span>
              ))}
              {data.tried_before.length > 3 && (
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--zagon-border)] text-xs text-[var(--text-dim)]">
                  +{data.tried_before.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {data.next_step && <NextStepBanner step={data.next_step} />}
      </div>
    </motion.div>
  );
}
