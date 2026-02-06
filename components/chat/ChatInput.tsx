'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 150) + 'px';
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t border-[var(--zagon-border)]">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type your idea..."
        rows={1}
        className="flex-1 resize-none bg-[var(--surface)] border border-[var(--zagon-border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--zagon-accent)] transition-colors text-[15px]"
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--zagon-accent)] text-[var(--bg)] flex items-center justify-center hover:bg-[var(--accent-bright)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
