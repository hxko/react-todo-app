import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // <-- Add this import
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Router> {/* <-- Wrap everything with Router */}
        <AuthProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}