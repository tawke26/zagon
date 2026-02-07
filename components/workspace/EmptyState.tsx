'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Search, Users, LayoutGrid, Palette, Monitor, FlaskConical } from 'lucide-react';

const JOURNEY_STAGES = [
  { name: 'THE SPARK', icon: Lightbulb },
  { name: 'THE HUNT', icon: Search },
  { name: 'THE WHO', icon: Users },
  { name: 'THE MODEL', icon: LayoutGrid },
  { name: 'THE FACE', icon: Palette },
  { name: 'THE BUILD', icon: Monitor },
  { name: 'THE TEST', icon: FlaskConical },
];

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative px-6">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-[var(--zagon-accent)] opacity-[0.03] blur-[100px]" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--zagon-accent)]"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 15}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-display font-bold text-3xl text-[var(--text)] opacity-80"
      >
        Your build board
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-[var(--text-dim)] mt-2 text-center text-sm"
      >
        Start talking. Watch your ideas take shape here.
      </motion.p>

      {/* Journey stage pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 flex flex-wrap justify-center gap-2 max-w-md"
      >
        {JOURNEY_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isFirst = i === 0;

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold border
                ${isFirst
                  ? 'border-[var(--zagon-accent)] bg-[var(--accent-dim)] text-[var(--zagon-accent)]'
                  : 'border-[var(--zagon-border)] bg-[var(--surface)] text-[var(--text-dim)]'
                }
              `}
            >
              <Icon size={12} />
              {stage.name}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subtle hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-6 font-mono text-[11px] text-[var(--text-dim)] opacity-50"
      >
        cards will appear here as you build →
      </motion.p>
    </div>
  );
}
