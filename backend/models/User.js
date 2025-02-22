import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: String,
    required: true
  },
  school: String,
  quizResponses: {
    thinkingStyle: [String],
    problemSolving: [String],
    workPreference: [String],
    interests: [String]
  },
  recommendedPaths: [{
    career: String,
    score: Number,
    subjects: [String],
    exams: [String],
    colleges: [{
      name: String,
      location: String,
      ranking: Number,
      website: String
    }]
  }],
  aiAnalysis: {
    personalityTraits: {
      analytical: Number,
      creative: Number,
      practical: Number,
      social: Number
    },
    learningStyle: String,
    strengths: [String],
    careerCompatibility: [String],
    recommendations: {
      studyTips: [String],
      skillDevelopment: [{
        area: String,
        activities: [String]
      }],
      nextSteps: [String]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema); 