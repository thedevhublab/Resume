import express from "express";
import { analyzeResume } from "../services/openai.js";
const router = express.Router();
router.post("/analyze", async (req,res)=>{
  try {
    const {resume,jobDescription}=req.body;
    if(!resume || typeof resume!=="object") return res.status(400).json({success:false,error:"Resume data is required."});
    if(!jobDescription || typeof jobDescription!=="string") return res.status(400).json({success:false,error:"Job description is required."});
    const data=await analyzeResume(resume,jobDescription);
    res.json({success:true,data});
  } catch(error) {
    console.error("AI analysis error:",error);
    res.status(500).json({success:false,error:error?.message||"Failed to analyze resume."});
  }
});
export default router;
