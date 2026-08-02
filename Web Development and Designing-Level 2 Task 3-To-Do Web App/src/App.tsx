import React, { useState, useEffect, useMemo } from 'react';
import { Task, FilterOptions, PriorityLevel, TaskCategory } from './types';
import {
  loadStoredTasks,
  saveStoredTasks,
  loadStoredTheme,
  saveStoredTheme,
  calculateStats,
  filterAndSortTasks,
  INITIAL_DEMO_TASKS,
} from './utils/storage';
import { triggerConfetti } from './utils/confetti';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskFilterBar } from './components/TaskFilterBar';
import { TaskListSection } from './components/TaskListSection';
import { FocusTimerModal } from './components/FocusTimerModal';
import { StatsModal } from './components/StatsModal';
import { ExportModal } from './components/ExportModal';
import { CheckCheck, Trash2, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks());
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => loadStoredTheme());
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    priority: 'all',
    category: 'all',
    sortBy: 'createdAtDesc',
  });

  // Modals State
  const [activeTimerTask, setActiveTimerTask] = useState<Task | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Theme Syncing Effect
  useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setTheme(newTheme);
    saveStoredTheme(newTheme);
  };

  // LocalStorage Sync Effect
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  // Task Operations
  const handleAddTask = (data: {
    title: string;
    description?: string;
    priority: PriorityLevel;
    category: TaskCategory;
    dueDate?: string;
    estimatedMinutes?: number;
    subtasks?: string[];
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title,
      description: data.description,
      completed: false,
      priority: data.priority,
      category: data.category,
      createdAt: new Date().toISOString(),
      dueDate: data.dueDate,
      estimatedMinutes: data.estimatedMinutes,
      subtasks: (data.subtasks || []).map((st, idx) => ({
        id: `sub-${Date.now()}-${idx}`,
        title: st,
        completed: false,
      })),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            triggerConfetti();
          }
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTask = (
    id: string,
    updates: {
      title: string;
      description?: string;
      priority: PriorityLevel;
      category: TaskCategory;
      dueDate?: string;
    }
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: t.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
          };
        }
        return t;
      })
    );
  };

  const handleAddSubtask = (taskId: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: [
              ...t.subtasks,
              { id: `sub-${Date.now()}`, title, completed: false },
            ],
          };
        }
        return t;
      })
    );
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: t.subtasks.filter((st) => st.id !== subtaskId),
          };
        }
        return t;
      })
    );
  };

  // Batch actions
  const handleMarkAllComplete = () => {
    setTasks((prev) =>
      prev.map((t) =>
        !t.completed
          ? { ...t, completed: true, completedAt: new Date().toISOString() }
          : t
      )
    );
    triggerConfetti();
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks from memory?')) {
      setTasks([]);
    }
  };

  const handleRestoreDemoTasks = () => {
    setTasks(INITIAL_DEMO_TASKS);
  };

  // Calculations & Filtering
  const stats = useMemo(() => calculateStats(tasks), [tasks]);

  const filteredTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [tasks, filters]
  );

  const pendingTasks = useMemo(
    () => filteredTasks.filter((t) => !t.completed),
    [filteredTasks]
  );

  const completedTasks = useMemo(
    () => filteredTasks.filter((t) => t.completed),
    [filteredTasks]
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-slate-950 text-stone-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      {/* Header Bar */}
      <Header
        stats={stats}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenStats={() => setShowStatsModal(true)}
        onOpenExport={() => setShowExportModal(true)}
        onClearAll={handleClearAll}
        onClearCompleted={handleClearCompleted}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Task Creation Input Card */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Search, Filter & Sort Controls */}
        <TaskFilterBar
          filters={filters}
          onChangeFilters={setFilters}
          totalTaskCount={tasks.length}
        />

        {/* Global Reset / Demo Starter Link if empty */}
        {tasks.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 mb-6 shadow-xs">
            <p className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-wider">Your task list is completely empty!</p>
            <button
              onClick={handleRestoreDemoTasks}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Sample Tasks</span>
            </button>
          </div>
        )}

        {/* Pending Tasks List Section */}
        <TaskListSection
          title="Pending Tasks"
          type="pending"
          tasks={pendingTasks}
          countText={`${pendingTasks.length} pending`}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onToggleSubtask={handleToggleSubtask}
          onAddSubtask={handleAddSubtask}
          onDeleteSubtask={handleDeleteSubtask}
          onStartFocusTimer={(task) => setActiveTimerTask(task)}
          onBatchAction={handleMarkAllComplete}
          batchActionText="Mark All Complete"
          batchActionIcon={<CheckCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
        />

        {/* Completed Tasks List Section */}
        <TaskListSection
          title="Completed Tasks"
          type="completed"
          tasks={completedTasks}
          countText={`${completedTasks.length} completed`}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onToggleSubtask={handleToggleSubtask}
          onAddSubtask={handleAddSubtask}
          onDeleteSubtask={handleDeleteSubtask}
          onStartFocusTimer={(task) => setActiveTimerTask(task)}
          onBatchAction={handleClearCompleted}
          batchActionText="Clear Completed"
          batchActionIcon={<Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 dark:border-slate-800 py-6 text-center text-xs text-stone-500 dark:text-slate-400 mt-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
          <span className="font-semibold text-stone-700 dark:text-slate-300">TaskFlow Workspace</span>
          <div className="flex items-center space-x-4 text-stone-500 dark:text-slate-400">
            <span>Local Storage Active</span>
            <span>•</span>
            <button
              onClick={handleRestoreDemoTasks}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 underline cursor-pointer transition font-medium"
            >
              Reset Sample Demo
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeTimerTask && (
        <FocusTimerModal
          task={activeTimerTask}
          onClose={() => setActiveTimerTask(null)}
          onCompleteTask={handleToggleComplete}
        />
      )}

      {showStatsModal && (
        <StatsModal stats={stats} onClose={() => setShowStatsModal(false)} />
      )}

      {showExportModal && (
        <ExportModal
          tasks={tasks}
          onClose={() => setShowExportModal(false)}
          onImportTasks={(imported) => setTasks(imported)}
        />
      )}
    </div>
  );
}
