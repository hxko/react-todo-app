import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem'; // Corrected import
import { useTodoContext } from '../context/TodoContext'; // Import the hook

// Mock the context
jest.mock('../context/TodoContext', () => ({
  useTodoContext: jest.fn(),
}));

const mockSetTodos = jest.fn();
const mockDeleteTodo = jest.fn();
const mockUpdateTodo = jest.fn();
const mockTodos = [
  { _id: '1', title: 'Test Todo', completed: false },
];

const mockUseTodoContext = () => ({
  todos: mockTodos,
  setTodos: mockSetTodos,
  deleteTodo: mockDeleteTodo,
  updateTodo: mockUpdateTodo,
});

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTodoContext as jest.Mock).mockImplementation(mockUseTodoContext);
  });

  test('renders todo item', () => {
    render(<TodoItem {...mockTodos[0]} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('edits todo title on double click', () => {
    render(<TodoItem {...mockTodos[0]} />);
    const todoItem = screen.getByText('Test Todo');

    fireEvent.doubleClick(todoItem);
    const editableTitle = screen.getByText('Test Todo'); // Use getByText to find the editable title
    fireEvent.input(editableTitle, { target: { innerHTML: 'Updated Todo' } });
    fireEvent.keyDown(editableTitle, { key: 'Enter', code: 'Enter' });

    expect(mockUpdateTodo).toHaveBeenCalledWith('1', 'Updated Todo', false);
  });

  test('cancels editing on cancel icon click', () => {
    render(<TodoItem {...mockTodos[0]} />);
    const todoItem = screen.getByText('Test Todo');

    fireEvent.doubleClick(todoItem);
    const cancelIcon = screen.getByTitle('Cancel');
    fireEvent.click(cancelIcon);

    expect(mockSetTodos).not.toHaveBeenCalled();
  });

  test('toggles completion status when clicked', () => {
    render(<TodoItem {...mockTodos[0]} />);
    const checkbox = screen.getByRole('checkbox'); // Assuming you have a checkbox for completion

    fireEvent.click(checkbox);
    expect(mockUpdateTodo).toHaveBeenCalledWith('1', 'Test Todo', true); // Assuming it toggles to completed
  });

  test('deletes todo item when delete icon is clicked', () => {
    render(<TodoItem {...mockTodos[0]} />);
    const deleteIcon = screen.getByTitle('Delete'); // Assuming you have a title for the delete icon

    fireEvent.click(deleteIcon);
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  test('renders completed todo item correctly', () => {
    const completedTodo = { _id: '2', title: 'Completed Todo', completed: true };
    (useTodoContext as jest.Mock).mockImplementation(() => ({
      todos: [completedTodo],
      setTodos: mockSetTodos,
      deleteTodo: mockDeleteTodo,
      updateTodo: mockUpdateTodo,
    }));

    render(<TodoItem {...completedTodo} />);
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked(); // Assuming the checkbox reflects completion
  });
});
