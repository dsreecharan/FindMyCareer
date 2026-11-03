import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MessageSquare,
  Search,
  Sparkles,
  Send,
  X,
  ExternalLink,
  Bot,
  User,
  Calendar,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
  Clock,
  Key,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  Sliders
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url: string }[];
}

interface CareerCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  targetExam?: string;
  targetCareer?: string;
}

export const CareerCounselorModal: React.FC<CareerCounselorModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
  targetExam,
  targetCareer
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'search'>('chat');
  
  // Developer Custom Gemini API Key configuration
  const [developerApiKey, setDeveloperApiKey] = useState<string>(() => {
    return localStorage.getItem('fmc_custom_gemini_key') || '';
  });
  const [tempApiKey, setTempApiKey] = useState(developerApiKey);
  const [isKeyDrawerOpen, setIsKeyDrawerOpen] = useState(false);
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [keyStatusMessage, setKeyStatusMessage] = useState<string | null>(null);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! I am your AI Academic Admissions Advisor at FindMyCareer.\n\nI specialize in High School (Grade 9–12) academic stream strategy, college entrance exams, syllabus preparation milestones, and application deadlines. How can I help you succeed in your career journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Search grounding state
  const [searchQuery, setSearchQuery] = useState(targetExam ? `${targetExam} 2026 registration dates and syllabus updates` : '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    answer: string;
    sources: { title: string; url: string }[];
    timestamp: string;
  } | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Handle initial query trigger
  useEffect(() => {
    if (initialQuery && isOpen) {
      if (initialQuery.toLowerCase().includes('search') || initialQuery.toLowerCase().includes('date') || targetExam) {
        setActiveTab('search');
        setSearchQuery(initialQuery);
        executeLiveSearch(initialQuery);
      } else {
        setActiveTab('chat');
        handleSendMessage(initialQuery);
      }
    }
  }, [initialQuery, targetExam, isOpen]);

  if (!isOpen) return null;

  // Student context to keep advisor strictly grounded in student's stream
  const latestResult = user?.testHistory?.[0];
  const studentContext = {
    name: user?.name || 'Student',
    grade: user?.grade || 'Grade 11',
    stream: latestResult?.category || 'Exploring',
    topCareer: targetCareer || latestResult?.topCareerId?.replace(/-/g, ' ') || 'Engineering & Technology',
    softSkills: latestResult?.measuredSoftSkills || ['Analytical Thinking', 'Problem Solving'],
    savedCareers: user?.savedCareerIds?.map(id => id.replace(/-/g, ' ')) || []
  };

  // Helper to construct request headers with optional developer API key
  const getRequestHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (developerApiKey.trim()) {
      headers['x-gemini-api-key'] = developerApiKey.trim();
    }
    return headers;
  };

  const handleSaveCustomKey = () => {
    const trimmed = tempApiKey.trim();
    if (trimmed) {
      localStorage.setItem('fmc_custom_gemini_key', trimmed);
      setDeveloperApiKey(trimmed);
      setKeyStatusMessage('Custom Gemini API Key saved successfully!');
    } else {
      localStorage.removeItem('fmc_custom_gemini_key');
      setDeveloperApiKey('');
      setKeyStatusMessage('Reverted to default server Gemini API Key.');
    }
    setTimeout(() => setKeyStatusMessage(null), 3500);
  };

  const handleClearCustomKey = () => {
    localStorage.removeItem('fmc_custom_gemini_key');
    setDeveloperApiKey('');
    setTempApiKey('');
    setKeyStatusMessage('Custom key cleared. Using server environment default.');
    setTimeout(() => setKeyStatusMessage(null), 3500);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: getRequestHeaders(),
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          })),
          studentContext
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server returned error ${response.status}`);
      }

      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am ready to help you plan your high school admissions and exam timeline.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: `Notice: ${err?.message || 'Unable to contact AI advisor.'}${
            !developerApiKey ? ' You can click "Dev API Key" above to provide your own Gemini API key.' : ''
          }`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const executeLiveSearch = async (queryText?: string) => {
    const q = queryText || searchQuery;
    if (!q.trim() || isSearching) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch('/api/admissions-search', {
        method: 'POST',
        headers: getRequestHeaders(),
        body: JSON.stringify({
          query: q,
          examName: targetExam,
          careerTitle: studentContext.topCareer,
          targetYear: '2026/2027'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Google Search Grounding error: status ${response.status}`);
      }

      setSearchResult({
        answer: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err: any) {
      setSearchError(err?.message || 'Could not fetch live search data.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-hidden">
      <div 
        className="relative w-full max-w-2xl h-[90vh] max-h-[720px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  AI Admissions Counselor
                </h3>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  gemini-3.8-flash
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Specialized in {studentContext.grade} · {studentContext.stream} Roadmap
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Developer API Key Button */}
            <button
              onClick={() => setIsKeyDrawerOpen(!isKeyDrawerOpen)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                developerApiKey
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
              }`}
              title="Developer Custom Gemini API Key Settings"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {developerApiKey ? 'Custom Key' : 'Dev API Key'}
              </span>
              {developerApiKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Developer Custom API Key Settings Drawer (Collapsible) */}
        {isKeyDrawerOpen && (
          <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-750 text-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Developer Gemini API Key Settings
                </span>
              </div>
              <span className={`text-[11px] font-mono font-medium ${developerApiKey ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                {developerApiKey ? '● Using Custom Key' : '○ Using Default Server Key'}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Developers can supply their own Gemini API key here (persisted in your browser's <code className="font-mono bg-slate-200 dark:bg-slate-750 px-1 py-0.5 rounded">localStorage</code> and forwarded securely in headers). If left blank, requests automatically fall back to the server's configured environment key.
            </p>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={showKeySecret ? 'text' : 'password'}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Paste your Gemini API key (AIzaSy...)"
                  className="w-full pl-3 pr-9 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKeySecret(!showKeySecret)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showKeySecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={handleSaveCustomKey}
                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Key</span>
              </button>

              {developerApiKey && (
                <button
                  onClick={handleClearCustomKey}
                  className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-750 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 hover:text-rose-600 text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  title="Clear custom key and revert to server default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Get a free key from Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {keyStatusMessage && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {keyStatusMessage}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900 px-4 pt-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-850 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Admissions Advisory Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-850 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google Search Grounding (Live Exam Dates & Cutoffs)</span>
          </button>
        </div>

        {/* Tab 1: Multi-Turn Chat View */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Scrollable Message Thread */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700/60'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>
                    <div
                      className={`text-[10px] mt-2 font-mono ${
                        msg.role === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-xs p-3 text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>Advisor formulating admissions roadmap...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0 font-mono text-[10px]">Prompts:</span>
              <button
                onClick={() => handleSendMessage(`What are the key entrance exams I should prepare for in ${studentContext.grade} for ${studentContext.topCareer}?`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                Entrance exams roadmap
              </button>
              <button
                onClick={() => handleSendMessage(`How should I balance high school board exams with entrance test coaching?`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                Balance school vs prep
              </button>
              <button
                onClick={() => handleSendMessage(`What portfolio projects or certifications will boost my college applications?`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                Certifications & Portfolio
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask admissions advisor about ${studentContext.stream} admissions, preparation, or cutoffs...`}
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isSending || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Google Search Grounding for Live Exam Dates & Cutoffs */}
        {activeTab === 'search' && (
          <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-4">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-indigo-950 dark:text-indigo-200">
                    Live Google Search Grounding
                  </h4>
                  <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80 mt-0.5 leading-relaxed">
                    Uses Google Search real-time grounding via <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">gemini-3.8-flash</code> to fetch verified 2026/2027 entrance exam dates, registration portals, syllabus notifications, and university admission cutoffs.
                  </p>
                </div>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. JEE Main 2026 Session 1 dates or UCEED 2026 registration deadline..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => executeLiveSearch()}
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>{isSearching ? 'Searching...' : 'Search Google'}</span>
              </button>
            </div>

            {searchError && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <div className="space-y-1">
                  <p>{searchError}</p>
                  {!developerApiKey && (
                    <p className="text-[11px] text-rose-700 dark:text-rose-400">
                      Tip: You can provide your personal Gemini API Key using the "Dev API Key" button above.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Grounded Search Result */}
            {searchResult && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Grounded Official Briefing
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Retrieved {searchResult.timestamp}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {searchResult.answer}
                  </div>
                </div>

                {/* Grounding Source Citations (Required by gemini-api skill) */}
                {searchResult.sources && searchResult.sources.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Official Source References & Portals:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchResult.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 flex items-center justify-between group transition-colors"
                        >
                          <div className="truncate pr-2">
                            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-500">
                              {src.title}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{src.url}</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
