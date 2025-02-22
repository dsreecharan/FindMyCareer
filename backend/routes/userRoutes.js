import express from 'express';
import User from '../models/User.js';
import { calculateCareerPaths } from '../utils/careerAnalysis.js';
import { generateAIAnalysis } from '../utils/aiAnalysis.js';

const router = express.Router();

// Create new user with quiz responses
router.post('/submit-quiz', async (req, res) => {
  try {
    const { name, email, grade, school, quizResponses } = req.body;

    // Generate career recommendations
    const recommendedPaths = calculateCareerPaths(quizResponses);
    
    // Generate AI analysis
    const aiAnalysis = generateAIAnalysis(quizResponses);

    const user = new User({
      name,
      email,
      grade,
      school,
      quizResponses,
      recommendedPaths,
      aiAnalysis
    });

    await user.save();
    res.status(201).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get user results by email
router.get('/results/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Add this new route to clear all users
router.delete('/clear-all', async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ 
      success: true, 
      message: 'All user data cleared successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to clear user data' 
    });
  }
});

export default router; 