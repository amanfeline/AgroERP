import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import WeatherPredictor from '../components/WeatherPredictor';
import { useWeatherPrediction } from '../hooks/useWeatherPrediction';

const WeatherIntelligencePage = () => {
    const weather = useWeatherPrediction();

    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="AI Weather Intelligence" />

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Weather & Climate Intelligence</h1>
                            <p className="text-slate-500 font-medium text-lg">Powered by Machine Learning ensemble models trained on over 10,000 regional data points.</p>
                        </div>

                        <WeatherPredictor {...weather} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WeatherIntelligencePage;
