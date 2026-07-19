import React from 'react';
import CohortDetails from './components/CohortDetails';
import { CohortData } from './components/Cohort';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cohort Dashboard</h1>
      </header>
      <main>
        {CohortData.map((cohort) => (
          <CohortDetails key={cohort.code} cohort={cohort} />
        ))}
      </main>
    </div>
  );
}

export default App;
