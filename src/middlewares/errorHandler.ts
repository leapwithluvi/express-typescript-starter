import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;
import { Prisma } from "@prisma";
import { ZodError } from "zod";
import { HttpException } from "@/utils/httpException";

/**
 * GLOBAL ERROR HANDLER
 * This middleware catches all errors throughout the application Lifecycle.
 * It formats errors from various sources (Zod, Prisma, JWT, etc.) into a 
 * consistent JSON response for the client and logs the details for debugging.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isDev = process.env.NODE_ENV === "development";

  let statusCode = 500;
  let message = "Internal server error";
  let errors: Record<string, unknown>[] | undefined = undefined;

  // ── HttpException ───────────────────────────────────────────────────────────────
  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  // ── ZodError ───────────────────────────────────────────────────────────────
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errors = err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  // ── PrismaError ───────────────────────────────────────────────────────────────
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate data detected";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid relation reference";
        break;

      default:
        statusCode = 400;
        message = "Database operation failed";
    }
  }

  // ── JWT Error ───────────────────────────────────────────────────────────────
  else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token";
  } else if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Token expired";
  }

  // ── Pino logging ───────────────────────────────────────────────────────────────
  req.log.error(
    {
      err,
      path: req.originalUrl,
      method: req.method,
      userId: req.user?.id,
    },
    "Request error"
  );

  return res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      message,
      ...(isDev && { detail: err.message }),
      ...(isDev && { stack: err.stack }),
    },
    ...(errors && { errors }),
    meta: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  });
};
