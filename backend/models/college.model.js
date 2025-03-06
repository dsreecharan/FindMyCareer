const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['government', 'private', 'international']
  },
  country: {
    type: String,
    required: true
  },
  ranking: {
    india: Number,
    global: Number
  },
  eligibility: [{
    type: String,
    required: true
  }],
  exams: [{
    name: String,
    description: String,
    required: Boolean
  }],
  applicationProcess: {
    method: String,
    opensOn: String,
    deadline: String,
    portal: String
  },
  careers: [{
    type: String,
    required: true
  }],
  courses: [{
    name: String,
    duration: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
collegeSchema.index({ type: 1, country: 1 });
collegeSchema.index({ careers: 1 });
collegeSchema.index({ 'ranking.india': 1 });
collegeSchema.index({ 'ranking.global': 1 });

const College = mongoose.model('College', collegeSchema);

module.exports = College; 