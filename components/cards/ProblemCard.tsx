'use client';

import { motion } from 'framer-motion';

interface ProblemCardProps {
  data: {
    statement: string;
    who: string;
    problem: string;
    why_now: string;
  };
}

export default function ProblemCard({ data }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl border-l-4 border-l-[var(--zagon-accent)] p-6 space-y-4"
    >
      {/* Label */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        THE PROBLEM
      </span>

      {/* Main statement */}
      <h2 className="font-display font-bold text-xl text-[var(--text)]">
        {data.statement}
      </h2>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs">
          <span className="text-[var(--text-dim)]">Who</span>
          {data.who}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs">
          <span className="text-[var(--text-dim)]">What</span>
          {data.problem}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs">
          <span className="text-[var(--text-dim)]">Why Now</span>
          {data.why_now}
        </span>
      </div>
    </motion.div>
  );
}
