import { Router } from "express";
import * as authController from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/auth";
import { validateRequest } from "@/middlewares/requestValidator";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "@/validations/auth.validation";

const router = Router();

// Public routes
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/refresh", validateRequest(refreshSchema), authController.refresh);

// Protected routes
router.post("/logout", authMiddleware, authController.logout);
router.post("/logout-all", authMiddleware, authController.logoutAll);
router.get("/me", authMiddleware, authController.me);

export default router;
