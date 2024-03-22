import TodoItem from './TodoItem'
import { useTodoContext } from '../context/TodoContext'

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <ul className="list">
      {todos.length === 0 && "You don't have any tasks for today🥳"}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul >
  )
}

export default TodoList