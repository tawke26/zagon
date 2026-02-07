'use client';

import { ParsedCard, TaskItem } from '@/lib/types';
import { getStageForCard } from '@/lib/stages';
import { EmptyState } from './EmptyState';
import { StageProgress } from './StageProgress';
import { TaskBoard } from './TaskBoard';
import BusinessCanvas from '../cards/BusinessCanvas';

interface WorkspacePanelProps {
  cards: ParsedCard[];
  tasks: TaskItem[];
  currentStage: string;
  onToggleTask: (taskId: string) => void;
}

export function WorkspacePanel({ cards, tasks, currentStage, onToggleTask }: WorkspacePanelProps) {
  // Separate business model card from other cards
  const businessModelCard = cards.find((c) => c.type === 'business_model');
  const hasTasks = tasks.length > 0;

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

        {/* Task Board */}
        {hasTasks && (
          <div className="px-6 pt-4 pb-6">
            <TaskBoard tasks={tasks} onToggleTask={onToggleTask} />
          </div>
        )}

        {/* Empty state when nothing exists */}
        {!businessModelCard && !hasTasks && <EmptyState />}
      </div>
    </div>
  );
}
