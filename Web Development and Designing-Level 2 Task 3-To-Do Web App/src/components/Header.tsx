import React from 'react';
import {
  CheckSquare,
  BarChart3,
  Moon,
  Sun,
  Download,
  Trash2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { TaskStats } from '../types';

interface HeaderProps {
  stats: TaskStats;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenStats: () => void;
  onOpenExport: () => void;
  onClearAll: () => void;
  onClearCompleted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  darkMode,
  onToggleDarkMode,
  onOpenStats,
  onOpenExport,
  onClearAll,
  onClearCompleted,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#FAF9F5]/90 dark:bg-slate-950/90 border-b border-stone-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-slate-100 font-display">
                TaskFlow
              </h1>
              <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/80 dark:border-indigo-800 uppercase tracking-wider hidden sm:inline-block">
                Interactive To-Do
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400 hidden sm:block">
              Organize daily priorities with ease and speed
            </p>
          </div>
        </div>

        {/* Action Controls & Quick Stats */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Stats Badge */}
          <button
            onClick={onOpenStats}
            title="View Productivity Analytics"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-stone-700 dark:text-slate-200 shadow-xs transition cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden md:inline text-stone-500 dark:text-slate-400">Stats:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {stats.completionRate}%
            </span>
          </button>

          {/* Export / Backup */}
          <button
            onClick={onOpenExport}
            title="Export / Backup Tasks"
            className="p-2 rounded-xl text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs transition cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Clear completed button */}
          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              title="Clear Completed Tasks"
              className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-200 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Done</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

