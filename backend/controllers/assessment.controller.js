const { Question, AssessmentResult } = require('../models/assessment.model');
const Career = require('../models/career.model');
const User = require('../models/user.model');
const aiEvaluation = require('../services/aiEvaluation.service');

// Get assessment questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isActive: true });
    res.json({
      success: true,
      questions: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Submit assessment answers and get AI evaluation
exports.submitAssessment = async (req, res) => {
  try {
    console.log('Received assessment submission');
    const { answers } = req.body;
    const userId = req.user._id;

    // Validate answers format
    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers format. Expected an array.'
      });
    }

    // Get user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get questions
    const questions = await Question.find();
    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions found'
      });
    }

    // Process answers to include full question details
    const processedAnswers = answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (!question) {
        console.error('Question not found for ID:', answer.questionId);
        return null;
      }
      return {
        questionId: question._id,
        questionText: question.text,
        category: question.category,
        selectedOption: {
          text: answer.selectedOption,
          score: question.options.find(opt => opt.text === answer.selectedOption)?.score || 3
        }
      };
    }).filter(answer => answer !== null);

    if (processedAnswers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid answers provided'
      });
    }

    // Perform AI evaluation
    console.log('Starting AI evaluation...');
    const aiEvaluationResult = await aiEvaluation.evaluateAssessment(processedAnswers, {
      name: user.name,
      grade: user.grade,
      interests: user.interests || []
    });
    console.log('AI evaluation completed:', aiEvaluationResult);

    // Save AI response in user document
    if (aiEvaluationResult.success) {
      user.aiAnalysisResponse = aiEvaluationResult.rawResponse;
      await user.save();
    }

    // Create assessment result
    const assessmentResult = new AssessmentResult({
      user: userId,
      answers: processedAnswers,
      aiEvaluation: aiEvaluationResult.success ? {
        careerPath: aiEvaluationResult.evaluation.careerPath,
        strengths: aiEvaluationResult.evaluation.strengths,
        developmentAreas: aiEvaluationResult.evaluation.developmentAreas,
        nextSteps: aiEvaluationResult.evaluation.nextSteps,
        collegeRecommendations: aiEvaluationResult.evaluation.collegeRecommendations
      } : null,
      rawAIResponse: aiEvaluationResult.rawResponse
    });

    // Save assessment result
    await assessmentResult.save();

    // Update user's assessment history
    user.assessmentResults.push(assessmentResult._id);
    await user.save();

    // Format the response for the frontend
    const formattedResult = {
      id: assessmentResult._id,
      completedAt: assessmentResult.completedAt,
      personalityTraits: {}, // This will be calculated in the backend
      recommendedCareers: assessmentResult.aiEvaluation?.careerPath ? [{
        title: assessmentResult.aiEvaluation.careerPath,
        description: `Based on your assessment results, a career as a ${assessmentResult.aiEvaluation.careerPath} aligns well with your strengths and interests. This role would allow you to leverage your skills in problem-solving, critical thinking, and innovation while providing opportunities for growth and development.`,
        matchScore: 90,
        id: assessmentResult.aiEvaluation.careerPath.toLowerCase().replace(/\s+/g, '-')
      }] : [{
        title: 'Career Path Analysis',
        description: 'We are analyzing your responses to provide personalized career recommendations. Please check back shortly.',
        matchScore: 0,
        id: 'pending'
      }],
      actionItems: [
        ...(assessmentResult.aiEvaluation?.nextSteps || []),
        'Schedule a career counseling session for personalized guidance',
        'Research educational requirements for your recommended careers',
        'Explore internship and shadowing opportunities'
      ],
      collegeRecommendations: assessmentResult.aiEvaluation?.collegeRecommendations || {
        government: [],
        private: [],
        international: []
      },
      strengths: assessmentResult.aiEvaluation?.strengths || ['Your strengths are being analyzed'],
      developmentAreas: assessmentResult.aiEvaluation?.developmentAreas || ['Your development areas are being analyzed']
    };

    // Log the formatted result for debugging
    console.log('Formatted result for frontend:', {
      careerPath: assessmentResult.aiEvaluation?.careerPath,
      strengthsCount: assessmentResult.aiEvaluation?.strengths?.length,
      developmentAreasCount: assessmentResult.aiEvaluation?.developmentAreas?.length,
      nextStepsCount: assessmentResult.aiEvaluation?.nextSteps?.length,
      hasCareerPath: !!assessmentResult.aiEvaluation?.careerPath
    });

    // Return response
    res.status(201).json({
      success: true,
      result: formattedResult
    });
  } catch (error) {
    console.error('Error in submitAssessment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit assessment',
      error: error.message
    });
  }
};

// Get assessment history
exports.getAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const assessments = await AssessmentResult.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('answers.questionId');

    res.json({
      success: true,
      assessments: assessments.map(assessment => ({
        id: assessment._id,
        date: assessment.createdAt,
        evaluation: assessment.aiEvaluation
      }))
    });
  } catch (error) {
    console.error('Error fetching assessment history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment history',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get assessment results
exports.getResults = async (req, res) => {
  try {
    const userId = req.user.userId;
    const assessmentResult = await AssessmentResult.findOne({ user: userId })
      .sort({ completedAt: -1 })
      .populate('answers.questionId');

    if (!assessmentResult) {
      return res.status(404).json({
        success: false,
        message: 'No assessment results found',
      });
    }

    // Calculate personality traits from answers
    const personalityTraits = {};
    const personalityAnswers = assessmentResult.answers.filter(a => 
      a.questionId.category === 'personality'
    );

    personalityAnswers.forEach(answer => {
      const trait = answer.questionId.trait;
      const score = answer.selectedOption.score;
      
      if (!personalityTraits[trait]) {
        personalityTraits[trait] = {
          total: 0,
          count: 0
        };
      }
      
      personalityTraits[trait].total += score;
      personalityTraits[trait].count += 1;
    });

    // Calculate average scores for each trait
    Object.keys(personalityTraits).forEach(trait => {
      personalityTraits[trait] = Math.round(
        (personalityTraits[trait].total / personalityTraits[trait].count) * 100
      );
    });

    // Format career recommendations
    const recommendedCareers = assessmentResult.aiEvaluation.careerPath ? [{
      title: assessmentResult.aiEvaluation.careerPath
        .replace(/\*\*/g, '') // Remove markdown bold
        .replace(/^[*-]\s*/, '') // Remove bullet points
        .replace(/^Recommended Career Path:\s*/, '') // Remove prefix
        .trim(),
      description: `A career path in ${assessmentResult.aiEvaluation.careerPath
        .replace(/\*\*/g, '')
        .replace(/^[*-]\s*/, '')
        .replace(/^Recommended Career Path:\s*/, '')
        .trim()} aligns well with your assessment results.`,
      matchScore: 90,
      id: assessmentResult.aiEvaluation.careerPath
        .replace(/\*\*/g, '')
        .replace(/^[*-]\s*/, '')
        .replace(/^Recommended Career Path:\s*/, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }] : [];

    // Format action items
    const actionItems = [
      ...(assessmentResult.aiEvaluation.nextSteps || []),
      'Schedule a career counseling session for personalized guidance',
      'Research educational requirements for your recommended careers',
      'Explore internship and shadowing opportunities'
    ];

    // Format college recommendations
    const collegeRecommendations = assessmentResult.aiEvaluation.collegeRecommendations || {
      government: [],
      private: [],
      international: []
    };

    // Format the response
    const formattedResult = {
      success: true,
      results: {
        id: assessmentResult._id,
        completedAt: assessmentResult.completedAt,
        personalityTraits,
        recommendedCareers,
        actionItems,
        collegeRecommendations,
        strengths: assessmentResult.aiEvaluation.strengths || [],
        developmentAreas: assessmentResult.aiEvaluation.developmentAreas || [],
        rawAIResponse: process.env.NODE_ENV === 'development' ? 
          assessmentResult.rawAIResponse : undefined
      }
    };

    console.log('Sending formatted result:', {
      careerPath: assessmentResult.aiEvaluation.careerPath,
      strengthsCount: assessmentResult.aiEvaluation.strengths?.length,
      developmentAreasCount: assessmentResult.aiEvaluation.developmentAreas?.length,
      nextStepsCount: assessmentResult.aiEvaluation.nextSteps?.length,
      collegeRecommendations: {
        government: collegeRecommendations.government.length,
        private: collegeRecommendations.private.length,
        international: collegeRecommendations.international.length
      }
    });

    res.json(formattedResult);
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment results',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get detailed career information
exports.getCareerDetails = async (req, res) => {
  try {
    const { careerId } = req.params;
    const career = await Career.findById(careerId)
      .populate('relatedCareers', 'title category description');

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found',
      });
    }

    res.json({
      success: true,
      career,
    });
  } catch (error) {
    console.error('Get career details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching career details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}; 