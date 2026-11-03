import React from 'react';
import { Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'test' | 'dashboard' | 'roadmap' | 'results') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                FindMyCareer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Empowering Grade 9–12 high school students to discover their natural academic stream, target college branch, and personalized 4-year admissions roadmap.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Evidence-based psychological scenario diagnostic</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3 font-mono">
              Core Aptitude Dimensions
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Cognitive & Strategic Problem Solving</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Logical & Algorithmic Deduction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Creative Innovation & Spatial Design</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Patience, Resilience & Soft Skills</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3 font-mono">
              Grade 9–12 Academic Horizon
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center justify-between">
                <span>Grade 9: Habit & Club Exploration</span>
                <span className="text-[11px] font-mono text-slate-400">Horizon 25%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Grade 10: Stream Selection & Boards</span>
                <span className="text-[11px] font-mono text-slate-400">Horizon 50%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Grade 11: Entrance Exam Foundations</span>
                <span className="text-[11px] font-mono text-slate-400">Horizon 75%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Grade 12: National Tests & Counseling</span>
                <span className="text-[11px] font-mono text-slate-400">Horizon 100%</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FindMyCareer. Designed for high school student simplicity and clarity.</p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Scenario Diagnostic</span>
            <span>·</span>
            <span>Target Branch Allotment</span>
            <span>·</span>
            <span>4-Year Roadmap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
