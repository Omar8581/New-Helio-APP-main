#!/bin/bash

# ============================================================================
# Helio Platform - Development Server Script
# ============================================================================
# This script starts all development servers simultaneously
# ============================================================================

echo "🚀 Starting Helio Platform Development Servers..."
echo ""

# Kill any existing processes on these ports
echo "Checking for existing processes..."
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null

# Start backend
echo "📦 Starting Backend (Port 5000)..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start public website
echo "🌐 Starting Public Website (Port 3000)..."
cd ../public-website && npm run dev &
WEBSITE_PID=$!

# Start admin dashboard
echo "🔐 Starting Admin Dashboard (Port 3001)..."
cd ../admin-dashboard && npm run dev &
ADMIN_PID=$!

echo ""
echo "✅ All servers started!"
echo ""
echo "========================================="
echo "🎉 Helio Platform is Running!"
echo "========================================="
echo ""
echo "📍 Access your applications:"
echo ""
echo "   Backend API:       http://localhost:5000"
echo "   Public Website:    http://localhost:3000"
echo "   Admin Dashboard:   http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $WEBSITE_PID $ADMIN_PID 2>/dev/null; exit" INT
wait
