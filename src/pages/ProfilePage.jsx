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
    const [showPicMenu, setShowPicMenu] = useState(false);
    const [showPicViewer, setShowPicViewer] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const fileInputRef = useRef(null);

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
                setShowPicMenu(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Using free OpenStreetMap Nominatim API for reverse geocoding to avoid needing a Google API key
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    
                    if (data && data.address) {
                        const country = data.address.country || '';
                        const state = data.address.state || '';
                        const district = data.address.state_district || data.address.county || data.address.city_district || data.address.city || '';
                        
                        // Filter out empty strings and join with comma
                        const locationString = [district, state, country].filter(Boolean).join(', ');
                        setFormData(prev => ({ ...prev, location: locationString }));
                    } else {
                        alert("Could not determine address from location");
                    }
                } catch (error) {
                    console.error(error);
                    alert("Error fetching location details");
                } finally {
                    setIsFetchingLocation(false);
                }
            },
            (error) => {
                console.error(error);
                alert("Unable to retrieve your location. Please ensure location permissions are granted in your browser.");
                setIsFetchingLocation(false);
            }
        );
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
                                    onClick={() => isEditing && setShowPicMenu(!showPicMenu)}
                                    className={`w-24 h-24 rounded-full bg-slate-200 border-4 border-primary-500 bg-cover bg-center shrink-0 ${isEditing ? 'cursor-pointer hover:opacity-90 transition-opacity shadow-md' : ''}`}
                                    style={{ backgroundImage: `url('${isEditing ? formData.avatarUrl || user.avatarUrl || 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=250&auto=format&fit=crop' : user.avatarUrl || 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=250&auto=format&fit=crop'}')` }}
                                ></div>
                                {isEditing && showPicMenu && (
                                    <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10">
                                        <button onClick={() => { setShowPicViewer(true); setShowPicMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">
                                            View profile picture
                                        </button>
                                        <button onClick={() => { fileInputRef.current?.click(); setShowPicMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">
                                            Edit profile picture
                                        </button>
                                    </div>
                                )}
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            </div>
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
                                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="District, State, Country" />
                                        <button 
                                            type="button" 
                                            onClick={handleGetLocation} 
                                            disabled={isFetchingLocation}
                                            className="h-10 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                            title="Auto-detect Location"
                                        >
                                            <span className="material-symbols-outlined text-base" style={{ fontSize: '18px' }}>{isFetchingLocation ? 'hourglass_empty' : 'my_location'}</span>
                                            {isFetchingLocation ? 'Fetching...' : 'Auto'}
                                        </button>
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
            {showPicViewer && (
                <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="relative max-w-4xl max-h-full">
                        <button onClick={() => setShowPicViewer(false)} className="absolute -top-12 right-0 text-white hover:text-slate-300 font-bold bg-black/50 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                            ✕
                        </button>
                        <img src={isEditing ? formData.avatarUrl || user.avatarUrl || 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=250&auto=format&fit=crop' : user.avatarUrl || 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=250&auto=format&fit=crop'} alt="Profile View" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain ring-4 ring-white/10" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
