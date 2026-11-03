import { Career } from '../types';

export const MASTER_CAREERS: Career[] = [
  // 1. Engineering & Technology (50-60 points)
  {
    id: 'ai-machine-learning-engineer',
    title: 'AI & Machine Learning Engineer',
    category: 'Engineering & Technology',
    scoreRange: '50-60 points',
    summary: 'Designs intelligent algorithms, neural networks, and generative AI systems that solve complex automated challenges.',
    description: 'Artificial Intelligence Engineers architect, train, and deploy mathematical models and deep learning frameworks that process language, computer vision, and autonomous decision-making. Working at the intersection of computer science, advanced linear algebra, and data architecture.',
    skills: ['Python', 'PyTorch / TensorFlow', 'Linear Algebra & Calculus', 'Data Structures & Algorithms', 'Model Fine-tuning', 'System Architecture'],
    personalityTraits: ['Analytical Curiosity', 'Deep Focus', 'Systematic Problem Solver', 'Mathematical Rigor'],
    educationPath: {
      grade11_12_stream: 'Science (Physics, Chemistry, Mathematics / Computer Science)',
      undergraduateDegrees: ['B.Tech / B.S. in Computer Science', 'B.Tech in Artificial Intelligence & Data Science', 'B.S. in Applied Mathematics'],
      postgraduateDegrees: ['M.S. / M.Tech in Machine Learning', 'Ph.D. in Computer Science & Robotics'],
      certificationOptions: ['DeepLearning.AI TensorFlow Developer', 'AWS Certified Machine Learning Specialty']
    },
    jobOutlook: {
      growthRate: '+38% through 2032',
      startingSalary: '$110,000 / ₹16-24 LPA',
      midCareerSalary: '$185,000+ / ₹45-80 LPA',
      demandLevel: 'Exceptional'
    },
    topColleges: [
      { name: 'MIT (Massachusetts Institute of Technology)', location: 'Cambridge, MA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Top 1% Global SAT / ACT' },
      { name: 'IIT Bombay & IIT Delhi', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Advanced Rank < 200' },
      { name: 'Stanford University', location: 'Stanford, CA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'SAT 1550+ / 4.0 GPA' },
      { name: 'National University of Singapore (NUS)', location: 'Singapore', tier: 'Leading Global', avgCutoff: '95%+ in Grade 12' }
    ],
    entranceExams: ['JEE Main & Advanced', 'SAT / ACT', 'BITSAT', 'CUET (Math/CS)'],
    eligibilityCriteria: {
      minGrade12Percentage: '75% aggregate in 10+2 with PCM',
      mandatorySubjects: ['Mathematics', 'Physics', 'Chemistry/Computer Science'],
      otherRequirements: 'Strong aptitude in coding logic and calculus.'
    },
    applicationTimeline: {
      preparationGrade: 'Start competitive exam prep in Grade 10-11',
      examRegistration: 'December - February of Grade 12',
      collegeCounseling: 'May - July post Grade 12 board results'
    },
    howToApplySteps: [
      {
        stepNumber: 1,
        title: 'Choose Grade 11-12 Science Stream (PCM)',
        timeframe: 'Grade 10 End / Grade 11 Start',
        description: 'Enroll in Physics, Chemistry, and Mathematics (PCM). Maintain at least 75% aggregate to satisfy national/international admission prerequisites.',
        actionItems: ['Focus on Calculus, Coordinate Geometry, and Mechanics', 'Optional: Opt for Computer Science or Python as 5th subject']
      },
      {
        stepNumber: 2,
        title: 'Register for National / Global Entrance Exams',
        timeframe: 'November - January of Grade 12',
        description: 'Register for JEE Main (NTA portal) for Indian institutes, or Digital SAT / ACT via College Board for top international institutions like MIT and Stanford.',
        actionItems: ['Submit application form on jeemain.nta.nic.in before deadline', 'Book SAT test date at least 2 months in advance']
      },
      {
        stepNumber: 3,
        title: 'Clear JEE Advanced or Submit University Dossier',
        timeframe: 'April - May of Grade 12',
        description: 'Qualify for JEE Advanced by ranking in top 2.5 lakh of JEE Main candidates. For US/UK universities, submit Common App essays and teacher recommendations.',
        actionItems: ['Solve past 10 years JEE Advanced papers', 'Finalize Personal Statement detailing coding/robotics projects']
      },
      {
        stepNumber: 4,
        title: 'Participate in JoSAA Counseling / University Acceptance',
        timeframe: 'June - July of Grade 12',
        description: 'Fill branch choices on JoSAA (Joint Seat Allocation Authority) portal prioritizing B.Tech in CSE / AI at premier IITs and NITs, or accept international offer letters.',
        actionItems: ['Lock preference choices in JoSAA mock rounds', 'Prepare Class 10+2 mark sheets and migration certificates']
      }
    ],
    featuredImage: '/src/assets/images/career_stem_robotics_1793534281848.jpg'
  },
  {
    id: 'robotics-automation-engineer',
    title: 'Robotics & Autonomous Systems Engineer',
    category: 'Engineering & Technology',
    scoreRange: '50-60 points',
    summary: 'Builds physical robots, robotic prosthetics, drones, and autonomous vehicles combining mechatronics and software.',
    description: 'Robotics Engineers bridge the gap between mechanical hardware, sensor circuits, embedded microcontrollers, and motion planning software. They design everything from surgical robot arms and space exploration rovers to self-driving vehicles and automated logistics fleets.',
    skills: ['Mechatronics & Kinematics', 'Embedded C/C++', 'ROS (Robot Operating System)', 'CAD 3D Modeling', 'Sensors & Actuators', 'Control Systems'],
    personalityTraits: ['Inventive Tinkerer', 'Spatial Reasoning', 'Hands-on Builder', 'Iterative Experimenter'],
    educationPath: {
      grade11_12_stream: 'Science (Physics, Chemistry, Mathematics)',
      undergraduateDegrees: ['B.Tech / B.S. in Mechatronics', 'B.Tech in Mechanical Engineering', 'B.S. in Electrical & Computer Engineering'],
      postgraduateDegrees: ['M.S. in Robotics Engineering', 'M.Tech in Autonomous Systems'],
      certificationOptions: ['Robotics Specialization (Coursera/UPenn)', 'SolidWorks Mechanical Design Associate']
    },
    jobOutlook: {
      growthRate: '+24% through 2032',
      startingSalary: '$95,000 / ₹12-18 LPA',
      midCareerSalary: '$160,000 / ₹35-60 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'Carnegie Mellon University', location: 'Pittsburgh, PA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'SAT 1540+' },
      { name: 'IIT Madras & IIT Kanpur', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Advanced Rank < 800' },
      { name: 'ETH Zurich', location: 'Zurich, Switzerland', tier: 'Leading Global', avgCutoff: 'Top percentile science entrance' },
      { name: 'University of Michigan Ann Arbor', location: 'Ann Arbor, MI, USA', tier: 'Leading Global', avgCutoff: 'GPA 3.9+ / SAT 1500+' }
    ],
    entranceExams: ['JEE Main & Advanced', 'SAT Subject/General', 'VITEEE', 'MET'],
    eligibilityCriteria: {
      minGrade12Percentage: '75% aggregate with Physics and Math compulsory',
      mandatorySubjects: ['Physics', 'Mathematics', 'Chemistry'],
      otherRequirements: 'Participation in national science fairs or robotics clubs is an asset.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 10 foundation, project portfolio in Grade 11',
      examRegistration: 'January of Grade 12',
      collegeCounseling: 'June - August of Grade 12'
    },
    featuredImage: '/src/assets/images/career_stem_robotics_1793534281848.jpg'
  },
  {
    id: 'cybersecurity-defense-architect',
    title: 'Cybersecurity & Cloud Defense Architect',
    category: 'Engineering & Technology',
    scoreRange: '50-60 points',
    summary: 'Protects critical digital infrastructure, banks, government systems, and satellites from sophisticated cyber threats.',
    description: 'Cybersecurity Architects design unhackable enterprise networks, conduct ethical penetration testing, and counter state-sponsored cyber warfare. As the world digitizes, cybersecurity engineers serve as the elite guardians of digital integrity.',
    skills: ['Network Protocol Forensics', 'Cryptography & Zero Trust', 'Linux Kernel Hardening', 'Python / Bash Scripting', 'Cloud Security (AWS/GCP/Azure)', 'Ethical Hacking'],
    personalityTraits: ['Vigilant', 'Adversarial Thinking', 'High Ethical Standard', 'Crisis Resilience'],
    educationPath: {
      grade11_12_stream: 'Science or Commerce with Computer Science / Mathematics',
      undergraduateDegrees: ['B.Tech / B.S. in Cybersecurity', 'B.Tech in Information Technology', 'B.S. in Computer Engineering'],
      postgraduateDegrees: ['M.S. in Information Assurance', 'M.Tech in Network Security'],
      certificationOptions: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'CISSP Associate']
    },
    jobOutlook: {
      growthRate: '+32% through 2032',
      startingSalary: '$98,000 / ₹12-20 LPA',
      midCareerSalary: '$175,000 / ₹40-75 LPA',
      demandLevel: 'Exceptional'
    },
    topColleges: [
      { name: 'Purdue University', location: 'West Lafayette, IN, USA', tier: 'Leading Global', avgCutoff: 'SAT 1450+' },
      { name: 'IIT Hyderabad & IIIT Bangalore', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Advanced Rank < 1200' },
      { name: 'Georgia Institute of Technology', location: 'Atlanta, GA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'SAT 1520+' },
      { name: 'Imperial College London', location: 'London, UK', tier: 'Top Tier / Ivy League', avgCutoff: 'A*A*A in A-Levels' }
    ],
    entranceExams: ['JEE Main & Advanced', 'SAT / ACT', 'UGEE (IIIT-H)', 'KCET / COMEDK'],
    eligibilityCriteria: {
      minGrade12Percentage: '70% in 10+2 with Mathematics',
      mandatorySubjects: ['Mathematics', 'Physics', 'English'],
      otherRequirements: 'Clean background check for high-security defense clearance.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 11 focus on networking fundamentals',
      examRegistration: 'November - January of Grade 12',
      collegeCounseling: 'June - July of Grade 12'
    }
  },
  {
    id: 'aerospace-avionics-engineer',
    title: 'Aerospace & Spacecraft Avionics Engineer',
    category: 'Engineering & Technology',
    scoreRange: '50-60 points',
    summary: 'Designs commercial jetliners, supersonic propulsion systems, lunar landers, and satellite orbits.',
    description: 'Aerospace Engineers conceptualize aerodynamic profiles and launch vehicle architectures that break planetary gravity. They compute thermal dynamics, atmospheric drag, trajectory calculus, and spacecraft telemetry for space agencies and private aerospace companies.',
    skills: ['Orbital Mechanics', 'Computational Fluid Dynamics (CFD)', 'Thermodynamics', 'Aerodynamics', 'MATLAB & Simulink', 'Propulsion Physics'],
    personalityTraits: ['Precision Oriented', 'Big-Picture Thinker', 'Patience with Long Timelines', 'Extreme Accuracy'],
    educationPath: {
      grade11_12_stream: 'Science (Physics, Chemistry, Mathematics with high physics focus)',
      undergraduateDegrees: ['B.Tech / B.S. in Aerospace Engineering', 'B.Tech in Aeronautical Engineering', 'B.S. in Mechanical Engineering'],
      postgraduateDegrees: ['M.S. in Astronautics & Space Sciences', 'Ph.D. in Hypersonic Propulsion'],
      certificationOptions: ['ANSYS Fluent Professional', 'AIAA Student Fellowship']
    },
    jobOutlook: {
      growthRate: '+16% through 2032',
      startingSalary: '$92,000 / ₹10-18 LPA',
      midCareerSalary: '$165,000 / ₹35-65 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'Caltech (California Institute of Technology)', location: 'Pasadena, CA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Top 0.5% Science Olympiad / SAT 1560+' },
      { name: 'IIST (Indian Institute of Space Science and Technology)', location: 'Kerala, India', tier: 'Premier National', avgCutoff: 'Top JEE Advanced ISRO allocation' },
      { name: 'IIT Kharagpur & IIT Bombay', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Advanced Rank < 900' },
      { name: 'TU Delft', location: 'Delft, Netherlands', tier: 'Leading Global', avgCutoff: 'High European Baccalaureate' }
    ],
    entranceExams: ['JEE Advanced (for IIST/IITs)', 'SAT / AP Physics C', 'NEST'],
    eligibilityCriteria: {
      minGrade12Percentage: '75% aggregate with minimum 75% in Physics and Math',
      mandatorySubjects: ['Physics', 'Mathematics', 'Chemistry'],
      otherRequirements: 'Vision acuity requirements for certain flight telemetry training.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 9-10 science foundation, Grade 11 intensive math',
      examRegistration: 'December of Grade 12',
      collegeCounseling: 'June of Grade 12'
    }
  },

  // 2. Creative & Design (40-49 points)
  {
    id: 'ui-ux-product-designer',
    title: 'UI/UX & Digital Product Designer',
    category: 'Creative & Design',
    scoreRange: '40-49 points',
    summary: 'Crafts intuitive, visually breathtaking digital applications, interfaces, and interactive experiences used by millions.',
    description: 'UI/UX Product Designers translate human emotions, behavioral psychology, and business goals into seamless screens and spatial interactions. They conduct user research, build design systems, prototype micro-interactions in Figma, and align typography with visual hierarchy.',
    skills: ['Figma / Design Systems', 'User Research & Wireframing', 'Interaction Design', 'Visual Hierarchy & Typography', 'Usability Testing', 'Basic Front-end Tech'],
    personalityTraits: ['Empathetic Observer', 'Aesthetic Taste', 'Attention to Micro-details', 'Human-Centered Thinker'],
    educationPath: {
      grade11_12_stream: 'Any stream (Arts, Science, or Commerce with an emphasis on visual arts or psychology)',
      undergraduateDegrees: ['B.Des (Bachelor of Design) in Interaction Design', 'B.S. in Human-Computer Interaction (HCI)', 'B.Des in Product Design'],
      postgraduateDegrees: ['M.Des in Interaction Design', 'M.S. in HCI'],
      certificationOptions: ['Google UX Design Certificate', 'Nielsen Norman Group UX Master Certification']
    },
    jobOutlook: {
      growthRate: '+23% through 2032',
      startingSalary: '$85,000 / ₹10-18 LPA',
      midCareerSalary: '$150,000 / ₹30-55 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'Rhode Island School of Design (RISD)', location: 'Providence, RI, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Exceptional Creative Portfolio' },
      { name: 'NID Ahmedabad (National Institute of Design)', location: 'India', tier: 'Premier National', avgCutoff: 'NID DAT Prelims & Mains Top Rank' },
      { name: 'IDC School of Design, IIT Bombay', location: 'Mumbai, India', tier: 'Premier National', avgCutoff: 'UCEED Rank < 100' },
      { name: 'Royal College of Art (RCA)', location: 'London, UK', tier: 'Leading Global', avgCutoff: 'Top Global Design Portfolio' }
    ],
    entranceExams: ['UCEED', 'NID DAT (Prelims & Mains)', 'SEED', 'Portfolio Review'],
    eligibilityCriteria: {
      minGrade12Percentage: 'Pass in 10+2 from any recognized board (min 55%)',
      mandatorySubjects: ['English', 'Any 4 academic or creative subjects'],
      otherRequirements: 'Curated digital or sketchbook creative portfolio is mandatory.'
    },
    applicationTimeline: {
      preparationGrade: 'Build design sketchbook in Grade 10-11',
      examRegistration: 'October - December of Grade 12 (UCEED/NID)',
      collegeCounseling: 'April - June of Grade 12'
    },
    featuredImage: '/src/assets/images/career_design_studio_1793534282311.jpg'
  },
  {
    id: 'sustainable-architect',
    title: 'Architect & Sustainable Urban Designer',
    category: 'Creative & Design',
    scoreRange: '40-49 points',
    summary: 'Designs eco-friendly skyscrapers, cultural museums, smart city neighborhoods, and regenerative spaces.',
    description: 'Architects balance engineering physics with cultural artistry. Sustainable Urban Designers specify passive solar orientation, mass-timber construction, zero-emission insulation, and pedestrian-first city spaces that combat climate change.',
    skills: ['Spatial Planning', 'Revit / Rhino 3D / AutoCAD', 'Bioclimatic Analysis', 'Structural Principles', 'Aesthetic Composition', 'Project Coordination'],
    personalityTraits: ['Visionary Creator', 'Environmentally Conscious', 'Structural Imagination', 'Detail-Driven'],
    educationPath: {
      grade11_12_stream: 'Science with Mathematics (Mandatory for Council of Architecture / B.Arch)',
      undergraduateDegrees: ['B.Arch (5-year Bachelor of Architecture)', 'B.S. in Architectural Studies'],
      postgraduateDegrees: ['M.Arch in Sustainable Urbanism', 'Master of Landscape Architecture'],
      certificationOptions: ['LEED Green Associate', 'BREEAM Accredited Professional']
    },
    jobOutlook: {
      growthRate: '+14% through 2032',
      startingSalary: '$75,000 / ₹8-14 LPA',
      midCareerSalary: '$135,000 / ₹25-45 LPA',
      demandLevel: 'High'
    },
    topColleges: [
      { name: 'CEPT University', location: 'Ahmedabad, India', tier: 'Premier National', avgCutoff: 'NATA Score 140+ / 90%+ in 10+2' },
      { name: 'IIT Roorkee & IIT Kharagpur (Dept of Architecture)', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Main Paper 2 / AAT' },
      { name: 'The Cooper Union', location: 'New York, NY, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Rigorous Home Test & Portfolio' },
      { name: 'Architectural Association (AA)', location: 'London, UK', tier: 'Leading Global', avgCutoff: 'Outstanding Architectural Portfolio' }
    ],
    entranceExams: ['NATA (National Aptitude Test in Architecture)', 'JEE Main Paper 2 (B.Arch/B.Plan)', 'AAT (Architecture Aptitude Test)'],
    eligibilityCriteria: {
      minGrade12Percentage: '50% marks in Physics, Chemistry and Mathematics and 50% in aggregate',
      mandatorySubjects: ['Physics', 'Chemistry', 'Mathematics'],
      otherRequirements: 'Clearance of NATA or JEE Paper 2 is statutory.'
    },
    applicationTimeline: {
      preparationGrade: 'Perspective drawing & 3D sketching in Grade 11',
      examRegistration: 'March - May of Grade 12',
      collegeCounseling: 'June - August of Grade 12'
    },
    featuredImage: '/src/assets/images/career_design_studio_1793534282311.jpg'
  },
  {
    id: 'game-designer-3d-artist',
    title: 'Game Director & 3D Environment Artist',
    category: 'Creative & Design',
    scoreRange: '40-49 points',
    summary: 'Creates immersive virtual game worlds, game mechanics, cinematic storylines, and interactive characters.',
    description: 'Game Designers engineer the emotional journey and core gameplay loops of AAA video games and indie hits. They balance game economics, level puzzles, camera cinematography, Unreal Engine lighting, and atmospheric soundscapes.',
    skills: ['Unreal Engine 5 / Unity', '3D Sculpting (Blender/ZBrush)', 'Level Design & Pacing', 'Narrative Scripting', 'Game Economy Balance', 'PBR Shaders'],
    personalityTraits: ['Imaginative World-builder', 'Gamer Mindset', 'Storyteller', 'Technical Artist'],
    educationPath: {
      grade11_12_stream: 'Any stream with Computer Science, Fine Arts, or Math preference',
      undergraduateDegrees: ['B.Des in Game Design', 'B.S. in Computer Science & Game Development', 'B.F.A. in Interactive Media'],
      postgraduateDegrees: ['M.F.A. in Game Design (NYU Game Center / USC Interactive Media)'],
      certificationOptions: ['Epic Games Certified Unreal Engine Creator', 'Unity Certified Programmer']
    },
    jobOutlook: {
      growthRate: '+21% through 2032',
      startingSalary: '$80,000 / ₹9-16 LPA',
      midCareerSalary: '$145,000 / ₹30-55 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'USC School of Cinematic Arts', location: 'Los Angeles, CA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Top Game Portfolio' },
      { name: 'Rubika Animation & Game Design', location: 'Valenciennes / Pune', tier: 'Leading Global', avgCutoff: 'Entrance Exam & Art Review' },
      { name: 'DigiPen Institute of Technology', location: 'Redmond, WA, USA', tier: 'Leading Global', avgCutoff: 'Math & Coding Assessment' },
      { name: 'National Institute of Design (NID)', location: 'India', tier: 'Premier National', avgCutoff: 'NID DAT Exam' }
    ],
    entranceExams: ['UCEED', 'NID DAT', 'University Specific Creative Aptitude Tests'],
    eligibilityCriteria: {
      minGrade12Percentage: '55% aggregate from any recognized board',
      mandatorySubjects: ['English'],
      otherRequirements: 'Playable game prototype or digital art portfolio.'
    },
    applicationTimeline: {
      preparationGrade: 'Participate in Game Jams during Grade 10-11',
      examRegistration: 'November of Grade 12',
      collegeCounseling: 'May of Grade 12'
    }
  },

  // 3. Business & Management (30-39 points)
  {
    id: 'investment-banker-quantitative-analyst',
    title: 'Investment Banker & Financial Strategist',
    category: 'Business & Management',
    scoreRange: '30-39 points',
    summary: 'Advises Fortune 500 corporations on multi-billion dollar mergers, acquisitions, venture capital, and capital markets.',
    description: 'Financial Strategists and Investment Bankers evaluate financial statements, forecast corporate earnings, build complex valuation models (DCF, LBO), and orchestrate stock market IPOs. They thrive in fast-paced dealmaking environments where data precision meets executive negotiation.',
    skills: ['Financial Modeling & DCF', 'Valuation & Mergers (M&A)', 'Corporate Finance', 'Excel & Financial Python', 'Executive Presentation', 'Market Research'],
    personalityTraits: ['High Ambition', 'Strategic Vision', 'Negotiator', 'Thrives Under Pressure'],
    educationPath: {
      grade11_12_stream: 'Commerce with Mathematics OR Science with Mathematics',
      undergraduateDegrees: ['B.Com (Hons)', 'B.B.A. / B.M.S.', 'B.S. in Finance / Economics', 'Integrated IPM (BBA+MBA)'],
      postgraduateDegrees: ['M.B.A. (Finance / Strategy)', 'Master of Finance'],
      certificationOptions: ['CFA (Chartered Financial Analyst) Level 1', 'Financial Modeling & Valuation Analyst (FMVA)']
    },
    jobOutlook: {
      growthRate: '+18% through 2032',
      startingSalary: '$115,000 / ₹18-28 LPA',
      midCareerSalary: '$220,000+ / ₹50-120 LPA',
      demandLevel: 'Exceptional'
    },
    topColleges: [
      { name: 'IIM Indore / IIM Rohtak (IPM Program)', location: 'India', tier: 'Premier National', avgCutoff: 'IPMAT Percentile > 98%' },
      { name: 'Wharton School, Univ of Pennsylvania', location: 'Philadelphia, PA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'SAT 1550+ / High Leadership Record' },
      { name: 'SRCC (Shri Ram College of Commerce), Delhi Univ', location: 'New Delhi, India', tier: 'Premier National', avgCutoff: 'CUET Commerce 99.5+ Percentile' },
      { name: 'London School of Economics (LSE)', location: 'London, UK', tier: 'Top Tier / Ivy League', avgCutoff: 'A*AA in A-Levels with Mathematics' }
    ],
    entranceExams: ['IPMAT (IIM Indore/Rohtak)', 'CUET UG (for Delhi University)', 'SAT / ACT', 'NPAT (NMIMS)'],
    eligibilityCriteria: {
      minGrade12Percentage: '60% to 75% in 10+2 with Mathematics or Business Math compulsory',
      mandatorySubjects: ['Mathematics/Accountancy', 'English'],
      otherRequirements: 'Strong quantitative aptitude and leadership profile.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 11 focus on math speed & commercial awareness',
      examRegistration: 'February - April of Grade 12',
      collegeCounseling: 'June - August of Grade 12'
    },
    featuredImage: '/src/assets/images/career_business_strategy_1793534282986.jpg'
  },
  {
    id: 'management-consultant',
    title: 'Strategy & Management Consultant',
    category: 'Business & Management',
    scoreRange: '30-39 points',
    summary: 'Solves mission-critical challenges for CEOs, restructuring organizations, and launching global market expansions.',
    description: 'Management Consultants are hired by top global enterprises (like McKinsey, BCG, and Bain) to deconstruct ambiguous business dilemmas. They formulate turnaround roadmaps, conduct operational audits, and present actionable strategic frameworks directly to executive boards.',
    skills: ['Case Interview Frameworks', 'Structured Problem Solving', 'Data Synthesis & Hypothesis Testing', 'Public Speaking', 'Change Management', 'Market Sizing'],
    personalityTraits: ['Structured Communicator', 'Quick Synthesizer', 'Poised & Professional', 'Results-Oriented'],
    educationPath: {
      grade11_12_stream: 'Any stream with high academic standing; Commerce or Science preferred',
      undergraduateDegrees: ['B.A. in Economics', 'B.Tech from top engineering colleges', 'B.B.A. / B.Com from top universities'],
      postgraduateDegrees: ['M.B.A. from tier-1 business school', 'Master in Management (MiM)'],
      certificationOptions: ['Project Management Professional (PMP)', 'Lean Six Sigma Green Belt']
    },
    jobOutlook: {
      growthRate: '+19% through 2032',
      startingSalary: '$105,000 / ₹16-24 LPA',
      midCareerSalary: '$190,000 / ₹45-90 LPA',
      demandLevel: 'Exceptional'
    },
    topColleges: [
      { name: 'St. Stephen’s College & SRCC, Delhi', location: 'India', tier: 'Premier National', avgCutoff: 'Top 0.5% CUET Score' },
      { name: 'Harvard University', location: 'Cambridge, MA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Holistic Ivy League profile' },
      { name: 'Oxford University (Said Business School)', location: 'Oxford, UK', tier: 'Top Tier / Ivy League', avgCutoff: 'Top Tier A-Levels / IB 42+' },
      { name: 'IITs / BITS Pilani (Engineering + Consulting Track)', location: 'India', tier: 'Premier National', avgCutoff: 'Top Engineering Entrance' }
    ],
    entranceExams: ['CUET UG', 'IPMAT', 'SAT / ACT', 'UGAT'],
    eligibilityCriteria: {
      minGrade12Percentage: '85%+ recommended for top tier economics/commerce colleges',
      mandatorySubjects: ['English', 'Mathematics recommended'],
      otherRequirements: 'Debating, Model UN, or student council experience strongly preferred.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 10-11 leadership & speech contests',
      examRegistration: 'March of Grade 12',
      collegeCounseling: 'June of Grade 12'
    },
    featuredImage: '/src/assets/images/career_business_strategy_1793534282986.jpg'
  },
  {
    id: 'tech-product-manager',
    title: 'Technology Product Manager (PM)',
    category: 'Business & Management',
    scoreRange: '30-39 points',
    summary: 'The mini-CEO of software products, orchestrating engineers, designers, and business teams to launch impactful apps.',
    description: 'Product Managers identify user pain points, define product roadmaps, prioritize engineering sprints, and guide features from concept to launch. They sit at the exact intersection of business ROI, user experience, and technical feasibility.',
    skills: ['Product Roadmap Strategy', 'User Analytics (SQL, Mixpanel)', 'Agile / Scrum Methodologies', 'Feature Prioritization (RICE/MoSCoW)', 'A/B Testing', 'Cross-functional Leadership'],
    personalityTraits: ['Pragmatic Leader', 'Diplomatic Bridge-builder', 'Customer Obsessed', 'Metrics-Driven'],
    educationPath: {
      grade11_12_stream: 'Science or Commerce with Computer Science or Mathematics',
      undergraduateDegrees: ['B.Tech in Computer Science', 'B.S. in Business & Computer Science Dual Degree', 'B.B.A. with Tech focus'],
      postgraduateDegrees: ['M.B.A. in Product Management / Tech Strategy'],
      certificationOptions: ['Pragmatic Institute Certified Product Manager', 'Scrum Product Owner (CSPO)']
    },
    jobOutlook: {
      growthRate: '+26% through 2032',
      startingSalary: '$102,000 / ₹14-22 LPA',
      midCareerSalary: '$180,000 / ₹40-75 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'UC Berkeley (Haas / EECS)', location: 'Berkeley, CA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'GPA 3.9+ / SAT 1530+' },
      { name: 'IIT Delhi & IIIT Hyderabad', location: 'India', tier: 'Premier National', avgCutoff: 'JEE Advanced Rank < 800' },
      { name: 'University of Waterloo', location: 'Waterloo, Canada', tier: 'Leading Global', avgCutoff: 'High 90s in Grade 12 Math' },
      { name: 'Ashoka University (CS & Entrepreneurship)', location: 'Sonipat, India', tier: 'Leading Global', avgCutoff: 'AAT & Holistic Interview' }
    ],
    entranceExams: ['JEE Main', 'SAT', 'BITSAT', 'CUET'],
    eligibilityCriteria: {
      minGrade12Percentage: '70% aggregate in 10+2 with Mathematics',
      mandatorySubjects: ['Mathematics', 'English'],
      otherRequirements: 'Curiosity about apps and business models.'
    },
    applicationTimeline: {
      preparationGrade: 'Build side projects in Grade 11',
      examRegistration: 'December of Grade 12',
      collegeCounseling: 'June of Grade 12'
    }
  },

  // 4. Social & Psychology (15-29 points)
  {
    id: 'clinical-psychologist-neuropsychologist',
    title: 'Clinical Psychologist & Mental Health Counselor',
    category: 'Social & Psychology',
    scoreRange: '15-29 points',
    summary: 'Evaluates psychological health, guides individuals through life traumas, and develops therapeutic interventions.',
    description: 'Clinical Psychologists combine scientific research into cognitive brain patterns with compassionate psychotherapy. They help adolescents, adults, and families overcome depression, anxiety, neurodiversity hurdles, and behavioral challenges through Cognitive Behavioral Therapy (CBT).',
    skills: ['Psychotherapeutic Interventions (CBT, DBT)', 'Psychometric Assessment Tools', 'Empathetic Active Listening', 'Neurocognitive Diagnosis', 'Ethical Confidentiality', 'Crisis Counseling'],
    personalityTraits: ['Deep Empathy', 'Emotionally Grounded', 'Patient Listener', 'Non-Judgmental'],
    educationPath: {
      grade11_12_stream: 'Humanities / Arts OR Science (Psychology, Biology, or Sociology elective is ideal)',
      undergraduateDegrees: ['B.A. / B.Sc. in Psychology', 'B.A. (Hons) in Applied Psychology'],
      postgraduateDegrees: ['M.A. / M.Sc. in Clinical Psychology', 'M.Phil / Psy.D / Ph.D. in Clinical Psychology (Mandatory for clinical licensing)'],
      certificationOptions: ['RCI (Rehabilitation Council of India) License', 'APA (American Psychological Association) Credential']
    },
    jobOutlook: {
      growthRate: '+22% through 2032',
      startingSalary: '$72,000 / ₹6-12 LPA',
      midCareerSalary: '$125,000 / ₹20-40 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'TISS (Tata Institute of Social Sciences)', location: 'Mumbai, India', tier: 'Premier National', avgCutoff: 'CUET PG / TISSNET High Merit' },
      { name: 'Lady Shri Ram College (LSR), Delhi Univ', location: 'New Delhi, India', tier: 'Premier National', avgCutoff: 'CUET Psychology 99.8 Percentile' },
      { name: 'NIMHANS (National Institute of Mental Health)', location: 'Bengaluru, India', tier: 'Premier National', avgCutoff: 'All-India Entrance Exam' },
      { name: 'UCLA (Univ of California, Los Angeles)', location: 'Los Angeles, CA, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'GPA 3.9+ / High Research Acumen' }
    ],
    entranceExams: ['CUET UG (for Delhi University, BHU, Jamia)', 'Christ University Entrance (CUET)', 'SAT (for US Psychology programs)'],
    eligibilityCriteria: {
      minGrade12Percentage: '55% to 60% aggregate from any stream',
      mandatorySubjects: ['English', 'Psychology or Biology preferred but not mandatory'],
      otherRequirements: 'Emotional maturity and genuine interest in human well-being.'
    },
    applicationTimeline: {
      preparationGrade: 'Volunteer in school wellness clubs in Grade 10-11',
      examRegistration: 'February - March of Grade 12',
      collegeCounseling: 'June - July of Grade 12'
    },
    featuredImage: '/src/assets/images/career_social_counseling_1793534282914.jpg'
  },
  {
    id: 'international-diplomat-policy-analyst',
    title: 'Diplomat, Civil Servant & Foreign Policy Analyst',
    category: 'Social & Psychology',
    scoreRange: '15-29 points',
    summary: 'Represents nations on the world stage, drafts public policy, and resolves global humanitarian and climate treaties.',
    description: 'Diplomats and Public Policy Analysts negotiate bilateral trade pacts, represent sovereign interests at the United Nations, and structure state welfare legislation. They analyze geopolitical tensions, human rights treaties, and economic development strategies.',
    skills: ['Geopolitical & Foreign Affairs Analysis', 'Treaty & Policy Drafting', 'Cross-Cultural Negotiation', 'Rhetorical Debate & Oratory', 'Constitutional Law Understanding', 'Multilingual Fluency'],
    personalityTraits: ['Diplomatic Tact', 'Global Perspective', 'Calm under Geopolitical Stress', 'Devotion to Public Good'],
    educationPath: {
      grade11_12_stream: 'Humanities / Arts (Political Science, History, Economics) OR any stream',
      undergraduateDegrees: ['B.A. (Hons) in Political Science / International Relations', 'B.A. LL.B (5-year Integrated Law)', 'B.A. in Public Policy'],
      postgraduateDegrees: ['Master in Public Policy (MPP)', 'M.A. in International Studies', 'Civil Services Examination (UPSC IFS/IAS)'],
      certificationOptions: ['United Nations Institute for Training & Research (UNITAR) Diplomatic Practice']
    },
    jobOutlook: {
      growthRate: '+12% through 2032',
      startingSalary: '$78,000 / ₹10-18 LPA + Government Diplomatic Benefits',
      midCareerSalary: '$140,000 / Ambassador / Joint Secretary Scale',
      demandLevel: 'High'
    },
    topColleges: [
      { name: 'Sciences Po Paris', location: 'Paris, France', tier: 'Top Tier / Ivy League', avgCutoff: 'Outstanding International Dossier' },
      { name: 'St. Stephen’s & Miranda House, Delhi Univ', location: 'New Delhi, India', tier: 'Premier National', avgCutoff: 'CUET 99.5+ Percentile' },
      { name: 'NLSIU Bengaluru (National Law School of India)', location: 'Bengaluru, India', tier: 'Premier National', avgCutoff: 'CLAT AIR < 80' },
      { name: 'Georgetown University (Walsh School of Foreign Service)', location: 'Washington, DC, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Top Global SAT / Leadership' }
    ],
    entranceExams: ['CLAT (for National Law Universities)', 'CUET UG (for Central Universities)', 'SAT', 'UPSC CSE (post-graduation)'],
    eligibilityCriteria: {
      minGrade12Percentage: '50% in 10+2 for general criteria; 85%+ for top colleges',
      mandatorySubjects: ['English', 'Any 4 academic subjects'],
      otherRequirements: 'Active participation in Model United Nations and debate societies.'
    },
    applicationTimeline: {
      preparationGrade: 'Debating and general awareness in Grade 9-11',
      examRegistration: 'July - November of Grade 12 (CLAT is in December)',
      collegeCounseling: 'May - July of Grade 12'
    },
    featuredImage: '/src/assets/images/career_social_counseling_1793534282914.jpg'
  },
  {
    id: 'healthcare-epidemiologist-public-health',
    title: 'Epidemiologist & Global Public Health Specialist',
    category: 'Social & Psychology',
    scoreRange: '15-29 points',
    summary: 'Tracks disease outbreaks, shapes healthcare access policies, and saves thousands of lives through preventative health.',
    description: 'Epidemiologists and Public Health Leaders analyze biometric infection clusters, investigate pandemic origins, and coordinate vaccination campaigns with the World Health Organization. They synthesize medical biology with sociological data to ensure underserved populations receive vital healthcare.',
    skills: ['Biostatistics & Epidemiological Modeling', 'Infectious Disease Surveillance', 'Healthcare Policy Formulation', 'Community Health Education', 'Bioethics', 'R / SPSS Statistical Analysis'],
    personalityTraits: ['Humanitarian Drive', 'Scientific Compassion', 'Community Connector', 'Methodical Investigator'],
    educationPath: {
      grade11_12_stream: 'Science with Biology (Physics, Chemistry, Biology - PCB)',
      undergraduateDegrees: ['MBBS / B.S. in Public Health', 'B.Sc. in Biotechnology / Life Sciences', 'B.Pharm'],
      postgraduateDegrees: ['Master of Public Health (MPH)', 'M.D. in Community Medicine'],
      certificationOptions: ['WHO Global Health Leadership Certificate', 'Certified in Public Health (CPH)']
    },
    jobOutlook: {
      growthRate: '+27% through 2032',
      startingSalary: '$82,000 / ₹9-15 LPA',
      midCareerSalary: '$145,000 / ₹28-50 LPA',
      demandLevel: 'Very High'
    },
    topColleges: [
      { name: 'Johns Hopkins Bloomberg School of Public Health', location: 'Baltimore, MD, USA', tier: 'Top Tier / Ivy League', avgCutoff: 'Top Global Medical / Health Merit' },
      { name: 'AIIMS (All India Institute of Medical Sciences)', location: 'New Delhi, India', tier: 'Premier National', avgCutoff: 'NEET AIR < 50' },
      { name: 'London School of Hygiene & Tropical Medicine', location: 'London, UK', tier: 'Top Tier / Ivy League', avgCutoff: 'High Honors in Life Sciences' },
      { name: 'CMC Vellore', location: 'Vellore, India', tier: 'Premier National', avgCutoff: 'NEET High Rank & Institutional Interview' }
    ],
    entranceExams: ['NEET UG (for medical degree route)', 'CUET UG (for B.Sc Life Sciences / Public Health)', 'SAT / Bio Olympiad'],
    eligibilityCriteria: {
      minGrade12Percentage: '50% in PCB aggregate (60%+ for premier government colleges)',
      mandatorySubjects: ['Physics', 'Chemistry', 'Biology', 'English'],
      otherRequirements: 'Commitment to community service or red cross volunteering.'
    },
    applicationTimeline: {
      preparationGrade: 'Grade 10-11 thorough NCERT Biology and chemistry',
      examRegistration: 'February - March of Grade 12 (NEET)',
      collegeCounseling: 'June - August of Grade 12'
    }
  }
];

export function buildHowToApplySteps(career: Career) {
  if (career.howToApplySteps && career.howToApplySteps.length > 0) {
    return career.howToApplySteps;
  }
  const examName = career.entranceExams[0] || 'Target Entrance Exam';
  const collegeName = career.topColleges[0]?.name || 'Premier Universities';

  if (career.category === 'Engineering & Technology') {
    return [
      {
        stepNumber: 1,
        title: 'Choose Grade 11-12 Science Stream (PCM)',
        timeframe: 'Grade 10 End / Grade 11 Start',
        description: `Enroll in Physics, Chemistry, and Mathematics (PCM). Maintain at least ${career.eligibilityCriteria.minGrade12Percentage} to satisfy national/international admission prerequisites.`,
        actionItems: ['Focus on Calculus, Coordinate Geometry, and Mechanics', 'Optional: Opt for Computer Science or Python as 5th subject']
      },
      {
        stepNumber: 2,
        title: `Register for ${examName} & Global Tests`,
        timeframe: 'November - January of Grade 12',
        description: `Submit online registration for ${examName} or Digital SAT / ACT on respective testing agency portals before deadline windows close.`,
        actionItems: [`Complete registration on official testing agency portal`, 'Upload passport-size photograph, Class 10 marksheet, and signature']
      },
      {
        stepNumber: 3,
        title: 'Rigorous Exam Prep & Mock Tests',
        timeframe: 'January - May of Grade 12',
        description: `Solve timed mock tests for ${examName}. For foreign admissions, draft Common App personal essays and request academic recommendation letters.`,
        actionItems: ['Take at least 15 timed sectional mock papers', 'Finalize statement of purpose detailing technical curiosity']
      },
      {
        stepNumber: 4,
        title: 'Participate in Centralized Counseling & Seat Allotment',
        timeframe: 'June - July of Grade 12',
        description: `Lock branch preferences for ${career.title} at ${collegeName} during centralized admission counseling rounds.`,
        actionItems: ['Verify all seat allocation criteria and fee payment schedules', 'Complete physical or online document verification']
      }
    ];
  } else if (career.category === 'Creative & Design') {
    return [
      {
        stepNumber: 1,
        title: 'Build Daily Sketchbook & Visual Portfolio',
        timeframe: 'Grade 10 & Grade 11',
        description: `Maintain a continuous design sketchbook. Practice 2D/3D perspective drawing, observation sketches, typography, and material experiments.`,
        actionItems: ['Create 15-20 original works (sketches, digital renders, models)', 'Understand basic human factors and ergonomics']
      },
      {
        stepNumber: 2,
        title: `Register for ${examName} (UCEED / NID DAT / NATA)`,
        timeframe: 'October - November of Grade 12',
        description: `Register on the official admission portal for ${examName}. Check drawing exam equipment guidelines and admit card release dates.`,
        actionItems: ['Submit application forms before the late fee penalty window', 'Select test cities and prepare physical sketching materials']
      },
      {
        stepNumber: 3,
        title: 'Clear Prelims & Attend Studio / Portfolio Rounds',
        timeframe: 'January (Prelims) & April (Mains/Studio)',
        description: `Qualify Paper A (visual aptitude) and Paper B (drawing). Attend physical Studio Tests at premier campuses for 3D modeling and personal interviews.`,
        actionItems: ['Practice 3D wire and clay mock modeling challenges', 'Compile a high-resolution digital portfolio PDF']
      },
      {
        stepNumber: 4,
        title: `Seat Allotment & Studio Enrollment at ${collegeName}`,
        timeframe: 'May - July of Grade 12',
        description: `Select preferred specialization based on national rank and submit enrollment deposit.`,
        actionItems: ['Accept seat offer and lock campus preference', 'Submit 10+2 passing certificate and identity proofs']
      }
    ];
  } else if (career.category === 'Business & Management') {
    return [
      {
        stepNumber: 1,
        title: 'Choose Grade 11-12 Commerce or Science with Math',
        timeframe: 'Grade 10 End / Grade 11',
        description: `Opt for Mathematics / Applied Mathematics alongside Commerce or Science. Strong arithmetic and quantitative aptitude are mandatory for IPMAT and top finance degrees.`,
        actionItems: ['Master quantitative speed math and commercial arithmetic', 'Engage in business case study reading and student council work']
      },
      {
        stepNumber: 2,
        title: `Register for ${examName} (IPMAT / CUET / NPAT)`,
        timeframe: 'February - April of Grade 12',
        description: `Apply for 5-year integrated management programs (IPM) at IIM Indore/Rohtak or top commerce universities through CUET UG.`,
        actionItems: ['Monitor university admission portals for registration windows', 'Complete registration and pay exam application fee']
      },
      {
        stepNumber: 3,
        title: 'Written Aptitude Test & Personal Interview (WAT-PI)',
        timeframe: 'May - June of Grade 12',
        description: `Take the computer-based quantitative & verbal exam. Shortlisted candidates participate in Written Ability Tests (WAT) and online personal interviews.`,
        actionItems: ['Prepare current affairs, macroeconomic updates, and personal motivation pitch', 'Undergo mock video interviews with mentors']
      },
      {
        stepNumber: 4,
        title: `Merit List Declaration & Enrolment at ${collegeName}`,
        timeframe: 'July of Grade 12',
        description: `Review composite score merit lists (Aptitude test score + Interview score + Grade 10/12 marks) and secure program admission.`,
        actionItems: ['Confirm seat acceptance by paying term admission fee', 'Submit verified Class 12 board marksheet']
      }
    ];
  } else {
    return [
      {
        stepNumber: 1,
        title: 'Electives Selection & Social Impact Volunteering',
        timeframe: 'Grade 10 & Grade 11',
        description: `Choose Humanities, Arts, or Science (PCB for health). Build a sustained record of volunteer work in community health, legal aid clubs, or Model UN.`,
        actionItems: ['Engage in peer mentoring, red cross, or NGO initiatives', 'Cultivate strong reading comprehension and essay writing skills']
      },
      {
        stepNumber: 2,
        title: `Register for ${examName} (CUET / CLAT / NEET)`,
        timeframe: 'Registration opens months ahead',
        description: `Register on the official test consortium website. Check eligibility criteria (${career.eligibilityCriteria.minGrade12Percentage}) and submit exam preferences.`,
        actionItems: ['Submit application on official consortium website', 'Review category reservations and seat quota documents']
      },
      {
        stepNumber: 3,
        title: 'Appear for Competitive National Examination',
        timeframe: 'December (CLAT) / May (NEET/CUET)',
        description: `Take the competitive examination evaluating critical reasoning, legal/medical knowledge, reading comprehension, and general awareness.`,
        actionItems: ['Solve previous year official question papers under exam conditions', 'Focus on negative marking prevention strategies']
      },
      {
        stepNumber: 4,
        title: `Centralized Seat Allotment & Counseling at ${collegeName}`,
        timeframe: 'June - August of Grade 12',
        description: `Participate in centralized counseling rounds. Lock university campus choices based on your All-India Rank (AIR).`,
        actionItems: ['Fill counseling choice options in order of academic preference', 'Complete physical verification at allotted institute']
      }
    ];
  }
}

// Populate howToApplySteps for any career that hasn't manually set it
MASTER_CAREERS.forEach(career => {
  if (!career.howToApplySteps || career.howToApplySteps.length === 0) {
    career.howToApplySteps = buildHowToApplySteps(career);
  }
});

