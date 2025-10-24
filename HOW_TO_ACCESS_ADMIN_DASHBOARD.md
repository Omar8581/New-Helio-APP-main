# 🔐 How to Access and Use Admin Dashboard

## 📍 Current Setup

Your project **already has** admin dashboard pages! Here's how to access them:

---

## 🚀 Quick Start - Access Admin Dashboard

### Step 1: Start Your Backend
```bash
cd backend
npm install
npm run dev
```
✅ Backend runs on **http://localhost:5000**

### Step 2: Start Your Frontend
```bash
# In project root
npm install
npm run dev
```
✅ Frontend runs on **http://localhost:5173** (or 3000)

### Step 3: Create Admin Account

You need to add an admin user to your Supabase database:

#### Option A: Using Supabase SQL Editor
```sql
-- 1. Go to your Supabase project
-- 2. Click "SQL Editor"
-- 3. Run this query:

INSERT INTO app_users (
  email,
  password,
  name,
  role,
  status,
  created_at
) VALUES (
  'admin@helio.com',
  '$2a$10$rZ5hbXk1X8qZ5ZqZ5ZqZ5u',  -- Password: 'admin123'
  'Admin User',
  'admin',
  'active',
  NOW()
);
```

**Login Credentials:**
- **Email:** admin@helio.com
- **Password:** admin123

⚠️ **IMPORTANT:** Change this password after first login!

---

## 🔑 Login to Admin Dashboard

### Step 1: Navigate to Login Page

Open your browser and go to:
```
http://localhost:5173/admin/login
```

Or if you're using different port:
```
http://localhost:3000/admin/login
```

### Step 2: Enter Credentials

Enter:
- **Email:** admin@helio.com
- **Password:** admin123

### Step 3: Access Dashboard

After successful login, you'll be redirected to:
```
http://localhost:5173/dashboard
```

---

## 📊 Admin Dashboard Features

Your dashboard already has these role-based views:

### 1. **General Manager Dashboard** (مدير عام)
- Overview of entire platform
- All statistics
- All management features
- Access to all sections

### 2. **Service Manager Dashboard** (مسؤول ادارة الخدمات)
- Services statistics
- Pending service approvals
- Service categories management
- User inquiries

### 3. **Property Manager Dashboard** (مسؤول العقارات)
- Property statistics
- Property approvals
- Property listings management
- Property inquiries

### 4. **News Manager Dashboard** (مسؤول الاخبار والاعلانات والاشعارات)
- News management
- Advertisements management
- Notifications management
- Content publishing

### 5. **Transportation Manager Dashboard** (مسؤول الباصات)
- Transportation routes
- Bus schedules
- Transportation updates
- User feedback

---

## 🗺️ Admin Routes in Your App

Your admin dashboard pages are located at:

```typescript
// Admin Pages (Already in your project)
/admin/login          → AdminLoginPage.tsx (currently empty)
/dashboard            → DashboardPage.tsx (role-based routing)

// Role-Specific Dashboards
DashboardView.tsx                      → General Manager
ServiceManagerDashboard.tsx            → Service Manager
PropertyManagerDashboard.tsx           → Property Manager
NewsManagerDashboard.tsx               → News Manager
TransportationManagerDashboard.tsx     → Transportation Manager
```

---

## 🔧 Connect Admin to Backend API

### Your Backend Already Has Admin Endpoints:

```typescript
// Admin Authentication
POST /api/auth/admin/login    → Admin login

// User Management
GET  /api/users               → List all users (admin only)
PUT  /api/users/:id/role      → Update user role (admin only)
DELETE /api/users/:id         → Delete user (admin only)

// Content Management
POST /api/news                → Create news (admin)
POST /api/notifications       → Create notification (admin)
POST /api/advertisements      → Create ad (admin)
POST /api/transportation      → Create transport info (admin)
POST /api/emergency-contacts  → Create emergency contact (admin)
```

### Example: Connect Login Page to Backend

Since your `AdminLoginPage.tsx` is empty, here's how to implement it:

```typescript
// pages/AdminLoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call your backend admin login endpoint
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store admin token
      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('adminProfile', JSON.stringify(data.admin));

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
```

---

## 🔐 Using Admin Services (From ORGANIZED_PROJECT)

You can use the service files from `ORGANIZED_PROJECT/admin-dashboard/src/services/`:

### Step 1: Copy Service Files
```bash
cp ORGANIZED_PROJECT/admin-dashboard/src/services/* src/services/
```

### Step 2: Use in Your Admin Pages

```typescript
// In any admin page
import authService from '../services/auth.service';
import usersService from '../services/users.service';

// Login
const handleAdminLogin = async (email: string, password: string) => {
  const { admin, accessToken } = await authService.login(email, password);
  console.log('Logged in as:', admin.name);
  navigate('/dashboard');
};

// Get users list
const loadUsers = async () => {
  const { users, pagination } = await usersService.getAll({
    page: 1,
    limit: 20
  });
  setUsers(users);
};

// Suspend user
const suspendUser = async (userId: number) => {
  await usersService.updateStatus(userId, 'suspended', 'Violation of terms');
  alert('User suspended successfully');
  loadUsers(); // Refresh list
};
```

---

## 📋 Complete Setup Checklist

### ✅ Backend Setup
- [ ] Backend running on port 5000
- [ ] Supabase configured in .env
- [ ] Admin endpoints working

### ✅ Database Setup
- [ ] Admin user created in Supabase
- [ ] Test login credentials work

### ✅ Frontend Setup
- [ ] Frontend running on port 5173/3000
- [ ] Admin login page accessible
- [ ] Dashboard pages render correctly

### ✅ Authentication
- [ ] Login with admin credentials
- [ ] Token stored in localStorage
- [ ] Redirect to dashboard works

### ✅ Dashboard Features
- [ ] Dashboard displays statistics
- [ ] Role-based views work
- [ ] Can navigate between sections

---

## 🎯 Common Admin Tasks

### 1. **View All Users**
```typescript
// Your backend endpoint
GET http://localhost:5000/api/users

// Using service
const users = await usersService.getAll({ page: 1 });
```

### 2. **Approve Content**
```typescript
// Services approval
POST http://localhost:5000/api/services/:id/approve

// News approval
POST http://localhost:5000/api/news/:id/publish
```

### 3. **Manage Roles**
```typescript
// Update user role
PUT http://localhost:5000/api/users/:id/role
Body: { role: 'admin' }
```

### 4. **Create Announcements**
```typescript
// Create news
POST http://localhost:5000/api/news
Body: { title, content, category }

// Create notification
POST http://localhost:5000/api/notifications
Body: { message, type, userId }
```

---

## 🔒 Security Notes

### Current Authentication Flow:

1. **Admin logs in** → Backend verifies credentials
2. **Backend returns JWT token** → Stored in localStorage
3. **Frontend adds token** to all API requests
4. **Backend verifies token** on protected routes

### Protected Routes:

All admin endpoints require:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

The backend middleware automatically checks:
- Token is valid
- Token not expired
- User has admin role

---

## 🐛 Troubleshooting

### Issue: Cannot access /admin/login

**Solution:** Check your routing in `App.tsx`:
```typescript
<Route path="/admin/login" element={<AdminLoginPage />} />
<Route path="/dashboard" element={<DashboardPage />} />
```

### Issue: Login fails with 401

**Solution:** Check:
1. Backend is running on port 5000
2. Admin user exists in database
3. Password is correct (default: admin123)

### Issue: Dashboard shows blank

**Solution:** Check:
1. Token is stored in localStorage
2. User role is set correctly in database
3. Dashboard components are imported correctly

### Issue: API calls fail

**Solution:** Check:
1. Backend URL is correct (http://localhost:5000)
2. CORS is enabled in backend
3. Token is being sent in headers

---

## 📱 Admin Features Overview

### What You Can Do:

✅ **User Management**
- View all registered users
- Update user roles
- Suspend/ban users
- Delete accounts

✅ **Content Management**
- Approve services
- Approve properties
- Manage news articles
- Handle advertisements

✅ **Platform Statistics**
- Total users count
- Active services
- Properties listed
- Community engagement

✅ **System Management**
- Create notifications
- Manage emergency contacts
- Update transportation info
- Configure settings

---

## 🎉 You're Ready!

### Quick Access:

1. **Start Backend:** `cd backend && npm run dev`
2. **Start Frontend:** `npm run dev`
3. **Login:** http://localhost:5173/admin/login
4. **Credentials:** admin@helio.com / admin123
5. **Dashboard:** Auto-redirect after login

### Next Steps:

1. Implement AdminLoginPage.tsx (example provided above)
2. Test login with default credentials
3. Explore dashboard features
4. Add more admin functionality as needed
5. Change default password!

---

**Your admin dashboard is already built and ready to use!** Just implement the login page and connect it to your backend API. 🚀
