import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Cognizant Academy</h1>
        <p className="hero-subtitle">Trainer Management Portal</p>
        <p className="hero-desc">
          A centralized, Single Page Application (SPA) designed to discover, 
          manage, and analyze technical trainers and their corresponding expert domains, 
          skills, and details.
        </p>
        <Link to="/trainers" className="btn-explore">
          Explore Trainers List
        </Link>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <h3>Expert Trainers</h3>
          <p>Highly qualified professionals from diverse backgrounds.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <h3>Advanced Skills</h3>
          <p>Comprehensive coverage of modern technologies and tools.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <h3>SPA Architecture</h3>
          <p>Built with React & React Router for optimal user experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
