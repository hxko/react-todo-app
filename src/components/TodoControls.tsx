import React, { useState } from 'react';
import TodoFilter, { FilterType } from './TodoFilter';
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';
import { useTodoContext } from '../context/TodoContext';
import DeleteCompleted from './DeleteCompleted'; // Import the DeleteCompleted component
const TodoControls: React.FC = () => {
  const { todos } = useTodoContext(); // Get todos from context
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter todos based on the current filter and search query
  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <DeleteCompleted />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoFilter currentFilter={filter} onChange={setFilter} />
      </div>
      <TodoList todos={filteredTodos} /> {/* Pass filtered todos to TodoList */}
    </div>
  );
};

export default TodoControls;
