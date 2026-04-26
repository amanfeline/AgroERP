// src/models/User.js
// Mongoose User schema with password hashing and instance methods

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name must be at most 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'farmer', 'analyst', 'viewer'],
        message: '{VALUE} is not a supported role',
      },
      default: 'farmer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Password-reset fields — hidden by default
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpiry: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// ─── Pre-save Hook ────────────────────────────────────────────────────────────
/**
 * Hash the password with bcrypt (cost 12) only when the password field
 * has been modified (new user registration or password change).
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance Methods ─────────────────────────────────────────────────────────
/**
 * Compare a plain-text password against the stored bcrypt hash.
 * The `password` field MUST be explicitly selected before calling this.
 *
 * @param {string} plainPassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

/**
 * Return a sanitised user object safe to send to clients.
 * Excludes password, resetToken, resetTokenExpiry, and __v.
 *
 * @returns {object}
 */
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetToken;
  delete obj.resetTokenExpiry;
  delete obj.__v;
  return obj;
};

const User = model('User', userSchema);

export default User;
