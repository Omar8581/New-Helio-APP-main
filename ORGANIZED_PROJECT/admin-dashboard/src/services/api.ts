/**
 * ============================================================================
 * API CLIENT CONFIGURATION
 * ============================================================================
 * This file sets up the Axios HTTP client for making API requests
 * to the backend server.
 *
 * Features:
 * - Base URL configuration
 * - Request interceptors (automatically add auth token)
 * - Response interceptors (handle errors globally)
 * - Token management
 * ============================================================================
 */

import axios from 'axios';

/**
 * Base API URL
 * -------------
 * Points to your backend server
 *
 * Environment-based URLs:
 * - Development: http://localhost:5000
 * - Production: https://your-api-domain.com
 *
 * Set VITE_API_URL in your .env file
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Create Axios Instance
 * ---------------------
 * Creates a configured Axios instance with:
 * - Base URL for all requests
 * - Default headers
 * - Timeout settings
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds
});

/**
 * REQUEST INTERCEPTOR
 * ===================
 * Runs BEFORE every API request
 *
 * Purpose:
 * - Automatically adds JWT token to Authorization header
 * - This way you don't have to manually add token to every request
 *
 * How it works:
 * 1. Gets token from localStorage
 * 2. If token exists, adds it to request headers
 * 3. Backend verifies this token on protected routes
 */
api.interceptors.request.use(
  (config) => {
    // Get admin token from localStorage
    const token = localStorage.getItem('adminToken');

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * ====================
 * Runs AFTER every API response
 *
 * Purpose:
 * - Handle responses globally
 * - Manage errors in one place
 * - Auto-logout on 401 Unauthorized
 *
 * How it works:
 * 1. If successful response → return data
 * 2. If error response → handle based on status code
 */
api.interceptors.response.use(
  (response) => {
    // Success response - return as is
    return response;
  },
  (error) => {
    // Error response - handle different cases

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 401 Unauthorized
          // Token expired or invalid
          console.error('Authentication failed - logging out');

          // Clear stored admin data
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminRefreshToken');
          localStorage.removeItem('adminProfile');

          // Redirect to login page
          window.location.href = '/admin/login';
          break;

        case 403:
          // 403 Forbidden
          // User authenticated but doesn't have permission
          console.error('Access denied - insufficient permissions');
          break;

        case 404:
          // 404 Not Found
          // Resource doesn't exist
          console.error('Resource not found');
          break;

        case 422:
          // 422 Unprocessable Entity
          // Validation error
          console.error('Validation error:', data.message);
          break;

        case 500:
          // 500 Internal Server Error
          // Something went wrong on server
          console.error('Server error - please try again later');
          break;

        default:
          console.error('API error:', status, data.message);
      }

      // Return error message from server
      return Promise.reject(data.message || 'An error occurred');

    } else if (error.request) {
      // Request was made but no response received
      // Usually network error
      console.error('Network error - check your connection');
      return Promise.reject('Network error - please check your connection');

    } else {
      // Something else happened
      console.error('Request error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

/**
 * Export configured Axios instance
 *
 * Usage in other files:
 * ```typescript
 * import api from './api';
 *
 * const response = await api.get('/api/admin/users');
 * const response = await api.post('/api/admin/users', userData);
 * ```
 */
export default api;
