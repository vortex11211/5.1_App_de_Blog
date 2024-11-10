import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllPublications = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = user?.token;

    const response = await axios.get(`${API_URL}/publications/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};

const publicationService = {
  getAllPublications,
};

export default publicationService;


