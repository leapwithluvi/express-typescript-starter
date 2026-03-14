# Express TypeScript Starter

Express TypeScript Starter is a robust boilerplate designed for building scalable RESTful APIs using Express.js 5, TypeScript, and Prisma ORM. This project is pre-configured with industry-standard security practices, strict data validation, and a clean architectural structure to accelerate the backend development process.

## Key Features

- **Express 5**: Leverages the latest version of the Express framework for improved performance and modern features.
- **TypeScript**: Full static typing implementation to minimize runtime errors and enhance code self-documentation.
- **Prisma ORM**: Modern database toolkit for type-safe schema management and querying.
- **Zod Validation**: Schema-based validation at the entry point level to ensure data integrity.
- **Authentication System**: JSON Web Token (JWT) implementation supporting both Access Tokens and Refresh Tokens.
- **Layered Security**:
  - Helmet for HTTP header protection.
  - HPP (HTTP Parameter Pollution) to prevent parameter manipulation.
  - Express Rate Limit to mitigate brute force attacks and basic DDoS protection.
  - Configurable CORS (Cross-Origin Resource Sharing).
- **Centralized Logging**: Integrated Pino Logger for efficient and structured application logging.
- **Unified Error Handling**: Dedicated middleware for global error management and 404 (Not Found) route handling.

## Project Architecture

This project follows a layered architecture pattern to ensure clear separation of concerns:

```text
src/
├── config/         # Environment configurations and external module settings
├── controllers/    # Orchestration logic for HTTP requests and responses
├── middlewares/    # Interceptor functions executed before controller logic
├── repositories/   # Abstraction layer for database access (Prisma)
├── routers/        # API route definitions and controller mapping
├── services/       # Core business logic implementation
├── types/          # TypeScript interface and type definitions
├── utils/          # Helper functions and general utilities
├── validations/    # Data validation schemas using Zod
└── index.ts        # Main application entry point
```

## System Requirements

- Node.js version 18 or higher
- PostgreSQL (or any other database supported by Prisma)
- NPM or Yarn package manager

## Installation Guide

1. **Clone the Repository**

   ```bash
   git clone https://github.com/leapwithluvi/express-typescript-starter.git
   cd express-typescript-starter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Copy the provided environment template and adjust the variables (such as `DATABASE_URL` and `JWT_SECRET`):

   ```bash
   cp .env.example .env
   ```

4. **Initialize Database**
   Run the migrations to synchronize your database schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

## Development Commands

| Command                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Starts the server in development mode with hot-reload        |
| `npm run build`         | Compiles TypeScript into production-ready JavaScript (dist/) |
| `npm start`             | Runs the compiled application in production mode             |
| `npm run lint`          | Performs code quality checks using ESLint                    |
| `npm run format`        | Automatically fixes code formatting using Prettier           |
| `npm run prisma:studio` | Opens a graphical interface for database management          |

## Security Standards

This application comes pre-configured with several industry-standard security middlewares to ensure the API remains protected against common web threats. It is highly recommended to review the `cors` and `rateLimit` configurations in the `src/middlewares/` directory before deploying to a production environment.

## Contribution

Contributions are welcome to improve this project. Please ensure that you follow the existing naming conventions and provide a clear description with every pull request.

## License

This project is distributed under the ISC License. Please refer to the [LICENSE](LICENSE) file for more information.
