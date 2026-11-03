# 🎓 FindMyCareer

> **Comprehensive High School Career Discovery & Admissions Blueprint Platform**  
> Tailored for Grade 9–12 students to find their natural academic stream, target degree, and 4-year admissions roadmap.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌟 Key Features

### 1. 15-Scenario Psychometric Assessment
- Students evaluate realistic academic and decision-making scenarios across **5 core cognitive traits**:
  - *Cognitive & Strategic Problem Solving*
  - *Logical Deduction & Algorithmic Modeling*
  - *Spatial Innovation & Visual Design*
  - *Patience & Resilience Under Pressure*
  - *Soft Skills & Interpersonal Collaboration*
- **Focused Output**: Students only see the exact stream and career trajectory they qualify for. Point formulas and unrelated careers are intentionally filtered out to eliminate overwhelm.

### 2. Tailored 4-Year Admissions & Career Roadmap
- Dynamic Grade 9 to Grade 12 milestone progression:
  - **Skills to Learn**: Interactive checklist with persistent completion state (saved to `localStorage` and synced with Cloud Firestore).
  - **Recommended Certifications**: High-yield certifications appropriate for high school portfolios.
  - **Ideal Exam Prep Timeline**: Term-by-term countdown covering syllabus completion, mock test windows, and centralized counseling.

### 3. AI Admissions Counselor & Real-time Google Search Grounding
- **Multi-turn Chat**: Powered by `gemini-3.8-flash` acting as a specialized Grade 9–12 admissions director.
- **Live Search Grounding**: Integrates Google Search to retrieve verified entrance exam dates, registration portals, syllabus updates, and university cutoff scores for the upcoming academic year.
- **Developer API Key Support**: Developers can either use the server's default environment key or enter their personal Gemini API Key directly in the UI drawer (stored locally and sent via `x-gemini-api-key`).

### 4. Authentication & Cloud Firestore Persistence
- Firebase Authentication supporting **Google Sign-In** and **Email/Password**.
- 1-click **Instant Student Personas** (Maya - Grade 11 STEM, Rohan - Grade 12 Business, Chloe - Grade 10 Design) for rapid evaluation.
- Cloud Firestore persistence for student test history, saved career blueprints, and roadmap checklist progress.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/findmycareer.git
   cd findmycareer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key in `.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   PORT=3000
   ```
   *(Note: You can also leave `GEMINI_API_KEY` empty and supply it in the web interface via the **Dev API Key** drawer).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

To build both the frontend and the production backend bundle:

```bash
npm run build
npm start
```

This compiles:
1. Static client assets via Vite into `dist/`.
2. The Node.js Express server bundle into `server.js` using esbuild.
3. Serves the app and API routes seamlessly on port 3000 (or `process.env.PORT`).

---

## 🛠 Project Architecture

```
findmycareer/
├── server.ts                  # Express server with Gemini API & Google Search endpoints
├── index.html                 # HTML entry point with metadata & SEO tags
├── vite.config.ts             # Vite configuration with Tailwind CSS plugin
├── package.json               # NPM scripts and dependencies
├── src/
│   ├── main.tsx               # React application entry point
│   ├── App.tsx                # Tab router, modal manager & ambient background
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces (Career, TestResult, UserProfile)
│   ├── context/
│   │   ├── AuthContext.tsx    # Firebase Auth & persona state provider
│   │   └── ThemeContext.tsx   # Light / Dark theme management
│   ├── data/
│   │   ├── careers.ts         # Master careers database with college & exam mappings
│   │   ├── questions.ts       # 15 realistic student dilemma scenarios
│   │   └── roadmapData.ts     # 4-year Grade 9-12 skills, certifications & prep timelines
│   ├── lib/
│   │   └── firebase.ts        # Firebase Auth & Cloud Firestore sync helpers
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx     # Responsive navigation & student profile switcher
│       │   └── Footer.tsx     # Footer links and academic milestones
│       ├── home/
│       │   └── HeroSection.tsx # Headline, milestone journey & interactive trait simulator
│       ├── test/
│       │   ├── CareerTestView.tsx   # 15-scenario assessment engine
│       │   └── TestResultsView.tsx  # Assessment report & admission blueprint
│       ├── roadmap/
│       │   └── CareerRoadmapView.tsx # 4-year skill checklist, certs & exam timeline
│       ├── ai/
│       │   └── CareerCounselorModal.tsx # AI Advisor chat, Google Search & Dev Key manager
│       ├── dashboard/
│       │   └── StudentDashboard.tsx # Saved pathways, diagnostic history & stats
│       └── auth/
│           └── AuthModal.tsx        # Sign In / Sign Up modal with Google OAuth
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/chat` | `POST` | Multi-turn AI admissions counseling (`gemini-3.8-flash`) |
| `/api/admissions-search` | `POST` | Real-time entrance exam search with Google Search Grounding |
| `/api/health` | `GET` | Server health check and API key availability status |

---

## 🔐 Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key | Optional (can be configured in UI) |
| `PORT` | Server listening port | `3000` |
| `APP_URL` | Application base URL | `http://localhost:3000` |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
