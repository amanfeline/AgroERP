import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { ExploreCropCard } from '../components/CropCard';
import { exploreCrops } from '../data/mockData';
import { Sprout, TrendingUp, HandCoins, Building2, Sun } from 'lucide-react';

const ExplorePage = () => {
    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Hero Banner */}
                        <div className="w-full bg-slate-900 rounded-2xl overflow-hidden relative shadow-md min-h-[280px] p-10 flex flex-col justify-end">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-67210fb9c782?q=80&w=1500&auto=format&fit=crop')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest rounded mb-4">
                                    SEASONAL FOCUS
                                </span>
                                <h1 className="text-4xl font-black text-white mb-3">Kharif Season Preparation</h1>
                                <p className="text-slate-200 font-medium max-w-2xl text-lg">
                                    Get ahead of the curve. Analyze soil moisture predictions and discover the best yielding crops for your specific region before planting begins.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Content (70%) */}
                            <div className="w-full lg:w-8/12 space-y-8">

                                {/* Best Crops to Plant */}
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-black text-slate-900">Best Crops to Plant</h3>
                                        <button className="text-sm font-bold text-primary-600 hover:underline">View All</button>
                                    </div>
                                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
                                        {exploreCrops.map((crop) => (
                                            <div key={crop.id} className="snap-start">
                                                <ExploreCropCard data={crop} />
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Smart Recommendations */}
                                <section>
                                    <h3 className="text-xl font-black text-slate-900 mb-6">Smart Recommendations</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group shadow-md flex gap-4 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599370126788-b4babe8c0c45?q=80&w=300&auto=format&fit=crop')" }}
                                            ></div>
                                            <div className="w-12 h-12 shrink-0 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors relative z-10">
                                                <Sun className="w-6 h-6" />
                                            </div>
                                            <div className="relative z-10">
                                                <h4 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">Delay planting by 4 days</h4>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">Incoming heavy rainfall predicted on Thursday. Wait for optimal soil moisture balance.</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group shadow-md flex gap-4 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-67210fb9c782?q=80&w=300&auto=format&fit=crop')" }}
                                            ></div>
                                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors relative z-10">
                                                <Sprout className="w-6 h-6" />
                                            </div>
                                            <div className="relative z-10">
                                                <h4 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">Switch to Organic Fertilizer</h4>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">Your soil nitrogen levels are stabilizing. A gentle organic boost is recommended over synthetics.</p>
                                            </div>
                                        </div>
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
                                        <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><TrendingUp className="w-4 h-4" /></div>
                                                <p className="font-bold text-slate-900">Rice Grade A</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">${410.20}</p>
                                                <p className="text-xs font-bold text-red-500">-0.8%</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><TrendingUp className="w-4 h-4" /></div>
                                                <p className="font-bold text-slate-900">Maize</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">${185.00}</p>
                                                <p className="text-xs font-bold text-green-500">+1.2%</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><TrendingUp className="w-4 h-4" /></div>
                                                <p className="font-bold text-slate-900">Cotton</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">${842.00}</p>
                                                <p className="text-xs font-bold text-slate-400">0.0%</p>
                                            </div>
                                        </div>
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
