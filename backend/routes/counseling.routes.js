const express = require('express');
const router = express.Router();
const counselingController = require('../controllers/counseling.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Student routes
router.post('/request', authMiddleware.verifyToken, authMiddleware.isStudent, counselingController.createRequest);
router.get('/my-requests', authMiddleware.verifyToken, authMiddleware.isStudent, counselingController.getStudentRequests);
router.post('/request/:requestId/feedback', authMiddleware.verifyToken, authMiddleware.isStudent, counselingController.submitFeedback);

// Counselor routes
router.get('/assigned-requests', authMiddleware.verifyToken, authMiddleware.isCounselor, counselingController.getCounselorRequests);
router.put('/request/:requestId/status', authMiddleware.verifyToken, authMiddleware.isCounselor, counselingController.updateRequestStatus);
router.post('/request/:requestId/note', authMiddleware.verifyToken, authMiddleware.isCounselor, counselingController.addNote);

module.exports = router; 