import React from 'react';
import FlightCard from './FlightCard';

/**
 * UserPage Component
 * Renders the view for authenticated users who are allowed to book tickets.
 * 
 * Props:
 * - flights: array of flight objects
 * - bookedTickets: array of flight IDs that have been booked
 * - onBookTicket: function callback to book a flight by ID
 * - onLogout: function callback when Logout is clicked
 */
const UserPage = ({ flights, bookedTickets, onBookTicket, onLogout }) => {
  return (
    <div className="page-container user-page">
      <div className="page-header">
        <div className="header-info">
          <h2>Welcome Back, Traveler! ✈️</h2>
          <p className="subtitle-msg">Logged in as: <strong>premium_user@travel.com</strong></p>
        </div>
        <button className="btn btn-logout" onClick={onLogout}>
          Log Out
        </button>
      </div>

      <div className="info-box info-user">
        <span className="info-icon">✓</span>
        <p>You are logged in and authorized. Feel free to search and book tickets. Your bookings will be displayed instantly.</p>
      </div>

      {bookedTickets.length > 0 && (
        <div className="booking-summary-box">
          <h3>Your Bookings 🎫</h3>
          <p className="booking-message">
            Successfully booked <strong>{bookedTickets.length}</strong> ticket(s)! 
          </p>
          <ul className="booked-flights-list">
            {flights
              .filter((flight) => bookedTickets.includes(flight.id))
              .map((flight) => (
                <li key={flight.id} className="booked-flight-item">
                  <strong>{flight.airline}</strong> ({flight.flightNumber}) — {flight.source} to {flight.destination}
                </li>
              ))}
          </ul>
        </div>
      )}

      <h3 className="section-title">Book Your Flights</h3>
      <div className="flights-grid">
        {flights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            isLoggedIn={true} 
            onBook={onBookTicket} 
            isBooked={bookedTickets.includes(flight.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
