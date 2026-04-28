import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Compass,
    Sprout,
    BarChart3,
    User,
    HelpCircle,
    CloudLightning,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
    
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Explore', path: '/explore', icon: Compass },
        { name: 'Market Prices', path: '/market-prices', icon: BarChart3 },
        { name: 'Weather AI', path: '/weather', icon: CloudLightning },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Help', path: '/help', icon: HelpCircle },
    ];

    // Add Admin Panel if user is admin
    if (user?.role === 'admin') {
        navItems.push({ name: 'Admin Panel', path: '/admin', icon: Shield });
    }

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

        </aside>
    );
};

export default Sidebar;
