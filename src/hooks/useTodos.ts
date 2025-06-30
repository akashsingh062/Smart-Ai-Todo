import { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { Todo, FilterType, SortType } from '../types/todo';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext'; // Ensure useAuth is imported

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Get user, token, and the authentication loading state from AuthContext
  const { user, token, loading: authLoading } = useAuth(); 

  // Memoize the fetchTodos function to prevent unnecessary re-creations
  const fetchTodos = useCallback(async () => {
    // Only attempt to fetch if authentication is no longer loading AND a user and token are present.
    // This prevents fetching before the auth context has fully initialized or after logout.
    if (authLoading || !user || !token) {
        setTodos([]); // Clear todos if user logs out or is not authenticated
        setLoading(false); 
        return;
    }

    setLoading(true); // Indicate that we are loading todos
    try {
      const response = await axios.get('/todos');
      const todosWithDates = response.data.map((todo: any) => ({
        ...todo,
        id: todo._id,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
      setTodos(todosWithDates);
    } catch (error) {
      // Only show an error toast if it's a genuine failure *after* we expect auth to be ready.
      // This prevents toasts from initial unauthenticated attempts during app startup.
      if (!authLoading && user && token) { // Check if we should genuinely report this error
        console.error('Failed to load todos:', error); // Log the full error to console for debugging
        toast.error('Failed to load todos');
      }
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  }, [user, token, authLoading]); // Dependencies for useCallback: re-create fetchTodos if user, token, or authLoading changes

  // Use useEffect to call fetchTodos whenever the memoized fetchTodos function changes
  // (which happens when its dependencies: user, token, authLoading change)
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // Dependency for useEffect is the memoized fetchTodos function itself


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