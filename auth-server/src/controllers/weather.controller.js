import { asyncHandler } from '../utils/error.js';

export const predictWeather = asyncHandler(async (req, res) => {
    // Generate simulated dynamic weather prediction based on input
    const { region, season, soil_type, avg_rainfall_mm, humidity_pct, prev_temp_c } = req.body;
    
    // Dynamic generation logic
    const crop_suitability = Math.min(100, Math.max(0, 85 + (Math.random() * 10 - 5)));

    const result = {
        success: true,
        predicted_temp_c: prev_temp_c ? Math.round((prev_temp_c + (Math.random() * 4 - 2)) * 10) / 10 : 30.5,
        predicted_rainfall_mm: avg_rainfall_mm ? Math.round(avg_rainfall_mm + (Math.random() * 20 - 10)) : 110,
        predicted_humidity_pct: humidity_pct ? Math.round(humidity_pct + (Math.random() * 10 - 5)) : 70,
        frost_risk: "Low",
        drought_risk: "Medium",
        flood_risk: "Low",
        advisory: `Based on your ${soil_type} soil and current humidity, we recommend implementing drip irrigation. Focus on early morning watering.`,
        irrigation_needed: "Moderate",
        best_sowing_window: "Mid June to Early July",
        confidence_score: 0.88,
        crop_suitability_score: Math.round(crop_suitability)
    };

    res.status(200).json(result);
});

export const getSeasonalForecast = asyncHandler(async (req, res) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentIdx = new Date().getMonth();

    res.status(200).json({
        success: true,
        months: [months[(currentIdx + 1) % 12], months[(currentIdx + 2) % 12], months[(currentIdx + 3) % 12]],
        rainfall_mm: [120, 145, 90],
        temp_c: [28.5, 29.2, 31.0],
        risks: ["Normal", "High Rain", "Dry"]
    });
});

export const getCropSpecificPrediction = asyncHandler(async (req, res) => {
    const { crop } = req.body;
    
    res.status(200).json({
        success: true,
        crop: crop || 'General',
        growthStage: 'Vegetative',
        waterRequirement: 'High',
        diseaseRisk: 'Low'
    });
});
