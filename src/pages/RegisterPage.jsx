import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer'
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const result = await register(formData.name, formData.email, formData.password, formData.role);
        
        if (result.success) {
            alert("Account created successfully. Please login.");
            navigate('/login');
        } else {
            setError(result.message || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f5f5f0]">
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 relative bg-primary-900 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                <div className="relative z-10 w-full h-full flex flex-col p-12">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span className="material-symbols-outlined font-bold text-2xl">electric_tractor</span>
                        </div>
                        <span className="text-2xl font-black text-white tracking-tight">Agro ERP</span>
                    </div>
                    
                    <div className="mt-auto">
                        <h1 className="text-5xl font-black text-white mb-6 leading-tight">
                            Join the future of <br/><span className="text-primary-400">smart agriculture</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-lg">
                            Create an account to access AI-driven insights, market trends, and precision farming tools.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-[440px]">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-10 border-b border-slate-200 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <span className="material-symbols-outlined font-bold text-xl">electric_tractor</span>
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tight">Agro ERP</span>
                        </div>
                    </div>

                    <header className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Create Account</h2>
                        <p className="text-slate-500 text-lg font-medium">Sign up to get started with Agro ERP</p>
                    </header>

                    <div className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                />
                                <p className="text-xs text-slate-400 mt-2">Must be at least 8 characters.</p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-bold text-lg rounded-full flex justify-center items-center gap-2 transition-all shadow-md shadow-primary-500/20"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'} <span className="text-xl">→</span>
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-600 font-medium mt-6">
                            Already have an account? <Link to="/login" className="text-primary-600 hover:underline font-bold">Log in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
