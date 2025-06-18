import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { RiDeleteBinLine } from 'react-icons/ri';

const DeleteCompletedButton: React.FC = () => {
  const { todos, setTodos } = useTodoContext();

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const hasTodos = todos.length > 0;
  const hasCompleted = todos.some(todo => todo.completed);

  if (!hasTodos) {
    return null; // Don't render button if no todos
  }

  return (
    <button
      onClick={deleteCompleted}
      disabled={!hasCompleted}
      className="btn secondary"
      style={{ marginBottom: '1rem' }}
      aria-label="Delete all completed tasks"
    >
      <RiDeleteBinLine /> Delete All Completed
    </button>
  );
};

export default DeleteCompletedButton;
