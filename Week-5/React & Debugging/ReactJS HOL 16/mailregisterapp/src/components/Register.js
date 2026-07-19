import React, { useState } from 'react';

/**
 * Register Component
 * A functional component that displays a registration form with Name, Email, and Password.
 * Implements React state hooks, controlled components, event handling, and form validation.
 */
function Register() {
  // State variables for form inputs and validation errors
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * Helper function to validate fields dynamically.
   * If valid, the error for the given field is removed from the state.
   * @param {string} fieldName - The name of the input field
   * @param {string} value - The current value of the input field
   */
  const validateField = (fieldName, value) => {
    let tempErrors = { ...errors };

    if (fieldName === 'name') {
      if (!value || value.trim().length < 5) {
        tempErrors.name = 'Name should contain at least 5 characters.';
      } else {
        delete tempErrors.name;
      }
    }

    if (fieldName === 'email') {
      if (!value || !value.includes('@') || !value.includes('.')) {
        tempErrors.email = 'Invalid Email Address.';
      } else {
        delete tempErrors.email;
      }
    }

    if (fieldName === 'password') {
      if (!value || value.length < 8) {
        tempErrors.password = 'Password should contain at least 8 characters.';
      } else {
        delete tempErrors.password;
      }
    }

    setErrors(tempErrors);
  };

  /**
   * Event handler for input value changes.
   * Dynamically updates the correct state variable based on input 'name' attribute
   * and runs validation to clear or set error message.
   */
  const handleChange = (event) => {
    const { name: fieldName, value } = event.target;

    // Dynamically update the specific field state
    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'email') {
      setEmail(value);
    } else if (fieldName === 'password') {
      setPassword(value);
    }

    // Perform validation on change to make error messages disappear automatically
    validateField(fieldName, value);
  };

  /**
   * Event handler for form submission.
   * Prevents the page reload, validates all fields, displays success alert if valid,
   * and clears the form fields.
   */
  const handleSubmit = (event) => {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();

    // Perform validation on all fields
    const tempErrors = {};
    if (!name || name.trim().length < 5) {
      tempErrors.name = 'Name should contain at least 5 characters.';
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      tempErrors.email = 'Invalid Email Address.';
    }
    if (!password || password.length < 8) {
      tempErrors.password = 'Password should contain at least 8 characters.';
    }

    setErrors(tempErrors);

    // If there are no validation errors, proceed with successful registration
    if (Object.keys(tempErrors).length === 0) {
      alert('Registration Successful');
      // Clear all fields and errors
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Please fill in this form to register with us.</p>
        
        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
