'use client';

import { motion } from 'framer-motion';

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
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

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-display font-bold text-3xl text-[var(--text)] opacity-60"
      >
        Your idea starts here
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-[var(--text-dim)] mt-3 text-center"
      >
        Talk to your mentor. Watch this space fill up.
      </motion.p>
    </div>
  );
}
