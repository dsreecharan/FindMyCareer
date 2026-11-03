import React, { useState } from 'react';
import { ENTRANCE_EXAMS } from '../../data/exams';
import { EntranceExam } from '../../types';
import { Search, Calendar, Award, Building, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ExamDirectoryViewProps {
  onSelectCategoryFilter?: (category: string) => void;
}

export const ExamDirectoryView: React.FC<ExamDirectoryViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredExams = ENTRANCE_EXAMS.filter(exam => {
    if (categoryFilter !== 'all' && exam.category !== categoryFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      return (
        exam.name.toLowerCase().includes(q) ||
        exam.fullName.toLowerCase().includes(q) ||
        exam.conductingBody.toLowerCase().includes(q) ||
        exam.keyColleges.some(c => c.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
          <span>03 // NATIONAL & GLOBAL ENTRANCE EXAMS</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          High School Entrance Exam Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Conducting bodies, mandatory Grade 12 eligibility percentages, exam calendars, and participating top colleges.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search exams (JEE, SAT, UCEED, CLAT, NEET) or target universities..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { label: 'All Exams', value: 'all' },
            { label: 'Engineering (JEE/SAT)', value: 'Engineering & Technology' },
            { label: 'Design & Architecture', value: 'Creative & Design' },
            { label: 'Business & Management', value: 'Business & Management' },
            { label: 'Law & Medicine', value: 'Social & Psychology' }
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setCategoryFilter(f.value)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-full whitespace-nowrap cursor-pointer transition-all ${
                categoryFilter === f.value
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map(exam => (
          <div
            key={exam.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {exam.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {exam.conductingBody}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                {exam.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {exam.fullName}
              </p>
            </div>

            {/* Key Schedule Information */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Exam Timing</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{exam.examMonth}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Application Deadline</span>
                <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">{exam.applicationDeadline}</span>
              </div>
            </div>

            {/* Eligibility */}
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[11px] font-mono">
                Grade 12 Eligibility & Cutoffs:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {exam.eligibility}
              </p>
            </div>

            {/* Syllabus Highlights */}
            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[11px] font-mono">
                Core Syllabus Focus Areas:
              </span>
              <ul className="space-y-1 font-mono text-[11px]">
                {exam.syllabusHighlights.map((topic, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Participating Premier Colleges */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-semibold text-slate-950 dark:text-white uppercase tracking-wider text-[10px] font-mono block mb-1">
                Participating Colleges:
              </span>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                {exam.keyColleges.join(' · ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
