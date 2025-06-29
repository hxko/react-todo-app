// src/components/todos/TodoControls/useTodoControls.ts
import { useTodoContext } from '@context/TodoContext';

export const useTodoControls = () => {
  const { todos } = useTodoContext();
  return { hasTodos: todos.length > 0 };
};