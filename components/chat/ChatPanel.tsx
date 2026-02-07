'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { parseAIResponse } from '@/lib/parse-cards';
import { MentorMood, ParsedCard, OnboardingData } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface ChatPanelProps {
  onCardsGenerated: (cards: ParsedCard[]) => void;
  mentorMood: MentorMood;
  onboardingData?: OnboardingData;
}

// Extract text content from a UIMessage's parts array
function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === 'text' && p.text)
    .map((p) => p.text!)
    .join('');
}

// Build a personalized welcome message based on onboarding data
function buildWelcomeMessage(data?: OnboardingData): string {
  const name = data?.userName || '';
  const category = data?.ideaCategory;

  if (!name) {
    return "Hey! Welcome to ZAGON 👋\n\nI'm your startup mentor — think of me as a friend who's obsessed with building cool stuff. Together we're gonna take whatever idea is bouncing around in your head and turn it into something real.\n\nNo experience needed. No stupid questions. Just bring an idea, a problem you've noticed, or even just something that annoys you — and let's build from there.\n\nSo what's on your mind? 💡";
  }

  let greeting = `Hey ${name}! Welcome to ZAGON 👋\n\n`;

  if (category) {
    const categoryLines: Record<string, string> = {
      'An App': `So you're thinking about building an app — love it! 📱 Apps are everywhere and there's always room for one that actually solves a real problem.`,
      'A Product': `So you want to build a product — that's awesome! 🛍️ Physical or digital, the best products start with a problem worth solving.`,
      'A Website': `A website, nice! 🌐 Whether it's a platform, a tool, or something totally new — we'll figure out exactly what makes yours special.`,
      'A Service': `Building a service — smart move! 📢 Services are a great way to start because you can iterate fast and learn from real people.`,
      'A Game': `A game! 🎮 That's exciting. Games are one of the hardest things to build but also one of the most rewarding. Let's make it happen.`,
      'Something else': `Something unique brewing in your head? ✨ I love the mystery. Let's figure out what it is and how to make it real.`,
    };
    greeting += (categoryLines[category] || `Interesting choice — ${category.toLowerCase()}! Let's figure out how to make it happen.`) + '\n\n';
  }

  greeting += `I'm your startup mentor — think of me as a friend who's been through the building process before. No experience needed, no stupid questions. We'll go step by step.\n\n`;
  greeting += `So tell me — what's the idea? Or if you don't have one yet, what's a problem or frustration you've noticed in the world? 💡`;

  return greeting;
}

export function ChatPanel({ onCardsGenerated, mentorMood, onboardingData }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const processedIds = useRef<Set<string>>(new Set());

  // Memoize welcome message so it doesn't change on re-renders
  const welcomeMessage = useMemo(() => buildWelcomeMessage(onboardingData), [onboardingData]);

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
            text: welcomeMessage,
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
            isWelcome={msg.id === 'welcome'}
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
