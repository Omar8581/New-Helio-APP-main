# Helio App Backend API

> Backend API for Helio App - The comprehensive digital platform for New Heliopolis City residents.

## 📖 Quick Links

- **[🚀 Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[📋 Implementation Status](../BACKEND_STATUS.md)** - What's done and what's next
- **[📚 Complete API Guide](../BACKEND_IMPLEMENTATION_GUIDE.md)** - Full endpoint specifications
- **[📝 Summary](../IMPLEMENTATION_SUMMARY.md)** - Project overview

## 🎯 Project Overview

This backend serves a comprehensive city guide application built for residents of New Heliopolis City (مدينة هليوبوليس الجديدة). It provides:

- 🏢 **Services Directory** - Restaurants, hospitals, shops, and more
- 📰 **News & Announcements** - Keep residents informed
- 💬 **Community Forum** - Discussion circles for residents
- 🛒 **Marketplace** - Buy, sell, and trade locally
- 💼 **Job Board** - Local job opportunities
- 🏠 **Real Estate** - Property listings (sale/rent)
- 🎁 **Exclusive Offers** - Deals from local businesses
- 🚌 **Transportation** - Bus schedules and routes
- 🚨 **Emergency Info** - Important contact numbers

## 🏗️ Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL with RLS)
- **Authentication:** JWT (Access + Refresh tokens)
- **Validation:** Joi
- **File Upload:** Cloudinary (optional)
- **Security:** Helmet, CORS, Rate Limiting

## ✅ Current Status

- ✅ **Database Schema:** Complete (28 tables with RLS)
- ✅ **Directory Structure:** Ready
- ✅ **Dependencies:** Defined in package.json
- ⏳ **Implementation:** Ready to start
- ⏳ **Testing:** Pending
- ⏳ **Deployment:** Pending

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account (database already set up)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Supabase credentials
# Get Service Role Key from: https://supabase.com/dashboard → Settings → API
nano .env
```

### Configuration

Required environment variables in `.env`:

```env
PORT=5000
NODE_ENV=development

# Supabase (REQUIRED)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

# JWT (REQUIRED - generate strong random strings)
JWT_SECRET=your_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary (OPTIONAL - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (REQUIRED)
CORS_ORIGIN=http://localhost:3000
```

### Development

```bash
# Start development server with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

### Production

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts           # Supabase client setup
│   ├── controllers/
│   │   ├── authController.ts     # Authentication logic
│   │   ├── servicesController.ts # Services CRUD
│   │   ├── usersController.ts    # User management
│   │   └── ...                   # Other controllers
│   ├── middleware/
│   │   └── auth.ts               # JWT authentication
│   ├── routes/
│   │   ├── auth.ts               # Auth endpoints
│   │   ├── services.ts           # Services endpoints
│   │   └── ...                   # Other routes
│   ├── utils/
│   │   ├── jwt.ts                # Token utilities
│   │   ├── validation.ts         # Joi schemas
│   │   ├── errorHandler.ts       # Error handling
│   │   └── fileUpload.ts         # Cloudinary upload
│   └── server.ts                 # Express app entry point
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                 # Dependencies
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── .env                          # Environment variables (git-ignored)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── QUICKSTART.md                 # Step-by-step guide
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register          Register new user
POST   /api/auth/login             User login
POST   /api/auth/admin/login       Admin login
POST   /api/auth/refresh           Refresh access token
POST   /api/auth/logout            Logout user
GET    /api/auth/me                Get current user
```

### Services

```
GET    /api/services/categories    Get all categories
GET    /api/services               List services (paginated)
GET    /api/services/:id           Get service details
POST   /api/services               Create service (auth required)
PUT    /api/services/:id           Update service
DELETE /api/services/:id           Delete service (admin only)
POST   /api/services/:id/reviews   Add review
PUT    /api/services/:serviceId/reviews/:reviewId   Update review
DELETE /api/services/:serviceId/reviews/:reviewId   Delete review
POST   /api/services/:serviceId/reviews/:reviewId/reply  Admin reply
```

### Additional Modules (To Be Implemented)

- **Users:** User management and profiles
- **Properties:** Real estate listings
- **Community:** Posts, comments, likes
- **Marketplace:** Items for sale
- **Jobs:** Job postings
- **Lost & Found:** Lost and found items
- **Offers:** Exclusive deals
- **News:** News articles
- **Transportation:** Bus routes and schedules
- **Emergency:** Emergency contacts

**See [BACKEND_IMPLEMENTATION_GUIDE.md](../BACKEND_IMPLEMENTATION_GUIDE.md) for complete API documentation.**

## 🔒 Security Features

- ✅ **JWT Authentication** - Access + refresh token pattern
- ✅ **Password Hashing** - bcrypt with salt
- ✅ **Row Level Security** - Database-level permissions
- ✅ **Input Validation** - Joi schemas on all endpoints
- ✅ **CORS Protection** - Configurable origins
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **Helmet** - Security headers
- ✅ **HTTP-Only Cookies** - Secure token storage

## 🧪 Testing

### Manual Testing with curl

```bash
# Health check
curl http://localhost:5000/health

# Register user
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

# Get services (with auth)
curl http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Using Postman

1. Import the API collection (create one)
2. Set base URL: `http://localhost:5000`
3. Create environment variable: `{{token}}`
4. Test each endpoint systematically

## 📊 Database Schema

### Tables Overview (28 total)

**Users & Auth:**
- `app_users`, `admin_users`

**Services:**
- `categories`, `sub_categories`, `services`, `reviews`

**Content:**
- `news`, `notifications`, `advertisements`

**Community:**
- `circles`, `posts`, `comments`, `post_likes`

**Marketplace:**
- `marketplace_items`, `job_postings`, `lost_and_found_items`

**Offers:**
- `exclusive_offers`, `user_offers`

**Transportation:**
- `drivers`, `weekly_schedules`, `external_routes`, `internal_routes`, `supervisors`

**Other:**
- `properties`, `emergency_contacts`, `service_guides`, `public_pages_content`, `audit_logs`

All tables have:
- ✅ Row Level Security (RLS) enabled
- ✅ Created/updated timestamps
- ✅ Proper indexes
- ✅ Foreign key constraints
- ✅ Cascade delete rules

## 🔄 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/service-api
   ```

2. **Implement controller**
   - Create `src/controllers/yourController.ts`
   - Follow existing patterns
   - Add error handling

3. **Create routes**
   - Create `src/routes/yourRoutes.ts`
   - Add validation middleware
   - Add auth middleware where needed

4. **Register in server**
   - Import routes in `src/server.ts`
   - Add `app.use('/api/your-module', yourRoutes)`

5. **Test thoroughly**
   - Test all endpoints with Postman
   - Test error cases
   - Test authentication

6. **Commit and merge**
   ```bash
   git add .
   git commit -m "feat: implement your feature"
   git push origin feature/service-api
   ```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Supabase connection error:**
- Verify SUPABASE_URL in .env
- Verify SUPABASE_SERVICE_KEY (use service_role, not anon key)
- Check Supabase project is active

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm install -g typescript
tsc --version
```

## 📚 Resources

- [Backend Implementation Guide](../BACKEND_IMPLEMENTATION_GUIDE.md)
- [Backend Status](../BACKEND_STATUS.md)
- [Quick Start Guide](QUICKSTART.md)
- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📝 Scripts

```bash
npm run dev      # Start development server with auto-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
npm test         # Run tests (to be implemented)
```

## 🤝 Contributing

1. Follow the existing code patterns
2. Add comments for complex logic
3. Validate all inputs
4. Handle errors properly
5. Test before committing
6. Update documentation

## 📄 License

MIT

## 👥 Team

Helio Development Team

---

**Need Help?** Check the [QUICKSTART.md](QUICKSTART.md) guide or [BACKEND_IMPLEMENTATION_GUIDE.md](../BACKEND_IMPLEMENTATION_GUIDE.md) for detailed instructions.

**Ready to start?** Follow the [Quick Start](#-quick-start) section above!

🚀 Happy coding!
