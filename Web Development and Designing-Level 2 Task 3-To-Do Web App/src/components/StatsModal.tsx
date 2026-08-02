import React from 'react';
import { X, Trophy, CheckCircle, Clock, AlertCircle, ListChecks, Flame, PieChart } from 'lucide-react';
import { TaskStats } from '../types';

interface StatsModalProps {
  stats: TaskStats;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-2xl shadow-xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-slate-100 font-display tracking-tight">
              Productivity Overview
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Real-time statistics for your tasks</p>
          </div>
        </div>

        {/* Big Highlight Ring */}
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800/80 dark:to-indigo-950/50 border border-indigo-100 dark:border-slate-700/60 rounded-2xl p-5 flex items-center justify-between mb-6 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Completion Rate
            </span>
            <div className="text-4xl font-extrabold text-stone-900 dark:text-slate-100 font-display mt-0.5 tracking-tight">
              {stats.completionRate}%
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
              {stats.completed} of {stats.total} total tasks finished
            </p>
          </div>

          <div className="w-20 h-20 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                className="text-stone-200 dark:text-slate-700 stroke-current"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-700"
                strokeWidth="6"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * stats.completionRate) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {stats.completionRate}%
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60">
            <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Pending Tasks</span>
            </div>
            <span className="text-2xl font-bold text-stone-900 dark:text-slate-100 font-display">
              {stats.pending}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
            <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
            <span className="text-2xl font-bold text-stone-900 dark:text-slate-100 font-display">
              {stats.completed}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
            <div className="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
              <ListChecks className="w-4 h-4" />
              <span>Subtasks</span>
            </div>
            <span className="text-2xl font-bold text-stone-900 dark:text-slate-100 font-display">
              {stats.completedSubtasks}/{stats.totalSubtasks}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60">
            <div className="flex items-center space-x-1.5 text-rose-800 dark:text-rose-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>High Priority Pending</span>
            </div>
            <span className="text-2xl font-bold text-stone-900 dark:text-slate-100 font-display">
              {stats.highPriorityPending}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition cursor-pointer shadow-md shadow-indigo-600/20"
        >
          Close Overview
        </button>
      </div>
    </div>
  );
};
