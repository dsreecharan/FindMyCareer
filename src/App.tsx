import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CareerTestView } from './components/test/CareerTestView';
import { TestResultsView } from './components/test/TestResultsView';
import { CareerDetailModal } from './components/careers/CareerDetailModal';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { CareerRoadmapView } from './components/roadmap/CareerRoadmapView';
import { CareerCounselorModal } from './components/ai/CareerCounselorModal';
import { Career, CareerCategory, TestResult } from './types';
import { MASTER_CAREERS } from './data/careers';
import { Sparkles, MessageSquare } from 'lucide-react';

function MainApp() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<'home' | 'test' | 'results' | 'dashboard' | 'roadmap'>('home');
  const [roadmapCareerId, setRoadmapCareerId] = useState<string | undefined>(undefined);
  const [activeTestResult, setActiveTestResult] = useState<TestResult | null>(() => {
    return user && user.testHistory.length > 0 ? user.testHistory[0] : null;
  });
  const [selectedCareerForDetail, setSelectedCareerForDetail] = useState<Career | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // AI Admissions Counselor & Google Search Grounding Modal state
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);
  const [counselorQuery, setCounselorQuery] = useState<string | undefined>(undefined);
  const [counselorTargetExam, setCounselorTargetExam] = useState<string | undefined>(undefined);
  const [counselorTargetCareer, setCounselorTargetCareer] = useState<string | undefined>(undefined);

  const handleOpenCounselor = (query?: string, exam?: string, career?: string) => {
    setCounselorQuery(query);
    setCounselorTargetExam(exam);
    setCounselorTargetCareer(career);
    setIsCounselorModalOpen(true);
  };

  const handleStartTest = () => {
    if (!user) {
      // Must first create an account or sign in as requested
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestComplete = (result: TestResult) => {
    setActiveTestResult(result);
    setRoadmapCareerId(result.topCareerId);
    setCurrentTab('results'); // Immediately navigate to the full blueprint results view!
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-indigo-500 selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Lightweight Ambient Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onStartTest={handleStartTest}
        onOpenCounselor={() => handleOpenCounselor()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: TEST MODE */}
        {currentTab === 'test' && (
          <CareerTestView
            onComplete={result => {
              handleTestComplete(result);
            }}
            onCancel={() => setCurrentTab('home')}
          />
        )}

        {/* VIEW: COMPREHENSIVE ASSESSMENT REPORT & HOW-TO-APPLY BLUEPRINT */}
        {currentTab === 'results' && activeTestResult && (
          <TestResultsView
            result={activeTestResult}
            onRetake={handleStartTest}
            onSelectCareer={career => setSelectedCareerForDetail(career)}
            onViewRoadmap={careerId => {
              setRoadmapCareerId(careerId);
              setCurrentTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCounselor={handleOpenCounselor}
          />
        )}

        {/* VIEW 2: HOME / HERO MODE */}
        {currentTab === 'home' && (
          <div className="space-y-12">
            {/* If student recently completed a test, show their report card teaser */}
            {activeTestResult && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-rose-400 font-semibold tracking-wider uppercase">
                    Your Psychological Assessment Output
                  </span>
                  <h2 className="font-display text-2xl font-bold">
                    Recommended Stream: {activeTestResult.category}
                  </h2>
                  <p className="text-xs text-slate-300">
                    Your cognitive and behavioral traits have mapped to your ideal academic branch and top career trajectory.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setCurrentTab('results');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 text-xs font-semibold rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    View Recommended Career & Blueprint
                  </button>
                  <button
                    onClick={handleStartTest}
                    className="px-4 py-2.5 text-xs font-semibold rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    Retake Test
                  </button>
                </div>
              </div>
            )}

            <HeroSection
              onStartTest={handleStartTest}
              onViewRoadmap={() => {
                setCurrentTab('roadmap');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewLatestResult={() => {
                setCurrentTab('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              hasTestResult={!!activeTestResult}
              recommendedCategory={activeTestResult?.category}
            />
          </div>
        )}

        {/* VIEW 3: 4-YEAR CAREER ROADMAP & MILESTONE TRACKER */}
        {currentTab === 'roadmap' && (
          <CareerRoadmapView
            initialCareerId={roadmapCareerId}
            onSelectCareerForDetail={career => setSelectedCareerForDetail(career)}
            onStartTest={handleStartTest}
          />
        )}

        {/* VIEW 4: STUDENT DASHBOARD */}
        {currentTab === 'dashboard' && (
          <StudentDashboard
            onStartTest={handleStartTest}
            onSelectCareer={career => setSelectedCareerForDetail(career)}
            onViewPastResult={result => {
              setActiveTestResult(result);
              setCurrentTab('results'); // Show detailed blueprint report!
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewRoadmap={() => {
              setCurrentTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Global Footer */}
      <Footer onNavigate={setCurrentTab} />

      {/* Modal 1: Full Career Details */}
      {selectedCareerForDetail && (
        <CareerDetailModal
          career={selectedCareerForDetail}
          onClose={() => setSelectedCareerForDetail(null)}
          onViewRoadmap={careerId => {
            setRoadmapCareerId(careerId);
            setCurrentTab('roadmap');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Modal 2: Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="register"
        forTestTaking={true}
        onSuccess={() => {
          setCurrentTab('test');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modal 3: AI Admissions Counselor & Google Search Grounding Modal */}
      <CareerCounselorModal
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
        initialQuery={counselorQuery}
        targetExam={counselorTargetExam}
        targetCareer={counselorTargetCareer}
      />

      {/* Floating AI Counselor & Search Launcher Button */}
      <button
        onClick={() => handleOpenCounselor()}
        className="fixed bottom-6 right-6 z-40 group px-4 py-3 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-all duration-300 border border-slate-700/60 cursor-pointer"
        aria-label="Open AI Admissions Counselor & Live Search"
      >
        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="hidden sm:inline">AI Admissions Advisor · Live Exam Search</span>
        <span className="sm:hidden">AI Advisor</span>
      </button>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
