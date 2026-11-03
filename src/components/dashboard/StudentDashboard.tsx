import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MASTER_CAREERS } from '../../data/careers';
import { Career, TestResult } from '../../types';
import { 
  User, 
  Bookmark, 
  History, 
  Sparkles, 
  GraduationCap, 
  ArrowUpRight, 
  Trash2, 
  CheckCircle2, 
  Calendar,
  Layers
} from 'lucide-react';

interface StudentDashboardProps {
  onStartTest: () => void;
  onSelectCareer: (career: Career) => void;
  onViewPastResult: (result: TestResult) => void;
  onViewRoadmap?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartTest,
  onSelectCareer,
  onViewPastResult,
  onViewRoadmap
}) => {
  const { user, toggleSaveCareer, switchDemoUser } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          Sign In to View Your Dashboard
        </h2>
        <p className="text-xs text-slate-500">
          Track your test history, save career paths, and plan your college entrance timeline.
        </p>
      </div>
    );
  }

  const savedCareers = MASTER_CAREERS.filter(c =>
    user.savedCareerIds.includes(c.id)
  );

  return (
    <div className="space-y-10 py-4 max-w-7xl mx-auto">
      
      {/* Student Profile Card */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 text-2xl font-bold font-display shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  {user.name}
                </h1>
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {user.grade}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.school} · Target: {user.targetRegion}
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Enrolled: {user.joinedDate} · {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartTest}
              className="group px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{user.testHistory.length > 0 ? 'Retake 15-Scenario Test' : 'Start 15-Scenario Test'}</span>
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>

        {/* Quick Student Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Test Attempts</span>
            <p className="font-mono text-xl font-bold text-slate-950 dark:text-white tabular-nums">
              {user.testHistory.length}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Saved Careers</span>
            <p className="font-mono text-xl font-bold text-slate-950 dark:text-white tabular-nums">
              {user.savedCareerIds.length}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Primary Track Match</span>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1 truncate">
              {user.testHistory.length > 0 ? user.testHistory[0].category : 'Pending Test'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">High School Phase</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
              {user.grade === 'Grade 12' ? 'College Applications' :
               user.grade === 'Grade 11' ? 'Entrance Exam Prep' :
               user.grade === 'Grade 10' ? 'Stream Selection' : 'Aptitude Discovery'}
            </p>
          </div>
        </div>
      </section>

      {/* Test History Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
            <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
              Assessment History & Scores
            </h2>
          </div>
          {user.testHistory.length > 0 && (
            <span className="text-xs font-mono text-slate-400">
              {user.testHistory.length} record(s) logged
            </span>
          )}
        </div>

        {user.testHistory.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              No test attempts recorded yet.
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Take the 15-scenario psychological test to identify your score across STEM, Design, Business, and Social tracks.
            </p>
            <button
              onClick={onStartTest}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 dark:bg-white dark:text-slate-950 rounded-full cursor-pointer hover:bg-slate-800"
            >
              Start 15-Scenario Test
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {user.testHistory.map((test, index) => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-mono">{new Date(test.timestamp).toLocaleDateString()} at {new Date(test.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {index === 0 && (
                      <span className="font-mono text-[10px] bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-1.5 py-0.2 rounded font-semibold">
                        LATEST
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-950 dark:text-white">
                    {test.category}
                  </h3>
                  {/* Trait indicators instead of raw numbers */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Psychological Evaluation Complete</span>
                    <span>·</span>
                    <span>15 Scenario Decisions Assessed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onViewPastResult(test)}
                    className="group px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Recommended Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Saved Careers Library */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
            <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
              My Saved Careers ({savedCareers.length})
            </h2>
          </div>
        </div>

        {savedCareers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              No saved careers yet.
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              When you take the 15-scenario assessment, you can save your recommended career and specializations here for quick access.
            </p>
            <button
              onClick={onStartTest}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 dark:bg-white dark:text-slate-950 rounded-full cursor-pointer hover:bg-slate-800"
            >
              Take 15-Scenario Test
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedCareers.map(career => (
              <div
                key={career.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {career.category}
                    </span>
                    <button
                      onClick={() => toggleSaveCareer(career.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3
                    onClick={() => onSelectCareer(career)}
                    className="font-display font-bold text-base text-slate-950 dark:text-white hover:text-rose-500 cursor-pointer transition-colors"
                  >
                    {career.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {career.summary}
                  </p>

                  <div className="text-xs font-mono text-slate-600 dark:text-slate-300 pt-1">
                    <span>{career.jobOutlook.startingSalary}</span>
                    <span className="mx-1.5 text-slate-400">·</span>
                    <span>Growth: {career.jobOutlook.growthRate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                    {career.entranceExams[0]}
                  </span>
                  <button
                    onClick={() => onSelectCareer(career)}
                    className="group text-xs font-semibold text-slate-900 dark:text-white hover:text-rose-500 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* High School Grade Milestone Checklist */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
          <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
            Grade-Specific Action Checklist for {user.grade}
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Recommended focus areas tailored for students in {user.grade}:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Academic Alignment</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure minimum Grade 12 board percentage prerequisites (usually 60% to 75% aggregate) for your target colleges are met.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Entrance Exam Registration</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Track deadlines for JEE, SAT, UCEED, NID, CLAT, or IPMAT. Mark registration months on your personal calendar.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Extracurricular Portfolio</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Gather evidence of leadership in school societies, coding competitions, science exhibitions, or design sketchbooks.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
