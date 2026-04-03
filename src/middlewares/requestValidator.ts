import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * REQUEST VALIDATION MIDDLEWARE
 * High-order function that returns a middleware to validate 
 * the request body, query, and params against a Zod schema.
 */
export const validateRequest =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed: any = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      res.locals.parsed = parsed;
      next();
    } catch (err) {
      return next(err);
    }
  };
