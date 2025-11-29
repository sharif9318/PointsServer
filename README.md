[English](README.md) | [한국어](README.ko.md)

A secure and lightweight RESTful API for managing user points, balance tracking, and transaction history. Built with NestJS, JWT authentication, and comprehensive Swagger documentation.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Points Management** - Earn and track points with detailed history
- **Balance Tracking** - Real-time balance monitoring
- **Transaction History** - Complete audit trail of all point activities
- **Interactive API Documentation** - Built-in Swagger UI
- **Input Validation** - Robust request validation using class-validator
- **Type Safety** - Full TypeScript support

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Technology Stack](#technology-stack)

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd prismx-points-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (optional):

```bash
cp .env.example .env
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=OqBuQoraQoraBuOqBolsachi
JWT_EXPIRES_IN=8h

# API Documentation
SWAGGER_PATH=/api
```

### JWT Secret

**Important:** Change the default JWT secret in production. Update the secret in `src/auth/constants.ts`:

```typescript
export const jwtConstants = {
  secret: 'your-secure-secret-key-here',
};
```

## 🎯 Running the Application

### Development Mode

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Watch Mode

```bash
npm run start:dev
```

## 📚 API Documentation

### Swagger UI

Access the interactive API documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:

- Complete API reference
- Interactive request testing
- Schema definitions
- Example requests and responses
- Authentication testing

### OpenAPI Specification

Download the OpenAPI specification:

```
http://localhost:3000/api-json
```

## 🔌 API Endpoints

### Authentication

#### POST /auth/login

Authenticate a user and receive a JWT token.

**Request:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 28800
}
```

### Points Management

All points endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

#### POST /api/earn

Add points to the user's balance.

**Request:**

```json
{
  "amount": 100,
  "note": "Completed onboarding tutorial"
}
```

**Response:**

```json
{
  "message": "Points earned successfully",
  "newBalance": 1250
}
```

#### GET /api/balance

Get the current point balance.

**Response:**

```json
{
  "balance": 1250
}
```

#### GET /api/history

Retrieve transaction history.

**Response:**

```json
{
  "transactions": [
    {
      "type": "earn",
      "amount": 100,
      "note": "Completed onboarding tutorial",
      "date": "2025-11-30T10:30:00.000Z"
    }
  ]
}
```

## 🔐 Authentication

### Getting a Token

1. Call the `/auth/login` endpoint with valid credentials
2. Receive a JWT token in the response
3. Include the token in subsequent requests

### Using the Token

Include the JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer <your_token>" \
  http://localhost:3000/api/balance
```

### In Swagger UI

1. Click the "Authorize" button (🔒)
2. Enter your JWT token
3. Click "Authorize"
4. All requests will now include the token

### Demo Credentials

For testing purposes, use:

- **Username:** demo
- **Password:** (any value)

**Note:** This is a demo implementation. In production, integrate with a proper user database.

## 📁 Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/               # Data Transfer Objects
│   │   ├── login.dto.ts
│   │   ├── login-response.dto.ts
│   │   └── error-response.dto.ts
│   ├── auth.controller.ts # Authentication endpoints
│   ├── auth.service.ts    # Authentication logic
│   ├── auth.module.ts     # Auth module configuration
│   ├── jwt.strategy.ts    # JWT strategy
│   ├── jwt-auth.guard.ts  # JWT guard
│   └── constants.ts       # JWT constants
├── points/                 # Points management module
│   ├── dto/               # Data Transfer Objects
│   │   ├── earn.dto.ts
│   │   ├── earn-response.dto.ts
│   │   ├── balance-response.dto.ts
│   │   ├── transaction.dto.ts
│   │   └── history-response.dto.ts
│   ├── points.controller.ts
│   ├── points.service.ts
│   └── points.module.ts
├── app.module.ts          # Root module
└── main.ts                # Application entry point
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Manual Testing with cURL

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

**Earn Points:**

```bash
curl -X POST http://localhost:3000/api/earn \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"amount":100,"note":"Test transaction"}'
```

**Get Balance:**

```bash
curl http://localhost:3000/api/balance \
  -H "Authorization: Bearer <your_token>"
```

## 🛠️ Technology Stack

- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **Authentication:** Passport JWT
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI 3.0
- **Runtime:** Node.js 16+

### Key Dependencies

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/swagger": "^7.0.0",
  "passport-jwt": "^4.0.1",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

## 🔒 Security Considerations

### For Production Deployment

1. **Change JWT Secret**
   - Use a strong, randomly generated secret
   - Store in environment variables
   - Never commit secrets to version control

2. **Enable CORS**

   ```typescript
   app.enableCors({
     origin: 'https://your-frontend-domain.com',
     credentials: true,
   });
   ```

3. **Rate Limiting**

   ```bash
   npm install @nestjs/throttler
   ```

4. **Helmet for Security Headers**

   ```bash
   npm install helmet
   ```

5. **Input Sanitization**
   - Already implemented via class-validator
   - Consider additional sanitization for user input

6. **HTTPS**
   - Always use HTTPS in production
   - Enforce HTTPS redirects

## 📝 API Response Codes

| Code | Meaning               | Description                          |
| ---- | --------------------- | ------------------------------------ |
| 200  | OK                    | Request successful                   |
| 201  | Created               | Resource created successfully        |
| 400  | Bad Request           | Invalid request format or parameters |
| 401  | Unauthorized          | Missing or invalid authentication    |
| 403  | Forbidden             | Insufficient permissions             |
| 404  | Not Found             | Resource not found                   |
| 500  | Internal Server Error | Server-side error                    |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Passport.js for authentication
- Swagger UI for API documentation
