'use client';

import { motion } from 'framer-motion';

interface Finding {
  quote: string;
  source: string;
  url?: string;
  supports_idea: boolean;
}

interface ResearchWallProps {
  data: {
    findings: Finding[];
  };
}

export default function ResearchWall({ data }: ResearchWallProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-4"
    >
      {/* Header */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        RESEARCH WALL
      </span>

      {/* Evidence grid */}
      <div className="grid grid-cols-2 gap-3">
        {data.findings.map((finding, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: index * 0.05,
            }}
            className="bg-[var(--bg)] border border-[var(--zagon-border)] rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-[var(--border-hover)] transition-colors"
          >
            {/* Quote */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-4">
              &ldquo;{finding.quote}&rdquo;
            </p>

            {/* Bottom row: source + badge */}
            <div className="flex items-center justify-between gap-2">
              {finding.url ? (
                <a
                  href={finding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--zagon-accent)] transition-colors truncate"
                >
                  {finding.source}
                </a>
              ) : (
                <span className="font-mono text-xs text-[var(--text-muted)] truncate">
                  {finding.source}
                </span>
              )}

              <span
                className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-medium ${
                  finding.supports_idea
                    ? 'bg-[rgba(0,230,118,0.15)] text-[var(--success)]'
                    : 'bg-[var(--danger-dim)] text-[var(--danger)]'
                }`}
              >
                {finding.supports_idea ? 'Supports' : 'Challenges'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
