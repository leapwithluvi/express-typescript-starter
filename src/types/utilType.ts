export interface JWTPayload {
  userId: string;
  role?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}