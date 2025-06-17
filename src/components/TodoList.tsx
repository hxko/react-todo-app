import { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../context/TodoContext';
import TodoFilter, { FilterType } from './TodoFilter';
import TodoSearch from './TodoSearch';

const TodoList = () => {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  // Filter todos based on the current filter and search query
  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <TodoFilter currentFilter={filter} onChange={setFilter} />
      <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Add TodoSearch here */}
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
