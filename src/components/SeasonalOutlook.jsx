import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SeasonalOutlook = ({ data }) => {
    if (!data) return null;

    // Transform API response to Recharts format
    const chartData = data.months.map((month, index) => ({
        name: month,
        Rainfall: data.rainfall_mm[index],
        Temperature: data.temp_c[index],
        Risk: data.risks[index]
    }));

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full h-[300px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-500">monitoring</span>
                3-Month Seasonal Outlook
            </h3>

            <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="#3b82f6"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dx={-10}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#ef4444"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dx={10}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: '#f8fafc' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar yAxisId="left" dataKey="Rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar yAxisId="right" dataKey="Temperature" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeasonalOutlook;
