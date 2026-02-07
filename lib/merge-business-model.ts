import { ParsedCard } from './types';

interface Block {
  title: string;
  content: string;
  status: 'validated' | 'assumption' | 'risky';
}

/**
 * Merges an incoming business_model card into an existing one.
 * - Matching blocks (by title, case-insensitive) get their content and status updated.
 * - New blocks are appended.
 * - The latest next_step is kept.
 */
export function mergeBusinessModelCards(
  existing: ParsedCard,
  incoming: ParsedCard
): ParsedCard {
  const existingData = existing.data as Record<string, unknown>;
  const incomingData = incoming.data as Record<string, unknown>;

  const existingBlocks: Block[] = (existingData.blocks as Block[]) || [];
  const incomingBlocks: Block[] = (incomingData.blocks as Block[]) || [];

  // Also handle flat-field format from AI (value_prop, customer_segment, etc.)
  const flatToBlocks: Block[] = [];
  const FLAT_FIELD_MAP: Record<string, string> = {
    value_prop: 'What you offer',
    customer_segment: 'Who buys it',
    channels: 'How they find you',
    revenue_model: 'How you make money',
    key_activities: 'What you do',
    cost_structure: 'What it costs',
  };

  for (const [field, title] of Object.entries(FLAT_FIELD_MAP)) {
    const value = incomingData[field];
    if (value && typeof value === 'string') {
      flatToBlocks.push({ title, content: value, status: 'assumption' });
    }
  }

  const allIncoming = [...incomingBlocks, ...flatToBlocks];
  const mergedBlocks = [...existingBlocks];

  for (const newBlock of allIncoming) {
    const matchIndex = mergedBlocks.findIndex(
      (b) => b.title.toLowerCase() === newBlock.title.toLowerCase()
    );
    if (matchIndex >= 0) {
      // Update existing block's content and status
      mergedBlocks[matchIndex] = {
        ...mergedBlocks[matchIndex],
        content: newBlock.content || mergedBlocks[matchIndex].content,
        status: newBlock.status || mergedBlocks[matchIndex].status,
      };
    } else {
      // Add new block
      mergedBlocks.push(newBlock);
    }
  }

  return {
    type: 'business_model',
    data: {
      blocks: mergedBlocks,
      next_step:
        (incomingData.next_step as string) ||
        (existingData.next_step as string) ||
        '',
    },
  };
}
