import express from 'express';
import { getMyCrops } from '../controllers/crops.controller.js';

const router = express.Router();

router.get('/', getMyCrops);

export default router;
