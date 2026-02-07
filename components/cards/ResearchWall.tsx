'use client';

import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

interface Evidence {
  quote: string;
  source: string;
  url?: string;
  type?: string;
  supports_idea?: boolean;
}

interface ResearchWallProps {
  data: {
    findings?: Evidence[];
    evidence?: Evidence[];
    next_step?: string;
  };
}

export default function ResearchWall({ data }: ResearchWallProps) {
  const items = data.findings || data.evidence || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-[var(--success)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-[var(--success)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
            Research Evidence
          </span>
          <span className="ml-auto font-mono text-xs text-[var(--text-muted)]">
            {items.length} finding{items.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-2">
          {items.map((item, i) => {
            const supports = item.supports_idea !== false && item.type !== 'contradicts';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 bg-[var(--bg)] rounded-xl p-3 border border-[var(--zagon-border)]"
              >
                <div className={`mt-1 w-2 h-2 shrink-0 rounded-full ${supports ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--zagon-accent)] transition-colors">
                        {item.source}
                      </a>
                    ) : item.source}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

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
