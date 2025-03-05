const mongoose = require('mongoose');

const counselingRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentName: {
    type: String,
    required: true,
    trim: true,
  },
  parentEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  parentPhone: {
    type: String,
    required: true,
    trim: true,
  },
  preferredContactMethod: {
    type: String,
    required: true,
    enum: ['Email', 'Phone', 'Both'],
  },
  preferredTime: {
    type: String,
    required: true,
    enum: ['Morning', 'Afternoon', 'Evening', 'Any'],
  },
  concerns: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  assignedCounselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  scheduledDate: {
    type: Date,
  },
  notes: [{
    text: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    submittedAt: Date,
  },
}, {
  timestamps: true,
});

// Add indexes
counselingRequestSchema.index({ student: 1, status: 1 });
counselingRequestSchema.index({ assignedCounselor: 1, status: 1 });
counselingRequestSchema.index({ parentEmail: 1 });

// Virtual for request summary
counselingRequestSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    student: this.student,
    parentName: this.parentName,
    status: this.status,
    scheduledDate: this.scheduledDate,
    concerns: this.concerns.substring(0, 100) + '...',
  };
});

// Pre-save middleware to validate scheduled date
counselingRequestSchema.pre('save', function(next) {
  if (this.status === 'Scheduled' && !this.scheduledDate) {
    next(new Error('Scheduled date is required when status is Scheduled'));
  }
  next();
});

// Method to update status
counselingRequestSchema.methods.updateStatus = async function(newStatus, counselorId = null) {
  this.status = newStatus;
  if (counselorId) {
    this.assignedCounselor = counselorId;
  }
  if (newStatus === 'Scheduled' && !this.scheduledDate) {
    throw new Error('Scheduled date is required when status is Scheduled');
  }
  await this.save();
};

// Method to add note
counselingRequestSchema.methods.addNote = async function(note, userId) {
  this.notes.push({
    text: note,
    addedBy: userId,
  });
  await this.save();
};

// Method to submit feedback
counselingRequestSchema.methods.submitFeedback = async function(rating, comment) {
  this.feedback = {
    rating,
    comment,
    submittedAt: new Date(),
  };
  await this.save();
};

const CounselingRequest = mongoose.model('CounselingRequest', counselingRequestSchema);

module.exports = CounselingRequest; 