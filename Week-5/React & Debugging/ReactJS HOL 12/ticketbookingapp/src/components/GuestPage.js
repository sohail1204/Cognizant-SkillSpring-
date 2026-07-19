import React from 'react';
import FlightCard from './FlightCard';

/**
 * GuestPage Component
 * Renders the view for guest (unauthenticated) users.
 * 
 * Props:
 * - flights: array of flight objects
 * - onLogin: function callback when Login is clicked
 */
const GuestPage = ({ flights, onLogin }) => {
  return (
    <div className="page-container guest-page">
      <div className="page-header">
        <div className="header-info">
          <h2>Welcome, Guest! 👋</h2>
          <p className="subtitle-msg">Browse our flights and check out pricing details.</p>
        </div>
        <button className="btn btn-login" onClick={onLogin}>
          Log In to Book
        </button>
      </div>

      <div className="info-box info-guest">
        <span className="info-icon">ℹ</span>
        <p>You are currently browsing as a <strong>Guest</strong>. You can view flight details, schedules, and ticket prices, but you must log in to book tickets.</p>
      </div>

      <h3 className="section-title">Available Flights</h3>
      <div className="flights-grid">
        {flights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            isLoggedIn={false} 
            onBook={() => {}} 
            isBooked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestPage;
