import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TodoProvider } from './context/TodoContext'; // Import the context provider


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
)
