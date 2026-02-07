'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { parseAIResponse } from '@/lib/parse-cards';
import { MentorMood, ParsedCard, TaskItem, OnboardingData, QuickOption } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface ChatPanelProps {
  onCardsGenerated: (cards: ParsedCard[]) => void;
  onTasksGenerated: (tasks: TaskItem[]) => void;
  onStageSignal: (stage: string) => void;
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

// Build a short personalized welcome message
function buildWelcomeMessage(data?: OnboardingData): string {
  const name = data?.userName || 'there';
  const category = data?.ideaCategory;

  let msg = `Hey ${name}! I'm your startup mentor.`;

  if (category && category !== 'Something else') {
    msg += ` So you wanna build ${category.toLowerCase()} — nice.`;
  }

  msg += ` Tell me about your idea, or a problem you want to solve`;

  return msg;
}

export function ChatPanel({
  onCardsGenerated,
  onTasksGenerated,
  onStageSignal,
  mentorMood,
  onboardingData,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const processedIds = useRef<Set<string>>(new Set());

  // Memoize welcome message so it doesn't change on re-renders
  const welcomeMessage = useMemo(() => buildWelcomeMessage(onboardingData), [onboardingData]);

  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({
      api: '/api/chat',
      body: { experienceLevel: onboardingData?.experienceLevel },
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

  // Parse cards, tasks, and stage signals from completed AI messages
  useEffect(() => {
    if (isLoading) return; // Wait until streaming is done

    messages.forEach((msg) => {
      if (msg.role === 'assistant' && !processedIds.current.has(msg.id)) {
        const text = getTextFromParts(msg.parts as Array<{ type: string; text?: string }>);
        const { cards, tasks, stageSignal } = parseAIResponse(text);

        // Only process business_model cards (other card types removed)
        const bmCards = cards.filter((c) => c.type === 'business_model');
        if (bmCards.length > 0) {
          onCardsGenerated(bmCards);
        }

        // Dispatch tasks
        if (tasks.length > 0) {
          onTasksGenerated(tasks);
        }

        // Signal stage advancement
        if (stageSignal) {
          onStageSignal(stageSignal);
        }

        // Mark as processed (even if no cards/tasks, to avoid re-processing)
        processedIds.current.add(msg.id);
      }
    });
  }, [messages, isLoading, onCardsGenerated, onTasksGenerated, onStageSignal]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    sendMessage({ text });
  };

  // Get display text and options for a message (strips card, task, stage, and options blocks)
  const getDisplayAndOptions = (
    parts: Array<{ type: string; text?: string }>
  ): { text: string; options: QuickOption[] } => {
    const raw = getTextFromParts(parts);
    const parsed = parseAIResponse(raw);
    return { text: parsed.text, options: parsed.options };
  };

  // Find the last assistant message index to show options only on it
  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return i;
    }
    return -1;
  })();

  // Only show options on the last assistant message if no user message came after it
  const lastMessageIsAssistant =
    messages.length > 0 && (messages[messages.length - 1].role as string) === 'assistant';

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
        {messages.map((msg, index) => {
          const { text, options } = getDisplayAndOptions(
            msg.parts as Array<{ type: string; text?: string }>
          );

          // Only show options on the very last assistant message, and only if user hasn't replied
          const showOptions =
            index === lastAssistantIndex && lastMessageIsAssistant && !isLoading;

          return (
            <ChatMessage
              key={msg.id}
              role={msg.role as 'user' | 'assistant'}
              content={text}
              mood={mentorMood}
              isWelcome={msg.id === 'welcome'}
              options={showOptions ? options : undefined}
              onOptionClick={showOptions ? handleSend : undefined}
            />
          );
        })}
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
