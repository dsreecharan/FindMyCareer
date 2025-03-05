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
  personalityTraits: [{
    trait: String,
    score: Number,
  }],
  skillLevels: [{
    skill: String,
    level: Number,
  }],
  interests: [{
    category: String,
    score: Number,
  }],
  values: [{
    value: String,
    importance: Number,
  }],
  recommendedCareers: [{
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    reasons: [String],
  }],
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
