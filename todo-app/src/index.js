import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './redux/store';
import './styles/index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
        <App />

        </I18nextProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
