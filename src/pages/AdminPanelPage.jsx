import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, updateUserRole, deactivateUser, activateUser } from '../services/adminApi';

const AdminPanelPage = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers(token);
            if (data.success) {
                setUsers(data.users);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const data = await updateUserRole(userId, newRole, token);
            if (data.success) {
                // Update local state
                setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            }
        } catch (err) {
            alert('Failed to update role: ' + err.message);
        }
    };

    const handleToggleStatus = async (user) => {
        try {
            if (user.isActive) {
                const data = await deactivateUser(user._id, token);
                if (data.success) {
                    setUsers(users.map(u => u._id === user._id ? { ...u, isActive: false } : u));
                }
            } else {
                const data = await activateUser(user._id, token);
                if (data.success) {
                    setUsers(users.map(u => u._id === user._id ? { ...u, isActive: true } : u));
                }
            }
        } catch (err) {
            alert('Failed to change status: ' + err.message);
        }
    };

    return (
        <div className="flex h-screen bg-[#edf5f0] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 ml-[220px] overflow-y-auto">
                <Topbar title="Admin Panel" />

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">User Management</h1>
                            <p className="text-slate-500 font-medium text-lg">View user activity, manage roles, and control access.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-medium border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Email</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Joined</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-medium">Loading users...</td>
                                            </tr>
                                        ) : users.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-medium">No users found.</td>
                                            </tr>
                                        ) : (
                                            users.map((u) => (
                                                <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold text-slate-900">{u.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">{u.email}</td>
                                                    <td className="px-6 py-4">
                                                        <select 
                                                            value={u.role}
                                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                            className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
                                                        >
                                                            <option value="admin">Admin</option>
                                                            <option value="farmer">Farmer</option>
                                                            <option value="analyst">Analyst</option>
                                                            <option value="viewer">Viewer</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                                                            u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                            {u.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                                                        {new Date(u.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => handleToggleStatus(u)}
                                                            className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
                                                                u.isActive 
                                                                    ? 'border-red-200 text-red-600 hover:bg-red-50'
                                                                    : 'border-green-200 text-green-600 hover:bg-green-50'
                                                            }`}
                                                        >
                                                            {u.isActive ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanelPage;
