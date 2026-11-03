import React from 'react';
import { Career } from '../../types';
import { MASTER_CAREERS } from '../../data/careers';
import { X, Check, ArrowRight, Plus, Trash2 } from 'lucide-react';

interface CareerCompareModalProps {
  selectedCareers: Career[];
  onRemoveCareer: (careerId: string) => void;
  onAddCareer: (career: Career) => void;
  onClose: () => void;
  onSelectCareerForDetail: (career: Career) => void;
}

export const CareerCompareModal: React.FC<CareerCompareModalProps> = ({
  selectedCareers,
  onRemoveCareer,
  onAddCareer,
  onClose,
  onSelectCareerForDetail
}) => {
  const availableCareers = MASTER_CAREERS.filter(
    c => !selectedCareers.some(sc => sc.id === c.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Career Comparison Blueprint
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Side-by-side comparison of entrance exams, salaries, eligibility, and college trajectories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedCareers.length < 3 && availableCareers.length > 0 && (
              <select
                onChange={e => {
                  const career = MASTER_CAREERS.find(c => c.id === e.target.value);
                  if (career) onAddCareer(career);
                  e.target.value = '';
                }}
                defaultValue=""
                className="text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="" disabled>+ Add Career to Compare</option>
                {availableCareers.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {selectedCareers.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No careers selected for comparison yet. Select up to 3 careers from the library to compare them side-by-side.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {MASTER_CAREERS.slice(0, 3).map(c => (
                  <button
                    key={c.id}
                    onClick={() => onAddCareer(c)}
                    className="px-3 py-1.5 text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer"
                  >
                    + Add {c.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 w-44 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                      Comparison Metric
                    </th>
                    {selectedCareers.map(career => (
                      <th key={career.id} className="p-3 min-w-[240px] max-w-[320px] align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 uppercase">
                              {career.category}
                            </span>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                              {career.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => onRemoveCareer(career.id)}
                            title="Remove"
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {/* Category & Score Band */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Score Band
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                        {c.scoreRange}
                      </td>
                    ))}
                  </tr>

                  {/* Starting Salary */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Starting Salary
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 font-semibold text-slate-900 dark:text-white">
                        {c.jobOutlook.startingSalary}
                      </td>
                    ))}
                  </tr>

                  {/* Mid-Career Salary */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Mid-Career Salary
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 text-slate-700 dark:text-slate-300">
                        {c.jobOutlook.midCareerSalary}
                      </td>
                    ))}
                  </tr>

                  {/* Job Growth Rate */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Projected Growth
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 font-medium text-emerald-600 dark:text-emerald-400">
                        {c.jobOutlook.growthRate} ({c.jobOutlook.demandLevel})
                      </td>
                    ))}
                  </tr>

                  {/* Recommended 11-12 Stream */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Grade 11-12 Stream
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 text-slate-800 dark:text-slate-200">
                        {c.educationPath.grade11_12_stream}
                      </td>
                    ))}
                  </tr>

                  {/* Top Entrance Exams */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Entrance Exams
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {c.entranceExams.map((e, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium">
                              {e}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Min 12th Percentage */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Grade 12 Eligibility
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 text-slate-700 dark:text-slate-300">
                        {c.eligibilityCriteria.minGrade12Percentage}
                      </td>
                    ))}
                  </tr>

                  {/* Top Colleges */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Top Colleges
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3 text-slate-600 dark:text-slate-400 space-y-1">
                        {c.topColleges.slice(0, 3).map((col, idx) => (
                          <div key={idx} className="leading-tight">
                            • <span className="font-medium text-slate-800 dark:text-slate-200">{col.name}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Action Link */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500 dark:text-slate-400">
                      Action
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-3">
                        <button
                          onClick={() => {
                            onSelectCareerForDetail(c);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Comparing {selectedCareers.length} of 3 maximum careers
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
