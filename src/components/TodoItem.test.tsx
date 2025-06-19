import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem'; // Corrected import
import { useTodoContext } from '../context/TodoContext'; // Import the hook

// Mock the context
jest.mock('../context/TodoContext', () => ({
  useTodoContext: jest.fn(),
}));

const mockSetTodos = jest.fn();
const mockTodos = [
  { id: '1', title: 'Test Todo', completed: false },
];

const mockUseTodoContext = () => ({
  todos: mockTodos,
  setTodos: mockSetTodos,
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

    expect(mockSetTodos).toHaveBeenCalledWith([{ id: '1', title: 'Updated Todo', completed: false }]);
  });

  test('cancels editing on cancel icon click', () => {
    render(<TodoItem {...mockTodos[0]} />);
    const todoItem = screen.getByText('Test Todo');

    fireEvent.doubleClick(todoItem);
    const cancelIcon = screen.getByTitle('Cancel');
    fireEvent.click(cancelIcon);

    expect(mockSetTodos).not.toHaveBeenCalled();
  });


});
