export type PriorityLevel = 'low' | 'medium' | 'high';

export type TaskCategory = 'Work' | 'Personal' | 'Urgent' | 'Health' | 'Learning' | 'General';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: PriorityLevel;
  category: TaskCategory;
  createdAt: string; // ISO string
  completedAt?: string; // ISO string when finished
  dueDate?: string; // YYYY-MM-DD
  subtasks: SubTask[];
  estimatedMinutes?: number;
  elapsedSeconds?: number;
}

export type FilterPriority = 'all' | PriorityLevel;
export type FilterCategory = 'all' | TaskCategory;
export type SortBy = 'createdAtDesc' | 'createdAtAsc' | 'dueDate' | 'priority' | 'alphabetical';

export interface FilterOptions {
  searchQuery: string;
  priority: FilterPriority;
  category: FilterCategory;
  sortBy: SortBy;
}

export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  completionRate: number;
  totalSubtasks: number;
  completedSubtasks: number;
  highPriorityPending: number;
  overdueCount: number;
}
