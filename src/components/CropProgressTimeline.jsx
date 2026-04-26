import { cropProgressStages } from '../data/mockData';

const CropProgressTimeline = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Your Crop Status</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Active Cycle: Corn (Silver Queen)</p>
                </div>
                <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Alert: Low Nitrogen
                </span>
            </div>

            <div className="relative flex justify-between items-center pt-2 pb-4">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
                {/* Active Line Progress */}
                <div className="absolute top-1/2 left-0 w-[50%] h-1 bg-primary-500 -translate-y-1/2 z-0 rounded-full"></div>

                {cropProgressStages.map((stage) => {
                    const isCompleted = stage.status === 'completed';
                    const isActive = stage.status === 'active';

                    return (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center gap-3 w-20">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110 ${isCompleted
                                        ? 'bg-primary-500 text-white'
                                        : isActive
                                            ? 'bg-white border-4 border-primary-500 text-primary-500 w-12 h-12 ring-4 ring-primary-50'
                                            : 'bg-white border-2 border-slate-200 text-slate-400'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-sm font-bold">
                                    {stage.icon}
                                </span>
                            </div>

                            <div className="text-center absolute top-14 w-24">
                                <p className={`text-xs font-bold ${isActive ? 'text-primary-600' : isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                                    {stage.name}
                                </p>
                                <p className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-primary-500 italic' : 'text-slate-400'}`}>
                                    {stage.date}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* spacer to accommodate absolute text positioning */}
            <div className="h-10"></div>
        </div>
    );
};

export default CropProgressTimeline;
