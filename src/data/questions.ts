import { Question } from '../types';

export const CAREER_TEST_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'The Annual Inter-School Science & Arts Exhibition',
    categoryTag: 'Project Initiation',
    traitFocus: 'Cognitive Structuring & Creative Vision',
    scenario: 'Your high school is hosting its flagship regional exhibition next month with hundreds of visiting students and parents. Your class has been allocated an open 20x20 ft pavilion space. Which role naturally excites you most?',
    options: [
      {
        id: 'q1_a',
        text: 'Architecting an interactive automated gadget or sensor-driven simulation to demonstrate real scientific laws.',
        scenarioResponse: 'You gravitate toward technical prototyping, algorithmic causality, and physical experimentation.',
        softSkillDemonstrated: 'Technical Prototyping & Scientific Rigor',
        weights: { analytical: 4, creative: 1, business: 1, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 1 }
      },
      {
        id: 'q1_b',
        text: 'Designing the spatial aesthetics, experiential lighting, large-scale posters, and brand identity of the stall.',
        scenarioResponse: 'You instinctively shape visual storytelling, spatial flow, and emotional design resonance.',
        softSkillDemonstrated: 'Visual Aesthetics & Spatial Storytelling',
        weights: { analytical: 0, creative: 3.2, business: 1, social: 1, cognitive: 3, logical: 1, patience: 3, softSkills: 2 }
      },
      {
        id: 'q1_c',
        text: 'Drafting the project budget, securing sponsor partnerships with local businesses, and directing the timeline.',
        scenarioResponse: 'You naturally think in terms of resource allocation, executive milestones, and commercial leverage.',
        softSkillDemonstrated: 'Negotiation & Milestone Planning',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q1_d',
        text: 'Training the presenter team on public speaking, welcoming visitors warmly, and gathering audience feedback.',
        scenarioResponse: 'You thrive on personal connection, empathetic facilitation, and community engagement.',
        softSkillDemonstrated: 'Public Speaking & Empathetic Facilitation',
        weights: { analytical: 0, creative: 1, business: 1, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 2,
    title: 'The High-Stakes Group Assignment Glitch',
    categoryTag: 'Crisis Management',
    traitFocus: 'Patience under Pressure & Logical Debugging',
    scenario: 'It is 9:00 PM the night before a critical final group submission worth 30% of your grade. Suddenly, the shared file corrupts or fails to render properly. How do you respond?',
    options: [
      {
        id: 'q2_a',
        text: 'Deep-dive into the raw version history, file formats, or code scripts to isolate the exact syntax or compression bug.',
        scenarioResponse: 'You stay calm under logic pressure, systematically debugging the root technical cause.',
        softSkillDemonstrated: 'Calmness under Fire & Root Cause Debugging',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q2_b',
        text: 'Redesign the corrupted slides or graphics with a fresh, bold minimalist visual layout that can be assembled quickly.',
        scenarioResponse: 'You use creative agility to produce striking work even under tight visual deadlines.',
        softSkillDemonstrated: 'Creative Agility & Visual Synthesis',
        weights: { analytical: 1, creative: 3.2, business: 0, social: 1, cognitive: 3, logical: 2, patience: 3, softSkills: 2 }
      },
      {
        id: 'q2_c',
        text: 'Reassign tasks immediately across all teammates with a strict 45-minute countdown and establish backup contingencies.',
        scenarioResponse: 'You command emergency workflows, establishing order and operational execution.',
        softSkillDemonstrated: 'Emergency Delegation & Decisive Leadership',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q2_d',
        text: 'Calm the panicked team members down, listen to individual stresses, and ensure everyone feels supported.',
        scenarioResponse: 'You recognize that human morale and psychological safety are paramount during crises.',
        softSkillDemonstrated: 'Emotional Regulation & Morale Preservation',
        weights: { analytical: 0, creative: 1, business: 1, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 3,
    title: 'Choosing a School Club or Elective to Lead',
    categoryTag: 'Personal Motivation',
    traitFocus: 'Cognitive Drive & Natural Talent Orientation',
    scenario: 'Your principal announces that students can spearhead a brand-new extracurricular society for Grades 9-12. Which club would you pour your heart into founding?',
    options: [
      {
        id: 'q3_a',
        text: 'The Robotics, AI & Algorithmic Problem-Solving Guild (building competitive combat bots and coding apps).',
        scenarioResponse: 'You are energized by technological mastery, mathematics, and complex engineering challenges.',
        softSkillDemonstrated: 'Algorithmic Problem-Solving & Deep Focus',
        weights: { analytical: 4, creative: 1, business: 0, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 1 }
      },
      {
        id: 'q3_b',
        text: 'The Design Studio & Visual Arts Collective (filmmaking, animation, digital illustration, and architecture).',
        scenarioResponse: 'You are driven by aesthetic expression, visual world-building, and artistic originality.',
        softSkillDemonstrated: 'Aesthetic Originality & World-Building',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 1, cognitive: 3, logical: 1, patience: 3, softSkills: 2 }
      },
      {
        id: 'q3_c',
        text: 'The Young Entrepreneurs & Investment Society (stock simulations, pitch competitions, and startup incubators).',
        scenarioResponse: 'You possess a builder mindset focused on market disruption, economics, and value creation.',
        softSkillDemonstrated: 'Commercial Foresight & Pitch Persuasion',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q3_d',
        text: 'The Peer Mental Health & Social Justice Forum (listening circles, community outreach, and policy advocacy).',
        scenarioResponse: 'You are dedicated to human empathy, ethical welfare, and uplifting the lives of vulnerable peers.',
        softSkillDemonstrated: 'Ethical Advocacy & Compassionate Mentorship',
        weights: { analytical: 0, creative: 1, business: 1, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 4,
    title: 'Resolving a Fierce Debate in Student Council',
    categoryTag: 'Conflict Resolution',
    traitFocus: 'Soft Skills, Diplomacy & Patience',
    scenario: 'Two vocal factions in your student committee are deadlocked over whether to spend the annual fund on new science lab equipment or a student wellness relaxation lounge. How do you arbitrate?',
    options: [
      {
        id: 'q4_a',
        text: 'Gather objective quantitative metrics: student usage hours, academic return on investment, and empirical cost-per-pupil data.',
        scenarioResponse: 'You let empirical evidence and mathematical rigor guide contentious arguments.',
        softSkillDemonstrated: 'Data-Driven Mediation & Empirical Objectivity',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 2 }
      },
      {
        id: 'q4_b',
        text: 'Propose an inventive hybrid design: modular furniture and flexible lab stations that creatively satisfy both needs.',
        scenarioResponse: 'You break binary dilemmas by imagining novel spatial and conceptual design solutions.',
        softSkillDemonstrated: 'Lateral Problem-Solving & Win-Win Synthesis',
        weights: { analytical: 1, creative: 3.2, business: 1, social: 1, cognitive: 3, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q4_c',
        text: 'Structure a phased capital expenditure plan and negotiate with vendors to secure corporate educational discounts.',
        scenarioResponse: 'You leverage negotiation, deal structures, and financial engineering to eliminate trade-offs.',
        softSkillDemonstrated: 'Vendor Negotiation & Fiscal Structuring',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 3, softSkills: 3 }
      },
      {
        id: 'q4_d',
        text: 'Facilitate a structured active-listening session so each side understands the emotional and wellness concerns of the other.',
        scenarioResponse: 'You prioritize empathetic consensus, interpersonal mediation, and collective harmony.',
        softSkillDemonstrated: 'Empathetic Active Listening & Consensus Building',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 5,
    title: 'Your Ideal Unstructured Saturday Morning',
    categoryTag: 'Intrinsic Interests',
    traitFocus: 'Patience & Flow State Incline',
    scenario: 'You have zero homework, no scheduled classes, and complete freedom from 8:00 AM to 1:00 PM. Which activity makes time completely disappear for you?',
    options: [
      {
        id: 'q5_a',
        text: 'Disassembling an old drone/circuit board, tweaking a personal Python game, or solving complex math Olympiad riddles.',
        scenarioResponse: 'Your curiosity gravitates toward mechanisms, algorithmic loops, and mechanical precision.',
        softSkillDemonstrated: 'Deep Methodical Concentration & Iterative Debugging',
        weights: { analytical: 4, creative: 1, business: 0, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q5_b',
        text: 'Sketching character designs in your journal, editing a cinematic video reel with music, or 3D modeling a dream home.',
        scenarioResponse: 'Your mind seeks visual harmony, sensory immersion, and personal artistic output.',
        softSkillDemonstrated: 'Sensory Observation & Visual Imagination',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 1, cognitive: 3, logical: 1, patience: 4, softSkills: 2 }
      },
      {
        id: 'q5_c',
        text: 'Listening to business strategy podcasts, analyzing tech market trends, or refining an e-commerce drop-shipping idea.',
        scenarioResponse: 'You stay fascinated by how commerce moves, leadership strategies, and market opportunities.',
        softSkillDemonstrated: 'Strategic Forecasting & Opportunity Recognition',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 2 }
      },
      {
        id: 'q5_d',
        text: 'Having a deep one-on-one heart-to-heart with a close friend, reading behavioral psychology books, or volunteering.',
        scenarioResponse: 'You are deeply reflective about human emotion, motivation, relationships, and societal well-being.',
        softSkillDemonstrated: 'Relational Depth & Psychological Perception',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 3, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 6,
    title: 'The Anomalous Chemistry Lab Finding',
    categoryTag: 'Scientific Curiosity',
    traitFocus: 'Logical Inquiry & Empirical Patience',
    scenario: 'During an acid-base titration lab, your test tube unexpectedly turns an anomalous violet hue instead of the textbook clear pink. What is your immediate impulse?',
    options: [
      {
        id: 'q6_a',
        text: 'Formulate hypotheses on contamination ratios, calculate molarity deviations, and run systematic control tests.',
        scenarioResponse: 'You exhibit the classic scientific method: inquisitive, disciplined, and mathematically relentless.',
        softSkillDemonstrated: 'Systematic Hypothesis Testing & Scientific Patience',
        weights: { analytical: 4, creative: 1, business: 0, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q6_b',
        text: 'Marvel at the unexpected color spectrum and photograph the luminescent gradient for an art-meets-science photo series.',
        scenarioResponse: 'You see aesthetic wonder, serendipity, and artistic visual potential in everyday anomalies.',
        softSkillDemonstrated: 'Aesthetic Appreciation & Lateral Perspective',
        weights: { analytical: 1, creative: 3.2, business: 0, social: 0, cognitive: 3, logical: 1, patience: 2, softSkills: 2 }
      },
      {
        id: 'q6_c',
        text: 'Evaluate whether this unexpected reaction has any practical commercial utility or industrial cleaning application.',
        scenarioResponse: 'You instinctively spot real-world utility, product opportunities, and business applications.',
        softSkillDemonstrated: 'Practical Innovation & Utility Assessment',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 0, cognitive: 3, logical: 3, patience: 2, softSkills: 2 }
      },
      {
        id: 'q6_d',
        text: 'Check if your lab partner feels frustrated or self-conscious, and turn the unexpected result into a fun learning moment.',
        scenarioResponse: 'You prioritize people over sterile outcomes, nurturing psychological comfort in high-pressure tasks.',
        softSkillDemonstrated: 'Interpersonal Warmth & Growth Mindset Coaching',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 7,
    title: 'The Disaster Relief Charity Campaign',
    categoryTag: 'Social Impact',
    traitFocus: 'Cognitive Organization & Community Soft Skills',
    scenario: 'A flash flood has impacted neighboring communities. Your high school has 48 hours to mobilize relief supplies. What responsibility do you instinctively take on?',
    options: [
      {
        id: 'q7_a',
        text: 'Setting up a live spreadsheet inventory tracking system with barcode scanning and supply route-optimization algorithms.',
        scenarioResponse: 'You bring order to chaos through data systems, logistics optimization, and technical tools.',
        softSkillDemonstrated: 'Systems Optimization & Logistics Mastery',
        weights: { analytical: 4, creative: 0, business: 1, social: 1, cognitive: 4, logical: 4, patience: 3, softSkills: 2 }
      },
      {
        id: 'q7_b',
        text: 'Directing an emotionally poignant social media video campaign with storytelling and impactful graphic posters to drive donations.',
        scenarioResponse: 'You harness visual empathy and persuasive creative media to move communities into action.',
        softSkillDemonstrated: 'Persuasive Storytelling & Visual Advocacy',
        weights: { analytical: 0, creative: 3.2, business: 1, social: 1, cognitive: 3, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q7_c',
        text: 'Calling local corporate headquarters, grocery chains, and community leaders to negotiate bulk donation matches.',
        scenarioResponse: 'You excel at organizational diplomacy, partnership pitching, and scaling executive outcomes.',
        softSkillDemonstrated: 'Strategic Outreach & Corporate Partnership Pitching',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 4 }
      },
      {
        id: 'q7_d',
        text: 'Staffing the emergency hotline, providing emotional support to distressed families, and organizing on-ground volunteer care.',
        scenarioResponse: 'You show frontline compassion, deep psychological presence, and trauma-informed support.',
        softSkillDemonstrated: 'Frontline Compassion & Crisis Mental Health Support',
        weights: { analytical: 0, creative: 0, business: 1, social: 1.8, cognitive: 2, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 8,
    title: 'Building a New Student Life App',
    categoryTag: 'Product Conception',
    traitFocus: 'Cognitive Architecture & Human Centered UX',
    scenario: 'A hackathon invites high schoolers to build an app that improves teenage mental or academic life. Where does your primary contribution lie?',
    options: [
      {
        id: 'q8_a',
        text: 'Engineering the database schema, recommendation algorithm, and security encryption protocols in the backend.',
        scenarioResponse: 'You are the foundational architect who builds robust, scalable computational logic.',
        softSkillDemonstrated: 'Architectural Rigor & Data Integrity',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 1 }
      },
      {
        id: 'q8_b',
        text: 'Designing a soothing color palette, intuitive gesture navigation, micro-animations, and delight-inducing Figma screens.',
        scenarioResponse: 'You craft human-computer interfaces where beauty, accessibility, and visual rhythm harmonize.',
        softSkillDemonstrated: 'User Empathy & Micro-Interaction Design',
        weights: { analytical: 0, creative: 3.2, business: 1, social: 1, cognitive: 3, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q8_c',
        text: 'Defining the product roadmap, pricing model, viral growth loops, and preparing the 3-minute investor pitch deck.',
        scenarioResponse: 'You think like a startup founder, ensuring products achieve product-market fit and commercial success.',
        softSkillDemonstrated: 'Product Strategy & Venture Presentation',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 0, cognitive: 4, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q8_d',
        text: 'Interviewing dozens of students to understand subconscious anxiety triggers and validating ethical psychological safeguards.',
        scenarioResponse: 'You are the voice of human vulnerability, user psychology, and ethical responsibility.',
        softSkillDemonstrated: 'Qualitative User Research & Ethical Governance',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 3, logical: 2, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 9,
    title: 'Approaching a Complex, Unfamiliar Subject',
    categoryTag: 'Learning Style',
    traitFocus: 'Cognitive Synthesis & Logical Depth',
    scenario: 'You are introduced to a brand new advanced topic (e.g., Quantum Computing or Macroeconomic Game Theory). How do you best absorb it?',
    options: [
      {
        id: 'q9_a',
        text: 'By deriving the core mathematical formulas from first principles and breaking the topic into modular logical blocks.',
        scenarioResponse: 'You learn through foundational logic, rigorous taxonomy, and structured first principles.',
        softSkillDemonstrated: 'First-Principles Reasoning & Intellectual Rigor',
        weights: { analytical: 4, creative: 0, business: 0, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q9_b',
        text: 'By drawing colorful mind maps, visual metaphors, and creating an illustrative diagram that connects disparate ideas.',
        scenarioResponse: 'You absorb concepts via visual synesthesia, metaphorical imagery, and associative patterns.',
        softSkillDemonstrated: 'Associative Synthesis & Visual Metaphor Framing',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 0, cognitive: 3, logical: 1, patience: 3, softSkills: 2 }
      },
      {
        id: 'q9_c',
        text: 'By studying how this concept impacted real corporate battles, geopolitical trade wars, and market disruptions in history.',
        scenarioResponse: 'You thrive when ideas are tethered to tangible historical competition, strategy, and power dynamics.',
        softSkillDemonstrated: 'Contextual Strategy & Historical Pattern Recognition',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 0, cognitive: 4, logical: 3, patience: 2, softSkills: 2 }
      },
      {
        id: 'q9_d',
        text: 'By organizing a study circle where classmates debate the real-world philosophical and human implications of the concept.',
        scenarioResponse: 'You master knowledge through social dialogue, human stories, and dialectical exchange.',
        softSkillDemonstrated: 'Collaborative Inquiry & Dialectical Facilitation',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 3, logical: 2, patience: 3, softSkills: 4 }
      }
    ]
  },
  {
    id: 10,
    title: 'Supporting a Stressed Junior Classmate',
    categoryTag: 'Interpersonal Empathy',
    traitFocus: 'Patience, Emotional Stability & Counseling',
    scenario: 'A Grade 9 junior approaches you in tears outside the library, overwhelmed by upcoming board exams and parental pressure. How do you counsel them?',
    options: [
      {
        id: 'q10_a',
        text: 'Help them design an exact hour-by-hour revision timetable with spaced repetition intervals and past paper metrics.',
        scenarioResponse: 'You provide reassurance through structured systems, clear blueprints, and methodical reduction of disorder.',
        softSkillDemonstrated: 'Structured Problem-Decomposition & Mentorship Planning',
        weights: { analytical: 4, creative: 0, business: 1, social: 1, cognitive: 3, logical: 4, patience: 4, softSkills: 3 }
      },
      {
        id: 'q10_b',
        text: 'Encourage them to take a sketchbook break, breathe, and teach them creative visual memory hacks and story-based mnemonic tricks.',
        scenarioResponse: 'You offer creative release, lateral problem-solving, and sensory reframing of academic tension.',
        softSkillDemonstrated: 'Creative Reframing & Stress De-escalation',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 1.2, cognitive: 3, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q10_c',
        text: 'Remind them of the long-term game: explain that one exam does not define their career and teach them prioritization of high-yield topics.',
        scenarioResponse: 'You provide high-level strategic perspective, helping them see the broader competitive landscape with poise.',
        softSkillDemonstrated: 'Long-Term Strategic Perspective & Reassurance',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 3, softSkills: 3 }
      },
      {
        id: 'q10_d',
        text: 'Sit quietly beside them, listen without interrupting, validate their emotional weight, and offer warm unconditional encouragement.',
        scenarioResponse: 'You embody therapeutic empathy, active listening, and unconditional positive regard.',
        softSkillDemonstrated: 'Unconditional Empathy & Psychological Presence',
        weights: { analytical: 0, creative: 0, business: 0, social: 1.8, cognitive: 3, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 11,
    title: 'The Competitive Board Game Night',
    categoryTag: 'Strategic Thinking',
    traitFocus: 'Logical Calculus & Strategic Foresight',
    scenario: 'Your friends gather for an intensive strategy tabletop tournament (like Settlers of Catan, Risk, or Chess). What is your trademark playing style?',
    options: [
      {
        id: 'q11_a',
        text: 'Computing exact probability odds on every dice roll, card draw, and optimizing turns mathematically 4 steps ahead.',
        scenarioResponse: 'You calculate deep probabilistic branches, out-thinking opponents through combinatorial foresight.',
        softSkillDemonstrated: 'Probabilistic Calculation & Tactical Foresight',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q11_b',
        text: 'Trying wild, unconventional, unpredictable gambits and narrative maneuvers that catch everyone by surprise.',
        scenarioResponse: 'You play with flair and creative audacity, valuing original style and surprise over repetitive meta-builds.',
        softSkillDemonstrated: 'Audacious Innovation & Unconventional Risk-Taking',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 0, cognitive: 3, logical: 2, patience: 2, softSkills: 2 }
      },
      {
        id: 'q11_c',
        text: 'Brokering strategic trade alliances, monopolizing crucial resource chokepoints, and orchestrating kingmaker negotiations.',
        scenarioResponse: 'You are a master of diplomatic bargaining, economic cartels, and realpolitik advantage.',
        softSkillDemonstrated: 'Resource Cartel Management & Diplomatic Leverage',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 4, logical: 3, patience: 3, softSkills: 3 }
      },
      {
        id: 'q11_d',
        text: 'Reading other players micro-expressions, detecting when someone is bluffing, and keeping the table mood joyful and inclusive.',
        scenarioResponse: 'You possess acute emotional intelligence, social intuition, and read people like open books.',
        softSkillDemonstrated: 'Social Micro-Expression Reading & Group Harmonization',
        weights: { analytical: 0, creative: 1, business: 0, social: 1.8, cognitive: 3, logical: 2, patience: 3, softSkills: 4 }
      }
    ]
  },
  {
    id: 12,
    title: 'The School Canteen Quality Audit',
    categoryTag: 'System Analysis',
    traitFocus: 'Cognitive Optimization & Structural Thinking',
    scenario: 'Complaints have flooded in about the school cafeteria: long queues, cold meals, and repetitive menu options. You are asked to review it. What is your diagnostic approach?',
    options: [
      {
        id: 'q12_a',
        text: 'Time the queue bottlenecks at checkout counters with a stopwatch and model a queueing theory simulation in Excel.',
        scenarioResponse: 'You optimize throughput and mechanical efficiency using quantitative time-and-motion studies.',
        softSkillDemonstrated: 'Time-and-Motion Optimization & Bottleneck Elimination',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 1 }
      },
      {
        id: 'q12_b',
        text: 'Revamp the cafeteria environment with natural indoor plants, warm lighting, chalkboard daily specials, and aesthetic meal presentation.',
        scenarioResponse: 'You transform the experiential ambiance and sensory joy of dining.',
        softSkillDemonstrated: 'Biophilic Spatial Design & Sensory Architecture',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 0, cognitive: 3, logical: 1, patience: 3, softSkills: 2 }
      },
      {
        id: 'q12_c',
        text: 'Audit the food procurement vendor contracts, calculate food waste shrinkage, and renegotiate terms with local organic suppliers.',
        scenarioResponse: 'You examine supply chain economics, cost structures, and supplier renegotiation.',
        softSkillDemonstrated: 'Supply Chain Audit & Vendor Commercial Terms',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 0, cognitive: 4, logical: 3, patience: 3, softSkills: 3 }
      },
      {
        id: 'q12_d',
        text: 'Hold informal focus group chats with students from different dietary backgrounds and kitchen staff to understand their daily morale.',
        scenarioResponse: 'You investigate nutritional equity, worker dignity, and culturally inclusive well-being.',
        softSkillDemonstrated: 'Nutritional Equity & Inclusive Dialogue',
        weights: { analytical: 0, creative: 0, business: 1, social: 1.8, cognitive: 3, logical: 2, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 13,
    title: 'The Viral Awareness Campaign',
    categoryTag: 'Communication & Reach',
    traitFocus: 'Soft Skills, Storytelling & Audience Connection',
    scenario: 'You are tasked with spreading awareness across Grade 9-12 about digital screen addiction and sleep hygiene. What is your creative execution?',
    options: [
      {
        id: 'q13_a',
        text: 'Build an interactive web dashboard where students can plug in their screen time stats and see a personalized circadian rhythm analysis.',
        scenarioResponse: 'You leverage interactive data tools to let users discover facts through their own empirical numbers.',
        softSkillDemonstrated: 'Interactive Data Personalization & Visual Analytics',
        weights: { analytical: 4, creative: 1, business: 0, social: 0, cognitive: 4, logical: 4, patience: 3, softSkills: 2 }
      },
      {
        id: 'q13_b',
        text: 'Direct a gripping, visually cinematic short film contrasting the warmth of real-world sunlight with the harsh blue glow of phones.',
        scenarioResponse: 'You evoke profound behavioral shifts through visual cinema, contrast, and artistic storytelling.',
        softSkillDemonstrated: 'Cinematic Visual Direction & Emotional Evocation',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 1, cognitive: 3, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q13_c',
        text: 'Organize a school-wide 7-day "Digital Detox Challenge" sponsored by fitness brands with prizes for top participating homerooms.',
        scenarioResponse: 'You orchestrate viral incentive campaigns, gamified participation mechanics, and corporate sponsorships.',
        softSkillDemonstrated: 'Gamification Mechanics & Community Incentivization',
        weights: { analytical: 0, creative: 1, business: 2.5, social: 1, cognitive: 3, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q13_d',
        text: 'Lead intimate peer sharing workshops where students speak honestly about loneliness, FOMO, and social media pressures without judgment.',
        scenarioResponse: 'You create brave safe spaces for emotional vulnerability and psychological healing.',
        softSkillDemonstrated: 'Psychological Vulnerability Facilitation & Empathy',
        weights: { analytical: 0, creative: 0, business: 0, social: 1.8, cognitive: 3, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 14,
    title: 'The Dream High School Internship',
    categoryTag: 'Future Vision',
    traitFocus: 'Cognitive Purpose & Career Trajectory',
    scenario: 'You have been awarded a prestigious, fully funded 2-week summer shadowing fellowship. Which mentor would you choose to shadow every day?',
    options: [
      {
        id: 'q14_a',
        text: 'A Chief Technology Officer at an Aerospace & AI research lab testing autonomous satellites and computational flight algorithms.',
        scenarioResponse: 'You want to stand at the cutting frontier of applied physics, computing, and machine intelligence.',
        softSkillDemonstrated: 'High-Altitude Systems Thinking & Technological Vision',
        weights: { analytical: 4, creative: 0, business: 1, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q14_b',
        text: 'The Creative Director of an award-winning architectural and industrial design firm sketching iconic urban skyline landmarks.',
        scenarioResponse: 'You want to master form, materiality, spatial wonder, and timeless human-centered design.',
        softSkillDemonstrated: 'Architectural Sensibility & Cultural Aesthetics',
        weights: { analytical: 0, creative: 3.2, business: 0, social: 0, cognitive: 4, logical: 2, patience: 3, softSkills: 2 }
      },
      {
        id: 'q14_c',
        text: 'The Managing Partner of a premier global venture capital fund evaluating pitches and investing in transformative clean energy startups.',
        scenarioResponse: 'You desire to operate at the pinnacle of high finance, corporate strategy, and venture creation.',
        softSkillDemonstrated: 'Venture Capital Evaluation & Macro Strategy',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 0, cognitive: 4, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q14_d',
        text: 'A United Nations Humanitarian Envoy and Chief Clinical Psychologist directing trauma response and health equity programs.',
        scenarioResponse: 'You yearn to dedicate your life to global healing, diplomacy, human rights, and social justice.',
        softSkillDemonstrated: 'Global Humanitarian Leadership & Diplomatic Empathy',
        weights: { analytical: 0, creative: 0, business: 0, social: 1.8, cognitive: 4, logical: 2, patience: 4, softSkills: 4 }
      }
    ]
  },
  {
    id: 15,
    title: 'Solving One Global Challenge Overnight',
    categoryTag: 'Core Purpose',
    traitFocus: 'Ultimate Cognitive Impact & Civilization Contribution',
    scenario: 'If you had unlimited resources, authority, and genius talent to eradicate one major world challenge tomorrow, what would you direct your life toward?',
    options: [
      {
        id: 'q15_a',
        text: 'Developing commercial nuclear fusion energy and next-generation quantum computing to unlock infinite clean power for humanity.',
        scenarioResponse: 'You believe deep technology and physics breakthroughs are the foundational engines of human progress.',
        softSkillDemonstrated: 'Civilizational Engineering & Deep Tech Courage',
        weights: { analytical: 4, creative: 1, business: 0, social: 0, cognitive: 4, logical: 4, patience: 4, softSkills: 1 }
      },
      {
        id: 'q15_b',
        text: 'Re-imagining sustainable biophilic cities, public architecture, and cultural arts so every human lives in beauty and environmental harmony.',
        scenarioResponse: 'You see human well-being as intrinsically tied to art, regenerative architecture, and thoughtful living spaces.',
        softSkillDemonstrated: 'Biophilic Urbanism & Regenerative Design',
        weights: { analytical: 0, creative: 3.2, business: 1, social: 1, cognitive: 4, logical: 2, patience: 3, softSkills: 3 }
      },
      {
        id: 'q15_c',
        text: 'Eliminating global poverty through decentralized micro-finance, ethical markets, and scalable entrepreneurship ecosystems.',
        scenarioResponse: 'You understand that capital access, market liquidity, and trade empowerment elevate entire civilizations.',
        softSkillDemonstrated: 'Decentralized Economics & Enterprise Empowerment',
        weights: { analytical: 1, creative: 0, business: 2.5, social: 1, cognitive: 4, logical: 3, patience: 2, softSkills: 3 }
      },
      {
        id: 'q15_d',
        text: 'Ensuring universal mental healthcare, eradicating social alienation, and fostering psychological empathy across warring nations.',
        scenarioResponse: 'You recognize that the deepest human crises stem from emotional neglect, trauma, and lack of universal compassion.',
        softSkillDemonstrated: 'Universal Compassion & Peace Mediation',
        weights: { analytical: 0, creative: 0, business: 1, social: 1.8, cognitive: 4, logical: 1, patience: 4, softSkills: 4 }
      }
    ]
  }
];
