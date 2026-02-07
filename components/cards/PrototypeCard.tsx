'use client';

import { motion } from 'framer-motion';
import { Rocket, ExternalLink, ArrowRight } from 'lucide-react';

interface PrototypeCardProps {
  data: {
    url: string;
    headline: string;
    value_prop: string;
    cta_text?: string;
    cta?: string;
    what_it_tests?: string;
    tests?: string;
    next_step?: string;
  };
}

export default function PrototypeCard({ data }: PrototypeCardProps) {
  const ctaText = data.cta_text || data.cta || 'Get Started';
  const testsText = data.what_it_tests || data.tests || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-[var(--zagon-accent)] to-[var(--info)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-[var(--zagon-accent)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">Prototype</span>
        </div>

        <div className="bg-[var(--bg)] rounded-xl p-4 border border-[var(--zagon-border)] space-y-3">
          <h3 className="font-display font-bold text-base text-[var(--text)]">{data.headline}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{data.value_prop}</p>
          <div className="inline-flex items-center px-4 py-2 rounded-xl bg-[var(--zagon-accent)] text-[var(--bg)] font-display font-bold text-xs">
            {ctaText}
          </div>
        </div>

        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[var(--info)] hover:text-[var(--accent-bright)] transition-colors font-mono"
        >
          <ExternalLink size={12} />
          {data.url}
        </a>

        {testsText && (
          <div className="bg-[var(--bg)] rounded-xl p-3 border border-[var(--zagon-border)]">
            <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">What this tests</span>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{testsText}</p>
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
