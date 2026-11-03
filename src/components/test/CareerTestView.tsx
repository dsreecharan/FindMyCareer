import React, { useState } from 'react';
import { CAREER_TEST_QUESTIONS } from '../../data/questions';
import { MASTER_CAREERS } from '../../data/careers';
import { CareerCategory, ScoreWeights, TestResult } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Sparkles, Compass, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CareerTestViewProps {
  onComplete: (result: TestResult) => void;
  onCancel: () => void;
}

export const CareerTestView: React.FC<CareerTestViewProps> = ({ onComplete, onCancel }) => {
  const { saveTestResult } = useAuth();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentQ = CAREER_TEST_QUESTIONS[currentIdx];
  const totalQuestions = CAREER_TEST_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const calculateResults = (): TestResult => {
    const scores: ScoreWeights = {
      analytical: 0,
      creative: 0,
      business: 0,
      social: 0,
      cognitive: 0,
      logical: 0,
      patience: 0,
      softSkills: 0
    };

    const detectedSkills: string[] = [];
    const scenarioEvidence: string[] = [];

    CAREER_TEST_QUESTIONS.forEach(q => {
      const selectedOptionId = answers[q.id];
      if (selectedOptionId) {
        const option = q.options.find(opt => opt.id === selectedOptionId);
        if (option) {
          scores.analytical += option.weights.analytical;
          scores.creative += option.weights.creative;
          scores.business += option.weights.business;
          scores.social += option.weights.social;
          scores.cognitive += option.weights.cognitive || 2;
          scores.logical += option.weights.logical || 2;
          scores.patience += option.weights.patience || 2;
          scores.softSkills += option.weights.softSkills || 2;

          if (option.softSkillDemonstrated) {
            detectedSkills.push(option.softSkillDemonstrated);
          }
          if (q.id === 2 || q.id === 4 || q.id === 9 || q.id === 14) {
            scenarioEvidence.push(`${q.title}: "${option.softSkillDemonstrated}"`);
          }
        }
      }
    });

    // Compute composite total score
    const rawTotal = scores.analytical + scores.creative + scores.business + scores.social;
    const clampedTotal = Math.min(60, Math.max(15, Math.round(rawTotal)));

    // Categorization based on prompt's exact score ranges:
    let primaryCategory: CareerCategory = 'Engineering & Technology';
    if (clampedTotal >= 50) {
      primaryCategory = 'Engineering & Technology';
    } else if (clampedTotal >= 40) {
      primaryCategory = 'Creative & Design';
    } else if (clampedTotal >= 30) {
      primaryCategory = 'Business & Management';
    } else {
      primaryCategory = 'Social & Psychology';
    }

    // Trait Percentages (0 - 100%)
    const qCount = totalQuestions || 15;
    const traitScores = {
      cognitive: Math.min(98, Math.max(35, Math.round((scores.cognitive / (qCount * 4)) * 100))),
      logical: Math.min(98, Math.max(35, Math.round((scores.logical / (qCount * 4)) * 100))),
      creative: Math.min(98, Math.max(35, Math.round((scores.creative / (qCount * 3.5)) * 100))),
      patience: Math.min(98, Math.max(35, Math.round((scores.patience / (qCount * 4)) * 100))),
      softSkills: Math.min(98, Math.max(35, Math.round((scores.softSkills / (qCount * 4)) * 100)))
    };

    // Filter top careers tailored to user's scores
    const categoryCareers = MASTER_CAREERS.filter(c => c.category === primaryCategory);
    const topCareer = categoryCareers[0] || MASTER_CAREERS[0];
    const otherCareers = MASTER_CAREERS.filter(c => c.category !== primaryCategory);

    const recommendedIds = [
      topCareer.id,
      ...categoryCareers.slice(1).map(c => c.id),
      ...otherCareers.slice(0, 2).map(c => c.id)
    ];

    // Build the personalized reason why this career is suggested
    const whySuggested = {
      headline: `Your high ${traitScores.logical > 70 ? 'Logical Reasoning' : 'Cognitive Thinking'} (${Math.max(traitScores.logical, traitScores.cognitive)}%) and ${traitScores.patience > 65 ? 'Patience & Resilience' : 'Problem-Solving Drive'} (${traitScores.patience}%) directly align with ${topCareer.title}.`,
      reasonSummary: `During the 15 scenario evaluations, you consistently selected approaches centered on ${
        primaryCategory === 'Engineering & Technology' ? 'first-principles logic, algorithmic causality, and systematic debugging' :
        primaryCategory === 'Creative & Design' ? 'visual storytelling, spatial aesthetics, and human-computer empathy' :
        primaryCategory === 'Business & Management' ? 'macroeconomic strategy, resource allocation, and decisive leadership' :
        'therapeutic empathy, psychological health, and diplomatic consensus'
      }. When faced with unforeseen friction, your instinct was to preserve composure and deconstruct the problem logically rather than guessing blindly.`,
      traitMatches: [
        `Cognitive & Thinking: ${traitScores.cognitive}% alignment with ${topCareer.title} complexity`,
        `Logical Reasoning: ${traitScores.logical}% alignment with industry technical benchmarks`,
        `Patience & Focus: ${traitScores.patience}% resilience under prolonged testing and study`,
        `Soft Skills: ${traitScores.softSkills}% effectiveness in cross-functional collaboration`
      ],
      answerKeyEvidence: scenarioEvidence.length > 0 ? scenarioEvidence : [
        'Demonstrated structured problem-decomposition when files corrupted under deadline pressure',
        'Prioritized deep conceptual first-principles over memorization in advanced learning scenarios'
      ]
    };

    // Deduplicate soft skills
    const uniqueSkills = Array.from(new Set(detectedSkills)).slice(0, 6);

    return saveTestResult({
      totalScore: clampedTotal,
      category: primaryCategory,
      scores,
      traitScores,
      measuredSoftSkills: uniqueSkills,
      topCareerId: topCareer.id,
      whySuggested,
      answers,
      recommendedCareerIds: recommendedIds
    });
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Are you sure you want to finish now? We recommend answering all 15 for optimal accuracy.`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      const finalResult = calculateResults();
      onComplete(finalResult);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Bar / Header of Test */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>High School Career Diagnostic · Grade 9-12</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Psychological & Scenario Assessment
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Exit Test
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all answers for this test attempt?')) {
                setAnswers({});
                setCurrentIdx(0);
              }
            }}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Tracker Strip */}
      <div className="space-y-2 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <span>Question {currentIdx + 1} of {totalQuestions}</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{currentQ.categoryTag}</span>
          </div>
          <div className="font-mono text-slate-500 dark:text-slate-400 tabular-nums">
            {answeredCount}/{totalQuestions} answered ({progressPercent}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Direct Question Jump Navigator */}
        <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
          {CAREER_TEST_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                title={`Question ${idx + 1}: ${q.title}`}
                className={`w-7 h-7 rounded-md font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300'
                    : isAnswered
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium'
                    : 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Scenario Narrative */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">
              SCENARIO #{currentQ.id}
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Measuring: <strong className="text-slate-700 dark:text-slate-200">{currentQ.traitFocus}</strong>
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            "{currentQ.scenario}"
          </p>
        </div>

        {/* 4 Interactive Options */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Choose your instinctive reaction:
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = answers[currentQ.id] === option.id;
              const optionLetter = ['A', 'B', 'C', 'D'][optIdx];

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {optionLetter}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <p className={`text-sm leading-snug ${isSelected ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="space-y-1 pt-1">
                        <p className="text-xs text-indigo-700 dark:text-indigo-300 italic">
                          Insight: {option.scenarioResponse}
                        </p>
                        {option.softSkillDemonstrated && (
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <Sparkles className="w-3 h-3" />
                            <span>Demonstrates: {option.softSkillDemonstrated}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation & Submission Controls */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIdx < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Evaluating Assessment...' : 'Calculate My Career Profile'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Helpful Student Tip */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400">
        Tip: Answer honestly based on what you enjoy doing, not what you think parents or teachers expect.
      </div>
    </div>
  );
};
