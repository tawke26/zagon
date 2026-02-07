'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { StageBadge } from './StageBadge';
import { NextStepBanner } from './NextStepBanner';

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
  stage?: { name: string; icon: string };
}

export default function ResearchWall({ data, stage }: ResearchWallProps) {
  const items = data.findings || data.evidence || [];
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 3);
  const hiddenCount = items.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-[var(--success)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Search size={16} className="text-[var(--success)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
            What people are saying
          </span>
          <span className="ml-auto font-mono text-xs text-[var(--text-muted)]">
            {items.length} found
          </span>
          {stage && <StageBadge stageName={stage.name} stageIcon={stage.icon} />}
        </div>

        <div className="space-y-2">
          {visibleItems.map((item, i) => {
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

        {!showAll && hiddenCount > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-xs text-[var(--zagon-accent)] hover:underline cursor-pointer"
          >
            Show {hiddenCount} more
          </button>
        )}

        {data.next_step && <NextStepBanner step={data.next_step} />}
      </div>
    </motion.div>
  );
}
