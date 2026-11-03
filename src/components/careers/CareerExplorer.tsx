import React, { useState, useMemo } from 'react';
import { Career, CareerCategory } from '../../types';
import { MASTER_CAREERS } from '../../data/careers';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Bookmark, 
  ArrowUpRight, 
  Download, 
  Scale, 
  BookOpen
} from 'lucide-react';
import { generateMasterCareerCSV, downloadCSV } from '../../data/csvData';

interface CareerExplorerProps {
  initialCategory?: CareerCategory | null;
  onSelectCareer: (career: Career) => void;
  onCompareCareers: (careers: Career[]) => void;
  selectedCompareList: Career[];
  onToggleCompare: (career: Career) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({
  initialCategory,
  onSelectCareer,
  onCompareCareers,
  selectedCompareList,
  onToggleCompare
}) => {
  const { isCareerSaved, toggleSaveCareer } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const categories: { label: string; value: string; count: number }[] = [
    { label: 'All Pathways', value: 'all', count: MASTER_CAREERS.length },
    { label: 'Engineering & Tech (50-60 pts)', value: 'Engineering & Technology', count: MASTER_CAREERS.filter(c => c.category === 'Engineering & Technology').length },
    { label: 'Creative & Design (40-49 pts)', value: 'Creative & Design', count: MASTER_CAREERS.filter(c => c.category === 'Creative & Design').length },
    { label: 'Business & Management (30-39 pts)', value: 'Business & Management', count: MASTER_CAREERS.filter(c => c.category === 'Business & Management').length },
    { label: 'Social & Psychology (15-29 pts)', value: 'Social & Psychology', count: MASTER_CAREERS.filter(c => c.category === 'Social & Psychology').length }
  ];

  const filteredCareers = useMemo(() => {
    return MASTER_CAREERS.filter(career => {
      // Category filter
      if (selectedCategory !== 'all' && career.category !== selectedCategory) {
        return false;
      }
      // Saved only filter
      if (showSavedOnly && !isCareerSaved(career.id)) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchTitle = career.title.toLowerCase().includes(query);
        const matchSummary = career.summary.toLowerCase().includes(query);
        const matchSkills = career.skills.some(s => s.toLowerCase().includes(query));
        const matchExams = career.entranceExams.some(e => e.toLowerCase().includes(query));
        const matchColleges = career.topColleges.some(c => c.name.toLowerCase().includes(query));
        return matchTitle || matchSummary || matchSkills || matchExams || matchColleges;
      }
      return true;
    });
  }, [searchTerm, selectedCategory, showSavedOnly, isCareerSaved]);

  return (
    <div className="space-y-8 py-4">
      
      {/* Header with Title and CSV download button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
            <span>02 // MASTER CAREER DIRECTORY</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Comprehensive Career Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Explore 12+ verified pathways, entrance exam requirements, top universities, and compensation blueprints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedCompareList.length > 0 && (
            <button
              onClick={() => onCompareCareers(selectedCompareList)}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare ({selectedCompareList.length}/3)</span>
            </button>
          )}

          <button
            onClick={() => downloadCSV('master_career_dataset.csv', generateMasterCareerCSV())}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by career title, entrance exams (JEE, SAT, UCEED), skills, colleges..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Saved Only Filter Toggle */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer whitespace-nowrap ${
              showSavedOnly
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
            <span>Saved Only</span>
          </button>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            No careers matched your search criteria.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your keyword or reset filters to view all career pathways.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setShowSavedOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map(career => {
            const saved = isCareerSaved(career.id);
            const isCompared = selectedCompareList.some(c => c.id === career.id);

            return (
              <div
                key={career.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Category & Score and Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {career.category} · {career.scoreRange}
                    </span>
                    <button
                      onClick={() => toggleSaveCareer(career.id)}
                      title={saved ? 'Remove from saved' : 'Save career to profile'}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        saved
                          ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3
                    onClick={() => onSelectCareer(career)}
                    className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    {career.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {career.summary}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
                    <span className="font-semibold text-slate-900 dark:text-white">{career.jobOutlook.startingSalary}</span>
                    <span aria-hidden="true">·</span>
                    <span>{career.jobOutlook.growthRate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-sans">{career.jobOutlook.demandLevel} Demand</span>
                  </div>

                  {/* High School Stream & Exams Pill-free Box */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                    <p className="text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">Target 11-12 Stream: </span>
                      {career.educationPath.grade11_12_stream}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      <span className="font-medium text-slate-700 dark:text-slate-300 font-sans">Entrance Exams: </span>
                      {career.entranceExams.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions: Compare Checkbox & Databest View Details Button */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(career)}
                      className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Compare</span>
                  </label>

                  <button
                    onClick={() => onSelectCareer(career)}
                    className="group/btn px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
