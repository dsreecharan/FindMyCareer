const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get assessment questions
router.get('/questions', authMiddleware.verifyToken, assessmentController.getQuestions);

// Submit assessment answers
router.post('/submit', authMiddleware.verifyToken, assessmentController.submitAssessment);

// Get assessment results
router.get('/results', authMiddleware.verifyToken, assessmentController.getResults);

// Get detailed career information
router.get('/career/:careerId', authMiddleware.verifyToken, assessmentController.getCareerDetails);

module.exports = router; 