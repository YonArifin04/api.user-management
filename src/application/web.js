import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

export const web = express();
web.use(express.json());

web.get("/", (req, res) => {
  res.json({ message: "API is working on Vercel!" });
});

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
