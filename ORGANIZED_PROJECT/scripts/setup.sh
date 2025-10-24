#!/bin/bash

# ============================================================================
# Helio Platform - Complete Setup Script
# ============================================================================
# This script sets up the entire Helio Platform project
# Run this after cloning the repository
# ============================================================================

echo "🚀 Setting up Helio Platform..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================================================
# 1. BACKEND SETUP
# ============================================================================
echo "${BLUE}📦 Setting up Backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "${YELLOW}⚠️  Creating .env file...${NC}"
    cp .env.example .env
    echo "✅ Please update backend/.env with your Supabase credentials"
else
    echo "✅ .env file exists"
fi

echo "Installing backend dependencies..."
npm install

echo "Building backend..."
npm run build

cd ..
echo "${GREEN}✅ Backend setup complete!${NC}"
echo ""

# ============================================================================
# 2. PUBLIC WEBSITE SETUP
# ============================================================================
echo "${BLUE}📦 Setting up Public Website...${NC}"
cd public-website

if [ ! -f ".env" ]; then
    echo "${YELLOW}⚠️  Creating .env file...${NC}"
    cat > .env << EOF
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
EOF
    echo "✅ Please update public-website/.env with your credentials"
else
    echo "✅ .env file exists"
fi

echo "Installing public website dependencies..."
npm install

cd ..
echo "${GREEN}✅ Public website setup complete!${NC}"
echo ""

# ============================================================================
# 3. ADMIN DASHBOARD SETUP
# ============================================================================
echo "${BLUE}📦 Setting up Admin Dashboard...${NC}"
cd admin-dashboard

if [ ! -f ".env" ]; then
    echo "${YELLOW}⚠️  Creating .env file...${NC}"
    cat > .env << EOF
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
EOF
    echo "✅ Please update admin-dashboard/.env with your credentials"
else
    echo "✅ .env file exists"
fi

echo "Installing admin dashboard dependencies..."
npm install

cd ..
echo "${GREEN}✅ Admin dashboard setup complete!${NC}"
echo ""

# ============================================================================
# SETUP COMPLETE
# ============================================================================
echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ Setup Complete!${NC}"
echo "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. ${YELLOW}Update environment variables:${NC}"
echo "   - backend/.env"
echo "   - public-website/.env"
echo "   - admin-dashboard/.env"
echo ""
echo "2. ${YELLOW}Setup database:${NC}"
echo "   - Run database/admin_schema.sql in Supabase"
echo "   - Run CREATE_ADMIN_USER.sql"
echo ""
echo "3. ${YELLOW}Start development servers:${NC}"
echo "   ${BLUE}./scripts/dev.sh${NC}"
echo ""
echo "4. ${YELLOW}Access the applications:${NC}"
echo "   - Backend: http://localhost:5000"
echo "   - Public Website: http://localhost:3000"
echo "   - Admin Dashboard: http://localhost:3001"
echo ""
echo "For more information, see README.md"
echo ""
