// src/app.js
// Express application factory — configure middleware, routes, error handler

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { AppError } from './utils/error.js';

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,          // allow cookies / Authorization headers
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));          // guard against large payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth',  authRoutes);
app.use('/api/v1/admin', adminRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.all('*', (req, _res, next) => {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl} on this server.`, 404));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
/**
 * Centralised error handler that normalises:
 *  - Mongoose duplicate key (11000)  → 409 Conflict
 *  - Mongoose ValidationError        → 400 Bad Request
 *  - JWT errors                      → 401 Unauthorized
 *  - Operational AppErrors           → pass through as-is
 *  - Unhandled / programming errors  → 500 (no details in production)
 */
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  let { statusCode = 500, message, isOperational } = err;

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field';
    message = `An account with this ${field} already exists.`;
    statusCode = 409;
    isOperational = true;
  }

  // Mongoose schema validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    message = 'Invalid or expired authentication token. Please log in again.';
    statusCode = 401;
    isOperational = true;
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = `Invalid value for field "${err.path}".`;
    statusCode = 400;
    isOperational = true;
  }

  // Log non-operational errors (programming bugs, etc.)
  if (!isOperational) {
    console.error('💥 UNHANDLED ERROR:', err);
  }

  // In production, don't leak internal details for unknown errors
  const responseMessage =
    isOperational || process.env.NODE_ENV === 'development'
      ? message
      : 'Something went wrong. Please try again later.';

  res.status(statusCode).json({ success: false, message: responseMessage });
});

export default app;
