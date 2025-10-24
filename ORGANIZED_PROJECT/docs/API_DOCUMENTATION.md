# API Documentation

Complete API reference for Helio Platform backend.

## Base URL

```
Development: http://localhost:5000
Production: https://your-api-domain.com
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication (6 endpoints)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@helio.com",
  "password": "admin123"
}
```

### User Management (7 endpoints)

#### Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=20&search=john&status=active
Authorization: Bearer <admin-token>
```

#### Get User Profile
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+1234567890"
}
```

#### Update User Role (Admin Only)
```http
PUT /api/users/:id/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin"
}
```

### Services (10 endpoints)

#### List Services
```http
GET /api/services?page=1&limit=20&category=restaurants&city=dubai
```

#### Get Service Details
```http
GET /api/services/:id
```

#### Create Service
```http
POST /api/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Service Name",
  "category": "restaurants",
  "description": "Service description",
  "location": "Dubai, UAE",
  "phone": "+1234567890"
}
```

### Properties (5 endpoints)

#### List Properties
```http
GET /api/properties?type=rent&minPrice=1000&maxPrice=5000
```

#### Create Property
```http
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "2BR Apartment",
  "type": "rent",
  "price": 3000,
  "location": "Dubai Marina",
  "bedrooms": 2,
  "bathrooms": 2
}
```

### News (5 endpoints)

#### List News
```http
GET /api/news?page=1&limit=10
```

#### Create News (Admin Only)
```http
POST /api/news
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "News Title",
  "content": "News content",
  "category": "local"
}
```

For complete API reference, see backend/API_ENDPOINTS.md
