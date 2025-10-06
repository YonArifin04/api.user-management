import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import { prismaClient as prisma } from "./database.js";

export const web = express();
web.use(express.json());

web.get("/", async (req, res) => {
  try {
    // Simple check: does Prisma connect?
    await prisma.$connect();
    res.json({ message: "✅ API is working and Prisma connected!" });
  } catch (error) {
    console.error("❌ Prisma error:", error);
    res.status(500).json({ error: "Prisma connection failed" });
  } finally {
    await prisma.$disconnect();
  }
});

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
