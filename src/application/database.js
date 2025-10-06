import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

// Prevent multiple PrismaClient instances in development or on Vercel
const globalForPrisma = globalThis;

if (!globalForPrisma.prismaClient) {
  globalForPrisma.prismaClient = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "error" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
    ],
  });

  const prisma = globalForPrisma.prismaClient;

  prisma.$on("error", (e) => logger.error(e));
  prisma.$on("warn", (e) => logger.warn(e));
  prisma.$on("info", (e) => logger.info(e));
  prisma.$on("query", (e) => logger.info(e));
}

export const prismaClient = globalForPrisma.prismaClient;
