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

1. Configure environment variables:
   ```bash
   cp .env.sample .env   # repo root — used by docker compose
   ```
   Generate the admin credentials hash (never store plaintext or base64 passwords):
   ```bash
   npm --prefix backend run hash-password -- <username> <password>
   ```
   Copy the printed `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` values into `.env`.

2. Launch the production containers:
   ```bash
   docker compose up -d
   ```

The application will be accessible via the Nginx proxy on port `80`.
MongoDB is intentionally **not** published to the host in production; only the
internal compose network can reach it.

> **Note:** The proxy currently serves plain HTTP. Before exposing this to the
> internet, terminate TLS (e.g. point a domain at the host and add a Let's
> Encrypt certificate to `nginx/default.conf`). The auth cookie is marked
> `Secure` in production (`NODE_ENV=production`), so login requires HTTPS.

## Environment Variables

Production reads a `.env` file in the **repo root** (consumed by docker
compose); for running the backend directly (e.g. `npm run dev`), use
`backend/.env`:

| Variable | Description |
|----------|-------------|
| `TOKEN_KEY` | Secret key used for signing JWT tokens (`openssl rand -hex 32`) |
| `COSMOS_CONNECTION_STRING` | MongoDB connection string (e.g., `mongodb://user:pass@host:port/db?authSource=admin`) |
| `ADMIN_USERNAME` | Administrator login name |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password (`npm run hash-password`) |
| `MONGO_INITDB_ROOT_USERNAME` | Mongo root user (production compose only) |
| `MONGO_INITDB_ROOT_PASSWORD` | Mongo root password (production compose only) |

## Restoring data from db-backups/

The `db-backups/` folder contains MongoDB JSON exports. With the dev stack
running (mongo published on `localhost:27017`):

```bash
docker cp db-backups/2026-11-calendar-db.employees.json $(docker ps -qf name=mongo) /tmp/employees.json
docker cp db-backups/2026-11-calendar-db.schedules.json  $(docker ps -qf name=mongo) /tmp/schedules.json
docker exec $(docker ps -qf name=mongo) mongoimport -u <user> -p <pass> --authenticationDatabase admin \
  --db calendar-db --collection employees --jsonArray --file /tmp/employees.json
docker exec $(docker ps -qf name=mongo) mongoimport -u <user> -p <pass> --authenticationDatabase admin \
  --db calendar-db --collection schedules --jsonArray --file /tmp/schedules.json
```

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

