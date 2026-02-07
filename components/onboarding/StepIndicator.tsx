'use client';

import { motion } from 'framer-motion';

interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="rounded-full"
            animate={{
              width: i === current ? 10 : 8,
              height: i === current ? 10 : 8,
              backgroundColor: i <= current ? '#FFD600' : '#27272A',
              boxShadow: i === current ? '0 0 12px rgba(255,214,0,0.4)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
          {i < total - 1 && (
            <div
              className="w-4 h-[2px] rounded-full transition-colors duration-300"
              style={{ backgroundColor: i < current ? '#FFD600' : '#27272A' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
