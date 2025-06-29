import { useState } from 'react';
import { useTodoContext } from '@context/TodoContext';
import { TodoFormProps } from './TodoForm.types';

export const useTodoForm = (): TodoFormProps => {
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

  return {
    inputValue,
    handleInput,
    handleSubmit,
  };
};