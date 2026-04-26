import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import MarketTable from '../components/MarketTable';
import { TrendingUp, Globe2, Activity, Wheat } from 'lucide-react';

const MarketPricesPage = () => {
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
                                value="$214.50"
                                change="+2.4%"
                                changeType="positive"
                                icon={Wheat}
                                bgImage="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=300&auto=format&fit=crop"
                            />
                            <StatCard
                                title="Rice (Basmati)"
                                value="$410.20"
                                change="-0.8%"
                                changeType="negative"
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
                            <div className="bg-white min-h-[256px] rounded-2xl border border-slate-200 shadow-md relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-8 cursor-pointer">
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
            </div>
        </div>
    );
};

export default MarketPricesPage;
