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
    // Simple DB query instead of connect/disconnect
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({
      message: "✅ API is working and Prisma connected!",
      time: result[0].now,
    });
  } catch (error) {
    console.error("❌ Prisma error:", error);
    res.status(500).json({ error: error.message });
  }
});

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
