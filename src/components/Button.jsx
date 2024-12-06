// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../styles/button.css';

// Button Component with customizable text, styles, and click action
// eslint-disable-next-line react/prop-types
const Button = ({ text, onClick, type = 'primary', size = 'medium' }) => {
  // Base button styles (common across all button types)
  const baseStyles = "py-2 px-6 rounded-lg font-semibold text-center transition duration-300 transform";

  // Button size variations
  const sizeStyles = {
    small: "py-1 px-4 text-sm",
    medium: "py-2 px-6 text-base",
    large: "py-3 px-8 text-lg",
  };

  // Type-based button styles (primary, secondary, etc.)
  const primaryStyles = "bg-red-500 hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800";
  const secondaryStyles = "bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600";
  const outlineStyles = "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-700 dark:text-red-700 dark:hover:bg-red-700 dark:hover:text-white";

  // Conditionally apply button styles
  let buttonStyles;
  if (type === 'secondary') {
    buttonStyles = secondaryStyles;
  } else if (type === 'outline') {
    buttonStyles = outlineStyles;
  } else {
    buttonStyles = primaryStyles; // default to primary
  }

  // Combine size styles
  const sizeClass = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${buttonStyles} ${sizeClass}`}
    >
      {text}
    </button>
  );
};

export default Button;
