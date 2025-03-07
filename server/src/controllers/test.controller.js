"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestResultById = exports.getTestHistory = exports.submitTest = exports.getQuestions = void 0;
const Question_model_1 = __importDefault(require("../models/Question.model"));
const TestResult_model_1 = __importDefault(require("../models/TestResult.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const Career_model_1 = __importDefault(require("../models/Career.model"));
const csvParser_1 = require("../utils/csvParser");
const mongoose_1 = __importDefault(require("mongoose"));
// Get all test questions
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield Question_model_1.default.find().sort({ order: 1 });
        res.json(questions);
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getQuestions = getQuestions;
// Submit a completed test
const submitTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { responses } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
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
            const question = yield Question_model_1.default.findOne({
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
        const recommendationData = yield (0, csvParser_1.loadCareerRecommendationData)();
        // Map scores to career recommendations
        const careerRecommendations = (0, csvParser_1.mapScoresToCareers)(scores, recommendationData);
        // Get top 5 recommended careers
        const topRecommendations = careerRecommendations.slice(0, 5);
        // Find career IDs in the database based on titles
        const recommendedCareerIds = [];
        for (const rec of topRecommendations) {
            const career = yield Career_model_1.default.findOne({ title: rec.careerTitle });
            if (career) {
                recommendedCareerIds.push(career._id);
            }
        }
        // Create test result
        const testResult = new TestResult_model_1.default({
            user: userId,
            responses,
            scores,
            recommendedCareers: recommendedCareerIds,
            completed: true,
        });
        yield testResult.save();
        // Update user's test history
        yield User_model_1.default.findByIdAndUpdate(userId, {
            $push: { testHistory: testResult._id }
        });
        // Return result with populated career details
        const populatedResult = yield TestResult_model_1.default.findById(testResult._id)
            .populate('recommendedCareers');
        res.status(201).json({
            message: 'Test completed successfully',
            result: populatedResult,
            recommendations: topRecommendations,
        });
    }
    catch (error) {
        console.error('Error submitting test:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.submitTest = submitTest;
// Get user's test history
const getTestHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = yield User_model_1.default.findById(userId).populate({
            path: 'testHistory',
            options: { sort: { date: -1 } }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.testHistory);
    }
    catch (error) {
        console.error('Error fetching test history:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getTestHistory = getTestHistory;
// Get a specific test result
const getTestResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resultId = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(resultId)) {
            return res.status(400).json({ message: 'Invalid test result ID' });
        }
        const testResult = yield TestResult_model_1.default.findById(resultId)
            .populate('recommendedCareers');
        if (!testResult) {
            return res.status(404).json({ message: 'Test result not found' });
        }
        // Check if the result belongs to the requesting user
        if (testResult.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to test result' });
        }
        res.json(testResult);
    }
    catch (error) {
        console.error('Error fetching test result:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getTestResultById = getTestResultById;
