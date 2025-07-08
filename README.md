# 📝 AI Resume Analyzer

![Tech](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20Gemini%20AI-blueviolet)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

> **🚀 Analyze your resume using AI and get instant ATS score, keyword suggestions, and personalized resume improvement tips based on any job description.**

---

## 📄 About The Project

**AI Resume Analyzer** is a full-stack web application designed to help job seekers improve their resumes by analyzing them against any job description using AI-powered analysis.

The app calculates an **ATS (Applicant Tracking System) score**, identifies missing keywords, and provides section-wise suggestions.

This tool can greatly enhance your chances of getting shortlisted by ensuring your resume passes ATS filters.

---

## ✅ Key Features
- Upload Resume (PDF Only)
- Paste Job Description
- Get Instant ATS Score (0 to 100)
- Identify Missing Keywords (essential for the role)
- Detailed Section-wise Suggestions:
  - ✅ Summary / Objective
  - ✅ Skills
  - ✅ Work Experience
  - ✅ Projects
  - ✅ Education
- Suggested Action Verbs to Strengthen Resume Wording
- Clean, Modern, Responsive UI
- Instant Results with Structured Analysis

---

## 🔥 Why ATS Score Matters?
Most companies use Applicant Tracking Systems (ATS) to filter resumes automatically before human review.

A high ATS score means:
- Higher chance of passing ATS screenings
- Better keyword matching to the job description
- Increased chances of interview shortlisting

This tool ensures your resume is well-optimized for ATS systems.

---

## 🛠️ Tech Stack
| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Frontend  | HTML, CSS, JavaScript, EJS (Templating)     |
| Backend   | Node.js, Express.js                         |
| AI Model  | Gemini AI (Google Generative AI API)        |
| File Upload | Multer                                    |
| PDF Parsing | pdf-parse                                 |

---

## 🚀 How To Use This Project
###Clone the repository;
```bash
git clone https://github.com/leena061/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```
###2.Install Dependencies:
```bash
npm install
```
###3. Set Up Environment Variables:
Create a .env file in the root directory and add your Gemini AI API key like this:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
###4. Start The Application:
```bash
npm start
```
