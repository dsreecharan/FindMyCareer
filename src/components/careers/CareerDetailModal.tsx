import React, { useState } from 'react';
import { Career } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Bookmark, 
  GraduationCap, 
  BookOpen, 
  Building, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CareerDetailModalProps {
  career: Career | null;
  onClose: () => void;
  onCompareWith?: (career: Career) => void;
  onViewRoadmap?: (careerId: string) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  onCompareWith,
  onViewRoadmap
}) => {
  const { isCareerSaved, toggleSaveCareer } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'education' | 'colleges' | 'exams' | 'timeline'>('overview');

  if (!career) return null;

  const saved = isCareerSaved(career.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Top Banner with Optional Featured Image */}
        <div className="relative border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
                <span>{career.category}</span>
                <span aria-hidden="true">·</span>
                <span>Specialized Academic Track</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {career.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {career.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleSaveCareer(career.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  saved
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={saved ? 'Remove from saved' : 'Save career to profile'}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Starting Salary</span>
              <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                {career.jobOutlook.startingSalary}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mid-Career Salary</span>
              <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                {career.jobOutlook.midCareerSalary}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Growth Rate</span>
              <p className="font-semibold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                {career.jobOutlook.growthRate}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Industry Demand</span>
              <p className="font-semibold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 mt-0.5">
                {career.jobOutlook.demandLevel} Demand
              </p>
            </div>
          </div>

          {/* Tab Navigation Controls (Interactive segmented tabs) */}
          <div className="flex items-center gap-1.5 pt-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Overview & Skills
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Stream & Degrees
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'colleges'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Top Colleges
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'exams'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Entrance Exams & Eligibility
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              How to Apply Roadmap
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW & SKILLS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                  Role Description & Day-in-the-Life
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {career.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Core Technical & Domain Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Personality Traits & Natural Dispositions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.personalityTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STREAM & DEGREES */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/70 space-y-1">
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                  Recommended High School (Grade 11-12) Stream:
                </p>
                <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-medium">
                  {career.educationPath.grade11_12_stream}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Undergraduate Degree Pathways (College)
                </h4>
                <ul className="space-y-2">
                  {career.educationPath.undergraduateDegrees.map((deg, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{deg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Postgraduate & Specialization Routes
                </h4>
                <ul className="space-y-2">
                  {career.educationPath.postgraduateDegrees.map((deg, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{deg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  High-Value Industry Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.educationPath.certificationOptions.map((cert, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOP COLLEGES */}
          {activeTab === 'colleges' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Premier institutions renowned globally for this discipline:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {career.topColleges.map((col, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-medium text-indigo-600 dark:text-indigo-400">
                        {col.tier}
                      </span>
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      {col.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Location: {col.location}
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                      Typical Cutoff: <span className="font-medium">{col.avgCutoff}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ENTRANCE EXAMS & ELIGIBILITY */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Target Entrance Exams
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.entranceExams.map((exam, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-3">
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                  Eligibility Criteria & Mandatory Board Subjects
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Min Grade 12 Percentage:</span>
                    <p className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {career.eligibilityCriteria.minGrade12Percentage}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Mandatory Subjects:</span>
                    <p className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {career.eligibilityCriteria.mandatorySubjects.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Additional Guidelines: </span>
                  {career.eligibilityCriteria.otherRequirements}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOW TO APPLY STEP-BY-STEP ROADMAP */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {(career.howToApplySteps && career.howToApplySteps.length > 0 ? career.howToApplySteps : [
                {
                  stepNumber: 1,
                  title: 'Grade 11-12 Stream Alignment',
                  timeframe: 'Grade 10 End / Grade 11',
                  description: career.applicationTimeline.preparationGrade,
                  actionItems: ['Enroll in mandatory 10+2 subject groups']
                },
                {
                  stepNumber: 2,
                  title: 'Entrance Exam Registration',
                  timeframe: 'Grade 12 Registration Window',
                  description: career.applicationTimeline.examRegistration,
                  actionItems: ['Register on official testing agency portals']
                },
                {
                  stepNumber: 3,
                  title: 'Centralized Counseling & University Enrollment',
                  timeframe: 'Post-Results Counseling',
                  description: career.applicationTimeline.collegeCounseling,
                  actionItems: ['Lock preferred course branch choices']
                }
              ]).map(step => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        {step.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 pl-8 sm:pl-0">
                      {step.timeframe}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                    {step.description}
                  </p>

                  {step.actionItems && step.actionItems.length > 0 && (
                    <div className="pl-8 pt-1 space-y-1">
                      {step.actionItems.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            FindMyCareer Student Blueprint
          </span>

          <div className="flex items-center gap-3">
            {onViewRoadmap && (
              <button
                onClick={() => {
                  onViewRoadmap(career.id);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>View 4-Year Career Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onCompareWith && (
              <button
                onClick={() => {
                  onCompareWith(career);
                  onClose();
                }}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Add to Comparison
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 dark:bg-slate-800 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
