import React, { useState } from 'react';
import RiskBadge from './RiskBadge';
import SeasonalOutlook from './SeasonalOutlook';

const WeatherPredictor = ({
    predict,
    prediction,
    seasonalForecast,
    isLoading,
    error
}) => {
    // Initial form state
    const [formData, setFormData] = useState({
        region: "North",
        month: new Date().getMonth() + 1,
        latitude: 28.6,
        longitude: 77.2,
        avg_rainfall_mm: 120,
        humidity_pct: 65,
        prev_temp_c: 28,
        elevation_m: 200,
        soil_type: "loam",
        season: "Kharif"
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Parse numbers from range sliders/number inputs
        const parsedValue = type === 'range' || type === 'number' ? parseFloat(value) : value;
        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        predict(formData);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Input Form Column */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in-up">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-500">settings_suggest</span>
                    Prediction Parameters
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Region Select */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Region</label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-700"
                        >
                            <option value="North">North India</option>
                            <option value="South">South India</option>
                            <option value="East">East India</option>
                            <option value="West">West India</option>
                            <option value="Central India">Central India</option>
                        </select>
                    </div>

                    {/* Season Select */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Season</label>
                        <select
                            name="season"
                            value={formData.season}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-700"
                        >
                            <option value="Kharif">Kharif (Monsoon)</option>
                            <option value="Rabi">Rabi (Winter)</option>
                            <option value="Zaid">Zaid (Summer)</option>
                        </select>
                    </div>

                    {/* Soil Type Select */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Soil Type</label>
                        <select
                            name="soil_type"
                            value={formData.soil_type}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-700"
                        >
                            <option value="loam">Loam</option>
                            <option value="clay">Clay</option>
                            <option value="sandy">Sandy</option>
                            <option value="black">Black Cotton</option>
                        </select>
                    </div>

                    {/* Month Input */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Prediction Month (1-12)</label>
                        <input
                            type="number"
                            name="month"
                            min="1" max="12"
                            value={formData.month}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-700"
                        />
                    </div>

                    {/* Rainfall Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-bold text-slate-700">Baseline Rainfall</label>
                            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">{formData.avg_rainfall_mm} mm</span>
                        </div>
                        <input
                            type="range"
                            name="avg_rainfall_mm"
                            min="0" max="400" step="5"
                            value={formData.avg_rainfall_mm}
                            onChange={handleChange}
                            className="w-full accent-primary-500 cursor-pointer"
                        />
                    </div>

                    {/* Humidity Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-bold text-slate-700">Baseline Humidity</label>
                            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">{formData.humidity_pct}%</span>
                        </div>
                        <input
                            type="range"
                            name="humidity_pct"
                            min="20" max="100" step="1"
                            value={formData.humidity_pct}
                            onChange={handleChange}
                            className="w-full accent-primary-500 cursor-pointer"
                        />
                    </div>

                    {/* Previous Temp Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-bold text-slate-700">Previous Month Temp</label>
                            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">{formData.prev_temp_c}°C</span>
                        </div>
                        <input
                            type="range"
                            name="prev_temp_c"
                            min="0" max="50" step="0.5"
                            value={formData.prev_temp_c}
                            onChange={handleChange}
                            className="w-full accent-primary-500 cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none mt-6"
                    >
                        {isLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">sync</span>
                                Analyzing Data...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">psychology</span>
                                Predict Weather
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-200 flex items-start gap-2">
                            <span className="material-symbols-outlined text-base">error</span>
                            {error}
                        </div>
                    )}
                </form>
            </div>

            {/* Results Column */}
            <div className="w-full lg:w-2/3 space-y-6">
                {isLoading && !prediction ? (
                    // Skeleton State
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-pulse h-[400px]">
                        <div className="h-8 bg-slate-200 rounded w-1/4 mb-8"></div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="h-32 bg-slate-100 rounded-xl"></div>
                            <div className="h-32 bg-slate-100 rounded-xl"></div>
                            <div className="h-20 bg-slate-100 rounded-xl col-span-2"></div>
                        </div>
                    </div>
                ) : prediction ? (
                    // Results State
                    <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        {/* Main Result Card */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-lg border border-green-200">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    {Math.round(prediction.confidence_score * 100)}% Confidence
                                </span>
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 mb-8">Prediction Summary</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                                    <span className="material-symbols-outlined text-4xl text-orange-500 mb-2">thermostat</span>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Temperature</p>
                                    <p className="text-3xl font-black text-slate-900">{prediction.predicted_temp_c}°C</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                                    <span className="material-symbols-outlined text-4xl text-blue-500 mb-2">rainy</span>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Rainfall</p>
                                    <p className="text-3xl font-black text-slate-900">{prediction.predicted_rainfall_mm}mm</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                                    <span className="material-symbols-outlined text-4xl text-cyan-500 mb-2">humidity_percentage</span>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Humidity</p>
                                    <p className="text-3xl font-black text-slate-900">{prediction.predicted_humidity_pct}%</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                                    <span className="material-symbols-outlined text-4xl text-primary-500 mb-2">eco</span>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Suitability</p>
                                    <p className="text-3xl font-black text-slate-900">{prediction.crop_suitability_score}/100</p>
                                </div>
                            </div>

                            {/* Risk Assessment */}
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-4">Risk Assessment</h3>
                                <div className="flex flex-wrap gap-3">
                                    <RiskBadge label="Frost" risk={prediction.frost_risk} />
                                    <RiskBadge label="Drought" risk={prediction.drought_risk} />
                                    <RiskBadge label="Flood" risk={prediction.flood_risk} />
                                </div>
                            </div>
                        </div>

                        {/* AI Advisory */}
                        <div className="bg-primary-50 border border-primary-200 p-6 rounded-2xl shadow-sm mb-6 flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-500 text-3xl">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary-900 mb-1">AI Agronomist Advisory</h3>
                                <p className="text-primary-800 leading-relaxed">{prediction.advisory}</p>
                                <div className="mt-4 flex gap-4">
                                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-md border border-primary-200 text-primary-700">
                                        Irrigation: {prediction.irrigation_needed.toUpperCase()}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-md border border-primary-200 text-primary-700">
                                        Sowing Window: {prediction.best_sowing_window.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3-Month Seasonal Outlook Recharts Graph */}
                        {seasonalForecast && (
                            <SeasonalOutlook data={seasonalForecast} />
                        )}

                    </div>
                ) : (
                    // Empty state (should technically not happen since we auto-fetch)
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-[500px]">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">psychology</span>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Initialize Prediction Engine</h3>
                        <p className="text-slate-500 max-w-sm">Adjust parameters on the left and click predict to run the ML models and generate forecasts.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherPredictor;
