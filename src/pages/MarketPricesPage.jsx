import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import MarketTable from '../components/MarketTable';
import { TrendingUp, Globe2, Activity, Wheat, X } from 'lucide-react';
import { useLivePrices } from '../services/marketApi';
import { useState } from 'react';

const MarketPricesPage = () => {
    const { data: liveData } = useLivePrices();
    const [showReportModal, setShowReportModal] = useState(false);
    
    const wheatData = liveData?.find(d => d.commodity.includes('Wheat')) || { price: 214.50, change: 2.4 };
    const riceData = liveData?.find(d => d.commodity.includes('Rice')) || { price: 410.20, change: -0.8 };
    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="Real-time Market Insights" />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Top Stat Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Wheat Avg. Price"
                                value={`$${wheatData.price.toFixed(2)}`}
                                change={`${wheatData.change > 0 ? '+' : ''}${wheatData.change}%`}
                                changeType={wheatData.change >= 0 ? "positive" : "negative"}
                                icon={Wheat}
                                bgImage="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=300&auto=format&fit=crop"
                            />
                            <StatCard
                                title="Rice (Basmati)"
                                value={`$${riceData.price.toFixed(2)}`}
                                change={`${riceData.change > 0 ? '+' : ''}${riceData.change}%`}
                                changeType={riceData.change >= 0 ? "positive" : "negative"}
                                icon={TrendingUp}
                                bgImage="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop"
                            />
                            <StatCard
                                title="Market Sentiment"
                                value="Bullish"
                                change="High Demand"
                                changeType="positive"
                                icon={Activity}
                                bgImage="https://images.unsplash.com/photo-1592982537447-67210fb9c782?q=80&w=300&auto=format&fit=crop"
                            />
                            <StatCard
                                title="Global Index"
                                value="1,425.8"
                                change="Neutral"
                                changeType="neutral"
                                icon={Globe2}
                                bgImage="https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=300&auto=format&fit=crop"
                            />
                        </div>

                        {/* Table Area */}
                        <div className="w-full shadow-md rounded-2xl">
                            <MarketTable />
                        </div>

                        {/* Bottom Section - Enhanced interactive cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-8">
                            <div 
                                onClick={() => setShowReportModal(true)}
                                className="bg-white min-h-[256px] rounded-2xl border border-slate-200 shadow-md relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-8 cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09e1e91?q=80&w=1500&auto=format&fit=crop')" }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                                <div className="relative z-10 mt-auto">
                                    <h3 className="text-2xl font-black text-white mb-2">Weekly Trend Report</h3>
                                    <p className="text-slate-200 font-medium">Dive deep into historical data and future predictions for staple cereals across major global exchanges.</p>
                                    <div className="mt-4 flex items-center font-bold text-primary-400 group-hover:text-primary-300">
                                        View Full Report →
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary-900 min-h-[256px] rounded-2xl border border-primary-800 shadow-md relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/40 transition-all duration-300 flex flex-col justify-end p-8 cursor-pointer">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-transform duration-700 group-hover:scale-105 mix-blend-overlay"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1500&auto=format&fit=crop')" }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent"></div>
                                <div className="relative z-10 mt-auto">
                                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-black uppercase tracking-widest rounded mb-3">
                                        MARKET ALERT
                                    </span>
                                    <h3 className="text-2xl font-black text-white mb-2">Soybean Logistics Delay</h3>
                                    <p className="text-primary-100 font-medium">Port congestions in Brazil are expected to temporarily boost local market valuations.</p>
                                    <div className="mt-4 flex items-center font-bold text-white group-hover:text-primary-200">
                                        Read Analysis →
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Weekly Trend Report Modal */}
                {showReportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Weekly Trend Report</h2>
                                    <p className="text-sm text-slate-500 font-medium">Historical data & global exchange predictions</p>
                                </div>
                                <button onClick={() => setShowReportModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Commodity Highlights</h3>
                                    
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-900">Wheat</span>
                                            <span className="text-green-600 font-bold">Bullish Trend (+2.4%)</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Global supply constraints continue to push prices up. Expect resistance at the $220 mark next week.</p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-900">Rice</span>
                                            <span className="text-red-500 font-bold">Slight Correction (-0.8%)</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Asian markets saw a minor sell-off following better-than-expected harvest reports. Stabilizing around $410.</p>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-900">Soybeans</span>
                                            <span className="text-slate-500 font-bold">Volatile</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Port logistics delays in South America are creating short-term price spikes. Watch closely over the next 48 hours.</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                                    <h4 className="font-bold text-primary-900 mb-2">AI Market Prediction</h4>
                                    <p className="text-sm text-primary-800">Based on our ML models, the overall cereal index is expected to grow by 1.2% by end of week due to increased global demand and localized weather events in key producing regions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketPricesPage;
