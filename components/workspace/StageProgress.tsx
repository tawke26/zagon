'use client';

import { STAGES } from '@/lib/stages';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Search,
  Users,
  LayoutGrid,
  Palette,
  Monitor,
  FlaskConical,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Lightbulb,
  Search,
  Users,
  LayoutGrid,
  Palette,
  Monitor,
  FlaskConical,
};

interface StageProgressProps {
  currentStage: string;
}

export function StageProgress({ currentStage }: StageProgressProps) {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-[var(--zagon-border)] bg-[var(--bg)]">
      {STAGES.map((stage, i) => {
        const Icon = ICON_MAP[stage.icon];
        const isActive = i === currentIndex;
        const isCompleted = i < currentIndex;

        return (
          <div key={stage.id} className="flex items-center gap-2">
            <div className="group relative">
              <motion.div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[var(--accent-dim)] border border-[var(--zagon-accent)] glow-accent'
                    : isCompleted
                    ? 'bg-[var(--zagon-accent)] border border-[var(--zagon-accent)]'
                    : 'bg-[var(--surface)] border border-[var(--zagon-border)]'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {Icon && (
                  <Icon
                    size={14}
                    className={
                      isActive
                        ? 'text-[var(--zagon-accent)]'
                        : isCompleted
                        ? 'text-[var(--bg)]'
                        : 'text-[var(--text-dim)]'
                    }
                  />
                )}
              </motion.div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <span className="text-xs text-[var(--text-muted)] font-mono">{stage.name}</span>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div
                className={`w-6 h-[2px] ${
                  i < currentIndex ? 'bg-[var(--zagon-accent)]' : 'bg-[var(--zagon-border)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
