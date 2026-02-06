'use client';

import { motion } from 'framer-motion';

interface BusinessCanvasProps {
  data: {
    value_prop: string;
    customer_segment: string;
    channels: string;
    revenue_model: string;
    key_activities: string;
    cost_structure: string;
  };
}

const SECTIONS: { key: keyof BusinessCanvasProps['data']; label: string }[] = [
  { key: 'value_prop', label: 'VALUE PROPOSITION' },
  { key: 'customer_segment', label: 'CUSTOMER SEGMENT' },
  { key: 'channels', label: 'CHANNELS' },
  { key: 'revenue_model', label: 'REVENUE MODEL' },
  { key: 'key_activities', label: 'KEY ACTIVITIES' },
  { key: 'cost_structure', label: 'COST STRUCTURE' },
];

export default function BusinessCanvas({ data }: BusinessCanvasProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-4"
    >
      {/* Header */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        BUSINESS CANVAS
      </span>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="bg-[var(--bg)] border border-[var(--zagon-border)] rounded-xl p-4 space-y-2 hover:border-[var(--border-hover)] transition-colors"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
              {section.label}
            </span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {data[section.key]}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
