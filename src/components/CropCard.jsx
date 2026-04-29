import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';

export const ExploreCropCard = ({ data, aiMatch }) => {
    return (
        <div className="min-w-[280px] h-[360px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${data.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>

            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {data.badge && (
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 w-max">
                        <span className="text-xs font-bold text-white tracking-wider">{data.badge}</span>
                    </div>
                )}

                {aiMatch && (
                    <div className="px-3 py-1.5 bg-green-500 rounded-lg border border-green-400 w-max flex items-center gap-1 shadow-lg shadow-green-500/30">
                        <span className="material-symbols-outlined text-[14px] text-white">smart_toy</span>
                        <span className="text-xs font-black text-white tracking-wider uppercase">AI Weather Match</span>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h4 className="text-xl font-bold text-white mb-2">{data.name}</h4>
                <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed">{data.description}</p>
            </div>
        </div>
    );
};

export const MarketInsightCard = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-primary-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-md group">
            <div className="flex gap-4 mb-5">
                <div
                    className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 border border-slate-100"
                    style={{ backgroundImage: `url(${data.image})` }}
                ></div>
                <div>
                    <h4 className="font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors tracking-tight">{data.name}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Region: {data.region}</p>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-2xl font-black text-slate-900">${data.price.toFixed(2)}<span className="text-sm font-medium text-slate-500">/ton</span></p>
                    <p className={`text-xs font-bold flex items-center gap-1 mt-1 ${data.statusColor === 'green' ? 'text-green-600' :
                        data.statusColor === 'red' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                        {data.change > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {data.change > 0 ? '+' : ''}{data.change}% {data.change > 0 ? 'Profit' : 'Loss'}
                    </p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded shadow-sm border ${data.statusColor === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                    data.statusColor === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                    {data.status}
                </span>
            </div>
        </div>
    );
};

export const MyCropDetailCard = ({ data, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group relative">
            {/* Delete Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if(window.confirm(`Are you sure you want to remove ${data.name}?`)) onDelete();
                }}
                className="absolute top-4 right-4 z-30 w-8 h-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg backdrop-blur-md border border-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Delete Crop"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {/* Image Header */}
            <div className="h-48 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 font-bold text-[10px] tracking-widest rounded shadow-sm border ${data.plotColor === 'green' ? 'bg-primary-500 text-white border-primary-600' :
                        data.plotColor === 'yellow' ? 'bg-amber-400 text-amber-950 border-amber-500' :
                            'bg-blue-500 text-white border-blue-600'
                        }`}>
                        {data.plot}
                    </span>
                </div>
                <div className="absolute top-4 right-14 bg-white/90 backdrop-blur border border-white p-1.5 rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center mb-0.5">Stage</p>
                    <p className="text-xs font-bold text-slate-900">{data.stage}</p>
                </div>
                <div className="absolute bottom-4 left-6">
                    <h3 className="text-xl font-black text-white">{data.name}</h3>
                </div>
            </div>

            {/* Stats Body */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Microbial Health */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 transform -rotate-90">
                                <circle cx="24" cy="24" r="20" className="stroke-slate-100" strokeWidth="4" fill="none" />
                                <circle cx="24" cy="24" r="20" className="stroke-primary-500" strokeWidth="4" fill="none"
                                    strokeDasharray={`${2 * Math.PI * 20}`}
                                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - data.microbialHealth / 100)}`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
                                {data.microbialHealth}%
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Microbial</p>
                            <p className="text-sm font-bold text-slate-900">Health</p>
                        </div>
                    </div>

                    {/* Soil Moisture */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 transform -rotate-90">
                                <circle cx="24" cy="24" r="20" className="stroke-slate-100" strokeWidth="4" fill="none" />
                                <circle cx="24" cy="24" r="20" className={`stroke-width-4 fill-none ${data.soilStatus === 'Dry Alert' ? 'stroke-amber-500' : 'stroke-blue-500'
                                    }`} strokeWidth="4" fill="none"
                                    strokeDasharray={`${2 * Math.PI * 20}`}
                                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - data.soilMoisture / 100)}`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
                                {data.soilMoisture}%
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Moisture</p>
                            <p className={`text-sm font-bold ${data.soilStatus === 'Dry Alert' ? 'text-amber-600' : 'text-slate-900'}`}>{data.soilStatus}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3 border border-slate-100 group-hover:bg-primary-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Bio-Fertilizer Applied</p>
                            <p className="text-sm font-bold text-slate-900">{data.bioFertilizer} L/Acre</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Area</p>
                            <p className="text-sm font-bold text-slate-900">{data.area || 0} Acres</p>
                        </div>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                            <span className="text-[11px] font-bold text-slate-600">{data.location || 'Local Farm'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-primary-500">wb_sunny</span>
                            <span className="text-[11px] font-bold text-slate-900">28°C · Sunny</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
