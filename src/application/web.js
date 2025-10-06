import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import { prismaClient as prisma } from "./database.js";

export const web = express();
web.use(express.json());

// Health check route
web.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // lightweight check
    res.json({ message: "✅ API is working and Prisma connected!" });
  } catch (error) {
    console.error("❌ Prisma error:", error);
    res.status(500).json({ error: "Prisma connection failed" });
  }
});

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
