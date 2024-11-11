import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';

const Home: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await publicationService.getAllPublications();
        setPublications(response);
      } catch (error) {
        setError('Error al obtener las publicaciones');
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <h2>Latest Publications</h2>
      {error && <p>{error}</p>}
      <ul>
        {publications.map((publication: any) => (
          <li key={publication.props.id}> 
            <h2>{publication.props.title}</h2> 
            <p>{publication.props.content}</p> 
            <p><b>Author</b>: {publication.props.authorName}</p>
            <p>Popularity: {publication.props.popularity}</p> {/* Mostrar popularidad */}
            <p>Created At: {new Date(publication.props.createdAt).toLocaleDateString()}</p> {/* Mostrar fecha de creación */}
            <p>Updated At: {new Date(publication.props.updatedAt).toLocaleDateString()}</p> {/* Mostrar fecha de actualización */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;