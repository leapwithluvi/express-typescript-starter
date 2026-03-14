import bcrypt from "bcryptjs";
import { HttpException } from "@/utils/httpException";
import { generateTokenPair, verifyRefreshToken } from "@/utils/jwt";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateLastLogin,
} from "@/repositories/auth.repository";
import {
  createSession,
  deleteAllUserSessions,
  deleteSession,
  findSessionByRefreshToken,
  updateSession,
} from "@/repositories/session.repository";
import { LoginInput, RegisterInput } from "@/validations/auth.validation";

const REFRESH_TOKEN_EXPIRES_DAYS = 7;

const getExpiresAt = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);
  return expiresAt;
};

interface RequestMeta {
  userAgent?: string | null;
  ipAddress?: string | null;
}

// ── Registder ───────────────────────────────────────────────────────────────
export const register = async (input: RegisterInput) => {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new HttpException(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await createUser({
    email: input.email,
    password: hashedPassword,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
  });

  return { user };
};

// ── Login ──────────────────────────────────────────────────────────────────
export const login = async (input: LoginInput, meta: RequestMeta) => {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new HttpException(401, "Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    const statusMessages: Record<string, string> = {
      INACTIVE: "Account is inactive",
    };
    throw new HttpException(
      403,
      statusMessages[user.status] ?? "Account is not accessible"
    );
  }

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) {
    throw new HttpException(401, "Invalid email or password");
  }

  // Create initial session with a placeholder, then re-generate with real sessionId
  const tempSession = await createSession({
    userId: user.id,
    refreshToken: `temp_${Date.now()}`,
    userAgent: meta.userAgent ?? null,
    ipAddress: meta.ipAddress ?? null,
    expiresAt: getExpiresAt(),
  });

  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
    sessionId: tempSession.id,
  });

  await updateSession(tempSession.id, { refreshToken: tokens.refreshToken });
  await updateLastLogin(user.id);

  return {
    user: tempSession.user,
    tokens,
  };
};

// ── Logout ─────────────────────────────────────────────────────────────────
export const logout = async (sessionId: string) => {
  await deleteSession(sessionId);
};

// ── Logout All ─────────────────────────────────────────────────────────────
export const logoutAll = async (userId: string) => {
  await deleteAllUserSessions(userId);
};

// ── Refresh Token ──────────────────────────────────────────────────────────
export const refresh = async (refreshToken: string, meta: RequestMeta) => {
  const session = await findSessionByRefreshToken(refreshToken);
  if (!session || session.expiresAt < new Date()) {
    throw new HttpException(401, "Invalid or expired refresh token");
  }

  const payload = verifyRefreshToken(refreshToken);
  if (payload.sessionId !== session.id) {
    throw new HttpException(401, "Token mismatch");
  }

  const newTokens = generateTokenPair({
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
    sessionId: session.id,
  });

  await updateSession(session.id, {
    refreshToken: newTokens.refreshToken,
    userAgent: meta.userAgent ?? null,
    ipAddress: meta.ipAddress ?? null,
    expiresAt: getExpiresAt(),
  });

  return { tokens: newTokens };
};

// ── Me ─────────────────────────────────────────────────────────────────────
export const me = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new HttpException(404, "User not found");
  }
  return { user };
};
