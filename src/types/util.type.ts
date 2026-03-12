import { Role } from "@prisma";

export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
  sessionId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}