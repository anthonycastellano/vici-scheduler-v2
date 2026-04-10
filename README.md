# Vici Scheduler v2

Vici Scheduler v2 is a full-stack application designed for efficient employee scheduling and management. The system allows administrators to create and manage schedules via a web interface.

## Features

- **Authentication**: Secure user authentication using JWT (JSON Web Tokens) and cookie-based session management.
- **Schedule Management**: Complete CRUD (Create, Read, Update, Delete) capabilities for managing work schedules.
- **Employee Management**: Comprehensive tools for managing employee information and records.
- **Containerized Environment**: Fully Dockerized setup for consistent development and production environments.
- **Reverse Proxy**: Nginx configuration for efficient serving and routing of frontend and backend services.

## Tech Stack

### Frontend
- **React** (v17)
- **Redux** - State management
- **React Router** - Client-side routing
- **SASS** - Advanced styling
- **Axios** - API communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **Cookie-Parser** - Session handling

### Infrastructure
- **Docker & Docker Compose** - Container orchestration
- **Nginx** - Web server and reverse proxy
- **MongoDB** - Database engine

## Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Development Setup

To start the application in development mode with hot-reloading enabled:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vici-scheduler-v2
   ```

2. Configure your environment variables:
   Create a `.env` file in the `backend` directory based on the `.env.sample`:
   ```bash
   cp backend/.env.sample backend/.env
   ```
   *Note: Update the `COSMOS_CONNECTION_STRING` to point to your local or remote MongoDB instance.*

3. Launch the development environment:
   ```bash
   docker-compose -f docker-compose-dev.yml up
   ```

The application will be accessible at `http://localhost:3000`.

### Production Setup

To run the production-ready containers:

```bash
docker-compose up -d
```

The application will be accessible via the Nginx proxy on port `80`.

## Environment Variables

The backend requires the following environment variables (configured in `backend/.env`):

| Variable | Description |
|----------|-------------|
| `TOKEN_KEY` | Secret key used for signing JWT tokens |
| `COSMOG_CONNECTION_STRING` | MongoDB connection string (e.g., `mongodb://user:pass@host:port/db`) |
| `ADMIN_CREDS_B64` | Base64 encoded administrator credentials (`user:password`) |

## API Endpoints

All endpoints (except login/public ones) require a valid JWT provided via cookies.

### Authentication
- `POST /auth/login` - Authenticate user and receive session cookie.
- `GET /auth` - Verify authentication status.

### Schedules
- `GET /schedules` - Retrieve all schedules.
- `POST /schedules` - Create a new schedule.
- `PUT /schedules` - Update an existing schedule.
- `DELETE /schedules` - Remove a schedule.

### Employees
- `GET /employees` - Retrieve all employees.
- `POST /employees` - Register a new employee.
- `PUT /employees` - Update employee details.
- `DELETE /employees` - Remove an employee.

## Architecture

The project utilizes a multi-container architecture orchestrated by Docker Compose:

- **`api`**: The Node.js/Express backend service.
- **`client`**: The React frontend application.
- **`proxy`**: Nginx instance acting as a reverse proxy to route traffic between the client and API.
- **`mongo`**: MongoDB database instance.

