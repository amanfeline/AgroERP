import { Search, Bell } from 'lucide-react';

const Topbar = ({ title = '' }) => {
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
                <button className="relative p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-500">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">John Harrison</p>
                        <p className="text-xs text-slate-500 font-medium">Westbrook Farms</p>
                    </div>
                    <div
                        className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary-500 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=150&auto=format&fit=crop')" }}
                    ></div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
