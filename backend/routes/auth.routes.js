import express from 'express';
import { register, login, getMe } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login and get token
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Protected
router.get('/me', verifyToken, getMe);

export default router;
