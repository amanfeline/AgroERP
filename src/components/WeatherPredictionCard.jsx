import React from 'react';
import RiskBadge from './RiskBadge';
import { CloudRain, Sun, Cloud, CloudLightning, Wind } from 'lucide-react';

const WeatherPredictionCard = ({ weatherData, isLoading }) => {
    if (isLoading || !weatherData) {
        return (
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-6 text-white shadow-md w-full animate-pulse h-[280px]">
                <div className="w-1/3 h-6 bg-primary-700/50 rounded mb-4"></div>
                <div className="w-2/3 h-12 bg-primary-700/50 rounded mb-6"></div>
                <div className="flex justify-between gap-4 mt-8">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="flex-1 h-16 bg-primary-700/50 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    const {
        predicted_temp_c,
        weather_condition,
        forecast_7_day,
        frost_risk,
        drought_risk,
        flood_risk,
        predicted_rainfall_mm,
        advisory
    } = weatherData;

    const renderIcon = (condition, className = "w-6 h-6 text-white") => {
        if (condition === "sunny") return <Sun className={className} />;
        if (condition === "rainy") return <CloudRain className={className} />;
        if (condition === "stormy") return <CloudLightning className={className} />;
        if (condition === "foggy") return <Wind className={className} />;
        return <Cloud className={className} />;
    };

    return (
        <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl group-hover:bg-primary-500/30 transition-all duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-primary-200 font-bold mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Current Predicted Farm Condition
                        </p>
                        <div className="flex items-center gap-4">
                            <h2 className="text-5xl font-black">{Math.round(predicted_temp_c)}°C</h2>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg capitalize">{weather_condition}</span>
                                <span className="text-sm text-primary-200">{Math.round(predicted_rainfall_mm)}mm expected rain</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
                        {renderIcon(weather_condition, "w-10 h-10 text-white")}
                    </div>
                </div>

                {/* Risk Badges */}
                <div className="flex flex-wrap gap-2 mb-6 bg-black/20 p-3 rounded-xl border border-white/5">
                    <RiskBadge label="Frost Risk" risk={frost_risk} />
                    <RiskBadge label="Drought Risk" risk={drought_risk} />
                    <RiskBadge label="Flood Risk" risk={flood_risk} />
                </div>

                {/* Micro Advisory */}
                <div className="mb-6 pl-4 border-l-4 border-primary-400">
                    <p className="text-sm text-primary-50 leading-relaxed font-medium italic">
                        "{advisory}"
                    </p>
                </div>

                {/* 7 Day Forecast Row */}
                <div className="grid grid-cols-7 gap-2">
                    {forecast_7_day?.map((day, ix) => (
                        <div key={ix} className="flex flex-col items-center bg-white/5 hover:bg-white/10 transition-colors p-2 rounded-xl border border-white/5">
                            <span className="text-xs font-bold text-primary-200 mb-1">{day.day}</span>
                            {renderIcon(day.condition, "w-5 h-5 mb-1 text-white/90")}
                            <span className="text-sm font-bold">{Math.round(day.temp)}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherPredictionCard;
