import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock axios globally within this test file to prevent actual API requests
jest.mock('axios');

test('renders GitHub Repository Explorer title', async () => {
  // Mock the Axios GET request resolution with empty list data
  axios.get.mockResolvedValue({ data: [] });

  // Render the App component
  render(<App />);

  // Assert that the main explorer title is present in the DOM
  const titleElement = screen.getByText(/GitHub Repository Explorer/i);
  expect(titleElement).toBeInTheDocument();

  // Wait for loading indicator to resolve and avoid async state update warnings in the test runner
  await waitFor(() => {
    expect(screen.queryByText(/Loading repositories.../i)).not.toBeInTheDocument();
  });
});
