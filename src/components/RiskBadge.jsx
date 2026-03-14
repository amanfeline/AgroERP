import React from 'react';

const RiskBadge = ({ risk, label }) => {
    const getColorClass = (level) => {
        switch (level?.toLowerCase()) {
            case 'none': return 'bg-green-100 text-green-700 border-green-200';
            case 'low': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize flex items-center justify-between min-w-[100px] ${getColorClass(risk)}`}>
            <span>{label}</span>
            <span className="opacity-80">{risk || 'unknown'}</span>
        </div>
    );
};

export default RiskBadge;
