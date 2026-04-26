// src/routes/admin.routes.js
// /api/v1/admin — JWT-protected, admin-role-only endpoints

import { Router } from 'express';

import {
  listUsers,
  updateRole,
  deactivateUser,
  activateUser,
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// All admin routes require a valid JWT *and* the 'admin' role
router.use(protect, authorize('admin'));

router.get('/users',                   listUsers);
router.patch('/users/:id/role',        updateRole);
router.patch('/users/:id/deactivate',  deactivateUser);
router.patch('/users/:id/activate',    activateUser);

export default router;
