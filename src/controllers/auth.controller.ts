import { Request, Response, NextFunction } from "express";
import * as authService from "@/services/auth.service";
import { responseSuccess } from "@/utils/response";

// ── Register ───────────────────────────────────────────────────────────────
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.register(res.locals.parsed.body);
    return responseSuccess(res, "Registration successful", 201, result);
  } catch (err) {
    next(err);
  }
};

// ── Login ──────────────────────────────────────────────────────────────────
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.login(res.locals.parsed.body, {
      userAgent: req.headers["user-agent"] ?? null,
      ipAddress: req.ip ?? null,
    });
    return responseSuccess(res, "Login successful", 200, result);
  } catch (err) {
    next(err);
  }
};

// ── Logout ─────────────────────────────────────────────────────────────────
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = res.locals.session.id;
    await authService.logout(sessionId);
    return responseSuccess(res, "Logout successful", 200, null);
  } catch (err) {
    next(err);
  }
};

// ── Logout All Devices ─────────────────────────────────────────────────────
export const logoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.payload.userId;
    await authService.logoutAll(userId);
    return responseSuccess(res, "Logged out from all devices", 200, null);
  } catch (err) {
    next(err);
  }
};

// ── Refresh Token ──────────────────────────────────────────────────────────
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = res.locals.parsed.body;
    const result = await authService.refresh(refreshToken, {
      userAgent: req.headers["user-agent"] ?? null,
      ipAddress: req.ip ?? null,
    });
    return responseSuccess(res, "Token refreshed", 200, result);
  } catch (err) {
    next(err);
  }
};

// ── Me ─────────────────────────────────────────────────────────────────────
export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.payload.userId;
    const result = await authService.me(userId);
    return responseSuccess(res, "User profile retrieved", 200, result);
  } catch (err) {
    next(err);
  }
};
