# 🚀 Ultimate Multilingual ATS Resume Builder

**An ATS (Applicant Tracking System)-friendly, web-based all-in-one resume builder featuring AI-powered resume analysis.**

Create, manage, analyze, and export professional resumes directly in your browser without relying on complex document editing software.

> **🌐 [Live Demo](https://thedevhublab.github.io/Resume/)**

---

## ✨ Key Features

### 📝 Resume Builder

* **Real-Time Live Preview**: Instantly reflects user input on a virtual A4 resume canvas.
* **Dynamic Section Management**: Add, edit, and delete various resume sections, including work experience, education, and projects.
* **Multiple Templates**: Switch between four professionally designed resume layouts.
* **Multilingual Support**: Seamlessly switch the interface between English and Korean.
* **Profile Image Support**: Upload and display profile images using Base64-based image processing.

### 🤖 AI-Powered Resume Analysis

* **Resume Analysis**: Analyzes the written resume content and identifies areas that may need improvement.
* **Job Description (JD) Analysis**: Compares the resume against the requirements and qualifications specified in a target Job Description.
* **ATS-Oriented Analysis**: Evaluates how well the resume content aligns with the requirements of the target position from an ATS perspective.
* **Keyword Analysis**: Identifies important skills, qualifications, and keywords relevant to the Job Description.
* **Improvement Suggestions**: Provides actionable recommendations for strengthening and improving the resume.

> **Note:** AI analysis is provided as a reference to help improve resume quality. It does not guarantee a specific ATS score or hiring outcome.

### 💾 Data Management

* **Local Storage**: Automatically saves resume data using the browser's `LocalStorage` API.
* **JSON Export / Import**: Back up and restore resume data through JSON files.
* **Data Reset**: Delete all locally stored resume data when needed.

### 📄 Document Export

* **PDF Export**: Export the completed resume as a PDF document.
* **A4 Optimization**: Resume layouts are designed around the standard A4 document format.
* **Print Optimization**: Dedicated Print CSS helps maintain the layout and formatting in real-world printing environments.

---

## 🛠 Technologies & Technical Features

* **State-Driven UI Rendering**: Synchronizes user input with the application state in real time and dynamically updates the resume preview based on changes.
* **Multilingual System (i18n)**: Supports English and Korean, dynamically switching labels, headers, placeholders, and other UI elements according to the selected language.
* **AI-Powered Resume Analysis**: Analyzes resumes and Job Descriptions to identify relevant keywords, strengths, gaps, and potential areas for improvement.
* **LocalStorage-Based Data Persistence**: Stores resume data locally in the browser using the `LocalStorage` API.
* **JSON-Based Data Management**: Uses structured JSON data to export and import resume information.
* **Print Optimization Engine (`@media print`)**:

  * A4-optimized print layout
  * Template-specific margins and font-size optimization
  * Dedicated print-only layout adjustments
  * Theme color preservation using `-webkit-print-color-adjust: exact`
* **Flexible Template System**: Provides multiple professional resume layouts built with modern CSS Grid and Flexbox.

---

## 🧠 AI Resume Analysis Workflow

The AI analysis feature follows the workflow below:

```text
Resume

   ↓

Job Description (JD)

   ↓

AI Analysis

   ↓

ATS-Oriented Analysis

   ↓

Keywords / Strengths / Gaps

   ↓

Resume Improvement Suggestions
```

Rather than simply providing a resume writing interface, the application is designed to help users understand **where their resume aligns with a target position, where it may be lacking, and how it can be improved based on the target role.**

---

## 📋 How to Use

### 1. Create Your Resume

Enter your personal information, work experience, education, skills, projects, and other relevant details in the editor.

Your resume data is automatically saved in the browser.

### 2. Customize Your Resume

Use the settings available at the top of the application to customize:

* Resume template
* English / Korean interface
* Layout
* Resume sections

### 3. Analyze Your Resume with AI

Use the AI analysis feature to review your resume and compare it against the Job Description of your target position.

The analysis provides insights into:

* Key keywords
* Resume strengths
* Missing or weak areas
* Areas that need improvement

### 4. Back Up Your Data

Use **Export JSON** to save your resume data as a JSON file.

You can restore your resume at any time using **Import JSON**.

### 5. Export Your Resume

Use **Download PDF** or **Print** to export your completed resume.

For the best output quality, select **A4 paper size** and review the browser's print margin settings before printing.

---

## 🎯 ATS-Friendly Resume

To improve compatibility with Applicant Tracking Systems, the application provides an **ATS Friendly (Classic)** template.

The template focuses on:

* Simple and clearly structured content
* Text-based resume formatting
* Clear section headings
* Standardized formatting
* Minimal unnecessary decorative elements

This structure is designed to make it easier for resume parsing systems such as ATS platforms to process and identify key resume information.

> **Tip:** ATS performance can be affected by many factors, including the employer's ATS configuration, Job Description, resume content, keywords, and formatting. No resume template can guarantee a specific ATS score or successful application outcome.

---

## 🔐 Privacy & Data Management

The application is designed to manage resume data primarily within the user's browser environment.

* Resume data is stored locally using `LocalStorage`.
* Resume data can be manually backed up as a JSON file.
* The **Clear Data** feature allows users to delete locally stored resume data.

When using the AI analysis feature, users are advised to avoid entering sensitive personal information that is unnecessary for resume analysis.

---

## 🌐 Project

**Project:** Ultimate Multilingual ATS Resume Builder

**Live Demo:**

https://thedevhublab.github.io/Resume/

**Repository:**

https://github.com/thedevhublab/thedevhublab.github.io

---

## 📌 Project Goals

This project aims to integrate the following capabilities into a single browser-based application:

* Resume creation
* ATS-friendly resume formatting
* Multilingual support
* Resume data management
* AI-powered resume analysis
* Professional document export

Ultimately, the goal is to make the resume creation process **more structured and efficient**, while helping applicants understand how well their resumes align with their target positions and identify opportunities for improvement.
