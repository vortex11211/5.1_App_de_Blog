import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllPublications = async () => {
  const response = await axios.get(`${API_URL}/publications`);
  return response.data;
};

const publicationService = {
  getAllPublications,
};

export default publicationService;


