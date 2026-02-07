'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MentorAvatar } from './MentorAvatar';
import { MentorMood } from '@/lib/types';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  mood?: MentorMood;
  isWelcome?: boolean;
}

export function ChatMessage({ role, content, mood = 'thinking', isWelcome = false }: ChatMessageProps) {
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
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
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
    </motion.div>
  );
}
