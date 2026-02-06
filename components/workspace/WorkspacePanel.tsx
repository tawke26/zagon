'use client';

import { ParsedCard } from '@/lib/types';
import { EmptyState } from './EmptyState';
import { StageProgress } from './StageProgress';
import ProblemCard from '../cards/ProblemCard';
import ResearchWall from '../cards/ResearchWall';
import PersonaCard from '../cards/PersonaCard';
import BusinessCanvas from '../cards/BusinessCanvas';
import BrandBoard from '../cards/BrandBoard';
import PrototypeCard from '../cards/PrototypeCard';
import ValidationCard from '../cards/ValidationCard';
import ToolCard from '../cards/ToolCard';

interface WorkspacePanelProps {
  cards: ParsedCard[];
  currentStage: string;
}

function renderCard(card: ParsedCard, index: number) {
  const key = `${card.type}-${index}`;
  switch (card.type) {
    case 'problem_statement':
      return <ProblemCard key={key} data={card.data as any} />;
    case 'research_evidence':
      return <ResearchWall key={key} data={card.data as any} />;
    case 'persona':
      return <PersonaCard key={key} data={card.data as any} />;
    case 'business_model':
      return <BusinessCanvas key={key} data={card.data as any} />;
    case 'brand_board':
      return <BrandBoard key={key} data={card.data as any} />;
    case 'prototype':
      return <PrototypeCard key={key} data={card.data as any} />;
    case 'validation':
      return <ValidationCard key={key} data={card.data as any} />;
    case 'tool_recommendation':
      return <ToolCard key={key} data={card.data as any} />;
    default:
      return null;
  }
}

export function WorkspacePanel({ cards, currentStage }: WorkspacePanelProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)]">
      <StageProgress currentStage={currentStage} />

      <div className="flex-1 overflow-y-auto">
        {cards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="p-6 space-y-4">
            {cards.map((card, i) => renderCard(card, i))}
          </div>
        )}
      </div>
    </div>
  );
}
