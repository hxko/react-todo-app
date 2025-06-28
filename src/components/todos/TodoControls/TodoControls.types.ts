// src/components/todos/TodoControls/TodoControls.types.ts
export type FilterType = 'all' | 'active' | 'completed';

export interface TodoControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}