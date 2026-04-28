// src/routes/auth.routes.js
// /api/v1/auth — public + protected auth endpoints

import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';

import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
/**
 * authLimiter: 20 requests per 15 minutes per IP on all auth routes.
 * A shared limiter is defined here so it applies to every route in this router.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for local development
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

// ─── Validation Chains ────────────────────────────────────────────────────────
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 80 }).withMessage('Name must be 2–80 characters.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('role')
    .optional()
    .isIn(['admin', 'farmer', 'analyst', 'viewer'])
    .withMessage('Role must be one of: admin, farmer, analyst, viewer.'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.'),
];

const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body('token')
    .notEmpty().withMessage('Reset token is required.'),
  body('password')
    .notEmpty().withMessage('New password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// Apply rate limiter to all auth routes
router.use(authLimiter);

router.post('/register',        registerValidation,        validate, register);
router.post('/login',           loginValidation,           validate, login);
router.get('/me',                                                     protect, getMe);
router.post('/forgot-password', forgotPasswordValidation,  validate, forgotPassword);
router.post('/reset-password',  resetPasswordValidation,   validate, resetPassword);

export default router;
