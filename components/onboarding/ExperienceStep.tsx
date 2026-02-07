'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Hammer, Rocket } from 'lucide-react';
import { ExperienceLevel } from '@/lib/types';

interface ExperienceStepProps {
  userName: string;
  onNext: (level: ExperienceLevel) => void;
}

const LEVELS = [
  {
    value: 'beginner' as ExperienceLevel,
    label: 'Just starting',
    subtitle: 'This is my first time building something',
    icon: Sprout,
  },
  {
    value: 'intermediate' as ExperienceLevel,
    label: "I've tried some things",
    subtitle: "I've used some tools and built small projects",
    icon: Hammer,
  },
  {
    value: 'advanced' as ExperienceLevel,
    label: 'I build regularly',
    subtitle: 'I code or build things often',
    icon: Rocket,
  },
];

export function ExperienceStep({ userName, onNext }: ExperienceStepProps) {
  const [selected, setSelected] = useState<ExperienceLevel | null>(null);

  const handleSelect = (level: ExperienceLevel) => {
    setSelected(level);
    setTimeout(() => onNext(level), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col items-center justify-center px-6"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-[var(--text)] text-center max-w-md"
      >
        How much have you built before,{' '}
        <span className="text-[var(--zagon-accent)]">{userName}</span>?
      </motion.h2>

      <div className="mt-8 flex flex-col gap-3 max-w-sm w-full">
        {LEVELS.map((level, i) => {
          const Icon = level.icon;
          const isSelected = selected === level.value;

          return (
            <motion.button
              key={level.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !selected && handleSelect(level.value)}
              disabled={!!selected && !isSelected}
              className={`
                flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left
                ${isSelected
                  ? 'border-[var(--zagon-accent)] bg-[var(--accent-dim)] scale-[1.02]'
                  : selected
                    ? 'border-[var(--zagon-border)] bg-[var(--surface)] opacity-30'
                    : 'border-[var(--zagon-border)] bg-[var(--surface)] hover:border-[var(--border-hover)]'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-[var(--zagon-accent)]' : 'bg-[var(--bg)]'
              }`}>
                <Icon
                  size={20}
                  className={isSelected ? 'text-[var(--bg)]' : 'text-[var(--text-dim)]'}
                />
              </div>
              <div>
                <span className={`font-display font-bold text-sm block ${
                  isSelected ? 'text-[var(--zagon-accent)]' : 'text-[var(--text)]'
                }`}>
                  {level.label}
                </span>
                <span className="text-xs text-[var(--text-dim)] mt-0.5 block">
                  {level.subtitle}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
