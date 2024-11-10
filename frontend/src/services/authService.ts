import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        } return response.data;
    } catch (error) { if (axios.isAxiosError(error) && error.response) { throw new Error('Invalid email or password'); } throw error; }
};


const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
    return response.data;
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
