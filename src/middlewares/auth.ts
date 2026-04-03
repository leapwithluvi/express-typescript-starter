import { Request, Response, NextFunction } from "express";

import { extractTokenFromHeader, verifyAccessToken } from "@/utils/jwt";
import { findSessionById } from "@/repositories/session.repository";

/**
 * AUTHENTICATION MIDDLEWARE
 * Protects routes by verifying the JWT access token in the Authorization header.
 * Attaches the user and session to res.locals for downstream use.
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token missing",
    });
  }

  try {
    const payload = verifyAccessToken(token);

    const session = await findSessionById(payload.sessionId);
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({
        message: "Invalid session",
      });
    }

    res.locals.user = session.user;
    res.locals.session = session;
    res.locals.payload = payload;

    next();
  } catch (err) {
    next(err);
  }
};
