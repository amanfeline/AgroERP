import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer',
        landSize: '',
        location: '',
        plantedCrop: ''
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showGoogleModal, setShowGoogleModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const result = await register(
            formData.name, 
            formData.email, 
            formData.password, 
            formData.role, 
            formData.landSize, 
            formData.location, 
            formData.plantedCrop
        );
        
        if (result.success) {
            navigate('/dashboard'); // Auto-login brings them directly here
        } else {
            setError(result.message || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError('');
            try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await userInfoRes.json();
                
                const result = await googleLogin(userInfo.name, userInfo.email);
                if (result.success) {
                    navigate('/dashboard');
                } else {
                    setError(result.message || 'Google Registration failed.');
                }
            } catch (err) {
                console.error("Google Auth Detail:", err);
                setError('Failed to fetch user details from Google.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => {
            setError('Google Registration was unsuccessful.');
        }
    });

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

                        <button 
                            type="button" 
                            onClick={() => handleGoogleLogin()} 
                            disabled={loading} 
                            className="w-full h-14 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl flex items-center justify-center gap-3 shadow-sm group"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="font-bold text-slate-700 group-hover:text-slate-900">Continue with Google</span>
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Or register with Email</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

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
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Field Size (Acres)</label>
                                    <input
                                        type="number"
                                        name="landSize"
                                        value={formData.landSize}
                                        onChange={handleChange}
                                        placeholder="e.g. 15"
                                        className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Planted Crop</label>
                                    <input
                                        type="text"
                                        name="plantedCrop"
                                        value={formData.plantedCrop}
                                        onChange={handleChange}
                                        placeholder="e.g. Wheat"
                                        className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                >
                                    <option value="">Select a Location</option>
                                    <option value="Punjab, India">Punjab, India</option>
                                    <option value="Haryana, India">Haryana, India</option>
                                    <option value="Uttar Pradesh, India">Uttar Pradesh, India</option>
                                    <option value="Maharashtra, India">Maharashtra, India</option>
                                    <option value="California, USA">California, USA</option>
                                    <option value="Texas, USA">Texas, USA</option>
                                    <option value="Mato Grosso, Brazil">Mato Grosso, Brazil</option>
                                    <option value="Buenos Aires, Argentina">Buenos Aires, Argentina</option>
                                    <option value="Queensland, Australia">Queensland, Australia</option>
                                    <option value="Sichuan, China">Sichuan, China</option>
                                </select>
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
        {/* Official Google Login pop-up is used */}
        </div>
    );
};

export default RegisterPage;
