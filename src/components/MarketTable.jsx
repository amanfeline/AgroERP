import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, Download, RefreshCw } from 'lucide-react';
import { useLivePrices } from '../services/marketApi';

const MarketTable = () => {
    const [activeTab, setActiveTab] = useState('All Crops');
    const tabs = ['All Crops', 'Cereals ▾', 'Fibers ▾', 'Oilseeds ▾'];
    const [selectedCountry, setSelectedCountry] = useState('India');

    // Very basic client side pagination mockup
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data: liveData, isLoading, lastUpdated, refresh } = useLivePrices(selectedCountry);

    // Time ago calculator
    const [timeAgo, setTimeAgo] = useState('just now');
    useEffect(() => {
        const updateTimeAgo = () => {
            const seconds = Math.floor((new Date() - lastUpdated) / 1000);
            if (seconds < 5) setTimeAgo('just now');
            else if (seconds < 60) setTimeAgo(`${seconds}s ago`);
            else setTimeAgo(`${Math.floor(seconds/60)}m ago`);
        };
        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 1000);
        return () => clearInterval(interval);
    }, [lastUpdated]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Table Header/Filters */}
            <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex flex-wrap gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-bold rounded-full transition-all border ${tab === activeTab || (activeTab === 'All Crops' && tab === 'All Crops')
                                    ? 'bg-primary-500 text-white border-primary-600 shadow-sm shadow-primary-500/20'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                        <option value="India">India</option>
                        <option value="North America (USA)">North America (USA)</option>
                        <option value="South Asia">South Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Australia">Australia</option>
                        <option value="Southeast Asia">Southeast Asia</option>
                        <option value="Middle East">Middle East</option>
                        <option value="Africa">Africa</option>
                        <option value="Russia">Russia</option>
                        <option value="Canada">Canada</option>
                    </select>
                    <span className="text-xs font-bold text-slate-500 self-center">Updated {timeAgo}</span>
                    <button onClick={refresh} disabled={isLoading} className="flex items-center gap-2 bg-primary-50 text-primary-600 border border-primary-100 px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-100 transition-colors disabled:opacity-50">
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Update Live
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <th className="p-4 pl-6 font-semibold">COMMODITY</th>
                            <th className="p-4 font-semibold">MANDI/MARKET</th>
                            <th className="p-4 font-semibold">LAST PRICE</th>
                            <th className="p-4 font-semibold">DAILY CHANGE</th>
                            <th className="p-4 font-semibold text-right">VOLUME (TONS)</th>
                            <th className="p-4 font-semibold center text-center">QUALITY GRADE</th>
                            <th className="p-4 pr-6 text-right font-semibold">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading && liveData.length === 0 ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={`skeleton-${i}`}>
                                    <td colSpan="7" className="p-4">
                                        <div className="h-10 bg-slate-100 animate-pulse rounded-lg w-full"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            liveData.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6 font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{row.commodity}</td>
                                    <td className="p-4 text-sm text-slate-500 font-medium">{row.market}</td>
                                    <td className="p-4 font-bold text-slate-900">${row.price.toFixed(2)}</td>
                                    <td className={`p-4 font-bold text-sm flex items-center gap-1 ${row.change > 0 ? 'text-green-500' : row.change < 0 ? 'text-red-500' : 'text-slate-500'}`}>
                                        {row.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : row.change < 0 ? <ArrowDownRight className="w-4 h-4" /> : null}
                                        {row.change > 0 ? '+' : ''}{row.change}%
                                    </td>
                                    <td className="p-4 text-sm font-medium text-slate-600 text-right">{row.volume}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-block px-2.5 py-1 text-[10px] uppercase font-bold rounded border ${row.gradeColor === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {row.grade}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${row.status === 'Active' ? 'text-slate-700' : 'text-amber-600'
                                            }`}>
                                            {row.status}
                                            <span className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-primary-500' : 'bg-amber-500'}`}></span>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-auto p-4 border-t border-slate-200 flex items-center justify-between text-sm bg-slate-50/50">
                <span className="text-slate-500 font-medium tracking-wide">Showing <strong className="text-slate-900 mx-1">5</strong> of <strong className="text-slate-900 mx-1">42</strong> Mandis</span>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled={currentPage === 1}>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {[1, 2, 3].map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${currentPage === page
                                    ? 'bg-primary-500 text-white shadow-sm'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <span className="px-1 text-slate-400">...</span>
                    <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketTable;
