import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoForm: React.FC = () => {
  const { setNewTodoTitle, newTodoTitle, addTodo } = useTodoContext(); // Use context

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodoTitle(e.target.value); // Update the new todo title
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTodoTitle.trim() !== "") {
      addTodo(newTodoTitle); // Use addTodo from context
      setNewTodoTitle(""); // Reset the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"><h3 style={{ marginBottom: 0 }}>Enter your Tasks</h3></label>
        <input
          value={newTodoTitle} // Use newTodoTitle from context
          onChange={handleInput}
          type="text"
          id="item"
          placeholder='Enter your Task'
        />
      </div>
      <button type="submit" className="btn">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
