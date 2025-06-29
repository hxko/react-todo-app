import { render, screen } from '@testing-library/react';
import TodoList from './To./todos/TodoList/TodoList/ 
import { TodoProvider } from '@context/TodoContext'; // Adjust the import based on your file structure
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
  const todos = [
    { id: "1", title: 'Learn React', completed: false },
    { id: "2", title: 'Learn Testing', completed: false },
  ];

  const renderTodoList = (customTodos = todos) => {
    return render(
      <TodoProvider>
        <TodoList todos={customTodos} />
      </TodoProvider>
    );
  };

  test('renders todo list', () => {
    renderTodoList();

    const todoItem1 = screen.getByText(/learn react/i);
    const todoItem2 = screen.getByText(/learn testing/i);

    expect(todoItem1).toBeInTheDocument();
    expect(todoItem2).toBeInTheDocument();
  });

  test('renders completed todos correctly', () => {
    const completedTodos = [
      { id: "1", title: 'Learn React', completed: true },
      { id: "2", title: 'Learn Testing', completed: false },
    ];

    const { container } = renderTodoList(completedTodos);

    // Get the completed todo item by its class name
    const completedTodo = container.querySelector('.todo-item.completed');
    expect(completedTodo).toBeInTheDocument();
  });


});
