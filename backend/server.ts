import dotenv from "dotenv";
import app from "./app"

dotenv.config();


const PORT = process.env.PORT || 8000;


const server = app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);  
})

export default server;