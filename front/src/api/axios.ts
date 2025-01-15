import axios from 'axios';
import { API_URL } from '../../shared/constants';

export const globalInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const refreshInstance = axios.create({
  baseURL: `${API_URL}/auth/refresh`,
  timeout: 10000,
  withCredentials: true,
});

export const protectedInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
});

protectedInstance.interceptors.response.use(
  (response) => {
    // Return the response as is if the request is successful
    return response;
  },
  async (error) => {
    // Check for a specific error (e.g., unauthorized, or any other status you want to handle)
    if (error.response && error.response.status === 401) {
      // Example: If the status is 401, try calling the global instance as a fallback
      try {
        const fallbackResponse = await refreshInstance.post('');
        // Return the response from the fallback endpoint
        return fallbackResponse;
      } catch (fallbackError) {
        // Handle the error if the fallback request also fails
        return Promise.reject(fallbackError);
      }
    }
    // For other types of errors, just reject as usual
    return Promise.reject(error);
  }
);
