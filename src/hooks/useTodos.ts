import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType, SortType } from '../types/todo';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const { user, token, loading: authLoading } = useAuth();

  const fetchTodos = useCallback(async () => {
    if (authLoading || !user || !token) {
        setTodos([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/todos');
      const todosWithDates = response.data.map((todo: any) => ({
        ...todo,
        id: todo._id,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
      setTodos(todosWithDates);
      // Removed toast.success here as it might be annoying on every load
    } catch (error: any) { // Type the error as 'any' for easier access to properties like response.status
      // Only show toast.error if the response status is not 401 (handled by login redirect)
      // or if it's not due to initial auth check.
      // And only if it's a real network/server error that means data couldn't be loaded.
      if (
          !authLoading && // Authentication check is complete
          user && token && // User is supposed to be authenticated
          (error.response && error.response.status !== 401) // Not a 401, which might be handled by AuthContext
          // or a general network error (no error.response)
      ) {
          console.error('Failed to load todos after successful auth:', error);
          toast.error('Failed to load todos');
      } else if (!error.response) { // Generic network error (e.g., no internet, backend completely down)
          console.error('Network error or backend unreachable when fetching todos:', error);
          toast.error('Failed to load todos: Network or Server Issue');
      }
    } finally {
      setLoading(false);
    }
  }, [user, token, authLoading]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ... (rest of your useTodos hook code remains the same)

  // All other functions (addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted, generateSubtasks)
  // and returned values remain the same as in your previous useTodos.ts file.

  const addTodo = async (text: string, priority: Todo['priority'] = 'medium', category: string = 'General', dueDate?: Date) => {
    try {
      const response = await axios.post('/todos', {
        text: text.trim(),
        priority,
        category,
        dueDate,
      });

      const newTodo = {
        ...response.data,
        id: response.data._id,
        createdAt: new Date(response.data.createdAt),
        dueDate: response.data.dueDate ? new Date(response.data.dueDate) : undefined,
      };

      setTodos(prev => [newTodo, ...prev]);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await axios.put(`/todos/${id}`, {
        completed: !todo.completed
      });

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      
      toast.success(todo.completed ? 'Task marked as incomplete' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await axios.put(`/todos/${id}`, updates);
      
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? {
            ...todo,
            ...updates,
            dueDate: updates.dueDate ? new Date(updates.dueDate) : todo.dueDate
          } : todo
        )
      );
      
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const clearCompleted = async () => {
    try {
      await axios.delete('/todos/completed/clear');
      setTodos(prev => prev.filter(todo => !todo.completed));
      toast.success('Completed tasks cleared!');
    } catch (error) {
      toast.error('Failed to clear completed tasks');
    }
  };

  const generateSubtasks = async (todoId: string, taskText: string) => {
    try {
      const response = await axios.post('/ai/subtasks', {
        todoId,
        taskText
      });

      if (response.data.todo) {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === todoId ? {
              ...todo,
              subtasks: response.data.todo.subtasks
            } : todo
          )
        );
        toast.success('Subtasks generated successfully!');
      }
    } catch (error) {
      toast.error('Failed to generate subtasks');
    }
  };

  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      
      if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'created':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    overdue: todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      todo.dueDate < new Date()
    ).length,
  };

  return {
    todos: filteredAndSortedTodos,
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
  };
};