import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import WeatherPredictionCard from '../components/WeatherPredictionCard';
import CropProgressTimeline from '../components/CropProgressTimeline';
import { MarketInsightCard, MyCropDetailCard } from '../components/CropCard';
import { useWeatherPrediction } from '../hooks/useWeatherPrediction';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LayoutGrid, List, Plus, CheckCircle2, X, Leaf, Droplets, FlaskConical, MapPin, ArrowUpRight } from 'lucide-react';
import { exploreCrops } from '../data/mockData';

const DashboardPage = () => {
    const { user } = useAuth();
    const [layout, setLayout] = useState('grid');
    const [showSoilReport, setShowSoilReport] = useState(false);
    const { prediction, isLoading: isWeatherLoading } = useWeatherPrediction();

    const [dashboardData, setDashboardData] = useState(null);
    const [myCrops, setMyCrops] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [treatmentHistory, setTreatmentHistory] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Add Crop Modal States
    const [showAddCropModal, setShowAddCropModal] = useState(false);
    const [newCropForm, setNewCropForm] = useState({
        cropId: '',
        fertilizer: '',
        area: '',
        notes: ''
    });

    // Treatment States
    const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const [newTreatmentForm, setNewTreatmentForm] = useState({
        date: new Date().toISOString().split('T')[0],
        plotId: '',
        product: '',
        focus: '',
        dosage: '',
        status: 'Completed'
    });

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            if (!user) return;
            try {
                const resCrops = await fetch(`http://127.0.0.1:8000/api/crops?email=${user.email}`);
                const dataCrops = await resCrops.json();
                
                if (dataCrops.success && dataCrops.data.length > 0) {
                    setMyCrops(dataCrops.data);
                } else {
                    setMyCrops([]);
                }

                const resDashboard = await fetch(`http://127.0.0.1:8000/api/dashboard?email=${user.email}`);
                const dataDashboard = await resDashboard.json();
                
                const resMarket = await fetch(`http://127.0.0.1:8000/api/market-prices`);
                const dataMarket = await resMarket.json();

                if (dataDashboard.success) {
                    setDashboardData(dataDashboard.data);
                    setTreatmentHistory(dataDashboard.data.treatmentHistory || []);
                }
                if (dataMarket.success) setMarketData(dataMarket.data.slice(0, 3)); 
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
                setMyCrops([]);
                setTreatmentHistory([]);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchDashboardInfo();
    }, [user]);

    const handleAddTreatment = (e) => {
        e.preventDefault();
        const newEntry = {
            id: Date.now(),
            ...newTreatmentForm,
            date: new Date(newTreatmentForm.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
        };
        setTreatmentHistory([newEntry, ...treatmentHistory]);
        setShowAddTreatmentModal(false);
        setNewTreatmentForm({
            date: new Date().toISOString().split('T')[0],
            plotId: '',
            product: '',
            focus: '',
            dosage: '',
            status: 'Completed'
        });
    };

    const handleAddCrop = (e) => {
        e.preventDefault();
        
        const selectedCropMeta = exploreCrops.find(c => c.id === parseInt(newCropForm.cropId));
        
        if (!selectedCropMeta) return;

        const newCrop = {
            id: Date.now(),
            name: selectedCropMeta.name,
            plot: `PLOT ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 90 + 10)}`,
            plotColor: ['green', 'blue', 'yellow'][Math.floor(Math.random() * 3)],
            stage: 'Sowing',
            microbialHealth: Math.floor(Math.random() * 40 + 60), // 60-100
            soilMoisture: Math.floor(Math.random() * 30 + 50), // 50-80
            soilStatus: 'Optimal',
            bioFertilizer: parseFloat(newCropForm.fertilizer) || 0,
            area: parseFloat(newCropForm.area) || 0,
            image: selectedCropMeta.image,
            location: 'Punjab, India', // Mock location
            notes: newCropForm.notes
        };

        setMyCrops([newCrop, ...myCrops]);
        setShowAddCropModal(false);
        setNewCropForm({ cropId: '', fertilizer: '', area: '', notes: '' });
    };

    const handleDeleteCrop = (id) => {
        setMyCrops(myCrops.filter(crop => crop.id !== id));
    };

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
                        <section id="crop-overview">
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

                            {isLoadingData ? (
                                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Plus className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading your plots...</p>
                                </div>
                            ) : myCrops.length > 0 ? (
                                <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                                    {myCrops.map(crop => (
                                        <MyCropDetailCard 
                                            key={crop.id} 
                                            data={crop} 
                                            onDelete={() => handleDeleteCrop(crop.id)} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center group hover:border-primary-300 transition-colors shadow-sm">
                                    <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Leaf className="w-12 h-12 text-primary-500" />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-2">No active crops found</h4>
                                    <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">Start by adding your first crop to monitor its health, growth stages, and weather compatibility.</p>
                                    <button 
                                        onClick={() => setShowAddCropModal(true)}
                                        className="bg-primary-500 text-white font-bold px-8 py-3 rounded-full hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 mx-auto"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Your First Crop
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* History Table */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-extrabold text-slate-900">Recent Bio-Fertilizer & Microbe Treatments</h3>
                                    <button 
                                        onClick={() => setShowAddTreatmentModal(true)}
                                        className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors shadow-md shadow-primary-500/20"
                                        title="Add New Treatment"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => setShowFullHistoryModal(true)}
                                    className="text-sm border border-primary-200 bg-white font-bold text-primary-600 px-4 py-1.5 rounded-full hover:bg-primary-50 transition-colors shadow-sm"
                                >
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
                                        ) : treatmentHistory.length > 0 ? (
                                            treatmentHistory.slice(0, 5).map((row) => (
                                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="p-4 pl-6 font-medium text-slate-600">{row.date}</td>
                                                    <td className="p-4 font-bold text-slate-900">{row.plotId || row.plot}</td>
                                                    <td className="p-4 font-bold text-primary-700">{row.product}</td>
                                                    <td className="p-4 text-sm text-slate-600">{row.focus}</td>
                                                    <td className="p-4 font-medium text-slate-900">{row.dosage}</td>
                                                    <td className="p-4 pr-6 text-right">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full uppercase border ${
                                                            row.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                                        }`}>
                                                            {row.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6" className="p-12 text-center text-slate-400 font-medium">No treatment records found. Click the + button to add one.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </main>

                {/* Sticky FAB from My Crops */}
                <div className="fixed bottom-8 right-8 z-30">
                    <button 
                        onClick={() => setShowAddCropModal(true)}
                        className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 font-bold px-6 py-4 rounded-full flex items-center gap-2 transition-transform hover:-translate-y-1"
                    >
                        <Plus className="w-6 h-6" />
                        Add New Crop
                    </button>
                </div>

                {/* Add New Crop Modal */}
                {showAddCropModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 animate-in zoom-in-95 duration-300">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Plant New Crop</h2>
                                    <p className="text-sm text-slate-500 font-medium">Define your plot details to start tracking</p>
                                </div>
                                <button onClick={() => setShowAddCropModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddCrop} className="p-8 overflow-y-auto space-y-6">
                                {/* Crop Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Leaf className="w-3.5 h-3.5 text-primary-500" />
                                        Select Crop Type
                                    </label>
                                    <select 
                                        required
                                        value={newCropForm.cropId}
                                        onChange={(e) => setNewCropForm({...newCropForm, cropId: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Choose a crop...</option>
                                        {exploreCrops.map(crop => (
                                            <option key={crop.id} value={crop.id}>{crop.name} ({crop.season})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Fertilizer */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <FlaskConical className="w-3.5 h-3.5 text-blue-500" />
                                            Bio-Fertilizer (L/A)
                                        </label>
                                        <input 
                                            type="number"
                                            required
                                            placeholder="e.g. 120"
                                            value={newCropForm.fertilizer}
                                            onChange={(e) => setNewCropForm({...newCropForm, fertilizer: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                        />
                                    </div>
                                    {/* Area */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <LayoutGrid className="w-3.5 h-3.5 text-amber-500" />
                                            Plot Area (Acres)
                                        </label>
                                        <input 
                                            type="number"
                                            required
                                            placeholder="e.g. 5"
                                            value={newCropForm.area}
                                            onChange={(e) => setNewCropForm({...newCropForm, area: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Plus className="w-3.5 h-3.5 text-purple-500" />
                                        Additional Notes
                                    </label>
                                    <textarea 
                                        rows="3"
                                        placeholder="Enter soil health notes, specific variety names, or planting conditions..."
                                        value={newCropForm.notes}
                                        onChange={(e) => setNewCropForm({...newCropForm, notes: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-medium text-slate-700 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setShowAddCropModal(false)}
                                        className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] bg-primary-500 text-white font-black py-4 rounded-2xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2"
                                    >
                                        Start Planting
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add New Treatment Modal */}
                {showAddTreatmentModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 animate-in zoom-in-95 duration-300">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Log New Treatment</h2>
                                    <p className="text-sm text-slate-500 font-medium">Record fertilizer or microbe application</p>
                                </div>
                                <button onClick={() => setShowAddTreatmentModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddTreatment} className="p-8 overflow-y-auto space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px] text-blue-500">calendar_month</span>
                                            Date
                                        </label>
                                        <input 
                                            type="date"
                                            required
                                            value={newTreatmentForm.date}
                                            onChange={(e) => setNewTreatmentForm({...newTreatmentForm, date: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                        />
                                    </div>
                                    {/* Plot Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px] text-amber-500">grid_view</span>
                                            Select Plot
                                        </label>
                                        <select 
                                            required
                                            value={newTreatmentForm.plotId}
                                            onChange={(e) => setNewTreatmentForm({...newTreatmentForm, plotId: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">Choose plot...</option>
                                            {myCrops.length > 0 ? (
                                                myCrops.map(crop => (
                                                    <option key={crop.id} value={crop.plot}>{crop.plot} - {crop.name}</option>
                                                ))
                                            ) : (
                                                <option disabled>No active plots found</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                {/* Product Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FlaskConical className="w-3.5 h-3.5 text-primary-500" />
                                        Product Type
                                    </label>
                                    <select 
                                        required
                                        value={newTreatmentForm.product}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            let focus = '';
                                            if (val === 'NitroFix Pro') focus = 'Nitrogen Fixing';
                                            else if (val === 'PhosBoost') focus = 'Phosphorus Solubilizing';
                                            else if (val === 'Micro Root Pro') focus = 'Mycorrhizal Fungi';
                                            else if (val === 'Aqua Safe Gel') focus = 'Water Retention';
                                            else focus = 'Multi-Nutrient';
                                            
                                            setNewTreatmentForm({...newTreatmentForm, product: val, focus});
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Select product...</option>
                                        <option value="NitroFix Pro">Nitrogen (NitroFix Pro)</option>
                                        <option value="PhosBoost">Phosphorus (PhosBoost)</option>
                                        <option value="Micro Root Pro">Micro Root Pro</option>
                                        <option value="Aqua Safe Gel">Aqua Safe Gel</option>
                                        <option value="K-Solubilizer">Potassium Solubilizer</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Dosage */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Droplets className="w-3.5 h-3.5 text-blue-400" />
                                            Dosage (L/Acre)
                                        </label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="e.g. 15 L/Acre"
                                            value={newTreatmentForm.dosage}
                                            onChange={(e) => setNewTreatmentForm({...newTreatmentForm, dosage: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                        />
                                    </div>
                                    {/* Status */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                            Application Status
                                        </label>
                                        <select 
                                            value={newTreatmentForm.status}
                                            onChange={(e) => setNewTreatmentForm({...newTreatmentForm, status: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="In Progress">In Progress</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setShowAddTreatmentModal(false)}
                                        className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] bg-primary-500 text-white font-black py-4 rounded-2xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2"
                                    >
                                        Log Treatment
                                        <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Full History Modal */}
                {showFullHistoryModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-lg p-4 animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/20">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Full Treatment Log</h2>
                                    <p className="text-slate-500 font-medium">Comprehensive historical record of all field applications</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => {
                                            setShowFullHistoryModal(false);
                                            setShowAddTreatmentModal(true);
                                        }}
                                        className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-primary-600 transition-all flex items-center gap-2"
                                    >
                                        <Plus className="w-5 h-5" />
                                        New Entry
                                    </button>
                                    <button onClick={() => setShowFullHistoryModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm border border-slate-200">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto p-0">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead className="sticky top-0 z-10">
                                        <tr className="bg-slate-100/80 backdrop-blur text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-200">
                                            <th className="p-6 pl-10">Date</th>
                                            <th className="p-6">Plot ID</th>
                                            <th className="p-6">Product</th>
                                            <th className="p-6">Action / Focus</th>
                                            <th className="p-6">Dosage</th>
                                            <th className="p-6 pr-10 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {treatmentHistory.map((row) => (
                                            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-6 pl-10">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">event</span>
                                                        </div>
                                                        <span className="font-bold text-slate-700">{row.date}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 font-black text-slate-900">{row.plotId || row.plot}</td>
                                                <td className="p-6">
                                                    <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg font-bold text-sm border border-primary-100">
                                                        {row.product}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-sm font-medium text-slate-500">{row.focus}</td>
                                                <td className="p-6 font-bold text-slate-800">{row.dosage}</td>
                                                <td className="p-6 pr-10 text-right">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase border shadow-sm ${
                                                        row.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {row.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                                <p className="text-sm text-slate-400 font-medium">Total entries: <span className="text-slate-900 font-black">{treatmentHistory.length}</span></p>
                                <p className="text-xs text-slate-400 italic">Historical data is synced with your farm cloud</p>
                            </div>
                        </div>
                    </div>
                )}
            {/* ─── FOOTER CARD ─── */}
            <div className="max-w-7xl mx-auto px-6 pb-10 mt-16">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(160deg, #0a2416 0%, #0d3320 50%, #0a2416 100%)' }}>
                    {/* Subtle glow orbs */}
                    <div className="absolute top-0 left-1/4 w-96 h-32 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, #4ade80 0%, transparent 70%)' }}></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-24 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, #22c55e 0%, transparent 70%)' }}></div>

                    <div className="relative z-10 px-10 pt-10 pb-6">
                        {/* Main Footer Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
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
                                    <a href="https://www.instagram.com/amancatto/" target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        title="Instagram"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/amanyadav0512/" target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        title="LinkedIn"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    <a href="https://github.com/amancatto" target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        title="GitHub"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                    <a href="https://drive.google.com/file/d/1u7Yz7oQY4xRtNspoVuilDHBhO8EdHfYR/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        title="Developer Portfolio"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Platform Links */}
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

                            {/* Developers Section */}
                            <div>
                                <h4 className="text-xs font-black text-green-400/80 uppercase tracking-[0.15em] mb-4">Developers</h4>
                                <ul className="space-y-2.5">
                                    <li>
                                        <a href="https://www.linkedin.com/in/amanyadav0512/" target="_blank" rel="noopener noreferrer" className="text-sm text-green-100/50 hover:text-white font-medium transition-colors">Aman</a>
                                    </li>
                                    {['Chirag', 'Anurag', 'Ayush'].map(name => (
                                        <li key={name}>
                                            <span className="text-sm text-green-100/50 hover:text-white font-medium transition-colors cursor-default">{name}</span>
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
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(74,222,128,0.1)' }}>
                            <p className="text-xs text-green-100/30 font-medium">
                                {'\u00A9'} {new Date().getFullYear()} AgriERP. Built with {'❤'} for Indian Farmers.
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs text-green-400/60 font-bold">All systems operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default DashboardPage;
