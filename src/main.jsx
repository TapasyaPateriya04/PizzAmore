// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Add your styles
import App from './App.jsx';
import './styles/global.css';  // Add any global styles

// Rendering the App component inside the root element
const root = document.getElementById('root');
const reactRoot = createRoot(root);  // Create root for React 18
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
