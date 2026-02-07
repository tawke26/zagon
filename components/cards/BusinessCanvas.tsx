'use client';

import { motion } from 'framer-motion';
import { BarChart3, ArrowRight } from 'lucide-react';

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
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  validated: { bg: 'rgba(0,230,118,0.15)', text: 'var(--success)', label: '✓ Validated' },
  assumption: { bg: 'rgba(255,214,0,0.15)', text: 'var(--zagon-accent)', label: '? Assumption' },
  risky: { bg: 'var(--danger-dim)', text: 'var(--danger)', label: '⚠ Risky' },
};

export default function BusinessCanvas({ data }: BusinessCanvasProps) {
  const blocks: Block[] = data.blocks ? [...data.blocks] : [];
  if (blocks.length === 0 && data.value_prop) {
    const flat = [
      { title: 'Value Proposition', content: data.value_prop, status: 'assumption' as const },
      { title: 'Customer Segment', content: data.customer_segment || '', status: 'assumption' as const },
      { title: 'Channels', content: data.channels || '', status: 'assumption' as const },
      { title: 'Revenue Model', content: data.revenue_model || '', status: 'assumption' as const },
      { title: 'Key Activities', content: data.key_activities || '', status: 'assumption' as const },
      { title: 'Cost Structure', content: data.cost_structure || '', status: 'assumption' as const },
    ].filter(b => b.content);
    blocks.push(...flat);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-[var(--info)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-[var(--info)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
            Business Canvas
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {blocks.map((block, i) => {
            const style = STATUS_STYLES[block.status] || STATUS_STYLES.assumption;
            return (
              <div key={i} className="bg-[var(--bg)] rounded-xl p-3 space-y-1.5 border border-[var(--zagon-border)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-dim)]">{block.title}</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: style.bg, color: style.text }}>
                    {style.label}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{block.content}</p>
              </div>
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
