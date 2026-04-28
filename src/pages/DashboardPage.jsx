import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import WeatherPredictionCard from '../components/WeatherPredictionCard';
import CropProgressTimeline from '../components/CropProgressTimeline';
import { MarketInsightCard, MyCropDetailCard } from '../components/CropCard';
import { useWeatherPrediction } from '../hooks/useWeatherPrediction';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LayoutGrid, List, Plus, CheckCircle2, X } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const [layout, setLayout] = useState('grid');
    const [showSoilReport, setShowSoilReport] = useState(false);
    const { prediction, isLoading: isWeatherLoading } = useWeatherPrediction();

    const [dashboardData, setDashboardData] = useState(null);
    const [myCrops, setMyCrops] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            if (!user) return;
            try {
                const resDashboard = await fetch(`http://localhost:8000/api/dashboard?email=${user.email}`);
                const dataDashboard = await resDashboard.json();
                
                const resCrops = await fetch(`http://localhost:8000/api/crops?email=${user.email}`);
                const dataCrops = await resCrops.json();
                
                const resMarket = await fetch(`http://localhost:8000/api/market-prices`);
                const dataMarket = await resMarket.json();

                if (dataDashboard.success) setDashboardData(dataDashboard.data);
                if (dataCrops.success) setMyCrops(dataCrops.data);
                if (dataMarket.success) setMarketData(dataMarket.data.slice(0, 3)); // Show top 3
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchDashboardInfo();
    }, [user]);

    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto relative">
                <Topbar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

                        {/* Left Column (70%) */}
                        <div className="w-full lg:w-8/12 flex flex-col gap-6">
                            <WeatherPredictionCard weatherData={prediction} isLoading={isWeatherLoading} />
                            <CropProgressTimeline />

                            <section className="mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black text-slate-900">Market Insights</h3>
                                    <NavLink to="/market-prices" className="text-sm border border-primary-200 bg-white font-bold text-primary-600 px-4 py-1.5 rounded-full hover:bg-primary-50 transition-colors">
                                        View All Markets →
                                    </NavLink>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {isLoadingData ? (
                                        <p className="text-slate-500">Loading market trends...</p>
                                    ) : (
                                        marketData.map((insight) => (
                                            <MarketInsightCard key={insight.id} data={insight} />
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right Column (30%) */}
                        <div className="w-full lg:w-4/12 flex flex-col gap-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
                                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-lg font-extrabold text-slate-900">Quick Metrics</h3>
                                    <button className="text-sm font-bold text-primary-600 hover:underline">View Report</button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599370126788-b4babe8c0c45?q=80&w=300&auto=format&fit=crop')" }}
                                        ></div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-primary-500">
                                                <span className="material-symbols-outlined">water_drop</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Crop Suitability</p>
                                                <p className="text-2xl font-black text-slate-900">
                                                    {isWeatherLoading || !prediction ? '...' : `${Math.round(prediction.crop_suitability_score)}%`}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded border border-green-200 relative z-10">AI Predicted</span>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-67210fb9c782?q=80&w=300&auto=format&fit=crop')" }}
                                        ></div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-red-500">
                                                <span className="material-symbols-outlined text-[20px]">thermostat</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Air Humidity</p>
                                                <p className="text-2xl font-black text-slate-900">42%</p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded border border-red-200 relative z-10">-2% Low</span>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Soil Report Card */}
                            <div className="rounded-2xl shadow-xl relative overflow-hidden flex-1 flex flex-col" style={{ background: 'linear-gradient(145deg, #0d3320 0%, #1a5c38 60%, #0f4028 100%)' }}>
                                {/* Subtle farm image overlay */}
                                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop')" }}></div>
                                {/* Glow orb */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

                                <div className="relative z-10 flex flex-col h-full p-6">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.25)' }}>
                                            <span className="material-symbols-outlined text-green-300 text-[20px]">psychiatry</span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white leading-tight">Automated Soil Report</h3>
                                            <p className="text-[11px] text-green-300/70 font-medium">Generated 10 min ago · satellite</p>
                                        </div>
                                        <span className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold text-green-300" style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            READY
                                        </span>
                                    </div>

                                    {/* Horizontal Metric Rows */}
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px' }}>
                                            <span className="material-symbols-outlined text-green-400 text-[18px]">favorite</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[11px] font-bold text-green-200/70 uppercase tracking-wider">Soil Health</span>
                                                    <span className="text-sm font-black text-white">88<span className="text-[10px] font-normal">/100</span></span>
                                                </div>
                                                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                    <div className="h-1.5 rounded-full bg-green-400" style={{ width: '88%' }}></div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-green-400 shrink-0">↑ Good</span>
                                        </div>

                                        <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px' }}>
                                            <span className="material-symbols-outlined text-blue-400 text-[18px]">water_drop</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[11px] font-bold text-green-200/70 uppercase tracking-wider">Moisture</span>
                                                    <span className="text-sm font-black text-white">64<span className="text-[10px] font-normal">%</span></span>
                                                </div>
                                                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                    <div className="h-1.5 rounded-full bg-blue-400" style={{ width: '64%' }}></div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-400 shrink-0">Optimal</span>
                                        </div>

                                        <div className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px' }}>
                                            <span className="material-symbols-outlined text-amber-400 text-[18px]">science</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[11px] font-bold text-green-200/70 uppercase tracking-wider">pH Level</span>
                                                    <span className="text-sm font-black text-white">6.8</span>
                                                </div>
                                                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                    <div className="h-1.5 rounded-full bg-amber-400" style={{ width: '68%' }}></div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-amber-400 shrink-0">Ideal</span>
                                        </div>
                                    </div>

                                    {/* CTA — full width, bottom center */}
                                    <button
                                        onClick={() => setShowSoilReport(true)}
                                        className="mt-5 w-full py-2.5 font-bold text-sm rounded-xl transition-all hover:opacity-90 active:scale-95 text-center"
                                        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                                    >
                                        Open Detailed Report →
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Integrated My Crops Section */}
                    <div className="max-w-7xl mx-auto space-y-8 mt-12 pt-12 border-t border-slate-200">
                        {/* Top Stat Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Active Acres</p>
                                            <h3 className="text-3xl font-black text-slate-900">{isLoadingData ? '...' : dashboardData?.metrics?.totalActiveAcres}</h3>
                                        </div>
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">{dashboardData?.metrics?.acresTrend || '+0%'}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-primary-500 h-2 rounded-full w-[85%]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=300&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Avg. Soil Health Score</p>
                                            <h3 className="text-3xl font-black text-slate-900">{isLoadingData ? '...' : `${dashboardData?.metrics?.avgSoilHealth}%`}</h3>
                                        </div>
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">{dashboardData?.metrics?.soilTrend || '+0%'}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-primary-500 h-2 rounded-full w-[88%]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=300&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Bio-Fertilizer Usage</p>
                                            <h3 className="text-3xl font-black text-slate-900">{isLoadingData ? '...' : `${dashboardData?.metrics?.bioFertilizerUsage}L`}</h3>
                                        </div>
                                        <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-md">{dashboardData?.metrics?.fertilizerTrend || '-0%'}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Crop Overview Section */}
                        <section>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Crop Overview</h3>
                                    <p className="text-slate-500 font-medium">Manage and monitor your active plots</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm">
                                    <button
                                        onClick={() => setLayout('grid')}
                                        className={`p-1.5 rounded-md transition-colors ${layout === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-700'}`}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setLayout('list')}
                                        className={`p-1.5 rounded-md transition-colors ${layout === 'list' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-700'}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                                {isLoadingData ? (
                                    <p className="text-slate-500 p-4">Loading crops...</p>
                                ) : (
                                    myCrops.map(crop => (
                                        <MyCropDetailCard key={crop.id} data={crop} />
                                    ))
                                )}

                            </div>
                        </section>

                        {/* History Table */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-xl font-extrabold text-slate-900">Recent Bio-Fertilizer & Microbe Treatments</h3>
                                <button className="text-sm border border-primary-200 bg-white font-bold text-primary-600 px-4 py-1.5 rounded-full hover:bg-primary-50 transition-colors shadow-sm">
                                    View Full History →
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <th className="p-4 pl-6">TREATMENT DATE</th>
                                            <th className="p-4">PLOT ID</th>
                                            <th className="p-4">PRODUCT TYPE</th>
                                            <th className="p-4">MICROBE FOCUS</th>
                                            <th className="p-4">DOSAGE</th>
                                            <th className="p-4 pr-6 text-right">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {isLoadingData ? (
                                            <tr><td colSpan="6" className="p-4 text-center text-slate-500">Loading history...</td></tr>
                                        ) : (
                                            dashboardData?.treatmentHistory?.map((row) => (
                                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="p-4 pl-6 font-medium text-slate-600">{row.date}</td>
                                                    <td className="p-4 font-bold text-slate-900">{row.plot}</td>
                                                    <td className="p-4 font-bold text-primary-700">{row.product}</td>
                                                    <td className="p-4 text-sm text-slate-600">{row.focus}</td>
                                                    <td className="p-4 font-medium text-slate-900">{row.dosage}</td>
                                                    <td className="p-4 pr-6 text-right">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-bold rounded-full uppercase">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </main>

                {/* Sticky FAB from My Crops */}
                <div className="fixed bottom-8 right-8 z-30">
                    <button className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 font-bold px-6 py-4 rounded-full flex items-center gap-2 transition-transform hover:-translate-y-1">
                        <Plus className="w-6 h-6" />
                        Add New Crop
                    </button>
                </div>

                {/* Soil Report Modal */}
                {showSoilReport && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Automated Soil Analysis Report</h2>
                                    <p className="text-sm text-slate-500 font-medium">Generated from satellite imagery · {new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p>
                                </div>
                                <button onClick={() => setShowSoilReport(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Soil Health Score</p>
                                        <p className="text-3xl font-black text-green-700">88<span className="text-lg">/100</span></p>
                                        <p className="text-xs text-green-600 font-medium mt-1">↑ +3 from last month</p>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Moisture Level</p>
                                        <p className="text-3xl font-black text-blue-700">64<span className="text-lg">%</span></p>
                                        <p className="text-xs text-blue-600 font-medium mt-1">Optimal range: 60-75%</p>
                                    </div>
                                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Nitrogen (N)</p>
                                        <p className="text-3xl font-black text-amber-700">210<span className="text-lg"> kg/ha</span></p>
                                        <p className="text-xs text-amber-600 font-medium mt-1">Slightly below optimal</p>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">pH Level</p>
                                        <p className="text-3xl font-black text-purple-700">6.8</p>
                                        <p className="text-xs text-purple-600 font-medium mt-1">Ideal (6.5 – 7.0)</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-bold text-slate-900 border-b pb-2">Nutrient Breakdown</h3>
                                    {[
                                        { label: 'Phosphorus (P)', value: '85%', color: 'bg-blue-500' },
                                        { label: 'Potassium (K)', value: '72%', color: 'bg-green-500' },
                                        { label: 'Organic Matter', value: '61%', color: 'bg-amber-500' },
                                        { label: 'Microbial Activity', value: '92%', color: 'bg-primary-500' },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                                <span>{item.label}</span>
                                                <span className="font-bold">{item.value}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div className={`${item.color} h-2 rounded-full`} style={{ width: item.value }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                                    <h4 className="font-bold text-primary-900 mb-2">AI Recommendation</h4>
                                    <p className="text-sm text-primary-800">Soil nitrogen levels are slightly low. Consider applying 25 kg/ha of urea before next irrigation cycle. Phosphorus and potassium levels are healthy. Microbial activity is excellent — bio-fertilizer application is working well.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}\n            </div>
            {/* ─── FOOTER ─── */}
            <footer style={{ background: 'linear-gradient(160deg, #0a2416 0%, #0d3320 50%, #0a2416 100%)' }} className="relative overflow-hidden mt-16">
                {/* Subtle glow orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-32 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, #4ade80 0%, transparent 70%)' }}></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-24 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, #22c55e 0%, transparent 70%)' }}></div>

                {/* Top divider line */}
                <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.3), transparent)' }}></div>

                <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-6">

                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                                    <span className="material-symbols-outlined text-white text-[18px]">eco</span>
                                </div>
                                <span className="text-lg font-black text-white tracking-tight">AgriERP</span>
                            </div>
                            <p className="text-sm text-green-300/60 font-medium leading-relaxed mb-5">
                                Smart farming intelligence for the modern Indian farmer. AI-powered, data-driven, field-ready.
                            </p>
                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    title="Instagram"
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    title="LinkedIn"
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/amanfeline" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    title="GitHub"
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xs font-black text-green-400/80 uppercase tracking-[0.15em] mb-4">Platform</h4>
                            <ul className="space-y-2.5">
                                {[
                                    { label: 'Dashboard', href: '/dashboard' },
                                    { label: 'Explore Crops', href: '/explore' },
                                    { label: 'Market Prices', href: '/market-prices' },
                                    { label: 'Weather AI', href: '/weather' },
                                ].map(link => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm text-green-100/50 hover:text-white font-medium transition-colors">{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Account Links */}
                        <div>
                            <h4 className="text-xs font-black text-green-400/80 uppercase tracking-[0.15em] mb-4">Account</h4>
                            <ul className="space-y-2.5">
                                {[
                                    { label: 'My Profile', href: '/profile' },
                                    { label: 'Help & Support', href: '/help' },
                                    { label: 'Admin Panel', href: '/admin' },
                                ].map(link => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm text-green-100/50 hover:text-white font-medium transition-colors">{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-xs font-black text-green-400/80 uppercase tracking-[0.15em] mb-4">Contact</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="mailto:amanyadav07093124@gmail.com" className="flex items-center gap-2.5 group">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                                            <span className="material-symbols-outlined text-green-400 text-[14px]">mail</span>
                                        </div>
                                        <span className="text-sm text-green-100/50 group-hover:text-white font-medium transition-colors break-all">amanyadav07093124@gmail.com</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+919315523023" className="flex items-center gap-2.5 group">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                                            <span className="material-symbols-outlined text-green-400 text-[14px]">call</span>
                                        </div>
                                        <span className="text-sm text-green-100/50 group-hover:text-white font-medium transition-colors">+91 93155 23023</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop: '1px solid rgba(74,222,128,0.1)' }}>
                        <p className="text-xs text-green-100/30 font-medium">
                            {'\u00A9'} {new Date().getFullYear()} AgriERP. Built with {'❤'} for Indian Farmers.
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs text-green-400/60 font-bold">All systems operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;
