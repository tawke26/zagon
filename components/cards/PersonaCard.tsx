'use client';

import { motion } from 'framer-motion';

interface PersonaCardProps {
  data: {
    name: string;
    age: number;
    occupation: string;
    pain_point: string;
    daily_life: string;
    tried_before: string[];
    why_failed: string;
  };
}

export default function PersonaCard({ data }: PersonaCardProps) {
  const initials = data.name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-5"
    >
      {/* Header with avatar */}
      <div className="flex items-center gap-4">
        {/* Avatar circle */}
        <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--accent-dim)] flex items-center justify-center">
          <span className="font-display font-bold text-xl text-[var(--zagon-accent)]">
            {initials}
          </span>
        </div>

        {/* Name, age, occupation */}
        <div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {data.name}
            <span className="ml-2 font-mono text-sm font-normal text-[var(--text-muted)]">
              {data.age}
            </span>
          </h3>
          <p className="font-mono text-xs text-[var(--text-dim)]">
            {data.occupation}
          </p>
        </div>
      </div>

      {/* The Pain */}
      <div className="space-y-1.5">
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
          THE PAIN
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.pain_point}
        </p>
      </div>

      {/* A Day in Their Life */}
      <div className="space-y-1.5">
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
          A DAY IN THEIR LIFE
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.daily_life}
        </p>
      </div>

      {/* What They've Tried */}
      <div className="space-y-2">
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
          WHAT THEY&apos;VE TRIED
        </span>
        <ul className="space-y-1.5">
          {data.tried_before.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
            >
              <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[var(--text-dim)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Why It Failed */}
      <div className="space-y-1.5 border-t border-[var(--zagon-border)] pt-4">
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--danger)]">
          WHY IT FAILED
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.why_failed}
        </p>
      </div>
    </motion.div>
  );
}
