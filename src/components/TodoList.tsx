import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Array<{ id: string; title: string; completed: boolean }>; // Adjust the type as necessary
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <h1>Tasks</h1>
      <ul className="list">
        {todos.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          todos.map(todo => (
            <TodoItem key={todo.id} {...todo} />
          ))
        )}
      </ul>
    </>
  );
};

export default TodoList;
