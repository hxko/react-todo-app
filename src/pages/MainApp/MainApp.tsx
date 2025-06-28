// MainApp.tsx
import { useState } from 'react';
import { TodoForm, TodoList, TodoControls } from '../../components/todos';
import { ToggleDarkMode, ColorPicker } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useTodoContext } from '../../context/TodoContext';

export const MainApp = () => {
  const { logout } = useAuth();
  const { todos } = useTodoContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Optional: Filtered todos based on search/filter state
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all'
      || (filter === 'active' && !todo.completed)
      || (filter === 'completed' && todo.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <main>
      <div className="app-header">
        <div className="header-controls">
          <ToggleDarkMode />
          <ColorPicker />
          <button onClick={logout} className="logout-btn">Sign Out</button>
        </div>
      </div>

      <TodoForm />

      <TodoControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList todos={filteredTodos} />
    </main>
  );
};
