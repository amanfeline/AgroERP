// src/middlewares/auth.middleware.js
// JWT protection and role-based authorization

import { verifyToken } from '../utils/jwt.js';
import { AppError, asyncHandler } from '../utils/error.js';
import User from '../models/User.js';

/**
 * protect — extract Bearer token from Authorization header,
 * verify it, load the full user from DB, attach to req.user.
 *
 * Throws 401 if:
 *  - No / malformed Authorization header
 *  - Token is invalid or expired
 *  - User no longer exists in the DB
 *  - User account is deactivated
 */
export const protect = asyncHandler(async (req, _res, next) => {
  // 1. Extract token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication required. Please log in.', 401));
  }
  const token = authHeader.split(' ')[1];

  // 2. Verify token
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }

  // 3. Confirm user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4. Confirm account is active
  if (!currentUser.isActive) {
    return next(new AppError('Your account has been deactivated. Contact an administrator.', 401));
  }

  // 5. Attach user to request
  req.user = currentUser;
  next();
});

/**
 * authorize — factory that returns middleware restricting access to
 * users whose role is in the provided allowedRoles list.
 *
 * Must be used AFTER the `protect` middleware.
 *
 * @param {...string} roles – Allowed role names
 * @returns {Function} Express middleware
 */
export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. This action requires one of the following roles: ${roles.join(', ')}.`,
          403
        )
      );
    }
    next();
  };
