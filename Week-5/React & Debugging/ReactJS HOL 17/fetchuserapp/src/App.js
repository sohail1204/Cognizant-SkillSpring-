import React from 'react';
import './App.css';
import Getuser from './components/Getuser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Random User Profile</h1>
      </header>
      <main className="App-content">
        <Getuser />
      </main>
    </div>
  );
}

export default App;
