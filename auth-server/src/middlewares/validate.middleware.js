// src/middlewares/validate.middleware.js
// express-validator result consumer

import { validationResult } from 'express-validator';

/**
 * Run after express-validator chains.
 * If there are validation errors, respond immediately with HTTP 400
 * and a structured errors array compatible with the frontend contract:
 *
 *   { success: false, errors: [{ field: string, message: string }] }
 *
 * Otherwise call next() to continue to the controller.
 */
const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path ?? err.param,
      message: err.msg,
    }));
    return res.status(400).json({ success: false, errors });
  }
  next();
};

export default validate;
