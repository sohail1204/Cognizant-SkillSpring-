import React, { useState } from 'react';
import EmployeesList from './EmployeesList';
import ThemeContext from './ThemeContext';
import './index.css';

function App() {
  // Define theme state, initially 'light'
  const [theme, setTheme] = useState('light');

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`app-container ${theme}`}>
        <header>
          <h1>Employee Directory</h1>
          {/* Button to toggle theme */}
          <button onClick={toggleTheme} className={`toggle-btn ${theme}`}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </header>
        <main>
          {/* Refactored: Removed theme prop to avoid prop drilling */}
          <EmployeesList />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
