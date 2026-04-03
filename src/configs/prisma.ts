import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma";

/**
 * PRISMA CLIENT INITIALIZATION
 * Configures the Prisma client with the Postgres adapter.
 * The adapter-pg is used to handle connection pooling and PostgreSQL-specific features.
 */

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
