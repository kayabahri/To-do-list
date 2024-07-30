import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import About from './components/About';
import Settings from './components/Settings';
import Home from './components/Home';
import { ThemeContext } from './contexts/ThemeContext';
import './styles/App.css';
import './i18n';
import { store, persistor } from './redux/store';

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={`App ${theme}`}>
            <Router>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </Router>
          </div>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
