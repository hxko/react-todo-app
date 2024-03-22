import { createContext, useContext, useState, useEffect } from 'react';
import { TodoContextType, TodoProviderProps, TodoItemTypes } from '../types/TodoItemTypes';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const [todos, setTodos] = useState<TodoItemTypes[]>(
    // get todos from localStorage
    () => {
      const localTodos = localStorage.getItem("TodoItems");
      if (localTodos == null) return [];
      return JSON.parse(localTodos);
    }
  );

  // Set local storage when todos change
  useEffect(() => {
    localStorage.setItem("TodoItems", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoContext.Provider
      value={{ todos, setTodos, newTodo, setNewTodo, darkMode, setDarkMode }}
    >
      {children}
    </TodoContext.Provider>
  );
};