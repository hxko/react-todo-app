import React, { useEffect, useState } from 'react';
import {
  TodoFilter,
  FilterType,
  TodoSearch,
  TodoList,
  DeleteCompleted,
  DeleteAllTodos
} from '.';
import { useTodoContext } from '../context/TodoContext';

export const TodoControls: React.FC = () => {
  const { todos } = useTodoContext(); // Get todos from context
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false); // State for visibility fade-in effect

  // Filter todos based on the current filter and search query
  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    // Set visibility based on the presence of todos
    setIsVisible(todos.length > 0);
  }, [todos.length]);

  return (
    <div className={`todo-controls ${isVisible ? 'fade-in' : ''}`}>
      <div style={{ display: 'flex', gap: "1em", margin: '20px 0' }}>
        <DeleteCompleted />
        <DeleteAllTodos />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoFilter currentFilter={filter} onChange={setFilter} />
      </div>
      <TodoList todos={filteredTodos} /> {/* Pass filtered todos to TodoList */}
    </div>
  );
};