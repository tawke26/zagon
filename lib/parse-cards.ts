import { ParsedCard, ParsedResponse } from './types';

export function parseAIResponse(raw: string): ParsedResponse {
  const cardRegex = /\[CARD:(\w+)\]\s*\n?([\s\S]*?)\n?\[\/CARD\]/g;
  const cards: ParsedCard[] = [];
  let text = raw;

  let match;
  while ((match = cardRegex.exec(raw)) !== null) {
    try {
      cards.push({
        type: match[1],
        data: JSON.parse(match[2].trim()),
      });
    } catch (e) {
      console.error('Failed to parse card:', match[1], e);
    }
    text = text.replace(match[0], '');
  }

  return { text: text.trim(), cards };
}
