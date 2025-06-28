import React from 'react';
import { useTodoContext } from "../../../context/TodoContext";
import { TodoItem } from "../TodoItem";
import { AnimatePresence } from 'framer-motion';

export const TodoList = () => {
  const { todos, setTodos } = useTodoContext();

  const handleDrop = (draggedId: string, droppedId: string) => {
    if (draggedId === droppedId) return;

    setTodos(current => {
      const draggedIndex = current.findIndex(t => t._id === draggedId);
      const droppedIndex = current.findIndex(t => t._id === droppedId);
      if (draggedIndex === -1 || droppedIndex === -1) return current;

      const newTodos = [...current];
      const [removed] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(droppedIndex, 0, removed);
      return newTodos;
    });
  };

  return (
    <div className="todo-list">
      <AnimatePresence initial={false}>
        {todos.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          <ul className="list">
            {todos.map(todo => (
              <TodoItem
                key={todo._id}
                {...todo}
                onDrop={handleDrop}
              />
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
};