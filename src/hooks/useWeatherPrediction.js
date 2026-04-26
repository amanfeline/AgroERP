import { useState, useCallback, useEffect } from 'react';
import { predictWeather, getSeasonalForecast } from '../services/weatherApi';

export const useWeatherPrediction = () => {
    const [prediction, setPrediction] = useState(null);
    const [seasonalForecast, setSeasonalForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Default inputs to North India if nothing provided
    const defaultInput = {
        region: "North",
        month: new Date().getMonth() + 1,
        latitude: 28.6,
        longitude: 77.2,
        avg_rainfall_mm: 120,
        humidity_pct: 65,
        prev_temp_c: 28,
        elevation_m: 216,
        soil_type: "loam",
        season: "Kharif"
    };

    const predict = useCallback(async (inputData = defaultInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await predictWeather(inputData);
            setPrediction(result);
            localStorage.setItem('lastWeatherPrediction', JSON.stringify(result));
            localStorage.setItem('lastWeatherInput', JSON.stringify(inputData));

            // Also fetch the seasonal extension
            const seasonalResult = await getSeasonalForecast(inputData);
            setSeasonalForecast(seasonalResult);

        } catch (err) {
            setError(err.message || 'Failed to predict weather');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load from cache on mount
    useEffect(() => {
        const cached = localStorage.getItem('lastWeatherPrediction');
        if (cached) {
            setPrediction(JSON.parse(cached));
        } else {
            // Auto fetch default if none exists
            predict(defaultInput);
        }
    }, [predict]);

    return {
        predict,
        prediction,
        seasonalForecast,
        isLoading,
        error
    };
};
