
export interface TodoItemTypes {
  id: string;
  title: string;
  completed: boolean;
}

// TodoContext context Provider
export interface TodoContextType {
  todos: TodoItemTypes[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemTypes[]>>;
  newTodo: TodoItemTypes['id'];
  setNewTodo: React.Dispatch<React.SetStateAction<TodoItemTypes['id']>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<TodoContextType['darkMode']>>
  // editedTitle: string;
  // setEditedTitle: React.Dispatch<React.SetStateAction<TodoContextType['editedTitle']>>;
}



// TodoProvider children
export interface TodoProviderProps {
  children: React.ReactNode;
}