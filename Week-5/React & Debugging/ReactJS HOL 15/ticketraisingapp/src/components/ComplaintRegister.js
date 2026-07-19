import React, { useState } from 'react';

/**
 * ComplaintRegister Component
 * 
 * This component renders a form that allows employees to submit complaints.
 * It uses controlled inputs via React hooks (useState) to manage form state,
 * performs validation on submission, generates a unique reference number,
 * and clears the form after a successful submission.
 */
function ComplaintRegister() {
  // State variables for managing form inputs
  const [employeeName, setEmployeeName] = useState('');
  const [complaint, setComplaint] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    // Prevent default browser behavior (page refresh)
    event.preventDefault();

    // 1. Validation Logic
    if (employeeName.trim() === '') {
      alert('Employee Name is required.');
      return;
    }

    if (complaint.trim() === '') {
      alert('Complaint cannot be empty.');
      return;
    }

    // 2. Generate a Unique Complaint Reference Number
    // e.g. REF + 4 random digits (from 1000 to 9999)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `REF${randomNum}`;

    // 3. Display Success Alert
    alert(`Complaint Registered Successfully\nReference Number: ${referenceNumber}`);

    // 4. Clear Form Fields
    setEmployeeName('');
    setComplaint('');
  };

  return (
    <div className="complaint-card">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="complaint">Complaint Description</label>
          <textarea
            id="complaint"
            rows="5"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your complaint here..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintRegister;
