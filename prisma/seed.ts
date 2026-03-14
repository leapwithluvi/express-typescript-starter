import { PrismaClient } from "../generated/prisma";
import { seedUsers } from "./seeders/user.seeder";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting master seeding...");

  // Optional: Clear sessions before seeding new users
  await prisma.session.deleteMany();

  // Execute child seeders
  await seedUsers(prisma);

  console.log("Master seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
