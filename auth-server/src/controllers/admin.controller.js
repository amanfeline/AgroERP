// src/controllers/admin.controller.js
// Admin-only user management actions

import User from '../models/User.js';
import { AppError, asyncHandler } from '../utils/error.js';

// ─── GET /api/v1/admin/users ──────────────────────────────────────────────────
/**
 * List all users.
 * Excludes sensitive fields (password, resetToken, resetTokenExpiry) via schema defaults.
 */
export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, count: users.length, users });
});

// ─── PATCH /api/v1/admin/users/:id/role ──────────────────────────────────────
/**
 * Update a user's role.
 * Validates that the new role is one of the allowed values.
 */
export const updateRole = asyncHandler(async (req, res, next) => {
  const { role } = req.body;
  const allowedRoles = ['admin', 'farmer', 'analyst', 'viewer'];

  if (!allowedRoles.includes(role)) {
    return next(new AppError(`Role must be one of: ${allowedRoles.join(', ')}.`, 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) return next(new AppError('User not found.', 404));

  res.json({ success: true, user: user.toSafeObject() });
});

// ─── PATCH /api/v1/admin/users/:id/deactivate ────────────────────────────────
/**
 * Deactivate a user account (soft-delete / disable login).
 */
export const deactivateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!user) return next(new AppError('User not found.', 404));

  res.json({
    success: true,
    message: `User "${user.name}" has been deactivated.`,
    user: user.toSafeObject(),
  });
});

// ─── PATCH /api/v1/admin/users/:id/activate ──────────────────────────────────
/**
 * Re-activate a previously deactivated user account.
 */
export const activateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  if (!user) return next(new AppError('User not found.', 404));

  res.json({
    success: true,
    message: `User "${user.name}" has been activated.`,
    user: user.toSafeObject(),
  });
});
