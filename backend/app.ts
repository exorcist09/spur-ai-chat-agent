import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.route"
import { prisma } from "./config/prisma";
import { errorMiddleware } from "./middleware/error.middleware";
import { isRedisEnabled } from "./config/redis";


const app = express();

// Trust reverse proxies like Render so req.ip represents the real client IP
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));


app.get("/", (req, res) => {
  res.status(200).send("ShopAssist Ai Chat support Agent");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    database: "connected",
    redis: isRedisEnabled() ? "enabled" : "disabled"
  });
});

app.use("/chat", chatRoutes);

app.use(errorMiddleware);

export default app;