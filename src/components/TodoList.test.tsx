import { render, screen } from '@testing-library/react';
import TodoList from './TodoList'; // Adjust the import based on your file structure
import { TodoProvider } from '../context/TodoContext'; // Adjust the import based on your file structure
import '@testing-library/jest-dom';

test('renders todo list', () => {
  const todos = [
    { id: "1", title: 'Learn React', completed: false },
    { id: "2", title: 'Learn Testing', completed: false },
  ];

  // Wrap the TodoList in the TodoProvider
  render(
    <TodoProvider>
      <TodoList todos={todos} />
    </TodoProvider>
  );

  const todoItem1 = screen.getByText(/learn react/i);
  const todoItem2 = screen.getByText(/learn testing/i);

  expect(todoItem1).toBeInTheDocument();
  expect(todoItem2).toBeInTheDocument();
});
