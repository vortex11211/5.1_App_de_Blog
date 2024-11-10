import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';

const Home: React.FC = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    // Llamar al servicio para obtener las publicaciones
    const fetchPublications = async () => {
      try {
        const response = await publicationService.getAllPublications();
        setPublications(response);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <h2>Latest Publications</h2>
      <ul>
        {publications.map((publication: any) => (
          <li key={publication.id}>
            <h3>{publication.title}</h3>
            <p>{publication.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
