import express, { Router } from 'express';
import { register, login, verifyToken } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Register a new user
router.post('/register', register as express.RequestHandler);

// Login user
router.post('/login', login as express.RequestHandler);

// Verify user token
router.get('/verify', authMiddleware as express.RequestHandler, verifyToken as express.RequestHandler);

export default router; 