import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Todo } from '../../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onGenerateSubtasks?: (todoId: string, taskText: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onGenerateSubtasks,
}) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500 text-xs sm:text-sm max-w-sm">
          You're all caught up! Add a new task to get started or try the AI assistant for suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onGenerateSubtasks={onGenerateSubtasks}
          />
        ))}
      </div>
    </div>
  );
};