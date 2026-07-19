import React from 'react';
import './App.css';
import officeImg from './assets/office.jpg';

function App() {
  // Define an array of 5 office space objects
  const officeSpaces = [
    {
      id: 1,
      name: "Elite Business Hub",
      rent: 55000,
      address: "101, MG Road, Bangalore - 560001",
      image: officeImg
    },
    {
      id: 2,
      name: "Skyline Premium Suites",
      rent: 75000,
      address: "Level 14, Tech Park, Hyderabad - 500081",
      image: officeImg
    },
    {
      id: 3,
      name: "Nexus Co-working Space",
      rent: 48000,
      address: "Ground Floor, Sector 62, Noida - 201301",
      image: officeImg
    },
    {
      id: 4,
      name: "Summit Corporate Offices",
      rent: 85000,
      address: "Bandra Kurla Complex (BKC), Mumbai - 400051",
      image: officeImg
    },
    {
      id: 5,
      name: "Apex Workspace",
      rent: 59500,
      address: "4th Floor, FC Road, Pune - 411004",
      image: officeImg
    }
  ];

  return (
    <div className="app-container">
      {/* Part 11: Display Heading */}
      <header className="app-header">
        <h1 className="main-heading">Office Space Rental Application</h1>
        <p className="sub-heading">Find the perfect professional workspace for your growing business team</p>
      </header>

      {/* Main Office Space List Section */}
      <main className="content-container">
        <div className="office-grid">
          {/* Part 14: Loop Through Office List using map() */}
          {officeSpaces.map((office) => (
            <div key={office.id} className="office-card">
              {/* Part 10 & 12: Display Image */}
              <div className="image-container">
                <img 
                  src={office.image} 
                  alt={office.name} 
                  className="office-image" 
                />
                <span className="badge">Featured</span>
              </div>
              
              <div className="card-details">
                {/* Part 12: Display Office Name */}
                <h2 className="office-name">{office.name}</h2>
                
                {/* Part 12 & 15: Display Office Rent with Conditional Styling */}
                <p className="office-rent-wrapper">
                  Rent:{" "}
                  <span 
                    className="rent-amount" 
                    style={{ 
                      color: office.rent < 60000 ? '#f43f5e' : '#10b981' 
                    }}
                  >
                    ₹{office.rent.toLocaleString('en-IN')} / month
                  </span>
                </p>
                
                {/* Part 12: Display Office Address */}
                <div className="office-address-wrapper">
                  <span className="address-icon">📍</span>
                  <p className="office-address">{office.address}</p>
                </div>

                {/* Footer Action Button */}
                <button className="book-btn">Book Viewing</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="app-footer-bar">
        <p>© 2026 Office Space Rental Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
