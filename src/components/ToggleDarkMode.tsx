import { useEffect } from 'react';
import { useTodoContext } from '@context/TodoContext';
import "react-toggle/style.css";
import Toggle from 'react-toggle';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ToggleDarkMode: React.FC = () => {

  const { darkMode, setDarkMode } = useTodoContext();

  // Determine initial dark mode preference
  useEffect(() => {
    document.body.classList.add('light-mode') // TODO: not perfect the logic for preventing the flickering from light to dark mode if browser prefers dark

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    darkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  }, [darkMode]);

  const handleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  return (
    <label>
      <Toggle
        checked={darkMode ? true : false}
        className='toggle-gray custom-toggle'
        icons={{
          checked: <FaSun size={12} />,
          unchecked: <FaMoon fill="#E6E6E6" size={10} />,
        }}
        onChange={handleDarkMode}
      />
    </label>
  );
};

