import { Task, TaskStats, FilterOptions } from '../types';

const STORAGE_KEY = 'taskflow_app_tasks_v1';
const THEME_KEY = 'taskflow_theme_preference';

export const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: 'demo-1',
    title: 'Review project architecture and code structure',
    description: 'Ensure clean component separation, TypeScript types, and responsive design.',
    completed: false,
    priority: 'high',
    category: 'Work',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-1', title: 'Verify inline edit capability', completed: true },
      { id: 'sub-2', title: 'Check pending and completed list count indicators', completed: true },
      { id: 'sub-3', title: 'Ensure localStorage persistence works on refresh', completed: false },
    ],
    estimatedMinutes: 25,
  },
  {
    id: 'demo-2',
    title: 'Set up dark mode theme and custom color palette',
    description: 'Tailored with soft slate accents, accessible high contrast, and smooth animations.',
    completed: true,
    priority: 'medium',
    category: 'Personal',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    subtasks: [],
    estimatedMinutes: 15,
  },
  {
    id: 'demo-3',
    title: 'Organize daily priorities and complete task checklist',
    description: 'Test marking tasks complete, inline editing, and filter tools.',
    completed: false,
    priority: 'high',
    category: 'Urgent',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    dueDate: new Date().toISOString().split('T')[0],
    subtasks: [],
    estimatedMinutes: 10,
  },
  {
    id: 'demo-4',
    title: 'Explore Focus Timer mode for uninterrupted productivity',
    description: 'Use the built-in pomodoro countdown for deep task execution.',
    completed: false,
    priority: 'low',
    category: 'Learning',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    subtasks: [],
    estimatedMinutes: 30,
  },
];

export function loadStoredTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DEMO_TASKS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Error loading tasks from localStorage', e);
  }
  return INITIAL_DEMO_TASKS;
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks to localStorage', e);
  }
}

export function loadStoredTheme(): 'light' | 'dark' | 'system' {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch (e) {
    // ignore
  }
  return 'system';
}

export function saveStoredTheme(theme: 'light' | 'dark' | 'system'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // ignore
  }
}

export function formatTimestamp(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24 && date.getDate() === now.getDate()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function calculateStats(tasks: Task[]): TaskStats {
  const total = tasks.length;
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const pending = pendingTasks.length;
  const completed = completedTasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  let totalSubtasks = 0;
  let completedSubtasks = 0;
  tasks.forEach((t) => {
    totalSubtasks += t.subtasks.length;
    completedSubtasks += t.subtasks.filter((s) => s.completed).length;
  });

  const highPriorityPending = pendingTasks.filter((t) => t.priority === 'high').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const overdueCount = pendingTasks.filter((t) => t.dueDate && t.dueDate < todayStr).length;

  return {
    total,
    pending,
    completed,
    completionRate,
    totalSubtasks,
    completedSubtasks,
    highPriorityPending,
    overdueCount,
  };
}

export function filterAndSortTasks(tasks: Task[], options: FilterOptions): Task[] {
  let filtered = [...tasks];

  // Search filter
  if (options.searchQuery.trim()) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query)) ||
        t.category.toLowerCase().includes(query) ||
        t.subtasks.some((s) => s.title.toLowerCase().includes(query))
    );
  }

  // Priority filter
  if (options.priority !== 'all') {
    filtered = filtered.filter((t) => t.priority === options.priority);
  }

  // Category filter
  if (options.category !== 'all') {
    filtered = filtered.filter((t) => t.category === options.category);
  }

  // Sorting
  filtered.sort((a, b) => {
    if (options.sortBy === 'createdAtDesc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (options.sortBy === 'createdAtAsc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (options.sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    if (options.sortBy === 'priority') {
      const pWeight = { high: 3, medium: 2, low: 1 };
      return pWeight[b.priority] - pWeight[a.priority];
    }
    if (options.sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return 0;
  });

  return filtered;
}
