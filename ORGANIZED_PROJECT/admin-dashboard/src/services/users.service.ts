/**
 * ============================================================================
 * USERS MANAGEMENT SERVICE
 * ============================================================================
 * Handles all user management operations for admin dashboard:
 * - List users with filters and pagination
 * - View user details
 * - Update user status (suspend/ban/activate)
 * - Delete users
 * - View user statistics
 *
 * Connects to: /api/admin/users/* endpoints in backend
 * ============================================================================
 */

import api from './api';

/**
 * USER FILTERS INTERFACE
 * =======================
 * Defines all available filters for user listing
 *
 * All filters are optional - use what you need
 */
export interface UserFilters {
  page?: number;              // Page number (starts at 1)
  limit?: number;             // Items per page (default: 20)
  search?: string;            // Search by name or email
  status?: 'active' | 'suspended' | 'banned';  // Filter by status
  role?: 'user' | 'business' | 'admin';        // Filter by role
  sortBy?: string;            // Sort field (e.g., 'created_at', 'name')
  order?: 'asc' | 'desc';     // Sort order
}

/**
 * GET ALL USERS
 * =============
 * Fetches paginated list of users with optional filters
 *
 * Backend endpoint: GET /api/admin/users
 *
 * Returns:
 * ```typescript
 * {
 *   users: User[],              // Array of user objects
 *   pagination: {
 *     totalItems: number,       // Total users count
 *     totalPages: number,       // Total pages
 *     currentPage: number,      // Current page
 *     pageSize: number          // Items per page
 *   }
 * }
 * ```
 *
 * @param filters - Filter options (see UserFilters interface)
 * @returns Promise with users array and pagination info
 *
 * Usage Examples:
 * ```typescript
 * // Get first page of users
 * const result = await usersService.getAll({ page: 1, limit: 20 });
 * console.log(result.users);
 * console.log(`Page ${result.pagination.currentPage} of ${result.pagination.totalPages}`);
 *
 * // Search users by name or email
 * const result = await usersService.getAll({
 *   search: 'john',
 *   page: 1
 * });
 *
 * // Filter by status
 * const suspendedUsers = await usersService.getAll({
 *   status: 'suspended'
 * });
 *
 * // Filter by role
 * const businesses = await usersService.getAll({
 *   role: 'business'
 * });
 *
 * // Combine filters
 * const result = await usersService.getAll({
 *   status: 'active',
 *   role: 'user',
 *   search: 'john',
 *   sortBy: 'created_at',
 *   order: 'desc',
 *   page: 1,
 *   limit: 50
 * });
 * ```
 */
export const getAll = async (filters: UserFilters = {}) => {
  // Send filters as query parameters
  const response = await api.get('/api/admin/users', {
    params: filters
  });

  return response.data;
};

/**
 * GET USER BY ID
 * ==============
 * Fetches detailed information about specific user
 *
 * Backend endpoint: GET /api/admin/users/:id
 *
 * Returns complete user profile including:
 * - Basic info (name, email, phone)
 * - Account status
 * - Created date
 * - Last login
 * - Activity stats
 *
 * @param userId - User ID
 * @returns Promise with user object
 *
 * Usage Example:
 * ```typescript
 * // View user details
 * const user = await usersService.getById(123);
 * console.log('Name:', user.name);
 * console.log('Email:', user.email);
 * console.log('Status:', user.status);
 * console.log('Role:', user.role);
 * console.log('Created:', user.created_at);
 * ```
 */
export const getById = async (userId: number) => {
  const response = await api.get(`/api/admin/users/${userId}`);
  return response.data.user;
};

/**
 * UPDATE USER STATUS
 * ==================
 * Changes user account status
 *
 * Backend endpoint: PUT /api/admin/users/:id/status
 *
 * Status options:
 * - 'active' - User can access platform normally
 * - 'suspended' - User temporarily blocked (can be reactivated)
 * - 'banned' - User permanently blocked
 *
 * @param userId - User ID
 * @param status - New status
 * @param reason - Reason for status change (optional but recommended)
 * @returns Promise with updated user
 *
 * Usage Examples:
 * ```typescript
 * // Suspend user with reason
 * await usersService.updateStatus(
 *   123,
 *   'suspended',
 *   'Posted spam content'
 * );
 *
 * // Ban user permanently
 * await usersService.updateStatus(
 *   456,
 *   'banned',
 *   'Multiple violations of terms of service'
 * );
 *
 * // Reactivate suspended user
 * await usersService.updateStatus(
 *   123,
 *   'active',
 *   'User appeal approved'
 * );
 *
 * // With error handling
 * try {
 *   await usersService.updateStatus(userId, 'suspended', reason);
 *   alert('User suspended successfully');
 *   // Refresh user list
 * } catch (error) {
 *   alert('Failed to update user: ' + error);
 * }
 * ```
 */
export const updateStatus = async (
  userId: number,
  status: 'active' | 'suspended' | 'banned',
  reason?: string
) => {
  const response = await api.put(`/api/admin/users/${userId}/status`, {
    status,
    reason
  });

  return response.data;
};

/**
 * DELETE USER
 * ===========
 * Permanently deletes user account and all associated data
 *
 * Backend endpoint: DELETE /api/admin/users/:id
 *
 * ⚠️ WARNING: This action CANNOT be undone!
 * - All user data is deleted
 * - All user posts are deleted
 * - All user content is removed
 * - User cannot be recovered
 *
 * Always show confirmation dialog before calling this!
 *
 * @param userId - User ID
 * @returns Promise with success message
 *
 * Usage Example:
 * ```typescript
 * // ALWAYS confirm before deleting
 * const confirmDelete = window.confirm(
 *   'Are you sure you want to permanently delete this user? ' +
 *   'This action cannot be undone!'
 * );
 *
 * if (confirmDelete) {
 *   try {
 *     await usersService.deleteUser(userId);
 *     alert('User deleted successfully');
 *     // Refresh user list
 *   } catch (error) {
 *     alert('Failed to delete user: ' + error);
 *   }
 * }
 * ```
 */
export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/api/admin/users/${userId}`);
  return response.data;
};

/**
 * GET USER STATISTICS
 * ====================
 * Fetches statistics for specific user
 *
 * Backend endpoint: GET /api/admin/users/:id/stats
 *
 * Returns stats like:
 * - Total posts created
 * - Total services submitted
 * - Total reviews written
 * - Total comments
 * - Account age
 *
 * @param userId - User ID
 * @returns Promise with user statistics
 *
 * Usage Example:
 * ```typescript
 * const stats = await usersService.getStats(123);
 *
 * console.log('Posts:', stats.totalPosts);
 * console.log('Services:', stats.totalServices);
 * console.log('Reviews:', stats.totalReviews);
 * console.log('Account age:', stats.accountAgeDays, 'days');
 *
 * // Display in UI
 * <div>
 *   <h3>User Activity</h3>
 *   <p>Posts: {stats.totalPosts}</p>
 *   <p>Services: {stats.totalServices}</p>
 *   <p>Reviews: {stats.totalReviews}</p>
 * </div>
 * ```
 */
export const getStats = async (userId: number) => {
  const response = await api.get(`/api/admin/users/${userId}/stats`);
  return response.data.stats;
};

/**
 * EXPORT USER DATA
 * ================
 * Exports user list to CSV file
 *
 * Backend endpoint: GET /api/admin/users/export
 *
 * Generates CSV with all user data for:
 * - Backup purposes
 * - Data analysis
 * - Reporting
 *
 * @param filters - Same filters as getAll()
 * @returns Promise with CSV data
 *
 * Usage Example:
 * ```typescript
 * const exportUsers = async () => {
 *   try {
 *     const csv = await usersService.exportToCSV({ status: 'active' });
 *
 *     // Create download link
 *     const blob = new Blob([csv], { type: 'text/csv' });
 *     const url = URL.createObjectURL(blob);
 *     const link = document.createElement('a');
 *     link.href = url;
 *     link.download = `users-${new Date().toISOString()}.csv`;
 *     link.click();
 *   } catch (error) {
 *     alert('Export failed: ' + error);
 *   }
 * };
 * ```
 */
export const exportToCSV = async (filters: UserFilters = {}) => {
  const response = await api.get('/api/admin/users/export', {
    params: filters,
    responseType: 'blob' // Important for file download
  });

  return response.data;
};

/**
 * Export all functions as usersService object
 */
const usersService = {
  getAll,
  getById,
  updateStatus,
  deleteUser,
  getStats,
  exportToCSV
};

export default usersService;
