import pandas as pd
import numpy as np
import joblib
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.compose import ColumnTransformer
import os

def generate_synthetic_data(num_rows=10000):
    print("Generating synthetic weather data...")
    np.random.seed(42)
    
    regions = ["North", "South", "East", "West", "Central India"]
    months = np.arange(1, 13)
    soil_types = ["clay", "loam", "sandy", "black"]
    seasons = ["Kharif", "Rabi", "Zaid"]
    
    data = []
    
    for _ in range(num_rows):
        region = np.random.choice(regions)
        month = np.random.choice(months)
        
        # Region-specific logic
        if region == "North":
            lat, lon = np.random.uniform(28.0, 37.0), np.random.uniform(74.0, 80.0)
            base_temp = 25 - abs(month - 6) * 2  # Hotter in summer, colder in winter
        elif region == "South":
            lat, lon = np.random.uniform(8.0, 15.0), np.random.uniform(74.0, 80.0)
            base_temp = 30 - abs(month - 6) * 1  # More stable year round
        elif region == "East":
            lat, lon = np.random.uniform(20.0, 27.0), np.random.uniform(85.0, 97.0)
            base_temp = 28 - abs(month - 6) * 1.5
        elif region == "West":
            lat, lon = np.random.uniform(19.0, 25.0), np.random.uniform(68.0, 75.0)
            base_temp = 32 - abs(month - 6) * 1.5
        else: # Central
            lat, lon = np.random.uniform(18.0, 25.0), np.random.uniform(75.0, 82.0)
            base_temp = 30 - abs(month - 6) * 2

        # Season logic
        if month in [6, 7, 8, 9, 10]:
            season = "Kharif"
            rainfall_multiplier = 2.5 # Monsoon
            humidity_base = 75
        elif month in [11, 12, 1, 2, 3]:
            season = "Rabi"
            rainfall_multiplier = 0.5
            humidity_base = 45
        else:
            season = "Zaid"
            rainfall_multiplier = 0.2
            humidity_base = 30
            
        elevation_m = np.random.uniform(0, 2000)
        temp_reduction = (elevation_m / 1000) * 6.5 # Approx temp lapse rate
        
        prev_temp_c = max(5, base_temp - temp_reduction + np.random.normal(0, 2))
        avg_rainfall_mm = max(0, np.random.normal(50 * rainfall_multiplier, 30))
        humidity_pct = min(100, max(20, humidity_base + np.random.normal(0, 10)))
        soil_type = np.random.choice(soil_types)
        
        # Generate Target Outputs
        predicted_temp_c = prev_temp_c + np.random.normal(0, 1.5)
        predicted_rainfall_mm = max(0, avg_rainfall_mm + np.random.normal(0, 20))
        predicted_humidity_pct = min(100, max(20, humidity_pct + np.random.normal(0, 5)))
        
        # Classification Targets
        if predicted_rainfall_mm > 150: weather_condition = "stormy"
        elif predicted_rainfall_mm > 20: weather_condition = "rainy"
        elif predicted_humidity_pct > 80 and predicted_temp_c < 15: weather_condition = "foggy"
        elif predicted_humidity_pct < 40 and predicted_temp_c > 35: weather_condition = "sunny"
        else: weather_condition = np.random.choice(["sunny", "cloudy"], p=[0.7, 0.3])
            
        if predicted_temp_c < 4: frost_risk = "high"
        elif predicted_temp_c < 8: frost_risk = "medium"
        elif predicted_temp_c < 12: frost_risk = "low"
        else: frost_risk = "none"
            
        if predicted_rainfall_mm < 10 and predicted_temp_c > 35: drought_risk = "high"
        elif predicted_rainfall_mm < 30 and predicted_temp_c > 30: drought_risk = "medium"
        elif predicted_rainfall_mm < 50: drought_risk = "low"
        else: drought_risk = "none"
            
        if predicted_rainfall_mm > 250: flood_risk = "high"
        elif predicted_rainfall_mm > 150: flood_risk = "medium"
        elif predicted_rainfall_mm > 100: flood_risk = "low"
        else: flood_risk = "none"
            
        crop_suitability_score = min(100, max(0, 100 - (abs(25 - predicted_temp_c)*2) - (abs(100 - predicted_rainfall_mm)*0.2)))
        
        irrigation_needed = "yes" if predicted_rainfall_mm < 50 or predicted_temp_c > 32 else "no"
        
        if crop_suitability_score > 80: best_sowing_window = "optimal"
        elif crop_suitability_score > 60: best_sowing_window = "early"
        elif crop_suitability_score > 40: best_sowing_window = "late"
        else: best_sowing_window = "avoid"

        data.append([
            region, month, lat, lon, avg_rainfall_mm, humidity_pct, prev_temp_c, elevation_m, soil_type, season,
            predicted_temp_c, predicted_rainfall_mm, predicted_humidity_pct,
            weather_condition, frost_risk, drought_risk, flood_risk,
            crop_suitability_score, irrigation_needed, best_sowing_window
        ])
        
    cols = [
        "region", "month", "latitude", "longitude", "avg_rainfall_mm", "humidity_pct", "prev_temp_c", "elevation_m", "soil_type", "season",
        "predicted_temp_c", "predicted_rainfall_mm", "predicted_humidity_pct",
        "weather_condition", "frost_risk", "drought_risk", "flood_risk",
        "crop_suitability_score", "irrigation_needed", "best_sowing_window"
    ]
    
    df = pd.DataFrame(data, columns=cols)
    os.makedirs("data", exist_ok=True)
    df.to_csv("data/synthetic_weather_data.csv", index=False)
    print(f"Generated {len(df)} rows. Saved to data/synthetic_weather_data.csv")
    return df

def train_and_save_models(df):
    print("Training models...")
    os.makedirs("models", exist_ok=True)
    
    # Input features
    categorical_features = ["region", "soil_type", "season"]
    numerical_features = ["month", "latitude", "longitude", "avg_rainfall_mm", "humidity_pct", "prev_temp_c", "elevation_m"]
    
    # Preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
    
    X = df[categorical_features + numerical_features]
    
    # 1. Temperature Regressor
    print("Training temp_regressor...")
    temp_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42))])
    temp_pipe.fit(X, df["predicted_temp_c"])
    joblib.dump(temp_pipe, "models/temp_regressor.pkl")
    
    # 2. Rainfall Regressor
    print("Training rainfall_regressor...")
    rain_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42))])
    rain_pipe.fit(X, df["predicted_rainfall_mm"])
    joblib.dump(rain_pipe, "models/rainfall_regressor.pkl")
    
    # 3. Humidity Regressor
    print("Training humidity_regressor...")
    hum_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42))])
    hum_pipe.fit(X, df["predicted_humidity_pct"])
    joblib.dump(hum_pipe, "models/humidity_regressor.pkl")
    
    # 4. Suitability Regressor
    print("Training suitability_regressor...")
    suit_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42))])
    suit_pipe.fit(X, df["crop_suitability_score"])
    joblib.dump(suit_pipe, "models/suitability_regressor.pkl")
    
    # 5. Condition Classifier
    print("Training condition_classifier...")
    cond_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    cond_pipe.fit(X, df["weather_condition"])
    joblib.dump(cond_pipe, "models/condition_classifier.pkl")
    
    # 6. Risk Classifier (Drought)
    print("Training drought_classifier...")
    drought_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    drought_pipe.fit(X, df["drought_risk"])
    joblib.dump(drought_pipe, "models/drought_classifier.pkl")
    
    # 7. Risk Classifier (Flood)
    print("Training flood_classifier...")
    flood_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    flood_pipe.fit(X, df["flood_risk"])
    joblib.dump(flood_pipe, "models/flood_classifier.pkl")
    
    # 8. Risk Classifier (Frost)
    print("Training frost_classifier...")
    frost_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    frost_pipe.fit(X, df["frost_risk"])
    joblib.dump(frost_pipe, "models/frost_classifier.pkl")
    
    # 9. Irrigation Classifier
    print("Training irrigation_classifier...")
    irr_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    irr_pipe.fit(X, df["irrigation_needed"])
    joblib.dump(irr_pipe, "models/irrigation_classifier.pkl")
    
    # 10. Sowing Window Classifier
    print("Training sowing_classifier...")
    sow_pipe = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42))])
    sow_pipe.fit(X, df["best_sowing_window"])
    joblib.dump(sow_pipe, "models/sowing_classifier.pkl")

    print(f"Model training complete. Saved 10 .pkl files to models/ directory. R^2 Temp Score: {temp_pipe.score(X, df['predicted_temp_c']):.2f}")

if __name__ == "__main__":
    df = generate_synthetic_data(10000)
    train_and_save_models(df)
