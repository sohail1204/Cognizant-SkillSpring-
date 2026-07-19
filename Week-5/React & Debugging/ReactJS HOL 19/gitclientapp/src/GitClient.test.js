// Import Axios so we can configure and assert on its mocked methods
import axios from 'axios';

// Import the GitClient class that we want to test in isolation
import GitClient from './GitClient';

// Mock the Axios library globally using Jest's mock system.
// This overrides the real axios module imports in our application with jest mock functions,
// ensuring no real HTTP requests are performed during test execution.
jest.mock('axios');

// Group the tests inside a test suite named 'Git Client Tests' using describe()
describe('Git Client Tests', () => {
  
  // Reset the mock status before each individual test case to prevent cross-test interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case verifying that the GitClient correctly returns mock repository names for 'techiesyed'
  test('should return repository names for techiesyed', async () => {
    // Instantiate the class under test in this isolation block
    const client = new GitClient();
    
    // Define the dummy mock data in the expected structure of the GitHub repository list
    const dummyMockData = [
      {
        name: 'react-project'
      },
      {
        name: 'spring-boot-api'
      },
      {
        name: 'portfolio'
      }
    ];

    // Configure the mocked axios.get function to return a resolved Promise with our dummy mock response
    axios.get.mockResolvedValue({ data: dummyMockData });

    // Call the method being tested (getRepositories) and wait for the Promise to resolve
    const result = await client.getRepositories('techiesyed');

    // Assertion 1: Check that the result value exactly matches the structure and values of our dummy mock data.
    // toEqual() performs a deep structural comparison of the objects/arrays.
    expect(result).toEqual(dummyMockData);

    // Assertion 2: Verify that the mock axios.get function was indeed invoked.
    // toHaveBeenCalled() asserts that the mock was executed at least once during this test.
    expect(axios.get).toHaveBeenCalled();

    // Assertion 3: Verify that axios.get was invoked with the exact target GitHub API endpoint for 'techiesyed'.
    // toHaveBeenCalledWith() asserts that the function was called with these exact parameter strings.
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/techiesyed/repos');
  });

  // Additional test case verifying that the error handling in GitClient functions correctly
  test('should throw an error when the API request fails', async () => {
    // Instantiate the class under test
    const client = new GitClient();
    
    // Mock the error to reject the Promise representing an API failure
    const mockError = new Error('Request failed with status code 404');
    
    // Configure the mocked axios.get function to reject with the simulated mockError
    axios.get.mockRejectedValue(mockError);

    // Assertion: Assert that the promise returned by getRepositories is rejected with the exact error object.
    // rejects unwraps the rejection value, and toThrow() asserts that the thrown exception matches.
    await expect(client.getRepositories('techiesyed')).rejects.toThrow('Request failed with status code 404');
  });
});
