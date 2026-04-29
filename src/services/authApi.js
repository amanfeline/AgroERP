const BASE_URL = 'http://127.0.0.1:8000/api/v1/auth';

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
    
    // Attempt to register/sync the Google user in the backend
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: 'google_oauth_mock_password_123',
            role: 'farmer',
            landSize: 10,
            location: 'Unknown Location',
            plantedCrop: 'Mixed'
        }),
    });

    const data = await response.json();
    
    // We expect 201 (Created), 409 (Conflict), or 400 (Already exists in some implementations)
    // If it's none of these, the server might be down or rejected the payload
    if (!response.ok && response.status !== 409 && response.status !== 400) {
        throw new Error(data.message || 'Google authentication service is currently unavailable');
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
