import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Test DB connection immediately
prisma
  .$connect()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // stop server if DB not connected
  });

export default prisma;
