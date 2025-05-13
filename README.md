# NOC Application

A Node.js application for monitoring and logging application status with support for multiple database backends.

## Features

- Log monitoring and management
- Multiple database support (MongoDB, PostgreSQL, File System)
- Email notifications
- Service health checks
- Docker support
- TypeScript implementation

## Prerequisites

- Node.js (v22.15 or higher)
- Docker and Docker Compose
- MongoDB (optional)
- PostgreSQL (optional)

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/caoh29/noc>
cd noc
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create the following environment files:

- `.env.dev` for development
- `.env.test` for testing
- `.env` for production

Required environment variables:

```env
# App
APP_PORT=3000

# Mailer Configuration
MAILER_EMAIL=your-email@example.com
MAILER_RECIPIENT=recipient@example.com
MAILER_SECRET_KEY=your-secret-key
MAILER_SERVICE=your-mail-service
MAILER_HOST=mail-host
MAILER_PORT=587

# Service Check
CHECK_SERVICE_URL=your-service-url
CHECK_SERVICE_NAME=your-service-name

# MongoDB (Optional)
MONGO_DB_NAME=your-db-name
MONGO_URL=mongodb://user:password@host:port/dbname

# PostgreSQL (Optional)
POSTGRES_DB_NAME=your-db-name
POSTGRES_URL=postgresql://user:password@host:port/dbname
```

## Database Support

The application supports multiple database backends:

### MongoDB

- Uses Mongoose for MongoDB integration
- Schema includes message, origin, level, and timestamp
- Singleton pattern for database connection

### PostgreSQL

- Uses Prisma ORM
- Includes LogModel with auto-incrementing ID
- Supports severity levels (low, medium, high)

### File System

- Default storage option
- No additional configuration required

## Development

1. Start development environment:

```bash
npm run dev
```

2. Run with watch mode:

```bash
npm run dev:watch
```

3. Run tests:

```bash
npm test
```

4. Run tests with coverage:

```bash
npm run test:coverage
```

## Docker Support

The application includes Docker configuration for both development and production environments.

### Development

```bash
# Start development containers
npm run docker:dev:up

# Stop development containers
npm run docker:dev:down
```

### Testing

```bash
# Start test containers
npm run docker:test:up

# Stop test containers
npm run docker:test:down
```

### Production

```bash
# Build and run production container
docker-compose up --build
```

## Project Structure

```
noc/
├── mongoose/           # MongoDB integration
├── prisma/             # PostgreSQL integration
├── src/
│   ├── config/         # Configuration files
│   ├── application/    # Application logic
│   ├── domain/         # Domain models and interfaces
│   ├── presentation/   # API and server setup
│   └── infrastructure/ # Database and external services
├── Dockerfile
├── docker-compose.yaml
└── package.json
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run dev:watch`: Start development server with watch mode
- `npm run build`: Build the application
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage
- `npm run format`: Format code with Prettier
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues

## License

MIT

## Author

cronox20@gmail.com
