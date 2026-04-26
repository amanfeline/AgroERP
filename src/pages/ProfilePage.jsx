import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const ProfilePage = () => {
    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="Profile" />
                <main className="flex-1 p-8">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">User Profile</h2>
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                            <div
                                className="w-24 h-24 rounded-full bg-slate-200 border-4 border-primary-500 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=250&auto=format&fit=crop')" }}
                            ></div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">John Harrison</h3>
                                <p className="text-slate-500 font-medium">Westbrook Farms</p>
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                                    Premium Member
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Location</label>
                                <p className="font-medium text-slate-900">Westbrook, Springfield</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Contact Number</label>
                                <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Account Since</label>
                                <p className="font-medium text-slate-900">March 2021</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
