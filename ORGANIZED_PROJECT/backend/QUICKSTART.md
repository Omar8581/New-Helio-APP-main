# Helio App Backend - Quick Start Guide

## 🚀 Overview

This backend serves the Helio App - a comprehensive platform for New Heliopolis City residents. It's built with:
- **Node.js + Express** - Web framework
- **TypeScript** - Type safety
- **Supabase** - PostgreSQL database with RLS
- **JWT** - Authentication
- **Cloudinary** - Image uploads (optional)

## ✅ What's Already Done

1. ✅ **Database Schema** - Complete with 28 tables and RLS policies
2. ✅ **Backend Directory** - Structure created with proper organization
3. ✅ **Dependencies** - Listed in package.json
4. ✅ **Frontend** - Fully functional with mock data

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (database already set up)
- Code editor (VS Code recommended)

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase Service Role Key:

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
SUPABASE_SERVICE_KEY=GET_FROM_SUPABASE_DASHBOARD

JWT_SECRET=your-secret-key-min-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=optional
CLOUDINARY_API_KEY=optional
CLOUDINARY_API_SECRET=optional

CORS_ORIGIN=http://localhost:3000
```

**How to get Supabase Service Key:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy "service_role" key (NOT anon key)

### Step 3: Create Missing Files

You need to create the implementation files. The structure is ready but files need code.

**Priority 1 - Core Files:**

1. `src/config/database.ts` - Supabase connection
2. `src/utils/jwt.ts` - Token management
3. `src/utils/validation.ts` - Input validation
4. `src/utils/errorHandler.ts` - Error handling
5. `src/middleware/auth.ts` - Authentication middleware
6. `src/controllers/authController.ts` - Auth logic
7. `src/routes/auth.ts` - Auth endpoints
8. `src/server.ts` - Main application
9. `tsconfig.json` - TypeScript config

**Templates available in:** `BACKEND_IMPLEMENTATION_GUIDE.md`

### Step 4: Start Development Server

```bash
npm run dev
```

Server should start on `http://localhost:5000`

### Step 5: Test It Works

```bash
# Health check
curl http://localhost:5000/health

# Should return: {"status":"ok","timestamp":"..."}
```

## 📁 File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts              # Supabase client
│   ├── controllers/
│   │   ├── authController.ts        # Auth logic
│   │   ├── servicesController.ts    # Services CRUD
│   │   ├── usersController.ts       # Users management
│   │   └── ...                      # Other controllers
│   ├── middleware/
│   │   └── auth.ts                  # JWT verification
│   ├── routes/
│   │   ├── auth.ts                  # Auth routes
│   │   ├── services.ts              # Services routes
│   │   └── ...                      # Other routes
│   ├── utils/
│   │   ├── jwt.ts                   # Token utilities
│   │   ├── validation.ts            # Joi schemas
│   │   ├── errorHandler.ts          # Error handling
│   │   └── fileUpload.ts            # Cloudinary upload
│   └── server.ts                    # Express app
├── package.json
├── tsconfig.json
├── .env
├── .env.example
└── README.md
```

## 🎯 Implementation Checklist

### Phase 1: Authentication (Do This First!)

- [ ] Create database config
- [ ] Create JWT utilities
- [ ] Create validation schemas
- [ ] Create error handler
- [ ] Create auth middleware
- [ ] Create auth controller
- [ ] Create auth routes
- [ ] Create main server file
- [ ] Test registration
- [ ] Test login
- [ ] Test protected routes

### Phase 2: Core Features

- [ ] Implement Services API
- [ ] Implement Users API
- [ ] Implement Properties API
- [ ] Test with Postman

### Phase 3: Community

- [ ] Implement Posts/Community
- [ ] Implement Marketplace
- [ ] Implement Jobs
- [ ] Implement Lost & Found

### Phase 4: Advanced

- [ ] Implement Offers system
- [ ] Implement Transportation
- [ ] Implement Emergency contacts
- [ ] Implement File uploads

### Phase 5: Integration

- [ ] Connect frontend to backend
- [ ] Replace mock data
- [ ] End-to-end testing
- [ ] Deploy to production

## 🔑 Database Tables Available

Your Supabase database has these tables ready to use:

**Users & Auth:**
- `app_users` - User accounts
- `admin_users` - Admin accounts

**Services:**
- `categories` - Service categories
- `sub_categories` - Sub-categories
- `services` - Service listings
- `reviews` - Service reviews

**Properties:**
- `properties` - Real estate listings

**Content:**
- `news` - News articles
- `notifications` - User notifications
- `advertisements` - Ads

**Community:**
- `circles` - Discussion groups
- `posts` - Community posts
- `comments` - Post comments
- `post_likes` - Like tracking

**Marketplace:**
- `marketplace_items` - Items for sale
- `job_postings` - Job listings
- `lost_and_found_items` - Lost & found

**Offers:**
- `exclusive_offers` - Service offers
- `user_offers` - Claimed offers

**Transportation:**
- `drivers` - Drivers info
- `weekly_schedules` - Schedules
- `external_routes` - External routes
- `internal_routes` - Internal routes
- `supervisors` - Supervisors

**Other:**
- `emergency_contacts` - Emergency numbers
- `service_guides` - Service guides
- `public_pages_content` - CMS content
- `audit_logs` - Audit trail

## 🧪 Testing Your API

### Using curl

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get services (with token)
curl http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Postman

1. Import collection (create one)
2. Set base URL: `http://localhost:5000`
3. Create requests for each endpoint
4. Use {{token}} variable for auth

## 📖 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - User login
POST   /api/auth/admin/login     - Admin login
POST   /api/auth/refresh         - Refresh access token
POST   /api/auth/logout          - Logout user
GET    /api/auth/me              - Get current user
```

### Services Endpoints

```
GET    /api/services/categories  - Get all categories
GET    /api/services             - List services (paginated)
GET    /api/services/:id         - Get service by ID
POST   /api/services             - Create service (auth)
PUT    /api/services/:id         - Update service (auth)
DELETE /api/services/:id         - Delete service (admin)
POST   /api/services/:id/reviews - Add review (auth)
```

### Full API Reference

See `BACKEND_IMPLEMENTATION_GUIDE.md` for complete endpoint list.

## 🔒 Security Notes

1. **Never commit `.env` to git** - Already in `.gitignore`
2. **Use strong JWT secrets** - Minimum 32 characters
3. **Service Key is sensitive** - Don't expose in frontend
4. **Enable HTTPS in production**
5. **Set secure cookie flags** - In production environment
6. **Review RLS policies** - Already configured but verify

## 🐛 Troubleshooting

### Port already in use
```bash
# Find process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Supabase connection error
- Verify SUPABASE_URL is correct
- Verify SUPABASE_SERVICE_KEY is the service_role key
- Check internet connection
- Verify Supabase project is active

### TypeScript errors
```bash
# Install TypeScript
npm install -g typescript

# Check TypeScript version
tsc --version
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server with auto-reload

# Production
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server

# Testing
npm test             # Run tests (after implementing)

# Database
npx supabase status  # Check Supabase status
```

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)
- [Postman Learning](https://learning.postman.com/)

## 💬 Need Help?

1. Check `BACKEND_IMPLEMENTATION_GUIDE.md` for detailed instructions
2. Check `BACKEND_STATUS.md` for current implementation status
3. Review existing code patterns in frontend
4. Check Supabase dashboard for database structure
5. Look at types in `packages/shared-logic/types.ts`

## ✨ Tips for Success

1. **Start small** - Get auth working first, then expand
2. **Test frequently** - Test each endpoint as you build
3. **Follow patterns** - Use consistent code structure
4. **Use types** - Leverage TypeScript for fewer bugs
5. **Read error messages** - They usually tell you what's wrong
6. **Check examples** - Reference implementations available
7. **Document as you go** - Add comments for complex logic

## 🎉 You're Ready!

Everything is set up. The database is ready, the structure is in place, and you have all the tools you need. Start with authentication, test thoroughly, and build from there.

Good luck! 🚀

---

**Questions?** Check the implementation guide or backend status documents in the project root.
