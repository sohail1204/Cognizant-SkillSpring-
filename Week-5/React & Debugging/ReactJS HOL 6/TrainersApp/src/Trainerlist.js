import React from 'react';
import { Link } from 'react-router-dom';
import './TrainersList.css';

function TrainersList({ trainers }) {
  return (
    <div className="trainers-list-container">
      <div className="list-header">
        <h2>Cognizant Academy Trainers</h2>
        <p className="list-subtitle">Click on any trainer's name to view their full credentials, contact details, and skill matrix.</p>
      </div>

      <div className="trainers-table-wrapper">
        <table className="trainers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Trainer Name</th>
              <th>Stream / Technology</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.TrainerId}>
                <td><span className="id-badge">{trainer.TrainerId}</span></td>
                <td>
                  <Link to={`/trainers/${trainer.TrainerId}`} className="trainer-link-name">
                    {trainer.Name}
                  </Link>
                </td>
                <td><span className="tech-badge">{trainer.Technology}</span></td>
                <td>
                  <Link to={`/trainers/${trainer.TrainerId}`} className="btn-view-details">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainersList;
