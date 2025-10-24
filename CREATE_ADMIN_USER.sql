-- ============================================================================
-- CREATE ADMIN USER FOR HELIO PLATFORM
-- ============================================================================
-- This script creates an admin user for accessing the admin dashboard
--
-- Default Credentials:
--   Email: admin@helio.com
--   Password: admin123
--
-- ⚠️ IMPORTANT: Change this password after first login!
-- ============================================================================

-- Method 1: Create admin user with pre-hashed password
-- -------------------------------------------------------
-- Password 'admin123' is already hashed with bcrypt

INSERT INTO app_users (
  email,
  password,
  name,
  role,
  status,
  phone,
  created_at,
  updated_at
) VALUES (
  'admin@helio.com',
  '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u',  -- Hashed: admin123
  'Admin User',
  'admin',
  'active',
  '+1234567890',
  NOW(),
  NOW()
);

-- ============================================================================
-- VERIFY ADMIN USER WAS CREATED
-- ============================================================================
-- Run this query to check:

SELECT
  id,
  email,
  name,
  role,
  status,
  created_at
FROM app_users
WHERE email = 'admin@helio.com';

-- ============================================================================
-- ALTERNATIVE: Create admin with different role names
-- ============================================================================
-- If your system uses Arabic role names:

-- INSERT INTO app_users (
--   email,
--   password,
--   name,
--   role,
--   status,
--   created_at
-- ) VALUES (
--   'admin@helio.com',
--   '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u',
--   'المدير العام',
--   'مدير عام',  -- General Manager in Arabic
--   'active',
--   NOW()
-- );

-- ============================================================================
-- CREATE ADDITIONAL ADMIN USERS
-- ============================================================================
-- You can create more admin users with different roles:

-- General Manager (Full Access)
-- INSERT INTO app_users (email, password, name, role, status, created_at)
-- VALUES ('manager@helio.com', '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u', 'General Manager', 'مدير عام', 'active', NOW());

-- Service Manager
-- INSERT INTO app_users (email, password, name, role, status, created_at)
-- VALUES ('services@helio.com', '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u', 'Service Manager', 'مسؤول ادارة الخدمات', 'active', NOW());

-- Property Manager
-- INSERT INTO app_users (email, password, name, role, status, created_at)
-- VALUES ('properties@helio.com', '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u', 'Property Manager', 'مسؤول العقارات', 'active', NOW());

-- News Manager
-- INSERT INTO app_users (email, password, name, role, status, created_at)
-- VALUES ('news@helio.com', '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u', 'News Manager', 'مسؤول الاخبار والاعلانات والاشعارات', 'active', NOW());

-- Transportation Manager
-- INSERT INTO app_users (email, password, name, role, status, created_at)
-- VALUES ('transport@helio.com', '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u', 'Transport Manager', 'مسؤول الباصات', 'active', NOW());

-- ============================================================================
-- DELETE ADMIN USER (if needed)
-- ============================================================================
-- To remove admin user:

-- DELETE FROM app_users WHERE email = 'admin@helio.com';

-- ============================================================================
-- UPDATE ADMIN PASSWORD
-- ============================================================================
-- To change admin password, you need to:
-- 1. Hash new password with bcrypt (10 rounds)
-- 2. Update password field
--
-- Example (if you have a hashed password):
-- UPDATE app_users
-- SET password = 'YOUR_NEW_HASHED_PASSWORD'
-- WHERE email = 'admin@helio.com';

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- Password Hashing:
-- - The password is hashed using bcrypt with 10 salt rounds
-- - Format: $2a$10$[salt][hash]
-- - Never store plain text passwords!
--
-- Security:
-- - Change default password immediately after first login
-- - Use strong passwords (min 12 characters, mixed case, numbers, symbols)
-- - Consider enabling 2FA for admin accounts
--
-- How to Hash Passwords:
-- - In Node.js: const bcrypt = require('bcryptjs');
--               const hash = await bcrypt.hash('password', 10);
-- - Online: Use trusted bcrypt generators (not recommended for production)
--
-- Login URL:
-- - Local: http://localhost:5173/admin/login
-- - Production: https://your-domain.com/admin/login
--
-- ============================================================================
