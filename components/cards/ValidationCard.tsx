'use client';

import { motion } from 'framer-motion';

interface Feedback {
  quote: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface ValidationCardProps {
  data: {
    people_tested: number;
    feedback: Feedback[];
    patterns: string;
    recommendation: string;
  };
}

const SENTIMENT_STYLES: Record<
  Feedback['sentiment'],
  { bg: string; text: string; label: string }
> = {
  positive: {
    bg: 'rgba(0,230,118,0.15)',
    text: 'var(--success)',
    label: 'Positive',
  },
  negative: {
    bg: 'var(--danger-dim)',
    text: 'var(--danger)',
    label: 'Negative',
  },
  neutral: {
    bg: 'rgba(113,113,122,0.15)',
    text: 'var(--text-dim)',
    label: 'Neutral',
  },
};

export default function ValidationCard({ data }: ValidationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-5"
    >
      {/* Header */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        VALIDATION RESULTS
      </span>

      {/* People tested stat */}
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-4xl font-bold text-[var(--zagon-accent)]">
          {data.people_tested}
        </span>
        <span className="font-mono text-sm text-[var(--text-muted)]">
          people tested
        </span>
      </div>

      {/* Feedback quotes */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          FEEDBACK
        </span>
        <div className="space-y-2">
          {data.feedback.map((item, index) => {
            const style = SENTIMENT_STYLES[item.sentiment];
            return (
              <div
                key={index}
                className="flex items-start gap-3 bg-[var(--bg)] border border-[var(--zagon-border)] rounded-xl p-3"
              >
                {/* Sentiment dot */}
                <div
                  className="mt-1 w-2 h-2 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${style.text.replace('var(', '').replace(')', '')})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-md font-mono text-[10px] font-medium"
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                  }}
                >
                  {style.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patterns */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          PATTERNS
        </span>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.patterns}
        </p>
      </div>

      {/* Recommendation */}
      <div className="space-y-1.5 border-t border-[var(--zagon-border)] pt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--zagon-accent)]">
          RECOMMENDATION
        </span>
        <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
          {data.recommendation}
        </p>
      </div>
    </motion.div>
  );
}
