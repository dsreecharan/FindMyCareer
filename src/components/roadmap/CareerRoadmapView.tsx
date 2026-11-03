import React, { useState, useEffect, useMemo } from 'react';
import { Career, CareerCategory } from '../../types';
import { MASTER_CAREERS } from '../../data/careers';
import { useAuth } from '../../context/AuthContext';
import { 
  getRoadmapForCareer, 
  RoadmapSkill, 
  RoadmapCertification, 
  ExamMilestone 
} from '../../data/roadmapData';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowUpRight, 
  Award, 
  Calendar, 
  BookOpen, 
  Clock, 
  Layers, 
  ChevronRight, 
  Download, 
  Printer, 
  Sparkles,
  Target,
  GraduationCap,
  ShieldCheck,
  Check
} from 'lucide-react';

interface CareerRoadmapViewProps {
  initialCareerId?: string;
  onSelectCareerForDetail?: (career: Career) => void;
  onStartTest?: () => void;
}

export const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({
  initialCareerId,
  onSelectCareerForDetail,
  onStartTest
}) => {
  const { user } = useAuth();

  // Identify user's test result and recommended stream
  const userTestResult = user?.testHistory?.[0];
  const userCategory = userTestResult?.category;

  // Filter available roadmap careers strictly to user's recommended stream/branch
  const availableCareers = useMemo(() => {
    if (userCategory) {
      return MASTER_CAREERS.filter(c => c.category === userCategory);
    }
    // If no test taken yet, only show sample career until test is taken
    return [MASTER_CAREERS[0]];
  }, [userCategory]);

  // Resolve default career: initial prop -> latest test top career -> first in recommended stream
  const defaultCareerId = useMemo(() => {
    if (initialCareerId && availableCareers.some(c => c.id === initialCareerId)) {
      return initialCareerId;
    }
    if (userTestResult?.topCareerId) return userTestResult.topCareerId;
    return availableCareers[0].id;
  }, [initialCareerId, userTestResult, availableCareers]);

  const [selectedCareerId, setSelectedCareerId] = useState<string>(defaultCareerId);

  // Sync selectedCareerId when availableCareers change
  useEffect(() => {
    if (!availableCareers.some(c => c.id === selectedCareerId)) {
      setSelectedCareerId(availableCareers[0].id);
    }
  }, [availableCareers, selectedCareerId]);
  
  // Grade view: defaults to user's registered grade, otherwise 'Grade 10'
  const [selectedGrade, setSelectedGrade] = useState<'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12'>(
    user?.grade || 'Grade 10'
  );

  // Active view tab: 'all' | 'skills' | 'certifications' | 'timeline'
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'certifications' | 'timeline'>('all');

  // Interactive checked skills tracking persisted to localStorage & Cloud Firestore
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('fmc_completed_skills');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync with Cloud Firestore on mount or user change
  useEffect(() => {
    if (!user || user.id.startsWith('usr_')) return;
    import('../../lib/firebase').then(({ fetchRoadmapChecklistFromFirestore }) => {
      fetchRoadmapChecklistFromFirestore(user.id, selectedCareerId).then(data => {
        if (data && data.completedSkillIds) {
          const map: Record<string, boolean> = {};
          data.completedSkillIds.forEach(id => { map[id] = true; });
          setCompletedSkills(prev => ({ ...prev, ...map }));
        }
      });
    });
  }, [user, selectedCareerId]);

  const toggleSkill = (skillId: string) => {
    setCompletedSkills(prev => {
      const updated = { ...prev, [skillId]: !prev[skillId] };
      try {
        localStorage.setItem('fmc_completed_skills', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save completed skill', err);
      }

      // Sync to Cloud Firestore
      if (user && !user.id.startsWith('usr_')) {
        const completedIds = Object.keys(updated).filter(k => updated[k]);
        import('../../lib/firebase').then(({ saveRoadmapChecklistToFirestore }) => {
          saveRoadmapChecklistToFirestore(user.id, selectedCareerId, [], completedIds, selectedGrade);
        });
      }

      return updated;
    });
  };

  const currentCareer = useMemo(() => {
    return MASTER_CAREERS.find(c => c.id === selectedCareerId) || MASTER_CAREERS[0];
  }, [selectedCareerId]);

  const roadmapBlueprint = useMemo(() => {
    return getRoadmapForCareer(currentCareer.id, currentCareer.category);
  }, [currentCareer]);

  const currentMilestone = roadmapBlueprint.milestones[selectedGrade];

  // Grade ordering for progress bar calculations
  const gradeOrder = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] as const;
  const currentGradeIndex = gradeOrder.indexOf(selectedGrade);
  const userGradeIndex = user ? gradeOrder.indexOf(user.grade) : 1;

  // Calculate completed skills for the selected career
  const totalCareerSkills = useMemo(() => {
    const skills: RoadmapSkill[] = [];
    gradeOrder.forEach(g => {
      skills.push(...roadmapBlueprint.milestones[g].skillsToLearn);
    });
    return skills;
  }, [roadmapBlueprint]);

  const completedCount = totalCareerSkills.filter(s => completedSkills[s.id]).length;
  const skillReadinessPercent = totalCareerSkills.length > 0 
    ? Math.round((completedCount / totalCareerSkills.length) * 100) 
    : 0;

  return (
    <div className="space-y-10 py-4 max-w-7xl mx-auto">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & CONTROLS (TARGET CAREER & CURRENT GRADE)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
              <span>04 // 4-YEAR ADMISSIONS & CAREER ROADMAP</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From High School to {currentCareer.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              A chronological blueprint detailing <strong className="font-semibold text-slate-900 dark:text-white">Skills to Learn</strong>, <strong className="font-semibold text-slate-900 dark:text-white">Recommended Certifications</strong>, and the <strong className="font-semibold text-slate-900 dark:text-white">Ideal Exam Prep Timeline</strong> from Grade 9 through Grade 12 admissions.
            </p>
          </div>

          {/* Quick Print / Export Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Roadmap Dossier</span>
            </button>
          </div>
        </div>

        {/* Career & Grade Selection Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
          
          {/* Target Career Selector */}
          <div className="md:col-span-7 space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-slate-500 font-semibold block">
              TARGET CAREER BLUEPRINT
            </label>
            <div className="relative">
              <select
                value={selectedCareerId}
                onChange={e => setSelectedCareerId(e.target.value)}
                className="w-full pl-4 pr-10 py-3 text-sm font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer appearance-none transition-colors"
              >
                {availableCareers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
            {userCategory ? (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Locked to your assessment-recommended stream: <strong>{userCategory}</strong>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500">
                Sample preview. Complete the 15-scenario test to lock in your personalized stream.
              </p>
            )}
          </div>

          {/* High School Stream & Undergrad Meta */}
          <div className="md:col-span-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-center space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-rose-500 uppercase font-bold">Recommended 11-12 Stream:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{roadmapBlueprint.primaryStream}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">Target Undergrad Degree:</span>
              <span className="text-slate-600 dark:text-slate-300 truncate">{roadmapBlueprint.idealUndergrad}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. VISUAL PROGRESS STEPPER: GRADE 9 TO GRADE 12
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
              Academic Stage: {selectedGrade}
            </h2>
          </div>

          {/* Interactive Readiness Metric Pill */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/70 px-4 py-2 rounded-2xl">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Skill Mastery</span>
              <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                {completedCount} / {totalCareerSkills.length} Skills ({skillReadinessPercent}%)
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              {skillReadinessPercent}%
            </div>
          </div>
        </div>

        {/* Step-by-Step Grade Horizon Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
          {gradeOrder.map((g, idx) => {
            const milestone = roadmapBlueprint.milestones[g];
            const isSelected = selectedGrade === g;
            const isPast = idx < currentGradeIndex;
            const isUserCurrent = user?.grade === g;

            return (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between space-y-3 group ${
                  isSelected
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-md'
                    : isPast
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-slate-900 dark:text-white hover:border-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold ${
                    isSelected ? 'text-rose-400 dark:text-rose-600' : 'text-slate-400'
                  }`}>
                    [ {g.toUpperCase()} ]
                  </span>
                  
                  {isUserCurrent && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                      YOU ARE HERE
                    </span>
                  )}
                  {isPast && !isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm leading-tight">
                    {milestone.phaseName}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${
                    isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    "{milestone.focusQuote}"
                  </p>
                </div>

                <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono">
                  <span>Horizon: {milestone.readinessPercentage}%</span>
                  <span className="font-semibold">{milestone.skillsToLearn.length} Skills</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Milestone Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: 'All Integrated Milestones' },
            { id: 'skills', label: `Skills to Learn (${currentMilestone.skillsToLearn.length})` },
            { id: 'certifications', label: `Recommended Certifications (${currentMilestone.recommendedCertifications.length})` },
            { id: 'timeline', label: `Ideal Exam Prep Timeline (${currentMilestone.examPrepTimeline.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MILESTONE CONTENT CARDS
          ───────────────────────────────────────────────────────────── */}
      
      {/* SECTION A: SKILLS TO LEARN */}
      {(activeTab === 'all' || activeTab === 'skills') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Skills to Learn in {selectedGrade}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click checkbox to mark mastered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentMilestone.skillsToLearn.map(skill => {
              const isChecked = !!completedSkills[skill.id];

              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                    isChecked
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        skill.category === 'Technical' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300' :
                        skill.category === 'Analytical' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                        skill.category === 'Creative' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                        skill.category === 'Strategic' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {skill.category}
                      </span>

                      {/* Interactive Checkbox */}
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isChecked 
                          ? 'bg-emerald-500 text-white' 
                          : 'border border-slate-300 dark:border-slate-700 group-hover:border-slate-400'
                      }`}>
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className={`font-display font-bold text-base leading-snug transition-colors ${
                      isChecked ? 'text-emerald-950 dark:text-emerald-200 line-through opacity-80' : 'text-slate-950 dark:text-white'
                    }`}>
                      {skill.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{skill.estimatedHours}</span>
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{skill.difficulty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION B: RECOMMENDED CERTIFICATIONS & COMPETITIONS */}
      {(activeTab === 'all' || activeTab === 'certifications') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Recommended Certifications & Competitions ({selectedGrade})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Recognized on university applications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentMilestone.recommendedCertifications.map(cert => (
              <div
                key={cert.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {cert.badgeType}
                    </span>
                    <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {cert.targetTimeline}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Issuing Body: {cert.issuingOrganization}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      Admissions Value Proposition:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {cert.applicationValue}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Explore Syllabus & Enrollment</span>
                  <ArrowUpRight className="w-4 h-4 text-rose-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION C: IDEAL EXAM PREP TIMELINE */}
      {(activeTab === 'all' || activeTab === 'timeline') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-rose-500 rotate-45" />
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Ideal Exam Prep Timeline ({selectedGrade})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Quarter-by-quarter schedule
            </span>
          </div>

          <div className="space-y-4">
            {currentMilestone.examPrepTimeline.map(examItem => (
              <div
                key={examItem.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-rose-500">
                      {examItem.quarter}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {examItem.actionStage}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                    {examItem.examName}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {examItem.details}
                  </p>
                </div>

                <div className="md:text-right shrink-0 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Recommended Study Load
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-950 dark:text-white">
                    {examItem.recommendedWeeklyHours}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. FOOTER BLUEPRINT CTA
          ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>UNSURE IF THIS TARGET CAREER MATCHES YOUR TRAITS?</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            Take the 15-scenario cognitive assessment first.
          </h3>
          <p className="text-xs text-slate-400">
            Find out if your natural instincts match {currentCareer.title} or one of our other 11 accredited disciplines before committing to stream choices.
          </p>
        </div>

        <button
          onClick={onStartTest}
          className="group px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs flex items-center gap-2.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-md"
        >
          <span>Take 15-Scenario Test</span>
          <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </section>

    </div>
  );
};
