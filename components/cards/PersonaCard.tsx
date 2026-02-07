'use client';

import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

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
}

export default function PersonaCard({ data }: PersonaCardProps) {
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
        <User size={16} className="ml-auto text-[var(--text-dim)]" />
      </div>

      <div className="p-5 space-y-4">
        {painPoints.length > 0 && (
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Frustrations</span>
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
          <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Their Day</span>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{data.daily_life}</p>
        </div>

        {data.tried_before.length > 0 && (
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Already Tried</span>
            <div className="flex flex-wrap gap-1.5">
              {data.tried_before.map((item, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--zagon-border)] text-xs text-[var(--text-secondary)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.next_step && (
          <div className="flex items-start gap-2 bg-[var(--accent-dim)] rounded-xl p-3">
            <ArrowRight size={14} className="text-[var(--zagon-accent)] mt-0.5 shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--zagon-accent)] font-bold">Your next step</span>
              <p className="text-xs text-[var(--text)] mt-0.5">{data.next_step}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
