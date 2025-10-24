# Deployment Guide

Guide for deploying Helio Platform to production.

## Prerequisites

- Node.js 18+
- Supabase account
- Domain name (optional)

## Environment Setup

### 1. Backend Environment Variables

Create `.env` file in `backend/`:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Server
PORT=5000
NODE_ENV=production
```

### 2. Frontend Environment Variables

Create `.env` in `public-website/` and `admin-dashboard/`:

```env
VITE_API_URL=https://your-api-domain.com
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Database Setup

### 1. Run Migrations

```bash
# In Supabase SQL Editor, run:
database/admin_schema.sql
database/public_schema.sql
```

### 2. Create Admin User

```bash
# Run CREATE_ADMIN_USER.sql in Supabase
```

## Backend Deployment

### Option 1: Vercel/Netlify

```bash
cd backend
npm install
npm run build
# Deploy dist/ folder
```

### Option 2: Railway/Render

```bash
# Connect GitHub repository
# Set environment variables
# Deploy automatically
```

### Option 3: VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd backend

# Install dependencies
npm install

# Build
npm run build

# Install PM2
sudo npm install -g pm2

# Start server
pm2 start dist/server.js --name helio-backend

# Setup nginx reverse proxy
# ... (nginx configuration)
```

## Frontend Deployment

### Public Website

```bash
cd public-website
npm install
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

### Admin Dashboard

```bash
cd admin-dashboard
npm install
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

## Post-Deployment

1. Test all API endpoints
2. Verify admin login works
3. Check database connections
4. Setup SSL certificates
5. Configure CORS properly
6. Setup monitoring (optional)

## Troubleshooting

### CORS Errors
- Add your domain to backend CORS whitelist
- Check backend/src/server.ts

### Database Connection Failed
- Verify SUPABASE_URL and keys
- Check Supabase project is active

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
