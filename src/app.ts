import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";

import router from "@/routers/routes";
import swaggerSpec from "@/configs/swagger";

import { requestLogger } from "@/middlewares/requestLogger";
import { rateLimiter } from "@/middlewares/rateLimiter";
import { errorHandler } from "@/middlewares/errorHandler";
import { notFoundHandler } from "@/middlewares/notFoundHandler";

const app = express();

app.set("trust proxy", 1);

// Logger
app.use(requestLogger);

// Security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Compression
app.use(compression());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate Limiter
app.use(rateLimiter);

// Routes
app.use("/api", router);

// 404
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
