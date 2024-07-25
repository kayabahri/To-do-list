import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext'; // Eklendi
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider> {}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
