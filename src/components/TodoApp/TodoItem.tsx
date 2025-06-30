import React from 'react';
import { Check, Clock, MoreVertical, Edit2, Trash2, Sparkles } from 'lucide-react';
import { Todo } from '../../types/todo';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onGenerateSubtasks?: (todoId: string, taskText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onGenerateSubtasks,
}) => {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const isOverdue = todo.dueDate && !todo.completed && todo.dueDate < new Date();
  const isDueSoon = todo.dueDate && !todo.completed && 
    todo.dueDate > new Date() && 
    todo.dueDate <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Due yesterday';
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={cn(
      "group bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all duration-200 w-full",
      todo.completed && "opacity-60",
      isOverdue && "border-red-300 bg-red-50"
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            todo.completed
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-gray-300 hover:border-blue-500"
          )}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className={cn(
                "text-gray-900 font-medium",
                todo.completed && "line-through text-gray-500"
              )}>
                {todo.text}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium border",
                  getPriorityColor(todo.priority)
                )}>
                  {todo.priority}
                </span>
                
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {todo.category}
                </span>

                {todo.dueDate && (
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium border",
                    isOverdue 
                      ? "bg-red-100 text-red-800 border-red-200"
                      : isDueSoon
                      ? "bg-orange-100 text-orange-800 border-orange-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  )}>
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDueDate(todo.dueDate)}
                  </span>
                )}
              </div>

              {/* Subtasks */}
              {todo.subtasks && todo.subtasks.length > 0 && (
                <div className="mt-3 space-y-1 text-xs sm:text-sm">
                  {todo.subtasks.map((subtask, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className={cn(
                        "w-3 h-3 rounded border flex items-center justify-center",
                        subtask.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      )}>
                        {subtask.completed && <Check className="w-2 h-2 text-white" />}
                      </div>
                      <span className={cn(
                        "text-gray-600",
                        subtask.completed && "line-through"
                      )}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(todo)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                {onGenerateSubtasks && (
                  <DropdownMenuItem onClick={() => onGenerateSubtasks(todo.id, todo.text)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Subtasks
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onDelete(todo.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};