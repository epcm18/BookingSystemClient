import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './context/SearchContext.js';
import { AuthContextContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextContextProvider>
  </React.StrictMode>
);
