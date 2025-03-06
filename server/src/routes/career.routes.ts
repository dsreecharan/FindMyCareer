import express, { Router } from 'express';
import { 
  getAllCareers, 
  getCareerById, 
  getCareersByIds,
  searchCareers
} from '../controllers/career.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Get all careers
router.get('/', getAllCareers as express.RequestHandler);

// Get a career by ID
router.get('/:id', getCareerById as express.RequestHandler);

// Get multiple careers by IDs
router.post('/batch', getCareersByIds as express.RequestHandler);

// Search careers
router.get('/search/:query', searchCareers as express.RequestHandler);

export default router; 