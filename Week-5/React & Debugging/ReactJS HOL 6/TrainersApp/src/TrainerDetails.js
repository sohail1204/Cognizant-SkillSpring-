import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTrainers } from './TrainersMock';
import './TrainerDetails.css';

function TrainerDetail() {
  const { id } = useParams();
  const trainer = mockTrainers.find((t) => t.TrainerId === parseInt(id, 10));

  if (!trainer) {
    return (
      <div className="trainer-detail-container">
        <div className="trainer-not-found">
          <h2>Trainer Not Found</h2>
          <p>The requested trainer ID <strong>{id}</strong> could not be found in our registry.</p>
          <Link to="/trainers" className="btn-back">
            ← Back to Trainers List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-detail-container">
      <div className="trainer-detail-card">
        <div className="card-header-gradient">
          <div className="header-meta">
            <span className="detail-id-badge">Trainer ID: {trainer.TrainerId}</span>
            <span className="detail-tech-badge">{trainer.Technology}</span>
          </div>
          <h2 className="detail-name">{trainer.Name}</h2>
        </div>

        <div className="card-content">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email Address</span>
              <span className="info-value">
                <a href={`mailto:${trainer.Email}`}>{trainer.Email}</a>
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone Number</span>
              <span className="info-value">
                <a href={`tel:${trainer.Phone}`}>{trainer.Phone}</a>
              </span>
            </div>
          </div>

          <div className="skills-block">
            <h4 className="skills-heading">Core Skills & Expertise</h4>
            <div className="skills-badges-list">
              {trainer.Skills.map((skill, index) => (
                <span key={index} className="skill-badge-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card-footer-action">
          <Link to="/trainers" className="btn-back-link">
            ← Back to Trainers List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetail;
