import React, { useState } from "react";

/**
 * CurrencyConvertor Component
 * Demonstrates:
 * 1. React State Management (useState)
 * 2. Controlled Input Components (handling onChange events)
 * 3. Form Submission Handling (handleSubmit event)
 * 4. Input validation and data formatting
 */
function CurrencyConvertor() {
  // State for storing the user's input in Indian Rupees (INR)
  const [inrAmount, setInrAmount] = useState("");
  // State for storing the converted amount in Euros
  const [euroResult, setEuroResult] = useState(null);
  // State for tracking any input validation error messages
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * handleSubmit() function
   * Invoked when the conversion form is submitted.
   * 
   * @param {SyntheticEvent} event - The React synthetic submit event object
   */
  const handleSubmit = (event) => {
    // Prevent the default browser form submission behavior (page reload)
    event.preventDefault();

    // Parse the input value to a floating point number
    const numericAmount = parseFloat(inrAmount);

    // Validate that the input is a valid positive number
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg("Please enter a valid amount greater than 0.");
      setEuroResult(null);
      return;
    }

    // Clear any previous error message if validation succeeds
    setErrorMsg("");

    // Calculate Euro: Euro = INR / 90 (rounded to 2 decimal places)
    const converted = numericAmount / 90;
    const roundedValue = Number(converted.toFixed(2));

    // Update the state with the calculated value
    setEuroResult(roundedValue);
  };

  /**
   * handleInputChange() function
   * Handler to update the state in real-time as the user types in the input field.
   * Keeps the component "controlled" by linking the input's value directly to React state.
   */
  const handleInputChange = (event) => {
    // Update the state with current value in the input field
    setInrAmount(event.target.value);
  };

  return (
    <div className="converter-card">
      <h2 className="section-title">💱 Currency Converter</h2>
      <p className="section-description">
        Quickly convert Indian Rupees (INR) to Euro (EUR) based on a conversion rate of <strong>90 INR = 1 EUR</strong>.
      </p>

      {/* Form with onSubmit event handler */}
      <form onSubmit={handleSubmit} className="converter-form">
        <div className="form-group">
          <label htmlFor="inrInput" className="form-label">
            Enter Amount in Indian Rupees (₹)
          </label>
          <input
            id="inrInput"
            type="number"
            step="any"
            placeholder="e.g. 450"
            value={inrAmount}
            onChange={handleInputChange}
            className={`form-control ${errorMsg ? "is-invalid" : ""}`}
          />
        </div>

        {/* Display validation error message if any */}
        {errorMsg && <p className="error-text" role="alert">⚠️ {errorMsg}</p>}

        <button type="submit" className="btn btn-primary submit-btn">
          Convert to Euro (€)
        </button>
      </form>

      {/* Render conversion result conditionally if euroResult is not null */}
      {euroResult !== null && (
        <div className="result-box animate-fade-in">
          <p className="result-label">Converted Amount:</p>
          <p className="result-value">
            ₹{parseFloat(inrAmount).toLocaleString("en-IN")} INR ={" "}
            <span className="euro-highlight">€{euroResult.toFixed(2)} EUR</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConvertor;
