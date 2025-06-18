// DeleteAllTodos.tsx
import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { RiDeleteBinLine } from 'react-icons/ri';
const DeleteAllTodos: React.FC = () => {
  const { setTodos } = useTodoContext(); // Assuming you have a method to set todos in your context

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]); // Reset the todos to an empty array
    }
  };

  return (
    <button className="btn secondary" onClick={handleDeleteAll} style={{ marginRight: '1rem', marginLeft: '1rem' }}>
      <RiDeleteBinLine /> Delete All
    </button>
  );
};

export default DeleteAllTodos;
