export type CareerCategory = 
  | 'Engineering & Technology' 
  | 'Creative & Design' 
  | 'Business & Management' 
  | 'Social & Psychology';

export interface ScoreWeights {
  analytical: number;
  creative: number;
  business: number;
  social: number;
  // Deep psychological traits requested by user
  cognitive: number;   // Cognitive & Strategic Thinking
  logical: number;     // Logical & Analytical Reasoning
  patience: number;    // Patience, Focus & Crisis Resilience
  softSkills: number;  // Soft Skills, Communication & Empathy
}

export interface QuestionOption {
  id: string;
  text: string;
  scenarioResponse: string;
  weights: ScoreWeights;
  softSkillDemonstrated: string;
}

export interface Question {
  id: number;
  title: string;
  scenario: string;
  categoryTag: string;
  traitFocus: string;
  options: QuestionOption[];
}

export interface College {
  name: string;
  location: string;
  tier: 'Top Tier / Ivy League' | 'Premier National' | 'Leading Global';
  avgCutoff: string;
  programHighlight?: string;
  acceptanceRate?: string;
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  category: CareerCategory;
  conductingBody: string;
  eligibility: string;
  examMonth: string;
  applicationDeadline: string;
  syllabusHighlights: string[];
  keyColleges: string[];
  howToApplyUrl?: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  timeframe: string;
  description: string;
  actionItems: string[];
}

export interface Career {
  id: string;
  title: string;
  category: CareerCategory;
  scoreRange: string;
  summary: string;
  description: string;
  skills: string[];
  personalityTraits: string[];
  educationPath: {
    grade11_12_stream: string;
    undergraduateDegrees: string[];
    postgraduateDegrees: string[];
    certificationOptions: string[];
  };
  jobOutlook: {
    growthRate: string;
    startingSalary: string;
    midCareerSalary: string;
    demandLevel: 'High' | 'Very High' | 'Exceptional';
  };
  topColleges: College[];
  entranceExams: string[];
  eligibilityCriteria: {
    minGrade12Percentage: string;
    mandatorySubjects: string[];
    otherRequirements: string;
  };
  applicationTimeline: {
    preparationGrade: string;
    examRegistration: string;
    collegeCounseling: string;
  };
  howToApplySteps?: ApplicationStep[];
  featuredImage?: string;
}

export interface TraitScores {
  cognitive: number;    // 0 - 100%
  logical: number;      // 0 - 100%
  creative: number;     // 0 - 100%
  patience: number;     // 0 - 100%
  softSkills: number;   // 0 - 100%
}

export interface TestResult {
  id: string;
  timestamp: string;
  totalScore: number;
  category: CareerCategory;
  scores: ScoreWeights;
  traitScores: TraitScores;
  measuredSoftSkills: string[];
  topCareerId: string;
  whySuggested: {
    headline: string;
    reasonSummary: string;
    traitMatches: string[];
    answerKeyEvidence: string[];
  };
  answers: Record<number, string>;
  recommendedCareerIds: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  school: string;
  targetRegion: string;
  savedCareerIds: string[];
  testHistory: TestResult[];
  joinedDate: string;
}
