import express, { Router } from 'express';
import { 
  getQuestions, 
  submitTest, 
  getTestHistory,
  getTestResultById
} from '../controllers/test.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Get all test questions
router.get('/questions', getQuestions as express.RequestHandler);

// Submit a completed test
router.post('/submit', authMiddleware as express.RequestHandler, submitTest as express.RequestHandler);

// Get user's test history
router.get('/history', authMiddleware as express.RequestHandler, getTestHistory as express.RequestHandler);

// Get a specific test result
router.get('/result/:id', authMiddleware as express.RequestHandler, getTestResultById as express.RequestHandler);

export default router; 