from pydantic import BaseModel
from typing import List, Optional

class WeatherInput(BaseModel):
    region: str
    month: int
    latitude: float
    longitude: float
    avg_rainfall_mm: float
    humidity_pct: float
    prev_temp_c: float
    elevation_m: float
    soil_type: str
    season: str
    
class DailyForecast(BaseModel):
    day: str
    temp: float
    condition: str
    rainfall: float

class WeatherOutput(BaseModel):
    predicted_temp_c: float
    predicted_rainfall_mm: float
    predicted_humidity_pct: float
    weather_condition: str
    frost_risk: str
    drought_risk: str
    flood_risk: str
    crop_suitability_score: float
    irrigation_needed: str
    best_sowing_window: str
    confidence_score: float
    forecast_7_day: List[DailyForecast]
    advisory: str

class SeasonalForecastOutput(BaseModel):
    months: List[str]
    rainfall_mm: List[float]
    temp_c: List[float]
    risks: List[str]

class CropSpecificRequest(WeatherInput):
    crop_name: str
