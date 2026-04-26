// src/utils/error.js
// Custom AppError class and asyncHandler utility

/**
 * Operational (expected) errors that we can send to clients.
 * Non-operational errors (bugs, DB driver crashes) are NOT AppErrors.
 */
export class AppError extends Error {
  /**
   * @param {string} message  – Human-readable error message
   * @param {number} statusCode – HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture clean stack trace (V8 only)
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Wraps an async Express route handler and forwards any thrown errors
 * to the next() error middleware — eliminates try/catch boilerplate.
 *
 * @param {Function} fn  – async (req, res, next) handler
 * @returns {Function}   – Express-compatible route handler
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
