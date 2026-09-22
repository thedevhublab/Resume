import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/ai.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true, methods: ["GET","POST","OPTIONS"], allowedHeaders:["Content-Type"] }));
app.use(express.json({limit:"2mb"}));
app.get("/", (req,res)=>res.json({success:true,service:"AI Resume Builder API",status:"online"}));
app.get("/api/health", (req,res)=>res.json({success:true,status:"healthy"}));
app.use("/api/ai", aiRouter);
app.use((req,res)=>res.status(404).json({success:false,error:"Endpoint not found."}));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({success:false,error:"Internal server error."});});
app.listen(PORT,()=>console.log(`AI Resume Backend running on port ${PORT}`));
