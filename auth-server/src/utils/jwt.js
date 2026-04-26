// src/utils/jwt.js
// JWT helper functions

import jwt from 'jsonwebtoken';

/**
 * Sign a payload into a JWT using the application secret.
 *
 * @param {object} payload   – Data to embed in the token
 * @param {string} [expiresIn] – Expiry string (e.g. '30m'); defaults to JWT_EXPIRES_IN env
 * @returns {string}  Signed JWT
 */
export const signToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

/**
 * Verify and decode a JWT.
 *
 * @param {string} token – The JWT string to verify
 * @returns {object}  Decoded payload
 * @throws  {JsonWebTokenError | TokenExpiredError}
 */
export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
