import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import MarketPricesPage from './pages/MarketPricesPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import WeatherIntelligencePage from './pages/WeatherIntelligencePage';
import AdminPanelPage from './pages/AdminPanelPage';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#edf5f0]">Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#edf5f0]">Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
                    <Route path="/weather" element={<ProtectedRoute><WeatherIntelligencePage /></ProtectedRoute>} />
                    <Route path="/market-prices" element={<ProtectedRoute><MarketPricesPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminRoute><AdminPanelPage /></AdminRoute>} />
                    
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
