import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/system-prompt';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  compatibility: 'compatible', // Force /chat/completions instead of /responses
});

// Convert UI SDK v6 parts-based messages to standard { role, content } format
type MessageRole = 'system' | 'user' | 'assistant';
function normalizeMessages(messages: any[]): { role: MessageRole; content: string }[] {
  return messages.map((msg) => {
    // If message already has content as string, use it
    if (typeof msg.content === 'string') {
      return { role: msg.role as MessageRole, content: msg.content };
    }
    // If message has parts array, extract text
    if (Array.isArray(msg.parts)) {
      const text = msg.parts
        .filter((p: any) => p.type === 'text' && p.text)
        .map((p: any) => p.text)
        .join('');
      return { role: msg.role as MessageRole, content: text };
    }
    return { role: msg.role as MessageRole, content: '' };
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = normalizeMessages(body.messages || []);

    console.log('[CHAT API] Messages count:', messages.length);
    console.log('[CHAT API] Messages:', JSON.stringify(messages.map(m => ({ role: m.role, content: m.content.substring(0, 50) }))));

    const result = streamText({
      model: openrouter('arcee-ai/trinity-mini:free'),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[CHAT API] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
