const BASE_URL = "http://localhost:8000";

export const predictWeather = async (inputData) => {
    try {
        const response = await fetch(`${BASE_URL}/predict/weather`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputData)
        });
        if (!response.ok) throw new Error("Weather Prediction Failed");
        return await response.json();
    } catch (error) {
        console.error("API Error (predictWeather):", error);
        throw error;
    }
};

export const getSeasonalForecast = async (inputData) => {
    try {
        const response = await fetch(`${BASE_URL}/predict/seasonal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputData)
        });
        if (!response.ok) throw new Error("Seasonal Forecast Failed");
        return await response.json();
    } catch (error) {
        console.error("API Error (getSeasonalForecast):", error);
        throw error;
    }
};

export const getCropSpecificPrediction = async (inputData) => {
    try {
        const response = await fetch(`${BASE_URL}/predict/crop-specific`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputData)
        });
        if (!response.ok) throw new Error("Crop Specific Prediction Failed");
        return await response.json();
    } catch (error) {
        console.error("API Error (getCropSpecificPrediction):", error);
        throw error;
    }
};

export const getModelAccuracy = async () => {
    try {
        const response = await fetch(`${BASE_URL}/model/accuracy`);
        if (!response.ok) throw new Error("Failed to fetch model accuracy");
        return await response.json();
    } catch (error) {
        console.error("API Error (getModelAccuracy):", error);
        throw error;
    }
};
