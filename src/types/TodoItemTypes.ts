// TodoItemTypes.ts
export interface TodoItemTypes {
  _id: string; // Unique identifier for the todo item
  title: string; // Title of the todo item
  completed: boolean; // Completion status of the todo item
}

// TodoContextType.ts
export interface TodoContextType {
  todos: TodoItemTypes[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemTypes[]>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string, completed: boolean) => Promise<void>;
}

// TodoProviderProps.ts
export interface TodoProviderProps {
  children: React.ReactNode; // Children components to be rendered within the provider
}
