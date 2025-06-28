import React, { useEffect, useState, ChangeEvent } from 'react';

export const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>('#5cd1a6'); // default fallback

  // On mount, load saved color from localStorage or use default
  useEffect(() => {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
      setColor(savedColor);
      document.documentElement.style.setProperty('--primary-color', savedColor);
      // Optional: update dependent colors if your CSS doesn't handle color-mix automatically
    } else {
      document.documentElement.style.setProperty('--primary-color', color);
    }
  }, []);

  // On color change, update CSS and save to localStorage
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    document.documentElement.style.setProperty('--primary-color', newColor);
    localStorage.setItem('primaryColor', newColor);
  }

  return (
    <div className="color-picker-wrapper">
      <label htmlFor="color-picker" style={{ marginRight: '0.5rem' }}>
        Choose Color:
      </label>
      <input
        type="color"
        id="color-picker"
        value={color}
        onChange={handleColorChange}
        style={{ cursor: 'pointer' }}
        aria-label="Select primary color"
      />
    </div>
  );
};


