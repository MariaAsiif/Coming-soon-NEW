import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.grid.css';
import './index.css';
import App from './App';
import 'tw-elements';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>

);
