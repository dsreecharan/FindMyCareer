import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Target,
  FileCheck,
  Brain
} from 'lucide-react';
import { CareerCategory } from '../../types';

interface HeroSectionProps {
  onStartTest: () => void;
  onViewRoadmap: () => void;
  onViewLatestResult?: () => void;
  hasTestResult?: boolean;
  recommendedCategory?: CareerCategory;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTest,
  onViewRoadmap,
  onViewLatestResult,
  hasTestResult,
  recommendedCategory
}) => {
  // Interactive simulator to illustrate how psychological traits determine stream/career
  const [activeAptitude, setActiveAptitude] = useState<'stem' | 'creative' | 'business' | 'social'>('stem');

  const aptitudeProfiles = {
    stem: {
      streamTitle: 'Engineering & Technology',
      primaryTrait: 'Logical Deduction & Algorithmic Modeling',
      exampleCareer: 'AI & Autonomous Systems Engineer',
      curriculum: 'Science (Physics, Chemistry, Mathematics w/ Computer Science)',
      collegesPreview: 'Top Engineering Universities (e.g. IIT Bombay, MIT, Stanford)',
      examsPreview: 'JEE Advanced / SAT Math',
      matchConfidence: '98.4%',
      traits: { cognitive: 95, logical: 96, creative: 70, patience: 92, softSkills: 78 }
    },
    creative: {
      streamTitle: 'Creative & Design',
      primaryTrait: 'Spatial Computing & Visual Problem Solving',
      exampleCareer: 'UI/UX & Interactive Product Architect',
      curriculum: 'Any Stream w/ Fine Arts, Design or Multimedia Foundations',
      collegesPreview: 'Top Design Institutes (e.g. NID Ahmedabad, RISD, IIT IDC)',
      examsPreview: 'UCEED / NID DAT',
      matchConfidence: '96.8%',
      traits: { cognitive: 88, logical: 75, creative: 98, patience: 84, softSkills: 91 }
    },
    business: {
      streamTitle: 'Business & Management',
      primaryTrait: 'Macroeconomics & Quantitative Strategy',
      exampleCareer: 'Strategic Quant & Venture Analyst',
      curriculum: 'Commerce with Applied Mathematics or Higher Math',
      collegesPreview: 'Top Management Schools (e.g. IIMs IPM, Wharton, LSE)',
      examsPreview: 'IPMAT / CUET-UG / SAT',
      matchConfidence: '95.2%',
      traits: { cognitive: 92, logical: 90, creative: 82, patience: 80, softSkills: 95 }
    },
    social: {
      streamTitle: 'Social & Psychology',
      primaryTrait: 'Human Cognition & Behavioral Empathy',
      exampleCareer: 'Cognitive & Clinical Neuropsychologist',
      curriculum: 'Humanities or Science (Biology w/ Psychology)',
      collegesPreview: 'Top Neuroscience & Psychology Centers (e.g. NIMHANS, Oxford)',
      examsPreview: 'CUET-UG Psychology / NEET',
      matchConfidence: '97.1%',
      traits: { cognitive: 91, logical: 85, creative: 84, patience: 96, softSkills: 99 }
    }
  };

  const currentProfile = aptitudeProfiles[activeAptitude];

  return (
    <div className="space-y-16 py-4">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER WITH LIVE TRAIT SIMULATOR
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-4 sm:pt-6">
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Focused Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono tracking-wider text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45 animate-pulse" />
              <span className="font-bold">PSYCHOMETRIC & CAREER STREAM DISCOVERY</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 dark:text-slate-400">GRADES 9 TO 12</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08] text-balance">
              Find your ideal academic stream and target career path.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-sans">
              Designed for high schoolers navigating subject choices and college admissions. Take our 15-scenario assessment to identify your natural cognitive strengths. You will receive <strong className="font-semibold text-slate-900 dark:text-white">your personalized stream recommendation</strong>, top colleges, required entrance exams, and a 4-year roadmap tailored strictly for you.
            </p>

            {/* High School Stages */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-semibold">[ 09 ] Exploration</span>
              <span>→</span>
              <span className="text-slate-900 dark:text-white font-semibold">[ 10 ] Stream Choice</span>
              <span>→</span>
              <span className="text-slate-900 dark:text-white font-semibold">[ 11 ] Exam Prep</span>
              <span>→</span>
              <span className="text-slate-900 dark:text-white font-semibold">[ 12 ] Admissions</span>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onStartTest}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-sans text-sm font-semibold shadow-md shadow-slate-950/10 transition-all cursor-pointer"
              >
                <span>{hasTestResult ? 'Retake 15-Scenario Test' : 'Start 15-Scenario Test'}</span>
                <span className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>

              {hasTestResult && onViewLatestResult && (
                <button
                  onClick={onViewLatestResult}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-sans text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View My Recommended Blueprint</span>
                </button>
              )}
            </div>

            {/* 3 Telemetry Pillars */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-2xl font-bold text-slate-950 dark:text-white tabular-nums">15</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real Scenarios</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-slate-950 dark:text-white tabular-nums">5</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cognitive Traits</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-rose-500 tabular-nums">#1 Top</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tailored Stream</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Trait Simulator Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    TRAIT-TO-STREAM SIMULATION
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-slate-400 font-medium">
                  SAMPLE PREVIEW
                </span>
              </div>

              {/* Aptitude Focus Switcher */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl my-4 text-xs">
                <button
                  onClick={() => setActiveAptitude('stem')}
                  className={`py-1.5 px-2 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeAptitude === 'stem'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Logic
                </button>
                <button
                  onClick={() => setActiveAptitude('creative')}
                  className={`py-1.5 px-2 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeAptitude === 'creative'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveAptitude('business')}
                  className={`py-1.5 px-2 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeAptitude === 'business'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Strategy
                </button>
                <button
                  onClick={() => setActiveAptitude('social')}
                  className={`py-1.5 px-2 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeAptitude === 'social'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Empathy
                </button>
              </div>

              {/* Matched Outcome Spotlight Card */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-rose-500 uppercase">
                    OUTPUT STREAM & TARGET CAREER
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {currentProfile.matchConfidence} FIT
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-slate-950 dark:text-white">
                    {currentProfile.streamTitle}
                  </h3>
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
                    Suggested Career: {currentProfile.exampleCareer}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Primary Trait Alignment: {currentProfile.primaryTrait}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                  <p className="text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-900 dark:text-white">11-12 Subjects: </span>
                    {currentProfile.curriculum}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Target Exams: </span>
                    {currentProfile.examsPreview}
                  </p>
                </div>
              </div>

              {/* 5 Trait Progress Bars */}
              <div className="space-y-2 mt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">COGNITIVE & STRATEGIC</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProfile.traits.cognitive}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${currentProfile.traits.cognitive}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">LOGICAL REASONING</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProfile.traits.logical}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${currentProfile.traits.logical}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">CREATIVITY & INNOVATION</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProfile.traits.creative}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${currentProfile.traits.creative}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">PATIENCE & RESILIENCE</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProfile.traits.patience}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${currentProfile.traits.patience}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">SOFT SKILLS & COLLABORATION</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProfile.traits.softSkills}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${currentProfile.traits.softSkills}%` }} />
                </div>
              </div>

              {/* Launcher */}
              <button
                onClick={onStartTest}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Take Test to Reveal Your Stream</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. SIMPLE 3-STEP FLOW: NO CLUTTER, USER-FRIENDLY
          ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>HOW IT WORKS · 3 SIMPLE STEPS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            From High School Confusion to Your Exact Career Blueprint
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            No endless scrolling through unrelated careers. The platform only reveals the exact stream, branch, and roadmap you qualify for:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-rose-400">[ 01 ]</span>
                <span className="font-mono text-[11px] text-slate-500">MANDATORY</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Create Student Account
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign up with your high school grade (Grade 9, 10, 11, or 12) or use instant 1-click student demo profiles. Locks in your personal diagnostic history.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personalized Student Profile</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-rose-400">[ 02 ]</span>
                <span className="font-mono text-[11px] text-indigo-400">15 SCENARIOS</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Psychological Assessment
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Respond to realistic student dilemmas. Evaluates Cognitive thinking, Logical analysis, Creative innovation, Patience under pressure, and Soft skills.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Trait Evaluation Engine</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-rose-400">[ 03 ]</span>
                <span className="font-mono text-[11px] text-emerald-400">TAILORED OUTPUT</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Personalized Blueprint & Roadmap
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reveals ONLY your matched stream, #1 career recommendation with detailed reason why, matching colleges, required entrance exams, and a 4-year roadmap.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span>Only Your Relevant Branch & Roadmap</span>
            </div>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 4-YEAR HIGH SCHOOL MILESTONES (GRADES 9 TO 12)
          ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>ACADEMIC MILESTONES</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            How High School Prepares You for College Admissions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Grade-by-grade milestones to prepare you for your recommended path without confusion:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">[ GRADE 09 ]</span>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Curiosity & Clubs</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore school clubs (robotics, debate, arts). Build healthy study habits without exam anxiety.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">[ GRADE 10 ]</span>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Stream Selection</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Take the FindMyCareer assessment. Select your 11th grade subjects aligned with your top recommendation.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">[ GRADE 11 ]</span>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Exam Foundations</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Begin entrance preparation for the specific exams required by your target colleges and build your portfolio.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">[ GRADE 12 ]</span>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Applications & Counseling</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Meet minimum board percentage cutoffs, sit for national exams, attend centralized counseling, and confirm your seat.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
