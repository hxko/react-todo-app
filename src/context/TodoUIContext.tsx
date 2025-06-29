// src/context/TodoUIContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTodoContext } from './TodoContext';

type FilterType = 'all' | 'active' | 'completed';

interface TodoUIContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  onDrop: (draggedId: string, droppedId: string) => void;
}

const TodoUIContext = createContext<TodoUIContextType | undefined>(undefined);

export const useTodoUI = (): TodoUIContextType => {
  const context = useContext(TodoUIContext);
  if (!context) {
    throw new Error('useTodoUI must be used within a TodoUIProvider');
  }
  return context;
};

export const TodoUIProvider = ({ children }: { children: ReactNode }) => {
  const { todos, setTodos } = useTodoContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const onDrop = (draggedId: string, droppedId: string) => {
    if (draggedId === droppedId) return;

    setTodos(currentTodos => {
      const draggedIndex = currentTodos.findIndex(t => t._id === draggedId);
      const droppedIndex = currentTodos.findIndex(t => t._id === droppedId);

      if (draggedIndex === -1 || droppedIndex === -1) return currentTodos;

      const newTodos = [...currentTodos];
      const [removed] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(droppedIndex, 0, removed);

      return newTodos;
    });
  };

  return (
    <TodoUIContext.Provider
      value={{ searchQuery, setSearchQuery, filter, setFilter, onDrop }}
    >
      {children}
    </TodoUIContext.Provider>
  );
};