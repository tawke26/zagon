'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { TaskItem } from '@/lib/types';

interface TaskBoardProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string }> = {
  Easy: { bg: 'rgba(0,230,118,0.15)', text: 'var(--success)' },
  Medium: { bg: 'rgba(255,214,0,0.15)', text: 'var(--zagon-accent)' },
  Hard: { bg: 'rgba(255,61,0,0.15)', text: 'var(--danger)' },
};

export function TaskBoard({ tasks, onToggleTask }: TaskBoardProps) {
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--zagon-border)] flex items-center justify-center">
          <ListTodo size={16} className="text-[var(--text-secondary)]" />
        </div>
        <span className="font-display font-bold text-lg text-[var(--text)]">
          Action Items
        </span>
        <span className="font-mono text-xs text-[var(--text-dim)] ml-1">
          {doneCount}/{tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, i) => {
            const diffStyle = DIFFICULTY_STYLES[task.difficulty] || DIFFICULTY_STYLES.Medium;
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, delay: i * 0.05 }}
                className={`flex items-start gap-3 rounded-xl p-3.5 border cursor-pointer transition-colors ${
                  task.done
                    ? 'bg-[var(--bg)] border-[var(--zagon-border)] opacity-50'
                    : 'bg-[var(--surface)] border-[var(--zagon-border)] hover:border-[var(--border-hover)]'
                }`}
                onClick={() => onToggleTask(task.id)}
              >
                {/* Checkbox */}
                <div className="mt-0.5 shrink-0">
                  {task.done ? (
                    <CheckCircle2 size={18} className="text-[var(--success)]" />
                  ) : (
                    <Circle size={18} className="text-[var(--text-dim)]" />
                  )}
                </div>

                {/* Task text */}
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    task.done
                      ? 'line-through text-[var(--text-dim)]'
                      : 'text-[var(--text)]'
                  }`}
                >
                  {task.text}
                </p>

                {/* Difficulty badge */}
                <span
                  className="shrink-0 font-mono text-[11px] px-2 py-0.5 rounded mt-0.5"
                  style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
                >
                  {task.difficulty}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
