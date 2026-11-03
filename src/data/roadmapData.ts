import { CareerCategory } from '../types';

export interface RoadmapSkill {
  id: string;
  title: string;
  category: 'Technical' | 'Soft Skills' | 'Analytical' | 'Creative' | 'Strategic';
  description: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
}

export interface RoadmapCertification {
  id: string;
  title: string;
  issuingOrganization: string;
  badgeType: 'Olympiad / Competition' | 'Industry Certificate' | 'Pre-College Project' | 'Research Fellowship';
  targetTimeline: string;
  applicationValue: string;
}

export interface ExamMilestone {
  id: string;
  examName: string;
  quarter: 'Fall (Q1)' | 'Winter (Q2)' | 'Spring (Q3)' | 'Summer (Q4)';
  actionStage: 'Diagnostic' | 'Syllabus Foundation' | 'Intensive Mocks' | 'Registration & Testing';
  details: string;
  recommendedWeeklyHours: string;
}

export interface GradeMilestone {
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  phaseName: string;
  focusQuote: string;
  readinessPercentage: number;
  skillsToLearn: RoadmapSkill[];
  recommendedCertifications: RoadmapCertification[];
  examPrepTimeline: ExamMilestone[];
}

export interface CareerRoadmapBlueprint {
  careerId: string;
  category: CareerCategory;
  primaryStream: string;
  idealUndergrad: string;
  milestones: Record<'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12', GradeMilestone>;
}

export const CAREER_ROADMAPS: Record<string, CareerRoadmapBlueprint> = {
  // ─────────────────────────────────────────────────────────────
  // 1. AI & MACHINE LEARNING ENGINEER (Engineering & Tech)
  // ─────────────────────────────────────────────────────────────
  'ai-engineer': {
    careerId: 'ai-engineer',
    category: 'Engineering & Technology',
    primaryStream: 'Science (Physics, Chemistry, Mathematics w/ Computer Science)',
    idealUndergrad: 'B.Tech / B.S. in Computer Science & Artificial Intelligence',
    milestones: {
      'Grade 9': {
        grade: 'Grade 9',
        phaseName: 'Computational Curiosity & Problem Framing',
        focusQuote: 'Build coding muscle memory and mathematical intuition without exam stress.',
        readinessPercentage: 25,
        skillsToLearn: [
          {
            id: 'ai-s1',
            title: 'Python Scripting & Logic Flow',
            category: 'Technical',
            description: 'Master variables, data structures (lists, dicts), and basic algorithm control loops.',
            difficulty: 'Foundational',
            estimatedHours: '40 hours'
          },
          {
            id: 'ai-s2',
            title: 'Algebraic & Cartesian Coordinate Intuition',
            category: 'Analytical',
            description: 'Strengthen high school algebra, linear relations, and graphical functions necessary for machine learning curves.',
            difficulty: 'Foundational',
            estimatedHours: '30 hours'
          },
          {
            id: 'ai-s3',
            title: 'Technical Curiosity & Documentation',
            category: 'Soft Skills',
            description: 'Learn to read open-source code and document personal coding projects on GitHub.',
            difficulty: 'Foundational',
            estimatedHours: '15 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'ai-c1',
            title: 'CS50x: Introduction to Computer Science',
            issuingOrganization: 'Harvard University (edX)',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 9 Summer',
            applicationValue: 'Demonstrates deep university-level algorithmic rigor on undergraduate applications.'
          },
          {
            id: 'ai-c2',
            title: 'National Cyber Olympiad (NCO) / ZIO',
            issuingOrganization: 'IARCS / Science Olympiad Foundation',
            badgeType: 'Olympiad / Competition',
            targetTimeline: 'Grade 9 Winter',
            applicationValue: 'National competitive benchmarking for algorithmic problem-solving aptitude.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'ai-e1',
            examName: 'STEM Aptitude Baseline',
            quarter: 'Fall (Q1)',
            actionStage: 'Diagnostic',
            details: 'Assess natural strengths in spatial reasoning, number theory, and speed of mental math.',
            recommendedWeeklyHours: '3 hrs/wk'
          },
          {
            id: 'ai-e2',
            examName: 'Math Olympiad Level 1',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Solve non-routine problem sets focusing on combinations, geometry, and primes.',
            recommendedWeeklyHours: '4 hrs/wk'
          }
        ]
      },
      'Grade 10': {
        grade: 'Grade 10',
        phaseName: 'Stream Lock-In & Algorithmic Foundations',
        focusQuote: 'Achieve board distinction and firmly select Science (PCM + CS) for Grade 11.',
        readinessPercentage: 50,
        skillsToLearn: [
          {
            id: 'ai-s4',
            title: 'NumPy, Pandas & Exploratory Data Analysis',
            category: 'Technical',
            description: 'Manipulate high-school datasets (weather, sports stats) using Python data science libraries.',
            difficulty: 'Intermediate',
            estimatedHours: '50 hours'
          },
          {
            id: 'ai-s5',
            title: 'Matrix Arithmetic & Vector Spaces',
            category: 'Analytical',
            description: 'Understand dot products, transformation matrices, and linear equations that power neural networks.',
            difficulty: 'Intermediate',
            estimatedHours: '35 hours'
          },
          {
            id: 'ai-s6',
            title: 'Structured Scientific Communication',
            category: 'Soft Skills',
            description: 'Write coherent project abstracts for school science exhibitions and technical presentations.',
            difficulty: 'Foundational',
            estimatedHours: '20 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'ai-c3',
            title: 'AWS Certified Cloud Practitioner (Foundational)',
            issuingOrganization: 'Amazon Web Services',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 10 Spring',
            applicationValue: 'Recognized industry credential proving real-world compute and cloud architecture fluency.'
          },
          {
            id: 'ai-c4',
            title: 'Kaggle Python & Machine Learning Micro-Courses',
            issuingOrganization: 'Kaggle / Google',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 10 Summer',
            applicationValue: 'Hands-on validation of data cleaning and regression algorithms with public kernels.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'ai-e3',
            examName: '10th Board Exam Mastery',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Target >90% aggregate in 10th CBSE/ICSE/State boards to qualify for premier coaching batches.',
            recommendedWeeklyHours: '8 hrs/wk'
          },
          {
            id: 'ai-e4',
            examName: 'PSAT / SAT Diagnostic',
            quarter: 'Summer (Q4)',
            actionStage: 'Diagnostic',
            details: 'Take initial baseline SAT practice test to benchmark reading comprehension and Math Section 800.',
            recommendedWeeklyHours: '4 hrs/wk'
          }
        ]
      },
      'Grade 11': {
        grade: 'Grade 11',
        phaseName: 'Core Engineering Rigor & Competitive Grind',
        focusQuote: 'Master the 60% core syllabus of JEE / SAT and build your deep tech portfolio.',
        readinessPercentage: 75,
        skillsToLearn: [
          {
            id: 'ai-s7',
            title: 'Calculus, Optimization & Gradient Descent',
            category: 'Analytical',
            description: 'Master derivatives, chain rule, and limits to understand loss function minimization.',
            difficulty: 'Advanced',
            estimatedHours: '70 hours'
          },
          {
            id: 'ai-s8',
            title: 'Neural Networks with PyTorch / TensorFlow',
            category: 'Technical',
            description: 'Construct multi-layer perceptrons, convolutional layers for image recognition, and text tokenizers.',
            difficulty: 'Advanced',
            estimatedHours: '65 hours'
          },
          {
            id: 'ai-s9',
            title: 'Team Git Collaboration & Code Review',
            category: 'Soft Skills',
            description: 'Participate in student hackathons, manage branch merges, and articulate architectural trade-offs.',
            difficulty: 'Intermediate',
            estimatedHours: '25 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'ai-c5',
            title: 'DeepLearning.AI: Machine Learning Specialization',
            issuingOrganization: 'Andrew Ng / Stanford Online (Coursera)',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 11 Winter',
            applicationValue: 'Gold-standard academic credential valued by top US and European university admissions committees.'
          },
          {
            id: 'ai-c6',
            title: 'Regional Science & Engineering Fair (ISEF Affiliate)',
            issuingOrganization: 'Society for Science',
            badgeType: 'Research Fellowship',
            targetTimeline: 'Grade 11 Spring',
            applicationValue: 'High-impact differentiator for Ivy League, MIT, and IISc/IIT undergraduate admissions.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'ai-e5',
            examName: 'JEE Main & Advanced: Mechanics + Calculus Phase',
            quarter: 'Fall (Q1)',
            actionStage: 'Intensive Mocks',
            details: 'Solve 150+ multi-concept problems weekly across Kinematics, Thermodynamics, and Organic Chemistry.',
            recommendedWeeklyHours: '18 hrs/wk'
          },
          {
            id: 'ai-e6',
            examName: 'SAT Digital: Attempt 1',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Target score of 1500+ (780+ in Math) for early round eligibility at top global engineering programs.',
            recommendedWeeklyHours: '10 hrs/wk'
          }
        ]
      },
      'Grade 12': {
        grade: 'Grade 12',
        phaseName: 'Peak Exam Performance & College Admissions',
        focusQuote: 'Execute high-precision test taking, meet board criteria, and secure your university seat.',
        readinessPercentage: 100,
        skillsToLearn: [
          {
            id: 'ai-s10',
            title: 'High-Speed Test Problem Strategy',
            category: 'Strategic',
            description: 'Optimize 3-hour exam time allocation, error analysis notebooks, and question triage under pressure.',
            difficulty: 'Advanced',
            estimatedHours: '80 hours'
          },
          {
            id: 'ai-s11',
            title: 'College Admissions Dossier & Essay Crafting',
            category: 'Soft Skills',
            description: 'Draft compelling Statement of Purpose linking your high school AI projects to future college goals.',
            difficulty: 'Advanced',
            estimatedHours: '30 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'ai-c7',
            title: 'Published Open-Source AI Model / arXiv Preprint',
            issuingOrganization: 'Hugging Face / GitHub',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 12 Fall',
            applicationValue: 'Proves independent research capability, placing you in top 1% of global applicants.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'ai-e7',
            examName: 'JEE Main Session 1 & Board Pre-Boards',
            quarter: 'Winter (Q2)',
            actionStage: 'Registration & Testing',
            details: 'Secure >99.0 percentile in Session 1 to confirm NIT Trichy/Surathkal Computer Science backup.',
            recommendedWeeklyHours: '25 hrs/wk'
          },
          {
            id: 'ai-e8',
            examName: 'JEE Advanced & JoSAA Centralized Counseling',
            quarter: 'Summer (Q4)',
            actionStage: 'Registration & Testing',
            details: 'Sit for JEE Advanced Paper 1 & 2. Fill JoSAA choices for IIT Bombay, Delhi, Madras CSE.',
            recommendedWeeklyHours: '30 hrs/wk'
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. UI/UX & INTERACTION PRODUCT ARCHITECT (Creative & Design)
  // ─────────────────────────────────────────────────────────────
  'ui-ux-designer': {
    careerId: 'ui-ux-designer',
    category: 'Creative & Design',
    primaryStream: 'Any Stream (Science / Commerce / Humanities) with Fine Arts or Computer Applications',
    idealUndergrad: 'B.Des in Interaction / Industrial Design (NID, IIT IDC, RISD)',
    milestones: {
      'Grade 9': {
        grade: 'Grade 9',
        phaseName: 'Visual Sensitivity & Spatial Observation',
        focusQuote: 'Train your eyes to see design flaws in everyday apps, furniture, and school signage.',
        readinessPercentage: 25,
        skillsToLearn: [
          {
            id: 'des-s1',
            title: 'Freehand Perspective Sketching',
            category: 'Creative',
            description: 'Master 1-point and 2-point perspective, rapid ideation thumbnail sketches, and human proportion gestures.',
            difficulty: 'Foundational',
            estimatedHours: '40 hours'
          },
          {
            id: 'des-s2',
            title: 'Color Theory, Typography & Visual Hierarchy',
            category: 'Creative',
            description: 'Learn color psychology, contrast ratios, font pairing, and micro-grid systems.',
            difficulty: 'Foundational',
            estimatedHours: '30 hours'
          },
          {
            id: 'des-s3',
            title: 'User Empathy & Observation Journaling',
            category: 'Soft Skills',
            description: 'Keep a daily notebook interviewing classmates about what frustrates them about school apps or stationery.',
            difficulty: 'Foundational',
            estimatedHours: '20 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'des-c1',
            title: 'Intro to Graphic Design & Typography',
            issuingOrganization: 'California Institute of the Arts (Coursera)',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 9 Summer',
            applicationValue: 'Establishes early formal graphic sensitivity recognized by global design faculties.'
          },
          {
            id: 'des-c2',
            title: 'Scholastic Art & Writing Awards (Regional Entry)',
            issuingOrganization: 'Alliance for Young Artists & Writers',
            badgeType: 'Olympiad / Competition',
            targetTimeline: 'Grade 9 Winter',
            applicationValue: 'Prestigious national recognition for student design portfolios and sketchbooks.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'des-e1',
            examName: 'Spatial Aptitude Diagnostic',
            quarter: 'Fall (Q1)',
            actionStage: 'Diagnostic',
            details: 'Assess mental rotation, 3D pattern folding, and visual deduction speed.',
            recommendedWeeklyHours: '3 hrs/wk'
          },
          {
            id: 'des-e2',
            examName: 'Daily Speed Sketching Drill',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Produce 3 quick 5-minute sketches daily of everyday objects with realistic lighting and shadow.',
            recommendedWeeklyHours: '4 hrs/wk'
          }
        ]
      },
      'Grade 10': {
        grade: 'Grade 10',
        phaseName: 'Digital Prototyping & Design Systems',
        focusQuote: 'Transition from paper sketches into production-ready Figma interactive interfaces.',
        readinessPercentage: 50,
        skillsToLearn: [
          {
            id: 'des-s4',
            title: 'Figma Auto-Layout & Component Variants',
            category: 'Technical',
            description: 'Build responsive design components, auto-layout cards, interactive hover states, and design token libraries.',
            difficulty: 'Intermediate',
            estimatedHours: '50 hours'
          },
          {
            id: 'des-s5',
            title: 'Information Architecture & User Journey Mapping',
            category: 'Analytical',
            description: 'Create sitemaps, user flowcharts, wireframes, and usability test scripts.',
            difficulty: 'Intermediate',
            estimatedHours: '35 hours'
          },
          {
            id: 'des-s6',
            title: 'Design Critique & Pitching',
            category: 'Soft Skills',
            description: 'Present user interfaces to peers, defend design trade-offs with user data, and iterate graciously.',
            difficulty: 'Intermediate',
            estimatedHours: '20 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'des-c3',
            title: 'Google UX Design Professional Certificate',
            issuingOrganization: 'Google (Coursera)',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 10 Spring',
            applicationValue: 'Demonstrates end-to-end knowledge of empathize, define, ideate, prototype, and test frameworks.'
          },
          {
            id: 'des-c4',
            title: 'Redesign of Local NGO or School Club Website',
            issuingOrganization: 'Community High School Service',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 10 Summer',
            applicationValue: 'Real-world case study with verified user testimonials for your design portfolio.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'des-e3',
            examName: 'UCEED Part A Question Bank Analysis',
            quarter: 'Fall (Q1)',
            actionStage: 'Syllabus Foundation',
            details: 'Solve past 5 years of UCEED Part A questions on observation, visual logic, and environmental design.',
            recommendedWeeklyHours: '5 hrs/wk'
          },
          {
            id: 'des-e4',
            examName: 'Board Exam Preparation (Class 10)',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Ensure strong aggregate score to maintain admission eligibility for national design institutes.',
            recommendedWeeklyHours: '8 hrs/wk'
          }
        ]
      },
      'Grade 11': {
        grade: 'Grade 11',
        phaseName: 'Intensive Entrance Prep (UCEED / NID DAT) & Portfolio',
        focusQuote: 'Curate a 10-piece showstopper portfolio and master rapid drawing under strict exam timers.',
        readinessPercentage: 75,
        skillsToLearn: [
          {
            id: 'des-s7',
            title: 'UCEED Part B Rapid Concept Rendering',
            category: 'Creative',
            description: 'Sketch a complete scene with perspective, human figures, light, and narrative within 30 minutes.',
            difficulty: 'Advanced',
            estimatedHours: '60 hours'
          },
          {
            id: 'des-s8',
            title: 'Micro-Interactions, Motion & Spatial UI',
            category: 'Technical',
            description: 'Animate UI transitions using Principle, Framer, or Protopie to showcase micro-interactions.',
            difficulty: 'Advanced',
            estimatedHours: '45 hours'
          },
          {
            id: 'des-s9',
            title: 'Portfolio Curation & Storytelling',
            category: 'Soft Skills',
            description: 'Structure case studies detailing the problem, failed attempts, user research insights, and final metrics.',
            difficulty: 'Advanced',
            estimatedHours: '30 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'des-c5',
            title: 'Pre-College Summer Residency / Studio Workshop',
            issuingOrganization: 'RISD / NID / Srishti Institute',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 11 Summer',
            applicationValue: 'Direct mentorship under design professors, yielding studio-quality portfolio pieces.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'des-e5',
            examName: 'UCEED & NID DAT Mock Test Series',
            quarter: 'Winter (Q2)',
            actionStage: 'Intensive Mocks',
            details: 'Take 2 timed full-length mock exams weekly simulating actual exam computer + paper format.',
            recommendedWeeklyHours: '12 hrs/wk'
          },
          {
            id: 'des-e6',
            examName: 'International Portfolio Submission (RISD / Parsons)',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Finalize digital SlideRoom portfolio uploads, artist statements, and teacher recommendations.',
            recommendedWeeklyHours: '10 hrs/wk'
          }
        ]
      },
      'Grade 12': {
        grade: 'Grade 12',
        phaseName: 'Studio Tests, Design Interviews & Final Allotment',
        focusQuote: 'Excel in national design exams and deliver persuasive studio test interviews.',
        readinessPercentage: 100,
        skillsToLearn: [
          {
            id: 'des-s10',
            title: 'Material Manipulation & 3D Prototyping',
            category: 'Creative',
            description: 'Sculpt quick 3D conceptual physical models using clay, wire, cardboard, and foam core for studio test tasks.',
            difficulty: 'Advanced',
            estimatedHours: '40 hours'
          },
          {
            id: 'des-s11',
            title: 'Personal Interview & Design Defense',
            category: 'Soft Skills',
            description: 'Articulate design decisions confidently to university panels, demonstrating humility and vision.',
            difficulty: 'Advanced',
            estimatedHours: '25 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'des-c6',
            title: 'Live Product Case Study on Dribbble / Behance',
            issuingOrganization: 'Behance / Dribbble Community',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 12 Fall',
            applicationValue: 'Public portfolio link included in university application essays.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'des-e7',
            examName: 'UCEED & NID DAT National Prelims (January)',
            quarter: 'Winter (Q2)',
            actionStage: 'Registration & Testing',
            details: 'Sit for UCEED & NID DAT Prelims. Target All India Rank (AIR) in top 150 for IIT Bombay IDC / NID Main Campus.',
            recommendedWeeklyHours: '18 hrs/wk'
          },
          {
            id: 'des-e8',
            examName: 'NID DAT Mains & Studio Test Counseling (April-May)',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Attend hands-on studio material handling test, audio-visual test, and portfolio interview.',
            recommendedWeeklyHours: '15 hrs/wk'
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. INVESTMENT BANKER & QUANT TRADER (Business & Management)
  // ─────────────────────────────────────────────────────────────
  'investment-banker': {
    careerId: 'investment-banker',
    category: 'Business & Management',
    primaryStream: 'Commerce with Applied Mathematics or Science (PCM)',
    idealUndergrad: 'B.Com (Hons), BBA (IPM at IIMs), B.S. in Economics / Mathematical Finance',
    milestones: {
      'Grade 9': {
        grade: 'Grade 9',
        phaseName: 'Financial Literacy & Economic Mechanics',
        focusQuote: 'Understand how money, companies, and markets function in the real world.',
        readinessPercentage: 25,
        skillsToLearn: [
          {
            id: 'biz-s1',
            title: 'Personal Finance & Corporate Basics',
            category: 'Analytical',
            description: 'Understand revenue, expenses, profit margins, equity, bonds, and interest compounding.',
            difficulty: 'Foundational',
            estimatedHours: '30 hours'
          },
          {
            id: 'biz-s2',
            title: 'Mental Math & Rapid Percentage Calculus',
            category: 'Analytical',
            description: 'Train speed calculation for percentage gains, exchange rates, and financial ratios.',
            difficulty: 'Foundational',
            estimatedHours: '30 hours'
          },
          {
            id: 'biz-s3',
            title: 'Public Debate & Economic Persuasion',
            category: 'Soft Skills',
            description: 'Participate in Model UN (ECOFIN committee) or school commerce club debates.',
            difficulty: 'Foundational',
            estimatedHours: '20 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'biz-c1',
            title: 'Wharton Global High School Investment Competition',
            issuingOrganization: 'Wharton School (Univ of Pennsylvania)',
            badgeType: 'Olympiad / Competition',
            targetTimeline: 'Grade 9 Winter',
            applicationValue: 'Internationally acclaimed stock simulator and case strategy competition for high schoolers.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'biz-e1',
            examName: 'Business Math & Reasoning Diagnostic',
            quarter: 'Fall (Q1)',
            actionStage: 'Diagnostic',
            details: 'Benchmark aptitude in quantitative data interpretation, syllogisms, and arithmetic.',
            recommendedWeeklyHours: '3 hrs/wk'
          }
        ]
      },
      'Grade 10': {
        grade: 'Grade 10',
        phaseName: 'Spreadsheet Modeling & Stream Commitment',
        focusQuote: 'Lock in Commerce with Applied Mathematics to ensure top finance college eligibility.',
        readinessPercentage: 50,
        skillsToLearn: [
          {
            id: 'biz-s4',
            title: 'Financial Modeling in Microsoft Excel',
            category: 'Technical',
            description: 'Master XLOOKUP, INDEX/MATCH, NPV/IRR formulas, dynamic sensitivity tables, and clean chart design.',
            difficulty: 'Intermediate',
            estimatedHours: '45 hours'
          },
          {
            id: 'biz-s5',
            title: 'Three Financial Statements Analysis',
            category: 'Analytical',
            description: 'Read and connect Balance Sheets, Income Statements, and Cash Flow Statements of public companies.',
            difficulty: 'Intermediate',
            estimatedHours: '35 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'biz-c2',
            title: 'Bloomberg Market Concepts (BMC)',
            issuingOrganization: 'Bloomberg LP',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 10 Summer',
            applicationValue: 'Demonstrates professional financial market literacy directly on high school student CVs.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'biz-e2',
            examName: 'Grade 10 Board Math Mastery',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Target >95% in 10th Math to confirm enrollment in Applied Mathematics or Higher Math in Class 11.',
            recommendedWeeklyHours: '6 hrs/wk'
          }
        ]
      },
      'Grade 11': {
        grade: 'Grade 11',
        phaseName: 'IPMAT / SAT Quantitative Groundwork',
        focusQuote: 'Begin serious preparation for the 5-Year Integrated Program in Management (IIMs) & global B-schools.',
        readinessPercentage: 75,
        skillsToLearn: [
          {
            id: 'biz-s6',
            title: 'Advanced Permutations, Probability & Number Theory',
            category: 'Analytical',
            description: 'Solve higher-difficulty quantitative questions required for IPMAT Indore and quant trading screenings.',
            difficulty: 'Advanced',
            estimatedHours: '60 hours'
          },
          {
            id: 'biz-s7',
            title: 'Verbal Ability & Reading Comprehension (VARC)',
            category: 'Soft Skills',
            description: 'Read The Economist, Financial Times, and Wall Street Journal to master editorial analysis.',
            difficulty: 'Intermediate',
            estimatedHours: '40 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'biz-c3',
            title: 'Harvard Pre-College Program / Wharton Essentials',
            issuingOrganization: 'Harvard Summer School / Wharton',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 11 Summer',
            applicationValue: 'High-value Ivy League summer credential enhancing college profile essays.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'biz-e3',
            examName: 'IPMAT & CUET-UG Mock Series Initiation',
            quarter: 'Winter (Q2)',
            actionStage: 'Intensive Mocks',
            details: 'Take weekly timed sectionals for Quantitative Ability (MCQ + Short Answer) and Verbal Ability.',
            recommendedWeeklyHours: '10 hrs/wk'
          }
        ]
      },
      'Grade 12': {
        grade: 'Grade 12',
        phaseName: 'National Business Entrances & Interview Rounds',
        focusQuote: 'Excel in IPMAT, secure high CUET percentiles, and clear IIM personal interviews.',
        readinessPercentage: 100,
        skillsToLearn: [
          {
            id: 'biz-s8',
            title: 'Written Ability Test (WAT) & Case Analysis',
            category: 'Soft Skills',
            description: 'Formulate 300-word structured essays on macroeconomic topics within 15 minutes.',
            difficulty: 'Advanced',
            estimatedHours: '30 hours'
          },
          {
            id: 'biz-s9',
            title: 'Personal Interview & Executive Poise',
            category: 'Soft Skills',
            description: 'Prepare responses for "Why IPM?", current affairs discussions, and ethical leadership dilemmas.',
            difficulty: 'Advanced',
            estimatedHours: '25 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'biz-c4',
            title: 'Independent Equity Research Report Publication',
            issuingOrganization: 'High School Finance Journal / Medium',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 12 Fall',
            applicationValue: 'In-depth DCF valuation model of a consumer tech stock shown during college interviews.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'biz-e4',
            examName: 'IPMAT Indore & Rohtak (May)',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Sit for national IPMAT entrance. Target top 150 percentile cutoff for IIM Indore 5-Year IPM.',
            recommendedWeeklyHours: '20 hrs/wk'
          },
          {
            id: 'biz-e5',
            examName: 'CUET-UG (Delhi University - SRCC, Shaheed Sukhdev)',
            quarter: 'Summer (Q4)',
            actionStage: 'Registration & Testing',
            details: 'Take CUET English, Mathematics, and General Test for B.Com (Hons) & BMS admissions.',
            recommendedWeeklyHours: '18 hrs/wk'
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. CLINICAL & NEUROPSYCHOLOGIST (Social & Psychology)
  // ─────────────────────────────────────────────────────────────
  'clinical-psychologist': {
    careerId: 'clinical-psychologist',
    category: 'Social & Psychology',
    primaryStream: 'Humanities or Science (Physics, Chemistry, Biology w/ Psychology)',
    idealUndergrad: 'B.A. / B.Sc in Psychology / Cognitive Neuroscience (NIMHANS, Ashoka, Oxford)',
    milestones: {
      'Grade 9': {
        grade: 'Grade 9',
        phaseName: 'Behavioral Observation & Empathy Foundations',
        focusQuote: 'Develop active listening and learn the scientific method of human psychology.',
        readinessPercentage: 25,
        skillsToLearn: [
          {
            id: 'psy-s1',
            title: 'Scientific Method & Hypothesis Testing',
            category: 'Analytical',
            description: 'Understand independent vs dependent variables, control groups, and double-blind experiment design.',
            difficulty: 'Foundational',
            estimatedHours: '30 hours'
          },
          {
            id: 'psy-s2',
            title: 'Active Listening & Non-Verbal Decoding',
            category: 'Soft Skills',
            description: 'Practice observing micro-expressions, speech patterns, and tone inflection during conversations.',
            difficulty: 'Foundational',
            estimatedHours: '25 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'psy-c1',
            title: 'The Science of Well-Being for Teens',
            issuingOrganization: 'Yale University (Coursera)',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 9 Summer',
            applicationValue: 'World-renowned evidence-based psychological science course from Yale faculty.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'psy-e1',
            examName: 'Social Science & Biology Foundations',
            quarter: 'Fall (Q1)',
            actionStage: 'Diagnostic',
            details: 'Strengthen biology of the nervous system and human anatomy foundations.',
            recommendedWeeklyHours: '3 hrs/wk'
          }
        ]
      },
      'Grade 10': {
        grade: 'Grade 10',
        phaseName: 'Neuroscience Basics & Academic Stream Choice',
        focusQuote: 'Choose either PCB w/ Psychology or Humanities w/ Psychology based on medical vs research goals.',
        readinessPercentage: 50,
        skillsToLearn: [
          {
            id: 'psy-s3',
            title: 'Brain Anatomy & Neurotransmitters',
            category: 'Technical',
            description: 'Learn the functions of the cerebral cortex, amygdala, hippocampus, dopamine, and serotonin.',
            difficulty: 'Intermediate',
            estimatedHours: '40 hours'
          },
          {
            id: 'psy-s4',
            title: 'Statistical Correlation vs Causation',
            category: 'Analytical',
            description: 'Interpret statistical p-values, normal distribution curves, and sample sizes in medical papers.',
            difficulty: 'Intermediate',
            estimatedHours: '35 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'psy-c2',
            title: 'Community Mental Health Peer Educator Volunteer',
            issuingOrganization: 'Red Cross / Local Youth Helpline',
            badgeType: 'Pre-College Project',
            targetTimeline: 'Grade 10 Summer',
            applicationValue: 'Shows verified humanitarian commitment and ethical maturity to admissions officers.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'psy-e2',
            examName: 'Board Exam Excellence in Biology & English',
            quarter: 'Winter (Q2)',
            actionStage: 'Syllabus Foundation',
            details: 'Score high marks in natural sciences and languages to ensure humanities/science stream seats.',
            recommendedWeeklyHours: '6 hrs/wk'
          }
        ]
      },
      'Grade 11': {
        grade: 'Grade 11',
        phaseName: 'Entrance Exam Foundations (NEET / CUET-UG Psychology)',
        focusQuote: 'Master the Class 11 psychology and biology curricula, taking preliminary practice mocks.',
        readinessPercentage: 75,
        skillsToLearn: [
          {
            id: 'psy-s5',
            title: 'Psychological Theories & Clinical Diagnostics',
            category: 'Analytical',
            description: 'Study Freud, Piaget, Vygotsky, cognitive behavioral frameworks, and DSM-5 diagnostic categories.',
            difficulty: 'Advanced',
            estimatedHours: '55 hours'
          },
          {
            id: 'psy-s6',
            title: 'Academic Literature Review & APA Referencing',
            category: 'Soft Skills',
            description: 'Write a 1,500-word literature review analyzing adolescent screen addiction research papers.',
            difficulty: 'Intermediate',
            estimatedHours: '30 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'psy-c3',
            title: 'Johns Hopkins Psychological First Aid Certificate',
            issuingOrganization: 'Johns Hopkins University (Coursera)',
            badgeType: 'Industry Certificate',
            targetTimeline: 'Grade 11 Spring',
            applicationValue: 'Demonstrates formal crisis intervention skills and ethical awareness.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'psy-e3',
            examName: 'CUET-UG Psychology + NEET Biology Practice',
            quarter: 'Winter (Q2)',
            actionStage: 'Intensive Mocks',
            details: 'Practice 100+ multiple-choice questions weekly covering developmental psychology and human physiology.',
            recommendedWeeklyHours: '12 hrs/wk'
          }
        ]
      },
      'Grade 12': {
        grade: 'Grade 12',
        phaseName: 'University Entrances & Clinical Admissions',
        focusQuote: 'Excel in CUET-UG / NEET and secure your seat in premier clinical psychology programs.',
        readinessPercentage: 100,
        skillsToLearn: [
          {
            id: 'psy-s7',
            title: 'Research Methodology Exam Mastery',
            category: 'Analytical',
            description: 'Master quantitative sampling, ethical research protocols, and statistical testing for entrance tests.',
            difficulty: 'Advanced',
            estimatedHours: '45 hours'
          },
          {
            id: 'psy-s8',
            title: 'University Interview & Ethical Case Defense',
            category: 'Soft Skills',
            description: 'Demonstrate emotional resilience, confidentiality ethics, and passion during university interviews.',
            difficulty: 'Advanced',
            estimatedHours: '25 hours'
          }
        ],
        recommendedCertifications: [
          {
            id: 'psy-c4',
            title: 'Published High School Research Paper',
            issuingOrganization: 'Journal of High School Science / Curieux',
            badgeType: 'Research Fellowship',
            targetTimeline: 'Grade 12 Fall',
            applicationValue: 'Gold-standard academic differentiator for Oxford, NIMHANS, and Ashoka psychology admissions.'
          }
        ],
        examPrepTimeline: [
          {
            id: 'psy-e4',
            examName: 'CUET-UG Psychology & Domain Tests (May)',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Sit for CUET-UG. Target 100th percentile in Psychology domain for Lady Shri Ram / St. Stephen\'s / DU.',
            recommendedWeeklyHours: '18 hrs/wk'
          },
          {
            id: 'psy-e5',
            examName: 'NEET-UG (If pursuing Psychiatry / MBBS Track)',
            quarter: 'Spring (Q3)',
            actionStage: 'Registration & Testing',
            details: 'Sit for national NEET medical entrance for MBBS $\\rightarrow$ M.D. Psychiatry path.',
            recommendedWeeklyHours: '25 hrs/wk'
          }
        ]
      }
    }
  }
};

// Helper function to resolve or synthesize a complete roadmap for any of the 12 master careers
export function getRoadmapForCareer(careerId: string, category: CareerCategory): CareerRoadmapBlueprint {
  if (CAREER_ROADMAPS[careerId]) {
    return CAREER_ROADMAPS[careerId];
  }

  // Fallback to category baseline
  if (category === 'Engineering & Technology') {
    return { ...CAREER_ROADMAPS['ai-engineer'], careerId };
  } else if (category === 'Creative & Design') {
    return { ...CAREER_ROADMAPS['ui-ux-designer'], careerId };
  } else if (category === 'Business & Management') {
    return { ...CAREER_ROADMAPS['investment-banker'], careerId };
  } else {
    return { ...CAREER_ROADMAPS['clinical-psychologist'], careerId };
  }
}
