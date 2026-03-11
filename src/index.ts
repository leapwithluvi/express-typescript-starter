import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestLogger } from "@/middlewares/requestLoggerMiddleware";
import router from "@/routers/routes";
import { rateLimiter } from "@/middlewares/rateLimiterMiddleware";
import hpp from "hpp";

const PORT = process.env.PORT;

const app = express();

// Security
app.use(helmet())

// CORS
app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(requestLogger as unknown as express.RequestHandler)

// Rate Limiter
app.use(rateLimiter)

// Prevent HTTP Parameter Pollution
app.use(hpp())

// Routes
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});