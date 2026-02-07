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

// Descriptions for the intro explainer (shown when canvas is empty)
const BLOCK_DESCRIPTIONS: Record<string, string> = {
  'What you offer': 'The product or service you\'re creating and why it matters',
  'Who buys it': 'Your target customer — who has the problem you\'re solving',
  'How they find you': 'Social media, word of mouth, ads, partnerships...',
  'How you make money': 'Subscriptions, one-time sales, freemium, ads...',
  'What you do': 'Key activities to build and deliver your product',
  'What it costs': 'Time, money, tools, and resources you need',
};

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

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center">
            <BarChart3 size={16} className="text-[var(--zagon-accent)]" />
          </div>
          <span className="font-display font-bold text-lg text-[var(--text)]">
            Business Model
          </span>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5 ml-1">
            {CANONICAL_TITLES.map((title, i) => {
              const block = filledMap.get(title.toLowerCase());
              const isFilled = block && block.content;
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isFilled ? 'bg-[var(--zagon-accent)]' : 'bg-[var(--zagon-border)]'
                  }`}
                />
              );
            })}
            <span className="font-mono text-xs text-[var(--text-dim)] ml-1">
              {filledCount}/{totalCount}
            </span>
          </div>
          {stage && (
            <div className="ml-auto">
              <StageBadge stageName={stage.name} stageIcon={stage.icon} />
            </div>
          )}
        </div>

        {/* Intro explainer when empty */}
        {isEmpty && (
          <div className="space-y-3">
            <p className="text-sm text-[var(--text-secondary)]">
              This canvas captures the 6 key pieces of your startup idea. It fills in automatically as you talk with your mentor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CANONICAL_TITLES.map((title) => (
                <div
                  key={title}
                  className="rounded-xl p-4 border border-dashed border-[var(--zagon-border)] opacity-60"
                >
                  <span className="font-mono text-xs uppercase text-[var(--text-dim)] font-bold">
                    {title}
                  </span>
                  <p className="text-xs text-[var(--text-dim)] mt-1.5 leading-relaxed">
                    {BLOCK_DESCRIPTIONS[title]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blocks grid — show all 6 canonical slots */}
        {!isEmpty && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="bg-[var(--bg)] rounded-xl p-4 space-y-2 border border-[var(--zagon-border)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-[var(--text-dim)]">
                        {block.title}
                      </span>
                      <span
                        className="font-mono text-[11px] px-2 py-0.5 rounded"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {style.label}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
                  className="rounded-xl p-4 border border-dashed border-[var(--zagon-border)] opacity-30"
                >
                  <span className="font-mono text-xs uppercase text-[var(--text-dim)]">
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
                  className="bg-[var(--bg)] rounded-xl p-4 space-y-2 border border-[var(--zagon-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-[var(--text-dim)]">
                      {block.title}
                    </span>
                    <span
                      className="font-mono text-[11px] px-2 py-0.5 rounded"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {block.content}
                  </p>
                </motion.div>
              );
            })}
        </div>}

        {data.next_step && !isEmpty && <NextStepBanner step={data.next_step} />}
      </div>
    </motion.div>
  );
}
