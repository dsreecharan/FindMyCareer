const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['personality', 'skills', 'interests', 'values'],
  },
  options: [{
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Assessment Result Schema
const assessmentResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
  }],
  aiEvaluation: {
    careerPaths: [{
      type: String
    }],
    strengths: [{
      type: String
    }],
    developmentAreas: [{
      type: String
    }],
    nextSteps: [{
      type: String
    }]
  },
  rawAIResponse: {
    type: String
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create models
const Question = mongoose.model('Question', questionSchema);
const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);

module.exports = {
  Question,
  AssessmentResult,
}; 
