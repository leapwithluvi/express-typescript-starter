import jwt from "jsonwebtoken";
import {JWTPayload, TokenPair} from "@/types/utilType";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const APP_NAME = process.env.APP_NAME!;
const APP_URL = process.env.APP_URL!;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET environment variables are required')
}

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    issuer: APP_NAME,
    audience: APP_URL,
  });
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: APP_NAME,
    audience: APP_URL,
  });
};

export const generateTokenPair = (payload: JWTPayload): TokenPair => ({
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
});

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET, {
    issuer: APP_NAME,
    audience: APP_URL,
  }) as JWTPayload;
}

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET, {
    issuer: APP_NAME,
    audience: APP_URL,
  }) as JWTPayload;
}

export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null;
  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' && token  ? token : null;
}