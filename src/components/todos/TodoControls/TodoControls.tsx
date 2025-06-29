// src/components/todos/TodoControls.tsx
import { TodoSearch } from '@components/todos/filters/TodoSearch';
import { TodoFilter } from '@components/todos/filters/TodoFilter';
import { useTodoUI } from '@context/TodoUIContext';

export const TodoControls = () => {
  const { searchQuery, setSearchQuery, filter, setFilter } = useTodoUI();

  return (
    <div style={{ display: 'flex', marginTop: '20px', gap: '1em' }}>
      <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TodoFilter currentFilter={filter} onChange={setFilter} />
    </div>
  );
};