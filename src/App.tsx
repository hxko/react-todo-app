// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './pages/Login';
import { MainApp } from './pages/MainApp';
import { LoadingScreen } from './components/LoadingScreen';

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
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            loading ? <LoadingScreen /> :
              user ? <MainApp /> : <Navigate to="/login" replace />
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