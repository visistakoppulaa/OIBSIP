import React, { useState } from 'react';
import {
  Check,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  AlertCircle,
  Timer,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Tag,
  Flag,
  Plus,
} from 'lucide-react';
import { Task, PriorityLevel, TaskCategory } from '../types';
import { formatTimestamp } from '../utils/storage';

interface TaskItemProps {
  task: Task;
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
}

const CATEGORIES: TaskCategory[] = ['General', 'Work', 'Personal', 'Urgent', 'Health', 'Learning'];

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  onStartFocusTimer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState<PriorityLevel>(task.priority);
  const [editCategory, setEditCategory] = useState<TaskCategory>(task.category);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const [showSubtasks, setShowSubtasks] = useState(true);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || undefined,
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const handleAddSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
  };

  const isOverdue =
    !task.completed &&
    task.dueDate &&
    task.dueDate < new Date().toISOString().split('T')[0];

  const subtasksCount = task.subtasks.length;
  const completedSubtasksCount = task.subtasks.filter((s) => s.completed).length;

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
        task.completed
          ? 'bg-stone-50/80 dark:bg-slate-900/50 border-stone-200/60 dark:border-slate-800/80 opacity-80'
          : 'bg-white dark:bg-slate-900 border-stone-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-md'
      }`}
    >
      {/* High Priority Top Accent Strip */}
      {task.priority === 'high' && !task.completed && (
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-rose-500 rounded-t-full" />
      )}

      {isEditing ? (
        /* Inline Edit Mode */
        <div className="space-y-3 font-sans">
          <div className="flex items-center justify-between border-b pb-2 border-stone-200/80 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Editing Task
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveEdit}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 text-xs font-semibold border border-stone-200 dark:border-slate-700 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              className="w-full px-3 py-2 text-sm rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 focus:outline-none focus:border-indigo-600 text-stone-900 dark:text-slate-100 font-medium"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">Description</label>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 focus:outline-none focus:border-indigo-600 text-stone-800 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as PriorityLevel)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              >
                <option value="low" className="bg-white dark:bg-slate-900">Low</option>
                <option value="medium" className="bg-white dark:bg-slate-900">Medium</option>
                <option value="high" className="bg-white dark:bg-slate-900">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as TaskCategory)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-white dark:bg-slate-900">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Normal Display Mode */
        <div>
          <div className="flex items-start gap-3">
            {/* Mark Complete Checkbox Toggle */}
            <button
              onClick={() => onToggleComplete(task.id)}
              type="button"
              title={task.completed ? 'Mark as Pending' : 'Mark as Complete'}
              className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                task.completed
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                  : 'border-stone-300 dark:border-slate-700 hover:border-indigo-600 bg-stone-50/80 dark:bg-slate-950 text-stone-400 dark:text-slate-500 hover:bg-stone-100 dark:hover:bg-slate-800'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 stroke-[2.5]" />}
            </button>

            {/* Content area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className={`text-base font-semibold transition-all ${
                      task.completed
                        ? 'line-through text-stone-400 dark:text-slate-500'
                        : 'text-stone-900 dark:text-slate-100'
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.description && (
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        task.completed
                          ? 'line-through text-stone-400 dark:text-slate-500'
                          : 'text-stone-600 dark:text-slate-300'
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  {!task.completed && (
                    <button
                      onClick={() => onStartFocusTimer(task)}
                      title="Start Focus Timer"
                      className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition cursor-pointer"
                    >
                      <Timer className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setIsEditing(true)}
                    title="Edit Task Inline"
                    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    title="Delete Task"
                    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges & Meta Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-stone-500 dark:text-slate-400 font-sans">
                {/* Priority Badge */}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                    task.priority === 'high'
                      ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      : task.priority === 'medium'
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                  }`}
                >
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>

                {/* Category Badge */}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300">
                  <Tag className="w-3 h-3 mr-1 text-stone-400 dark:text-slate-500" />
                  {task.category}
                </span>

                {/* Due Date Indicator */}
                {task.dueDate && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] border ${
                      isOverdue
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-semibold'
                        : 'bg-stone-100 dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-400'
                    }`}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Due: {task.dueDate}
                    {isOverdue && <AlertCircle className="w-3 h-3 ml-1 text-rose-600 dark:text-rose-400" />}
                  </span>
                )}

                {/* Timestamps (Added & Completed) */}
                <div className="flex items-center space-x-2 ml-auto text-[11px] text-stone-400 dark:text-slate-500 font-sans">
                  <span className="flex items-center" title={`Added on ${new Date(task.createdAt).toLocaleString()}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(task.createdAt)}
                  </span>

                  {task.completed && task.completedAt && (
                    <span
                      className="flex items-center text-emerald-700 dark:text-emerald-400 font-medium"
                      title={`Completed on ${new Date(task.completedAt).toLocaleString()}`}
                    >
                      • Done {formatTimestamp(task.completedAt)}
                    </span>
                  )}
                </div>
              </div>

              {/* Subtasks Section */}
              {subtasksCount > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowSubtasks(!showSubtasks)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white transition mb-2 cursor-pointer"
                  >
                    <span>
                      Checklist ({completedSubtasksCount}/{subtasksCount})
                    </span>
                    {showSubtasks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-100 dark:bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden border border-stone-200/60 dark:border-slate-700/60">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSubtasksCount / subtasksCount) * 100}%` }}
                    />
                  </div>

                  {showSubtasks && (
                    <div className="space-y-1.5 mt-2 pl-1">
                      {task.subtasks.map((st) => (
                        <div key={st.id} className="flex items-center justify-between group/st text-xs">
                          <label className="flex items-center space-x-2 cursor-pointer flex-1">
                            <input
                              type="checkbox"
                              checked={st.completed}
                              onChange={() => onToggleSubtask(task.id, st.id)}
                              className="rounded text-indigo-600 focus:ring-indigo-600 bg-stone-50 dark:bg-slate-950 border-stone-300 dark:border-slate-700"
                            />
                            <span
                              className={`${
                                st.completed
                                  ? 'line-through text-stone-400 dark:text-slate-500'
                                  : 'text-stone-700 dark:text-slate-200'
                              }`}
                            >
                              {st.title}
                            </span>
                          </label>
                          <button
                            onClick={() => onDeleteSubtask(task.id, st.id)}
                            className="opacity-0 group-hover/st:opacity-100 p-0.5 text-stone-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add Quick Subtask Inline */}
              {!task.completed && (
                <form onSubmit={handleAddSubtaskSubmit} className="mt-2.5 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="+ Add subtask step..."
                    className="flex-1 px-2.5 py-1 text-xs rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-600"
                  />
                  {newSubtaskTitle.trim() && (
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Delete Confirmation Dialog Popover */}
          {showDeleteConfirm && (
            <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 z-10 border border-stone-200 dark:border-slate-800 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <p className="text-sm font-semibold text-stone-900 dark:text-slate-100 text-center">
                Are you sure you want to delete this task?
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-1.5 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
