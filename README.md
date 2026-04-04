# 🚀 Express TypeScript Starter (v1.0.0)

<!-- GitHub badges -->
[![Stars](https://img.shields.io/github/stars/leapwithluvi/express-typescript-starter?style=social)](https://github.com/leapwithluvi/express-typescript-starter/stargazers)
[![Fork](https://img.shields.io/github/forks/leapwithluvi/express-typescript-starter?style=social)](https://github.com/leapwithluvi/express-typescript-starter/forks)
[![GitHub commits](https://img.shields.io/github/commit-activity/t/leapwithluvi/express-typescript-starter?style=social&logo=github)](https://github.com/leapwithluvi/express-typescript-starter/commits)
[![Pull requests](https://img.shields.io/github/issues-pr/leapwithluvi/express-typescript-starter?style=social&logo=github)](https://github.com/leapwithluvi/express-typescript-starter/pulls)

![Express TypeScript Starter](./src/images/thumbnail.png)

[![leapwithluvi](https://custom-icon-badges.demolab.com/badge/made%20by%20-leapwithluvi-556bf2?logo=github&logoColor=white&labelColor=101827)](https://github.com/leapwithluvi)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?color=dddddd&labelColor=000000)](https://github.com/leapwithluvi/express-typescript-starter/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/leapwithluvi/express-typescript-starter?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

- [Description](#-description)
- [Key Features](#-key-features)
- [Folder Structure](#-folder-structure)
- [Technologies Used](#-technologies-used)
- [Get Started](#-get-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Run Locally](#-run-locally)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Health & Monitoring](#-health--monitoring)
- [Contributing](#-contributing)
- [License](#-license)

</details>

## 📝 Description

**Express TypeScript Starter** is a premium, production-ready boilerplate designed for building scalable and robust RESTful APIs. It combines the power of **Express 5**, **TypeScript**, and **Prisma ORM** with a strict focus on security, observability, and clean architecture.

Whether you're building a small service or a complex enterprise application, this starter provides the foundation you need to launch with confidence.

## ✨ Key Features

- **🛡️ Enhanced Security**: Pre-configured with Helmet, HPP, CORS, and Rate Limiting.
- **⚡ Performance**: Built on Express 5 with optimized asynchronous handling.
- **🦾 Strict Validation**: Zod-based validation for request bodies, params, and even environment variables at startup.
- **🔄 Lifecycle Management**: Graceful shutdown and health monitoring integrated via `@godaddy/terminus`.
- **📊 Observable Logging**: Structured JSON logging using **Pino** and `pino-http`.
- **🏗️ Layered Architecture**: Clean separation of concerns (Controllers, Services, Repositories).
- **🧪 Testing Ready**: Pre-configured with **Jest** for unit and integration testing.

## 📂 Folder Structure

<details><summary><b>Project Layout</b></summary>

```bash
src/
├── __tests__/      # Automated unit and integration tests (Jest)
├── checks/         # System health monitoring (Database, Memory)
├── configs/        # Centralized configurations (Env, Logger, Prisma)
├── controllers/    # Request orchestration and HTTP logic
├── middlewares/    # Security, Auth, Logging and Error handlers
├── repositories/   # Data access layer (Prisma abstraction)
├── routers/        # API endpoint definitions
├── services/       # Core business logic implementation
├── types/          # TypeScript interfaces and shared types
├── utils/          # Global utility functions (JWT, Formatters)
├── validations/    # Zod schemas for request validation
└── index.ts        # Main entry point with Terminus integration
```

</details>

## ✨ Technologies Used

<details><summary>This project is built using the following premium stack:</summary>

- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript for rock-solid code.
- [Express 5](https://expressjs.com/): The legendary web framework, updated for the future.
- [Prisma](https://www.prisma.io/): Next-generation Node.js and TypeScript ORM.
- [PostgreSQL](https://www.postgresql.org/): The world's most advanced open-source database.
- [Zod](https://zod.dev/): TypeScript-first schema declaration and validation.
- [Pino](https://getpino.io/): Super fast, low-overhead Node.js logger.
- [Terminus](https://github.com/godaddy/terminus): Graceful shutdown and health checks for Node.js.
- [Jest](https://jestjs.io/): Delightful JavaScript Testing Framework.
- [Helmet](https://helmetjs.github.io/): Secure Express apps by setting various HTTP headers.

</details><br/>

[![Technologies Used](https://skillicons.dev/icons?i=ts,nodejs,express,prisma,postgres)](https://skillicons.dev)

## 🧰 Get Started

Follow these steps to get your project running locally.

### 📋 Prerequisites

- **Node.js** (v18+)
- **PostgreSQL** (running instance)
- **NPM** or **Yarn**

### ⚙️ Installation

**Step 1: Clone the Repo**

```bash
git clone https://github.com/leapwithluvi/express-typescript-starter.git
cd express-typescript-starter
```

**Step 2: Install Dependencies**

```bash
npm install
```

**Step 3: Setup Environment**

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT secrets
```

**Step 4: Database Migration**

```bash
npx prisma migrate dev
```

### 🚀 Run Locally

```bash
# Development mode with hot-reload
npm run dev

# Production build
npm run build
npm start
```

## 📜 Scripts

| Script             | Action                                           |
| :----------------- | :----------------------------------------------- |
| `npm run dev`      | Starts local dev server with `tsx watch`         |
| `npm run build`    | Compiles TS to production JS (`dist/`)           |
| `npm start`        | Runs the production build                        |
| `npm test`         | Executes tests using Jest                        |
| `npm run lint`     | Runs ESLint for code quality                     |
| `npm run prisma:generate` | Generates the Prisma client               |

## 🔒 Environment Variables

The application uses **strict validation**—if these are missing or invalid, the app will refuse to start.

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
PORT=3000
NODE_ENV="development" # or "production"

# JWT
JWT_SECRET="your-super-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 🏥 Health & Monitoring

The API provides a built-in health check endpoint managed by **Terminus**:

- **Endpoint**: `GET /health`
- **Checks**:
    - **Database**: Verifies connectivity to PostgreSQL.
    - **Memory**: Monitors Heap and RSS usage against thresholds.

If any check fails, the endpoint returns a `503 Service Unavailable` with detailed error info.

## 📋 License

This project is open-source and licensed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---
Made by [leapwithluvi](https://github.com/leapwithluvi)