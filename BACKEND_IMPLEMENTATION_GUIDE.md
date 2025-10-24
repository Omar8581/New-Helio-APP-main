# Helio App - Backend Implementation Guide

## 📋 Overview

This document provides a complete overview of the backend implementation for the Helio App. The backend is built with Node.js, Express, TypeScript, and Supabase as the database.

## ✅ What Has Been Completed

### 1. Database Schema (Supabase)
A comprehensive database schema has been created with the following tables:

#### User Management
- `app_users` - Public users (residents, service providers)
- `admin_users` - Admin users with different roles
- Row Level Security (RLS) policies implemented

#### Services
- `categories` - Main service categories
- `sub_categories` - Sub-categories for services
- `services` - Service listings with full details
- `reviews` - Reviews with ratings and admin replies

#### Properties
- `properties` - Real estate listings (sale/rent)

#### Content Management
- `news` - News articles
- `notifications` - User notifications with date ranges
- `advertisements` - Promotional ads

#### Community Features
- `circles` - Discussion groups
- `posts` - Community posts (discussions, polls, events)
- `comments` - Comments on posts
- `post_likes` - Like tracking

#### Marketplace
- `marketplace_items` - Items for sale with approval workflow
- `job_postings` - Job listings
- `lost_and_found_items` - Lost and found items

#### Offers System
- `exclusive_offers` - Special offers from service providers
- `user_offers` - User claimed offers with redemption codes

#### Transportation
- `drivers` - Bus/transport drivers
- `weekly_schedules` - Weekly driver schedules
- `external_routes` - Routes to external locations
- `internal_routes` - Routes within the city
- `supervisors` - Transportation supervisors

#### Other Data
- `emergency_contacts` - Emergency phone numbers
- `service_guides` - Guides for city services
- `public_pages_content` - CMS for public pages (JSONB)
- `audit_logs` - System audit trail

### 2. Backend Structure Created

The backend directory structure has been set up at `/backend/` with:

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Supabase client configuration
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   └── servicesController.ts # Services CRUD operations
│   ├── middleware/
│   │   └── auth.ts              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts              # Auth routes
│   │   └── services.ts          # Services routes
│   ├── utils/
│   │   ├── jwt.ts               # JWT token generation/verification
│   │   ├── validation.ts        # Joi validation schemas
│   │   ├── errorHandler.ts     # Error handling utilities
│   │   └── fileUpload.ts        # Cloudinary file upload
│   └── server.ts                # Main Express server
├── package.json
├── tsconfig.json
├── .env.example
├── .env
└── README.md
```

### 3. Implemented Features

#### Authentication System ✅
- JWT-based authentication (access + refresh tokens)
- User registration with bcrypt password hashing
- User login with credential validation
- Admin login with role-based access
- Token refresh mechanism
- HTTP-only cookies for refresh tokens
- Authentication middleware for protected routes

#### Services API ✅
- Get all categories with sub-categories
- List services with pagination, sorting, and filtering
- Get service details by ID
- Create new service (authenticated users)
- Update service (owner or admin)
- Delete service (admin only)
- Add review to service
- Update review (owner or admin)
- Delete review (owner or admin)
- Admin reply to reviews

#### Security Features ✅
- Password hashing with bcryptjs
- JWT token management
- Row Level Security (RLS) on all database tables
- CORS protection
- Helmet security headers
- Rate limiting
- Request validation with Joi
- SQL injection protection via Supabase

#### File Upload ✅
- Cloudinary integration for image uploads
- Automatic image optimization
- Image resizing (max 1200x1200px)
- Organized folder structure
- Multiple file upload support

#### Error Handling ✅
- Centralized error handling middleware
- Standardized error response format
- Validation error handling (422 status)
- Custom error classes
- Async error wrapper

## 📝 API Endpoints Implemented

### Authentication
- ✅ `POST /api/auth/register` - Register new user
- ✅ `POST /api/auth/login` - User login
- ✅ `POST /api/auth/admin/login` - Admin login
- ✅ `POST /api/auth/refresh` - Refresh access token
- ✅ `POST /api/auth/logout` - Logout user
- ✅ `GET /api/auth/me` - Get current user

### Services
- ✅ `GET /api/services/categories` - Get all categories
- ✅ `GET /api/services` - List services (with pagination/filtering)
- ✅ `GET /api/services/:id` - Get service by ID
- ✅ `POST /api/services` - Create service
- ✅ `PUT /api/services/:id` - Update service
- ✅ `DELETE /api/services/:id` - Delete service
- ✅ `POST /api/services/:id/reviews` - Add review
- ✅ `PUT /api/services/:serviceId/reviews/:reviewId` - Update review
- ✅ `DELETE /api/services/:serviceId/reviews/:reviewId` - Delete review
- ✅ `POST /api/services/:serviceId/reviews/:reviewId/reply` - Reply to review

## 🚧 What Needs To Be Implemented

### API Controllers & Routes Still Needed

#### 1. Users Management
Create `usersController.ts` and `users.ts` route:
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin)
- `POST /api/users/:id/request-deletion` - Request account deletion
- `PUT /api/users/:id/role` - Update user role (admin)

#### 2. Properties
Create `propertiesController.ts` and `properties.ts` route:
- `GET /api/properties` - List properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

#### 3. Community
Create `communityController.ts` and `community.ts` route:
- `GET /api/posts` - List posts (with filters)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/pin` - Pin/unpin post (admin)
- `POST /api/posts/:id/poll/:optionIndex` - Vote in poll
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:postId/comments/:commentId` - Delete comment
- `GET /api/circles` - List circles

#### 4. Marketplace
Create `marketplaceController.ts` and `marketplace.ts` route:
- `GET /api/marketplace` - List marketplace items
- `POST /api/marketplace` - Create item
- `PUT /api/marketplace/:id` - Update item
- `DELETE /api/marketplace/:id` - Delete item
- `PUT /api/marketplace/:id/status` - Update status (admin)

#### 5. Jobs
Create `jobsController.ts` and `jobs.ts` route:
- `GET /api/jobs` - List job postings
- `POST /api/jobs` - Create job posting
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting
- `PUT /api/jobs/:id/status` - Update status (admin)

#### 6. Lost & Found
Create `lostFoundController.ts` and `lostfound.ts` route:
- `GET /api/lost-and-found` - List items
- `POST /api/lost-and-found` - Create item
- `PUT /api/lost-and-found/:id` - Update item
- `DELETE /api/lost-and-found/:id` - Delete item
- `PUT /api/lost-and-found/:id/status` - Update status (admin)

#### 7. Offers
Create `offersController.ts` and `offers.ts` route:
- `GET /api/offers` - List approved offers
- `POST /api/offers` - Create offer (service provider)
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer
- `PUT /api/offers/:id/status` - Update status (admin)
- `POST /api/offers/:id/claim` - Claim offer (generate code)
- `POST /api/offers/redeem` - Redeem offer code

#### 8. News
Create `newsController.ts` and `news.ts` route:
- `GET /api/news` - List news articles
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

#### 9. Notifications
Create `notificationsController.ts` and `notifications.ts` route:
- `GET /api/notifications` - List active notifications
- `POST /api/notifications` - Create notification (admin)
- `PUT /api/notifications/:id` - Update notification (admin)
- `DELETE /api/notifications/:id` - Delete notification (admin)

#### 10. Advertisements
Create `advertisementsController.ts` and `advertisements.ts` route:
- `GET /api/advertisements` - List active ads
- `POST /api/advertisements` - Create ad (admin)
- `PUT /api/advertisements/:id` - Update ad (admin)
- `DELETE /api/advertisements/:id` - Delete ad (admin)

#### 11. Transportation
Create `transportationController.ts` and `transportation.ts` route:
- `GET /api/transportation` - Get all transportation data
- `GET /api/transportation/drivers` - List drivers
- `POST /api/transportation/drivers` - Create driver (admin)
- `PUT /api/transportation/drivers/:id` - Update driver (admin)
- `DELETE /api/transportation/drivers/:id` - Delete driver (admin)
- `GET /api/transportation/schedule` - Get weekly schedule
- `PUT /api/transportation/schedule` - Update schedule (admin)
- `GET /api/transportation/routes` - Get routes (internal/external)
- `POST /api/transportation/routes` - Create route (admin)
- `PUT /api/transportation/routes/:id` - Update route (admin)
- `DELETE /api/transportation/routes/:id` - Delete route (admin)
- `GET /api/transportation/supervisors` - Get supervisors
- `PUT /api/transportation/supervisors` - Update supervisors (admin)

#### 12. Emergency Contacts
Create `emergencyController.ts` and `emergency.ts` route:
- `GET /api/emergency-contacts` - List emergency contacts
- `POST /api/emergency-contacts` - Create contact (admin)
- `PUT /api/emergency-contacts/:id` - Update contact (admin)
- `DELETE /api/emergency-contacts/:id` - Delete contact (admin)

#### 13. Service Guides
Create `serviceGuidesController.ts` and `serviceguides.ts` route:
- `GET /api/service-guides` - List service guides
- `POST /api/service-guides` - Create guide (admin)
- `PUT /api/service-guides/:id` - Update guide (admin)
- `DELETE /api/service-guides/:id` - Delete guide (admin)

#### 14. Public Pages Content
Create `contentController.ts` and `content.ts` route:
- `GET /api/public-content/:page` - Get page content
- `PUT /api/public-content/:page` - Update page content (admin)

### Frontend Integration

After completing the backend, you'll need to:

1. **Install Axios or Fetch client** in frontend
2. **Create API service layer** (e.g., `services/api.ts`)
3. **Update Context Providers** to use real API calls instead of mock data
4. **Implement token storage** (localStorage for access token)
5. **Add HTTP interceptors** for token refresh
6. **Update error handling** to show Toast messages

## 🚀 Getting Started with Backend

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Update `backend/.env` with your actual Supabase Service Role Key:

```env
SUPABASE_SERVICE_KEY=your_actual_service_role_key_here
```

You can find this in your Supabase dashboard under Settings > API > Service Role Key.

### 3. Start Backend Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The backend will run on `http://localhost:5000`

### 4. Test the API

Health check:
```bash
curl http://localhost:5000/health
```

Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 📊 Database Schema Notes

### Important Design Decisions

1. **User IDs**: Using `BIGSERIAL` for all IDs (compatible with TypeScript `number` type)
2. **JSON Fields**: Arrays like `images`, `phone`, `amenities` are stored as JSONB
3. **Timestamps**: All tables use `timestamptz` for timezone awareness
4. **Status Fields**: Enums enforced via CHECK constraints
5. **Cascade Deletes**: Properly configured for data integrity
6. **Indexes**: Added on frequently queried columns for performance

### RLS Policies Summary

- **Public Read**: Categories, Services, Properties, News, Active Notifications/Ads
- **Authenticated Users**: Can create posts, reviews, marketplace items
- **Ownership**: Users can only edit/delete their own content
- **Admin**: Full access to all operations

## 🔒 Security Best Practices

1. **Never expose Service Role Key** in frontend code
2. **Always use Access Token** for API calls from frontend
3. **Validate all inputs** server-side with Joi
4. **Use prepared statements** (Supabase handles this)
5. **Rate limit** sensitive endpoints (login, register)
6. **Hash passwords** before storing (bcrypt with salt rounds = 10)
7. **Set secure cookie flags** in production (httpOnly, secure, sameSite)

## 📚 Additional Resources

- [Backend README](backend/README.md) - Detailed backend documentation
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 🎯 Next Steps

1. **Complete remaining controllers** following the pattern in `servicesController.ts`
2. **Add corresponding routes** in the routes directory
3. **Register routes** in `server.ts`
4. **Test each endpoint** with Postman or curl
5. **Update frontend** to consume the API
6. **Add comprehensive error handling**
7. **Write unit tests** for critical functions
8. **Deploy to production** (Vercel, Railway, or DigitalOcean)

## 💡 Tips for Implementation

- **Follow the pattern**: Use `servicesController.ts` as a template
- **Reuse utilities**: Validation, error handling, authentication
- **Test incrementally**: Implement one controller at a time
- **Use TypeScript**: Leverage type safety for fewer bugs
- **Document your code**: Add JSDoc comments for complex logic
- **Handle edge cases**: Empty results, invalid IDs, etc.

---

Good luck with your backend implementation! The foundation is solid, and you have all the tools you need to complete the project successfully.
