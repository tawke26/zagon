'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MentorAvatar } from '../chat/MentorAvatar';
import { TypewriterText } from './TypewriterText';

interface NameStepProps {
  onNext: (name: string) => void;
}

export function NameStep({ onNext }: NameStepProps) {
  const [name, setName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [showInput]);

  const handleSubmit = () => {
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col items-center justify-center px-6"
    >
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MentorAvatar mood="hyped" size={80} />
        </motion.div>
      </motion.div>

      {/* Question */}
      <div className="mt-8 text-center">
        <h2 className="font-display font-bold text-3xl text-[var(--text)]">
          <TypewriterText
            text="Hey! What should I call you?"
            delay={300}
            speed={45}
            onComplete={() => setShowInput(true)}
          />
        </h2>
      </div>

      {/* Input */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 w-full max-w-xs"
          >
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your name"
              className="w-full bg-transparent border-b-2 border-[var(--zagon-border)] focus:border-[var(--zagon-accent)] outline-none text-center text-[var(--text)] font-mono text-lg py-3 transition-colors placeholder:text-[var(--text-dim)]"
              maxLength={30}
            />

            {/* Button */}
            <AnimatePresence>
              {name.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex justify-center"
                >
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--zagon-accent)] text-[var(--bg)] font-display font-bold text-sm cursor-pointer"
                  >
                    LET&apos;S GO
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
