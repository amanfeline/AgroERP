import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { HelpCircle, Phone, Mail, FileText } from 'lucide-react';

const HelpPage = () => {
    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="Help & Support" />
                <main className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-primary-900 rounded-2xl p-10 mb-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=1500&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl text-primary-400 flex items-center justify-center mx-auto mb-4 border border-primary-500/30">
                                    <HelpCircle className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2">How can we help you today?</h2>
                                <p className="text-primary-100 font-medium">Search our knowledge base or reach out to support.</p>

                                <div className="max-w-md mx-auto mt-8 relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles, guides, FAQs..."
                                        className="w-full bg-white rounded-xl py-3 pl-4 pr-12 text-slate-900 outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer group relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-multiply"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Call Us</h3>
                                    <p className="text-sm text-slate-500 font-medium">Available 24/7</p>
                                    <p className="mt-5 font-bold text-primary-600">9315523023</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer group relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-multiply"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Email Support</h3>
                                    <p className="text-sm text-slate-500 font-medium">Get a response within 24 hours</p>
                                    <p className="mt-5 font-bold text-primary-600">amanyadav07093124@gmail.com</p>
                                </div>
                            </div>

                            <a href="https://github.com/amancatto" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer group relative overflow-hidden block">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-300 mix-blend-multiply"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=800&auto=format&fit=crop')" }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Documentation</h3>
                                    <p className="text-sm text-slate-500 font-medium">Detailed guides and tutorials</p>
                                    <p className="mt-5 font-bold text-primary-600 group-hover:translate-x-1 transition-transform inline-block">Browse Docs →</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HelpPage;
