// src/components/todos/TodoList.tsx
import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTodoContext } from '@context/TodoContext';
import { useTodoUI } from '@context/TodoUIContext';
import { TodoItem } from '@components/todos/TodoItem';

export const TodoList = () => {
  const { todos } = useTodoContext();
  const { searchQuery, filter } = useTodoUI();

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
                title={todo.title}
                completed={todo.completed}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};