const BASE_URL = 'http://localhost:8000/api/v1/auth';

export const register = async (userData) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
};

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
};

export const googleLogin = async (name, email) => {
    // Simulate OAuth delay
    await new Promise(r => setTimeout(r, 800));
    
    // Register a mock user in the backend to establish a session
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: 'google_oauth_mock_password_123', // required by backend validation
            role: 'farmer',
            landSize: 10,
            location: 'Unknown Location',
            plantedCrop: 'Mixed'
        }),
    });

    const data = await response.json();
    // If it's not a success and not a duplicate email conflict (409), throw error
    if (!response.ok && response.status !== 409) {
        throw new Error(data.message || 'Google Login failed during registration');
    }
    
    // The register endpoint does not return an accessToken directly, so we need to login
    const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: 'google_oauth_mock_password_123' }),
    });

    const loginData = await loginResponse.json();
    if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Google Login failed');
    }
    
    return loginData;
};

export const getMe = async (token) => {
    const response = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user profile');
    }
    return data;
};
