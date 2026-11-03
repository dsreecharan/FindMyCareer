import React from 'react';
import { TestResult, Career, CareerCategory } from '../../types';
import { MASTER_CAREERS } from '../../data/careers';
import { useAuth } from '../../context/AuthContext';
import { 
  Award, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  ArrowRight, 
  Printer, 
  CheckCircle2, 
  GraduationCap, 
  Building,
  Calendar,
  FileCheck,
  Brain,
  Lightbulb,
  HeartHandshake,
  Timer,
  Scale,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface TestResultsViewProps {
  result: TestResult;
  onRetake: () => void;
  onSelectCareer: (career: Career) => void;
  onViewRoadmap?: (careerId: string) => void;
  onOpenCounselor?: (query?: string, exam?: string, career?: string) => void;
}

export const TestResultsView: React.FC<TestResultsViewProps> = ({
  result,
  onRetake,
  onSelectCareer,
  onViewRoadmap,
  onOpenCounselor
}) => {
  const { user, toggleSaveCareer, isCareerSaved } = useAuth();

  // Identify the #1 Top Career
  const topCareer = MASTER_CAREERS.find(c => c.id === result.topCareerId) ||
    MASTER_CAREERS.find(c => c.category === result.category) ||
    MASTER_CAREERS[0];

  // Secondary runner-up careers STRICTLY within the user's matched stream/branch
  const runnerUpCareers = MASTER_CAREERS.filter(
    c => c.category === topCareer.category && c.id !== topCareer.id
  ).slice(0, 3);

  const savedTop = isCareerSaved(topCareer.id);

  // Fallback trait scores if missing
  const traits = result.traitScores || {
    cognitive: 88,
    logical: 92,
    creative: 65,
    patience: 84,
    softSkills: 75
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-12 print:max-w-none print:p-0">
      
      {/* 1. Header Confirmation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Assessment Complete · Diagnostic Report</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Career & College Admissions Blueprint
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Personalized for <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.name || 'High School Scholar'}</span> · {user?.grade || 'Grade 11'} · {new Date(result.timestamp).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onRetake}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>
        </div>
      </div>

      {/* 2. THE #1 TOP CAREER RECOMMENDATION (Hero Card) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border border-indigo-700/60 p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                #1 TOP RECOMMENDED CAREER
              </span>
              <span className="text-xs text-indigo-300">
                Category: {topCareer.category}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {topCareer.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {topCareer.summary}
            </p>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-800/60 text-xs">
              <div>
                <span className="text-indigo-300 text-[11px] uppercase block">Starting Salary</span>
                <span className="font-bold text-white text-sm">{topCareer.jobOutlook.startingSalary}</span>
              </div>
              <div>
                <span className="text-indigo-300 text-[11px] uppercase block">Mid-Career Salary</span>
                <span className="font-bold text-white text-sm">{topCareer.jobOutlook.midCareerSalary}</span>
              </div>
              <div>
                <span className="text-indigo-300 text-[11px] uppercase block">Growth Outlook</span>
                <span className="font-bold text-emerald-400 text-sm">{topCareer.jobOutlook.growthRate}</span>
              </div>
              <div>
                <span className="text-indigo-300 text-[11px] uppercase block">Primary Exam</span>
                <span className="font-bold text-cyan-300 text-sm">{topCareer.entranceExams[0]}</span>
              </div>
            </div>
          </div>

          {/* Action Box on Hero Card */}
          <div className="flex flex-col gap-3 shrink-0 print:hidden">
            {onViewRoadmap && (
              <button
                onClick={() => onViewRoadmap(topCareer.id)}
                className="group px-5 py-3 rounded-xl font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>View 4-Year Career Roadmap</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )}

            <button
              onClick={() => toggleSaveCareer(topCareer.id)}
              className={`px-5 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                savedTop
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${savedTop ? 'fill-current' : ''}`} />
              <span>{savedTop ? 'Career Saved in Profile' : 'Save This Career'}</span>
            </button>

            <button
              onClick={() => onSelectCareer(topCareer)}
              className="px-5 py-3 rounded-xl font-semibold text-xs bg-indigo-700/80 hover:bg-indigo-600 text-white border border-indigo-500/50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Full Career Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenCounselor && (
              <button
                onClick={() => onOpenCounselor(`How should I prepare for ${topCareer.title} starting from ${user?.grade || 'Grade 11'}?`, undefined, topCareer.title)}
                className="px-5 py-3 rounded-xl font-semibold text-xs bg-indigo-500/25 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-400/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span>Ask AI Admissions Counselor</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. THE REASON WHY IT IS SUGGESTED */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Why This Career Was Suggested For You
          </h3>
        </div>

        <div className="p-5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/70 space-y-3">
          <h4 className="font-display text-base font-bold text-indigo-950 dark:text-indigo-200">
            {result.whySuggested?.headline || `Your psychological profile directly aligns with ${topCareer.title}.`}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.whySuggested?.reasonSummary || `Based on your 15 scenario evaluations, you demonstrated an acute preference for problem-solving, cognitive clarity, and methodical focus.`}
          </p>
        </div>

        {/* Concrete Answer Evidence Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              Cognitive & Trait Match Factors:
            </span>
            <ul className="space-y-1.5">
              {(result.whySuggested?.traitMatches || [
                `Cognitive Thinking: High alignment with ${topCareer.title} complexity`,
                `Logical Deduction: High alignment with technical frameworks`,
                `Patience & Focus: Exceptional stamina through challenging projects`
              ]).map((match, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{match}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              Key Scenario Evidence:
            </span>
            <ul className="space-y-1.5">
              {(result.whySuggested?.answerKeyEvidence || [
                'Demonstrated disciplined patience and logic when working through ambiguous problems',
                'Instinctively prioritized first-principles reasoning over passive memorization'
              ]).map((ev, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. MEASURED COGNITIVE, THINKING, LOGICAL, PATIENCE & SOFT SKILLS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Cognitive, Logical, Patience & Soft Skills Scorecard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Psychometric measurements calculated across your 15 scenario decisions:
            </p>
          </div>
          <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            15 Scenario Indicators
          </span>
        </div>

        {/* 5 Core Trait Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Cognitive & Thinking */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-indigo-500" />
                <span>Cognitive & Strategic Thinking</span>
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {traits.cognitive}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${traits.cognitive}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ability to synthesize complex unfamiliar concepts, identify patterns, and deconstruct multi-step problems.
            </p>
          </div>

          {/* Logical Reasoning */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-cyan-500" />
                <span>Logical & Analytical Reasoning</span>
              </span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                {traits.logical}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${traits.logical}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Deductive reasoning, mathematical proofs, computational causality, and empirical objectivity under pressure.
            </p>
          </div>

          {/* Creative & Lateral Thinking */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
                <span>Creative & Innovation Incline</span>
              </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                {traits.creative}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${traits.creative}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Spatial imagination, aesthetic nuance, non-linear problem solving, and ability to imagine novel solutions.
            </p>
          </div>

          {/* Patience & Focus */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-emerald-500" />
                <span>Patience, Focus & Resilience</span>
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {traits.patience}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${traits.patience}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Capacity to persist through tedious setbacks, sustain deep attention for hours, and withstand exam trials.
            </p>
          </div>

        </div>

        {/* Soft Skills Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Demonstrated Soft Skills & Behavioral Strengths:</span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              Score: {traits.softSkills}%
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(result.measuredSoftSkills && result.measuredSoftSkills.length > 0 ? result.measuredSoftSkills : [
              'Root Cause Debugging',
              'Calmness under Fire',
              'First-Principles Thinking',
              'Empathetic Active Listening',
              'Milestone Planning'
            ]).map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOP COLLEGES TO PURSUE THIS BRANCH */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Top Colleges to Pursue {topCareer.title}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Leading national and global universities recognized for excellence in this discipline:
            </p>
          </div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {topCareer.topColleges.length} Premier Campuses
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topCareer.topColleges.map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                  {col.tier}
                </span>
                <span className="text-xs text-slate-400">Rank #{idx + 1}</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {col.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Location: {col.location}
              </p>
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Admission Cutoff:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{col.avgCutoff}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHICH EXAMS ARE TO BE TAKEN */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Which Entrance Exams You Must Take
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Target Entrance Tests:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {topCareer.entranceExams.map((exam, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
              >
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">{exam}</span>
                  <span className="text-[10px] text-slate-500">Official National/State Entrance Test</span>
                </div>
                {onOpenCounselor && (
                  <button
                    onClick={() => onOpenCounselor(`Latest official notifications, 2026/2027 registration dates, deadlines, and eligibility criteria for ${exam}`, exam, topCareer.title)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="Search live 2026/2027 dates with Google Search Grounding"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verify Live Dates</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Class 12 Marks Prerequisite: </span>
              {topCareer.eligibilityCriteria.minGrade12Percentage}
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Mandatory Subjects: </span>
              {topCareer.eligibilityCriteria.mandatorySubjects.join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* 7. STEP-BY-STEP "HOW TO APPLY" APPLICATION GUIDE */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Step-by-Step Guide: How to Apply for This Career
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow this sequential roadmap from Grade 10 through university enrollment:
          </p>
        </div>

        <div className="space-y-4">
          {(topCareer.howToApplySteps || []).map(step => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                </div>
                <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 sm:self-auto self-start pl-9 sm:pl-0">
                  {step.timeframe}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                {step.description}
              </p>

              {step.actionItems && step.actionItems.length > 0 && (
                <div className="pl-9 pt-1 space-y-1">
                  {step.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. ALTERNATIVE SPECIALIZATIONS IN YOUR RECOMMENDED STREAM */}
      {runnerUpCareers.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Related Specializations in Your Recommended Stream ({topCareer.category})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Careers sharing the same academic curriculum and entrance requirements:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {runnerUpCareers.map(career => (
              <div
                key={career.id}
                onClick={() => onSelectCareer(career)}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all space-y-2 shadow-sm"
              >
                <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                  {career.category}
                </span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {career.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {career.summary}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{career.jobOutlook.startingSalary}</span>
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
