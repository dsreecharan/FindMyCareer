import mongoose, { Document, Schema } from 'mongoose';

interface QuestionResponse {
  questionId: string;
  question: string;
  answerId: string;
  answer: string;
}

interface Scores {
  analytical: number;
  creative: number;
  social: number;
  structured: number;
  [key: string]: number; // Allow additional score categories
}

export interface ITestResult extends Document {
  user: mongoose.Types.ObjectId;
  responses: QuestionResponse[];
  scores: Scores;
  recommendedCareers: mongoose.Types.ObjectId[];
  date: Date;
  completed: boolean;
}

const TestResultSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  responses: [
    {
      questionId: {
        type: String,
        required: [true, 'Question ID is required'],
      },
      question: {
        type: String,
        required: [true, 'Question text is required'],
      },
      answerId: {
        type: String,
        required: [true, 'Answer ID is required'],
      },
      answer: {
        type: String,
        required: [true, 'Answer text is required'],
      },
    },
  ],
  scores: {
    analytical: {
      type: Number,
      default: 0,
    },
    creative: {
      type: Number,
      default: 0,
    },
    social: {
      type: Number,
      default: 0,
    },
    structured: {
      type: Number,
      default: 0,
    },
  },
  recommendedCareers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Career',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ITestResult>('TestResult', TestResultSchema); 