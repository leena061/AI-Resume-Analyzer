require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed!'));
    }
    cb(null, true);
  }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildPrompt(resumeText, jobDesc) {
  return `
You are a highly experienced ATS (Applicant Tracking System) and Resume Review Expert.
Analyze the following resume in context of the given job description.
Return ONLY a valid JSON object with NO extra explanation or commentary.

Resume Text:
${resumeText}

Job Description:
${jobDesc}

Your JSON should have these keys exactly:
{
  "ATS Score": "number 0-100",
  "Missing Keywords": ["keyword1", "keyword2", "..."],
  "Section Suggestions": {
      "Summary": "text",
      "Skills": "text",
      "Work Experience": "text",
      "Projects": "text",
      "Education": "text"
  },
  "Action Verbs Suggestions": ["verb1", "verb2", "..."],
  "Highlights": "text",
  "Review Summary": "text"
}
`;
}

async function analyzeResume(resumeText, jobDesc) {
  const prompt = buildPrompt(resumeText, jobDesc);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Remove markdown code block if present
  if (text.startsWith('```')) {
    text = text.replace(/```[\w]*\n?/, '').replace(/```$/, '').trim();
  }

  // Extract JSON substring
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}') + 1;
  const jsonString = text.substring(jsonStart, jsonEnd);

  return JSON.parse(jsonString);
}

app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.render('index', { error: 'Please upload a PDF file.' });
    }
    const jobDesc = req.body.jobdesc;
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    const analysis = await analyzeResume(resumeText, jobDesc);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.render('result', { analysis });
  } catch (err) {
    console.error('Error:', err);
    let msg = 'An error occurred. Please try again.';
    if (err.message.includes('Only PDF files')) msg = err.message;
    res.render('index', { error: msg });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).render('index', { error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));