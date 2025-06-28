// src/App.tsx
import { Route, Routes, Navigate } from 'react-router';
import './styles.css';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import TodoAppContent from './TodoAppContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoAppContent />
            </ProtectedRoute>
          }
        />
        {/* Add a catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
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