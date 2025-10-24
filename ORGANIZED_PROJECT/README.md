# 🌟 Helio Platform - Complete City Services Platform

A comprehensive platform connecting residents with city services, properties, community features, and local businesses.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Technology Stack](#technology-stack)
- [Development](#development)
- [Admin Access](#admin-access)

## ✨ Features

### 🔐 Admin Dashboard
- User Management - View, manage, suspend, and delete users
- Content Moderation - Approve services, properties, and community posts
- Analytics Dashboard - Platform statistics and insights
- Role-Based Access - Multiple admin roles with specific permissions
- Notifications - Send platform-wide announcements

### 🌐 Public Website
- Services Directory - Search and browse local services
- Property Listings - Rent and sale properties with advanced filters
- Community Hub - Social posts, marketplace, jobs, lost & found
- News & Updates - Local news and announcements
- Transportation - Bus schedules and routes
- Reviews & Ratings - User feedback system

### 🔧 Backend API
- 115 RESTful API endpoints
- JWT Authentication - Secure token-based auth
- Role-Based Authorization - User, business, and admin roles
- File Uploads - Image and document handling
- Rate Limiting - API protection

## 🏗️ Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│  ADMIN DASHBOARD    │         │  PUBLIC WEBSITE      │
│  React + TypeScript │         │  React + TypeScript  │
│  Port: 3001         │         │  Port: 3000          │
└──────────┬──────────┘         └──────────┬───────────┘
           │                               │
           └───────────┬───────────────────┘
                       │
                       ↓
           ┌───────────────────────┐
           │   BACKEND API         │
           │   Express + TypeScript│
           │   Port: 5000          │
           │   115 Endpoints       │
           └───────────┬───────────┘
                       │
                       ↓
           ┌───────────────────────┐
           │   SUPABASE DATABASE   │
           │   PostgreSQL          │
           │   40+ Tables          │
           └───────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/helio-platform.git
cd helio-platform
```

**2. Run setup script**
```bash
./scripts/setup.sh
```

**3. Configure environment variables**

Update `.env` files in:
- `backend/.env`
- `public-website/.env`
- `admin-dashboard/.env`

**4. Setup database**

Run in Supabase SQL Editor:
```sql
-- Run database migrations
database/admin_schema.sql

-- Create admin user
CREATE_ADMIN_USER.sql
```

**5. Start development servers**
```bash
./scripts/dev.sh
```

**6. Access the applications**
- Backend API: http://localhost:5000
- Public Website: http://localhost:3000
- Admin Dashboard: http://localhost:3001

## 📁 Project Structure

```
helio-platform/
│
├── backend/                    # Express API Server
│   ├── src/
│   │   ├── controllers/       # Business logic (18 files)
│   │   ├── routes/            # API routes (18 files)
│   │   ├── middleware/        # Auth, validation
│   │   └── server.ts          # App entry point
│   └── package.json
│
├── admin-dashboard/            # Admin Interface
│   ├── src/
│   │   ├── pages/             # Admin pages
│   │   ├── components/        # UI components
│   │   ├── services/          # API service layer
│   │   └── context/           # State management
│   └── package.json
│
├── public-website/             # Public Interface
│   ├── src/
│   │   ├── pages/             # Public pages (50+)
│   │   ├── components/        # UI components
│   │   └── context/           # State management
│   └── package.json
│
├── shared/                     # Shared Code
│   ├── types/                 # TypeScript types
│   └── utils/                 # Shared utilities
│
├── database/                   # Database Schemas
│   └── admin_schema.sql       # Admin tables
│
├── docs/                       # Documentation
│   ├── API_DOCUMENTATION.md   # API reference
│   └── DEPLOYMENT_GUIDE.md    # Deploy guide
│
└── scripts/                    # Utility Scripts
    ├── setup.sh               # Initial setup
    └── dev.sh                 # Start dev servers
```

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md) - Complete API reference
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Deploy to production
- [Admin Access Guide](HOW_TO_ACCESS_ADMIN_DASHBOARD.md) - How to login
- [Quick Start Guide](START_HERE_FIRST.md) - Read this first
- [Folder Guide](FOLDER_GUIDE.md) - Understand structure

## 🛠️ Technology Stack

### Frontend
- React 19 - UI library
- TypeScript - Type safety
- Vite - Build tool
- TailwindCSS - Styling
- React Router - Navigation
- Framer Motion - Animations

### Backend
- Node.js - Runtime
- Express - Web framework
- TypeScript - Type safety
- Supabase - Database & Auth
- JWT - Authentication
- Bcrypt - Password hashing

### Database
- PostgreSQL via Supabase
- 40+ tables
- Row Level Security
- Real-time subscriptions

## 💻 Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
# Public Website
cd public-website
npm run dev

# Admin Dashboard
cd admin-dashboard
npm run dev
```

### Running All Servers
```bash
./scripts/dev.sh
```

## 🔐 Admin Access

### Default Credentials
- Email: admin@helio.com
- Password: admin123

⚠️ Change password after first login!

### Login URLs
- Development: http://localhost:3001/admin/login
- Production: https://your-domain.com/admin/login

## 📊 Project Stats

- Backend: 115 API endpoints
- Frontend: 50+ pages
- Components: 100+ React components
- Database: 40+ tables
- Type Safety: 100% TypeScript

## 🚢 Deployment

See [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📝 License

This project is proprietary and confidential.

---

**Made with ❤️ for connecting communities**

**Start developing today! 🚀**
