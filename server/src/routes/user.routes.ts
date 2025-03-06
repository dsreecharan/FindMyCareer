import express, { Router } from 'express';
import { 
  getProfile, 
  updateProfile, 
  saveCareer,
  removeSavedCareer,
  getSavedCareers
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All routes require authentication
router.use(authMiddleware as express.RequestHandler);

// Get user profile
router.get('/profile', getProfile as express.RequestHandler);

// Update user profile
router.put('/profile', updateProfile as express.RequestHandler);

// Save a career to user's saved list
router.post('/careers/save/:careerId', saveCareer as express.RequestHandler);

// Remove a saved career
router.delete('/careers/save/:careerId', removeSavedCareer as express.RequestHandler);

// Get all saved careers
router.get('/careers/saved', getSavedCareers as express.RequestHandler);

export default router; 