'use client';

import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface ProblemCardProps {
  data: {
    statement: string;
    who: string;
    problem: string;
    why_now: string;
    next_step?: string;
  };
}

export default function ProblemCard({ data }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-[var(--zagon-accent)]" />

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} className="text-[var(--zagon-accent)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
            Problem Defined
          </span>
        </div>

        <h2 className="font-display font-bold text-lg text-[var(--text)] leading-snug">
          {data.statement}
        </h2>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[var(--bg)] rounded-xl p-3 space-y-1">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Who</span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{data.who}</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 space-y-1">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Pain</span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{data.problem}</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 space-y-1">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Why Now</span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{data.why_now}</p>
          </div>
        </div>

        {data.next_step && (
          <div className="flex items-start gap-2 bg-[var(--accent-dim)] rounded-xl p-3">
            <ArrowRight size={14} className="text-[var(--zagon-accent)] mt-0.5 shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--zagon-accent)] font-bold">
                Your next step
              </span>
              <p className="text-xs text-[var(--text)] mt-0.5">{data.next_step}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
