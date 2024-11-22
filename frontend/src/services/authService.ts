import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        } return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400 && error.response.data.message === 'Your account is banned.') {
                throw new Error('Your account is banned.');
            } else {
                throw new Error('Invalid email or password');
            }
        }
        throw error;
    }
};

const register = async (username: string, email: string, password: string, role: string, adminKey?: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, { username, email, password, role, adminKey });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 409) {
                if (error.response.data.message.includes('email')) {
                    throw new Error('User with this email already exists.');
                }
                if (error.response.data.message.includes('username')) {
                    throw new Error('User with this username already exists.');
                }
            } else {
                throw new Error('An error occurred during registration.');
            }
        }
        throw error;
    }
};

const updateProfile = async (username: string, oldPassword: string, newPassword: string) => {
    const token = JSON.parse(localStorage.getItem('user')!).token;
    const response = await axios.put(
        `${API_URL}/users/profile`,
        { username, oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
    ); return response.data;
};

const authService = {
    login,
    register,
    updateProfile,
};

export default authService;
