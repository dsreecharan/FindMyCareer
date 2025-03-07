import { Request, Response } from 'express';
import Question from '../models/Question.model';
import TestResult from '../models/TestResult.model';
import User from '../models/User.model';
import Career from '../models/Career.model';
import { mapScoresToCareers, loadCareerRecommendationData } from '../utils/csvParser';
import mongoose from 'mongoose';
const { exec } = require('child_process');
import fs from 'fs';
import path from 'path';

// Define a log file path
const logFilePath = path.join(__dirname, '../../logs/script_execution.log');

// Define interface for career details
interface CareerDetail {
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  colleges: { name: string; location: string }[];
  entranceExams: { name: string }[];
}

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

// Add this function above getTestResultById to avoid code duplication
const getPredefinedCareers = () => {
  return [
    {
      careerTitle: "Software Engineering",
      matchPercentage: 90,
      details: {
        description: "Develop applications and systems using programming languages and software engineering principles.",
        skills: ["Programming", "Problem Solving", "Logical Thinking", "Teamwork", "System Design"],
        averageSalary: "$105,000 - $150,000",
        colleges: [
          { name: "Stanford University", location: "Stanford, CA" },
          { name: "MIT", location: "Cambridge, MA" },
          { name: "Carnegie Mellon University", location: "Pittsburgh, PA" }
        ],
        entranceExams: [
          { name: "SAT/ACT" },
          { name: "GRE" }
        ]
      }
    },
    {
      careerTitle: "Medicine",
      matchPercentage: 85,
      details: {
        description: "Diagnose and treat illnesses, injuries, and other health conditions in patients.",
        skills: ["Critical Thinking", "Communication", "Empathy", "Decision Making", "Attention to Detail"],
        averageSalary: "$208,000 - $350,000",
        colleges: [
          { name: "Harvard Medical School", location: "Boston, MA" },
          { name: "Johns Hopkins University", location: "Baltimore, MD" },
          { name: "Stanford School of Medicine", location: "Stanford, CA" }
        ],
        entranceExams: [
          { name: "MCAT" }
        ]
      }
    },
    {
      careerTitle: "Law",
      matchPercentage: 80,
      details: {
        description: "Advise and represent individuals, businesses, or government agencies on legal issues or disputes.",
        skills: ["Critical Thinking", "Research", "Negotiation", "Public Speaking", "Writing"],
        averageSalary: "$126,000 - $189,000",
        colleges: [
          { name: "Harvard Law School", location: "Cambridge, MA" },
          { name: "Yale Law School", location: "New Haven, CT" },
          { name: "Stanford Law School", location: "Stanford, CA" }
        ],
        entranceExams: [
          { name: "LSAT" }
        ]
      }
    },
    {
      careerTitle: "Business Management",
      matchPercentage: 75,
      details: {
        description: "Plan, direct, and coordinate operational activities of companies and organizations.",
        skills: ["Leadership", "Communication", "Strategic Thinking", "Problem Solving", "Decision Making"],
        averageSalary: "$87,000 - $156,000",
        colleges: [
          { name: "Harvard Business School", location: "Boston, MA" },
          { name: "Stanford Graduate School of Business", location: "Stanford, CA" },
          { name: "Wharton School", location: "Philadelphia, PA" }
        ],
        entranceExams: [
          { name: "GMAT" },
          { name: "GRE" }
        ]
      }
    },
    {
      careerTitle: "Design",
      matchPercentage: 70,
      details: {
        description: "Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.",
        skills: ["Creativity", "Visual Thinking", "Communication", "Problem Solving", "Attention to Detail"],
        averageSalary: "$53,000 - $93,000",
        colleges: [
          { name: "Rhode Island School of Design", location: "Providence, RI" },
          { name: "Parsons School of Design", location: "New York, NY" },
          { name: "California Institute of the Arts", location: "Valencia, CA" }
        ],
        entranceExams: [
          { name: "Portfolio Review" }
        ]
      }
    }
  ];
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
    
    console.log("Processing test submission for user:", userId);
    console.log("Received responses:", responses.length);
    
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
    
    console.log("Calculated user scores:", scores);
    
    // Load career recommendation data
    const recommendationData = await loadCareerRecommendationData();
    console.log("Loaded recommendation data entries:", recommendationData.length);
    
    // Map scores to career recommendations
    const careerRecommendations = mapScoresToCareers(scores, recommendationData);
    console.log("Generated career recommendations:", careerRecommendations.length);
    
    // Get top 5 recommended careers
    const topRecommendations = careerRecommendations.slice(0, 5);
    console.log("Top 5 recommendations:", topRecommendations.map(r => r.careerTitle).join(", "));
    
    // After loading career recommendation data
    const careersPath = path.join(__dirname, '../../data/careers.json');
    console.log("Attempting to load careers from:", careersPath);

    // Check if careers.json exists
    let careerDetails: CareerDetail[] = [];
    try {
      if (fs.existsSync(careersPath)) {
        // Read careers from file
        const careersData = fs.readFileSync(careersPath, 'utf8');
        careerDetails = JSON.parse(careersData);
        console.log("Successfully loaded career details, count:", careerDetails.length);
      } else {
        console.log("Careers file not found, running script to generate it...");
        // If file doesn't exist, run the script to generate it
        await new Promise<void>((resolve, reject) => {
          exec('node detectCareers.js', (error: Error | null, stdout: string, stderr: string) => {
            if (error) {
              console.error(`Error executing script: ${error.message}`);
              reject(error);
              return;
            }
            if (stderr) {
              console.error(`Script stderr: ${stderr}`);
            }
            console.log(`Script output: ${stdout}`);
            
            // Read the generated file
            if (fs.existsSync(careersPath)) {
              const careersData = fs.readFileSync(careersPath, 'utf8');
              careerDetails = JSON.parse(careersData);
              console.log("Newly generated career details, count:", careerDetails.length);
            } else {
              console.log("Failed to find generated careers file");
            }
            
            resolve();
          });
        });
      }
    } catch (error) {
      console.error('Error reading career details:', error);
    }

    // Enhance recommendations with career details
    const enhancedRecommendations = topRecommendations.map(rec => {
      const careerDetail = careerDetails.find(c => c.title === rec.careerTitle);
      if (careerDetail) {
        return {
          ...rec,
          details: {
            description: careerDetail.description,
            skills: careerDetail.skills,
            averageSalary: careerDetail.averageSalary,
            colleges: careerDetail.colleges,
            entranceExams: careerDetail.entranceExams
          }
        };
      }
      // Fallback to predefined career if not found
      const predefinedCareer = getPredefinedCareers().find(c => 
        c.careerTitle.toLowerCase() === rec.careerTitle.toLowerCase()
      );
      return predefinedCareer || rec;
    });
    
    // Find career IDs in the database based on titles
    const recommendedCareerIds = [];
    for (const rec of topRecommendations) {
      const career = await Career.findOne({ title: rec.careerTitle });
      if (career) {
        recommendedCareerIds.push(career._id);
      }
    }
    
    // Create test result with actual scores and recommendations
    const testResult = new TestResult({
      user: userId,
      responses,
      scores,
      recommendedCareers: enhancedRecommendations,
      completed: true
    });

    await testResult.save();
    
    // Update user's recommended careers
    await User.findByIdAndUpdate(userId, {
      $set: {
        recommendedCareers: recommendedCareerIds,
        lastTestDate: new Date()
      }
    });

    res.json({
      message: 'Test completed successfully',
      scores,
      recommendations: enhancedRecommendations
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
    const { id } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid test result ID' });
    }
    
    console.log(`Retrieving test result: ${id} for user: ${userId}`);
    
    // Find the test result and populate career details
    const testResult = await TestResult.findById(id)
      .populate('recommendedCareers');
    
    if (!testResult) {
      return res.status(404).json({ message: 'Test result not found' });
    }
    
    // Check if the result belongs to the user
    if (testResult.user.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to access this test result' });
    }
    
    console.log(`Found test result with scores:`, testResult.scores);
    
    // Check if we need to add enhanced recommendations
    if (!testResult.recommendations || testResult.recommendations.length === 0) {
      console.log("Adding predefined career recommendations to the test result");
      
      // Add the recommendations to the result
      const resultObject = testResult.toObject();
      resultObject.recommendations = getPredefinedCareers();
      
      res.json(resultObject);
    } else {
      console.log("Test result already has recommendations");
      res.json(testResult);
    }
  } catch (error) {
    console.error('Error fetching test result:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 