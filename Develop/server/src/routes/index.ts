import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public Route: Login
router.use('/auth', authRoutes);

// Protected Routes: Require Authentication
router.use('/api', authenticateToken, apiRoutes);

export default router;
