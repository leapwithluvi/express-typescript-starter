import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestLogger } from "@/middlewares/requestLogger";
import router from "@/routers/routes";
import { rateLimiter } from "@/middlewares/rateLimiter";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/configs/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

// Logger
app.use(requestLogger);

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
app.use(rateLimiter);

// Prevent HTTP Parameter Pollution
app.use(hpp());

  @openapi
  /health:
    get:
      summary: Check system health
      tags: [System]
      description: Returns 200 if all services (database, memory) are healthy, 503 otherwise.
      responses:
        200:
          description: System is healthy
        503:
          description: System is unhealthy
 
// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", router);

// Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
