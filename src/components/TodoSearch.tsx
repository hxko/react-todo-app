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
        marginBottom: '1rem',
        padding: '0.5rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid var(--primary-color)',
      }}
      aria-label="Search todos"
    />
  );
};

export default TodoSearch;
