import React from 'react';

interface TodoSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TodoSearch: React.FC<TodoSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{

        border: '1px solid var(--primary-color)',
      }}
      aria-label="Search todos"
    />
  );
};

export default TodoSearch;
