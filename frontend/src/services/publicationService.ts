import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para obtener el token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user?.token;
};

const likePublication = async (publicationId: number) => {
  try {
    const token = getToken(); // Usar la función auxiliar para obtener el token
    console.log('Token:', token); // Verificar el token
    const response = await axios.post(
      `${API_URL}/publications/like`,
      { publicationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Response data like publication', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al dar like a la publicación:', error);
    throw error;
  }
};

const getAllPublications = async () => {
  try {
    const token = getToken(); // Usar la función auxiliar para obtener el token
    console.log('Token:', token); // Verificar el token

    const response = await axios.get(`${API_URL}/publications/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};
const getUserPublications = async () => { 
  try { 
    const token = getToken();
  const response = await axios.get(`${API_URL}/users/posts`, {
     headers: { Authorization: `Bearer ${token}`,
     },
     });
      return response.data;
     } catch (error) {
       console.error('Error al obtener las publicaciones del usuario:', error);
        throw error;
       } 
      };
      
      const togglePublicationDelete = async (publicationId: number) => {
        try {
          const token = getToken();
          const response = await axios.delete(`${API_URL}/publications/publication`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data: {
              publicationId
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error al alternar el estado de eliminación de la publicación:', error);
          throw error;
        }
      };
      
      const publicationService = {
        getAllPublications,
        likePublication,
        getUserPublications,
        togglePublicationDelete
      };
      
      export default publicationService;


