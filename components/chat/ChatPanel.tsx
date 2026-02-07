'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { parseAIResponse } from '@/lib/parse-cards';
import { MentorMood, ParsedCard } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface ChatPanelProps {
  onCardsGenerated: (cards: ParsedCard[]) => void;
  mentorMood: MentorMood;
}

// Extract text content from a UIMessage's parts array
function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === 'text' && p.text)
    .map((p) => p.text!)
    .join('');
}

export function ChatPanel({ onCardsGenerated, mentorMood }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const processedIds = useRef<Set<string>>(new Set());

  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({
      api: '/api/chat',
    }),
    messages: [
      {
        id: 'welcome',
        role: 'assistant' as const,
        parts: [
          {
            type: 'text' as const,
            text: "Hey. I'm your startup mentor. I'm an AI — I can research, analyze, design, and build faster than you. But I can't think for you. That's your job.\n\nHere's how this works: you tell me an idea, a problem you've noticed, something that bugs you. I'll help you turn it into something real. I'll challenge you, I'll generate things in seconds to show you what's possible, and then I'll ask you what I got wrong.\n\nSo — what's on your mind? What problem have you seen that nobody's solving right?",
          },
        ],
      },
    ],
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Parse cards from completed AI messages (only after enough conversation)
  useEffect(() => {
    if (isLoading) return; // Wait until streaming is done

    // Count user messages (excluding welcome). Suppress cards until at least 3 user messages.
    const userMessageCount = messages.filter((m) => (m.role as string) === 'user').length;
    if (userMessageCount < 3) return;

    messages.forEach((msg) => {
      if (msg.role === 'assistant' && !processedIds.current.has(msg.id)) {
        const text = getTextFromParts(msg.parts as Array<{ type: string; text?: string }>);
        const { cards } = parseAIResponse(text);
        if (cards.length > 0) {
          processedIds.current.add(msg.id);
          onCardsGenerated(cards);
        }
      }
    });
  }, [messages, isLoading, onCardsGenerated]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    sendMessage({ text });
  };

  // Get display text for a message (strips card blocks)
  const getDisplayText = (parts: Array<{ type: string; text?: string }>): string => {
    const raw = getTextFromParts(parts);
    return parseAIResponse(raw).text;
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--zagon-border)]">
        <Sparkles size={18} className="text-[var(--zagon-accent)]" />
        <span className="font-display font-bold text-lg text-[var(--text)]">ZAGON</span>
        <span className="text-[var(--text-dim)] text-sm">AI Mentor</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role as 'user' | 'assistant'}
            content={getDisplayText(msg.parts as Array<{ type: string; text?: string }>)}
            mood={mentorMood}
          />
        ))}
        {error && (
          <div className="flex gap-3">
            <div className="bg-[var(--danger-dim)] border border-[var(--danger)] rounded-2xl px-4 py-3 text-sm text-[var(--text-secondary)]">
              Something went wrong. Try again.
            </div>
          </div>
        )}
        {isLoading && (messages[messages.length - 1]?.role as string) === 'user' && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--zagon-accent)] flex items-center justify-center">
                <Sparkles size={16} className="text-[var(--zagon-accent)] animate-pulse" />
              </div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--zagon-border)] rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--zagon-accent)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--zagon-accent)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--zagon-accent)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
