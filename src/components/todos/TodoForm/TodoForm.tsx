import React from 'react';
import { useTodoForm } from './useTodoForm';

export const TodoForm: React.FC = () => {
  const { inputValue, handleInput, handleSubmit } = useTodoForm();

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"><h3 style={{ marginBottom: 0 }}>Enter your Tasks</h3></label>
        <input
          value={inputValue}
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