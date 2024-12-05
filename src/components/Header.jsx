import { useState, useEffect } from 'react';
import './header.css';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="bg-gray-900 dark:bg-black text-white py-4 shadow-lg sticky top-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400">PizzAmore</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-gray-700 dark:bg-gray-600 text-white px-3 py-1 rounded-md"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}
