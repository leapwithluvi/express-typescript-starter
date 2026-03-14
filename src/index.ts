import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestLogger } from "@/middlewares/requestLogger";
import router from "@/routers/routes";
import { rateLimiter } from "@/middlewares/rateLimiter";
import hpp from "hpp";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const PORT = process.env.PORT || 3000;

const app = express();

// Logger
app.use(requestLogger);

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "*",
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

// Routes
app.use("/api", router);

// Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
