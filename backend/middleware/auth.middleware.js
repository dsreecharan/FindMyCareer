const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};

// Check if user is admin
exports.isAdmin = async (req, res, next) => {
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
exports.isCounselor = async (req, res, next) => {
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
exports.isStudent = async (req, res, next) => {
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