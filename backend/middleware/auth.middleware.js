const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive',
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking admin status',
    });
  }
};

// Check if user is counselor
const isCounselor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user || user.role !== 'counselor') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Counselor only.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking counselor status',
    });
  }
};

// Check if user is student
const isStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user || user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Student only.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking student status',
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isCounselor,
  isStudent
}; 