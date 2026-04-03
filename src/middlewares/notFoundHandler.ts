import { Request, Response, NextFunction } from "express";

/**
 * 404 NOT FOUND HANDLER
 * This middleware is called when no route matches the incoming request.
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { method, originalUrl } = req;

  res.status(404).json({
    success: false,
    error: {
      statusCode: 404,
      name: "NotFoundError",
      message: `Endpoint ${method} ${originalUrl} not found`,
    },
    meta: {
      path: originalUrl,
      method,
      timestamp: new Date().toISOString(),
    },
  });
};
