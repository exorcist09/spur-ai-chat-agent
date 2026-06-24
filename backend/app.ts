import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.route"

const app = express();

app.use(express.json());
app.use(cors());


app.get("/health",(req,res)=>{
    res.status(200).json({success:true, message:"OK"})
});

app.use("/chat", chatRoutes)

export default app;