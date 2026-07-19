import React, { Component } from "react";
import "./Getuser.css"; // We will create this local stylesheet for styling user card

/**
 * Getuser Component
 * 
 * This is a React Class Component that demonstrates the React Component Lifecycle
 * by utilizing the componentDidMount() method to perform an asynchronous API call.
 */
class Getuser extends Component {
  // Part 5 - State Management
  // Initialize the component state to store user information, loading, and error states.
  state = {
    title: "",
    firstName: "",
    image: "",
    loading: true, // Initially true to show the loading message while fetching data
    error: null,   // Initially null, will store error message or boolean if API fails
  };

  // Part 6 & 7 - Implement componentDidMount() & Fetch API Implementation
  // componentDidMount is a lifecycle method called automatically after the component is rendered to the DOM.
  // It is the ideal place for performing network requests or API calls.
  async componentDidMount() {
    // API URL to fetch a random user
    const url = "https://api.randomuser.me/";

    try {
      // Perform the asynchronous HTTP GET request using Fetch API
      const response = await fetch(url);

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response stream into JSON format asynchronously
      const data = await response.json();

      // Check if the response data contains results
      if (!data || !data.results || data.results.length === 0) {
        throw new Error("Empty or invalid response data received from API");
      }

      // Extract the required details from the first user object in the results array
      const user = data.results[0];
      const title = user.name.title;
      const firstName = user.name.first;
      const image = user.picture.large; // Extracting large profile image

      // Update state with the fetched user details and set loading to false
      this.setState({
        title: title,
        firstName: firstName,
        image: image,
        loading: false,
        error: null
      });
    } catch (error) {
      // Log error to console for debugging purposes
      console.error("Error fetching user data:", error);

      // Update state to handle the error, setting loading to false and storing error details
      this.setState({
        loading: false,
        error: "Unable to fetch user details."
      });
    }
  }

  // Part 8, 9 & 10 - Display Data, Loading State, and Error Handling
  render() {
    const { title, firstName, image, loading, error } = this.state;

    // 1. Loading State: Display loading message while the API request is in progress
    if (loading) {
      return (
        <div className="status-container loading-state">
          <div className="spinner"></div>
          <p>Loading user...</p>
        </div>
      );
    }

    // 2. Error Handling: Display fallback message if the API call fails
    if (error) {
      return (
        <div className="status-container error-state">
          <p className="error-message">{error}</p>
        </div>
      );
    }

    // 3. Success State: Display the fetched user details in a beautiful card layout
    return (
      <div className="user-card-container">
        <div className="user-card">
          <div className="avatar-wrapper">
            <img 
              src={image} 
              alt={`${firstName}'s profile`} 
              className="user-avatar" 
            />
          </div>
          <div className="user-info">
            <span className="info-label">Title</span>
            <h2 className="user-title">{title}</h2>
            
            <span className="info-label">First Name</span>
            <h3 className="user-name">{firstName}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Getuser;
