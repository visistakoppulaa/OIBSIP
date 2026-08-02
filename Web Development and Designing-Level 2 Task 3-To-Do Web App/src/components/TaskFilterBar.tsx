import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { FilterOptions, FilterPriority, FilterCategory, SortBy, TaskCategory } from '../types';

interface TaskFilterBarProps {
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  totalTaskCount: number;
}

const CATEGORIES: Array<{ id: FilterCategory; label: string }> = [
  { id: 'all', label: 'All Categories' },
  { id: 'General', label: 'General' },
  { id: 'Work', label: 'Work' },
  { id: 'Personal', label: 'Personal' },
  { id: 'Urgent', label: 'Urgent' },
  { id: 'Health', label: 'Health' },
  { id: 'Learning', label: 'Learning' },
];

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  filters,
  onChangeFilters,
  totalTaskCount,
}) => {
  const handleSearchChange = (query: string) => {
    onChangeFilters({ ...filters, searchQuery: query });
  };

  const handleCategoryChange = (cat: FilterCategory) => {
    onChangeFilters({ ...filters, category: cat });
  };

  const handlePriorityChange = (priority: FilterPriority) => {
    onChangeFilters({ ...filters, priority });
  };

  const handleSortChange = (sortBy: SortBy) => {
    onChangeFilters({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onChangeFilters({
      searchQuery: '',
      priority: 'all',
      category: 'all',
      sortBy: 'createdAtDesc',
    });
  };

  const isFiltered =
    filters.searchQuery.trim() !== '' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.sortBy !== 'createdAtDesc';

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 rounded-2xl p-4 mb-6 space-y-3 shadow-xs">
      {/* Top Row: Search + Priority + Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Filter tasks, notes, or subtasks..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 placeholder-stone-400 dark:placeholder-slate-500 focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Priority Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <div className="relative min-w-[120px]">
            <select
              value={filters.priority}
              onChange={(e) => handlePriorityChange(e.target.value as FilterPriority)}
              className="w-full pl-2.5 pr-7 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-white dark:bg-slate-900">All Priorities</option>
              <option value="high" className="bg-white dark:bg-slate-900">High Priority</option>
              <option value="medium" className="bg-white dark:bg-slate-900">Medium Priority</option>
              <option value="low" className="bg-white dark:bg-slate-900">Low Priority</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortBy)}
              className="w-full pl-2.5 pr-7 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="createdAtDesc" className="bg-white dark:bg-slate-900">Newest First</option>
              <option value="createdAtAsc" className="bg-white dark:bg-slate-900">Oldest First</option>
              <option value="dueDate" className="bg-white dark:bg-slate-900">Due Date</option>
              <option value="priority" className="bg-white dark:bg-slate-900">High Priority</option>
              <option value="alphabetical" className="bg-white dark:bg-slate-900">Name (A-Z)</option>
            </select>
          </div>

          {/* Clear Filters button */}
          {isFiltered && (
            <button
              onClick={clearFilters}
              title="Reset all filters"
              className="px-2.5 py-2 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition flex items-center space-x-1 whitespace-nowrap cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 mr-1 flex items-center">
          <Filter className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400" /> Tag:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium text-xs transition cursor-pointer ${
              filters.category === cat.id
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/80 dark:hover:bg-slate-700 border border-stone-200/60 dark:border-slate-700/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
