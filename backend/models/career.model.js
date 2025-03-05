const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Technology',
      'Science',
      'Arts',
      'Business',
      'Healthcare',
      'Education',
      'Engineering',
      'Social Sciences',
    ],
  },
  requiredSkills: [{
    skill: String,
    level: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Advanced', 'Expert'],
    },
  }],
  personalityTraits: [{
    trait: String,
    importance: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
    },
  }],
  education: {
    minimum: {
      type: String,
      required: true,
      enum: ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'],
    },
    recommended: {
      type: String,
      required: true,
      enum: ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'],
    },
    majors: [String],
  },
  salary: {
    entry: {
      type: Number,
      required: true,
    },
    mid: {
      type: Number,
      required: true,
    },
    senior: {
      type: Number,
      required: true,
    },
  },
  jobOutlook: {
    type: String,
    required: true,
    enum: ['Declining', 'Stable', 'Growing', 'High Growth'],
  },
  workEnvironment: [{
    type: String,
    enum: [
      'Office',
      'Laboratory',
      'Outdoor',
      'Remote',
      'Travel',
      'Classroom',
      'Hospital',
      'Studio',
    ],
  }],
  relatedCareers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
  certifications: [{
    name: String,
    provider: String,
    level: {
      type: String,
      enum: ['Entry', 'Intermediate', 'Advanced', 'Expert'],
    },
  }],
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['Article', 'Video', 'Course', 'Book', 'Website'],
    },
    url: String,
    description: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Add indexes
careerSchema.index({ title: 1 });
careerSchema.index({ category: 1 });
careerSchema.index({ 'requiredSkills.skill': 1 });
careerSchema.index({ 'personalityTraits.trait': 1 });

// Virtual for career summary
careerSchema.virtual('summary').get(function() {
  return {
    title: this.title,
    category: this.category,
    education: this.education,
    salary: this.salary,
    jobOutlook: this.jobOutlook,
    requiredSkills: this.requiredSkills.map(skill => skill.skill),
    personalityTraits: this.personalityTraits.map(trait => trait.trait),
  };
});

// Method to calculate match score with assessment results
careerSchema.methods.calculateMatchScore = function(assessmentResults) {
  let score = 0;
  let totalWeight = 0;

  // Match skills
  this.requiredSkills.forEach(requiredSkill => {
    const userSkill = assessmentResults.skillLevels.find(
      skill => skill.skill === requiredSkill.skill
    );
    if (userSkill) {
      const skillWeight = this.getSkillWeight(requiredSkill.level);
      score += (userSkill.level / 5) * skillWeight;
      totalWeight += skillWeight;
    }
  });

  // Match personality traits
  this.personalityTraits.forEach(requiredTrait => {
    const userTrait = assessmentResults.personalityTraits.find(
      trait => trait.trait === requiredTrait.trait
    );
    if (userTrait) {
      const traitWeight = this.getTraitWeight(requiredTrait.importance);
      score += (userTrait.score / 5) * traitWeight;
      totalWeight += traitWeight;
    }
  });

  // Match interests
  const userInterests = assessmentResults.interests
    .filter(interest => interest.score > 3)
    .map(interest => interest.category);
  
  if (userInterests.includes(this.category)) {
    score += 2;
    totalWeight += 2;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
};

// Helper methods for weight calculation
careerSchema.methods.getSkillWeight = function(level) {
  const weights = {
    'Basic': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4,
  };
  return weights[level] || 1;
};

careerSchema.methods.getTraitWeight = function(importance) {
  const weights = {
    'Low': 1,
    'Medium': 2,
    'High': 3,
  };
  return weights[importance] || 1;
};

const Career = mongoose.model('Career', careerSchema);

module.exports = Career; 