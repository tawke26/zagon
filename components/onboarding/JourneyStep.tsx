'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Search, Users, LayoutGrid, Palette, Monitor, FlaskConical, Rocket } from 'lucide-react';

interface JourneyStepProps {
  userName: string;
  onComplete: () => void;
}

const STAGES = [
  { name: 'THE SPARK', subtitle: 'Find your problem', icon: Lightbulb },
  { name: 'THE HUNT', subtitle: 'Find the evidence', icon: Search },
  { name: 'THE WHO', subtitle: 'Know your customer', icon: Users },
  { name: 'THE MODEL', subtitle: 'Build the logic', icon: LayoutGrid },
  { name: 'THE FACE', subtitle: 'Give it identity', icon: Palette },
  { name: 'THE BUILD', subtitle: 'Make it real', icon: Monitor },
  { name: 'THE TEST', subtitle: 'Prove it works', icon: FlaskConical },
];

export function JourneyStep({ userName, onComplete }: JourneyStepProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Stagger reveal stages
    const timers: ReturnType<typeof setTimeout>[] = [];

    STAGES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setRevealedCount(i + 1);
        }, 500 + i * 400)
      );
    });

    // Show button after all stages
    timers.push(
      setTimeout(() => {
        setShowButton(true);
      }, 500 + STAGES.length * 400 + 500)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col items-center justify-center px-6"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-[var(--text)] text-center mb-8"
      >
        Your journey, <span className="text-[var(--zagon-accent)]">{userName}</span>
      </motion.h2>

      {/* Vertical timeline */}
      <div className="relative max-w-xs w-full">
        {/* Vertical line */}
        <motion.div
          className="absolute left-5 top-0 w-[2px] bg-[var(--zagon-accent)] origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: revealedCount / STAGES.length }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ height: `${(STAGES.length - 1) * 64 + 40}px` }}
        />

        {/* Stage nodes */}
        <div className="relative space-y-6">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isRevealed = i < revealedCount;

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-center gap-4"
              >
                {/* Icon circle */}
                <motion.div
                  className={`
                    w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border-2 z-10
                    ${isRevealed
                      ? 'border-[var(--zagon-accent)] bg-[var(--surface)]'
                      : 'border-[var(--zagon-border)] bg-[var(--bg)]'
                    }
                  `}
                  animate={isRevealed ? { boxShadow: '0 0 16px rgba(255,214,0,0.2)' } : {}}
                >
                  <Icon
                    size={18}
                    className={isRevealed ? 'text-[var(--zagon-accent)]' : 'text-[var(--text-dim)]'}
                  />
                </motion.div>

                {/* Text */}
                <div>
                  <p className={`font-display font-bold text-sm ${isRevealed ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'}`}>
                    {stage.name}
                  </p>
                  <p className="font-mono text-xs text-[var(--text-muted)]">
                    {stage.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mt-10"
          >
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[var(--zagon-accent)] text-[var(--bg)] font-display font-bold text-sm glow-accent cursor-pointer"
            >
              <Rocket size={18} />
              START MY JOURNEY
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
