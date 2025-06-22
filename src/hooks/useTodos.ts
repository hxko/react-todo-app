// useTodos.ts
import { useState, useEffect } from 'react';
import { TodoItemTypes } from '../types/TodoItemTypes';

const useTodos = (userId: string) => {
  const [todos, setTodos] = useState<TodoItemTypes[]>([]);

  // Fetch user's todos
  const fetchUserTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const userTodos: TodoItemTypes[] = await response.json();
      setTodos(userTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async (title: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userId }),
      });
      if (!response.ok) throw new Error('Failed to save todo');
      const savedTodo: TodoItemTypes = await response.json();
      setTodos((currentTodos) => [...currentTodos, savedTodo]);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');

      // Update the state immediately after the API call
      setTodos((currentTodos) => currentTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // useTodos.ts
  const updateTodo = async (id: string, title: string, completed: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed }), // Include completed state
      });
      if (!response.ok) throw new Error('Failed to update todo');

      // Update the local state
      setTodos((currentTodos) =>
        currentTodos.map(todo => (todo._id === id ? { ...todo, title, completed } : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  useEffect(() => {
    fetchUserTodos();
  }, [userId]);

  return { todos, setTodos, addTodo, deleteTodo, updateTodo };
};

export default useTodos;
