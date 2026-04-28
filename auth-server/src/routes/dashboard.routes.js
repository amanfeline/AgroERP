import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';

const router = express.Router();

// Route to get dashboard aggregations
router.get('/', getDashboardData);

export default router;
