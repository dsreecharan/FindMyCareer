import { Request, Response } from 'express';
import Question from '../models/Question.model';
import TestResult from '../models/TestResult.model';
import User from '../models/User.model';
import Career from '../models/Career.model';
import { mapScoresToCareers, loadCareerRecommendationData } from '../utils/csvParser';
import mongoose from 'mongoose';

// Get all test questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().sort({ order: 1 });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit a completed test
export const submitTest = async (req: Request, res: Response) => {
  try {
    const { responses } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ message: 'Test responses are required' });
    }
    
    // Calculate scores based on responses
    const scores = {
      analytical: 0,
      creative: 0,
      social: 0,
      structured: 0
    };
    
    // Process each response
    for (const response of responses) {
      const question = await Question.findOne({ 
        'options.id': response.answerId 
      });
      
      if (question) {
        const selectedOption = question.options.find(opt => opt.id === response.answerId);
        
        if (selectedOption && selectedOption.score) {
          // Add scores from this answer
          Object.keys(selectedOption.score).forEach((key) => {
            if (key in scores && typeof selectedOption.score[key] === 'number') {
              // @ts-ignore
              scores[key] += selectedOption.score[key] || 0;
            }
          });
        }
      }
    }
    
    // Load career recommendation data
    const recommendationData = await loadCareerRecommendationData();
    
    // Map scores to career recommendations
    const careerRecommendations = mapScoresToCareers(scores, recommendationData);
    
    // Get top 5 recommended careers
    const topRecommendations = careerRecommendations.slice(0, 5);
    
    // Find career IDs in the database based on titles
    const recommendedCareerIds = [];
    for (const rec of topRecommendations) {
      const career = await Career.findOne({ title: rec.careerTitle });
      if (career) {
        recommendedCareerIds.push(career._id);
      }
    }
    
    // Create test result
    const testResult = new TestResult({
      user: userId,
      responses,
      scores,
      recommendedCareers: recommendedCareerIds,
      completed: true,
    });
    
    await testResult.save();
    
    // Update user's test history
    await User.findByIdAndUpdate(userId, {
      $push: { testHistory: testResult._id }
    });
    
    // Return result with populated career details
    const populatedResult = await TestResult.findById(testResult._id)
      .populate('recommendedCareers');
    
    res.status(201).json({
      message: 'Test completed successfully',
      result: populatedResult,
      recommendations: topRecommendations,
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's test history
export const getTestHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const user = await User.findById(userId).populate({
      path: 'testHistory',
      options: { sort: { date: -1 } }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.testHistory);
  } catch (error) {
    console.error('Error fetching test history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific test result
export const getTestResultById = async (req: Request, res: Response) => {
  try {
    const resultId = req.params.id;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(resultId)) {
      return res.status(400).json({ message: 'Invalid test result ID' });
    }
    
    const testResult = await TestResult.findById(resultId)
      .populate('recommendedCareers');
    
    if (!testResult) {
      return res.status(404).json({ message: 'Test result not found' });
    }
    
    // Check if the result belongs to the requesting user
    if (testResult.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to test result' });
    }
    
    res.json(testResult);
  } catch (error) {
    console.error('Error fetching test result:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 