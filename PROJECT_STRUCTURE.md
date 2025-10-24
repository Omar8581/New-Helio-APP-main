# 📁 HELIO PLATFORM - COMPLETE PROJECT STRUCTURE

## 🎯 Overview
This project contains TWO main applications:
1. **Admin Dashboard** - For admins to manage the platform
2. **Public Website** - For users to access services

Both share the same backend API and database.

---

## 📂 Recommended Folder Structure

```
helio-platform/
│
├── 📁 backend/                          # ⭐ BACKEND API (Shared by both apps)
│   ├── src/
│   │   ├── controllers/                # Business logic
│   │   │   ├── adminController.ts      # ⭐ Admin dashboard logic
│   │   │   ├── authController.ts       # Authentication
│   │   │   ├── usersController.ts      # User management
│   │   │   ├── servicesController.ts   # Services CRUD
│   │   │   └── ... (17 controllers total)
│   │   │
│   │   ├── routes/                     # API endpoints
│   │   │   ├── admin.ts                # ⭐ Admin API routes
│   │   │   ├── auth.ts                 # Auth routes
│   │   │   ├── users.ts                # User routes
│   │   │   └── ... (17 route files)
│   │   │
│   │   ├── middleware/                 # Middleware functions
│   │   │   └── auth.ts                 # Authentication & authorization
│   │   │
│   │   ├── utils/                      # Utility functions
│   │   │   ├── jwt.ts                  # JWT token handling
│   │   │   ├── validation.ts           # Input validation
│   │   │   └── errorHandler.ts         # Error handling
│   │   │
│   │   ├── config/                     # Configuration
│   │   │   └── database.ts             # Supabase connection
│   │   │
│   │   └── server.ts                   # ⭐ Main server file
│   │
│   ├── dist/                           # Compiled JavaScript (build output)
│   ├── package.json                    # Backend dependencies
│   ├── tsconfig.json                   # TypeScript config
│   └── .env                            # Environment variables
│
├── 📁 admin-dashboard/                  # ⭐ ADMIN DASHBOARD (Frontend)
│   ├── src/
│   │   ├── pages/                      # Admin pages
│   │   │   ├── LoginPage.tsx           # Admin login
│   │   │   ├── DashboardPage.tsx       # Dashboard home
│   │   │   ├── UsersPage.tsx           # User management
│   │   │   ├── ApprovalsPage.tsx       # Content approval
│   │   │   ├── AuditLogsPage.tsx       # Audit logs
│   │   │   └── SettingsPage.tsx        # Settings
│   │   │
│   │   ├── components/                 # Admin components
│   │   │   ├── StatsCard.tsx           # Statistics card
│   │   │   ├── UserTable.tsx           # User list table
│   │   │   ├── ApprovalCard.tsx        # Approval item card
│   │   │   ├── AdminSidebar.tsx        # Admin sidebar
│   │   │   └── AdminHeader.tsx         # Admin header
│   │   │
│   │   ├── services/                   # API service layer
│   │   │   ├── api.ts                  # API client setup
│   │   │   ├── auth.service.ts         # Admin auth API calls
│   │   │   ├── users.service.ts        # Users API calls
│   │   │   ├── approvals.service.ts    # Approvals API calls
│   │   │   └── logs.service.ts         # Audit logs API calls
│   │   │
│   │   ├── context/                    # State management
│   │   │   ├── AuthContext.tsx         # Admin auth context
│   │   │   └── AppContext.tsx          # App-wide context
│   │   │
│   │   ├── utils/                      # Utility functions
│   │   │   ├── formatters.ts           # Date/number formatting
│   │   │   └── validators.ts           # Form validation
│   │   │
│   │   ├── types/                      # TypeScript types
│   │   │   └── admin.types.ts          # Admin-specific types
│   │   │
│   │   ├── App.tsx                     # Main admin app component
│   │   └── index.tsx                   # Entry point
│   │
│   ├── public/                         # Static assets
│   ├── package.json                    # Admin dashboard dependencies
│   ├── tsconfig.json                   # TypeScript config
│   └── vite.config.ts                  # Vite config
│
├── 📁 public-website/                   # ⭐ PUBLIC WEBSITE (Frontend)
│   ├── src/
│   │   ├── pages/                      # Public pages
│   │   │   ├── HomePage.tsx            # Public homepage
│   │   │   ├── LoginPage.tsx           # User login
│   │   │   ├── RegisterPage.tsx        # User registration
│   │   │   ├── ServicesPage.tsx        # Browse services
│   │   │   ├── ServiceDetailPage.tsx   # Service details
│   │   │   ├── PropertiesPage.tsx      # Browse properties
│   │   │   ├── CommunityPage.tsx       # Community feed
│   │   │   ├── ProfilePage.tsx         # User profile
│   │   │   └── ... (50+ pages)
│   │   │
│   │   ├── components/                 # Public components
│   │   │   ├── common/                 # Shared components
│   │   │   │   ├── Header.tsx          # Public header
│   │   │   │   ├── Footer.tsx          # Public footer
│   │   │   │   ├── ServiceCard.tsx     # Service card
│   │   │   │   └── PropertyCard.tsx    # Property card
│   │   │   │
│   │   │   ├── services/               # Service components
│   │   │   ├── properties/             # Property components
│   │   │   └── community/              # Community components
│   │   │
│   │   ├── services/                   # API service layer
│   │   │   ├── api.ts                  # API client setup
│   │   │   ├── auth.service.ts         # User auth API calls
│   │   │   ├── services.service.ts     # Services API calls
│   │   │   └── properties.service.ts   # Properties API calls
│   │   │
│   │   ├── context/                    # State management
│   │   │   ├── AuthContext.tsx         # User auth context
│   │   │   ├── ServicesContext.tsx     # Services state
│   │   │   └── PropertiesContext.tsx   # Properties state
│   │   │
│   │   ├── utils/                      # Utility functions
│   │   ├── types/                      # TypeScript types
│   │   ├── App.tsx                     # Main public app component
│   │   └── index.tsx                   # Entry point
│   │
│   ├── public/                         # Static assets
│   ├── package.json                    # Public website dependencies
│   ├── tsconfig.json                   # TypeScript config
│   └── vite.config.ts                  # Vite config
│
├── 📁 database/                         # ⭐ DATABASE SCHEMAS & MIGRATIONS
│   ├── admin_schema.sql                # Admin tables schema
│   ├── public_schema.sql               # Public tables schema
│   ├── migrations/                     # Database migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_services.sql
│   │   └── 003_create_admin_tables.sql
│   └── seed/                           # Seed data
│       ├── admin_seed.sql              # Admin users seed
│       └── demo_data.sql               # Demo data
│
├── 📁 shared/                           # ⭐ SHARED CODE (Used by both apps)
│   ├── types/                          # Shared TypeScript types
│   │   ├── user.types.ts               # User types
│   │   ├── service.types.ts            # Service types
│   │   └── api.types.ts                # API response types
│   │
│   ├── constants/                      # Shared constants
│   │   ├── api-endpoints.ts            # API endpoint URLs
│   │   └── app-config.ts               # App configuration
│   │
│   └── utils/                          # Shared utilities
│       ├── formatters.ts               # Date/number formatting
│       └── validators.ts               # Validation functions
│
├── 📁 docs/                             # ⭐ DOCUMENTATION
│   ├── ADMIN_INTEGRATION.md            # Admin setup guide
│   ├── API_DOCUMENTATION.md            # API endpoints docs
│   ├── DATABASE_SCHEMA.md              # Database documentation
│   ├── DEPLOYMENT.md                   # Deployment guide
│   └── DEVELOPMENT.md                  # Development guide
│
├── 📁 scripts/                          # ⭐ UTILITY SCRIPTS
│   ├── setup.sh                        # Initial setup script
│   ├── build-all.sh                    # Build everything
│   ├── deploy.sh                       # Deployment script
│   └── seed-database.sh                # Seed database
│
├── .gitignore                          # Git ignore file
├── README.md                           # ⭐ Main project README
├── package.json                        # Root package.json (workspace)
└── .env.example                        # Environment variables example
```

---

## 🎯 Key Principles

### 1. **Separation of Concerns**
- **admin-dashboard/**: Everything related to admin functionality
- **public-website/**: Everything related to public user functionality
- **backend/**: Shared API serving both applications
- **shared/**: Code used by both frontends

### 2. **Clear Naming**
- Files named by purpose: `UsersPage.tsx`, `auth.service.ts`
- Folders named by category: `pages/`, `components/`, `services/`
- No ambiguous names

### 3. **Easy Navigation**
- Each folder has clear purpose
- Related files grouped together
- Maximum 3 levels deep

### 4. **Scalability**
- Easy to add new pages/components
- Clear where new code should go
- No file conflicts

---

## 📊 How It Works Together

```
┌─────────────────────────┐
│   ADMIN DASHBOARD       │
│   (admin-dashboard/)    │
│   Port: 3001            │
└────────┬────────────────┘
         │
         │ HTTP Requests
         ↓
┌─────────────────────────────────┐
│   BACKEND API                   │
│   (backend/)                    │
│   Port: 5000                    │
│                                 │
│   Routes:                       │
│   /api/admin/*  ← Admin         │
│   /api/*        ← Public        │
└────────┬────────────────────────┘
         │
         │ HTTP Requests
         ↑
┌─────────────────────────┐
│   PUBLIC WEBSITE        │
│   (public-website/)     │
│   Port: 3000            │
└─────────────────────────┘
```

---

## 🚀 Development Workflow

### Starting Everything:

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Admin Dashboard
cd admin-dashboard
npm run dev
# Runs on http://localhost:3001

# Terminal 3 - Public Website
cd public-website
npm run dev
# Runs on http://localhost:3000
```

### Building for Production:

```bash
# From root directory
npm run build:all

# Or individually:
cd backend && npm run build
cd admin-dashboard && npm run build
cd public-website && npm run build
```

---

## 📝 File Naming Conventions

### Pages
- `DashboardPage.tsx` - Admin dashboard home
- `UsersPage.tsx` - Admin users management
- `HomePage.tsx` - Public homepage
- `ServicesPage.tsx` - Public services page

### Components
- `AdminSidebar.tsx` - Admin-specific
- `UserTable.tsx` - Reusable table
- `StatsCard.tsx` - Reusable card
- `PublicHeader.tsx` - Public-specific

### Services
- `auth.service.ts` - Authentication API calls
- `users.service.ts` - Users API calls
- `services.service.ts` - Services API calls

### Types
- `admin.types.ts` - Admin types
- `user.types.ts` - User types
- `api.types.ts` - API response types

---

## 🎨 Current Structure vs New Structure

### Current (Mixed):
```
project/
├── pages/          ❌ Mixed admin & public
├── components/     ❌ Mixed admin & public
├── backend/        ✅ Good
└── ...             ❌ Confusing
```

### New (Organized):
```
helio-platform/
├── admin-dashboard/    ✅ Clear - Admin only
├── public-website/     ✅ Clear - Public only
├── backend/            ✅ Clear - Shared API
├── shared/             ✅ Clear - Common code
└── docs/               ✅ Clear - Documentation
```

---

## ✅ Benefits

1. **Easy to Navigate**
   - Know exactly where each file belongs
   - No confusion between admin/public

2. **Easy to Develop**
   - Work on admin without touching public
   - Work on public without touching admin

3. **Easy to Deploy**
   - Deploy admin dashboard separately
   - Deploy public website separately
   - Share same backend

4. **Easy to Maintain**
   - Clear boundaries
   - No file conflicts
   - Scalable structure

5. **Easy for Client**
   - Understand project structure
   - Know where to find things
   - Professional organization
