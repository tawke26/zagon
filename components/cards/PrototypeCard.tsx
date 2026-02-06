'use client';

import { motion } from 'framer-motion';

interface PrototypeCardProps {
  data: {
    url: string;
    headline: string;
    value_prop: string;
    cta_text: string;
    what_it_tests: string;
  };
}

export default function PrototypeCard({ data }: PrototypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-5"
    >
      {/* Header */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        PROTOTYPE
      </span>

      {/* URL */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          LANDING PAGE
        </span>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-mono text-sm text-[var(--info)] hover:text-[var(--accent-bright)] transition-colors truncate"
        >
          {data.url}
        </a>
      </div>

      {/* Headline */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          HEADLINE
        </span>
        <h3 className="font-display font-bold text-xl text-[var(--text)]">
          {data.headline}
        </h3>
      </div>

      {/* Value Proposition */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          VALUE PROPOSITION
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.value_prop}
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          CALL TO ACTION
        </span>
        <div className="inline-flex items-center px-4 py-2 rounded-xl bg-[var(--accent-dim)] border border-[var(--zagon-accent)]">
          <span className="font-display font-bold text-sm text-[var(--zagon-accent)]">
            {data.cta_text}
          </span>
        </div>
      </div>

      {/* What It Tests */}
      <div className="space-y-1.5 border-t border-[var(--zagon-border)] pt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--zagon-accent)]">
          WHAT THIS TESTS
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.what_it_tests}
        </p>
      </div>
    </motion.div>
  );
}
