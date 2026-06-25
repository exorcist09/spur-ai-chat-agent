import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.route"
import { prisma } from "./config/prisma";
import { errorMiddleware } from "./middleware/error.middleware";
import { isRedisEnabled } from "./config/redis";


const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.status(200).send("Spur Ai Chat support Agent");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    database: "connected",
    redis: isRedisEnabled() ? "enabled" : "disabled"
  });
});

app.use("/chat", chatRoutes)

app.get("/db-test", async (_req, res) => {
  const count =
    await prisma.conversation.count();

  res.json({ count });
});

app.use(errorMiddleware);

export default app;