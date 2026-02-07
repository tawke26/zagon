'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShoppingBag, Globe, Megaphone, Gamepad2, Sparkles } from 'lucide-react';

interface CategoryStepProps {
  userName: string;
  onNext: (category: string) => void;
  onSkip: () => void;
}

const CATEGORIES = [
  { label: 'An App', icon: Smartphone },
  { label: 'A Product', icon: ShoppingBag },
  { label: 'A Website', icon: Globe },
  { label: 'A Service', icon: Megaphone },
  { label: 'A Game', icon: Gamepad2 },
  { label: 'Something else', icon: Sparkles },
];

export function CategoryStep({ userName, onNext, onSkip }: CategoryStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelected(label);
    setTimeout(() => onNext(label), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col items-center justify-center px-6"
    >
      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-[var(--text)] text-center max-w-md"
      >
        Nice to meet you, <span className="text-[var(--zagon-accent)]">{userName}</span>!
        <br />
        <span className="text-xl md:text-2xl text-[var(--text-secondary)]">
          What kind of idea are you bringing?
        </span>
      </motion.h2>

      {/* Category grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md w-full">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.label;

          return (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => !selected && handleSelect(cat.label)}
              disabled={!!selected && !isSelected}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                ${isSelected
                  ? 'border-[var(--zagon-accent)] bg-[var(--accent-dim)] scale-105'
                  : selected
                    ? 'border-[var(--zagon-border)] bg-[var(--surface)] opacity-30'
                    : 'border-[var(--zagon-border)] bg-[var(--surface)] hover:border-[var(--border-hover)]'
                }
              `}
            >
              <Icon
                size={24}
                className={`transition-colors ${isSelected ? 'text-[var(--zagon-accent)]' : 'text-[var(--text-dim)]'}`}
              />
              <span
                className={`font-display font-bold text-sm transition-colors ${
                  isSelected ? 'text-[var(--zagon-accent)]' : 'text-[var(--text)]'
                }`}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onSkip}
        className="mt-6 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors underline-offset-4 hover:underline cursor-pointer"
      >
        not sure yet — skip
      </motion.button>
    </motion.div>
  );
}
