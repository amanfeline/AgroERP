import { useState, useRef, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Topbar = ({ title = '' }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-50 w-full shadow-sm">
            <div className="flex-1 max-w-xl flex items-center gap-6">
                {title && <h2 className="text-xl font-bold hidden md:block">{title}</h2>}
                <div className="relative group flex-1 max-w-md">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search crops, markets, prices..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 ml-auto">
                <button 
                    onClick={() => setShowNotifications(true)}
                    className="relative p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-500"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></span>
                </button>

                {showNotifications && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h3 className="font-black text-slate-900">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>
                            <div className="p-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">notifications_off</span>
                                <p className="text-slate-500 font-medium">You do not have any notifications.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative" ref={dropdownRef}>
                    <div 
                        className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">{user?.name || 'Guest'}</p>
                            <p className="text-xs text-slate-500 font-medium">{user?.farmName || 'No Farm'}</p>
                        </div>
                        <div
                            className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary-500 bg-cover bg-center"
                            style={{ backgroundImage: `url('${user?.avatarUrl || 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=150&auto=format&fit=crop'}')` }}
                        ></div>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                            <button 
                                onClick={() => { setDropdownOpen(false); navigate('/profile'); }} 
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                            >
                                View Profile
                            </button>
                            <button 
                                onClick={() => { setDropdownOpen(false); navigate('/profile'); }} 
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                            >
                                Settings
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
