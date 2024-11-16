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

const userService = {
  getAllUsers, // Añadir la función para obtener todos los usuarios
};

export default userService;
