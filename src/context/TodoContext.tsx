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
  const userId = '12345'; // Replace with actual user ID
  const { todos, setTodos, addTodo, deleteTodo, updateTodo } = useTodos(userId); // Use the useTodos hook

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, darkMode, setDarkMode, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
