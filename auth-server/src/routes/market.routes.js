import { Router } from 'express';
import { getLiveMarketPrices } from '../controllers/market.controller.js';

const router = Router();
router.get('/', getLiveMarketPrices);

export default router;
