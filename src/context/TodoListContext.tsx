// context/TodoListContext.tsx
import React, { createContext, useContext, useState } from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoListContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  handleDrop: (draggedId: string, droppedId: string) => void;
}

const TodoListContext = createContext<TodoListContextType | undefined>(undefined);

export const TodoListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleDrop = (draggedId: string, droppedId: string) => {
    // Implement your drop logic here
    console.log(`Item ${draggedId} dropped on ${droppedId}`);
  };

  return (
    <TodoListContext.Provider value={{ searchQuery, setSearchQuery, filter, setFilter, handleDrop }}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error('useTodoList must be used within a TodoListProvider');
  }
  return context;
};