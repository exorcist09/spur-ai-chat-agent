import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.route"
import { prisma } from "./config/prisma";


const app = express();

app.use(express.json());
app.use(cors());


app.get("/health",(req,res)=>{
    res.status(200).json({success:true, message:"OK"})
});

app.use("/chat", chatRoutes)

app.get("/db-test", async (_req, res) => {
  const count =
    await prisma.conversation.count();

  res.json({ count });
});

export default app;