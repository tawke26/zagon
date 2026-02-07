import { ParsedCard, ParsedResponse, QuickOption, TaskItem } from './types';

export function parseAIResponse(raw: string): ParsedResponse {
  const cardRegex = /\[CARD:(\w+)\]\s*\n?([\s\S]*?)\n?\[\/CARD\]/g;
  const optionsRegex = /\[OPTIONS\]\s*\n?([\s\S]*?)\n?\[\/OPTIONS\]/g;
  const taskRegex = /\[TASK\](.*?)\[\/TASK\]/g;
  const stageRegex = /\[STAGE:(\w+)\]/;

  const cards: ParsedCard[] = [];
  const options: QuickOption[] = [];
  const tasks: TaskItem[] = [];
  let stageSignal: string | undefined;
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

  // 3. Extract TASK blocks: [TASK]description|difficulty[/TASK]
  let taskMatch;
  while ((taskMatch = taskRegex.exec(text)) !== null) {
    const parts = taskMatch[1].split('|').map((s) => s.trim());
    const taskText = parts[0];
    const difficulty = (parts.length >= 2 && ['Easy', 'Medium', 'Hard'].includes(parts[1])
      ? parts[1]
      : 'Medium') as TaskItem['difficulty'];
    if (taskText) {
      tasks.push({
        text: taskText,
        difficulty,
        done: false,
        id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      });
    }
    text = text.replace(taskMatch[0], '');
  }

  // 4. Extract STAGE signal: [STAGE:stageid]
  const stageMatch = stageRegex.exec(text);
  if (stageMatch) {
    stageSignal = stageMatch[1];
    text = text.replace(stageMatch[0], '');
  }

  // 5. Strip PARTIAL (incomplete) blocks still being streamed
  text = text.replace(/\[CARD:[\s\S]*$/, '');
  text = text.replace(/\[OPTIONS\][\s\S]*$/, '');
  text = text.replace(/\[TASK\][\s\S]*$/, '');
  text = text.replace(/\[STAGE:[\s\S]*$/, '');

  return { text: text.trim(), cards, options, tasks, stageSignal };
}
