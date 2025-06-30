import React from 'react';
import { Search, Plus, Filter, SortAsc, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { FilterType, SortType } from '../../types/todo';
import { useAuth } from '../../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

interface TodoHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  onAddClick: () => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  onAddClick,
  stats,
}) => {
  const { user, logout } = useAuth();

  const filterLabels: Record<FilterType, string> = {
    all: 'All Tasks',
    active: 'Active',
    completed: 'Completed',
  };

  const sortLabels: Record<SortType, string> = {
    created: 'Date Created',
    priority: 'Priority',
    dueDate: 'Due Date',
    alphabetical: 'Alphabetical',
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Welcome back, {user?.username}! • {stats.active} active, {stats.completed} completed
            {stats.overdue > 0 && (
              <span className="text-red-600 ml-2">• {stats.overdue} overdue</span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={onAddClick} className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <User className="w-4 h-4 mr-2" />
                {user?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <User className="w-4 h-4 mr-2" />
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Filter className="w-4 h-4 mr-2" />
              {filterLabels[filter]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(filterLabels).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onFilterChange(key as FilterType)}
                className={filter === key ? 'bg-blue-50 text-blue-700' : ''}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <SortAsc className="w-4 h-4 mr-2" />
              {sortLabels[sortBy]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(sortLabels).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onSortChange(key as SortType)}
                className={sortBy === key ? 'bg-blue-50 text-blue-700' : ''}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};