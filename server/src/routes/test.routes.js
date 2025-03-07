"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controllers/test.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all test questions
router.get('/questions', test_controller_1.getQuestions);
// Submit a completed test
router.post('/submit', auth_middleware_1.authMiddleware, test_controller_1.submitTest);
// Get user's test history
router.get('/history', auth_middleware_1.authMiddleware, test_controller_1.getTestHistory);
// Get a specific test result
router.get('/result/:id', auth_middleware_1.authMiddleware, test_controller_1.getTestResultById);
exports.default = router;
