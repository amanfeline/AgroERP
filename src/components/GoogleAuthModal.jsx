import React, { useState } from 'react';

const GoogleAuthModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1 = email, 2 = name

    if (!isOpen) return null;

    const handleNext = (e) => {
        e.preventDefault();
        if (!email.includes('@')) return alert('Enter a valid email address');
        setStep(2);
    };

    const handleComplete = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert('Name is required');
        onSuccess(name, email);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-[400px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 flex flex-col items-center">
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    
                    <h2 className="text-2xl font-normal text-[#202124] mb-1">Sign in</h2>
                    <p className="text-[#202124] text-[16px] mb-8 font-medium">to continue to Agro ERP</p>

                    {step === 1 ? (
                        <form onSubmit={handleNext} className="w-full">
                            <div className="relative mb-8">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email or phone"
                                    required
                                    autoFocus
                                    className="w-full h-14 px-4 text-[16px] border border-[#dadce0] rounded text-[#202124] focus:border-[#1a73e8] focus:border-2 outline-none transition-all"
                                />
                            </div>
                            <p className="text-sm text-[#5f6368] mb-8 font-medium">
                                Not your computer? Use Guest mode to sign in privately.
                            </p>
                            <div className="flex justify-between items-center w-full">
                                <button type="button" onClick={onClose} className="text-[#1a73e8] font-bold text-sm px-2 py-2 hover:bg-[#f8f9fa] rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-[#1a73e8] hover:bg-[#1b66c9] text-white font-bold text-sm px-6 py-2 rounded">
                                    Next
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleComplete} className="w-full">
                            <div className="flex items-center justify-center gap-2 mb-8 px-4 py-1.5 border border-[#dadce0] rounded-full mx-auto w-max">
                                <span className="material-symbols-outlined text-[#5f6368] text-sm">account_circle</span>
                                <span className="text-sm text-[#3c4043] font-bold">{email}</span>
                            </div>

                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    autoFocus
                                    className="w-full h-14 px-4 text-[16px] border border-[#dadce0] rounded text-[#202124] focus:border-[#1a73e8] focus:border-2 outline-none transition-all"
                                />
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <button type="button" onClick={() => setStep(1)} className="text-[#1a73e8] font-bold text-sm px-2 py-2 hover:bg-[#f8f9fa] rounded">
                                    Back
                                </button>
                                <button type="submit" className="bg-[#1a73e8] hover:bg-[#1b66c9] text-white font-bold text-sm px-6 py-2 rounded">
                                    Complete
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthModal;
