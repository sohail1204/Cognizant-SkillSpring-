import React, { useState } from 'react';
import './App.css';
import GuestPage from './components/GuestPage';
import UserPage from './components/UserPage';
import WarningBanner from './components/WarningBanner';

// Static flight data matching requirement specifications
const FLIGHTS_DATA = [
  {
    id: 1,
    airline: "IndiGo Airlines",
    flightNumber: "6E-2405",
    source: "New Delhi (DEL)",
    destination: "Mumbai (BOM)",
    departureTime: "07:30 AM",
    arrivalTime: "09:45 AM",
    price: 5200
  },
  {
    id: 2,
    airline: "Air India",
    flightNumber: "AI-801",
    source: "Bengaluru (BLR)",
    destination: "New Delhi (DEL)",
    departureTime: "11:15 AM",
    arrivalTime: "02:00 PM",
    price: 6800
  },
  {
    id: 3,
    airline: "SpiceJet",
    flightNumber: "SG-354",
    source: "Kolkata (CCU)",
    destination: "Chennai (MAA)",
    departureTime: "04:45 PM",
    arrivalTime: "07:15 PM",
    price: 4900
  },
  {
    id: 4,
    airline: "Vistara",
    flightNumber: "UK-985",
    source: "Mumbai (BOM)",
    destination: "Goa (GOI)",
    departureTime: "09:00 PM",
    arrivalTime: "10:15 PM",
    price: 5500
  }
];

function App() {
  // State management using useState() hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setBookedTickets([]); // Clear bookings on logout
  };

  // Ticket booking handler
  const handleBookTicket = (flightId) => {
    if (!bookedTickets.includes(flightId)) {
      setBookedTickets([...bookedTickets, flightId]);
    }
  };

  // Part 13 - Conditional Rendering using Element Variables
  // Declare a variable to store the React element
  let pageContent;

  if (isLoggedIn) {
    pageContent = (
      <UserPage
        flights={FLIGHTS_DATA}
        bookedTickets={bookedTickets}
        onBookTicket={handleBookTicket}
        onLogout={handleLogout}
      />
    );
  } else {
    pageContent = (
      <GuestPage
        flights={FLIGHTS_DATA}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Header Bar */}
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon">✈</span>
          <h1>Flight Ticket Booking Application</h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-warning-toggle"
            onClick={() => setShowWarning(!showWarning)}
          >
            {showWarning ? 'Hide Notice' : 'Show Notice'}
          </button>
        </div>
      </header>

      {/* Warning Banner demonstrating component that returns null */}
      <div className="warning-container">
        <WarningBanner 
          warn={showWarning} 
          message="System Maintenance Notice: Booking servers will undergo maintenance tonight from 12:00 AM to 02:00 AM IST."
        />
      </div>

      {/* Renders the conditionally set page content using Element Variables */}
      <main className="main-content">
        {pageContent}
      </main>

      {/* Footer */}
      <footer className="app-footer-bar">
        <p>© 2026 Flight Booking Inc. All rights reserved. Designed for ReactJS Hands-On 12.</p>
      </footer>
    </div>
  );
}

export default App;
