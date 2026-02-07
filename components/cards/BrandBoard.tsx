'use client';

import { motion } from 'framer-motion';
import { Paintbrush, ArrowRight } from 'lucide-react';

interface ColorItem {
  hex: string;
  name: string;
}

interface BrandBoardProps {
  data: {
    names?: string[];
    name_options?: string[];
    colors: (string | ColorItem)[];
    font?: string;
    font_suggestion?: string;
    tone?: string[];
    tone_words?: string[];
    tagline: string;
    next_step?: string;
  };
}

export default function BrandBoard({ data }: BrandBoardProps) {
  const names = data.names || data.name_options || [];
  const toneWords = data.tone || data.tone_words || [];
  const fontName = data.font || data.font_suggestion || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-[var(--zagon-accent)] via-[var(--info)] to-[var(--success)]" />
      <div className="p-5 space-y-5">
        <div className="flex items-center gap-2">
          <Paintbrush size={16} className="text-[var(--info)]" />
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
            Brand Board
          </span>
        </div>

        {names.length > 0 && (
          <div className="flex flex-wrap gap-3 items-baseline">
            {names.map((name, i) => (
              <span key={i} className="font-display font-bold text-2xl text-[var(--text)]">
                {name}
                {i < names.length - 1 && <span className="ml-3 text-[var(--text-dim)] text-lg">/</span>}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {data.colors.map((color, i) => {
            const hex = typeof color === 'string' ? color : color.hex;
            const name = typeof color === 'string' ? color : color.name;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-14 h-14 rounded-2xl border-2 border-[var(--zagon-border)] shadow-lg"
                  style={{ backgroundColor: hex }}
                />
                <span className="font-mono text-[9px] text-[var(--text-muted)]">{name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {toneWords.map((word, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs">
              {word}
            </span>
          ))}
          {fontName && (
            <span className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--zagon-border)] text-xs text-[var(--text-secondary)]">
              Font: {fontName}
            </span>
          )}
        </div>

        <p className="font-display text-lg italic text-[var(--text)] text-center py-2">
          &ldquo;{data.tagline}&rdquo;
        </p>

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
