import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, getMe } from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const data = await getMe(token);
                if (data.success) {
                    setUser(data.user);
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Failed to fetch user on load", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            if (data.success) {
                setToken(data.accessToken);
                setUser(data.user);
                localStorage.setItem('token', data.accessToken);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const data = await registerApi(name, email, password, role);
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
