'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Search, Palette, Code, Layout, Megaphone, BarChart3 } from 'lucide-react';
import { StageBadge } from './StageBadge';

interface ToolCardProps {
  data: {
    name: string;
    url: string;
    description: string;
    why_now?: string;
    action?: string;
    icon: string;
  };
  stage?: { name: string; icon: string };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  search: <Search size={18} />,
  palette: <Palette size={18} />,
  code: <Code size={18} />,
  layout: <Layout size={18} />,
  megaphone: <Megaphone size={18} />,
  chart: <BarChart3 size={18} />,
};

export default function ToolCard({ data, stage }: ToolCardProps) {
  const icon = ICON_MAP[data.icon] || <Search size={18} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-colors"
    >
      <div className="p-4 flex items-center gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--zagon-accent)]">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-display font-bold text-sm text-[var(--text)]">{data.name}</h4>
            {stage && <StageBadge stageName={stage.name} stageIcon={stage.icon} />}
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">{data.description}</p>
        </div>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--zagon-accent)] text-[var(--bg)] font-mono text-xs font-bold hover:opacity-90 transition-opacity"
        >
          Open
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {data.action && (
        <div className="px-4 pb-4">
          <div className="bg-[var(--accent-dim)] rounded-xl px-3 py-2.5">
            <span className="font-mono text-[10px] uppercase text-[var(--zagon-accent)] font-bold">Do this → </span>
            <span className="text-xs text-[var(--text)]">{data.action}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
