import mongoose, { Document, Schema } from 'mongoose';

interface College {
  name: string;
  location: string;
  ranking?: number;
}

interface EntranceExam {
  name: string;
  description?: string;
  website?: string;
}

interface EligibilityCriteria {
  minGrade?: string;
  subjects?: string[];
  requirements?: string[];
}

interface ApplicationProcess {
  steps: string[];
  deadlines?: string[];
  documents?: string[];
}

export interface ICareer extends Document {
  title: string;
  description: string;
  skills: string[];
  personalityTraits: string[];
  educationRequirements: string[];
  jobOutlook: string;
  averageSalary: string;
  colleges: College[];
  entranceExams: EntranceExam[];
  eligibility: EligibilityCriteria;
  applicationProcess: ApplicationProcess;
  relatedCareers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Career title is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    skills: {
      type: [String],
      required: [true, 'Skills are required'],
    },
    personalityTraits: {
      type: [String],
      required: [true, 'Personality traits are required'],
    },
    educationRequirements: {
      type: [String],
      required: [true, 'Education requirements are required'],
    },
    jobOutlook: {
      type: String,
      required: [true, 'Job outlook is required'],
    },
    averageSalary: {
      type: String,
      required: [true, 'Average salary is required'],
    },
    colleges: [
      {
        name: {
          type: String,
          required: [true, 'College name is required'],
        },
        location: {
          type: String,
          required: [true, 'College location is required'],
        },
        ranking: {
          type: Number,
        },
      },
    ],
    entranceExams: [
      {
        name: {
          type: String,
          required: [true, 'Exam name is required'],
        },
        description: {
          type: String,
        },
        website: {
          type: String,
        },
      },
    ],
    eligibility: {
      minGrade: {
        type: String,
      },
      subjects: {
        type: [String],
      },
      requirements: {
        type: [String],
      },
    },
    applicationProcess: {
      steps: {
        type: [String],
        required: [true, 'Application steps are required'],
      },
      deadlines: {
        type: [String],
      },
      documents: {
        type: [String],
      },
    },
    relatedCareers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Career',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add text index for searching
CareerSchema.index(
  { 
    title: 'text', 
    description: 'text', 
    skills: 'text', 
    personalityTraits: 'text' 
  }
);

export default mongoose.model<ICareer>('Career', CareerSchema); 