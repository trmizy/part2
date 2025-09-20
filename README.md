# Session Authentication API

A Node.js based authentication system implementing session-based authentication with Express, MongoDB, and secure cookie handling.

## Project Structure

```
├── app.js                # Main application entry point
├── models
│   └── User.js          # User model schema
├── routes
│   └── auth.js          # Authentication routes
├── package.json         # Project dependencies
└── .gitignore          # Git ignore file
```

## Features

- User Registration and Authentication
- Session Management
- Secure Password Hashing with bcrypt
- MongoDB Integration
- Cookie-based Session Handling
- Protected Routes Implementation

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB running locally on port 27017
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Configuration

The application uses the following configurations:

- **Port**: 3000 (default)
- **MongoDB URL**: mongodb://127.0.0.1:27017/sessionAuth
- **Session Secret**: mysecretkey
- **Cookie Settings**: 
  - MaxAge: 1 hour
  - HttpOnly: true
  - Secure: false (set true for HTTPS)

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | /auth/register | Register new user | {username, password} |
| POST | /auth/login | User login | {username, password} |
| POST | /auth/logout | User logout | - |
| GET | /auth/protected | Protected route | - |

## Security Features

- Password Hashing using bcryptjs
- HTTP-only cookies
- Session management
- CSRF protection
- Secure cookie options

## Dependencies

```json
{
  "bcryptjs": "^3.0.2",
  "connect-mongo": "^5.1.0",
  "cookie-parser": "^1.4.7",
  "express": "^5.1.0",
  "express-session": "^1.18.2",
  "mongoose": "^8.18.1"
}
```

## Running the Application

Start the server:
```bash
node app.js
```

The API will be available at: `http://localhost:3000`

## Error Handling

The API implements proper error handling for:
- Invalid credentials
- Missing fields
- Duplicate usernames
- Server errors
- Unauthorized access

## Session Management

Sessions are stored in MongoDB using connect-mongo and include:
- Session duration: 1 hour
- Secure cookie settings
- MongoDB session store

## Security Best Practices

- HTTP-only cookies to prevent XSS
- Secure password hashing
- Session management
- Input validation
- Error handling
- CSRF protection

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request