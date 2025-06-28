import { TodoItem } from './TodoItem';
import { TodoItemTypes } from '../types/TodoItemTypes';
import { AnimatePresence } from 'framer-motion';

interface TodoListProps {
  todos: TodoItemTypes[]
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <h1>Tasks</h1>
      <ul className="list">
        {todos.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          <AnimatePresence>
            {todos.map(todo => (
              <TodoItem key={todo._id} {...todo} />
            ))}
          </AnimatePresence>
        )}
      </ul>
    </>
  );
};