/**
 * Entry point for the React application
 * 
 * CRITICAL: The CSS import below is essential for Tailwind to work.
 * Make sure './index.css' is imported BEFORE anything else.
 */

import './index.css';  // <-- THIS LINE IS CRITICAL
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
