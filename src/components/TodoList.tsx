import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../context/TodoContext';
import TodoFilter, { FilterType } from './TodoFilter';

const TodoList = () => {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <>
      <TodoFilter currentFilter={filter} onChange={setFilter} />
      {filteredTodos.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul className="list">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
