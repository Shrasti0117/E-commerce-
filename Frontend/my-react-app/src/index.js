// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import it here
import Contextprovider from './context/Contextprovider';
import ErrorBoundary from './components/error/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Contextprovider>
    <ErrorBoundary>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ErrorBoundary>
   </Contextprovider>
);

reportWebVitals();
