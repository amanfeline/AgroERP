const DUMMY_USERS = [
    { _id: '1', name: 'Admin User', email: 'admin@agro.com', role: 'admin', isActive: true, createdAt: new Date().toISOString() },
    { _id: '2', name: 'John Farmer', email: 'john@farm.com', role: 'farmer', isActive: true, createdAt: new Date().toISOString() },
    { _id: '3', name: 'Data Analyst', email: 'analyst@agro.com', role: 'analyst', isActive: false, createdAt: new Date().toISOString() }
];

export const getAllUsers = async (token) => {
    return { success: true, count: 3, users: [...DUMMY_USERS] };
};

export const updateUserRole = async (userId, role, token) => {
    return { success: true };
};

export const deactivateUser = async (userId, token) => {
    return { success: true };
};

export const activateUser = async (userId, token) => {
    return { success: true };
};
