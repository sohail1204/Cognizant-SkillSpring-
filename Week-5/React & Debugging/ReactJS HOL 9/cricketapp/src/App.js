import React, { useState } from 'react';
import './App.css';
import ListofPlayers from './components/ListofPlayers';
import IndianPlayers from './components/IndianPlayers';

function App() {
  // Use state to make the application interactive in the browser,
  // allowing the user to toggle the flag dynamically.
  const [isTrueFlag, setIsTrueFlag] = useState(true);

  // Defining the flag variable as specified by the lab manual
  let flag = isTrueFlag;

  // Declaring a variable to store the component to be rendered
  let componentToRender;

  // Part 10: Simple if-else statement for conditional rendering
  if (flag) {
    componentToRender = <ListofPlayers />;
  } else {
    componentToRender = <IndianPlayers />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🏏 Cricket App</h1>
          <p className="subtitle font-style">ReactJS & ES6 Concepts Hands-On</p>
        </div>
        <div className="toggle-card">
          <span className="toggle-status">
            Current Flag: <span className={`flag-value ${flag ? 'flag-true' : 'flag-false'}`}>{flag.toString()}</span>
          </span>
          <button className="toggle-btn" onClick={() => setIsTrueFlag(!isTrueFlag)}>
            Toggle Flag to {(!flag).toString()}
          </button>
        </div>
      </header>

      <main className="App-main">
        {componentToRender}
      </main>

      <footer className="App-footer">
        <p>ReactJS HOL 9 - Cricket Application Roster. Made with React & CSS Grid/Flexbox.</p>
      </footer>
    </div>
  );
}

export default App;
