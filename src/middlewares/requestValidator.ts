import {Request, Response, NextFunction} from 'express'
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed: any = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        })

        res.locals.parsed = parsed
        next()
    } catch (err) {
        return next(err)
    }
}