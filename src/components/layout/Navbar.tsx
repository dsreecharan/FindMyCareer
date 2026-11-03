import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  User, 
  Bookmark, 
  LogOut, 
  ChevronDown, 
  Check, 
  ArrowUpRight,
  Boxes
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'test' | 'results' | 'dashboard' | 'roadmap';
  setCurrentTab: (tab: 'home' | 'test' | 'results' | 'dashboard' | 'roadmap') => void;
  onOpenAuthModal: () => void;
  onStartTest: () => void;
  onOpenCounselor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuthModal,
  onStartTest,
  onOpenCounselor
}) => {
  const { user, logout, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-[#0B0F17]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: Databest-style Minimalist Brand Wordmark */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white rounded-lg p-1"
        >
          {/* Geometric Databest Emblem */}
          <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center gap-0.5">
              <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-pulse" />
              <span className="w-1.5 h-6 bg-current rounded-full" />
              <span className="w-1.5 h-3 bg-current rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                FindMyCareer
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold tracking-wider">
                PRO
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Simple, Focused, User-Friendly Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setCurrentTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              currentTab === 'home' ? 'text-slate-900 dark:text-white font-semibold' : ''
            }`}
          >
            <span>Home</span>
            {currentTab === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 dark:bg-white rounded-full" />
            )}
          </button>

          {/* If the student has taken a test, give direct access to their result */}
          {user && user.testHistory.length > 0 ? (
            <button
              onClick={() => setCurrentTab('results')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'results' ? 'text-slate-900 dark:text-white font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>My Career Result</span>
              {currentTab === 'results' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 dark:bg-white rounded-full" />
              )}
            </button>
          ) : (
            <button
              onClick={onStartTest}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'test' ? 'text-slate-900 dark:text-white font-semibold' : ''
              }`}
            >
              <span>Take Assessment</span>
              {currentTab === 'test' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 dark:bg-white rounded-full" />
              )}
            </button>
          )}

          {/* My Career Roadmap */}
          <button
            onClick={() => setCurrentTab('roadmap')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              currentTab === 'roadmap' ? 'text-slate-900 dark:text-white font-semibold' : ''
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>Career Roadmap</span>
              {user && user.testHistory.length > 0 && (
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-emerald-500 text-white rounded font-bold">
                  ACTIVE
                </span>
              )}
            </span>
            {currentTab === 'roadmap' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 dark:bg-white rounded-full" />
            )}
          </button>

          {/* Student Dashboard */}
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white flex items-center gap-2 cursor-pointer ${
              currentTab === 'dashboard' ? 'text-slate-900 dark:text-white font-semibold' : ''
            }`}
          >
            <span>Dashboard</span>
            {currentTab === 'dashboard' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 dark:bg-white rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Actions + Databest Slide-Arrow CTA */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* AI Admissions Advisor & Live Search Launcher */}
          {onOpenCounselor && (
            <button
              onClick={onOpenCounselor}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Advisor</span>
            </button>
          )}

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Switcher Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 py-1.5 px-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[11px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
                    · {user.grade}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-xs"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <p className="text-rose-600 dark:text-rose-400 font-medium mt-1">{user.grade} · {user.school}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => setCurrentTab('dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Profile & Test History</span>
                      </button>
                      <button
                        onClick={() => setCurrentTab('dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400" />
                        <span>Saved Pathways ({user.savedCareerIds.length})</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Instant Personas
                      </div>
                      <button
                        onClick={() => switchDemoUser(0)}
                        className="w-full text-left px-4 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <span>Maya (Grade 11 · STEM)</span>
                        {user.id === 'usr_maya_gr11' && <Check className="w-3.5 h-3.5 text-rose-500" />}
                      </button>
                      <button
                        onClick={() => switchDemoUser(1)}
                        className="w-full text-left px-4 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <span>Rohan (Grade 12 · Biz)</span>
                        {user.id === 'usr_rohan_gr12' && <Check className="w-3.5 h-3.5 text-rose-500" />}
                      </button>
                      <button
                        onClick={() => switchDemoUser(2)}
                        className="w-full text-left px-4 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <span>Chloe (Grade 10 · Design)</span>
                        {user.id === 'usr_chloe_gr10' && <Check className="w-3.5 h-3.5 text-rose-500" />}
                      </button>
                    </div>

                    <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Signature Databest Sliding-Arrow Button */}
          <button
            onClick={onStartTest}
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold tracking-tight hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Take Assessment</span>
            <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-slate-950/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

      </div>
    </header>
  );
};
