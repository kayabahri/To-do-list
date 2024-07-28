// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Settings from './components/Settings';
import Home from './components/Home'; // Ana sayfa bileşenini ekleyin
import { ThemeContext } from './contexts/ThemeContext';
import './styles/App.css';
import './i18n'; // i18n yapılandırmasını import ediyoruz

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ana sayfa rotası */}
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
