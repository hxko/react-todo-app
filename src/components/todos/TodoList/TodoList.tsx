import React, { useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { AnimatePresence } from 'framer-motion';
import { TodoItemTypes } from "../../../types/TodoItemTypes";

interface TodoListProps {
  todos: TodoItemTypes[];
  searchQuery: string;
  filter: 'all' | 'active' | 'completed';
  onDrop: (id: string) => void; // Assuming onDrop is a function to handle drop events
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  searchQuery,
  filter,
  onDrop
}) => {
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);
      return matchesSearch && matchesFilter;
    });
  }, [todos, searchQuery, filter]);

  return (
    <div className="todo-list">
      {filteredTodos.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul className="list">
          <AnimatePresence>
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo._id}
                _id={todo._id}
                title={todo.title} // Pass the title prop
                completed={todo.completed} // Pass the completed prop
                onDrop={onDrop} // Pass the onDrop prop
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};
