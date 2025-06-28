// src/components/todos/TodoList/TodoList.types.ts
export type FilterType = 'all' | 'active' | 'completed';

export interface TodoListProps {
  todos: Array<{
    _id: string;
    title: string;
    completed: boolean;
  }>;
}