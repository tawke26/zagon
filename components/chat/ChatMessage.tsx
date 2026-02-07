'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MentorAvatar } from './MentorAvatar';
import { MentorMood, QuickOption } from '@/lib/types';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'bg-green-500/15 text-green-400',
  Medium: 'bg-yellow-500/15 text-yellow-400',
  Hard: 'bg-orange-500/15 text-orange-400',
};

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  mood?: MentorMood;
  isWelcome?: boolean;
  options?: QuickOption[];
  onOptionClick?: (label: string) => void;
}

export function ChatMessage({
  role,
  content,
  mood = 'thinking',
  isWelcome = false,
  options,
  onOptionClick,
}: ChatMessageProps) {
  const isAI = role === 'assistant';
  const [displayedText, setDisplayedText] = useState(isWelcome ? '' : content);
  const [isTyping, setIsTyping] = useState(isWelcome);

  // Typewriter effect for welcome message
  useEffect(() => {
    if (!isWelcome) {
      setDisplayedText(content);
      return;
    }

    let i = 0;
    const speed = 15; // chars per interval
    const interval = setInterval(() => {
      i += speed;
      if (i >= content.length) {
        setDisplayedText(content);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(content.slice(0, i));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [content, isWelcome]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {isAI && (
        <div className="flex-shrink-0 mt-1">
          <MentorAvatar mood={mood} size={36} />
        </div>
      )}
      <div className="max-w-[85%]">
        <div
          className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
            isAI
              ? 'bg-[var(--surface)] text-[var(--text)] border border-[var(--zagon-border)]'
              : 'bg-[var(--zagon-accent)] text-[var(--bg)] ml-auto'
          }`}
        >
          <div className="whitespace-pre-wrap">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block ml-0.5 w-[2px] h-[1em] bg-[var(--zagon-accent)] align-middle"
              />
            )}
          </div>
        </div>

        {/* Quick option pills */}
        {isAI && options && options.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            {options.map((opt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.3 }}
                onClick={() => onOptionClick?.(opt.label)}
                className="text-left px-3 py-2.5 rounded-xl border border-[var(--zagon-border)] bg-[var(--surface)] hover:border-[var(--zagon-accent)] hover:bg-[var(--accent-dim)] transition-all text-sm cursor-pointer group"
              >
                <span className="text-[var(--text)] group-hover:text-[var(--zagon-accent)] transition-colors">
                  {opt.label}
                </span>
                <span
                  className={`ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded ${DIFFICULTY_STYLES[opt.difficulty] || DIFFICULTY_STYLES.Medium}`}
                >
                  {opt.difficulty}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
