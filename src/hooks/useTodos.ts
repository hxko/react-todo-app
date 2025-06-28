// src/hooks/useTodos.js
import { useState, useEffect, useCallback } from 'react';
import { TodoItemTypes } from '../types/TodoItemTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api/todos';

const useTodos = () => {
  const { user } = useAuth(); // Get the user from Auth context
  const [todos, setTodos] = useState<TodoItemTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Show loading toast
  const showLoadingToast = (message: string) => {
    return toast.loading(message, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) as string;
  };

  // Update toast to success/error
  const updateToast = (id: string, type: 'success' | 'error', message: string) => {
    toast.update(id, {
      render: message,
      type,
      isLoading: false,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to get headers with the token
  const getHeaders = async () => {
    const token = await user?.getIdToken();

    return {
      'Authorization': `Bearer ${token}`, // Include the token in the headers
      'Content-Type': 'application/json',
    };
  };

  // Memoized fetch function
  const fetchUserTodos = useCallback(async () => {
    if (!user) return; // Exit if user is not authenticated

    setLoading(true);
    setError(null);
    const toastId = showLoadingToast('Loading todos...');

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: await getHeaders(),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch todos (${response.status})`);
      }
      const userTodos: TodoItemTypes[] = await response.json();
      setTodos(userTodos);
      updateToast(toastId, 'success', 'Todos loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch todos';
      setError(message);
      updateToast(toastId, 'error', message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add a new todo with optimistic updates
  const addTodo = async (title: string) => {
    if (!title.trim()) {
      toast.error('Todo title cannot be empty');
      return;
    }

    const toastId = showLoadingToast('Adding todo...');

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({
          title,
          completed: false,
          userId: user?.uid
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo (${response.status})`);
      }

      const savedTodo = await response.json();
      setTodos(current => [...current, savedTodo]); // Add the server-created todo
      updateToast(toastId, 'success', 'Todo added successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add todo';
      setError(message);
      updateToast(toastId, 'error', message);
      console.error('Error adding todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const toastId = showLoadingToast('Deleting todo...');
    setTodos(current => current.filter(todo => todo._id !== id));

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: await getHeaders(), // Use the headers from the function
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo (${response.status})`);
      }
      updateToast(toastId, 'success', 'Todo deleted successfully');
    } catch (err) {
      fetchUserTodos();
      const message = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(message);
      updateToast(toastId, 'error', message);
      console.error('Error deleting todo:', err);
    }
  };

  // Update a todo
  const updateTodo = async (id: string, title: string, completed: boolean) => {
    setTodos(current => current.map(todo => todo._id === id ? { ...todo, title, completed } : todo));

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: await getHeaders(), // Use the headers from the function
        body: JSON.stringify({ title, completed }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo (${response.status})`);
      }
    } catch (err) {
      fetchUserTodos();
      const message = err instanceof Error ? err.message : 'Failed to update todo';
      setError(message);
      console.error('Error updating todo:', err);
    }
  };

  useEffect(() => {
    fetchUserTodos();
  }, [fetchUserTodos]);

  return {
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    loading,
    error,
    refetchTodos: fetchUserTodos
  };
};

export default useTodos;
