export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  dueDate?: Date;
  subtasks?: {
    text: string;
    completed: boolean;
  }[];
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'created' | 'priority' | 'dueDate' | 'alphabetical';