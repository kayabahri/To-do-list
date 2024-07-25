import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Settings from './components/Settings';
import CategoryInput from './components/CategoryInput';
import CategoryList from './components/CategoryList';
import { ThemeContext } from './contexts/ThemeContext';
import './styles/App.css';

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<>
              <CategoryInput />
              <CategoryList />
            </>} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
