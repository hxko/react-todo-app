import { useTodoContext } from '../context/TodoContext';
import { TodoItemTypes } from '../types/TodoItemTypes';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = () => {

  const { setNewTodo, newTodo, setTodos } = useTodoContext();

  const addTodo = (title: TodoItemTypes['title']) => {
    setTodos(currentTodos => (
      [...currentTodos, { id: uuidv4(), title, completed: false }])
    )
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">

        <label htmlFor="item"><h3 style={{ marginBottom: 0 }}>Enter your Tasks for today!📝<span className="success">✔</span></h3></label>
        <input
          value={newTodo}
          onChange={handleInput}
          type="text"
          id="item"
          placeholder='Enter your Task'
        />
      </div>
      <button type="submit" className="btn">
        Add Todo
      </button>
    </form >
  )
}

export default TodoForm