import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { ExploreCropCard } from '../components/CropCard';
import { exploreCrops } from '../data/mockData';
import { Sprout, TrendingUp, HandCoins, Building2, Sun, Droplets, MapPin } from 'lucide-react';
import { useWeatherPrediction } from '../hooks/useWeatherPrediction';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLivePrices } from '../services/marketApi';

const ExplorePage = () => {
    const { prediction } = useWeatherPrediction();
    const { user } = useAuth();
    const { data: livePrices, isLoading: isPricesLoading } = useLivePrices("India");
    const [filterAiMatch, setFilterAiMatch] = useState(false);
    const [showAllCrops, setShowAllCrops] = useState(false);
    const [engineData, setEngineData] = useState({ profitableCrops: [], optimizedRecommendations: [] });

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!user) return; 

            try {
                const response = await fetch('http://localhost:8000/api/recommendations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: user.location || 'Unknown',
                        soilType: user.soilType || 'Alluvial',
                        landSize: user.landCapacity || '10'
                    })
                });
                
                const result = await response.json();
                if (result.success) {
                    setEngineData(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch smart recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [user]);

    // Simulate matching some crops randomly since we don't have enough backend model granularity for every individual string crop name
    const isAiMatch = prediction?.best_sowing_window === 'optimal';

    // In a real app we'd map crop to suitability score directly. For demo, we apply the match if condition is optimal.
    const displayedCrops = filterAiMatch
        ? exploreCrops.filter(c => prediction?.crop_suitability_score > 70)
        : exploreCrops;

    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Hero Banner - Kharif Season */}
                        <div className="w-full rounded-2xl overflow-hidden relative shadow-xl min-h-[300px] p-10 flex flex-col justify-end" style={{ background: 'linear-gradient(135deg, #0d3320 0%, #1a5c38 50%, #0f4028 100%)' }}>
                            {/* Background farm image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-15"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1500&auto=format&fit=crop')" }}
                            ></div>
                            {/* Green glow orbs */}
                            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }}></div>
                            <div className="absolute -bottom-10 left-[35%] w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #86efac 0%, transparent 70%)' }}></div>
                            {/* Bottom fade */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            {/* Season badge top-right */}
                            <div className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)' }}>
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-green-300 text-xs font-bold uppercase tracking-widest">Season Active</span>
                            </div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-4 text-[10px] font-black uppercase tracking-widest text-green-200" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
                                    <span className="material-symbols-outlined text-[12px] text-green-300">calendar_month</span>
                                    SEASONAL FOCUS · KHARIF 2025
                                </span>
                                <h1 className="text-4xl font-black text-white mb-3 drop-shadow-lg">Kharif Season Preparation</h1>
                                <p className="text-green-100/80 font-medium max-w-2xl text-base mb-6">
                                    Get ahead of the curve. Analyze soil moisture predictions and discover the best yielding crops for your specific region before planting begins.
                                </p>
                                {/* Stat chips */}
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                        <Droplets className="w-4 h-4 text-blue-300" />
                                        <span className="text-white text-xs font-bold">Monsoon Onset: Jun 5</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                        <Sun className="w-4 h-4 text-amber-300" />
                                        <span className="text-white text-xs font-bold">Avg Temp: 28°C</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                        <Sprout className="w-4 h-4 text-green-300" />
                                        <span className="text-white text-xs font-bold">10 Crops Recommended</span>
                                    </div>
                                    {user?.location && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                            <MapPin className="w-4 h-4 text-green-300" />
                                            <span className="text-white text-xs font-bold">{user.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Content (70%) */}
                            <div className="w-full lg:w-8/12 space-y-8">

                                {/* Best Crops to Plant */}
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-xl font-black text-slate-900">Best Crops to Plant</h3>

                                            {/* AI Filter Toggle */}
                                            {prediction && (
                                                <button
                                                    onClick={() => setFilterAiMatch(!filterAiMatch)}
                                                    className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${filterAiMatch
                                                            ? 'bg-primary-50 text-primary-700 border-primary-200'
                                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                                                    Filter AI Suitability {'>'} 70
                                                </button>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => setShowAllCrops(true)}
                                            className="text-sm font-bold text-primary-600 hover:underline"
                                        >
                                            View All
                                        </button>
                                    </div>
                                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
                                        {displayedCrops.map((crop, index) => (
                                            <div key={crop.id} className="snap-start">
                                                <ExploreCropCard data={crop} aiMatch={isAiMatch && index % 2 === 0} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Modal for View All Crops */}
                                    {showAllCrops && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                                            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                                                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                                    <h2 className="text-2xl font-black text-slate-900">All Recommended Crops</h2>
                                                    <button onClick={() => setShowAllCrops(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                                        <span className="material-symbols-outlined text-2xl">close</span>
                                                    </button>
                                                </div>
                                                <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                    {displayedCrops.map((crop, index) => (
                                                        <ExploreCropCard key={crop.id} data={crop} aiMatch={isAiMatch && index % 2 === 0} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                {/* Smart Recommendations */}
                                <section>
                                    <h3 className="text-xl font-black text-slate-900 mb-6">Smart Recommendations</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {engineData.optimizedRecommendations.length > 0 ? (
                                            engineData.optimizedRecommendations.map((rec, idx) => (
                                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group shadow-md flex gap-4 relative overflow-hidden">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-67210fb9c782?q=80&w=300&auto=format&fit=crop')" }}
                                                    ></div>
                                                    <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center relative z-10 transition-colors 
                                                        ${rec.iconType === 'sun' ? 'bg-amber-50 text-amber-500 group-hover:bg-amber-100' : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'}`}>
                                                        {rec.iconType === 'sun' ? <Sun className="w-6 h-6" /> : <Sprout className="w-6 h-6" />}
                                                    </div>
                                                    <div className="relative z-10">
                                                        <h4 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">{rec.title}</h4>
                                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{rec.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full p-6 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                                                Loading smart recommendations...
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Content (30%) */}
                            <div className="w-full lg:w-4/12 space-y-6">

                                {/* Market Summary */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-300 mix-blend-overlay"
                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=300&auto=format&fit=crop')" }}
                                    ></div>
                                    <div className="relative z-10 flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                        <h3 className="text-xl font-extrabold text-slate-900">Trends</h3>
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded border border-green-200 shadow-sm flex items-center gap-1.5 object-contain">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            LIVE
                                        </span>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        {isPricesLoading ? (
                                            <div className="text-center text-sm text-slate-500 py-4">Loading live trends...</div>
                                        ) : (livePrices || []).length > 0 ? (
                                            (livePrices || []).slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                            <TrendingUp className="w-4 h-4" />
                                                        </div>
                                                        <p className="font-bold text-slate-900">{item.commodity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold">${item.price.toFixed(2)}</p>
                                                        <p className={`text-xs font-bold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {item.change >= 0 ? '+' : ''}{item.change}%
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-sm text-slate-400 py-4">Market data unavailable</div>
                                        )}
                                    </div>
                                    <button className="relative z-10 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-xl transition-colors">
                                        Full Market Report
                                    </button>
                                </div>

                                {/* Govt Schemes */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-300 mix-blend-overlay"
                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545620853-4dc97eec97f7?q=80&w=300&auto=format&fit=crop')" }}
                                    ></div>
                                    <h3 className="relative z-10 text-xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Govt. Schemes</h3>
                                    <div className="relative z-10 space-y-4">
                                        <a href="#" className="flex gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                                            <div className="w-10 h-10 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">Pradhan Mantri Fasal Bima</h4>
                                                <p className="text-xs text-slate-500 font-medium">Crop insurance portal. Protect against unavoidable crop failures.</p>
                                            </div>
                                        </a>
                                        <a href="#" className="flex gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                                            <div className="w-10 h-10 shrink-0 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                                                <HandCoins className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">Kisan Credit Card</h4>
                                                <p className="text-xs text-slate-500 font-medium">Fast-track loan approval for seeds, fertilizers, and equipment.</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExplorePage;
