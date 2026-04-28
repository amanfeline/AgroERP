import { Router } from 'express';
import { generateRecommendations } from '../controllers/recommendations.controller.js';

const router = Router();
router.post('/', generateRecommendations);

export default router;
