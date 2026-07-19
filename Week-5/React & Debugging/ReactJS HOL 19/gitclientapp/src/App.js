// Import React library and state hooks (useState, useEffect) for component lifecycle management
import React, { useState, useEffect } from 'react';

// Import CSS styles for premium, glassmorphic layout and design
import './App.css';

// Import GitClient class to make HTTP calls to GitHub API
import GitClient from './GitClient';

// Instantiate the GitClient service object once outside the component definition
const gitClient = new GitClient();

// Main functional component of the application
function App() {
  // Declare the state array for repositories and the function to update it
  const [repos, setRepos] = useState([]);
  
  // Declare the boolean state for tracking API loading state and the function to update it
  const [loading, setLoading] = useState(true);
  
  // Declare the state for storing error messages and the function to update it
  const [error, setError] = useState(null);
  
  // Declare the state for holding the active searched GitHub username (defaulted to techiesyed)
  const [username, setUsername] = useState('techiesyed');
  
  // Declare the state for tracking the input text field's value
  const [inputValue, setInputValue] = useState('techiesyed');

  // React hook that triggers data fetching whenever the target username changes
  useEffect(() => {
    // Define an inner asynchronous function to fetch repository data safely
    const fetchRepos = async () => {
      // Set loading state to true before starting the API request
      setLoading(true);
      
      // Clear any prior errors to start from a clean state
      setError(null);
      
      // Attempt to retrieve data and handle success
      try {
        // Await the promise returned by the GitClient.getRepositories method
        const data = await gitClient.getRepositories(username);
        
        // Update the repos state with the retrieved data array
        setRepos(data);
      } catch (err) {
        // If an exception occurs, update the error state with a friendly error message
        setError('Unable to fetch repositories.');
        
        // Reset repositories to an empty list on failure
        setRepos([]);
      } finally {
        // Set loading state to false in all outcomes (success or error)
        setLoading(false);
      }
    };

    // Execute the asynchronous fetching method
    fetchRepos();
  }, [username]); // Dependent on username: runs when username value changes

  // Handler for form submit events
  const handleSearchSubmit = (e) => {
    // Prevent the default browser reload action when submitting forms
    e.preventDefault();
    
    // Set the username state to the input value to trigger the useEffect hook
    setUsername(inputValue);
  };

  // Return the JSX representing the UI of the application
  return (
    // Outer container wrapper for the app layout
    <div className="app-container">
      {/* Header section displaying the app title */}
      <header className="app-header">
        <h1>GitHub Repository Explorer</h1>
      </header>
      
      {/* Main content body of the page */}
      <main className="app-content">
        {/* Search form to look up repositories of other users */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter GitHub username"
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Section to display search results */}
        <section className="results-section">
          {/* Section heading showing current username */}
          <h2>Repository List for <span className="highlight">{username}</span></h2>
          
          {/* Display loading message while the API request is active */}
          {loading && (
            <div className="status-message loading-message" data-testid="loading-state">
              Loading repositories...
            </div>
          )}

          {/* Display error message if the API request failed */}
          {error && (
            <div className="status-message error-message" data-testid="error-state">
              {error}
            </div>
          )}

          {/* Display empty message if request succeeded but returned no repos */}
          {!loading && !error && repos.length === 0 && (
            <div className="status-message empty-message">
              No repositories found.
            </div>
          )}

          {/* Display list of repository names if request succeeded with records */}
          {!loading && !error && repos.length > 0 && (
            <ul className="repo-list">
              {/* Map each repository element into an list item */}
              {repos.map((repo) => (
                // Render list item with repository name as key
                <li key={repo.name} className="repo-item">
                  {/* Display the repository name */}
                  <span className="repo-name">{repo.name}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

// Export the functional component as the default export of this file
export default App;
