import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';
import '../../assets/styles/MyPublications.css'

const MyPublications: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const response = await publicationService.getUserPublications();
        setPublications(response);
      } catch (error) {
        setError('Error al obtener las publicaciones del usuario');
        console.error('Error al obtener las publicaciones del usuario:', error);
      }
    };

    fetchUserPublications();
  }, []);

  return (
    <div className="my-publications-container">
      <h1>My Posts</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="publication-list">
        {publications.map((publication: any) => (
          <div
            className={`publication-card ${publication.props.deleted ? 'deleted' : ''}`}
            key={publication.props.id}
          >
            <h2>{publication.props.title}</h2>
            <p>{publication.props.content}</p>
            <div className="publication-dates">
              <p>Created At: {new Date(publication.props.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(publication.props.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="publication-footer">
              <p className="publication-author">Author: {publication.props.authorName}</p>
              <p className="publication-popularity">Popularity: {publication.props.popularity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPublications;
