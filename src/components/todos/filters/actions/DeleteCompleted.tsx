import React from 'react';
import { useTodoContext } from '@context/TodoContext';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DeleteCompleted: React.FC = () => {
  const { todos, setTodos } = useTodoContext();

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const hasTodos = todos.length > 0;

  if (!hasTodos) {
    return null; // Don't render button if no todos
  }

  return (
    <button
      onClick={deleteCompleted}
      className="btn secondary"
      aria-label="Delete all completed tasks"
    >
      <RiDeleteBinLine /> Delete All Completed
    </button>
  );
};