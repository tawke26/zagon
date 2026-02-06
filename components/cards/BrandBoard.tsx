'use client';

import { motion } from 'framer-motion';

interface BrandBoardProps {
  data: {
    name_options: string[];
    colors: string[];
    font_suggestion: string;
    tone_words: string[];
    tagline: string;
  };
}

export default function BrandBoard({ data }: BrandBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl p-6 space-y-6"
    >
      {/* Header */}
      <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-dim)]">
        BRAND BOARD
      </span>

      {/* Name options */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          NAME OPTIONS
        </span>
        <div className="flex flex-wrap gap-3">
          {data.name_options.map((name, index) => (
            <span
              key={index}
              className="font-display font-bold text-2xl text-[var(--text)]"
            >
              {name}
              {index < data.name_options.length - 1 && (
                <span className="ml-3 text-[var(--text-dim)]">/</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          COLOR PALETTE
        </span>
        <div className="flex flex-wrap gap-4">
          {data.colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-full border border-[var(--zagon-border)]"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {color}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Font suggestion */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          FONT SUGGESTION
        </span>
        <p className="text-sm text-[var(--text-secondary)]">
          {data.font_suggestion}
        </p>
      </div>

      {/* Tone words */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          TONE
        </span>
        <div className="flex flex-wrap gap-2">
          {data.tone_words.map((word, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-lg bg-[var(--accent-dim)] text-[var(--zagon-accent)] font-mono text-xs"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5 border-t border-[var(--zagon-border)] pt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
          TAGLINE
        </span>
        <p className="font-display text-lg italic text-[var(--text)]">
          &ldquo;{data.tagline}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
