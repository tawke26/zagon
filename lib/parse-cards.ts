import { ParsedCard, ParsedResponse, QuickOption } from './types';

export function parseAIResponse(raw: string): ParsedResponse {
  const cardRegex = /\[CARD:(\w+)\]\s*\n?([\s\S]*?)\n?\[\/CARD\]/g;
  const optionsRegex = /\[OPTIONS\]\s*\n?([\s\S]*?)\n?\[\/OPTIONS\]/g;
  const cards: ParsedCard[] = [];
  const options: QuickOption[] = [];
  let text = raw;

  // 1. Extract complete CARD blocks
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

  // 2. Extract complete OPTIONS blocks
  let optMatch;
  while ((optMatch = optionsRegex.exec(text)) !== null) {
    const lines = optMatch[1].trim().split('\n').filter(Boolean);
    for (const line of lines) {
      const parts = line.split('|').map((s) => s.trim());
      if (parts.length >= 2) {
        const label = parts[0];
        const difficulty = parts[1] as QuickOption['difficulty'];
        if (label && ['Easy', 'Medium', 'Hard'].includes(difficulty)) {
          options.push({ label, difficulty });
        }
      }
    }
    text = text.replace(optMatch[0], '');
  }

  // 3. Strip PARTIAL (incomplete) blocks still being streamed
  // If there's an opening [CARD: or [OPTIONS] without its closing tag,
  // remove everything from that point onward so raw markup never flashes
  text = text.replace(/\[CARD:[\s\S]*$/, '');
  text = text.replace(/\[OPTIONS\][\s\S]*$/, '');

  return { text: text.trim(), cards, options };
}
