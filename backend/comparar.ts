*import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const likePublication = async (publicationId: number) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token almacenado en el cliente
    const response = await axios.post(
      `${API_URL}/publications/like`,
      { publicationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('responsedata like publication', response.data)
    return response.data;
  } catch (error) {
    console.error('Error al dar like a la publicación:', error);
    throw error;
  }
};

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
  likePublication,
};

export default publicationService;



