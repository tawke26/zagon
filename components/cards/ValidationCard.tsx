'use client';

import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { StageBadge } from './StageBadge';
import { NextStepBanner } from './NextStepBanner';

interface Feedback {
  quote: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface ValidationCardProps {
  data: {
    people_tested: number;
    feedback: Feedback[];
    patterns: string[] | string;
    recommendation: string;
    next_step?: string;
  };
  stage?: { name: string; icon: string };
}

const SENTIMENT_DOT: Record<string, string> = {
  positive: 'bg-[var(--success)]',
  negative: 'bg-[var(--danger)]',
  neutral: 'bg-[var(--text-dim)]',
};

export default function ValidationCard({ data, stage }: ValidationCardProps) {
  const patterns = Array.isArray(data.patterns) ? data.patterns : [data.patterns];
  const visibleFeedback = data.feedback.slice(0, 2);
  const hiddenFeedback = data.feedback.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-[var(--success)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical size={16} className="text-[var(--success)]" />
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">Validation</span>
            {stage && <StageBadge stageName={stage.name} stageIcon={stage.icon} />}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-bold text-[var(--zagon-accent)]">{data.people_tested}</span>
            <span className="font-mono text-[10px] text-[var(--text-muted)]">tested</span>
          </div>
        </div>

        <p className="text-sm text-[var(--text)] font-medium leading-relaxed">{data.recommendation}</p>

        <div className="space-y-1.5">
          {visibleFeedback.map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-[var(--bg)] rounded-lg px-3 py-2">
              <div className={`mt-1.5 w-2 h-2 shrink-0 rounded-full ${SENTIMENT_DOT[item.sentiment] || SENTIMENT_DOT.neutral}`} />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
          {hiddenFeedback > 0 && (
            <p className="font-mono text-[10px] text-[var(--text-muted)] pl-1">
              and {hiddenFeedback} more response{hiddenFeedback !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {patterns.map((p, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] text-xs">{p}</span>
          ))}
        </div>

        {data.next_step && <NextStepBanner step={data.next_step} />}
      </div>
    </motion.div>
  );
}
