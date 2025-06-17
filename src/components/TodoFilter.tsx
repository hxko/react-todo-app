import React from 'react';
import { RiListUnordered, RiCheckboxCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';

export type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onChange }) => {
  const filters: { label: string; icon: JSX.Element; value: FilterType }[] = [
    { label: 'All', icon: <RiListUnordered size={20} />, value: 'all' },
    { label: 'Active', icon: <RiCheckboxCircleLine size={20} />, value: 'active' },
    { label: 'Completed', icon: <RiCheckboxCircleFill size={20} />, value: 'completed' },
  ];

  return (
    <nav style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', userSelect: 'none' }}>
      {filters.map(({ label, icon, value }) => (
        <div
          key={value}
          onClick={() => onChange(value)}
          style={{
            display: 'flex',
            alignItems: 'center',    // Vertically centers icon and text
            cursor: 'pointer',
            color: currentFilter === value ? 'var(--primary-color)' : '#666',
            userSelect: 'none',
          }}
          title={`${label} tasks`}
        >
          <span style={{ marginRight: 6, display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
};

export default TodoFilter;
