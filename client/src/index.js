import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import antd styles after our Tailwind CSS to ensure proper precedence
import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
