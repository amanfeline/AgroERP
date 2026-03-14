import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Compass,
    Sprout,
    BarChart3,
    User,
    HelpCircle,
    CloudLightning
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Explore', path: '/explore', icon: Compass },
        { name: 'Market Prices', path: '/market-prices', icon: BarChart3 },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Help', path: '/help', icon: HelpCircle },
        { name: 'Weather AI', path: '/weather', icon: CloudLightning },
    ];

    return (
        <aside className="w-[220px] fixed top-0 left-0 h-screen bg-white border-r border-slate-200 flex flex-col z-20">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                    <span className="material-symbols-outlined font-bold">potted_plant</span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Agro ERP</h1>
            </div>

            <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${isActive
                                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                    <p className="text-sm font-bold text-slate-900">Premium Plan</p>
                    <p className="text-xs text-slate-500 mb-4 mt-1">Get advanced soil analytics</p>
                    <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                        UPGRADE
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
