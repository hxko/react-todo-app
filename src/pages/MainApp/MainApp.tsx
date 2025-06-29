import { TodoForm, TodoList, TodoControls } from '@components/todos';
import { ToggleDarkMode, ColorPicker } from '@components';
import { useAuth } from '@context/AuthContext';

import { TodoUIProvider } from '@context/TodoUIContext';

export const MainApp = () => {
  const { logout } = useAuth();

  return (
    <TodoUIProvider>
      <main>
        <div className="app-header">
          <div className="header-controls">
            <ToggleDarkMode />
            <ColorPicker />
            <button onClick={logout} className="logout-btn">Sign Out</button>
          </div>
        </div>

        <TodoForm />
        <TodoControls />
        <TodoList />
      </main>
    </TodoUIProvider>
  );
};