// DeleteAllTodos.tsx
import React from 'react';
import { useTodoContext } from '../../../../context/TodoContext';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DeleteAllTodos: React.FC = () => {
  const { setTodos } = useTodoContext();

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]); // Reset the todos to an empty array
    }
  };

  return (
    <button className="btn secondary" onClick={handleDeleteAll}>
      <RiDeleteBinLine /> Delete All
    </button>
  );
};

