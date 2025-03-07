import { Request, Response } from 'express';
import Career from '../models/Career.model';
import mongoose from 'mongoose';

// Get all careers
export const getAllCareers = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find().select('title description skills averageSalary');
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a career by ID
export const getCareerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let career = null;
    
    // First try to find by ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(id)) {
      career = await Career.findById(id);
    }
    
    // If not found by ID, try to find by title or slug
    if (!career) {
      // Convert ID format like "software-engineering" to "Software Engineering"
      const titleFromId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      career = await Career.findOne({ 
        $or: [
          { title: titleFromId },
          { title: id },
          { title: { $regex: new RegExp(titleFromId, 'i') } }
        ] 
      });
    }
    
    // If still not found, generate a placeholder career
    if (!career) {
      // Create a placeholder career for predefined careers
      const predefinedData = getPredefinedCareerData(id);
      
      if (predefinedData) {
        return res.json(predefinedData);
      }
      
      return res.status(404).json({ message: 'Career not found' });
    }
    
    res.json(career);
  } catch (error) {
    console.error('Error fetching career by id:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to get predefined career data
const getPredefinedCareerData = (id: string) => {
  const careers = {
    'software-engineering': {
      _id: 'software-engineering',
      title: 'Software Engineering',
      description: 'Develop applications and systems using programming languages and software engineering principles.',
      skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Teamwork', 'System Design'],
      personalityTraits: ['Analytical', 'Detail-oriented', 'Creative', 'Patient', 'Logical'],
      educationRequirements: ['Bachelor\'s degree in Computer Science or related field', 'Coding bootcamp (for some positions)'],
      jobOutlook: 'Growing much faster than average at 22% through 2030',
      averageSalary: '$105,000 - $150,000',
      colleges: [
        { name: 'Stanford University', location: 'Stanford, CA' },
        { name: 'MIT', location: 'Cambridge, MA' },
        { name: 'Carnegie Mellon University', location: 'Pittsburgh, PA' }
      ],
      entranceExams: [
        { name: 'SAT/ACT' },
        { name: 'GRE' }
      ],
      eligibility: {
        minGrade: 'Varies by institution',
        subjects: ['Mathematics', 'Computer Science', 'Physics'],
        requirements: ['Strong analytical skills', 'Programming experience']
      },
      applicationProcess: {
        steps: ['Submit application', 'Take entrance exams', 'Submit transcripts', 'Write personal statement'],
        deadlines: ['Early admission: November', 'Regular admission: January'],
        documents: ['Transcripts', 'Letters of recommendation', 'Statement of purpose']
      },
      relatedCareers: []
    },
    'medicine': {
      _id: 'medicine',
      title: 'Medicine',
      description: 'Diagnose and treat illnesses, injuries, and other health conditions in patients.',
      skills: ['Critical Thinking', 'Communication', 'Empathy', 'Decision Making', 'Attention to Detail'],
      personalityTraits: ['Compassionate', 'Detail-oriented', 'Resilient', 'Ethical', 'Communicative'],
      educationRequirements: ['Bachelor\'s degree', 'Medical Doctor (MD) degree', '3-7 years residency'],
      jobOutlook: 'Growing average at 7% through 2030',
      averageSalary: '$208,000 - $350,000',
      colleges: [
        { name: 'Harvard Medical School', location: 'Boston, MA' },
        { name: 'Johns Hopkins University', location: 'Baltimore, MD' },
        { name: 'Stanford School of Medicine', location: 'Stanford, CA' }
      ],
      entranceExams: [
        { name: 'MCAT' }
      ],
      eligibility: {
        minGrade: 'GPA 3.7+',
        subjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics'],
        requirements: ['Research experience', 'Clinical experience', 'Community service']
      },
      applicationProcess: {
        steps: ['Complete prerequisite courses', 'Take MCAT', 'Submit AMCAS application', 'Secondary applications', 'Interviews'],
        deadlines: ['AMCAS opens: May', 'Early submission: June', 'Regular deadline: October-December'],
        documents: ['Transcripts', 'Letters of recommendation', 'Personal statement', 'MCAT scores']
      },
      relatedCareers: []
    },
    'law': {
      _id: 'law',
      title: 'Law',
      description: 'Advise and represent individuals, businesses, or government agencies on legal issues or disputes.',
      skills: ['Critical Thinking', 'Research', 'Negotiation', 'Public Speaking', 'Writing'],
      personalityTraits: ['Analytical', 'Persuasive', 'Ethical', 'Detail-oriented', 'Confident'],
      educationRequirements: ['Bachelor\'s degree', 'Juris Doctor (JD) degree', 'Pass bar exam'],
      jobOutlook: 'Growing average at 9% through 2030',
      averageSalary: '$126,000 - $189,000',
      colleges: [
        { name: 'Harvard Law School', location: 'Cambridge, MA' },
        { name: 'Yale Law School', location: 'New Haven, CT' },
        { name: 'Stanford Law School', location: 'Stanford, CA' }
      ],
      entranceExams: [
        { name: 'LSAT' }
      ],
      eligibility: {
        minGrade: 'GPA 3.5+',
        subjects: ['Political Science', 'History', 'English', 'Philosophy'],
        requirements: ['Strong analytical skills', 'Writing ability', 'Public speaking']
      },
      applicationProcess: {
        steps: ['Take LSAT', 'Submit applications through LSAC', 'Write personal statement', 'Interviews'],
        deadlines: ['Early decision: September-November', 'Regular decision: January-March'],
        documents: ['Transcripts', 'Letters of recommendation', 'Personal statement', 'Resume']
      },
      relatedCareers: []
    },
    'business-management': {
      _id: 'business-management',
      title: 'Business Management',
      description: 'Plan, direct, and coordinate operational activities of companies and organizations.',
      skills: ['Leadership', 'Communication', 'Strategic Thinking', 'Problem Solving', 'Decision Making'],
      personalityTraits: ['Organized', 'Decisive', 'Analytical', 'Persuasive', 'Adaptable'],
      educationRequirements: ['Bachelor\'s degree in Business or related field', 'MBA preferred for higher positions'],
      jobOutlook: 'Growing average at 8% through 2030',
      averageSalary: '$87,000 - $156,000',
      colleges: [
        { name: 'Harvard Business School', location: 'Boston, MA' },
        { name: 'Stanford Graduate School of Business', location: 'Stanford, CA' },
        { name: 'Wharton School', location: 'Philadelphia, PA' }
      ],
      entranceExams: [
        { name: 'GMAT' },
        { name: 'GRE' }
      ],
      eligibility: {
        minGrade: 'GPA 3.3+',
        subjects: ['Business', 'Economics', 'Statistics', 'Accounting'],
        requirements: ['Leadership experience', 'Internships', 'Business acumen']
      },
      applicationProcess: {
        steps: ['Take GMAT/GRE', 'Submit application', 'Essays', 'Interviews'],
        deadlines: ['Round 1: September', 'Round 2: January', 'Round 3: April'],
        documents: ['Transcripts', 'Resume', 'Letters of recommendation', 'Essays']
      },
      relatedCareers: []
    },
    'design': {
      _id: 'design',
      title: 'Design',
      description: 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
      skills: ['Creativity', 'Visual Thinking', 'Communication', 'Problem Solving', 'Attention to Detail'],
      personalityTraits: ['Creative', 'Innovative', 'Detail-oriented', 'Collaborative', 'Observant'],
      educationRequirements: ['Bachelor\'s degree in Design, Fine Arts, or related field'],
      jobOutlook: 'Growing average at 5% through 2030',
      averageSalary: '$53,000 - $93,000',
      colleges: [
        { name: 'Rhode Island School of Design', location: 'Providence, RI' },
        { name: 'Parsons School of Design', location: 'New York, NY' },
        { name: 'California Institute of the Arts', location: 'Valencia, CA' }
      ],
      entranceExams: [
        { name: 'Portfolio Review' }
      ],
      eligibility: {
        minGrade: 'Varies by institution',
        subjects: ['Art', 'Design', 'Art History'],
        requirements: ['Creative portfolio', 'Drawing skills', 'Technical proficiency']
      },
      applicationProcess: {
        steps: ['Prepare portfolio', 'Submit application', 'Portfolio review', 'Interview'],
        deadlines: ['Early action: November', 'Regular decision: January-February'],
        documents: ['Portfolio', 'Artist statement', 'Transcripts', 'Letters of recommendation']
      },
      relatedCareers: []
    }
  };
  
  // Return the career data if it exists, otherwise null
  return careers[id as keyof typeof careers] || null;
};

// Get multiple careers by IDs
export const getCareersByIds = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Career IDs must be provided as an array' });
    }
    
    // Validate each ID is a valid ObjectId
    const validIds = ids.filter((id: string) => mongoose.Types.ObjectId.isValid(id));
    
    const careers = await Career.find({ _id: { $in: validIds } });
    
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers by ids:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search careers
export const searchCareers = async (req: Request, res: Response) => {
  try {
    const query = req.params.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search using text index
    const careers = await Career.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)
    .select('title description skills');
    
    res.json(careers);
  } catch (error) {
    console.error('Error searching careers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 