'use client';

import { ParsedCard } from '@/lib/types';
import { getStageForCard } from '@/lib/stages';
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

function renderCard(card: ParsedCard, index: number, currentStage: string) {
  const key = `${card.type}-${index}`;
  const stageInfo = getStageForCard(card.type, currentStage);
  const stage = stageInfo ? { name: stageInfo.name, icon: stageInfo.icon } : undefined;

  switch (card.type) {
    case 'problem_statement':
      return <ProblemCard key={key} data={card.data as any} stage={stage} />;
    case 'research_evidence':
      return <ResearchWall key={key} data={card.data as any} stage={stage} />;
    case 'persona':
      return <PersonaCard key={key} data={card.data as any} stage={stage} />;
    case 'brand_board':
      return <BrandBoard key={key} data={card.data as any} stage={stage} />;
    case 'prototype':
      return <PrototypeCard key={key} data={card.data as any} stage={stage} />;
    case 'validation':
      return <ValidationCard key={key} data={card.data as any} stage={stage} />;
    case 'tool_recommendation':
      return <ToolCard key={key} data={card.data as any} stage={stage} />;
    default:
      return null;
  }
}

export function WorkspacePanel({ cards, currentStage }: WorkspacePanelProps) {
  // Separate business model card from other cards
  const businessModelCard = cards.find((c) => c.type === 'business_model');
  const otherCards = cards.filter((c) => c.type !== 'business_model');
  const hasOtherCards = otherCards.length > 0;

  const bmStageInfo = getStageForCard('business_model', currentStage);
  const bmStage = bmStageInfo
    ? { name: bmStageInfo.name, icon: bmStageInfo.icon }
    : undefined;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)]">
      <StageProgress currentStage={currentStage} />

      <div className="flex-1 overflow-y-auto">
        {/* Business Model — always pinned at top */}
        {businessModelCard && (
          <div className="px-6 pt-6 pb-2">
            <BusinessCanvas data={businessModelCard.data as any} stage={bmStage} />
          </div>
        )}

        {/* Other cards below */}
        {hasOtherCards ? (
          <div className="px-6 pb-6 pt-2 space-y-4">
            {otherCards.map((card, i) => renderCard(card, i, currentStage))}
          </div>
        ) : (
          !businessModelCard && <EmptyState />
        )}

        {/* Show hint when only business model exists */}
        {businessModelCard && !hasOtherCards && (
          <div className="px-6 pb-6">
            <div className="text-center py-8">
              <p className="text-sm text-[var(--text-dim)]">
                Cards will appear here as you build →
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
