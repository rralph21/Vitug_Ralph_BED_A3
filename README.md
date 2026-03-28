# Event Management API

A clean, beginner-friendly REST API for managing events. Built with
Express.js and TypeScript, this API demonstrates best practices in
backend development with proper validation, error handling, and a
well-organized architecture.

## Quick Overview

This API allows you to create, read, update, and delete events. It's
built using a layered architecture where each request goes through
multiple organized layers before reaching the database.

## How the API Works

Here's the journey of a request through the API:

```
Request → Route Handler → Validation Middleware → Controller → 
Service → Repository → Database → Response
```

**What each layer does:**
- **Routes**: Define which endpoints exist
  (GET /events, POST /events, etc.)
- **Controllers**: Receive requests and prepare responses
- **Services**: Handle business logic
  (calculations, data processing)
- **Repositories**: Interact with the database
- **Models**: Define what data looks like
- **Validation**: Ensures incoming data is correct
  before processing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/events` | Get all events |
| GET | `/api/v1/events/:id` | Get a specific event |
| GET | `/api/v1/events/:id/popularity` | Get event popularity |
| POST | `/api/v1/events` | Create a new event |
| PUT | `/api/v1/events/:id` | Update an event |
| DELETE | `/api/v1/events/:id` | Delete an event |
| GET | `/api/v1/health` | Check if API is running |

## Example Usage

### Get all events
```bash
curl http://localhost:3000/api/v1/events
```

### Create a new event
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{"name":"My Event","date":"2024-04-01"}'
```

## Key Features

- **Input Validation**: All incoming data is validated before
  processing using Joi
- **Clean Architecture**: Organized code structure for easy
  maintenance
- **Error Handling**: Consistent error responses
- **Logging**: Request logging with Morgan
- **Firebase Integration**: Secure backend database
- **TypeScript**: Type-safe code for fewer bugs

## Testing

Run tests with Jest:

```bash
npm test
```

## Security

- Input validation prevents malicious data
- Error messages don't expose sensitive information
- Firebase security rules protect your database

## Project Structure

```
src/
├── api/v1/
│   ├── controllers/       # Handle requests
│   ├── services/          # Business logic
│   ├── repositories/      # Database interactions
│   ├── models/            # Data structures
│   ├── routes/            # API endpoints
│   ├── validation/        # Input validation
│   └── middleware/        # Request processing
├── config/                # Firebase and settings
└── server.ts              # App startup
```

## Author

Ralph Vitug

## Version 1.0.0
