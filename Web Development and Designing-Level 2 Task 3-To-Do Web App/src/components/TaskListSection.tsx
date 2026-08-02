import React from 'react';
import { Clock, CheckCircle2, ListChecks, Sparkles, CheckCheck, Trash2 } from 'lucide-react';
import { Task, PriorityLevel, TaskCategory } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListSectionProps {
  title: string;
  type: 'pending' | 'completed';
  tasks: Task[];
  countText: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: {
      title: string;
      description?: string;
      priority: PriorityLevel;
      category: TaskCategory;
      dueDate?: string;
    }
  ) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onStartFocusTimer: (task: Task) => void;
  onBatchAction?: () => void;
  batchActionText?: string;
  batchActionIcon?: React.ReactNode;
}

export const TaskListSection: React.FC<TaskListSectionProps> = ({
  title,
  type,
  tasks,
  countText,
  onToggleComplete,
  onDelete,
  onUpdate,
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  onStartFocusTimer,
  onBatchAction,
  batchActionText,
  batchActionIcon,
}) => {
  const isPending = type === 'pending';

  return (
    <section className="space-y-4">
      {/* List Header with Count Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-xl border ${
              isPending
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
            }`}
          >
            {isPending ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-slate-100 font-display flex items-center gap-2">
              <span>{title}</span>
              {/* Task Count Indicator */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isPending
                    ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                }`}
              >
                {countText}
              </span>
            </h2>
          </div>
        </div>

        {/* Optional Batch Action */}
        {onBatchAction && tasks.length > 0 && (
          <button
            onClick={onBatchAction}
            className="flex items-center space-x-1.5 text-xs font-semibold text-stone-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
          >
            {batchActionIcon}
            <span>{batchActionText}</span>
          </button>
        )}
      </div>

      {/* Task List Items or Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-stone-50/60 dark:bg-slate-900/40 border border-dashed border-stone-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-400 dark:text-slate-500 rounded-2xl shadow-xs">
            {isPending ? <Sparkles className="w-6 h-6 text-amber-500" /> : <CheckCheck className="w-6 h-6 text-emerald-500" />}
          </div>
          <p className="text-sm font-semibold text-stone-800 dark:text-slate-200">
            {isPending ? 'All caught up! No pending tasks.' : 'No completed tasks yet.'}
          </p>
          <p className="text-xs text-stone-500 dark:text-slate-400 max-w-sm mx-auto">
            {isPending
              ? 'Add a new task using the input box above or adjust your search filters.'
              : 'Complete pending tasks above by checking the circle toggle to see them here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onToggleSubtask={onToggleSubtask}
              onAddSubtask={onAddSubtask}
              onDeleteSubtask={onDeleteSubtask}
              onStartFocusTimer={onStartFocusTimer}
            />
          ))}
        </div>
      )}
    </section>
  );
};
