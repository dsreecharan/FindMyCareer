const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(verifyToken);

// Get assessment questions
router.get('/questions', assessmentController.getQuestions);

// Submit assessment
router.post('/submit', assessmentController.submitAssessment);

// Get assessment history
router.get('/history', assessmentController.getAssessmentHistory);

// Get assessment results
router.get('/results', assessmentController.getResults);

// Get career details
router.get('/career/:careerId', assessmentController.getCareerDetails);

module.exports = router; 