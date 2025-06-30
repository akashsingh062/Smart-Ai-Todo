import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { AIAssistant } from '../AI/AIAssistant';
import { Todo } from '../../types/todo';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export const TodoApp: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    generateSubtasks,
    stats,
    loading,
  } = useTodos();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = (text: string, priority: Todo['priority'], category: string, dueDate?: Date) => {
    addTodo(text, priority, category, dueDate);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    updateTodo(id, updates);
    setEditingTodo(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center text-sm sm:text-base">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <TodoHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddClick={() => setIsFormOpen(true)}
          stats={stats}
        />

        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={handleEditTodo}
                onGenerateSubtasks={generateSubtasks}
              />

              {stats.completed > 0 && (
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCompleted}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Completed ({stats.completed})
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="w-full lg:w-80 mt-6 lg:mt-0">
            <AIAssistant />
          </div>
        </div>
      </div>

      <TodoForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddTodo}
        editingTodo={editingTodo}
        onUpdate={handleUpdateTodo}
      />
    </div>
  );
};