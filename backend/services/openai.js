import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey });
const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

function cleanResume(resume) {
  return {
    personalInfo:{...resume?.personalInfo, avatar:undefined},
    workExperience:resume?.workExperience||[],
    education:resume?.education||[],
    projects:resume?.projects||[],
    skills:resume?.skills||{},
    languagesCerts:resume?.languagesCerts||{},
    awardsVolunteer:resume?.awardsVolunteer||{},
    additional:resume?.additional||""
  };
}

function parseJSON(text) {
  let value=String(text||"").trim();
  value=value.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/\s*```$/i,"").trim();
  try{return JSON.parse(value);}catch(e){
    const start=value.indexOf("{"); const end=value.lastIndexOf("}");
    if(start>=0&&end>start) return JSON.parse(value.slice(start,end+1));
    throw new Error("AI returned invalid JSON.");
  }
}

export async function analyzeResume(resume,jobDescription){
  if(!apiKey) throw new Error("OPENAI_API_KEY is not configured on the server.");
  if(jobDescription.trim().length<30) throw new Error("Please provide a meaningful job description.");
  const prompt=`You are an expert recruiter, resume writer, ATS optimization specialist, and career coach.

Analyze the candidate resume against the job description.

Rules:
- Never invent experience, achievements, metrics, employers, degrees, certifications, skills, or technologies.
- Do not fabricate quantitative results.
- Improvements must remain truthful to the resume.
- Identify missing keywords but do not claim the candidate has them.
- Use concise, professional, achievement-oriented language.
- Consider ATS keyword alignment, relevance, clarity, specificity, impact, and readability.

RESUME:
${JSON.stringify(cleanResume(resume),null,2)}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON with this structure:
{
  "matchScore":0,"atsScore":0,"overallAssessment":"",
  "strengths":[],"weaknesses":[],"matchingKeywords":[],"missingKeywords":[],"atsRecommendations":[],
  "summaryImprovement":{"current":"","improved":"","reason":""},
  "experienceImprovements":[{"index":0,"company":"","role":"","current":"","improved":"","reason":""}],
  "projectImprovements":[{"index":0,"title":"","current":"","improved":"","reason":""}],
  "skillsRecommendation":{"existingRelevantSkills":[],"skillsToHighlight":[],"skillsMissingFromResume":[]},
  "finalRecommendations":[]
}`;
  const response=await client.responses.create({
    model:MODEL,
    input:[
      {role:"system",content:"You are a professional resume and ATS optimization assistant. Return only valid JSON."},
      {role:"user",content:prompt}
    ]
  });
  return parseJSON(response.output_text || "");
}
