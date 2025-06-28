import React from 'react';
import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext(); // Use context
  const [inputValue, setInputValue] = useState(''); // Local state for input value

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value); // Update the input value
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addTodo(inputValue); // Use addTodo from context
      setInputValue(""); // Reset the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"><h3 style={{ marginBottom: 0 }}>Enter your Tasks</h3></label>
        <input
          value={inputValue} // Use newTodoTitle from context
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

