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

  // Define the onDrop function
  const onDrop = (id: string) => {
    // Implement your logic for handling the drop event
    console.log(`Dropped item with id: ${id}`);
  };

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

      <TodoList
        todos={todos}
        searchQuery={searchQuery}
        filter={filter}
        onDrop={onDrop} // Pass the onDrop function as a prop
      />
    </main>
  );
};
