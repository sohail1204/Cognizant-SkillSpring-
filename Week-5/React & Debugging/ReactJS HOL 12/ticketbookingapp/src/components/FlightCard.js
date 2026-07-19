import React from 'react';

/**
 * FlightCard Component
 * Displays individual flight details using Props.
 * Reusable component designed to render flight details dynamically.
 * 
 * Props:
 * - flight: object containing airline, flightNumber, source, destination, departureTime, arrivalTime, price
 * - isLoggedIn: boolean indicating if user is logged in
 * - onBook: function to handle ticket booking
 * - isBooked: boolean showing if this flight is already booked by user
 */
const FlightCard = ({ flight, isLoggedIn, onBook, isBooked }) => {
  const { id, airline, flightNumber, source, destination, departureTime, arrivalTime, price } = flight;

  return (
    <div className={`flight-card ${isBooked ? 'booked' : ''}`}>
      <div className="airline-badge">{airline}</div>
      <div className="flight-number">{flightNumber}</div>
      
      <div className="flight-route">
        <div className="route-point">
          <span className="city">{source}</span>
          <span className="time">{departureTime}</span>
          <span className="label">Departure</span>
        </div>
        
        <div className="route-connector">
          <span className="plane-icon">✈</span>
          <div className="line"></div>
        </div>
        
        <div className="route-point">
          <span className="city">{destination}</span>
          <span className="time">{arrivalTime}</span>
          <span className="label">Arrival</span>
        </div>
      </div>

      <div className="flight-footer">
        <div className="price-section">
          <span className="price-label">Ticket Price</span>
          <span className="price-value">₹{price.toLocaleString()}</span>
        </div>

        {isLoggedIn ? (
          <button 
            className={`btn btn-book ${isBooked ? 'btn-booked' : ''}`} 
            onClick={() => onBook(id)}
            disabled={isBooked}
          >
            {isBooked ? '✓ Booked' : 'Book Ticket'}
          </button>
        ) : (
          <span className="guest-badge">Login to Book</span>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
