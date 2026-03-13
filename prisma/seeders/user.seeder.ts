import { PrismaClient, Role, Status } from "../../generated/prisma";
import bcrypt from "bcryptjs";

export const seedUsers = async (prisma: PrismaClient) => {
    console.log("Seeding users...");

    const hashedPassword = await bcrypt.hash("Admin123!", 12);

    // Seed Admin
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: hashedPassword,
            firstName: "Admin",
            lastName: "User",
            role: Role.ADMIN,
            status: Status.ACTIVE,
        },
    });
    console.log(`Admin ready: ${admin.email}`);

    // Seed Regular User
    const user = await prisma.user.upsert({
        where: { email: "user@example.com" },
        update: {},
        create: {
            email: "user@example.com",
            password: hashedPassword,
            firstName: "Regular",
            lastName: "User",
            role: Role.USER,
            status: Status.ACTIVE,
        },
    });
    console.log(`Regular user ready: ${user.email}`);
};
