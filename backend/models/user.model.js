const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: ['9', '10', '11', '12', 'college'],
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'counselor'],
      default: 'student',
    },
    assessmentResults: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssessmentResult',
    }],
    counselingRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CounselingRequest',
    }],
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    grade: this.grade,
    role: this.role,
    createdAt: this.createdAt,
  };
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User; 