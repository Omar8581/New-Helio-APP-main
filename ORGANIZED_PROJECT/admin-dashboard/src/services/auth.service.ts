/**
 * ============================================================================
 * ADMIN AUTHENTICATION SERVICE
 * ============================================================================
 * Handles all admin authentication operations:
 * - Login
 * - Logout
 * - Get current admin profile
 * - Check authentication status
 * - Token management
 *
 * Connects to: /api/admin/auth/* endpoints in backend
 * ============================================================================
 */

import api from './api';

/**
 * ADMIN LOGIN
 * ===========
 * Authenticates admin user with email and password
 *
 * Backend endpoint: POST /api/admin/auth/login
 *
 * Process:
 * 1. Sends email + password to backend
 * 2. Backend verifies credentials
 * 3. Backend returns JWT tokens + admin profile
 * 4. Stores tokens in localStorage
 * 5. Returns admin data to caller
 *
 * @param email - Admin email address
 * @param password - Admin password
 * @returns Promise with { admin, accessToken, refreshToken }
 *
 * Usage Example:
 * ```typescript
 * try {
 *   const { admin, accessToken } = await authService.login(
 *     'admin@example.com',
 *     'password123'
 *   );
 *   console.log('Logged in as:', admin.name);
 *   console.log('Role:', admin.role);
 *   // Navigate to dashboard
 * } catch (error) {
 *   console.error('Login failed:', error);
 *   // Show error message to user
 * }
 * ```
 */
export const login = async (email: string, password: string) => {
  // Send login request to backend
  const response = await api.post('/api/admin/auth/login', {
    email,
    password
  });

  // Extract data from response
  const { admin, accessToken, refreshToken } = response.data;

  // Store tokens in localStorage for future requests
  // These are automatically added to requests by api.ts interceptor
  localStorage.setItem('adminToken', accessToken);
  localStorage.setItem('adminRefreshToken', refreshToken);

  // Store admin profile
  localStorage.setItem('adminProfile', JSON.stringify(admin));

  // Return admin data to caller
  return response.data;
};

/**
 * ADMIN LOGOUT
 * ============
 * Logs out the admin by clearing all stored data
 *
 * Process:
 * 1. Removes tokens from localStorage
 * 2. Removes admin profile from localStorage
 * 3. Redirects to login page
 *
 * Note: Could also call backend to invalidate token server-side
 *
 * Usage Example:
 * ```typescript
 * // In your header component
 * const handleLogout = () => {
 *   authService.logout();
 *   // User is now logged out and redirected to login
 * };
 * ```
 */
export const logout = () => {
  // Remove all admin data from localStorage
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRefreshToken');
  localStorage.removeItem('adminProfile');

  // Optional: Call backend logout endpoint
  // This would invalidate the token server-side
  // api.post('/api/admin/auth/logout').catch(() => {});

  // Redirect to login page
  window.location.href = '/admin/login';
};

/**
 * GET CURRENT ADMIN PROFILE
 * ==========================
 * Fetches the currently logged-in admin's profile from backend
 *
 * Backend endpoint: GET /api/admin/auth/me
 *
 * Use this to:
 * - Verify token is still valid
 * - Get latest admin data
 * - Check admin permissions
 *
 * @returns Promise with admin profile object
 *
 * Usage Example:
 * ```typescript
 * // On app startup or dashboard load
 * useEffect(() => {
 *   const loadProfile = async () => {
 *     try {
 *       const admin = await authService.getCurrentAdmin();
 *       setAdminData(admin);
 *     } catch (error) {
 *       // Token invalid - will auto-logout via interceptor
 *     }
 *   };
 *   loadProfile();
 * }, []);
 * ```
 */
export const getCurrentAdmin = async () => {
  // Call backend to get current admin
  // Token is automatically added by api.ts interceptor
  const response = await api.get('/api/admin/auth/me');

  // Update stored profile with latest data
  localStorage.setItem('adminProfile', JSON.stringify(response.data.admin));

  return response.data.admin;
};

/**
 * CHECK IF ADMIN IS AUTHENTICATED
 * ================================
 * Checks if admin has valid token in localStorage
 *
 * Use this for:
 * - Protecting admin routes
 * - Showing/hiding UI elements
 * - Conditional rendering
 *
 * Note: This only checks if token EXISTS, not if it's VALID
 * Backend will verify actual validity on each request
 *
 * @returns boolean - true if token exists, false otherwise
 *
 * Usage Example:
 * ```typescript
 * // In route guard or protected component
 * const ProtectedRoute = ({ children }) => {
 *   if (!authService.isAuthenticated()) {
 *     return <Navigate to="/admin/login" />;
 *   }
 *   return children;
 * };
 * ```
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('adminToken');
  return !!token; // Convert to boolean (true if exists, false if null)
};

/**
 * GET STORED ADMIN PROFILE
 * =========================
 * Gets admin profile from localStorage (NO API call)
 *
 * Use this when:
 * - You need admin data immediately
 * - You don't need latest data
 * - You want to avoid API call
 *
 * @returns Admin profile object or null
 *
 * Usage Example:
 * ```typescript
 * // In header component to show admin name
 * const Header = () => {
 *   const admin = authService.getStoredAdmin();
 *
 *   return (
 *     <div>
 *       {admin && (
 *         <span>Welcome, {admin.name}</span>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
export const getStoredAdmin = () => {
  const adminStr = localStorage.getItem('adminProfile');

  // Parse JSON if exists, return null if not
  if (adminStr) {
    try {
      return JSON.parse(adminStr);
    } catch (error) {
      console.error('Failed to parse admin profile');
      return null;
    }
  }

  return null;
};

/**
 * REFRESH ACCESS TOKEN
 * ====================
 * Uses refresh token to get new access token
 *
 * Backend endpoint: POST /api/admin/auth/refresh
 *
 * Call this when:
 * - Access token expires (401 error)
 * - Before access token expires (proactive)
 *
 * @returns Promise with new access token
 *
 * Usage Example:
 * ```typescript
 * // Usually called automatically by interceptor
 * // But can be called manually:
 * try {
 *   const { accessToken } = await authService.refreshToken();
 *   // Token refreshed, continue with request
 * } catch (error) {
 *   // Refresh failed, logout user
 *   authService.logout();
 * }
 * ```
 */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('adminRefreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  // Call backend refresh endpoint
  const response = await api.post('/api/admin/auth/refresh', {
    refreshToken
  });

  // Store new access token
  const { accessToken } = response.data;
  localStorage.setItem('adminToken', accessToken);

  return response.data;
};

/**
 * Export all functions as authService object
 * This allows importing like: import authService from './auth.service'
 */
const authService = {
  login,
  logout,
  getCurrentAdmin,
  isAuthenticated,
  getStoredAdmin,
  refreshToken
};

export default authService;
