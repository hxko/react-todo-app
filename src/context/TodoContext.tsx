// src/context/TodoContext.js
import { createContext, useContext, useState } from 'react';
import { TodoContextType, TodoProviderProps } from '../types/TodoItemTypes';
import useTodos from '../hooks/useTodos';

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
  const todosState = useTodos();

  return (
    <TodoContext.Provider value={{ ...todosState, darkMode, setDarkMode }}>
      {children}
    </TodoContext.Provider>
  );
};
