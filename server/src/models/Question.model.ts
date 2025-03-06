import mongoose, { Document, Schema } from 'mongoose';

interface Option {
  id: string;
  text: string;
  score: {
    analytical?: number;
    creative?: number;
    social?: number;
    structured?: number;
    [key: string]: number | undefined; // Allow additional score categories
  };
}

export interface IQuestion extends Document {
  question: string;
  options: Option[];
  category?: string;
  order: number;
}

const QuestionSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    options: [
      {
        id: {
          type: String,
          required: [true, 'Option ID is required'],
        },
        text: {
          type: String,
          required: [true, 'Option text is required'],
        },
        score: {
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
      },
    ],
    category: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Question order is required'],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>('Question', QuestionSchema); 