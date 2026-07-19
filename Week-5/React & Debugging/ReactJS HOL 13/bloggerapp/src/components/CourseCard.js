import React from 'react';

/**
 * Reusable Card component for displaying Course Details.
 * Receives the course object as a prop.
 */
const CourseCard = ({ course }) => {
  const { id, name, trainer, duration, fee } = course;

  return (
    <div className="card course-card">
      <div className="card-header">
        <span className="card-badge">Course #{id}</span>
        <span className="card-duration">{duration}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-meta">Trainer: <strong>{trainer}</strong></p>
        <div className="card-details">
          <span className="card-fee">${fee}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
