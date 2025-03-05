const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/user.model');
const Career = require('../models/career.model');
const Assessment = require('../models/assessment.model');
const CounselingRequest = require('../models/counseling.model');

// Get all users (admin only)
router.get('/users', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all assessments (admin only)
router.get('/assessments', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const assessments = await Assessment.find().populate('user', 'name email');
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all counseling requests (admin only)
router.get('/counseling-requests', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const requests = await CounselingRequest.find()
      .populate('student', 'name email')
      .populate('counselor', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign counselor to counseling request (admin only)
router.put('/counseling-requests/:requestId/assign', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const { counselorId } = req.body;
    const request = await CounselingRequest.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.counselor = counselorId;
    request.status = 'Assigned';
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard statistics (admin only)
router.get('/dashboard', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalAssessments: await Assessment.countDocuments(),
      totalRequests: await CounselingRequest.countDocuments(),
      pendingRequests: await CounselingRequest.countDocuments({ status: 'Pending' }),
      completedRequests: await CounselingRequest.countDocuments({ status: 'Completed' })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 