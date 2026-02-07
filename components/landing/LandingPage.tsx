'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TypewriterText } from '../onboarding/TypewriterText';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [subtitleDone, setSubtitleDone] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[var(--bg)] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--zagon-accent)] opacity-[0.04] blur-[120px]" />
      </div>

      {/* Floating golden particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[var(--zagon-accent)]"
          style={{
            left: `${15 + i * 7}%`,
            top: `${25 + (i % 4) * 14}%`,
          }}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.08, 0.25, 0.08],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Character */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FounderCharacter />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-display font-[800] text-7xl md:text-8xl text-[var(--text)] mt-8 tracking-tighter"
      >
        ZAGON
      </motion.h1>

      {/* Typewriter Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-[var(--text-secondary)] text-lg mt-3 h-7"
      >
        <TypewriterText
          text="Your AI startup mentor. From zero to one."
          delay={800}
          speed={35}
          onComplete={() => setSubtitleDone(true)}
        />
      </motion.div>

      {/* CTA Button with pulsing glow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: subtitleDone ? 1 : 0, y: subtitleDone ? 0 : 15 }}
        transition={{ duration: 0.6 }}
        className="mt-10 relative"
      >
        {/* Pulsing glow behind button */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-[var(--zagon-accent)] blur-xl"
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="relative flex items-center gap-2 bg-[var(--zagon-accent)] text-[var(--bg)] px-8 py-4 rounded-xl font-display font-bold text-lg hover:bg-[var(--accent-bright)] transition-colors cursor-pointer"
        >
          START BUILDING
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      {/* Reassuring tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: subtitleDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 font-mono text-xs text-[var(--text-dim)]"
      >
        no experience needed — just bring an idea
      </motion.p>
    </div>
  );
}

function FounderCharacter() {
  return (
    <svg width="200" height="260" viewBox="0 0 260 340" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M55 340 L62 215 Q68 188 98 178 L130 170 L162 178 Q192 188 198 215 L205 340" fill="#141414" stroke="#FFD600" strokeWidth="1.5" />
      <path d="M105 172 Q130 182 155 172" stroke="#FFD600" strokeWidth="1" fill="none" opacity="0.3" />
      <text x="130" y="255" textAnchor="middle" fill="#FFD600" fontFamily="'JetBrains Mono', monospace" fontSize="26" fontWeight="bold" opacity="0.35">0→1</text>
      {/* Neck */}
      <rect x="118" y="150" width="24" height="22" fill="#1A1A1A" />
      {/* Head */}
      <rect x="82" y="48" width="96" height="100" rx="22" fill="#1A1A1A" stroke="#FFD600" strokeWidth="1.8" />
      {/* Beanie */}
      <path d="M78 68 Q78 30 130 20 Q182 30 182 68" fill="#141414" stroke="#FFD600" strokeWidth="1.8" />
      <line x1="78" y1="68" x2="182" y2="68" stroke="#FFD600" strokeWidth="2.5" />
      <line x1="95" y1="50" x2="95" y2="68" stroke="#FFD600" strokeWidth="0.5" opacity="0.15" />
      <line x1="113" y1="44" x2="113" y2="68" stroke="#FFD600" strokeWidth="0.5" opacity="0.15" />
      <line x1="130" y1="42" x2="130" y2="68" stroke="#FFD600" strokeWidth="0.5" opacity="0.15" />
      <line x1="147" y1="44" x2="147" y2="68" stroke="#FFD600" strokeWidth="0.5" opacity="0.15" />
      <line x1="165" y1="50" x2="165" y2="68" stroke="#FFD600" strokeWidth="0.5" opacity="0.15" />
      <circle cx="130" cy="18" r="6" fill="#141414" stroke="#FFD600" strokeWidth="1.2" />
      {/* Eyes */}
      <rect x="96" y="92" width="20" height="9" rx="2.5" fill="#FFD600" opacity="0.9" />
      <rect x="144" y="92" width="20" height="9" rx="2.5" fill="#FFD600" opacity="0.9" />
      {/* Eyebrows */}
      <line x1="94" y1="80" x2="118" y2="83" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <line x1="142" y1="78" x2="166" y2="83" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Smirk */}
      <path d="M112 118 Q122 125 138 125 Q148 123 155 116" stroke="#FFD600" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Headphones */}
      <path d="M78 82 Q66 82 64 100 L64 114" stroke="#FFD600" strokeWidth="2.5" fill="none" opacity="0.35" />
      <path d="M182 82 Q194 82 196 100 L196 114" stroke="#FFD600" strokeWidth="2.5" fill="none" opacity="0.35" />
      <rect x="58" y="112" width="12" height="18" rx="4" fill="#FFD600" opacity="0.2" stroke="#FFD600" strokeWidth="0.8" />
      <rect x="190" y="112" width="12" height="18" rx="4" fill="#FFD600" opacity="0.2" stroke="#FFD600" strokeWidth="0.8" />
      {/* Arms crossed */}
      <path d="M55 230 Q72 210 95 228 Q115 242 130 232" stroke="#FFD600" strokeWidth="1.2" fill="none" opacity="0.25" />
      <path d="M205 230 Q188 210 165 228 Q145 242 130 232" stroke="#FFD600" strokeWidth="1.2" fill="none" opacity="0.25" />
    </svg>
  );
}
