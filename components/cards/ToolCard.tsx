'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  data: {
    name: string;
    url: string;
    description: string;
    why_now: string;
    icon: string;
  };
}

export default function ToolCard({ data }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-4 flex flex-row items-center gap-4 hover:border-[var(--border-hover)] transition-colors"
    >
      {/* Left: Icon area */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center">
        <span className="text-base text-[var(--zagon-accent)]">{data.icon}</span>
      </div>

      {/* Middle: Name + description + why now */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="font-display font-bold text-sm text-[var(--text)] truncate">
          {data.name}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {data.description}
        </p>
        <p className="font-mono text-[10px] text-[var(--zagon-accent)] uppercase tracking-wider">
          WHY NOW: {data.why_now}
        </p>
      </div>

      {/* Right: Open link */}
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs hover:bg-[var(--zagon-accent)] hover:text-[var(--bg)] transition-colors"
      >
        Open
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
