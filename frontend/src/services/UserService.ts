import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para obtener el token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user?.token;
};

const getAllUsers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/users/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

const toggleBanUser = async (userId: number) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/users/ban`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al banear/desbanear el usuario:', error);
    throw error;
  }
};

const userService = {
  getAllUsers,
  toggleBanUser, // Añadir la función para banear/desbanear usuarios
};

export default userService;