import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { weatherForecast, weatherChartData } from '../data/mockData';
import { Sun } from 'lucide-react';

const WeatherChart = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Weather Forecast</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Westbrook, Springfield</p>
                </div>
                <div className="flex items-center gap-1.5 text-primary-500 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">
                    <Sun className="w-5 h-5 fill-current" />
                    <span className="text-xl font-black">28°C</span>
                </div>
            </div>

            <div className="flex-1 min-h-[140px] mb-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherChartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#22c55e"
                            strokeWidth={4}
                            dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#16a34a' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                            formatter={(value) => [`${value}°C`, 'Temperature']}
                            labelStyle={{ color: '#64748b', fontWeight: 'semibold', marginBottom: '4px' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-auto pt-4 border-t border-slate-100">
                {weatherForecast.map((w, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <span className={`text-[10px] uppercase font-bold tracking-wider mb-2 ${index === 2 ? 'text-primary-500' : 'text-slate-400'}`}>
                            {w.day}
                        </span>
                        <span className={`material-symbols-outlined mb-2 ${w.icon === 'wb_sunny' ? 'text-amber-400 fill' :
                                w.icon === 'cloud' ? 'text-slate-400 fill' :
                                    w.icon === 'partly_cloudy_day' ? 'text-orange-400 fill' :
                                        'text-blue-500 fill'
                            }`}>
                            {w.icon}
                        </span>
                        <span className="text-sm font-bold text-slate-700">{w.temp}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherChart;
