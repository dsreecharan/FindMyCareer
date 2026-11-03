import { EntranceExam } from '../types';

export const ENTRANCE_EXAMS: EntranceExam[] = [
  {
    id: 'jee-main-advanced',
    name: 'JEE (Main & Advanced)',
    fullName: 'Joint Entrance Examination',
    category: 'Engineering & Technology',
    conductingBody: 'NTA & IIT Joint Admission Board',
    eligibility: '75% aggregate in 10+2 with Physics, Chemistry, and Mathematics (PCM). Top 2.5 lakh qualifiers in JEE Main eligible for JEE Advanced.',
    examMonth: 'January & April (Main), May/June (Advanced)',
    applicationDeadline: 'December (Session 1) / March (Session 2)',
    syllabusHighlights: ['Kinematics & Modern Physics', 'Calculus, Vectors & Algebra', 'Organic, Physical & Inorganic Chemistry'],
    keyColleges: ['23 IITs (Bombay, Delhi, Madras, etc.)', '31 NITs', 'IIITs', 'IIST']
  },
  {
    id: 'sat-digital',
    name: 'Digital SAT',
    fullName: 'Scholastic Assessment Test',
    category: 'Engineering & Technology',
    conductingBody: 'College Board (USA & Global)',
    eligibility: 'Open to Grade 10-12 students targeting universities in the US, Canada, UK, Singapore, and select Indian liberal universities.',
    examMonth: 'March, May, June, August, October, November, December',
    applicationDeadline: 'Usually 3-4 weeks prior to test date',
    syllabusHighlights: ['Reading & Writing (Information, Ideas, Expression)', 'Math (Algebra, Advanced Math, Problem Solving & Data Analysis)'],
    keyColleges: ['MIT', 'Stanford', 'Harvard', 'Purdue', 'NUS', 'Ashoka University']
  },
  {
    id: 'uceed',
    name: 'UCEED',
    fullName: 'Undergraduate Common Entrance Examination for Design',
    category: 'Creative & Design',
    conductingBody: 'IIT Bombay',
    eligibility: 'Candidates from any stream (Science, Commerce, Arts) who passed Grade 12. Maximum two consecutive attempts.',
    examMonth: 'Third Sunday of January',
    applicationDeadline: 'Late October to Mid November',
    syllabusHighlights: ['Visualization & Spatial Ability', 'Observation & Design Sensitivity', 'Environmental Awareness', 'Drawing & Sketching Aptitude'],
    keyColleges: ['IDC IIT Bombay', 'IIT Delhi', 'IIT Guwahati', 'IIT Hyderabad', 'IIITDM Jabalpur']
  },
  {
    id: 'nid-dat',
    name: 'NID DAT (Prelims & Mains)',
    fullName: 'National Institute of Design - Design Aptitude Test',
    category: 'Creative & Design',
    conductingBody: 'National Institute of Design',
    eligibility: 'Passed or appearing in 10+2 from any recognized board in any stream. Upper age limit typically 20 years.',
    examMonth: 'January (Prelims), April/May (Mains Studio Test)',
    applicationDeadline: 'Late November',
    syllabusHighlights: ['Design principles & color theory', 'Composition & 2D/3D perspective', 'Creative problem solving & material manipulation'],
    keyColleges: ['NID Ahmedabad', 'NID Bengaluru', 'NID Gandhinagar', 'NID Andhra Pradesh', 'NID Haryana']
  },
  {
    id: 'nata',
    name: 'NATA',
    fullName: 'National Aptitude Test in Architecture',
    category: 'Creative & Design',
    conductingBody: 'Council of Architecture (CoA)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics with at least 50% marks in aggregate or 10+3 Diploma with Mathematics.',
    examMonth: 'Multiple windows from April through July',
    applicationDeadline: 'Rolling deadlines per phase',
    syllabusHighlights: ['Diagrammatic & Visual Reasoning', 'Aesthetic Sensitivity & Architectural Awareness', 'Mathematics & Physics Basics'],
    keyColleges: ['CEPT University', 'Sir JJ College of Architecture', 'Chandigarh College of Architecture']
  },
  {
    id: 'ipmat',
    name: 'IPMAT',
    fullName: 'Integrated Program in Management Aptitude Test',
    category: 'Business & Management',
    conductingBody: 'IIM Indore / IIM Rohtak',
    eligibility: 'Minimum 60% in Grade 10 and Grade 12 (55% for reserved categories). Direct 5-year BBA+MBA pathway from high school.',
    examMonth: 'May',
    applicationDeadline: 'Mid April',
    syllabusHighlights: ['Quantitative Ability (Short Answer)', 'Quantitative Ability (MCQ - Higher & Commercial Math)', 'Verbal Ability & Reading Comprehension'],
    keyColleges: ['IIM Indore', 'IIM Rohtak', 'IIM Ranchi', 'IIM Bodh Gaya', 'IIM Jammu', 'Nirma University']
  },
  {
    id: 'cuet-ug',
    name: 'CUET UG',
    fullName: 'Common University Entrance Test (Undergraduate)',
    category: 'Business & Management',
    conductingBody: 'National Testing Agency (NTA)',
    eligibility: 'Passed Grade 12 from any recognized board. Domain subjects chosen based on target undergraduate degree.',
    examMonth: 'May - June',
    applicationDeadline: 'Late March',
    syllabusHighlights: ['Language Comprehension', 'Domain Subjects (Economics, Accountancy, Psychology, Math, etc.)', 'General Test (Reasoning & GK)'],
    keyColleges: ['University of Delhi (SRCC, St. Stephens, LSR, Hindu)', 'BHU', 'Jamia Millia', 'TISS']
  },
  {
    id: 'clat',
    name: 'CLAT UG',
    fullName: 'Common Law Admission Test',
    category: 'Social & Psychology',
    conductingBody: 'Consortium of National Law Universities',
    eligibility: 'Minimum 45% in 10+2 from any stream (40% for SC/ST). No upper age limit.',
    examMonth: 'First Sunday of December',
    applicationDeadline: 'Mid October',
    syllabusHighlights: ['English Language & Passage Comprehension', 'Current Affairs & Legal Reasoning', 'Logical Reasoning & Quantitative Techniques'],
    keyColleges: ['NLSIU Bengaluru', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'NLU Delhi (via AILET)']
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test',
    category: 'Social & Psychology',
    conductingBody: 'National Testing Agency (NTA)',
    eligibility: 'Minimum 50% in 10+2 with Physics, Chemistry, Biology/Biotechnology and English. Must be 17 years old by December 31.',
    examMonth: 'First Sunday of May',
    applicationDeadline: 'Mid March',
    syllabusHighlights: ['Botany & Zoology (Human Physiology, Genetics, Ecology)', 'Physics (Mechanics, Electricity, Optics)', 'Chemistry (Organic & Physical)'],
    keyColleges: ['AIIMS New Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'Maulana Azad Medical College']
  }
];
