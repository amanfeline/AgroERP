import express from 'express';
import { predictWeather, getSeasonalForecast, getCropSpecificPrediction } from '../controllers/weather.controller.js';

const router = express.Router();

// Notice we map these to match exactly what the frontend weatherApi.js calls
router.post('/weather', predictWeather);
router.post('/seasonal', getSeasonalForecast);
router.post('/crop-specific', getCropSpecificPrediction);

export default router;
