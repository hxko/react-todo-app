// src/components/todos/TodoControls/TodoControls.tsx
import { TodoFilter, TodoSearch } from '../filters';
import { DeleteCompleted, DeleteAllTodos } from '../filters/actions';
import { useTodoControls } from './useTodoControls';
import type { TodoControlsProps } from './TodoControls.types';

export const TodoControls: React.FC<TodoControlsProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter
}) => {
  const { hasTodos } = useTodoControls();

  if (!hasTodos) return null;

  return (
    <div className="todo-controls fade-in">
      <div style={{ display: 'flex', gap: "1em", margin: '20px 0' }}>
        <DeleteCompleted />
        <DeleteAllTodos />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoFilter currentFilter={filter} onChange={setFilter} />
      </div>
    </div>
  );
};