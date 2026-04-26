const StatCard = ({ title, value, change, changeType, icon: Icon, bgImage }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            {bgImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-overlay"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>
            )}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-500">
                        <Icon className="w-6 h-6" />
                    </div>
                    {change && (
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${changeType === 'positive' ? 'bg-green-50 text-green-700' :
                            changeType === 'negative' ? 'bg-red-50 text-red-700' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                            {change.includes('+') ? change : change.includes('-') ? change : `+${change}`}
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-black text-slate-900">{value}</h3>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
