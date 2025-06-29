// src/components/todos/TodoList/useTodoList.ts
import { useState } from 'react';
import { useTodoContext } from '@context/TodoContext';
import type { FilterType } from './TodoList.types';

export const useTodoList = () => {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    filteredTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery
  };
};