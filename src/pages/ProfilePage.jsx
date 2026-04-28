import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        farmName: '',
        location: '',
        phone: '',
        avatarUrl: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPicPicker, setShowPicPicker] = useState(false);
    const fileInputRef = useRef(null);

    const PRESET_AVATARS = [
        'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546961342-ea5f62d5a8c4?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600180758890-6b2bde3f65d5?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=200&auto=format&fit=crop',
    ];

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                farmName: user.farmName || '',
                location: user.location || '',
                phone: user.phone || '',
                avatarUrl: user.avatarUrl || ''
            });
        }
    }, [user]);

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatarUrl: reader.result }));
                setShowPicPicker(false);
            };
            reader.readAsDataURL(file);
        }
    };


    if (!user) return null;

    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="Profile" />
                <main className="flex-1 p-8">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative">
                        {showSuccess && (
                            <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-opacity">
                                Profile updated successfully!
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">User Profile</h2>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors">
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl text-sm transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                            <div className="relative">
                                <div
                                    onClick={() => isEditing && setShowPicPicker(true)}
                                    className={`w-24 h-24 rounded-full bg-slate-200 border-4 border-primary-500 bg-cover bg-center shrink-0 ${isEditing ? 'cursor-pointer hover:opacity-80 transition-opacity shadow-md' : ''}`}
                                    style={{ backgroundImage: `url('${isEditing ? formData.avatarUrl || user.avatarUrl || PRESET_AVATARS[0] : user.avatarUrl || PRESET_AVATARS[0]}')` }}
                                ></div>
                                {isEditing && (
                                    <button
                                        onClick={() => setShowPicPicker(true)}
                                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-white text-[14px]">photo_camera</span>
                                    </button>
                                )}
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            </div>

                            {/* Photo Picker Modal */}
                            {showPicPicker && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowPicPicker(false)}>
                                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-slate-200" onClick={e => e.stopPropagation()}>
                                        <div className="flex justify-between items-center mb-5">
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900">Choose Profile Photo</h3>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">Select a preset or upload your own</p>
                                            </div>
                                            <button onClick={() => setShowPicPicker(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                                                <span className="material-symbols-outlined text-xl">close</span>
                                            </button>
                                        </div>

                                        {/* Preset Grid */}
                                        <div className="grid grid-cols-4 gap-3 mb-5">
                                            {PRESET_AVATARS.map((url, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setFormData(prev => ({ ...prev, avatarUrl: url })); setShowPicPicker(false); }}
                                                    className="relative group"
                                                >
                                                    <div
                                                        className="w-full aspect-square rounded-xl bg-cover bg-center border-2 transition-all group-hover:scale-105 group-hover:shadow-md"
                                                        style={{
                                                            backgroundImage: `url('${url}')`,
                                                            borderColor: formData.avatarUrl === url ? '#22c55e' : 'transparent'
                                                        }}
                                                    ></div>
                                                    {formData.avatarUrl === url && (
                                                        <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-white text-[10px]">check</span>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="border-t border-slate-100 pt-4">
                                            <button
                                                onClick={() => { fileInputRef.current?.click(); }}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">upload</span>
                                                Browse & Upload Photo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                {isEditing ? (
                                    <div className="space-y-3 max-w-md">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Farm Name</label>
                                            <input type="text" name="farmName" value={formData.farmName} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold text-slate-900 truncate">{user.name || "N/A"}</h3>
                                        <p className="text-slate-500 font-medium truncate">{user.farmName || "Farm not specified"}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Location</label>
                                {isEditing ? (
                                    <div className="flex items-center gap-2 max-w-md">
                                        <select name="location" value={formData.location} onChange={handleChange} className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
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
                                ) : (
                                    <p className="font-medium text-slate-900">{user.location || "Location not specified"}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Contact Number</label>
                                {isEditing ? (
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 max-w-md" />
                                ) : (
                                    <p className="font-medium text-slate-900">{user.phone || "Phone not specified"}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                                <p className="font-medium text-slate-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Account Since</label>
                                <p className="font-medium text-slate-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Unknown"}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
