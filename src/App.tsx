import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import './styles.css';
import { useTodoContext } from './context/TodoContext';
import { useAuth } from './context/AuthContext';
import { TodoForm, ToggleDarkMode, ColorPicker, TodoControls, LoginForm } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainAppContent = () => {
  const { todos } = useTodoContext();
  const { logout } = useAuth();

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
      {todos.length > 0 && <TodoControls />}
    </main>
  );
};

const LoadingScreen = () => (
  <div className="loading-container">
    <div className="spinner" />
    <p>Loading application...</p>
  </div>
);

export default function App() {
  const { user, loading, authInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && authInitialized) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [user, loading, authInitialized, navigate]);

  if (!authInitialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            loading ? <LoadingScreen /> :
              user ? <MainAppContent /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}