import { prisma } from "@/configs/prisma";
import { HttpException } from "@/utils/httpException";

/**
 * DATABASE CONNECTIVITY CHECK
 * Verifies if the application can successfully query the database.
 * Throws a 500 HttpException if the connection is lost.
 */
export const databaseCheck = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    console.error("Database health check failed:", err);
    throw new HttpException(500, "Database connection failed");
  }
};