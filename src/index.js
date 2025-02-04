import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 부분
import './index.css';
import App from './App';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root')); // 변경된 부분

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
