import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Varsayılan tema gündüz (light)

  const toggleTheme = (theme) => {
    setTheme(theme);
    document.body.className = theme; // Body class'ını değiştir
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
