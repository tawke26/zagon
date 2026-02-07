'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { StageBadge } from './StageBadge';
import { NextStepBanner } from './NextStepBanner';

interface Block {
  title: string;
  content: string;
  status: 'validated' | 'assumption' | 'risky';
}

interface BusinessCanvasProps {
  data: {
    blocks?: Block[];
    value_prop?: string;
    customer_segment?: string;
    channels?: string;
    revenue_model?: string;
    key_activities?: string;
    cost_structure?: string;
    next_step?: string;
  };
  stage?: { name: string; icon: string };
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  validated: { bg: 'rgba(0,230,118,0.15)', text: 'var(--success)', label: 'Validated' },
  assumption: { bg: 'rgba(255,214,0,0.15)', text: 'var(--zagon-accent)', label: 'Guess' },
  risky: { bg: 'var(--danger-dim)', text: 'var(--danger)', label: 'Risky' },
};

// The 6 canonical business model block titles
const CANONICAL_TITLES = [
  'What you offer',
  'Who buys it',
  'How they find you',
  'How you make money',
  'What you do',
  'What it costs',
];

export default function BusinessCanvas({ data, stage }: BusinessCanvasProps) {
  // Build filled blocks from data
  const filledBlocks: Block[] = data.blocks ? [...data.blocks] : [];

  // Fallback: handle flat-field format
  if (filledBlocks.length === 0 && data.value_prop) {
    const flat = [
      { title: 'What you offer', content: data.value_prop, status: 'assumption' as const },
      { title: 'Who buys it', content: data.customer_segment || '', status: 'assumption' as const },
      { title: 'How they find you', content: data.channels || '', status: 'assumption' as const },
      { title: 'How you make money', content: data.revenue_model || '', status: 'assumption' as const },
      { title: 'What you do', content: data.key_activities || '', status: 'assumption' as const },
      { title: 'What it costs', content: data.cost_structure || '', status: 'assumption' as const },
    ].filter((b) => b.content);
    filledBlocks.push(...flat);
  }

  // Create a map of filled blocks by lowercase title
  const filledMap = new Map<string, Block>();
  for (const block of filledBlocks) {
    filledMap.set(block.title.toLowerCase(), block);
  }

  // Count filled blocks (for progress)
  const filledCount = filledBlocks.filter((b) => b.content).length;
  const totalCount = CANONICAL_TITLES.length;
  const isEmpty = filledCount === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative rounded-2xl overflow-hidden border border-[rgba(255,214,0,0.15)]"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,214,0,0.04) 0%, var(--surface) 40%, rgba(255,214,0,0.02) 100%)',
      }}
    >
      {/* Accent left border strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--zagon-accent)] via-[var(--zagon-accent)]/40 to-transparent" />

      <div className="pl-5 pr-5 py-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center">
            <BarChart3 size={14} className="text-[var(--zagon-accent)]" />
          </div>
          <span className="font-display font-bold text-sm text-[var(--text)]">
            Business Model
          </span>
          {/* Progress dots */}
          <div className="flex items-center gap-1 ml-1">
            {CANONICAL_TITLES.map((title, i) => {
              const block = filledMap.get(title.toLowerCase());
              const isFilled = block && block.content;
              return (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isFilled ? 'bg-[var(--zagon-accent)]' : 'bg-[var(--zagon-border)]'
                  }`}
                />
              );
            })}
            <span className="font-mono text-[10px] text-[var(--text-dim)] ml-1">
              {filledCount}/{totalCount}
            </span>
          </div>
          {stage && (
            <div className="ml-auto">
              <StageBadge stageName={stage.name} stageIcon={stage.icon} />
            </div>
          )}
        </div>

        {/* Empty state */}
        {isEmpty && (
          <div className="text-center py-3">
            <p className="text-sm text-[var(--text-dim)]">
              Your business model will take shape as you talk
            </p>
          </div>
        )}

        {/* Blocks grid — show all 6 canonical slots */}
        <div className="grid grid-cols-2 gap-2">
          <AnimatePresence mode="popLayout">
            {CANONICAL_TITLES.map((title) => {
              const block = filledMap.get(title.toLowerCase());
              const isFilled = block && block.content;

              if (isFilled) {
                const style = STATUS_STYLES[block.status] || STATUS_STYLES.assumption;
                return (
                  <motion.div
                    key={title}
                    layoutId={title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-[var(--bg)] rounded-xl p-3 space-y-1.5 border border-[var(--zagon-border)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">
                        {block.title}
                      </span>
                      <span
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {style.label}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {block.content}
                    </p>
                  </motion.div>
                );
              }

              // Empty placeholder slot
              return (
                <motion.div
                  key={title}
                  layoutId={title}
                  className="rounded-xl p-3 border border-dashed border-[var(--zagon-border)] opacity-30"
                >
                  <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">
                    {title}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Any extra blocks not in canonical titles (edge case) */}
          {filledBlocks
            .filter(
              (b) =>
                b.content &&
                !CANONICAL_TITLES.some((t) => t.toLowerCase() === b.title.toLowerCase())
            )
            .map((block, i) => {
              const style = STATUS_STYLES[block.status] || STATUS_STYLES.assumption;
              return (
                <motion.div
                  key={`extra-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[var(--bg)] rounded-xl p-3 space-y-1.5 border border-[var(--zagon-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">
                      {block.title}
                    </span>
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {block.content}
                  </p>
                </motion.div>
              );
            })}
        </div>

        {data.next_step && !isEmpty && <NextStepBanner step={data.next_step} />}
      </div>
    </motion.div>
  );
}
