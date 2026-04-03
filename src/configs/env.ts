import z from "zod";
import dotenv from "dotenv";

/**
 * ENVIRONMENT VARIABLE VALIDATION
 * Uses Zod to ensure all required variables are present and correctly typed.
 * This prevents the application from starting in an inconsistent state.
 */

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]),

  // App Configuration
  APP_NAME: z.string().default("express-typescript-starter"),
  APP_URL: z.string().default("http://localhost:3000"),
  CORS_ORIGIN: z.string().default("*"),

  // JWT Configuration
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),

  // Logging
  LOG_LEVEL: z.string().default("info"),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  parsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;