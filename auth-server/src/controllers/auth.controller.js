// src/controllers/auth.controller.js
// Register, Login, Me, Forgot-Password, Reset-Password

import crypto from 'crypto';
import User from '../models/User.js';
import { signToken, verifyToken } from '../utils/jwt.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import { AppError, asyncHandler } from '../utils/error.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Create a short-lived JWT specifically for password reset.
 * The token carries type:"reset" so it cannot be used as a session token.
 */
const createResetJwt = (userId) =>
  signToken(
    { id: userId, type: 'reset' },
    `${process.env.RESET_TOKEN_EXPIRES_MIN}m`
  );

/**
 * Hash a string with SHA-256 and return the hex digest.
 * Used to store / compare reset tokens in the database.
 */
const sha256 = (str) =>
  crypto.createHash('sha256').update(str).digest('hex');

// ─── POST /api/v1/auth/register ───────────────────────────────────────────────
/**
 * Create a new user account.
 * Returns 201 with { success, message, user }.
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: 'Account created successfully. You can now log in.',
    user: user.toSafeObject(),
  });
});

// ─── POST /api/v1/auth/login ──────────────────────────────────────────────────
/**
 * Authenticate a user with email + password.
 * Returns { success, accessToken, user }.
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Find user and explicitly include the password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password.', 401));
  }

  // 2. Check account is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated. Contact an administrator.', 401));
  }

  // 3. Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid email or password.', 401));
  }

  // 4. Sign access token
  const accessToken = signToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    accessToken,
    user: user.toSafeObject(),
  });
});

// ─── GET /api/v1/auth/me ──────────────────────────────────────────────────────
/**
 * Return the currently authenticated user.
 * req.user is populated by the `protect` middleware.
 */
export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeObject(),
  });
});

// ─── POST /api/v1/auth/forgot-password ───────────────────────────────────────
/**
 * Initiate a password reset.
 *
 * Security contract:
 * - Always returns HTTP 202 (Accepted) — does NOT reveal whether the email
 *   exists in the database to prevent user enumeration attacks.
 * - Reset token is signed as a short-lived JWT with type:"reset",
 *   then SHA-256 hashed before storage so a DB leak doesn't expose raw tokens.
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Run the same response path whether user exists or not
  if (user) {
    try {
      const resetToken = createResetJwt(user._id.toString());
      const hashedToken = sha256(resetToken);
      const expiresMs =
        Number(process.env.RESET_TOKEN_EXPIRES_MIN) * 60 * 1000;

      // Persist hashed token + expiry (use direct update to avoid re-hashing password)
      await User.findByIdAndUpdate(user._id, {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + expiresMs),
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await sendPasswordResetEmail(user.email, resetLink);
    } catch (err) {
      // Log internally but never surface to client
      console.error('Forgot-password email error:', err.message);
    }
  }

  // Always return 202 regardless of whether user existed
  res.status(202).json({
    success: true,
    message:
      'If an account with that email exists, a password reset link has been sent.',
  });
});

// ─── POST /api/v1/auth/reset-password ────────────────────────────────────────
/**
 * Complete a password reset.
 *
 * Flow:
 * 1. Decode & verify the reset JWT (confirms type:"reset" and expiry).
 * 2. SHA-256 hash the raw token and find a matching DB record.
 * 3. Confirm the stored expiry hasn't passed (belt-and-suspenders with JWT expiry).
 * 4. Update password, clear reset fields.
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;

  // 1. Decode JWT (verifyToken throws on invalid/expired)
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return next(new AppError('Reset link is invalid or has expired.', 400));
  }

  // 2. Ensure this is a reset token, not a session token
  if (decoded.type !== 'reset') {
    return next(new AppError('Invalid reset token.', 400));
  }

  // 3. Find user with matching hashed token
  const hashedToken = sha256(token);
  const user = await User.findOne({
    _id: decoded.id,
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  }).select('+resetToken +resetTokenExpiry +password');

  if (!user) {
    return next(new AppError('Reset link is invalid or has expired.', 400));
  }

  // 4. Update password and clear reset fields
  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save(); // triggers pre-save bcrypt hook

  res.json({
    success: true,
    message: 'Password reset successful. You can now log in with your new password.',
  });
});
