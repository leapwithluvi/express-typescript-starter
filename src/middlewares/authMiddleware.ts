import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {prisma} from "@/config/prisma";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
}