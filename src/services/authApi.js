// Initialize mock DB if it doesn't exist
const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');
const saveMockUsers = (users) => localStorage.setItem('mockUsers', JSON.stringify(users));

export const login = async (email, password) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    
    const users = getMockUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            success: true,
            accessToken: "mock_jwt_" + Date.now(),
            user: { ...user, password: undefined } // strip password
        };
    } else {
        throw new Error("Invalid email or password. Please register first!");
    }
};

export const googleLogin = async () => {
    await new Promise(r => setTimeout(r, 500));
    
    const users = getMockUsers();
    const mockEmail = `googleuser_${Date.now()}@gmail.com`;
    
    const newUser = {
        _id: Date.now().toString(),
        name: "Google User",
        email: mockEmail,
        role: "farmer",
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveMockUsers(users);
    
    return {
        success: true,
        accessToken: "mock_jwt_google_" + Date.now(),
        user: newUser
    };
};

export const register = async (name, email, password, role = 'farmer') => {
    await new Promise(r => setTimeout(r, 500));
    
    const users = getMockUsers();
    if (users.some(u => u.email === email)) {
        throw new Error("Email is already registered. Please login.");
    }
    
    const newUser = {
        _id: Date.now().toString(),
        name,
        email,
        password,
        role,
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveMockUsers(users);
    
    return { success: true };
};

export const getMe = async (token) => {
    return {
        success: true,
        user: getMockUsers()[0] || null // Just return first user for persistence simulation
    };
};
