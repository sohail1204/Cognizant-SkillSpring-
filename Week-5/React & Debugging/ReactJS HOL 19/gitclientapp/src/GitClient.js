// Import the Axios library to handle promise-based HTTP requests
import axios from 'axios';

// Define the GitClient class that wraps our API interactions
class GitClient {
  // Define an asynchronous method to fetch repositories for a given username
  async getRepositories(username) {
    // Start a try-catch block to handle API success and potential failures gracefully
    try {
      // Perform a GET request to the GitHub API endpoint using Axios, passing the username dynamically,
      // and wait (await) for the promise to resolve
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      
      // Return the repository data list retrieved from the response body (response.data)
      return response.data;
    } catch (error) {
      // Catch any exception (e.g. network failure, invalid user 404, rate limit 403) and re-throw it
      // so that the caller component (App.js) can capture it and update the UI error state
      throw error;
    }
  }
}

// Export the GitClient class as the default export of this module
export default GitClient;
