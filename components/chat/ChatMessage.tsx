'use client';

import { motion } from 'framer-motion';
import { MentorAvatar } from './MentorAvatar';
import { MentorMood } from '@/lib/types';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  mood?: MentorMood;
}

export function ChatMessage({ role, content, mood = 'thinking' }: ChatMessageProps) {
  const isAI = role === 'assistant';

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
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </motion.div>
  );
}
