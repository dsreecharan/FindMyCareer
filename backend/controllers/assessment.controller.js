const { Question, AssessmentResult } = require('../models/assessment.model');
const Career = require('../models/career.model');
const User = require('../models/user.model');

// Get assessment questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select('-options.score');
    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Submit assessment answers
exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.userId;

    // Get all questions with their correct scores
    const questions = await Question.find();
    
    // Calculate scores for each category
    const personalityTraits = [];
    const skillLevels = [];
    const interests = [];
    const values = [];

    // Process answers and calculate scores
    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (!question) continue;

      const selectedOption = question.options.find(opt => opt.text === answer.selectedOption);
      if (!selectedOption) continue;

      const score = selectedOption.score;

      switch (question.category) {
        case 'personality':
          personalityTraits.push({
            trait: question.text,
            score,
          });
          break;
        case 'skills':
          skillLevels.push({
            skill: question.text,
            level: score,
          });
          break;
        case 'interests':
          interests.push({
            category: question.text,
            score,
          });
          break;
        case 'values':
          values.push({
            value: question.text,
            importance: score,
          });
          break;
      }
    }

    // Get all careers
    const careers = await Career.find({ isActive: true });

    // Calculate match scores for each career
    const recommendedCareers = careers
      .map(career => {
        const matchScore = career.calculateMatchScore({
          personalityTraits,
          skillLevels,
          interests,
          values,
        });

        // Generate reasons for recommendation
        const reasons = [];
        const topTraits = personalityTraits
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(trait => trait.trait);

        const matchingTraits = career.personalityTraits
          .filter(trait => topTraits.includes(trait.trait))
          .map(trait => trait.trait);

        if (matchingTraits.length > 0) {
          reasons.push(`Strong match with required personality traits: ${matchingTraits.join(', ')}`);
        }

        const topSkills = skillLevels
          .sort((a, b) => b.level - a.level)
          .slice(0, 3)
          .map(skill => skill.skill);

        const matchingSkills = career.requiredSkills
          .filter(skill => topSkills.includes(skill.skill))
          .map(skill => skill.skill);

        if (matchingSkills.length > 0) {
          reasons.push(`Strong match with required skills: ${matchingSkills.join(', ')}`);
        }

        if (interests.some(interest => interest.category === career.category)) {
          reasons.push(`Matches your interest in ${career.category}`);
        }

        return {
          career: career._id,
          matchScore,
          reasons,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    // Create assessment result
    const assessmentResult = new AssessmentResult({
      user: userId,
      answers,
      personalityTraits,
      skillLevels,
      interests,
      values,
      recommendedCareers,
    });

    await assessmentResult.save();

    // Update user's assessment results
    await User.findByIdAndUpdate(userId, {
      $push: { assessmentResults: assessmentResult._id },
    });

    res.status(201).json({
      success: true,
      assessmentResult,
    });
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting assessment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get assessment results
exports.getResults = async (req, res) => {
  try {
    const userId = req.user.userId;
    const assessmentResult = await AssessmentResult.findOne({ user: userId })
      .sort({ completedAt: -1 })
      .populate('recommendedCareers.career');

    if (!assessmentResult) {
      return res.status(404).json({
        success: false,
        message: 'No assessment results found',
      });
    }

    res.json({
      success: true,
      assessmentResult,
    });
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