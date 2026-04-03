import { Role } from "@prisma";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to restrict access based on user roles.
 * Must be used after authMiddleware as it relies on res.locals.user.
 * 
 * @param allowedRoles Array of roles that are allowed to access the route
 */
export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found in session",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: `Forbidden: This action requires one of the following roles: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};
