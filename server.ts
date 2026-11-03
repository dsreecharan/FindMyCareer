import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server environment API key
const defaultApiKey = process.env.GEMINI_API_KEY || '';

// Helper to instantiate GoogleGenAI client using either developer's custom key or server key
function getGenAIClient(req: Request): GoogleGenAI | null {
  const customKey = (req.headers['x-gemini-api-key'] as string)?.trim();
  const keyToUse = customKey || defaultApiKey;
  if (!keyToUse) return null;
  return new GoogleGenAI({ apiKey: keyToUse });
}

// 1. AI Career Counselor Chat Endpoint (Multi-turn using gemini-3.8-flash)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, studentContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getGenAIClient(req);
    if (!ai) {
      return res.status(400).json({
        error: 'Gemini API key is not configured. Please supply your personal Gemini API Key in the Advisor settings or configure GEMINI_API_KEY on the server.'
      });
    }

    const contextPrompt = studentContext
      ? `STUDENT PROFILE:
- Name: ${studentContext.name || 'Student'}
- Current Grade: ${studentContext.grade || 'High School (Grade 9-12)'}
- Evaluated Aptitude Stream: ${studentContext.stream || 'Undecided / Exploring'}
- Top Matched Career: ${studentContext.topCareer || 'General STEM / Arts / Commerce'}
- Measured Strengths: ${Array.isArray(studentContext.softSkills) ? studentContext.softSkills.join(', ') : 'Cognitive reasoning, structured thinking'}
- Saved Careers: ${Array.isArray(studentContext.savedCareers) ? studentContext.savedCareers.join(', ') : 'None yet'}`
      : 'STUDENT PROFILE: High school student exploring university admissions & career preparation.';

    const systemInstruction = `You are the Lead Admissions Counselor and Career Advisor at FindMyCareer, a specialized academic mentorship program for Grade 9-12 high school students.

CRITICAL MENTORSHIP RULES:
1. FOCUS EXCLUSIVELY on the student's evaluated stream and career goals (${studentContext?.topCareer || 'their designated stream'}). Do NOT distract or overwhelm them with unrelated streams or raw point scores.
2. Grade-Appropriate Guidance:
   - Grade 9: Exploration, curiosity, Olympiad fundamentals, developing problem-solving and communication habits.
   - Grade 10: Board exam mastery, stream selection confidence (PCM, PCB, Commerce with Math, Humanities, Design), foundational aptitude.
   - Grade 11: Deep subject mastery, starting standardized exam preparation (e.g. JEE, BITSAT, NEET, UCEED, SAT, IPMAT), building academic portfolio.
   - Grade 12: Mock tests, exam registration deadlines, college application strategy, personal statements, backup plans.
3. Tone: Encouraging, realistic, highly structured, concise, and actionable. Use bullet points for steps and timelines.
4. College & Exam Guidance: Explain eligibility, top colleges, competition difficulty, and how to balance school boards with entrance exam prep.

${contextPrompt}`;

    // Format contents for Gemini API (user / model turns)
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction
      }
    });

    const replyText = response.text || 'I am ready to help you plan your high school admissions and exam timeline. What specific question do you have?';

    return res.json({
      reply: replyText
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini API'
    });
  }
});

// 2. Real-time Entrance Exam & Admission Search Grounding Endpoint (gemini-3.8-flash with googleSearch tool)
app.post('/api/admissions-search', async (req: Request, res: Response) => {
  try {
    const { query, examName, careerTitle, targetYear } = req.body;

    const ai = getGenAIClient(req);
    if (!ai) {
      return res.status(400).json({
        error: 'Gemini API key is not configured. Please supply your personal Gemini API Key in the Advisor settings or configure GEMINI_API_KEY on the server.'
      });
    }

    const searchQuery = query || `Latest ${examName || careerTitle} entrance exam registration dates, application deadlines, eligibility criteria, and cutoff score trends for ${targetYear || '2026/2027'} academic year`;

    const searchPrompt = `Search for the latest, authentic official notifications and current news regarding:
"${searchQuery}"

Provide a structured, accurate briefing for a Grade 11/12 high school student:
1. **Official Exam/Application Schedule (${targetYear || '2026/2027'})**: Registration open date, last date to apply, exam dates, admit card window.
2. **Eligibility Criteria & Minimum Percentage**: Mandatory high school subjects (e.g. PCM, PCB, Math), age limit, and board score cutoffs.
3. **Application Process & Official Portal**: Exact official portal website name, application fee, and documents needed.
4. **Recent Changes / Syllabus Updates**: Any recent pattern changes, negative marking policies, or number of attempts.
5. **Key Admissions Advice**: Practical tip on when to register and how to avoid last-minute portal crashes.

Be factual, specific, and cite official conducting bodies (e.g., NTA, IITs, BITS Pilani, AIIMS, IIMs, College Board).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: searchPrompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || 'No updates available at this moment.';
    
    // Extract Grounding Chunks with web citations
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = chunks
      .filter((c: any) => c.web && c.web.uri)
      .map((c: any) => ({
        title: c.web.title || 'Official Admission Portal',
        url: c.web.uri
      }));

    // Deduplicate sources by URL
    const uniqueSources = Array.from(new Map(webSources.map((s: { title: string; url: string }) => [s.url, s])).values());

    return res.json({
      answer: text,
      sources: uniqueSources,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/admissions-search:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to retrieve grounded exam information.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const customKey = (req.headers['x-gemini-api-key'] as string)?.trim();
  res.json({
    status: 'ok',
    app: 'FindMyCareer API',
    hasServerKey: !!defaultApiKey,
    hasClientKey: !!customKey,
    supportsCustomApiKey: true,
    timestamp: new Date().toISOString()
  });
});

// Vite Middleware for Development / Static serving for Production
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FindMyCareer full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
