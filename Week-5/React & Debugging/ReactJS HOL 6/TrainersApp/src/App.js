import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import TrainersList from './Trainerlist';
import TrainerDetail from './TrainerDetails';
import { mockTrainers } from './TrainersMock';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-navbar">
          <div className="navbar-logo">
            <span className="logo-accent">Cognizant</span> Academy
          </div>
          <nav className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/trainers" className="nav-link">Trainers</Link>
          </nav>
        </header>

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trainers" element={<TrainersList trainers={mockTrainers} />} />
            <Route path="/trainers/:id" element={<TrainerDetail />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Cognizant Technology Solutions. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
