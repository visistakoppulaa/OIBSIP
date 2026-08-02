import React, { useState } from 'react';
import { Plus, Tag, Flag, Calendar, ChevronDown, ChevronUp, Clock, ListPlus } from 'lucide-react';
import { PriorityLevel, TaskCategory } from '../types';

interface TaskInputProps {
  onAddTask: (taskData: {
    title: string;
    description?: string;
    priority: PriorityLevel;
    category: TaskCategory;
    dueDate?: string;
    estimatedMinutes?: number;
    subtasks?: string[];
  }) => void;
}

const CATEGORIES: TaskCategory[] = ['General', 'Work', 'Personal', 'Urgent', 'Health', 'Learning'];

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [category, setCategory] = useState<TaskCategory>('General');
  const [dueDate, setDueDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | ''>('');
  const [subtasksInput, setSubtasksInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Parse subtasks line by line or comma separated if provided
    const parsedSubtasks = subtasksInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
      estimatedMinutes: typeof estimatedMinutes === 'number' ? estimatedMinutes : undefined,
      subtasks: parsedSubtasks.length > 0 ? parsedSubtasks : undefined,
    });

    // Reset fields
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('General');
    setDueDate('');
    setEstimatedMinutes('');
    setSubtasksInput('');
    setShowOptions(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-3">
          <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border border-indigo-200/60 dark:border-indigo-800 tracking-wide">
            Create Task
          </span>
          <span className="text-xs text-stone-400 dark:text-slate-500 font-medium">Quick Entry</span>
        </div>

        {/* Main Bar: Input + Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done? (e.g. Prepare project proposal...)"
              className="w-full px-4 py-3 rounded-xl bg-stone-50/80 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-slate-100 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-600/10 text-sm font-medium transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-indigo-600/20 active:scale-[0.98] transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Options Toggle Bar */}
        <div className="flex items-center justify-between mt-3.5 px-1 text-xs text-stone-500 dark:text-slate-400 font-medium">
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            {/* Quick Priority selector */}
            <div className="flex items-center space-x-1 bg-stone-100/80 dark:bg-slate-800/80 border border-stone-200/60 dark:border-slate-700/60 rounded-lg p-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-slate-500 px-1">Priority:</span>
              {(['low', 'medium', 'high'] as PriorityLevel[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-2 py-0.5 rounded-md capitalize text-xs font-semibold transition cursor-pointer ${
                    priority === p
                      ? p === 'high'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : p === 'medium'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Quick Category selector */}
            <div className="hidden sm:flex items-center space-x-1 bg-stone-100/80 dark:bg-slate-800/80 border border-stone-200/60 dark:border-slate-700/60 rounded-lg p-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-slate-500 px-1">Tag:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="bg-transparent text-stone-700 dark:text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-stone-800 dark:text-slate-200">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center space-x-1 text-stone-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer font-medium"
          >
            <span>{showOptions ? 'Fewer options' : 'More options'}</span>
            {showOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Options (Description, Due Date, Subtasks, Est Time) */}
        {showOptions && (
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
                Description / Notes
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add extra context or instructions..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-stone-50/80 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950"
              />
            </div>

            {/* Category selection for mobile */}
            <div className="sm:hidden">
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              />
            </div>

            {/* Est Minutes */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
                Est. Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={480}
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 20"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
              />
            </div>

            {/* Subtasks input */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1 flex items-center">
                <ListPlus className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
                Subtasks (one per line)
              </label>
              <textarea
                value={subtasksInput}
                onChange={(e) => setSubtasksInput(e.target.value)}
                placeholder="Step 1: Research&#10;Step 2: Draft initial outline&#10;Step 3: Finalize review"
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-600 font-mono text-xs"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
