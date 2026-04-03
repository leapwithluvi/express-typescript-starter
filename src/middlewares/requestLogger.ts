import { Request, Response } from "express";
import pinoHttp from "pino-http";
import { logger } from "@/configs/logger";
import crypto from "crypto";

/**
 * REQUEST LOGGER MIDDLEWARE
 * Uses pino-http to log details of every incoming request.
 * Automatically generates a unique Request ID for better traceability.
 */
export const requestLogger = pinoHttp({
  logger,

  // Generate or extract a unique ID for each request
  genReqId: (req: Request) => {
    return req.headers["x-request-id"] || crypto.randomUUID();
  },

  // Dynamically set log level based on response status code
  customLogLevel: (_req: Request, res: Response, err) => {
    if (err) return "error";
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  // Format success messages
  customSuccessMessage: (req: Request, res: Response) => {
    return `${req.method} ${req.url} completed with status code ${res.statusCode}`;
  },

  // Format error messages
  customErrorMessage: (req: Request, res: Response) => {
    return `Request error: ${req.method} ${req.url} failed with status code ${res.statusCode}`;
  },
});
